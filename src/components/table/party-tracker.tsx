import { useMemo, useState } from "react";
import {
  Heart,
  Plus,
  Sparkles,
  Trash2,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  COMMON_EFFECTS,
  CONDITIONS_5E,
  newEffect,
  type ActiveEffect,
  type CharacterSheet,
  type PartyStatus,
} from "@/lib/table/types";
import { cn } from "@/lib/utils";

const STATUS_META: {
  id: PartyStatus;
  label: string;
  tone: string;
}[] = [
  { id: "active", label: "Active", tone: "text-[var(--color-success)] border-[color-mix(in_oklab,var(--color-success)_40%,var(--color-border))]" },
  { id: "unconscious", label: "Unconscious", tone: "text-[var(--color-warn)] border-[color-mix(in_oklab,var(--color-warn)_40%,var(--color-border))]" },
  { id: "dying", label: "Dying", tone: "text-[var(--color-danger)] border-[color-mix(in_oklab,var(--color-danger)_45%,var(--color-border))]" },
  { id: "stable", label: "Stable", tone: "text-[var(--color-steel)] border-[color-mix(in_oklab,var(--color-steel)_40%,var(--color-border))]" },
  { id: "dead", label: "Dead", tone: "text-[var(--color-fg-subtle)] border-[var(--color-border-strong)]" },
  { id: "absent", label: "Absent", tone: "text-[var(--color-fg-subtle)] border-[var(--color-border)]" },
];

