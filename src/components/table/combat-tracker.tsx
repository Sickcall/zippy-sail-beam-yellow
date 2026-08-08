import { ChevronRight, Plus, Swords, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CombatState, CharacterSheet } from "@/lib/table/types";
import { cn } from "@/lib/utils";

export function CombatTracker({
  combat,
  characters,
  isDm,
  onChange,
}: {
  combat: CombatState;
  characters: CharacterSheet[];
  isDm: boolean;
  onChange: (c: CombatState) => void;
}) {
  function sort() {
    const combatants = [...combat.combatants]
      .sort((a, b) => b.init - a.init)
      .map((c, i) => ({ ...c, active: i === 0 }));
    onChange({ ...combat, combatants, round: 1, active: true });
  }

  function next() {
    if (combat.combatants.length === 0) return;
    const idx = combat.combatants.findIndex((c) => c.active);
    const nextIdx = idx < 0 ? 0 : (idx + 1) % combat.combatants.length;
    const round = nextIdx === 0 ? combat.round + 1 : combat.round;
    onChange({
      ...combat,
      round,
      active: true,
      combatants: combat.combatants.map((c, i) => ({ ...c, active: i === nextIdx })),
    });
  }

  function addFromParty() {
    const combatants = characters.map((ch) => ({
      id: `cb-${ch.id}`,
      name: ch.name,
      init: 10 + ch.initiativeMod,
      isPc: true,
      characterId: ch.id,
      hp: ch.currentHp,
      maxHp: ch.maxHp,
      ac: ch.ac,
      conditions: ch.conditions,
      active: false,
    }));
    onChange({ ...combat, combatants, active: true, round: 1 });
  }

  function addNpc(name = "Enemy") {
    const id = `cb-${Date.now()}`;
    onChange({
      ...combat,
      active: true,
      combatants: [
        ...combat.combatants,
        {
          id,
          name,
          init: 10,
          isPc: false,
          hp: 20,
          maxHp: 20,
          ac: 13,
          conditions: [],
          active: combat.combatants.length === 0,
        },
      ],
    });
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Swords className="size-4 text-[var(--color-steel)]" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
            Combat
          </h3>
        </div>
        <span className="text-xs tabular-nums text-[var(--color-fg-subtle)]">
          {combat.active ? `Round ${combat.round}` : "Idle"}
        </span>
      </div>

      {isDm && (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={addFromParty}>
            Import party
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={() => addNpc()}>
            <Plus className="size-3.5" />
            NPC
          </Button>
          <Button type="button" size="sm" variant="steel" onClick={sort}>
            Sort
          </Button>
          <Button type="button" size="sm" onClick={next}>
            <ChevronRight className="size-3.5" />
            Next
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() =>
              onChange({ active: false, round: 1, combatants: [] })
            }
          >
            End
          </Button>
        </div>
      )}

      <div className="grid gap-1.5">
        {combat.combatants.length === 0 && (
          <p className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-6 text-center text-xs text-[var(--color-fg-subtle)]">
            {isDm ? "Import the party or add NPCs to start combat." : "Waiting for combat…"}
          </p>
        )}
        {combat.combatants.map((c) => {
          const pct = Math.max(0, Math.min(100, (c.hp / Math.max(1, c.maxHp)) * 100));
          return (
            <div
              key={c.id}
              className={cn(
                "rounded-[var(--radius-sm)] border px-2.5 py-2",
                c.active
                  ? "border-[color-mix(in_oklab,var(--color-steel)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-steel)_12%,var(--color-bg))]"
                  : "border-[var(--color-border)] bg-[var(--color-bg)]",
              )}
            >
              <div className="flex items-center gap-2">
                {isDm ? (
                  <Input
                    type="number"
                    value={c.init}
                    onChange={(e) =>
                      onChange({
                        ...combat,
                        combatants: combat.combatants.map((x) =>
                          x.id === c.id ? { ...x, init: Number(e.target.value) || 0 } : x,
                        ),
                      })
                    }
                    className="h-8 w-14 px-2 text-center text-xs tabular-nums"
                  />
                ) : (
                  <span className="w-10 text-center text-xs tabular-nums text-[var(--color-fg-muted)]">
                    {c.init}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{c.name}</span>
                    <span className="text-xs tabular-nums text-[var(--color-fg-muted)]">
                      AC {c.ac}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        pct <= 30 ? "bg-[var(--color-danger)]" : "bg-[var(--color-success)]",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {isDm ? (
                      <>
                        <Input
                          type="number"
                          value={c.hp}
                          onChange={(e) =>
                            onChange({
                              ...combat,
                              combatants: combat.combatants.map((x) =>
                                x.id === c.id
                                  ? { ...x, hp: Number(e.target.value) || 0 }
                                  : x,
                              ),
                            })
                          }
                          className="h-7 w-16 px-2 text-xs tabular-nums"
                        />
                        <span className="text-xs text-[var(--color-fg-subtle)]">/ {c.maxHp}</span>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          className="ml-auto"
                          onClick={() =>
                            onChange({
                              ...combat,
                              combatants: combat.combatants.filter((x) => x.id !== c.id),
                            })
                          }
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs tabular-nums text-[var(--color-fg-muted)]">
                        {c.isPc || true ? `${c.hp}/${c.maxHp}` : "??"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
