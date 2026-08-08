/**
 * Server-relayed table state. DM is authority; players poll state and post actions.
 * Works in preview (PGLite) and production (Postgres) without WebRTC NAT issues.
 */
import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";

const CODE = z.string().regex(/^[A-Z0-9]{4,12}$/);

const globalRef = globalThis as typeof globalThis & {
  __tableSchemaPromise__?: Promise<void>;
};

function ensureSchema(sql: Sql): Promise<void> {
  globalRef.__tableSchemaPromise__ ??= (async () => {
    await sql.query(
      `CREATE TABLE IF NOT EXISTS table_rooms (
         code TEXT PRIMARY KEY,
         state JSONB NOT NULL,
         version INT NOT NULL DEFAULT 1,
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
    );
    await sql.query(
      `CREATE TABLE IF NOT EXISTS table_actions (
         id BIGSERIAL PRIMARY KEY,
         code TEXT NOT NULL,
         payload JSONB NOT NULL,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
    );
    await sql.query(
      `CREATE INDEX IF NOT EXISTS table_actions_inbox ON table_actions (code, id)`,
    );
  })().catch((err) => {
    globalRef.__tableSchemaPromise__ = undefined;
    throw err;
  });
  return globalRef.__tableSchemaPromise__;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export async function handleTableRelay(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const sql = await getSql();
    await ensureSchema(sql);

    if (request.method === "GET") {
      const code = (url.searchParams.get("code") ?? "").toUpperCase();
      const since = Number(url.searchParams.get("since") ?? "0");
      const parsed = CODE.safeParse(code);
      if (!parsed.success) return json({ error: "invalid code" }, 400);

      // prune old actions
      if (Math.random() < 0.05) {
        await sql.query(
          `DELETE FROM table_actions WHERE created_at < now() - interval '10 minutes'`,
        );
      }

      const rows = await sql.query<{ state: unknown; version: number }>(
        `SELECT state, version FROM table_rooms WHERE code = $1`,
        [code],
      );
      if (!rows[0]) return json({ state: null, version: 0, actions: [] });

      const actions = await sql.query<{ id: number; payload: unknown }>(
        `SELECT id, payload FROM table_actions WHERE code = $1 AND id > $2 ORDER BY id LIMIT 100`,
        [code, since],
      );

      return json({
        state: rows[0].version > since || since === 0 ? rows[0].state : null,
        version: rows[0].version,
        actions: actions.map((a) => ({ id: a.id, payload: a.payload })),
      });
    }

    if (request.method === "POST") {
      const body = await request.json();
      const op = body?.op;

      if (op === "put") {
        const code = String(body.code ?? "").toUpperCase();
        if (!CODE.safeParse(code).success) return json({ error: "invalid code" }, 400);
        const state = body.state;
        const version = Number(body.version ?? 1);
        if (!state || typeof state !== "object") return json({ error: "invalid state" }, 400);
        // size guard
        if (JSON.stringify(state).length > 400_000) return json({ error: "state too large" }, 400);

        await sql.query(
          `INSERT INTO table_rooms (code, state, version, updated_at)
           VALUES ($1, $2::jsonb, $3, now())
           ON CONFLICT (code) DO UPDATE SET
             state = EXCLUDED.state,
             version = EXCLUDED.version,
             updated_at = now()`,
          [code, JSON.stringify(state), version],
        );
        return json({ ok: true, version });
      }

      if (op === "action") {
        const code = String(body.code ?? "").toUpperCase();
        if (!CODE.safeParse(code).success) return json({ error: "invalid code" }, 400);
        const payload = body.payload;
        if (!payload) return json({ error: "missing payload" }, 400);
        if (JSON.stringify(payload).length > 32_768) return json({ error: "payload too large" }, 400);
        await sql.query(
          `INSERT INTO table_actions (code, payload) VALUES ($1, $2::jsonb)`,
          [code, JSON.stringify(payload)],
        );
        return json({ ok: true });
      }

      if (op === "ack") {
        const code = String(body.code ?? "").toUpperCase();
        const upTo = Number(body.upTo ?? 0);
        if (!CODE.safeParse(code).success) return json({ error: "invalid code" }, 400);
        await sql.query(`DELETE FROM table_actions WHERE code = $1 AND id <= $2`, [code, upTo]);
        return json({ ok: true });
      }

      return json({ error: "unknown op" }, 400);
    }

    return json({ error: "method not allowed" }, 405);
  } catch (error) {
    console.error("[table-relay]", error);
    return json({ error: "table relay failed" }, 500);
  }
}
