import { useMemo, useState } from "react";
import { Crosshair, Plus, Swords, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BESTIARY,
  makeBestiaryNpc,
  type BestiaryEntry,
} from "@/lib/map/bestiary";
import type { NpcStatBlock } from "@/lib/table/types";
import { cn } from "@/lib/utils";

export function EncounterPalette({
  customNpcs,
  pending,
  onPick,
  onClear,
  onAddCustom,
  onDropCenter,
}: {
  customNpcs: NpcStatBlock[];
  pending: NpcStatBlock | null;
  onPick: (npc: NpcStatBlock) => void;
  onClear: () => void;
  onAddCustom: () => void;
  onDropCenter?: () => void;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<BestiaryEntry["category"] | "all" | "yours">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = BESTIARY;
    if (cat !== "all" && cat !== "yours") list = list.filter((b) => b.category === cat);
    if (query) list = list.filter((b) => b.template.name.toLowerCase().includes(query));
    return list;
  }, [q, cat]);

  const customFiltered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return customNpcs.filter((n) => !query || n.name.toLowerCase().includes(query));
  }, [customNpcs, q]);

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3 shadow-[var(--shadow-inset)]">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Swords className="size-4 text-[var(--color-steel)]" />
          <h3 className="font-display text-sm font-semibold tracking-wide uppercase">
            Encounter drop
          </h3>
        </div>
        <div className="flex gap-1.5">
          <Button type="button" size="sm" variant="secondary" onClick={onAddCustom}>
            <Plus className="size-3.5" />
            Custom
          </Button>
          {pending && (
            <Button type="button" size="sm" variant="ghost" onClick={onClear}>
              <X className="size-3.5" />
              Cancel
            </Button>
          )}
        </div>
      </div>

      {pending ? (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-[var(--radius-sm)] border border-[color-mix(in_oklab,var(--color-danger)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_10%,var(--color-bg))] px-3 py-2 text-sm">
          <Crosshair className="size-4 shrink-0 text-[var(--color-danger)]" />
          <span className="flex-1">
            Placing <strong>{pending.name}</strong> — click the map
          </span>
          {onDropCenter && (
            <Button type="button" size="sm" variant="steel" onClick={onDropCenter}>
              Drop center
            </Button>
          )}
        </div>
      ) : (
        <p className="mb-3 text-xs text-[var(--color-fg-subtle)]">
          Pick a foe or NPC, then click the map to drop them. Edit stats after placing.
        </p>
      )}

      <div className="mb-2 flex flex-wrap gap-1.5">
        {(
          [
            ["all", "All"],
            ["yours", "Yours"],
            ["minion", "Minions"],
            ["skirmisher", "Skirmish"],
            ["brute", "Brutes"],
            ["elite", "Elites"],
            ["boss", "Bosses"],
            ["npc", "NPCs"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            type="button"
            size="sm"
            variant={cat === id ? "steel" : "ghost"}
            onClick={() => setCat(id)}
          >
            {label}
          </Button>
        ))}
      </div>

      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search monsters…"
        className="mb-2 h-8"
      />

      <div className="grid max-h-52 gap-1.5 overflow-y-auto scrollbar-thin sm:grid-cols-2">
        {cat !== "yours" &&
          filtered.map((entry) => {
            const active = pending?.name === entry.template.name && pending?.cr === entry.template.cr;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => onPick(makeBestiaryNpc(entry))}
                className={cn(
                  "flex items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2 text-left transition-colors",
                  active
                    ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_14%,var(--color-bg))]"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-strong)]",
                )}
              >
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[var(--color-accent-fg)]"
                  style={{ background: entry.template.tokenColor }}
                >
                  {entry.template.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{entry.template.name}</span>
                  <span className="block text-[11px] text-[var(--color-fg-subtle)]">
                    CR {entry.template.cr} · AC {entry.template.ac} · HP {entry.template.hp}
                  </span>
                </span>
              </button>
            );
          })}

        {(cat === "all" || cat === "yours") &&
          customFiltered.map((npc) => (
            <button
              key={npc.id}
              type="button"
              onClick={() => onPick(npc)}
              className={cn(
                "flex items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2 text-left transition-colors",
                pending?.id === npc.id
                  ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_14%,var(--color-bg))]"
                  : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-strong)]",
              )}
            >
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[var(--color-accent-fg)]"
                style={{ background: npc.tokenColor }}
              >
                <UserRound className="size-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{npc.name}</span>
                <span className="block text-[11px] text-[var(--color-fg-subtle)]">
                  Your roster · CR {npc.cr} · HP {npc.hp}
                </span>
              </span>
            </button>
          ))}
      </div>

      {cat === "yours" && customFiltered.length === 0 && (
        <p className="mt-2 text-xs text-[var(--color-fg-subtle)]">
          No custom NPCs yet — add one in Tools, or hit Custom above.
        </p>
      )}
    </div>
  );
}
