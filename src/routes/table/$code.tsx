import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Eye,
  EyeOff,
  LayoutGrid,
  Map as MapIcon,
  Plus,
  ScrollText,
  Settings2,
  Share2,
  Sparkles,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SectionRenderer } from "@/components/campaign/section-renderer";
import { BattleMap } from "@/components/map/battle-map";
import { EncounterPalette } from "@/components/map/encounter-palette";
import { TokenInspector } from "@/components/map/token-inspector";
import { CharacterSheetPanel } from "@/components/sheet/character-sheet";
import { CombatTracker } from "@/components/table/combat-tracker";
import { PartyTracker } from "@/components/table/party-tracker";
import { SharedDice } from "@/components/table/shared-dice";
import { TablePresence } from "@/components/table/table-presence";
import { TableSettingsPanel } from "@/components/tools/table-settings-panel";
import { NpcPanel } from "@/components/tools/npc-panel";
import { RewardsPanel } from "@/components/tools/rewards-panel";
import { SkillChallengeTool } from "@/components/tools/skill-challenge-tool";
import {
  ClocksPanel,
  DmNotesPanel,
  HazardsPanel,
  LootPanel,
  SessionLogPanel,
} from "@/components/tools/session-tools";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { resolveCampaign, useHomebrewStore } from "@/lib/store/homebrew-store";
import { generateMap, MAP_PRESET_META } from "@/lib/map/presets";
import {
  emptyNpc,
  tokenFromNpc,
  type MapToken,
  type NpcStatBlock,
  type Role,
} from "@/lib/table/types";
import { useTableSession } from "@/lib/table/use-table-session";

type Search = {
  role?: string;
  name?: string;
  campaign?: string;
  table?: string;
  edition?: string;
  levels?: string;
};

export const Route = createFileRoute("/table/$code")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    role: typeof s.role === "string" ? s.role : undefined,
    name: typeof s.name === "string" ? s.name : undefined,
    campaign: typeof s.campaign === "string" ? s.campaign : undefined,
    table: typeof s.table === "string" ? s.table : undefined,
    edition: typeof s.edition === "string" ? s.edition : undefined,
    levels: typeof s.levels === "string" ? s.levels : undefined,
  }),
  component: TablePage,
});

const MAP_PRESETS = MAP_PRESET_META.filter((m) => m.id !== "custom");

