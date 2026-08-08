import { Hexagon, RotateCcw } from "lucide-react";
import type { RunestoneHazard } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/lib/store/session-store";
import { cn } from "@/lib/utils";

export function RunestoneTracker({ hazard }: { hazard: RunestoneHazard }) {
  const runestones = useSessionStore((s) => s.runestones);
  const shatterRunestone = useSessionStore((s) => s.shatterRunestone);
  const restoreRunestone = useSessionStore((s) => s.restoreRunestone);
  const resetRunestones = useSessionStore((s) => s.resetRunestones);

  const shatteredCount = runestones.shattered.filter(Boolean).length;
  const sealBroken = shatteredCount >= hazard.shatterThreshold;

  return (
    <section className="rounded-[var(--radius-lg)] border border-[color-mix(in_oklab,var(--color-rune)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-rune)_6%,var(--color-bg-elevated))] p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[var(--color-rune)]">
            <Hexagon className="size-4" />
            <h3 className="font-display text-sm font-semibold tracking-wide uppercase">
              Arena hazard
            </h3>
          </div>
          <h4 className="font-display text-xl font-semibold text-[var(--color-fg)]">
            {hazard.title}
          </h4>
          <p className="mt-1 max-w-2xl text-sm text-[var(--color-fg-muted)]">
            {hazard.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="steel">AC {hazard.ac}</Badge>
            <Badge variant="steel">{hazard.hp} HP</Badge>
            <Badge variant="outline">
              Shatter {hazard.shatterThreshold} of {hazard.count} to break seal
            </Badge>
          </div>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={resetRunestones}>
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {runestones.shattered.map((shattered, i) => (
          <button
            key={i}
            type="button"
            onClick={() => (shattered ? restoreRunestone(i) : shatterRunestone(i))}
            className={cn(
              "group flex flex-col items-center gap-2 rounded-[var(--radius-md)] border p-4 transition-colors",
              shattered
                ? "border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_12%,var(--color-bg))]"
                : "border-[color-mix(in_oklab,var(--color-rune)_40%,var(--color-border))] bg-[var(--color-bg)] hover:bg-[color-mix(in_oklab,var(--color-rune)_10%,var(--color-bg))]",
            )}
          >
            <Hexagon
              className={cn(
                "size-10 transition-opacity",
                shattered ? "text-[var(--color-danger)] opacity-50" : "text-[var(--color-rune)]",
              )}
              strokeWidth={1.25}
              fill={shattered ? "currentColor" : "none"}
            />
            <span className="text-xs font-medium text-[var(--color-fg-muted)]">
              Stone {i + 1}
            </span>
            <span
              className={cn(
                "text-[10px] tracking-wide uppercase",
                shattered ? "text-[var(--color-danger)]" : "text-[var(--color-rune)]",
              )}
            >
              {shattered ? "Shattered" : "Intact"}
            </span>
          </button>
        ))}
      </div>

      <div
        className={cn(
          "mb-4 rounded-[var(--radius-md)] border px-3.5 py-2.5 text-sm",
          sealBroken
            ? "border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_12%,var(--color-bg))] text-[var(--color-fg)]"
            : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg-muted)]",
        )}
      >
        <span className="font-medium tabular-nums">
          Seal integrity: {hazard.count - shatteredCount} / {hazard.count} stones intact
        </span>
        {sealBroken && (
          <p className="mt-1 text-[var(--color-fg-muted)]">
            Threshold met — the final gladiator falls, the arena quakes, and the cliffhanger
            sequence triggers immediately.
          </p>
        )}
      </div>

      <div className="grid gap-2">
        {hazard.mechanics.map((m) => (
          <div
            key={m.name}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3"
          >
            <p className="mb-1 text-sm font-medium text-[var(--color-fg)]">{m.name}</p>
            <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
