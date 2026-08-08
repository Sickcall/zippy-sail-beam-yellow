import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONDITIONS_5E, type MapToken } from "@/lib/table/types";
import { cn } from "@/lib/utils";

export function TokenInspector({
  token,
  isDm,
  onChange,
  onDuplicate,
  onDelete,
  onRoll,
}: {
  token: MapToken;
  isDm: boolean;
  onChange: (t: MapToken) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRoll: (expr: string, label: string) => void;
}) {
  const name = token.name || token.label;
  const conditions = token.conditions ?? [];

  if (!isDm && token.kind !== "pc") {
    // Players see limited view when token is revealed
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-[var(--color-accent-fg)]"
            style={{ background: token.color }}
          >
            {token.label.slice(0, 3)}
          </span>
          <div>
            <p className="font-display font-semibold">{name}</p>
            <p className="text-xs text-[var(--color-fg-subtle)] capitalize">{token.kind}</p>
          </div>
        </div>
        {typeof token.hp === "number" && typeof token.maxHp === "number" && (
          <p className="mt-2 text-sm tabular-nums text-[var(--color-fg-muted)]">
            HP {token.hp}/{token.maxHp}
            {token.ac != null ? ` · AC ${token.ac}` : ""}
          </p>
        )}
        {conditions.length > 0 && (
          <p className="mt-1 text-xs text-[var(--color-warn)]">{conditions.join(", ")}</p>
        )}
      </div>
    );
  }

  if (!isDm) return null;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3 shadow-[var(--shadow-inset)]">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="flex size-10 items-center justify-center rounded-full text-xs font-bold text-[var(--color-accent-fg)] ring-2 ring-[var(--color-border-strong)]"
            style={{ background: token.color }}
          >
            {token.label.slice(0, 3)}
          </span>
          <div>
            <p className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
              Selected token
            </p>
            <p className="font-display text-base font-semibold leading-tight">{name}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onChange({ ...token, hidden: !token.hidden })}
          >
            {token.hidden ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            {token.hidden ? "Reveal" : "Hide"}
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={onDuplicate}>
            <Copy className="size-3.5" />
            Copy
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={onDelete}>
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Field label="Name">
          <Input
            value={name}
            onChange={(e) => {
              const n = e.target.value;
              onChange({
                ...token,
                name: n,
                label: n.slice(0, 3).toUpperCase() || token.label,
              });
            }}
          />
        </Field>
        <Field label="Kind">
          <select
            value={token.kind}
            onChange={(e) =>
              onChange({ ...token, kind: e.target.value as MapToken["kind"] })
            }
            className="flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm"
          >
            <option value="monster">Monster</option>
            <option value="npc">NPC</option>
            <option value="pc">PC</option>
            <option value="object">Object</option>
          </select>
        </Field>
        <Field label="Label (map)">
          <Input
            value={token.label}
            maxLength={4}
            onChange={(e) => onChange({ ...token, label: e.target.value.toUpperCase() })}
            className="font-mono"
          />
        </Field>
        <Field label="Color">
          <div className="flex gap-2">
            <input
              type="color"
              value={token.color}
              onChange={(e) => onChange({ ...token, color: e.target.value })}
              className="h-10 w-12 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
            />
            <Input
              value={token.color}
              onChange={(e) => onChange({ ...token, color: e.target.value })}
              className="font-mono text-xs"
            />
          </div>
        </Field>
        <Field label="Size">
          <div className="flex gap-1">
            {([1, 2, 3, 4] as const).map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant={token.size === s ? "steel" : "secondary"}
                onClick={() => onChange({ ...token, size: s })}
              >
                {s === 1 ? "M" : s === 2 ? "L" : s === 3 ? "H" : "G"}
              </Button>
            ))}
          </div>
        </Field>
        <Field label="CR">
          <Input
            value={token.cr ?? ""}
            onChange={(e) => onChange({ ...token, cr: e.target.value })}
            placeholder="—"
          />
        </Field>
        <Field label="HP">
          <div className="flex gap-1">
            <Input
              type="number"
              value={token.hp ?? 0}
              onChange={(e) => onChange({ ...token, hp: Number(e.target.value) || 0 })}
              className="tabular-nums"
            />
            <span className="flex items-center text-xs text-[var(--color-fg-subtle)]">/</span>
            <Input
              type="number"
              value={token.maxHp ?? 0}
              onChange={(e) => onChange({ ...token, maxHp: Number(e.target.value) || 0 })}
              className="tabular-nums"
            />
          </div>
        </Field>
        <Field label="AC">
          <Input
            type="number"
            value={token.ac ?? 10}
            onChange={(e) => onChange({ ...token, ac: Number(e.target.value) || 0 })}
            className="tabular-nums"
          />
        </Field>
        <Field label="Position">
          <div className="flex gap-1">
            <Input
              type="number"
              value={token.x}
              onChange={(e) => onChange({ ...token, x: Number(e.target.value) || 0 })}
              className="tabular-nums"
            />
            <Input
              type="number"
              value={token.y}
              onChange={(e) => onChange({ ...token, y: Number(e.target.value) || 0 })}
              className="tabular-nums"
            />
          </div>
        </Field>
        <Field label="Speed">
          <Input
            value={token.speed ?? ""}
            onChange={(e) => onChange({ ...token, speed: e.target.value })}
            placeholder="30 ft."
          />
        </Field>
      </div>

      {/* Quick damage / heal */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[-10, -5, -1, 1, 5, 10].map((n) => (
          <Button
            key={n}
            type="button"
            size="sm"
            variant="secondary"
            className={cn("tabular-nums", n < 0 && "text-[var(--color-danger)]")}
            onClick={() => {
              const hp = Math.max(0, (token.hp ?? 0) + n);
              onChange({ ...token, hp });
            }}
          >
            {n > 0 ? `+${n}` : n}
          </Button>
        ))}
      </div>

      {/* Attacks */}
      <div className="mt-3 grid gap-1.5">
        <p className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">Attacks</p>
        {(token.attacks ?? []).map((atk, i) => (
          <div key={i} className="flex flex-wrap items-center gap-1.5 text-xs">
            <Input
              value={atk.name}
              onChange={(e) => {
                const attacks = [...(token.attacks ?? [])];
                attacks[i] = { ...atk, name: e.target.value };
                onChange({ ...token, attacks });
              }}
              className="h-8 min-w-[6rem] flex-1"
            />
            <Button
              type="button"
              size="sm"
              variant="steel"
              onClick={() =>
                onRoll(
                  `1d20${atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}`,
                  `${name} ${atk.name}`,
                )
              }
            >
              +{atk.bonus}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => onRoll(atk.damage, `${name} dmg`)}
            >
              {atk.damage}
            </Button>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              onClick={() =>
                onChange({
                  ...token,
                  attacks: (token.attacks ?? []).filter((_, j) => j !== i),
                })
              }
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() =>
            onChange({
              ...token,
              attacks: [...(token.attacks ?? []), { name: "Attack", bonus: 4, damage: "1d8+2" }],
            })
          }
        >
          Add attack
        </Button>
      </div>

      {/* Conditions */}
      <div className="mt-3">
        <p className="mb-1.5 text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
          Conditions
        </p>
        <div className="flex flex-wrap gap-1">
          {CONDITIONS_5E.map((c) => {
            const on = conditions.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() =>
                  onChange({
                    ...token,
                    conditions: on
                      ? conditions.filter((x) => x !== c)
                      : [...conditions, c],
                  })
                }
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[11px] transition-colors",
                  on
                    ? "border-[var(--color-warn)] bg-[color-mix(in_oklab,var(--color-warn)_18%,transparent)] text-[var(--color-warn)]"
                    : "border-[var(--color-border)] text-[var(--color-fg-subtle)] hover:border-[var(--color-border-strong)]",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <Field label="Notes / traits" className="mt-3">
        <Textarea
          value={token.notes ?? ""}
          onChange={(e) => onChange({ ...token, notes: e.target.value })}
          className="min-h-[64px] text-sm"
          placeholder="Traits, legendary actions, roleplay notes…"
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("grid gap-1", className)}>
      <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