function TablePage() {
  const { code } = Route.useParams();
  const search = Route.useSearch();
  const role: Role = search.role === "dm" ? "dm" : "player";
  const [displayName] = useState(
    () => search.name?.trim() || (role === "dm" ? "Dungeon Master" : "Adventurer"),
  );

  const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
  useEffect(() => {
    ensureSeeded();
  }, [ensureSeeded]);

  const bootstrapCamp = search.campaign ? resolveCampaign(search.campaign) : undefined;

  const session = useTableSession({
    code: code.toUpperCase(),
    role,
    displayName,
    bootstrap:
      role === "dm"
        ? {
            campaignId: bootstrapCamp?.id ?? (search.campaign || null),
            campaignTitle: bootstrapCamp?.title ?? (search.campaign ? "Campaign" : "Freeform session"),
            sceneId: bootstrapCamp?.scenes[0]?.id ?? null,
            sceneTitle: bootstrapCamp?.scenes[0]?.title ?? "",
            tableName: search.table || "Table",
            settings: {
              edition: search.edition || bootstrapCamp?.edition || "D&D 5e",
              levelBand: search.levels || bootstrapCamp?.levelRange || "1–5",
            },
            mapPreset: "dungeon",
          }
        : undefined,
  });

  const campaign = useMemo(() => {
    const id = session.state.campaignId;
    return id ? resolveCampaign(id) : undefined;
  }, [session.state.campaignId, session.state.version]);

  const scene = campaign?.scenes.find((s) => s.id === session.state.sceneId);

  const [tab, setTab] = useState(role === "dm" ? "map" : "sheet");
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [paintMode, setPaintMode] = useState(false);
  const [paintTile, setPaintTile] = useState(1);
  const [pendingDrop, setPendingDrop] = useState<NpcStatBlock | null>(null);
  const [mapCols, setMapCols] = useState(20);
  const [mapRows, setMapRows] = useState(14);
  const [mapName, setMapName] = useState("");
  const [privateNotes, setPrivateNotes] = useState("");

  useEffect(() => {
    document.title = `Grimoire · ${code.toUpperCase()}`;
  }, [code]);

  useEffect(() => {
    try {
      setPrivateNotes(localStorage.getItem(`grimoire-dm-notes-${code}`) ?? "");
    } catch {
      /* ignore */
    }
  }, [code]);

  useEffect(() => {
    if (role !== "dm") return;
    try {
      localStorage.setItem(`grimoire-dm-notes-${code}`, privateNotes);
    } catch {
      /* ignore */
    }
  }, [privateNotes, code, role]);

  async function copyInvite() {
    const tableCode = code.toUpperCase();
    const url = `${window.location.origin}/join?code=${tableCode}`;
    const message = [
      `Join my D&D table on Grimoire — no account needed.`,
      ``,
      `Open this link: ${url}`,
      `Or go to the site and enter code: ${tableCode}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Player invite copied — paste in Discord, text, etc.");
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Invite link copied");
      } catch {
        toast.message(url);
      }
    }
  }

  if (!session.joined || (!session.ready && role === "player")) {
    return (
      <div className="grid min-h-dvh place-items-center bg-[var(--color-bg)] px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 size-10 animate-pulse rounded-full bg-[var(--color-bg-subtle)]" />
          <p className="font-display text-lg font-semibold">Connecting to table…</p>
          <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
            {role === "player"
              ? "Waiting for the DM to share the table."
              : "Opening your DM channel."}
          </p>
          <p className="mt-4 font-mono text-xs tracking-widest text-[var(--color-steel)]">
            {code.toUpperCase()}
          </p>
        </div>
      </div>
    );
  }

  const st = session.state;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_90%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-3 py-2.5 sm:px-4">
          <Link
            to="/"
            className="font-display text-base font-semibold tracking-tight text-[var(--color-fg)] no-underline"
          >
            Grimoire
          </Link>
          <Badge variant={role === "dm" ? "steel" : "outline"}>
            {role === "dm" ? "Dungeon Master" : "Player"}
          </Badge>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-medium text-[var(--color-fg)]">
              {st.settings.tableName || st.name}
            </p>
            <p className="truncate text-[11px] text-[var(--color-fg-subtle)]">
              {st.campaignTitle}
              {st.sceneTitle ? ` · ${st.sceneTitle}` : ""}
              {` · ${st.settings.edition}`}
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <TablePresence
              seats={st.seats}
              peers={session.peers}
              selfId={session.selfId}
              code={code.toUpperCase()}
            />
          </div>
          <Button type="button" size="sm" variant="secondary" onClick={copyInvite}>
            <Share2 className="size-3.5" />
            Invite
          </Button>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-0 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 border-b border-[var(--color-border)] lg:border-b-0 lg:border-r">
          <Tabs value={tab} onValueChange={setTab} className="flex h-full flex-col">
            <div className="border-b border-[var(--color-border)] px-3 py-2 sm:px-4">
              <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto bg-transparent p-0">
                <TabsTrigger value="map" className="gap-1.5">
                  <MapIcon className="size-3.5" />
                  Map
                </TabsTrigger>
                <TabsTrigger value="sheet" className="gap-1.5">
                  <User className="size-3.5" />
                  Sheet
                </TabsTrigger>
                <TabsTrigger value="party" className="gap-1.5">
                  <Users className="size-3.5" />
                  Party
                </TabsTrigger>
                <TabsTrigger value="combat" className="gap-1.5 lg:hidden">
                  Combat
                </TabsTrigger>
                {role === "dm" && (
                  <TabsTrigger value="module" className="gap-1.5">
                    <BookOpen className="size-3.5" />
                    Module
                  </TabsTrigger>
                )}
                {role === "dm" && (
                  <TabsTrigger value="tools" className="gap-1.5">
                    <Wrench className="size-3.5" />
                    Tools
                  </TabsTrigger>
                )}
                <TabsTrigger value="handouts" className="gap-1.5">
                  <ScrollText className="size-3.5" />
                  Handouts
                </TabsTrigger>
                {role === "dm" && (
                  <TabsTrigger value="settings" className="gap-1.5">
                    <Settings2 className="size-3.5" />
                    Settings
                  </TabsTrigger>
                )}
                {role === "player" && st.settings.houseRules && (
                  <TabsTrigger value="rules" className="gap-1.5">
                    <Sparkles className="size-3.5" />
                    Rules
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value="map" className="m-0 flex-1 p-3 sm:p-4">
              {role === "dm" && (
                <div className="mb-3 grid gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-medium tracking-wide text-[var(--color-fg-subtle)] uppercase">
                      Map pack
                    </span>
                    <div className="flex max-w-full flex-wrap gap-1.5">
                      {MAP_PRESETS.map((p) => (
                        <Button
                          key={p.id}
                          type="button"
                          size="sm"
                          variant={st.map.preset === p.id ? "steel" : "secondary"}
                          onClick={() =>
                            session.dmSetState((s) => ({
                              ...s,
                              map: {
                                ...generateMap(p.id),
                                tokens: s.map.tokens,
                              },
                            }))
                          }
                          title={p.group}
                        >
                          {p.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                  <Input
                    type="number"
                    value={mapCols}
                    onChange={(e) => setMapCols(Number(e.target.value) || 10)}
                    className="h-8 w-16"
                    title="Columns"
                  />
                  <span className="text-xs text-[var(--color-fg-subtle)]">×</span>
                  <Input
                    type="number"
                    value={mapRows}
                    onChange={(e) => setMapRows(Number(e.target.value) || 8)}
                    className="h-8 w-16"
                    title="Rows"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      session.dmSetState((s) => ({
                        ...s,
                        map: {
                          ...generateMap("blank", Math.min(40, Math.max(8, mapCols)), Math.min(30, Math.max(6, mapRows)), mapName || s.map.name),
                          tokens: s.map.tokens,
                          name: mapName || "Custom grid",
                          preset: "custom",
                        },
                      }))
                    }
                  >
                    Resize
                  </Button>
                  <Input
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                    placeholder="Map name"
                    className="h-8 w-32"
                    onBlur={() => {
                      if (!mapName.trim()) return;
                      session.dmSetState((s) => ({
                        ...s,
                        map: { ...s.map, name: mapName.trim() },
                      }));
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant={paintMode ? "default" : "outline"}
                    onClick={() => setPaintMode((v) => !v)}
                  >
                    <LayoutGrid className="size-3.5" />
                    Paint
                  </Button>
                  {paintMode && (
                    <div className="flex gap-1">
                      {[
                        { t: 0, l: "Erase" },
                        { t: 1, l: "Wall" },
                        { t: 2, l: "Diff" },
                        { t: 3, l: "Hazard" },
                        { t: 4, l: "Door" },
                        { t: 5, l: "Water" },
                        { t: 6, l: "Cover" },
                        { t: 7, l: "Pillar" },
                      ].map((x) => (
                        <Button
                          key={x.t}
                          type="button"
                          size="sm"
                          variant={paintTile === x.t ? "steel" : "ghost"}
                          onClick={() => setPaintTile(x.t)}
                        >
                          {x.l}
                        </Button>
                      ))}
                    </div>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const id = `tok-npc-${Date.now()}`;
                      const token: MapToken = {
                        id,
                        label: "NPC",
                        kind: "monster",
                        x: Math.floor(st.map.cols / 2),
                        y: Math.floor(st.map.rows / 2),
                        color: "#b45448",
                        size: 1,
                        hidden: false,
                        hp: 20,
                        maxHp: 20,
                      };
                      session.dmSetState((s) => ({
                        ...s,
                        map: { ...s.map, tokens: [...s.map.tokens, token] },
                      }));
                      setSelectedToken(id);
                    }}
                  >
                    <Plus className="size-3.5" />
                    Token
                  </Button>
                  {selectedToken && (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          session.dmSetState((s) => ({
                            ...s,
                            map: {
                              ...s.map,
                              tokens: s.map.tokens.map((t) =>
                                t.id === selectedToken ? { ...t, hidden: !t.hidden } : t,
                              ),
                            },
                          }));
                        }}
                      >
                        {st.map.tokens.find((t) => t.id === selectedToken)?.hidden ? (
                          <Eye className="size-3.5" />
                        ) : (
                          <EyeOff className="size-3.5" />
                        )}
                        Hide
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          session.dmSetState((s) => ({
                            ...s,
                            map: {
                              ...s.map,
                              tokens: s.map.tokens.filter((t) => t.id !== selectedToken),
                            },
                          }));
                          setSelectedToken(null);
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  </div>
                </div>
              )}

              <BattleMap
                map={st.map}
                tokens={session.visibleTokens}
                isDm={session.isDm}
                selectedId={selectedToken}
                onSelect={(id) => {
                  setSelectedToken(id);
                  if (id) setPendingDrop(null);
                }}
                onMove={session.moveToken}
                paintMode={paintMode && session.isDm && !pendingDrop}
                dropMode={!!pendingDrop && session.isDm}
                onDropAt={
                  session.isDm && pendingDrop
                    ? (x, y) => {
                        const npc = pendingDrop;
                        const size: 1 | 2 | 3 | 4 =
                          /large|ogre|giant/i.test(npc.name) ? 2 : 1;
                        const token = tokenFromNpc(npc, x, y, { size });
                        session.dmSetState((s) => {
                          const npcs = s.npcs.some((n) => n.id === npc.id)
                            ? s.npcs
                            : [...s.npcs, npc];
                          const combat = s.combat.active
                            ? {
                                ...s.combat,
                                combatants: [
                                  ...s.combat.combatants,
                                  {
                                    id: `cb-${token.id}`,
                                    name: npc.name,
                                    init: 10,
                                    isPc: false,
                                    tokenId: token.id,
                                    hp: npc.hp,
                                    maxHp: npc.maxHp,
                                    ac: npc.ac,
                                    conditions: [],
                                    active: false,
                                  },
                                ],
                              }
                            : s.combat;
                          return {
                            ...s,
                            npcs,
                            combat,
                            map: { ...s.map, tokens: [...s.map.tokens, token] },
                          };
                        });
                        setSelectedToken(token.id);
                        setPendingDrop(null);
                        toast.success(`${npc.name} placed`);
                      }
                    : undefined
                }
                onPaint={
                  session.isDm
                    ? (x, y) => {
                        session.dmSetState((s) => {
                          const tiles = s.map.tiles.slice();
                          const i = y * s.map.cols + x;
                          if (i < 0 || i >= tiles.length) return s;
                          tiles[i] = paintTile;
                          return { ...s, map: { ...s.map, tiles } };
                        });
                      }
                    : undefined
                }
              />

              {role === "dm" && (
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <EncounterPalette
                    customNpcs={st.npcs}
                    pending={pendingDrop}
                    onPick={(npc) => {
                      setPaintMode(false);
                      setPendingDrop(npc);
                      toast.message(`Click the map to place ${npc.name}`);
                    }}
                    onClear={() => setPendingDrop(null)}
                    onAddCustom={() => {
                      const npc = emptyNpc({ name: "Custom foe", cr: "1", hp: 20, maxHp: 20 });
                      session.dmSetState((s) => ({ ...s, npcs: [...s.npcs, npc] }));
                      setPendingDrop(npc);
                      toast.message("Custom foe ready — click map to place");
                    }}
                    onDropCenter={() => {
                      if (!pendingDrop) return;
                      const x = Math.floor(st.map.cols / 2);
                      const y = Math.floor(st.map.rows / 2);
                      // reuse drop handler by synthesizing
                      const npc = pendingDrop;
                      const size: 1 | 2 | 3 | 4 =
                        /large|ogre|giant/i.test(npc.name) ? 2 : 1;
                      const token = tokenFromNpc(npc, x, y, { size });
                      session.dmSetState((s) => {
                        const npcs = s.npcs.some((n) => n.id === npc.id)
                          ? s.npcs
                          : [...s.npcs, npc];
                        const combat = s.combat.active
                          ? {
                              ...s.combat,
                              combatants: [
                                ...s.combat.combatants,
                                {
                                  id: `cb-${token.id}`,
                                  name: npc.name,
                                  init: 10,
                                  isPc: false,
                                  tokenId: token.id,
                                  hp: npc.hp,
                                  maxHp: npc.maxHp,
                                  ac: npc.ac,
                                  conditions: [],
                                  active: false,
                                },
                              ],
                            }
                          : s.combat;
                        return {
                          ...s,
                          npcs,
                          combat,
                          map: { ...s.map, tokens: [...s.map.tokens, token] },
                        };
                      });
                      setSelectedToken(token.id);
                      setPendingDrop(null);
                      toast.success(`${npc.name} placed`);
                    }}
                  />
                  {selectedToken &&
                    (() => {
                      const tok = st.map.tokens.find((x) => x.id === selectedToken);
                      if (!tok) return null;
                      return (
                        <TokenInspector
                          token={tok}
                          isDm
                          onChange={(next) => {
                            session.dmSetState((s) => ({
                              ...s,
                              map: {
                                ...s.map,
                                tokens: s.map.tokens.map((t) =>
                                  t.id === next.id ? next : t,
                                ),
                              },
                              // keep combat HP in sync
                              combat: {
                                ...s.combat,
                                combatants: s.combat.combatants.map((c) =>
                                  c.tokenId === next.id
                                    ? {
                                        ...c,
                                        name: next.name || c.name,
                                        hp: next.hp ?? c.hp,
                                        maxHp: next.maxHp ?? c.maxHp,
                                        ac: next.ac ?? c.ac,
                                        conditions: next.conditions ?? c.conditions,
                                      }
                                    : c,
                                ),
                              },
                              // sync linked npc roster
                              npcs: next.npcId
                                ? s.npcs.map((n) =>
                                    n.id === next.npcId
                                      ? {
                                          ...n,
                                          name: next.name || n.name,
                                          hp: next.hp ?? n.hp,
                                          maxHp: next.maxHp ?? n.maxHp,
                                          ac: next.ac ?? n.ac,
                                          tokenColor: next.color,
                                          attacks: next.attacks ?? n.attacks,
                                          traits: next.notes ?? n.traits,
                                          cr: next.cr ?? n.cr,
                                        }
                                      : n,
                                  )
                                : s.npcs,
                            }));
                          }}
                          onDuplicate={() => {
                            const copy: MapToken = {
                              ...tok,
                              id: `tok-copy-${Date.now()}`,
                              x: Math.min(st.map.cols - tok.size, tok.x + 1),
                              y: tok.y,
                            };
                            session.dmSetState((s) => ({
                              ...s,
                              map: { ...s.map, tokens: [...s.map.tokens, copy] },
                            }));
                            setSelectedToken(copy.id);
                            toast.success("Token duplicated");
                          }}
                          onDelete={() => {
                            session.dmSetState((s) => ({
                              ...s,
                              map: {
                                ...s.map,
                                tokens: s.map.tokens.filter((t) => t.id !== tok.id),
                              },
                              combat: {
                                ...s.combat,
                                combatants: s.combat.combatants.filter(
                                  (c) => c.tokenId !== tok.id,
                                ),
                              },
                            }));
                            setSelectedToken(null);
                          }}
                          onRoll={(expr, label) => session.roll(expr, label, true)}
                        />
                      );
                    })()}
                </div>
              )}
            </TabsContent>

            <TabsContent value="sheet" className="m-0 flex-1 overflow-y-auto p-3 sm:p-4 scrollbar-thin">
              {!session.mySheet ? (
                <div className="grid place-items-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] px-4 py-16 text-center">
                  <p className="font-display text-lg font-semibold">No character yet</p>
                  <p className="mt-1 max-w-sm text-sm text-[var(--color-fg-muted)]">
                    Create a sheet for this table — works with any class, race, or homebrew.
                  </p>
                  <Button type="button" className="mt-4" onClick={() => session.createMySheet()}>
                    Create character
                  </Button>
                </div>
              ) : (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h2 className="font-display text-xl font-semibold">
                      {session.mySheet.name}
                    </h2>
                    <Badge variant="outline">{session.mySheet.className}</Badge>
                  </div>
                  <CharacterSheetPanel
                    sheet={session.mySheet}
                    editable
                    onChange={session.updateSheet}
                    onRoll={(expr, label) => session.roll(expr, label)}
                  />
                </div>
              )}

              {role === "dm" && st.characters.length > 0 && (
                <div className="mx-auto mt-8 max-w-2xl border-t border-[var(--color-border)] pt-6">
                  <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-[var(--color-fg-muted)]">
                    Party sheets
                  </h3>
                  <div className="grid gap-4">
                    {st.characters
                      .filter((c) => c.ownerPeerId !== session.selfId)
                      .map((c) => (
                        <div
                          key={c.id}
                          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4"
                        >
                          <p className="mb-2 text-sm text-[var(--color-fg-muted)]">
                            {c.playerName} · {c.className} · L{c.level}
                          </p>
                          <CharacterSheetPanel
                            sheet={c}
                            editable
                            compact
                            onChange={session.updateSheet}
                            onRoll={(expr, label) => session.roll(expr, label)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="party"
              className="m-0 max-h-[calc(100dvh-8rem)] overflow-y-auto p-3 sm:p-4 scrollbar-thin"
            >
              <div className="mx-auto max-w-2xl">
                <PartyTracker
                  characters={st.characters}
                  seats={st.seats}
                  isDm={session.isDm}
                  selfId={session.selfId}
                  onChange={(sheet) => {
                    if (session.isDm) session.updateSheet(sheet);
                    else if (sheet.ownerPeerId === session.selfId) session.updateSheet(sheet);
                  }}
                  onRoll={(expr, label) => session.roll(expr, label, session.isDm)}
                />
              </div>
            </TabsContent>

            <TabsContent value="combat" className="m-0 p-3 sm:p-4 lg:hidden">
              <CombatTracker
                combat={st.combat}
                characters={st.characters}
                isDm={session.isDm}
                onChange={(combat) => session.dmSetState((s) => ({ ...s, combat }))}
              />
            </TabsContent>

            {role === "dm" && (
              <TabsContent
                value="module"
                className="m-0 max-h-[calc(100dvh-8rem)] overflow-y-auto p-3 sm:p-4 scrollbar-thin"
              >
                <div className="mb-4 grid gap-3">
                  <label className="grid gap-1">
                    <span className="text-xs text-[var(--color-fg-subtle)]">
                      Load campaign from library
                    </span>
                    <select
                      value={st.campaignId ?? ""}
                      onChange={(e) => {
                        const id = e.target.value || null;
                        const c = id ? resolveCampaign(id) : undefined;
                        session.dmSetState((s) => ({
                          ...s,
                          campaignId: id,
                          campaignTitle: c?.title ?? "Freeform session",
                          sceneId: c?.scenes[0]?.id ?? null,
                          sceneTitle: c?.scenes[0]?.title ?? "",
                          settings: {
                            ...s.settings,
                            edition: c?.edition ?? s.settings.edition,
                            levelBand: c?.levelRange ?? s.settings.levelBand,
                          },
                        }));
                      }}
                      className="flex h-10 w-full max-w-md rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm"
                    >
                      <option value="">Freeform (tools only)</option>
                      {useHomebrewStore.getState().listAll().map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Button asChild size="sm" variant="secondary" className="w-fit">
                    <Link to="/library">Manage library</Link>
                  </Button>
                </div>

                {campaign ? (
                  <>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {campaign.scenes.map((sc) => (
                        <Button
                          key={sc.id}
                          type="button"
                          size="sm"
                          variant={st.sceneId === sc.id ? "steel" : "secondary"}
                          onClick={() =>
                            session.dmSetState((s) => ({
                              ...s,
                              sceneId: sc.id,
                              sceneTitle: sc.title,
                            }))
                          }
                        >
                          {sc.number}. {sc.shortTitle}
                        </Button>
                      ))}
                    </div>
                    {scene ? (
                      <div className="mx-auto grid max-w-3xl gap-4">
                        <div>
                          <Badge variant="steel">Scene {scene.number}</Badge>
                          <h2 className="mt-2 font-display text-2xl font-semibold">
                            {scene.title}
                          </h2>
                          <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                            {scene.summary}
                          </p>
                        </div>
                        {scene.sections.map((section, i) => (
                          <SectionRenderer key={`${scene.id}-${i}`} section={section} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--color-fg-muted)]">Select a scene.</p>
                    )}
                  </>
                ) : (
                  <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] px-4 py-12 text-center">
                    <p className="font-display text-lg font-semibold">Freeform table</p>
                    <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-fg-muted)]">
                      No module loaded. Use Tools for NPCs, clocks, skill challenges, and loot — or
                      pick any campaign from your library above.
                    </p>
                  </div>
                )}
              </TabsContent>
            )}

            {role === "dm" && (
              <TabsContent
                value="tools"
                className="m-0 max-h-[calc(100dvh-8rem)] overflow-y-auto p-3 sm:p-4 scrollbar-thin"
              >
                <div className="mx-auto grid max-w-3xl gap-8">
                  <NpcPanel
                    npcs={st.npcs}
                    onChange={(npcs) => session.dmSetState((s) => ({ ...s, npcs }))}
                    onRoll={(expr, label) => session.roll(expr, label, true)}
                    onSpawn={(npc) => {
                      setTab("map");
                      setPendingDrop(npc);
                      toast.message(`Click the map to place ${npc.name}`);
                    }}
                  />
                  <SkillChallengeTool
                    challenge={st.skillChallenge}
                    isDm
                    onChange={(skillChallenge) =>
                      session.dmSetState((s) => ({ ...s, skillChallenge }))
                    }
                  />
                  <ClocksPanel
                    clocks={st.clocks}
                    isDm
                    onChange={(clocks) => session.dmSetState((s) => ({ ...s, clocks }))}
                  />
                  <HazardsPanel
                    hazards={st.hazards}
                    isDm
                    onChange={(hazards) => session.dmSetState((s) => ({ ...s, hazards }))}
                  />
                  <RewardsPanel
                    characters={st.characters}
                    onGrant={(characters, log) => {
                      session.dmSetState((s) => {
                        let next = { ...s, characters, sessionLog: [log, ...s.sessionLog] };
                        // sync each changed sheet to map/combat via update path
                        for (const ch of characters) {
                          const prev = s.characters.find((c) => c.id === ch.id);
                          if (prev !== ch) {
                            // inline sync
                            next = {
                              ...next,
                              map: {
                                ...next.map,
                                tokens: next.map.tokens.map((t) =>
                                  t.characterId === ch.id
                                    ? {
                                        ...t,
                                        label: ch.name.slice(0, 3).toUpperCase(),
                                        name: ch.name,
                                        color: ch.tokenColor,
                                        hp: ch.currentHp,
                                        maxHp: ch.maxHp,
                                        ac: ch.ac,
                                        conditions: ch.conditions,
                                      }
                                    : t,
                                ),
                              },
                            };
                          }
                        }
                        return next;
                      });
                    }}
                  />

                  <LootPanel
                    loot={st.loot}
                    isDm
                    onChange={(loot) => session.dmSetState((s) => ({ ...s, loot }))}
                  />
                  <SessionLogPanel
                    log={st.sessionLog}
                    isDm
                    onChange={(sessionLog) => session.dmSetState((s) => ({ ...s, sessionLog }))}
                  />
                  <DmNotesPanel notes={privateNotes} onChange={setPrivateNotes} />
                  <div className="grid gap-2">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
                      Shared party notes
                    </h3>
                    <Textarea
                      value={st.sharedNotes}
                      onChange={(e) =>
                        session.dmSetState((s) => ({ ...s, sharedNotes: e.target.value }))
                      }
                      className="min-h-[80px]"
                      placeholder="Visible to everyone at the table…"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        session.dmSetState((s) => ({
                          ...s,
                          sessionLog: [
                            {
                              id: `log-${Date.now()}`,
                              at: Date.now(),
                              text: `Short rest — ${s.settings.shortRestHint}`,
                              kind: "rest",
                            },
                            ...s.sessionLog,
                          ],
                        }));
                        toast.message("Short rest logged");
                      }}
                    >
                      Log short rest
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        session.dmSetState((s) => ({
                          ...s,
                          characters: s.characters.map((c) => ({
                            ...c,
                            currentHp: c.maxHp,
                          })),
                          sessionLog: [
                            {
                              id: `log-${Date.now()}`,
                              at: Date.now(),
                              text: `Long rest — ${s.settings.longRestHint}`,
                              kind: "rest",
                            },
                            ...s.sessionLog,
                          ],
                        }));
                        toast.success("Long rest — party HP restored");
                      }}
                    >
                      Long rest (heal party)
                    </Button>
                  </div>
                </div>
              </TabsContent>
            )}

            <TabsContent value="handouts" className="m-0 overflow-y-auto p-3 sm:p-4 scrollbar-thin">
              {role === "dm" && (
                <DmHandoutComposer
                  onPublish={(title, body) => {
                    session.dmSetState((s) => ({
                      ...s,
                      handouts: [
                        { id: `h-${Date.now()}`, title, body, createdAt: Date.now() },
                        ...s.handouts,
                      ],
                    }));
                    toast.success("Handout shared");
                  }}
                />
              )}
              {st.sharedNotes && (
                <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                    Party notes
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-[var(--color-fg-muted)]">
                    {st.sharedNotes}
                  </p>
                </div>
              )}
              {st.skillChallenge.active && (
                <div className="mt-4">
                  <SkillChallengeTool
                    challenge={st.skillChallenge}
                    isDm={false}
                    onChange={() => {}}
                  />
                </div>
              )}
              {(st.clocks.length > 0 || st.hazards.length > 0 || st.loot.length > 0) && (
                <div className="mt-4 grid gap-4">
                  {st.clocks.length > 0 && (
                    <ClocksPanel clocks={st.clocks} isDm={false} onChange={() => {}} />
                  )}
                  {st.hazards.length > 0 && (
                    <HazardsPanel hazards={st.hazards} isDm={false} onChange={() => {}} />
                  )}
                  {st.loot.length > 0 && (
                    <LootPanel loot={st.loot} isDm={role === "dm"} onChange={(loot) => session.dmSetState((s) => ({ ...s, loot }))} />
                  )}
                </div>
              )}
              <div className="mt-4 grid gap-3">
                {st.handouts.length === 0 && (
                  <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] px-4 py-10 text-center text-sm text-[var(--color-fg-subtle)]">
                    No handouts yet. DM can share read-alouds, clues, and player-facing notes.
                  </p>
                )}
                {st.handouts.map((h) => (
                  <article
                    key={h.id}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-readaloud-border)] bg-[var(--color-readaloud)] p-4"
                  >
                    <h3 className="font-display text-base font-semibold">{h.title}</h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {h.body}
                    </p>
                  </article>
                ))}
              </div>
            </TabsContent>

            {role === "dm" && (
              <TabsContent value="settings" className="m-0 overflow-y-auto p-3 sm:p-4 scrollbar-thin">
                <div className="mx-auto max-w-xl">
                  <h2 className="mb-4 font-display text-xl font-semibold">Table settings</h2>
                  <TableSettingsPanel
                    settings={st.settings}
                    onChange={(settings) =>
                      session.dmSetState((s) => ({
                        ...s,
                        settings,
                        name: settings.tableName || s.name,
                      }))
                    }
                  />
                </div>
              </TabsContent>
            )}

            {role === "player" && st.settings.houseRules && (
              <TabsContent value="rules" className="m-0 p-4">
                <h2 className="font-display text-lg font-semibold">House rules</h2>
                <p className="mt-1 text-xs text-[var(--color-fg-subtle)]">
                  {st.settings.edition} · {st.settings.levelBand} · progression: {st.settings.xpMode}
                </p>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {st.settings.houseRules}
                </p>
                <div className="mt-4 grid gap-2 text-sm text-[var(--color-fg-muted)]">
                  <p>
                    <strong className="text-[var(--color-fg)]">Short rest:</strong>{" "}
                    {st.settings.shortRestHint}
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg)]">Long rest:</strong>{" "}
                    {st.settings.longRestHint}
                  </p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        <aside className="grid gap-0 bg-[color-mix(in_oklab,var(--color-bg-elevated)_55%,transparent)] lg:grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="hidden min-h-0 flex-col border-b border-[var(--color-border)] lg:flex">
            <SidebarTrackers
              combat={st.combat}
              characters={st.characters}
              seats={st.seats}
              isDm={session.isDm}
              selfId={session.selfId}
              onCombat={(combat) => session.dmSetState((s) => ({ ...s, combat }))}
              onSheet={(sheet) => {
                if (session.isDm) session.updateSheet(sheet);
                else if (sheet.ownerPeerId === session.selfId) session.updateSheet(sheet);
              }}
              onRoll={(expr, label) => session.roll(expr, label, session.isDm)}
            />
          </div>
          <div className="min-h-0 overflow-y-auto p-4 scrollbar-thin">
            <SharedDice log={session.visibleDice} onRoll={session.roll} isDm={session.isDm} />
          </div>
        </aside>
      </div>

      {role === "dm" && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 sm:px-4">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 text-xs text-[var(--color-fg-subtle)]">
            <Settings2 className="size-3.5" />
            <span>DM tools active</span>
            <span className="opacity-40">·</span>
            <span>
              Module text stays on your device. Players see map, dice, combat, sheets, handouts, and
              whatever you reveal in Tools.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DmHandoutComposer({ onPublish }: { onPublish: (title: string, body: string) => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
      <p className="mb-2 text-xs font-medium tracking-wide text-[var(--color-fg-subtle)] uppercase">
        Share with players
      </p>
      <div className="grid gap-2">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          placeholder="Read-aloud, clue, or player-facing note…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-[88px]"
        />
        <Button
          type="button"
          disabled={!title.trim() || !body.trim()}
          onClick={() => {
            onPublish(title.trim(), body.trim());
            setTitle("");
            setBody("");
          }}
        >
          Publish handout
        </Button>
      </div>
    </div>
  );
}

function SidebarTrackers({
  combat,
  characters,
  seats,
  isDm,
  selfId,
  onCombat,
  onSheet,
  onRoll,
}: {
  combat: import("@/lib/table/types").CombatState;
  characters: import("@/lib/table/types").CharacterSheet[];
  seats: import("@/lib/table/types").Seat[];
  isDm: boolean;
  selfId: string;
  onCombat: (c: import("@/lib/table/types").CombatState) => void;
  onSheet: (s: import("@/lib/table/types").CharacterSheet) => void;
  onRoll: (expr: string, label: string) => void;
}) {
  const [side, setSide] = useState<"party" | "combat">("party");
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex gap-1 border-b border-[var(--color-border)] px-3 py-2">
        <Button
          type="button"
          size="sm"
          variant={side === "party" ? "steel" : "ghost"}
          onClick={() => setSide("party")}
        >
          Party
        </Button>
        <Button
          type="button"
          size="sm"
          variant={side === "combat" ? "steel" : "ghost"}
          onClick={() => setSide("combat")}
        >
          Combat
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3 scrollbar-thin">
        {side === "party" ? (
          <PartyTracker
            characters={characters}
            seats={seats}
            isDm={isDm}
            selfId={selfId}
            compact
            onChange={onSheet}
            onRoll={onRoll}
          />
        ) : (
          <CombatTracker
            combat={combat}
            characters={characters}
            isDm={isDm}
            onChange={onCombat}
          />
        )}
      </div>
    </div>
  );
}
