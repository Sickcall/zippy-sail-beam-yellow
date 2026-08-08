import { useState } from "react";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DiceEntry } from "@/lib/table/types";

const QUICK = ["1d20", "1d4", "1d6", "1d8", "1d10", "1d12", "2d6", "1d100"] as const;

export function SharedDice({
  log,
  onRoll,
  isDm,
}: {
  log: DiceEntry[];
  onRoll: (expr: string, label?: string, secret?: boolean) => void;
  isDm: boolean;
}) {
  const [expr, setExpr] = useState("1d20");
  const [secret, setSecret] = useState(false);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Dices className="size-4 text-[var(--color-steel)]" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Dice</h3>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {QUICK.map((d) => (
          <Button
            key={d}
            type="button"
            size="sm"
            variant="secondary"
            className="tabular-nums"
            onClick={() => onRoll(d)}
          >
            {d}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="2d6+3"
          className="font-mono text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") onRoll(expr, undefined, secret);
          }}
        />
        <Button type="button" onClick={() => onRoll(expr, undefined, secret)}>
          Roll
        </Button>
      </div>

      {isDm && (
        <label className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
          <input
            type="checkbox"
            checked={secret}
            onChange={(e) => setSecret(e.target.checked)}
            className="size-3.5 accent-[var(--color-steel)]"
          />
          Secret roll (DM only)
        </label>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_80%,var(--color-bg-subtle))] p-2 scrollbar-thin">
        {log.length === 0 ? (
          <p className="py-6 text-center text-xs text-[var(--color-fg-subtle)]">No rolls yet</p>
        ) : (
          <ul className="space-y-1.5">
            {log.map((d) => (
              <li
                key={d.id}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2.5 py-1.5 shadow-[var(--shadow-inset)]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-xs font-medium text-[var(--color-fg)]">
                    {d.name}
                    {d.secret ? " · secret" : ""}
                  </span>
                  <span className="font-display text-sm font-semibold tabular-nums text-[var(--color-steel)]">
                    {d.total}
                  </span>
                </div>
                <p className="truncate font-mono text-[10px] text-[var(--color-fg-subtle)]">
                  {d.expression}: {d.detail}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
