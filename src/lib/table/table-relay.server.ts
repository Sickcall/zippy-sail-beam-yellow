/**
 * Server-relayed table state. DM is authority; players poll / post actions.
 *
 * CRITICAL for Vercel: never initialize PGLite here. PGLite crashes in many
 * serverless runtimes, which previously made every /api/table call return 500
 * and left players stuck on "Connecting…".
 *
 * Storage:
 *  1. Process memory (always) — works in preview + warm instances
 *  2. Postgres only when DATABASE_URL is set (shared across instances)
 *
 * Client also has a PeerJS fallback so multiplayer works even without Postgres.
 */
import { z } from "zod";

const CODE = z.string().regex(/^[A-Z0-9]{4,12}$/);

type ActionRow = { id: number; payload: unknown; createdAt: number };
type RoomRow = {
  state: unknown;
  version: number;
  actions: ActionRow[];
  updatedAt: number;
};

type TableStore = {
  rooms: Map<string, RoomRow>;
  nextActionId: number;
  schemaReady?: Promise<void>;
};

const g = globalThis as typeof globalThis & { __grimoireTableStore__?: TableStore };

function store(): TableStore {
  g.__grimoireTableStore__ ??= { rooms: new Map(), nextActionId: 1 };
  return g.__grimoireTableStore__;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store, no-cache, must-revalidate",
      pragma: "no-cache",
    },
  });
}

function hasDatabaseUrl(): boolean {
  const raw =
    typeof process !== "undefined" ? process.env.DATABASE_URL : undefined;
  return Boolean(raw && raw.trim());
}

function memGet(code: string): RoomRow | undefined {
  return store().rooms.get(code);
}

function memPut(code: string, state: unknown, version: number): RoomRow {
  const s = store();
  const prev = s.rooms.get(code);
  const row: RoomRow = {
    state,
    version,
    actions: prev?.actions ?? [],
    updatedAt: Date.now(),
  };
  s.rooms.set(code, row);
  return row;
}

function memAction(code: string, payload: unknown): ActionRow {
  const s = store();
  let row = s.rooms.get(code);
  if (!row) {
    row = { state: null, version: 0, actions: [], updatedAt: Date.now() };
    s.rooms.set(code, row);
  }
  const action: ActionRow = {
    id: s.nextActionId++,
    payload,
    createdAt: Date.now(),
  };
  row.actions = [...row.actions, action].slice(-200);
  row.updatedAt = Date.now();
  return action;
}

function memAck(code: string, upTo: number) {
  const row = store().rooms.get(code);
  if (!row) return;
  row.actions = row.actions.filter((a) => a.id > upTo);
}

type Sql = {
  query: <T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ) => Promise<T[]>;
};

async function getSharedSql(): Promise<Sql | null> {
  if (!hasDatabaseUrl()) return null;
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const s = store();
    s.schemaReady ??= (async () => {
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
      s.schemaReady = undefined;
      throw err;
    });
    await s.schemaReady;
    return sql as unknown as Sql;
  } catch (err) {
    console.error("[table-relay] shared sql unavailable", err);
    return null;
  }
}

