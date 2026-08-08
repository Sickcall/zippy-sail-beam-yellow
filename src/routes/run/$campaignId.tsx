import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Dices,
  Menu,
  NotebookPen,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
  Swords,
  Users,
  X,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SectionRenderer } from "@/components/campaign/section-renderer";
import { DicePanel } from "@/components/session/dice-panel";
import { InitiativePanel } from "@/components/session/initiative-panel";
import { NotesPanel } from "@/components/session/notes-panel";
import { PartyPanel } from "@/components/session/party-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Campaign } from "@/data/types";
import { getCampaign } from "@/data/campaigns";
import { useSessionStore } from "@/lib/store/session-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/run/$campaignId")({
  component: SessionRunnerPage,
});

function SessionRunnerPage() {
  const { campaignId } = Route.useParams();
  const campaign = getCampaign(campaignId);
  if (!campaign) throw notFound();
  return <SessionRunner campaign={campaign} />;
}

function SessionRunner({ campaign }: { campaign: Campaign }) {
  const sceneId = useSessionStore((s) => s.sceneId);
  const setScene = useSessionStore((s) => s.setScene);
  const setCampaign = useSessionStore((s) => s.setCampaign);
  const completedScenes = useSessionStore((s) => s.completedScenes);
  const markSceneComplete = useSessionStore((s) => s.markSceneComplete);
  const resetSession = useSessionStore((s) => s.resetSession);

  const [sceneNavOpen, setSceneNavOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsTab, setToolsTab] = useState("party");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setToolsOpen(mq.matches);
    const onChange = () => setToolsOpen(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setCampaign(campaign.id);
    if (!sceneId || !campaign.scenes.some((s) => s.id === sceneId)) {
      setScene(campaign.scenes[0]?.id ?? null);
    }
  }, [campaign.id, campaign.scenes, sceneId, setCampaign, setScene]);

  const sceneIndex = useMemo(
    () => campaign.scenes.findIndex((s) => s.id === sceneId),
    [campaign.scenes, sceneId],
  );
  const scene = sceneIndex >= 0 ? campaign.scenes[sceneIndex] : campaign.scenes[0];
  const progress =
    campaign.scenes.length > 0
      ? ((completedScenes.filter((id) => campaign.scenes.some((s) => s.id === id)).length) /
          campaign.scenes.length) *
        100
      : 0;

  function goTo(index: number) {
    const next = campaign.scenes[index];
    if (next) {
      setScene(next.id);
      setSceneNavOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (!scene) {
    return (
      <div className="grid min-h-dvh place-items-center text-[var(--color-fg-muted)]">
        No scenes found.
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_94%,transparent)] backdrop-blur-md">
        <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
          <Button asChild variant="ghost" size="icon-sm" className="shrink-0">
            <Link to="/campaign/$campaignId" params={{ campaignId: campaign.id }}>
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 lg:hidden"
            onClick={() => setSceneNavOpen(true)}
            aria-label="Open scene list"
          >
            <Menu className="size-4" />
          </Button>

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold text-[var(--color-fg)] sm:text-base">
              {campaign.title}
            </p>
            <div className="mt-1 h-1 max-w-xs overflow-hidden rounded-full bg-[var(--color-bg-subtle)]">
              <div
                className="h-full rounded-full bg-[var(--color-steel)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden shrink-0 sm:inline-flex"
            onClick={() => {
              if (
                window.confirm(
                  "Reset party, initiative, skill challenge, runestones, and notes for this session?",
                )
              ) {
                resetSession();
                setScene(campaign.scenes[0]?.id ?? null);
              }
            }}
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="shrink-0"
            onClick={() => setToolsOpen((v) => !v)}
          >
            {toolsOpen ? (
              <PanelRightClose className="size-4" />
            ) : (
              <PanelRightOpen className="size-4" />
            )}
            <span className="hidden sm:inline">Tools</span>
          </Button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] lg:block xl:w-72">
          <SceneNav
            campaignTitle={campaign.title}
            scenes={campaign.scenes}
            activeId={scene.id}
            completed={completedScenes}
            onSelect={(id) => {
              setScene(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </aside>

        {sceneNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Close scene list"
              onClick={() => setSceneNavOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[min(100%,20rem)] border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-panel)]">
              <div className="flex h-14 items-center justify-between border-b border-[var(--color-border)] px-3">
                <span className="font-display text-sm font-semibold">Scenes</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSceneNavOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <SceneNav
                campaignTitle={campaign.title}
                scenes={campaign.scenes}
                activeId={scene.id}
                completed={completedScenes}
                onSelect={(id) => {
                  setScene(id);
                  setSceneNavOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1 overflow-y-auto scrollbar-thin">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
            <div className="mb-6 grid gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="steel">Scene {scene.number}</Badge>
                {scene.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
              <h1 className="font-display text-balance text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl">
                {scene.title}
              </h1>
              <p className="text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
                {scene.summary}
              </p>
            </div>

            <div className="grid gap-4">
              {scene.sections.map((section, i) => (
                <SectionRenderer key={`${scene.id}-${i}`} section={section} />
              ))}
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="secondary"
                disabled={sceneIndex <= 0}
                onClick={() => goTo(sceneIndex - 1)}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>

              <Button
                type="button"
                variant={completedScenes.includes(scene.id) ? "outline" : "steel"}
                onClick={() => markSceneComplete(scene.id)}
              >
                <Check className="size-4" />
                {completedScenes.includes(scene.id) ? "Scene marked done" : "Mark scene done"}
              </Button>

              <Button
                type="button"
                disabled={sceneIndex >= campaign.scenes.length - 1}
                onClick={() => {
                  markSceneComplete(scene.id);
                  goTo(sceneIndex + 1);
                }}
              >
                Next scene
                <ChevronRight className="size-4" />
              </Button>
            </div>

            {sceneIndex === campaign.scenes.length - 1 && (
              <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 text-center">
                <p className="font-display text-lg font-semibold text-[var(--color-fg)]">
                  End of Act One
                </p>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  Use the overview for Act Two setting seeds, lore, and PVP table guidance.
                </p>
                <Button asChild variant="secondary" className="mt-4">
                  <Link to="/campaign/$campaignId" params={{ campaignId: campaign.id }}>
                    Open full overview
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {toolsOpen && (
          <>
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-black/60"
                aria-label="Close tools"
                onClick={() => setToolsOpen(false)}
              />
              <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-hidden rounded-t-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-panel)]">
                <div className="flex h-12 items-center justify-between border-b border-[var(--color-border)] px-4">
                  <span className="font-display text-sm font-semibold">Table tools</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setToolsOpen(false)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                <div className="max-h-[calc(85dvh-3rem)] overflow-y-auto p-4 scrollbar-thin">
                  <ToolsTabs value={toolsTab} onValueChange={setToolsTab} />
                </div>
              </div>
            </div>

            <aside className="hidden w-80 shrink-0 border-l border-[var(--color-border)] bg-[var(--color-bg-elevated)] lg:block xl:w-96">
              <div className="sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto p-4 scrollbar-thin">
                <ToolsTabs value={toolsTab} onValueChange={setToolsTab} />
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

function SceneNav({
  campaignTitle,
  scenes,
  activeId,
  completed,
  onSelect,
}: {
  campaignTitle: string;
  scenes: { id: string; number: number; shortTitle: string; title: string }[];
  activeId: string;
  completed: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto p-3 scrollbar-thin">
      <p className="mb-3 px-2 text-xs tracking-wide text-[var(--color-fg-subtle)] uppercase">
        {campaignTitle}
      </p>
      <ul className="grid gap-1">
        {scenes.map((s) => {
          const active = s.id === activeId;
          const done = completed.includes(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(s.id)}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2.5 text-left transition-colors",
                  active
                    ? "bg-[color-mix(in_oklab,var(--color-steel)_14%,var(--color-bg))] text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] tabular-nums",
                    done
                      ? "border-[color-mix(in_oklab,var(--color-success)_40%,var(--color-border))] text-[var(--color-success)]"
                      : active
                        ? "border-[var(--color-steel)] text-[var(--color-steel)]"
                        : "border-[var(--color-border)] text-[var(--color-fg-subtle)]",
                  )}
                >
                  {done ? <Check className="size-3" /> : s.number}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{s.shortTitle}</span>
                  <span className="block truncate text-[11px] text-[var(--color-fg-subtle)]">
                    Scene {s.number}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ToolsTabs({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="flex h-full flex-col">
      <TabsList className="grid h-auto w-full grid-cols-4 gap-1 p-1">
        <TabsTrigger value="party" className="flex flex-col gap-0.5 px-1 py-2 text-[10px]">
          <Users className="size-3.5" />
          Party
        </TabsTrigger>
        <TabsTrigger value="init" className="flex flex-col gap-0.5 px-1 py-2 text-[10px]">
          <Swords className="size-3.5" />
          Init
        </TabsTrigger>
        <TabsTrigger value="dice" className="flex flex-col gap-0.5 px-1 py-2 text-[10px]">
          <Dices className="size-3.5" />
          Dice
        </TabsTrigger>
        <TabsTrigger value="notes" className="flex flex-col gap-0.5 px-1 py-2 text-[10px]">
          <NotebookPen className="size-3.5" />
          Notes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="party" className="min-h-[320px] flex-1">
        <PartyPanel />
      </TabsContent>
      <TabsContent value="init" className="min-h-[320px] flex-1">
        <InitiativePanel />
      </TabsContent>
      <TabsContent value="dice" className="min-h-[320px] flex-1">
        <DicePanel />
      </TabsContent>
      <TabsContent value="notes" className="min-h-[320px] flex-1">
        <NotesPanel />
      </TabsContent>
    </Tabs>
  );
}
