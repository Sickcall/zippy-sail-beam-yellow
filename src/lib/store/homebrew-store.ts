import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Campaign, Scene, SceneSection } from "@/data/types";
import { campaigns as builtInCampaigns } from "@/data/campaigns";

export type HomebrewMeta = {
  source: "built-in" | "homebrew";
  updatedAt: number;
};

export type StoredCampaign = Campaign & HomebrewMeta;

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function blankScene(number: number): Scene {
  return {
    id: uid("scene"),
    number,
    title: `Scene ${number}`,
    shortTitle: `Scene ${number}`,
    summary: "",
    tags: [],
    sections: [
      { type: "readAloud", title: "Read aloud", text: "" },
      { type: "dmGuidance", title: "DM guidance", text: "" },
    ],
  };
}

export function blankCampaign(partial?: Partial<Campaign>): Campaign {
  return {
    id: uid("camp"),
    title: partial?.title ?? "Untitled Campaign",
    subtitle: partial?.subtitle ?? "Homebrew",
    edition: partial?.edition ?? "D&D 5e",
    levelRange: partial?.levelRange ?? "Levels 1–5",
    estimatedSessions: partial?.estimatedSessions ?? "1–3 sessions",
    tags: partial?.tags ?? ["homebrew"],
    synopsis: partial?.synopsis ?? "",
    features: partial?.features ?? [],
    antagonist: partial?.antagonist ?? "",
    patron: partial?.patron ?? "",
    scenes: partial?.scenes ?? [blankScene(1)],
    aftermath: partial?.aftermath,
    lore: partial?.lore,
    appendix: partial?.appendix,
  };
}

function seedBuiltIns(): StoredCampaign[] {
  return builtInCampaigns.map((c) => ({
    ...structuredClone(c),
    source: "built-in" as const,
    updatedAt: 0,
  }));
}

type HomebrewState = {
  homebrew: StoredCampaign[];
  hydrated: boolean;
  ensureSeeded: () => void;
  listAll: () => StoredCampaign[];
  getById: (id: string) => StoredCampaign | undefined;
  create: (partial?: Partial<Campaign>) => StoredCampaign;
  update: (id: string, patch: Partial<Campaign>) => void;
  remove: (id: string) => void;
  duplicate: (id: string) => StoredCampaign | undefined;
  importJson: (raw: unknown) => { ok: true; id: string } | { ok: false; error: string };
  exportJson: (id: string) => string | null;
  upsertScene: (campaignId: string, scene: Scene) => void;
  removeScene: (campaignId: string, sceneId: string) => void;
  setSections: (campaignId: string, sceneId: string, sections: SceneSection[]) => void;
};