export async function handleTableRelay(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);

    if (request.method === "GET" && url.searchParams.get("health") === "1") {
      return json({
        ok: true,
        db: hasDatabaseUrl() ? "postgres" : "memory",
        multiplayer: hasDatabaseUrl() ? "shared" : "memory+peer",
        rooms: store().rooms.size,
      });
    }

    const sql = await getSharedSql();

    if (request.method === "GET") {
      const code = (url.searchParams.get("code") ?? "").toUpperCase();
      const since = Number(url.searchParams.get("since") ?? "0");
      if (!CODE.safeParse(code).success) return json({ error: "invalid code" }, 400);

      let version = 0;
      let state: unknown = null;
      let actions: { id: number; payload: unknown }[] = [];

      const mem = memGet(code);
      if (mem && mem.version > 0 && mem.state != null) {
        version = mem.version;
        state = mem.state;
        actions = mem.actions
          .filter((a) => a.id > since)
          .slice(0, 100)
          .map((a) => ({ id: a.id, payload: a.payload }));
      }

      if (sql) {
        try {
          if (Math.random() < 0.05) {
            await sql.query(
              `DELETE FROM table_actions WHERE created_at < now() - interval '30 minutes'`,
            );
          }
          const rows = await sql.query<{ state: unknown; version: number }>(
            `SELECT state, version FROM table_rooms WHERE code = $1`,
            [code],
          );
          if (rows[0] && Number(rows[0].version) >= version) {
            version = Number(rows[0].version);
            state = rows[0].state;
            if (state != null) memPut(code, state, version);
          }
          const actionRows = await sql.query<{ id: number; payload: unknown }>(
            `SELECT id, payload FROM table_actions WHERE code = $1 AND id > $2 ORDER BY id LIMIT 100`,
            [code, since],
          );
          if (actionRows.length) {
            const byId = new Map<number, unknown>();
            for (const a of actions) byId.set(a.id, a.payload);
            for (const a of actionRows) byId.set(Number(a.id), a.payload);
            actions = [...byId.entries()]
              .sort((a, b) => a[0] - b[0])
              .map(([id, payload]) => ({ id, payload }));
          }
        } catch (err) {
          console.error("[table-relay] sql read failed", err);
        }
      }

      if (!state || version === 0) {
        return json({
          state: null,
          version: 0,
          actions: [],
          db: hasDatabaseUrl() ? "postgres" : "memory",
          exists: false,
        });
      }

      const sendState = since === 0 || version > since;
      return json({
        state: sendState ? state : null,
        version,
        actions,
        db: hasDatabaseUrl() ? "postgres" : "memory",
        exists: true,
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
        if (JSON.stringify(state).length > 400_000) {
          return json({ error: "state too large" }, 400);
        }

        memPut(code, state, version);

        if (sql) {
          try {
            await sql.query(
              `INSERT INTO table_rooms (code, state, version, updated_at)
               VALUES ($1, $2::jsonb, $3, now())
               ON CONFLICT (code) DO UPDATE SET
                 state = EXCLUDED.state,
                 version = EXCLUDED.version,
                 updated_at = now()`,
              [code, JSON.stringify(state), version],
            );
          } catch (err) {
            console.error("[table-relay] sql put failed", err);
          }
        }

        return json({
          ok: true,
          version,
          db: hasDatabaseUrl() ? "postgres" : "memory",
        });
      }

      if (op === "action") {
        const code = String(body.code ?? "").toUpperCase();
        if (!CODE.safeParse(code).success) return json({ error: "invalid code" }, 400);
        const payload = body.payload;
        if (!payload) return json({ error: "missing payload" }, 400);
        if (JSON.stringify(payload).length > 32_768) {
          return json({ error: "payload too large" }, 400);
        }

        const memA = memAction(code, payload);

        if (sql) {
          try {
            await sql.query(
              `INSERT INTO table_actions (code, payload) VALUES ($1, $2::jsonb)`,
              [code, JSON.stringify(payload)],
            );
          } catch (err) {
            console.error("[table-relay] sql action failed", err);
          }
        }

        return json({ ok: true, id: memA.id });
      }

      if (op === "ack") {
        const code = String(body.code ?? "").toUpperCase();
        const upTo = Number(body.upTo ?? 0);
        if (!CODE.safeParse(code).success) return json({ error: "invalid code" }, 400);
        memAck(code, upTo);
        if (sql) {
          try {
            await sql.query(
              `DELETE FROM table_actions WHERE code = $1 AND id <= $2`,
              [code, upTo],
            );
          } catch {
            /* ignore */
          }
        }
        return json({ ok: true });
      }

      return json({ error: "unknown op" }, 400);
    }

    return json({ error: "method not allowed" }, 405);
  } catch (error) {
    console.error("[table-relay]", error);
    // Never take down the table: empty success-shaped payload lets the PeerJS
    // client path take over instead of infinite "Connecting…".
    return json(
      {
        error: "table relay failed",
        state: null,
        version: 0,
        actions: [],
        exists: false,
        db: "error",
      },
      200,
    );
  }
}
