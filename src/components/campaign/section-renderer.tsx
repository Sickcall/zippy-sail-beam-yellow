import {
  BookOpen,
  Eye,
  GitBranch,
  Info,
  MessageSquareQuote,
  ScrollText,
  Sparkles,
  Swords,
  Users,
} from "lucide-react";
import type { SceneSection } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SkillChallengePanel } from "@/components/campaign/skill-challenge-panel";
import { RunestoneTracker } from "@/components/campaign/runestone-tracker";
import { useState } from "react";

function SectionShell({
  icon,
  title,
  children,
  className,
  accent = "default",
}: {
  icon: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  className?: string;
  accent?: "default" | "read" | "dm" | "danger" | "steel";
}) {
  const accents = {
    default: "border-[var(--color-border)] bg-[var(--color-bg-elevated)]",
    read: "border-[var(--color-readaloud-border)] bg-[var(--color-readaloud)]",
    dm: "border-[color-mix(in_oklab,var(--color-steel)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-steel)_6%,var(--color-bg-elevated))]",
    danger:
      "border-[color-mix(in_oklab,var(--color-danger)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_6%,var(--color-bg-elevated))]",
    steel:
      "border-[color-mix(in_oklab,var(--color-steel)_28%,var(--color-border))] bg-[var(--color-bg-elevated)]",
  };

  return (
    <section
      className={cn(
        "rounded-[var(--radius-lg)] border p-4 sm:p-5",
        accents[accent],
        className,
      )}
    >
      {title && (
        <div className="mb-3 flex items-center gap-2 text-[var(--color-fg-muted)]">
          <span className="opacity-80">{icon}</span>
          <h3 className="font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase">
            {title}
          </h3>
        </div>
      )}
      {children}
    </section>
  );
}

function ReadAloudBlock({ title, text }: { title?: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <SectionShell icon={<BookOpen className="size-4" />} title={title ?? "Read-aloud"} accent="read">
      <div className="flex flex-col gap-3">
        <p className="font-display text-base leading-relaxed whitespace-pre-wrap text-[var(--color-fg)] sm:text-lg">
          {text}
        </p>
        <div className="flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={copy}>
            {copied ? "Copied" : "Copy text"}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}

export function SectionRenderer({ section }: { section: SceneSection }) {
  switch (section.type) {
    case "readAloud":
      return <ReadAloudBlock title={section.title} text={section.text} />;

    case "dmGuidance":
      return (
        <SectionShell
          icon={<Info className="size-4" />}
          title={section.title ?? "DM guidance"}
          accent="dm"
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-fg-muted)] sm:text-[0.95rem]">
            {section.text}
          </p>
        </SectionShell>
      );

    case "prose":
      return (
        <SectionShell icon={<ScrollText className="size-4" />} title={section.title}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-fg-muted)] sm:text-[0.95rem]">
            {section.text}
          </p>
        </SectionShell>
      );

    case "openFloor":
      return (
        <SectionShell
          icon={<Users className="size-4" />}
          title={section.title ?? "Open the floor"}
          accent="steel"
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-fg)]">
            {section.text}
          </p>
        </SectionShell>
      );

    case "sensory":
      return (
        <SectionShell
          icon={<Sparkles className="size-4" />}
          title={section.title ?? "Sensory prompts"}
        >
          <div className="grid gap-3">
            {section.prompts.map((p) => (
              <div
                key={p.classLabel}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5"
              >
                <div className="mb-1.5">
                  <Badge variant="steel">{p.classLabel}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.text}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      );

    case "explore":
      return (
        <SectionShell
          icon={<Eye className="size-4" />}
          title={section.title ?? "Environment"}
        >
          <div className="grid gap-3">
            {section.items.map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5"
              >
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-base font-semibold text-[var(--color-fg)]">
                    {item.title}
                  </h4>
                  {item.check && <Badge variant="outline">{item.check}</Badge>}
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      );

    case "branches":
      return (
        <SectionShell
          icon={<GitBranch className="size-4" />}
          title={section.title ?? "Branching outcomes"}
        >
          <div className="grid gap-3">
            {section.branches.map((b) => (
              <div
                key={b.condition}
                className="grid gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:gap-4"
              >
                <p className="text-sm font-medium text-[var(--color-steel)]">{b.condition}</p>
                <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">{b.outcome}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      );

    case "skillChallenge":
      return <SkillChallengePanel challenge={section.challenge} />;

    case "runestones":
      return <RunestoneTracker hazard={section.hazard} />;

    case "dialogue":
      return (
        <SectionShell
          icon={<MessageSquareQuote className="size-4" />}
          title={section.title ?? "Dialogue"}
          accent="read"
        >
          <div className="grid gap-4">
            {section.lines.map((line, i) => (
              <blockquote key={`${line.speaker}-${i}`} className="border-l-2 border-[var(--color-border-strong)] pl-4">
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-base font-semibold",
                      line.speaker.includes("Mystra")
                        ? "text-[var(--color-steel)]"
                        : line.speaker.includes("Grundy")
                          ? "text-[var(--color-danger)]"
                          : "text-[var(--color-fg)]",
                    )}
                  >
                    {line.speaker}
                  </span>
                  {line.stageDirection && (
                    <span className="text-xs italic text-[var(--color-fg-subtle)]">
                      {line.stageDirection}
                    </span>
                  )}
                </div>
                <p className="font-display text-base leading-relaxed text-[var(--color-fg)]">
                  &ldquo;{line.line}&rdquo;
                </p>
              </blockquote>
            ))}
          </div>
        </SectionShell>
      );

    case "bullets":
      return (
        <SectionShell icon={<Swords className="size-4" />} title={section.title}>
          <ul className="grid gap-2.5">
            {section.items.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-border-strong)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionShell>
      );

    default:
      return null;
  }
}
