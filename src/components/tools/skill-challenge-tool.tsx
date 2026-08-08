import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SkillChallengeState } from "@/lib/table/types";
import { cn } from "@/lib/utils";

export function SkillChallengeTool({
  challenge,
  onChange,
  isDm,
}: {
  challenge: SkillChallengeState;
  onChange: (c: SkillChallengeState) => void;
  isDm: boolean;
}) {
  if (!isDm && !challenge.active) {
    return (
      <p className="text-xs text-[var(--color-fg-subtle)]">No active skill challenge.</p>
    );
  }

  return (
    <div className="grid gap-3">
      {isDm && (
        <>
          <Input
            value={challenge.title}
            onChange={(e) => onChange({ ...challenge, title: e.target.value })}
            placeholder="Challenge title"
          />
          <Textarea
            value={challenge.goal}
            onChange={(e) => onChange({ ...challenge, goal: e.target.value })}
            placeholder="Goal / stakes"
            className="min-h-[64px]"
          />
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1 text-xs">
              Successes needed
              <Input
                type="number"
                value={challenge.successesNeeded}
                onChange={(e) =>
                  onChange({ ...challenge, successesNeeded: Number(e.target.value) || 1 })
                }
              />
            </label>
            <label className="grid gap-1 text-xs">
              Failures allowed
              <Input
                type="number"
                value={challenge.failuresAllowed}
                onChange={(e) =>
                  onChange({ ...challenge, failuresAllowed: Number(e.target.value) || 1 })
                }
              />
            </label>
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-sm font-semibold">{challenge.title || "Skill challenge"}</p>
          {challenge.goal && (
            <p className="text-xs text-[var(--color-fg-muted)]">{challenge.goal}</p>
          )}
        </div>
        {challenge.resolved && (
          <span
            className={cn(
              "text-xs font-medium uppercase",
              challenge.resolved === "success"
                ? "text-[var(--color-success)]"
                : "text-[var(--color-danger)]",
            )}
          >
            {challenge.resolved}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2">
          <p className="text-[10px] uppercase text-[var(--color-fg-subtle)]">Successes</p>
          <p className="font-display text-xl tabular-nums text-[var(--color-success)]">
            {challenge.successes}/{challenge.successesNeeded}
          </p>
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2">
          <p className="text-[10px] uppercase text-[var(--color-fg-subtle)]">Failures</p>
          <p className="font-display text-xl tabular-nums text-[var(--color-danger)]">
            {challenge.failures}/{challenge.failuresAllowed}
          </p>
        </div>
      </div>

      {isDm && (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              const successes = challenge.successes + 1;
              const resolved =
                successes >= challenge.successesNeeded ? ("success" as const) : challenge.resolved;
              onChange({
                ...challenge,
                active: true,
                successes,
                resolved,
                log: [...challenge.log, `Success (${successes})`],
              });
            }}
          >
            + Success
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              const failures = challenge.failures + 1;
              const resolved =
                failures >= challenge.failuresAllowed ? ("failure" as const) : challenge.resolved;
              onChange({
                ...challenge,
                active: true,
                failures,
                resolved,
                log: [...challenge.log, `Failure (${failures})`],
              });
            }}
          >
            + Failure
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() =>
              onChange({
                ...challenge,
                active: true,
                successes: 0,
                failures: 0,
                resolved: null,
                log: [],
              })
            }
          >
            Reset
          </Button>
          <Button
            type="button"
            size="sm"
            variant={challenge.active ? "outline" : "steel"}
            onClick={() => onChange({ ...challenge, active: !challenge.active })}
          >
            {challenge.active ? "Hide from play" : "Activate"}
          </Button>
        </div>
      )}

      {challenge.log.length > 0 && (
        <ul className="space-y-1 text-xs text-[var(--color-fg-muted)]">
          {challenge.log.slice(-8).map((l, i) => (
            <li key={i}>· {l}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