export function PartyTracker({
  characters,
  seats,
  isDm,
  selfId,
  compact,
  onChange,
  onRoll,
}: {
  characters: CharacterSheet[];
  seats: { peerId: string; name: string; connected: boolean }[];
  isDm: boolean;
  selfId: string;
  /** Sidebar density */
  compact?: boolean;
  onChange: (sheet: CharacterSheet) => void;
  onRoll?: (expr: string, label: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "hurt" | "buffed">("all");

  const sorted = useMemo(() => {
    let list = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    if (filter === "hurt") {
      list = list.filter((c) => c.currentHp < c.maxHp || (c.status && c.status !== "active"));
    } else if (filter === "buffed") {
      list = list.filter((c) => (c.effects?.length ?? 0) > 0 || c.conditions.length > 0);
    }
    return list;
  }, [characters, filter]);

  const partyHp = useMemo(() => {
    const cur = characters.reduce((s, c) => s + Math.max(0, c.currentHp), 0);
    const max = characters.reduce((s, c) => s + Math.max(1, c.maxHp), 0);
    return { cur, max, pct: max ? Math.round((cur / max) * 100) : 100 };
  }, [characters]);

  if (characters.length === 0) {
    return (
      <div className="flex h-full flex-col gap-3">
        <Header compact={compact} partyHp={partyHp} count={0} />
        <p className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-8 text-center text-xs text-[var(--color-fg-subtle)]">
          {isDm
            ? "No party sheets yet. Players create a character from the Sheet tab, or you can wait for them to join."
            : "Create your character in the Sheet tab to appear on the party tracker."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <Header compact={compact} partyHp={partyHp} count={characters.length} />

      <div className="flex flex-wrap gap-1.5">
        {(
          [
            ["all", "All"],
            ["hurt", "Hurt"],
            ["buffed", "Buffed"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            type="button"
            size="sm"
            variant={filter === id ? "steel" : "ghost"}
            onClick={() => setFilter(id)}
          >
            {label}
          </Button>
        ))}
        {isDm && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="ml-auto"
            onClick={() => {
              for (const c of characters) {
                onChange({
                  ...c,
                  currentHp: c.maxHp,
                  tempHp: 0,
                  status: "active",
                  deathSaves: { successes: 0, failures: 0 },
                  conditions: c.conditions.filter((x) => x !== "Unconscious" && x !== "Prone"),
                });
              }
            }}
          >
            <Heart className="size-3.5" />
            Full heal
          </Button>
        )}
      </div>

      <div className={cn("grid gap-2", !compact && "sm:grid-cols-1")}>
        {sorted.map((pc) => {
          const open = expanded === pc.id || !compact;
          const seat = seats.find((s) => s.peerId === pc.ownerPeerId);
          const canEdit = isDm || pc.ownerPeerId === selfId;
          const pct = Math.max(
            0,
            Math.min(100, (pc.currentHp / Math.max(1, pc.maxHp)) * 100),
          );
          const status = pc.status ?? "active";
          const statusMeta = STATUS_META.find((s) => s.id === status) ?? STATUS_META[0]!;
          const effects = pc.effects ?? [];
          const death = pc.deathSaves ?? { successes: 0, failures: 0 };

          return (
            <article
              key={pc.id}
              className={cn(
                "rounded-[var(--radius-md)] border bg-[var(--color-bg)] transition-colors",
                status === "dying" || status === "dead"
                  ? "border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))]"
                  : "border-[var(--color-border)]",
              )}
            >
              {/* Summary row */}
              <button
                type="button"
                className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left"
                onClick={() => setExpanded(open && compact ? null : pc.id)}
              >
                <span
                  className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[var(--color-accent-fg)] ring-2 ring-[var(--color-border)]"
                  style={{ background: pc.tokenColor }}
                >
                  {pc.name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="truncate font-medium text-[var(--color-fg)]">
                      {pc.name}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-1.5 py-0 text-[10px] font-medium uppercase tracking-wide",
                        statusMeta.tone,
                      )}
                    >
                      {statusMeta.label}
                    </span>
                    {pc.inspiration && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-[var(--color-warn)]">
                        <Sparkles className="size-3" />
                        Insp
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[11px] text-[var(--color-fg-subtle)]">
                    {pc.playerName}
                    {seat?.connected === false ? " · offline" : ""}
                    {" · "}
                    L{pc.level} {pc.className}
                    {pc.race ? ` · ${pc.race}` : ""}
                  </p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-200",
                        pct <= 25
                          ? "bg-[var(--color-danger)]"
                          : pct <= 50
                            ? "bg-[var(--color-warn)]"
                            : "bg-[var(--color-success)]",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] tabular-nums text-[var(--color-fg-muted)]">
                    <span>
                      HP {pc.currentHp}
                      {pc.tempHp > 0 ? `+${pc.tempHp}` : ""}/{pc.maxHp}
                    </span>
                    <span>AC {pc.ac}</span>
                    {(pc.gold ?? 0) > 0 && <span>{pc.gold} gp</span>}
                    {(pc.items?.length ?? 0) > 0 && (
                      <span>{pc.items!.length} item{pc.items!.length === 1 ? "" : "s"}</span>
                    )}
                    {effects.length > 0 && (
                      <span className="text-[var(--color-steel)]">
                        {effects.length} effect{effects.length === 1 ? "" : "s"}
                      </span>
                    )}
                    {pc.conditions.length > 0 && (
                      <span className="text-[var(--color-warn)]">
                        {pc.conditions.slice(0, 3).join(", ")}
                        {pc.conditions.length > 3 ? "…" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded controls */}
              {open && (
                <div className="border-t border-[var(--color-border)] px-3 py-3">
                  {/* Quick HP */}
                  {canEdit && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {[-10, -5, -1, 1, 5, 10].map((n) => (
                        <Button
                          key={n}
                          type="button"
                          size="sm"
                          variant="secondary"
                          className={cn(
                            "tabular-nums",
                            n < 0 && "text-[var(--color-danger)]",
                          )}
                          onClick={() => {
                            let hp = pc.currentHp;
                            let temp = pc.tempHp;
                            if (n < 0) {
                              let dmg = -n;
                              if (temp > 0) {
                                const absorb = Math.min(temp, dmg);
                                temp -= absorb;
                                dmg -= absorb;
                              }
                              hp = Math.max(0, hp - dmg);
                            } else {
                              hp = Math.min(pc.maxHp, hp + n);
                            }
                            let nextStatus = pc.status ?? "active";
                            if (hp <= 0 && nextStatus === "active") nextStatus = "dying";
                            if (hp > 0 && (nextStatus === "dying" || nextStatus === "unconscious" || nextStatus === "stable")) {
                              nextStatus = "active";
                            }
                            onChange({
                              ...pc,
                              currentHp: hp,
                              tempHp: temp,
                              status: nextStatus,
                              conditions:
                                hp <= 0 && !pc.conditions.includes("Unconscious")
                                  ? [...pc.conditions, "Unconscious"]
                                  : hp > 0
                                    ? pc.conditions.filter((c) => c !== "Unconscious")
                                    : pc.conditions,
                            });
                          }}
                        >
                          {n > 0 ? `+${n}` : n}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className={cn("grid gap-2", !compact && "sm:grid-cols-3")}>
                    <NumField
                      label="HP"
                      value={pc.currentHp}
                      disabled={!canEdit}
                      onChange={(v) => onChange({ ...pc, currentHp: v })}
                    />
                    <NumField
                      label="Temp"
                      value={pc.tempHp}
                      disabled={!canEdit}
                      onChange={(v) => onChange({ ...pc, tempHp: Math.max(0, v) })}
                    />
                    <NumField
                      label="Max"
                      value={pc.maxHp}
                      disabled={!canEdit}
                      onChange={(v) => onChange({ ...pc, maxHp: Math.max(1, v) })}
                    />
                    <NumField
                      label="AC"
                      value={pc.ac}
                      disabled={!canEdit}
                      onChange={(v) => onChange({ ...pc, ac: v })}
                    />
                    <label className="grid gap-0.5">
                      <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                        Status
                      </span>
                      <select
                        disabled={!canEdit}
                        value={status}
                        onChange={(e) =>
                          onChange({
                            ...pc,
                            status: e.target.value as PartyStatus,
                          })
                        }
                        className="flex h-9 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2 text-sm disabled:opacity-60"
                      >
                        {STATUS_META.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex items-end gap-2 pb-1">
                      <input
                        type="checkbox"
                        disabled={!canEdit}
                        checked={!!pc.inspiration}
                        onChange={(e) =>
                          onChange({ ...pc, inspiration: e.target.checked })
                        }
                        className="size-4 accent-[var(--color-warn)]"
                      />
                      <span className="text-xs text-[var(--color-fg-muted)]">Inspiration</span>
                    </label>
                  </div>

                  {/* Death saves when dying / unconscious */}
                  {(status === "dying" || status === "stable" || status === "unconscious") && (
                    <div className="mt-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2">
                      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]">
                        Death saves
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <DeathPips
                          label="Success"
                          value={death.successes}
                          max={3}
                          tone="success"
                          disabled={!canEdit}
                          onChange={(successes) =>
                            onChange({
                              ...pc,
                              deathSaves: { ...death, successes },
                              status: successes >= 3 ? "stable" : pc.status,
                            })
                          }
                        />
                        <DeathPips
                          label="Failure"
                          value={death.failures}
                          max={3}
                          tone="danger"
                          disabled={!canEdit}
                          onChange={(failures) =>
                            onChange({
                              ...pc,
                              deathSaves: { ...death, failures },
                              status: failures >= 3 ? "dead" : pc.status,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Conditions */}
                  <div className="mt-3">
                    <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]">
                      Conditions
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {CONDITIONS_5E.map((c) => {
                        const on = pc.conditions.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            disabled={!canEdit}
                            onClick={() => {
                              if (!canEdit) return;
                              onChange({
                                ...pc,
                                conditions: on
                                  ? pc.conditions.filter((x) => x !== c)
                                  : [...pc.conditions, c],
                              });
                            }}
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-[11px] transition-colors disabled:opacity-50",
                              on
                                ? "border-[var(--color-warn)] bg-[color-mix(in_oklab,var(--color-warn)_16%,transparent)] text-[var(--color-warn)]"
                                : "border-[var(--color-border)] text-[var(--color-fg-subtle)] hover:border-[var(--color-border-strong)]",
                            )}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Effects / buffs */}
                  <div className="mt-3">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]">
                        Buffs & effects
                      </p>
                      {canEdit && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            onChange({
                              ...pc,
                              effects: [
                                ...effects,
                                newEffect({ name: "Custom effect", kind: "buff" }),
                              ],
                            })
                          }
                        >
                          <Plus className="size-3.5" />
                          Add
                        </Button>
                      )}
                    </div>

                    {canEdit && (
                      <div className="mb-2 flex flex-wrap gap-1">
                        {COMMON_EFFECTS.slice(0, compact ? 6 : 12).map((fx) => (
                          <Button
                            key={fx.name}
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="h-7 text-[11px]"
                            onClick={() =>
                              onChange({
                                ...pc,
                                effects: [
                                  ...effects,
                                  newEffect({
                                    name: fx.name,
                                    kind: fx.kind,
                                    duration: fx.duration,
                                  }),
                                ],
                              })
                            }
                          >
                            {fx.name}
                          </Button>
                        ))}
                      </div>
                    )}

                    {effects.length === 0 ? (
                      <p className="text-xs text-[var(--color-fg-subtle)]">No active effects.</p>
                    ) : (
                      <ul className="grid gap-1.5">
                        {effects.map((fx) => (
                          <EffectRow
                            key={fx.id}
                            effect={fx}
                            canEdit={canEdit}
                            onChange={(next) =>
                              onChange({
                                ...pc,
                                effects: effects.map((e) => (e.id === next.id ? next : e)),
                              })
                            }
                            onRemove={() =>
                              onChange({
                                ...pc,
                                effects: effects.filter((e) => e.id !== fx.id),
                              })
                            }
                          />
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Session notes / slots */}
                  {canEdit && (
                    <div className={cn("mt-3 grid gap-2", !compact && "sm:grid-cols-2")}>
                      <label className="grid gap-0.5">
                        <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                          Spell slots
                        </span>
                        <Input
                          value={pc.spellSlots ?? ""}
                          onChange={(e) =>
                            onChange({ ...pc, spellSlots: e.target.value })
                          }
                          placeholder="4/3/2…"
                          className="h-8 text-xs"
                        />
                      </label>
                      <label className="grid gap-0.5">
                        <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                          Hit dice
                        </span>
                        <Input
                          value={pc.hitDice ?? ""}
                          onChange={(e) =>
                            onChange({ ...pc, hitDice: e.target.value })
                          }
                          placeholder="3d10 remaining"
                          className="h-8 text-xs"
                        />
                      </label>
                      <label className="grid gap-0.5 sm:col-span-2">
                        <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                          Session notes
                        </span>
                        <Input
                          value={pc.notes}
                          onChange={(e) => onChange({ ...pc, notes: e.target.value })}
                          placeholder="Goals, bonds, reminders…"
                          className="h-8 text-xs"
                        />
                      </label>
                    </div>
                  )}

                  {onRoll && canEdit && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="steel"
                        onClick={() =>
                          onRoll(
                            `1d20${pc.initiativeMod >= 0 ? `+${pc.initiativeMod}` : pc.initiativeMod}`,
                            `${pc.name} initiative`,
                          )
                        }
                      >
                        <Zap className="size-3.5" />
                        Init
                      </Button>
                      {(["str", "dex", "con", "int", "wis", "cha"] as const).map((k) => {
                        const mod = Math.floor(((pc.abilities[k] ?? 10) - 10) / 2);
                        return (
                          <Button
                            key={k}
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="uppercase tabular-nums"
                            onClick={() =>
                              onRoll(
                                `1d20${mod >= 0 ? `+${mod}` : mod}`,
                                `${pc.name} ${k.toUpperCase()}`,
                              )
                            }
                          >
                            {k} {mod >= 0 ? `+${mod}` : mod}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Header({
  compact,
  partyHp,
  count,
}: {
  compact?: boolean;
  partyHp: { cur: number; max: number; pct: number };
  count: number;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Users className="size-4 text-[var(--color-steel)]" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
          Party
        </h3>
        <span className="text-xs tabular-nums text-[var(--color-fg-subtle)]">
          {count}
        </span>
      </div>
      {count > 0 && (
        <div className="flex min-w-0 items-center gap-2">
          {!compact && (
            <span className="text-[11px] tabular-nums text-[var(--color-fg-subtle)]">
              Party HP {partyHp.cur}/{partyHp.max}
            </span>
          )}
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--color-bg-subtle)] sm:w-20">
            <div
              className={cn(
                "h-full rounded-full",
                partyHp.pct <= 30
                  ? "bg-[var(--color-danger)]"
                  : partyHp.pct <= 60
                    ? "bg-[var(--color-warn)]"
                    : "bg-[var(--color-success)]",
              )}
              style={{ width: `${partyHp.pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-0.5">
      <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
        {label}
      </span>
      <Input
        type="number"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-9 tabular-nums"
      />
    </label>
  );
}

function DeathPips({
  label,
  value,
  max,
  tone,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  tone: "success" | "danger";
  disabled?: boolean;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-[var(--color-fg-muted)]">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => onChange(i < value ? i : i + 1)}
            className={cn(
              "size-4 rounded-full border transition-colors disabled:opacity-50",
              i < value
                ? tone === "success"
                  ? "border-[var(--color-success)] bg-[var(--color-success)]"
                  : "border-[var(--color-danger)] bg-[var(--color-danger)]"
                : "border-[var(--color-border-strong)] bg-transparent",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function EffectRow({
  effect,
  canEdit,
  onChange,
  onRemove,
}: {
  effect: ActiveEffect;
  canEdit: boolean;
  onChange: (e: ActiveEffect) => void;
  onRemove: () => void;
}) {
  return (
    <li
      className={cn(
        "rounded-[var(--radius-sm)] border px-2 py-1.5",
        effect.kind === "buff"
          ? "border-[color-mix(in_oklab,var(--color-success)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-success)_6%,var(--color-bg))]"
          : effect.kind === "debuff"
            ? "border-[color-mix(in_oklab,var(--color-danger)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_6%,var(--color-bg))]"
            : "border-[var(--color-border)] bg-[var(--color-bg-elevated)]",
      )}
    >
      {canEdit ? (
        <div className="grid gap-1.5 sm:grid-cols-[1fr_auto_auto]">
          <Input
            value={effect.name}
            onChange={(e) => onChange({ ...effect, name: e.target.value })}
            className="h-8 text-sm font-medium"
          />
          <select
            value={effect.kind}
            onChange={(e) =>
              onChange({
                ...effect,
                kind: e.target.value as ActiveEffect["kind"],
              })
            }
            className="h-8 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2 text-xs"
          >
            <option value="buff">Buff</option>
            <option value="debuff">Debuff</option>
            <option value="other">Other</option>
          </select>
          <Button type="button" size="icon-sm" variant="ghost" onClick={onRemove}>
            <Trash2 className="size-3.5" />
          </Button>
          <Input
            value={effect.duration}
            onChange={(e) => onChange({ ...effect, duration: e.target.value })}
            placeholder="Duration"
            className="h-8 text-xs sm:col-span-2"
          />
          <Input
            value={effect.source}
            onChange={(e) => onChange({ ...effect, source: e.target.value })}
            placeholder="Source"
            className="h-8 text-xs"
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">{effect.name}</span>
            <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
              {effect.kind}
            </span>
          </div>
          {(effect.duration || effect.source) && (
            <p className="mt-0.5 text-[11px] text-[var(--color-fg-muted)]">
              {[effect.duration, effect.source].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      )}
    </li>
  );
}