export const useHomebrewStore = create<HomebrewState>()(
  persist(
    (set, get) => ({
      homebrew: [],
      hydrated: false,

      ensureSeeded: () => set({ hydrated: true }),

      listAll: () => {
        const built = seedBuiltIns();
        // homebrew overrides built-in with same id if forked under new id only
        return [...built, ...get().homebrew];
      },

      getById: (id) => {
        const hb = get().homebrew.find((c) => c.id === id);
        if (hb) return hb;
        const bi = builtInCampaigns.find((c) => c.id === id);
        if (!bi) return undefined;
        return { ...structuredClone(bi), source: "built-in", updatedAt: 0 };
      },

      create: (partial) => {
        const camp: StoredCampaign = {
          ...blankCampaign(partial),
          source: "homebrew",
          updatedAt: Date.now(),
        };
        set((s) => ({ homebrew: [...s.homebrew, camp] }));
        return camp;
      },

      update: (id, patch) => {
        const existing = get().getById(id);
        if (!existing) return;
        if (existing.source === "built-in") {
          // fork into homebrew with new id keeping content
          const forked: StoredCampaign = {
            ...existing,
            ...patch,
            id: uid("camp"),
            title: patch.title ?? `${existing.title} (edited)`,
            source: "homebrew",
            updatedAt: Date.now(),
          };
          set((s) => ({ homebrew: [...s.homebrew, forked] }));
          return;
        }
        set((s) => ({
          homebrew: s.homebrew.map((c) =>
            c.id === id ? { ...c, ...patch, id: c.id, source: "homebrew", updatedAt: Date.now() } : c,
          ),
        }));
      },

      remove: (id) => {
        set((s) => ({ homebrew: s.homebrew.filter((c) => c.id !== id) }));
      },

      duplicate: (id) => {
        const src = get().getById(id);
        if (!src) return undefined;
        const copy: StoredCampaign = {
          ...structuredClone(src),
          id: uid("camp"),
          title: `${src.title} (copy)`,
          source: "homebrew",
          updatedAt: Date.now(),
          scenes: src.scenes.map((sc, i) => ({
            ...structuredClone(sc),
            id: uid("scene"),
            number: i + 1,
          })),
        };
        set((s) => ({ homebrew: [...s.homebrew, copy] }));
        return copy;
      },

      importJson: (raw) => {
        try {
          const data = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (!data || typeof data !== "object") return { ok: false, error: "Invalid JSON" };
          const obj = data as Partial<Campaign>;
          if (!obj.title || !Array.isArray(obj.scenes)) {
            return { ok: false, error: "Campaign needs title and scenes[]" };
          }
          const camp = get().create({
            ...blankCampaign(),
            ...obj,
            id: uid("camp"),
            scenes: obj.scenes.map((sc, i) => ({
              ...blankScene(i + 1),
              ...sc,
              id: sc?.id || uid("scene"),
              number: sc?.number || i + 1,
              sections: sc?.sections ?? [],
              tags: sc?.tags ?? [],
              summary: sc?.summary ?? "",
              title: sc?.title ?? `Scene ${i + 1}`,
              shortTitle: sc?.shortTitle ?? sc?.title ?? `Scene ${i + 1}`,
            })),
          });
          return { ok: true, id: camp.id };
        } catch (e) {
          return { ok: false, error: e instanceof Error ? e.message : "Parse failed" };
        }
      },

      exportJson: (id) => {
        const c = get().getById(id);
        if (!c) return null;
        const { source: _s, updatedAt: _u, ...rest } = c;
        return JSON.stringify(rest, null, 2);
      },

      upsertScene: (campaignId, scene) => {
        const existing = get().getById(campaignId);
        if (!existing) return;
        if (existing.source === "built-in") {
          const forked = get().duplicate(campaignId);
          if (!forked) return;
          get().upsertScene(forked.id, scene);
          return;
        }
        set((s) => ({
          homebrew: s.homebrew.map((c) => {
            if (c.id !== campaignId) return c;
            const exists = c.scenes.some((sc) => sc.id === scene.id);
            const scenes = exists
              ? c.scenes.map((sc) => (sc.id === scene.id ? scene : sc))
              : [...c.scenes, scene].sort((a, b) => a.number - b.number);
            return { ...c, scenes, updatedAt: Date.now() };
          }),
        }));
      },

      removeScene: (campaignId, sceneId) => {
        set((s) => ({
          homebrew: s.homebrew.map((c) =>
            c.id !== campaignId
              ? c
              : {
                  ...c,
                  scenes: c.scenes
                    .filter((sc) => sc.id !== sceneId)
                    .map((sc, i) => ({ ...sc, number: i + 1 })),
                  updatedAt: Date.now(),
                },
          ),
        }));
      },

      setSections: (campaignId, sceneId, sections) => {
        const existing = get().getById(campaignId);
        if (!existing) return;
        if (existing.source === "built-in") {
          const forked = get().duplicate(campaignId);
          if (forked) get().setSections(forked.id, sceneId, sections);
          return;
        }
        set((s) => ({
          homebrew: s.homebrew.map((c) =>
            c.id !== campaignId
              ? c
              : {
                  ...c,
                  scenes: c.scenes.map((sc) =>
                    sc.id === sceneId ? { ...sc, sections } : sc,
                  ),
                  updatedAt: Date.now(),
                },
          ),
        }));
      },
    }),
    {
      name: "grimoire-homebrew-v1",
      partialize: (s) => ({ homebrew: s.homebrew }),
      onRehydrateStorage: () => (state) => {
        state?.ensureSeeded();
      },
    },
  ),
);

export function resolveCampaign(id: string | null | undefined): StoredCampaign | undefined {
  if (!id) return undefined;
  return useHomebrewStore.getState().getById(id);
}
