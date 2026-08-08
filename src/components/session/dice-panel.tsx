import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/lib/store/session-store";

function roll(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

const DICE = [4, 6, 8, 10, 12, 20, 100] as const;

export function DicePanel() {
  const diceLog = useSessionStore((s) => s.diceLog);
  const pushDice = useSessionStore((s) => s.pushDice);

  function onRoll(sides: number) {
    const result = roll(sides);
    const stamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    pushDice(`${stamp}  d${sides} → ${result}`);
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
        <Dices className="size-4" />
        <h3 className="font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase">
          Dice
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {DICE.map((d) => (
          <Button
            key={d}
            type="button"
            variant="secondary"
            size="sm"
            className="tabular-nums"
            onClick={() => onRoll(d)}
          >
            d{d}
          </Button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2">
        {diceLog.length === 0 ? (
          <p className="py-4 text-center text-xs text-[var(--color-fg-subtle)]">No rolls yet</p>
        ) : (
          <ul className="space-y-1">
            {diceLog.map((entry, i) => (
              <li
                key={`${entry}-${i}`}
                className="font-mono text-xs tabular-nums text-[var(--color-fg-muted)]"
              >
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
