import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Clock, HazardCounter, LootItem, SessionLogEntry } from "@/lib/table/types";

export function ClocksPanel({
  clocks,
  onChange,
  isDm,
}: {
  clocks: Clock[];
  onChange: (c: Clock[]) => void;
  isDm: boolean;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Clocks</h3>
        {isDm && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() =>
              onChange([
                ...clocks,
                {
                  id: `clk-${Date.now()}`,
                  name: "Clock",
                  filled: 0,
                  segments: 4,
                },
              ])
            }
          >
            <Plus className="size-3.5" />
            Add
          </Button>
        )}
      </div>
      {clocks.length === 0 && (
        <p className="text-xs text-[var(--color-fg-subtle)]">
          Progress clocks for rituals, pursuits, doom — any campaign.
        </p>
      )}
      {clocks.map((c) => (
        <div
          key={c.id}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2"
        >
          <div className="mb-1 flex items-center gap-2">
            {isDm ? (
              <Input
                value={c.name}
                onChange={(e) =>
                  onChange(clocks.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))
                }
                className="h-8 flex-1"
              />
            ) : (
              <span className="flex-1 text-sm font-medium">{c.name}</span>
            )}
            <span className="text-xs tabular-nums text-[var(--color-fg-muted)]">
              {c.filled}/{c.segments}
            </span>
            {isDm && (
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => onChange(clocks.filter((x) => x.id !== c.id))}
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: c.segments }).map((_, i) => (
              <button
                key={i}
                type="button"
                disabled={!isDm}
                onClick={() =>
                  onChange(
                    clocks.map((x) =>
                      x.id === c.id
                        ? { ...x, filled: i < x.filled ? i : i + 1 }
                        : x,
                    ),
                  )
                }
                className={`size-5 rounded-full border ${
                  i < c.filled
                    ? "border-[var(--color-steel)] bg-[var(--color-steel)]"
                    : "border-[var(--color-border-strong)] bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HazardsPanel({
  hazards,
  onChange,
  isDm,
}: {
  hazards: HazardCounter[];
  onChange: (h: HazardCounter[]) => void;
  isDm: boolean;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
          Hazard counters
        </h3>
        {isDm && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() =>
              onChange([
                ...hazards,
                {
                  id: `hz-${Date.now()}`,
                  name: "Hazard",
                  count: 0,
                  max: 4,
                  notes: "",
                },
              ])
            }
          >
            <Plus className="size-3.5" />
            Add
          </Button>
        )}
      </div>
      <p className="text-xs text-[var(--color-fg-subtle)]">
        Runestones, ritual seals, siege progress — track any multi-step threat.
      </p>
      {hazards.map((h) => (
        <div
          key={h.id}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2"
        >
          <div className="flex items-center gap-2">
            {isDm ? (
              <Input
                value={h.name}
                onChange={(e) =>
                  onChange(hazards.map((x) => (x.id === h.id ? { ...x, name: e.target.value } : x)))
                }
                className="h-8 flex-1"
              />
            ) : (
              <span className="flex-1 text-sm">{h.name}</span>
            )}
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={!isDm}
              onClick={() =>
                onChange(
                  hazards.map((x) =>
                    x.id === h.id
                      ? { ...x, count: Math.min(x.max, x.count + 1) }
                      : x,
                  ),
                )
              }
            >
              {h.count}/{h.max}
            </Button>
            {isDm && (
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => onChange(hazards.filter((x) => x.id !== h.id))}
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function LootPanel({
  loot,
  onChange,
  isDm,
}: {
  loot: LootItem[];
  onChange: (l: LootItem[]) => void;
  isDm: boolean;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Loot</h3>
        {isDm && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() =>
              onChange([
                ...loot,
                { id: `lt-${Date.now()}`, name: "Item", qty: 1, notes: "", claimedBy: "" },
              ])
            }
          >
            <Plus className="size-3.5" />
            Add
          </Button>
        )}
      </div>
      {loot.map((item) => (
        <div
          key={item.id}
          className="grid gap-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2"
        >
          <div className="flex gap-2">
            <Input
              value={item.name}
              disabled={!isDm}
              onChange={(e) =>
                onChange(loot.map((x) => (x.id === item.id ? { ...x, name: e.target.value } : x)))
              }
              className="h-8 flex-1"
            />
            <Input
              type="number"
              value={item.qty}
              disabled={!isDm}
              onChange={(e) =>
                onChange(
                  loot.map((x) =>
                    x.id === item.id ? { ...x, qty: Number(e.target.value) || 0 } : x,
                  ),
                )
              }
              className="h-8 w-16"
            />
            {isDm && (
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => onChange(loot.filter((x) => x.id !== item.id))}
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
          <Input
            value={item.claimedBy}
            disabled={!isDm}
            onChange={(e) =>
              onChange(
                loot.map((x) => (x.id === item.id ? { ...x, claimedBy: e.target.value } : x)),
              )
            }
            placeholder="Claimed by…"
            className="h-8 text-xs"
          />
        </div>
      ))}
    </div>
  );
}

export function SessionLogPanel({
  log,
  onChange,
  isDm,
}: {
  log: SessionLogEntry[];
  onChange: (l: SessionLogEntry[]) => void;
  isDm: boolean;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Session log</h3>
        {isDm && (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              const text = window.prompt("Log entry");
              if (!text?.trim()) return;
              onChange([
                {
                  id: `log-${Date.now()}`,
                  at: Date.now(),
                  text: text.trim(),
                  kind: "note",
                },
                ...log,
              ]);
            }}
          >
            <Plus className="size-3.5" />
            Note
          </Button>
        )}
      </div>
      {log.length === 0 && (
        <p className="text-xs text-[var(--color-fg-subtle)]">Milestones, kills, and story beats.</p>
      )}
      <ul className="max-h-48 space-y-1 overflow-y-auto scrollbar-thin">
        {log.map((e) => (
          <li
            key={e.id}
            className="rounded border border-[var(--color-border)] px-2 py-1.5 text-xs text-[var(--color-fg-muted)]"
          >
            <span className="text-[var(--color-fg-subtle)]">
              {new Date(e.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>{" "}
            {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DmNotesPanel({
  notes,
  onChange,
}: {
  notes: string;
  onChange: (n: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wide">DM private notes</h3>
      <Textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px]"
        placeholder="Secrets, NPC names, upcoming twists — never shown to players as a handout."
      />
      <p className="text-[10px] text-[var(--color-fg-subtle)]">
        Stored with table state for this session. Use Handouts for player-facing text.
      </p>
    </div>
  );
}
