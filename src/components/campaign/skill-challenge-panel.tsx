import { Check, RotateCcw, Target, X } from "lucide-react";
import type { SkillChallenge } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSessionStore } from "@/lib/store/session-store";
import { cn } from "@/lib/utils";

export function SkillChallengePanel({ challenge }: { challenge: SkillChallenge }) {
  const skill = useSessionStore((s) => s.skillChallenge);
  const skillSuccess = useSessionStore((s) => s.skillSuccess);
  const skillFailure = useSessionStore((s) => s.skillFailure);
  const resetSkillChallenge = useSessionStore((s) => s.resetSkillChallenge);

  const successPct = (skill.successes / challenge.successesNeeded) * 100;
  const failPct = (skill.failures / challenge.failuresAllowed) * 100;

  return (
    <section className="rounded-[var(--radius-lg)] border border-[color-mix(in_oklab,var(--color-warn)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-warn)_5%,var(--color-bg-elevated))] p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[var(--color-warn)]">
            <Target className="size-4" />
            <h3 className="font-display text-sm font-semibold tracking-wide uppercase">
              Skill challenge
            </h3>
          </div>
          <h4 className="font-display text-xl font-semibold text-[var(--color-fg)]">
            {challenge.title}
          </h4>
          <p className="mt-1 max-w-2xl text-sm text-[var(--color-fg-muted)]">{challenge.goal}</p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={resetSkillChallenge}>
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
            <span>Successes</span>
            <span className="tabular-nums text-[var(--color-success)]">
              {skill.successes} / {challenge.successesNeeded}
            </span>
          </div>
          <Progress value={successPct} indicatorClassName="bg-[var(--color-success)]" />
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
            <span>Failures</span>
            <span className="tabular-nums text-[var(--color-danger)]">
              {skill.failures} / {challenge.failuresAllowed}
            </span>
          </div>
          <Progress value={failPct} indicatorClassName="bg-[var(--color-danger)]" />
        </div>
      </div>

      {skill.resolved && (
        <div
          className={cn(
            "mb-4 rounded-[var(--radius-md)] border p-3.5 text-sm leading-relaxed",
            skill.resolved === "success"
              ? "border-[color-mix(in_oklab,var(--color-success)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-bg))] text-[var(--color-fg)]"
              : "border-[color-mix(in_oklab,var(--color-danger)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_10%,var(--color-bg))] text-[var(--color-fg)]",
          )}
        >
          <p className="mb-1 font-medium">
            {skill.resolved === "success" ? "Total success" : "Total failure"}
          </p>
          <p className="text-[var(--color-fg-muted)]">
            {skill.resolved === "success"
              ? challenge.successOutcome
              : challenge.failureOutcome}
          </p>
        </div>
      )}

      <div className="mb-3 grid gap-2">
        {challenge.checks.map((check) => (
          <div
            key={check.skill}
            className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-[var(--color-fg)]">{check.skill}</span>
                <Badge variant="outline">DC {check.dc}</Badge>
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-fg-muted)] sm:text-sm">
                {check.description}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={!!skill.resolved}
                onClick={() => skillSuccess(check.skill)}
              >
                <Check className="size-3.5 text-[var(--color-success)]" />
                Pass
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={!!skill.resolved}
                onClick={() => skillFailure(check.skill)}
              >
                <X className="size-3.5 text-[var(--color-danger)]" />
                Fail
              </Button>
            </div>
          </div>
        ))}
      </div>

      {skill.log.length > 0 && (
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2">
          <p className="mb-1 text-xs font-medium tracking-wide text-[var(--color-fg-subtle)] uppercase">
            Roll log
          </p>
          <ul className="space-y-0.5 text-xs text-[var(--color-fg-muted)]">
            {skill.log.map((entry, i) => (
              <li key={`${entry}-${i}`} className="tabular-nums">
                {entry}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
