import { ChevronRight, Plus, RotateCcw, Swords, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSessionStore, type InitiativeEntry } from "@/lib/store/session-store";
import { cn } from "@/lib/utils";

export function InitiativePanel() {
  const initiative = useSessionStore((s) => s.initiative);
  const initiativeRound = useSessionStore((s) => s.initiativeRound);
  const setInitiative = useSessionStore((s) => s.setInitiative);
  const sortInitiative = useSessionStore((s) => s.sortInitiative);
  const nextInitiative = useSessionStore((s) => s.nextInitiative);
  const clearInitiative = useSessionStore((s) => s.clearInitiative);
  const party = useSessionStore((s) => s.party);

  const [name, setName] = useState("");
  const [init, setInit] = useState("10");

  function addEntry(entryName: string, isPc: boolean, initVal = 10) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const next: InitiativeEntry = {
      id,
      name: entryName,
      init: initVal,
      isPc,
      active: initiative.length === 0,
    };
    setInitiative([...initiative, next]);
  }

  function addManual() {
    const n = name.trim();
    if (!n) return;
    addEntry(n, false, Number(init) || 0);
    setName("");
  }

  function updateInit(id: string, value: number) {
    setInitiative(initiative.map((e) => (e.id === id ? { ...e, init: value } : e)));
  }

  function remove(id: string) {
    setInitiative(initiative.filter((e) => e.id !== id));
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
          <Swords className="size-4" />
          <h3 className="font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase">
            Initiative
          </h3>
        </div>
        <span className="text-xs tabular-nums text-[var(--color-fg-subtle)]">
          Round {initiativeRound}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant="secondary" onClick={sortInitiative}>
          Sort
        </Button>
        <Button type="button" size="sm" variant="steel" onClick={nextInitiative}>
          <ChevronRight className="size-3.5" />
          Next
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={clearInitiative}>
          <RotateCcw className="size-3.5" />
          Clear
        </Button>
      </div>

      {party.length > 0 && initiative.length === 0 && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            party.forEach((p) => addEntry(p.name, true, 10));
          }}
        >
          Import party
        </Button>
      )}

      <div className="grid gap-1.5">
        {initiative.length === 0 && (
          <p className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]">
            Add combatants, set scores, then Sort.
          </p>
        )}
        {initiative.map((e) => (
          <div
            key={e.id}
            className={cn(
              "flex items-center gap-2 rounded-[var(--radius-sm)] border px-2 py-1.5",
              e.active
                ? "border-[color-mix(in_oklab,var(--color-steel)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-steel)_12%,var(--color-bg))]"
                : "border-[var(--color-border)] bg-[var(--color-bg)]",
            )}
          >
            <Input
              type="number"
              value={e.init}
              onChange={(ev) => updateInit(e.id, Number(ev.target.value) || 0)}
              className="h-8 w-14 px-2 text-center text-xs tabular-nums"
            />
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-sm",
                e.isPc ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]",
              )}
            >
              {e.name}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(e.id)}
              aria-label={`Remove ${e.name}`}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-auto grid gap-2 border-t border-[var(--color-border)] pt-3">
        <div className="flex gap-2">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addManual()}
          />
          <Input
            type="number"
            value={init}
            onChange={(e) => setInit(e.target.value)}
            className="w-16 shrink-0 text-center tabular-nums"
            aria-label="Initiative score"
          />
          <Button type="button" variant="secondary" onClick={addManual} className="shrink-0">
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
