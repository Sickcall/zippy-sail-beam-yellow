import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { SectionRenderer } from "@/components/campaign/section-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Scene, SceneSection } from "@/data/types";
import {
  blankScene,
  useHomebrewStore,
  type StoredCampaign,
} from "@/lib/store/homebrew-store";
import { makeCode } from "@/lib/table/types";

export const Route = createFileRoute("/library/$campaignId")({
  component: CampaignEditorPage,
});

function CampaignEditorPage() {
  const { campaignId } = Route.useParams();
  const getById = useHomebrewStore((s) => s.getById);
  const update = useHomebrewStore((s) => s.update);
  const create = useHomebrewStore((s) => s.create);
  const upsertScene = useHomebrewStore((s) => s.upsertScene);
  const removeScene = useHomebrewStore((s) => s.removeScene);
  const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);

  const [camp, setCamp] = useState<StoredCampaign | null>(null);
  const [sceneId, setSceneId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  useEffect(() => {
    ensureSeeded();
    const c = getById(campaignId);
    if (c) {
      setCamp(c);
      setDraftTitle(c.title);
      setSceneId(c.scenes[0]?.id ?? null);
    }
  }, [campaignId, getById, ensureSeeded]);

  const scene = useMemo(
    () => camp?.scenes.find((s) => s.id === sceneId) ?? null,
    [camp, sceneId],
  );

  if (!camp) {
    return (
      <AppShell>
        <p className="text-sm text-[var(--color-fg-muted)]">Campaign not found.</p>
        <Button asChild className="mt-4">
          <Link to="/library">Back to library</Link>
        </Button>
      </AppShell>
    );
  }

  const readOnlyBuiltIn = camp.source === "built-in";

  function saveMeta() {
    if (!camp) return;
    if (readOnlyBuiltIn) {
      const forked = create({
        title: draftTitle || camp.title,
        subtitle: camp.subtitle,
        synopsis: camp.synopsis,
        edition: camp.edition,
        levelRange: camp.levelRange,
        estimatedSessions: camp.estimatedSessions,
        tags: camp.tags,
        features: camp.features,
        antagonist: camp.antagonist,
        patron: camp.patron,
        scenes: structuredClone(camp.scenes),
        aftermath: camp.aftermath,
        lore: camp.lore,
        appendix: camp.appendix,
      });
      toast.success("Forked built-in into your homebrew library");
      window.location.href = `/library/${forked.id}`;
      return;
    }
    update(camp.id, {
      title: draftTitle,
      subtitle: camp.subtitle,
      synopsis: camp.synopsis,
      edition: camp.edition,
      levelRange: camp.levelRange,
      estimatedSessions: camp.estimatedSessions,
      antagonist: camp.antagonist,
      patron: camp.patron,
      tags: camp.tags,
    });
    setCamp(getById(camp.id) ?? camp);
    toast.success("Saved");
  }

  function saveScene(next: Scene) {
    if (!camp) return;
    if (readOnlyBuiltIn) {
      toast.message("Duplicate this campaign to edit scenes");
      return;
    }
    upsertScene(camp.id, next);
    setCamp(getById(camp.id) ?? camp);
  }

  return (
    <AppShell>
      <div className="grid gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/library">
              <ArrowLeft className="size-4" />
              Library
            </Link>
          </Button>
          <Badge variant={readOnlyBuiltIn ? "steel" : "outline"}>
            {readOnlyBuiltIn ? "Built-in (read-only)" : "Homebrew"}
          </Badge>
          <Button asChild size="sm" variant="steel" className="ml-auto">
            <Link
              to="/table/$code"
              params={{ code: makeCode() }}
              search={{
                role: "dm",
                name: "Dungeon Master",
                campaign: camp.id,
              }}
            >
              Run at table
            </Link>
          </Button>
        </div>

        <div className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-[10px] uppercase text-[var(--color-fg-subtle)]">Title</span>
              <Input
                value={draftTitle}
                disabled={readOnlyBuiltIn}
                onChange={(e) => setDraftTitle(e.target.value)}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-[10px] uppercase text-[var(--color-fg-subtle)]">Edition</span>
              <Input
                value={camp.edition}
                disabled={readOnlyBuiltIn}
                onChange={(e) => setCamp({ ...camp, edition: e.target.value })}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-[10px] uppercase text-[var(--color-fg-subtle)]">Level range</span>
              <Input
                value={camp.levelRange}
                disabled={readOnlyBuiltIn}
                onChange={(e) => setCamp({ ...camp, levelRange: e.target.value })}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-[10px] uppercase text-[var(--color-fg-subtle)]">Sessions</span>
              <Input
                value={camp.estimatedSessions}
                disabled={readOnlyBuiltIn}
                onChange={(e) => setCamp({ ...camp, estimatedSessions: e.target.value })}
              />
            </label>
          </div>
          <label className="grid gap-1">
            <span className="text-[10px] uppercase text-[var(--color-fg-subtle)]">Synopsis</span>
            <Textarea
              value={camp.synopsis}
              disabled={readOnlyBuiltIn}
              onChange={(e) => setCamp({ ...camp, synopsis: e.target.value })}
              className="min-h-[80px]"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={saveMeta}>
              <Save className="size-4" />
              {readOnlyBuiltIn ? "Fork & edit" : "Save details"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
          <aside className="grid h-fit gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide">Scenes</h2>
              {!readOnlyBuiltIn && (
                <Button
                  type="button"
                  size="icon-sm"
                  variant="secondary"
                  onClick={() => {
                    const sc = blankScene(camp.scenes.length + 1);
                    upsertScene(camp.id, sc);
                    const next = getById(camp.id);
                    if (next) {
                      setCamp(next);
                      setSceneId(sc.id);
                    }
                  }}
                >
                  <Plus className="size-3.5" />
                </Button>
              )}
            </div>
            {camp.scenes.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSceneId(sc.id)}
                className={`rounded-[var(--radius-sm)] border px-2 py-2 text-left text-sm ${
                  sceneId === sc.id
                    ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_12%,var(--color-bg))]"
                    : "border-[var(--color-border)]"
                }`}
              >
                <span className="text-xs text-[var(--color-fg-subtle)]">{sc.number}.</span>{" "}
                {sc.shortTitle || sc.title}
              </button>
            ))}
          </aside>

          <div className="grid gap-4">
            {scene ? (
              <>
                <div className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4">
                  <div className="flex flex-wrap gap-2">
                    <Input
                      value={scene.title}
                      disabled={readOnlyBuiltIn}
                      onChange={(e) =>
                        saveScene({
                          ...scene,
                          title: e.target.value,
                          shortTitle: e.target.value.slice(0, 24),
                        })
                      }
                      className="font-display text-lg font-semibold"
                    />
                    {!readOnlyBuiltIn && camp.scenes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          removeScene(camp.id, scene.id);
                          const next = getById(camp.id);
                          if (next) {
                            setCamp(next);
                            setSceneId(next.scenes[0]?.id ?? null);
                          }
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={scene.summary}
                    disabled={readOnlyBuiltIn}
                    onChange={(e) => saveScene({ ...scene, summary: e.target.value })}
                    placeholder="Scene summary"
                    className="min-h-[64px]"
                  />
                  {!readOnlyBuiltIn && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          saveScene({
                            ...scene,
                            sections: [
                              ...scene.sections,
                              { type: "readAloud", title: "Read aloud", text: "" },
                            ],
                          })
                        }
                      >
                        + Read-aloud
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          saveScene({
                            ...scene,
                            sections: [
                              ...scene.sections,
                              { type: "dmGuidance", title: "DM guidance", text: "" },
                            ],
                          })
                        }
                      >
                        + DM note
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          saveScene({
                            ...scene,
                            sections: [
                              ...scene.sections,
                              { type: "bullets", title: "Bullets", items: [""] },
                            ],
                          })
                        }
                      >
                        + Bullets
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          saveScene({
                            ...scene,
                            sections: [
                              ...scene.sections,
                              {
                                type: "skillChallenge",
                                challenge: {
                                  title: "Skill challenge",
                                  goal: "",
                                  successesNeeded: 4,
                                  failuresAllowed: 3,
                                  checks: [],
                                  successOutcome: "",
                                  failureOutcome: "",
                                },
                              },
                            ],
                          })
                        }
                      >
                        + Skill challenge
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid gap-3">
                  {scene.sections.map((section, i) => (
                    <div key={i} className="relative">
                      {!readOnlyBuiltIn && (
                        <SectionEditor
                          section={section}
                          onChange={(next) => {
                            const sections = scene.sections.slice();
                            sections[i] = next;
                            saveScene({ ...scene, sections });
                          }}
                          onRemove={() => {
                            saveScene({
                              ...scene,
                              sections: scene.sections.filter((_, j) => j !== i),
                            });
                          }}
                        />
                      )}
                      {readOnlyBuiltIn && <SectionRenderer section={section} />}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-[var(--color-fg-muted)]">Select or add a scene.</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SectionEditor({
  section,
  onChange,
  onRemove,
}: {
  section: SceneSection;
  onChange: (s: SceneSection) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Badge variant="outline">{section.type}</Badge>
        <Button type="button" size="icon-sm" variant="ghost" onClick={onRemove}>
          <Trash2 className="size-3.5" />
        </Button>
      </div>
      {"title" in section && (
        <Input
          value={(section as { title?: string }).title ?? ""}
          onChange={(e) => onChange({ ...section, title: e.target.value } as SceneSection)}
          className="mb-2"
          placeholder="Section title"
        />
      )}
      {"text" in section && typeof (section as { text?: string }).text === "string" && (
        <Textarea
          value={(section as { text: string }).text}
          onChange={(e) => onChange({ ...section, text: e.target.value } as SceneSection)}
          className="min-h-[100px]"
        />
      )}
      {section.type === "bullets" && (
        <Textarea
          value={section.items.join("\n")}
          onChange={(e) =>
            onChange({ ...section, items: e.target.value.split("\n") })
          }
          className="min-h-[100px]"
          placeholder="One bullet per line"
        />
      )}
      {section.type === "skillChallenge" && (
        <div className="grid gap-2">
          <Input
            value={section.challenge.title}
            onChange={(e) =>
              onChange({
                ...section,
                challenge: { ...section.challenge, title: e.target.value },
              })
            }
            placeholder="Title"
          />
          <Textarea
            value={section.challenge.goal}
            onChange={(e) =>
              onChange({
                ...section,
                challenge: { ...section.challenge, goal: e.target.value },
              })
            }
            placeholder="Goal"
          />
        </div>
      )}
      {section.type !== "bullets" &&
        section.type !== "skillChallenge" &&
        !("text" in section) && <SectionRenderer section={section} />}
    </div>
  );
}
