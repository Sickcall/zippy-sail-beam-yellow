import { Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSessionStore } from "@/lib/store/session-store";
import { cn } from "@/lib/utils";

export function PartyPanel() {
  const party = useSessionStore((s) => s.party);
  const addPartyMember = useSessionStore((s) => s.addPartyMember);
  const updatePartyMember = useSessionStore((s) => s.updatePartyMember);
  const removePartyMember = useSessionStore((s) => s.removePartyMember);

  const [name, setName] = useState("");
  const [classLabel, setClassLabel] = useState("");

  function add() {
    const n = name.trim();
    if (!n) return;
    addPartyMember({
      name: n,
      classLabel: classLabel.trim() || "Adventurer",
      maxHp: 10,
      currentHp: 10,
      ac: 12,
      notes: "",
      conditions: [],
    });
    setName("");
    setClassLabel("");
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
        <Users className="size-4" />
        <h3 className="font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase">
          Party
        </h3>
      </div>

      <div className="grid gap-2">
        {party.length === 0 && (
          <p className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]">
            Add characters to track HP, AC, and conditions at the table.
          </p>
        )}
        {party.map((pc) => {
          const hpPct = Math.max(0, Math.min(100, (pc.currentHp / Math.max(1, pc.maxHp)) * 100));
          const low = hpPct <= 30;
          return (
            <div
              key={pc.id}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Input
                    value={pc.name}
                    onChange={(e) => updatePartyMember(pc.id, { name: e.target.value })}
                    className="h-8 border-transparent bg-transparent px-0 text-sm font-medium focus-visible:border-[var(--color-border)] focus-visible:bg-[var(--color-bg-elevated)] focus-visible:px-2"
                  />
                  <Input
                    value={pc.classLabel}
                    onChange={(e) => updatePartyMember(pc.id, { classLabel: e.target.value })}
                    className="mt-0.5 h-7 border-transparent bg-transparent px-0 text-xs text-[var(--color-fg-muted)] focus-visible:border-[var(--color-border)] focus-visible:bg-[var(--color-bg-elevated)] focus-visible:px-2"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removePartyMember(pc.id)}
                  aria-label={`Remove ${pc.name}`}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>

              <div className="mb-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]">
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-200",
                    low ? "bg-[var(--color-danger)]" : "bg-[var(--color-success)]",
                  )}
                  style={{ width: `${hpPct}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <label className="grid gap-0.5">
                  <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
                    HP
                  </span>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={pc.currentHp}
                      onChange={(e) =>
                        updatePartyMember(pc.id, { currentHp: Number(e.target.value) || 0 })
                      }
                      className="h-8 px-2 text-xs tabular-nums"
                    />
                    <span className="text-xs text-[var(--color-fg-subtle)]">/</span>
                    <Input
                      type="number"
                      value={pc.maxHp}
                      onChange={(e) =>
                        updatePartyMember(pc.id, { maxHp: Number(e.target.value) || 1 })
                      }
                      className="h-8 px-2 text-xs tabular-nums"
                    />
                  </div>
                </label>
                <label className="grid gap-0.5">
                  <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
                    AC
                  </span>
                  <Input
                    type="number"
                    value={pc.ac}
                    onChange={(e) =>
                      updatePartyMember(pc.id, { ac: Number(e.target.value) || 0 })
                    }
                    className="h-8 px-2 text-xs tabular-nums"
                  />
                </label>
                <label className="grid gap-0.5">
                  <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
                    Notes
                  </span>
                  <Input
                    value={pc.notes}
                    onChange={(e) => updatePartyMember(pc.id, { notes: e.target.value })}
                    placeholder="Buffs..."
                    className="h-8 px-2 text-xs"
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto grid gap-2 border-t border-[var(--color-border)] pt-3">
        <Input
          placeholder="Character name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <div className="flex gap-2">
          <Input
            placeholder="Class"
            value={classLabel}
            onChange={(e) => setClassLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <Button type="button" variant="secondary" onClick={add} className="shrink-0">
            <Plus className="size-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
