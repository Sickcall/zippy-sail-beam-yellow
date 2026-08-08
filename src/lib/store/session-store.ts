import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PartyMember = {
  id: string;
  name: string;
  classLabel: string;
  maxHp: number;
  currentHp: number;
  ac: number;
  notes: string;
  conditions: string[];
};

export type InitiativeEntry = {
  id: string;
  name: string;
  init: number;
  isPc: boolean;
  active: boolean;
};

export type SkillChallengeState = {
  successes: number;
  failures: number;
  log: string[];
  resolved: "success" | "failure" | null;
};

export type RunestoneState = {
  shattered: boolean[];
  notes: string;
};

type SessionState = {
  campaignId: string | null;
  sceneId: string | null;
  completedScenes: string[];
  party: PartyMember[];
  initiative: InitiativeEntry[];
  initiativeRound: number;
  skillChallenge: SkillChallengeState;
  runestones: RunestoneState;
  sessionNotes: string;
  privateNotes: string;
  diceLog: string[];
  setCampaign: (id: string) => void;
  setScene: (id: string) => void;
  markSceneComplete: (id: string) => void;
  addPartyMember: (member: Omit<PartyMember, "id">) => void;
  updatePartyMember: (id: string, patch: Partial<PartyMember>) => void;
  removePartyMember: (id: string) => void;
  setInitiative: (entries: InitiativeEntry[]) => void;
  sortInitiative: () => void;
  nextInitiative: () => void;
  clearInitiative: () => void;
  skillSuccess: (label?: string) => void;
  skillFailure: (label?: string) => void;
  resetSkillChallenge: () => void;
  shatterRunestone: (index: number) => void;
  restoreRunestone: (index: number) => void;
  resetRunestones: () => void;
  setSessionNotes: (text: string) => void;
  setPrivateNotes: (text: string) => void;
  pushDice: (entry: string) => void;
  resetSession: () => void;
};

const emptySkill: SkillChallengeState = {
  successes: 0,
  failures: 0,
  log: [],
  resolved: null,
};

const emptyRunes: RunestoneState = {
  shattered: [false, false, false, false],
  notes: "",
};

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      campaignId: null,
      sceneId: null,
      completedScenes: [],
      party: [],
      initiative: [],
      initiativeRound: 1,
      skillChallenge: { ...emptySkill },
      runestones: { ...emptyRunes, shattered: [...emptyRunes.shattered] },
      sessionNotes: "",
      privateNotes: "",
      diceLog: [],

      setCampaign: (id) => set({ campaignId: id }),
      setScene: (id) => set({ sceneId: id }),
      markSceneComplete: (id) =>
        set((s) => ({
          completedScenes: s.completedScenes.includes(id)
            ? s.completedScenes
            : [...s.completedScenes, id],
        })),

      addPartyMember: (member) =>
        set((s) => ({
          party: [...s.party, { ...member, id: uid() }],
        })),
      updatePartyMember: (id, patch) =>
        set((s) => ({
          party: s.party.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      removePartyMember: (id) =>
        set((s) => ({ party: s.party.filter((p) => p.id !== id) })),

      setInitiative: (entries) => set({ initiative: entries }),
      sortInitiative: () =>
        set((s) => {
          const sorted = [...s.initiative].sort((a, b) => b.init - a.init);
          return {
            initiative: sorted.map((e, i) => ({ ...e, active: i === 0 })),
          };
        }),
      nextInitiative: () =>
        set((s) => {
          if (s.initiative.length === 0) return s;
          const idx = s.initiative.findIndex((e) => e.active);
          const next = idx < 0 ? 0 : (idx + 1) % s.initiative.length;
          const newRound = next === 0 ? s.initiativeRound + 1 : s.initiativeRound;
          return {
            initiativeRound: newRound,
            initiative: s.initiative.map((e, i) => ({
              ...e,
              active: i === next,
            })),
          };
        }),
      clearInitiative: () => set({ initiative: [], initiativeRound: 1 }),

      skillSuccess: (label) =>
        set((s) => {
          if (s.skillChallenge.resolved) return s;
          const successes = s.skillChallenge.successes + 1;
          const resolved = successes >= 3 ? ("success" as const) : null;
          return {
            skillChallenge: {
              ...s.skillChallenge,
              successes,
              resolved,
              log: [
                ...s.skillChallenge.log,
                `Success${label ? `: ${label}` : ""} (${successes}/3)`,
              ],
            },
          };
        }),
      skillFailure: (label) =>
        set((s) => {
          if (s.skillChallenge.resolved) return s;
          const failures = s.skillChallenge.failures + 1;
          const resolved = failures >= 2 ? ("failure" as const) : null;
          return {
            skillChallenge: {
              ...s.skillChallenge,
              failures,
              resolved,
              log: [
                ...s.skillChallenge.log,
                `Failure${label ? `: ${label}` : ""} (${failures}/2)`,
              ],
            },
          };
        }),
      resetSkillChallenge: () => set({ skillChallenge: { ...emptySkill, log: [] } }),

      shatterRunestone: (index) =>
        set((s) => {
          const shattered = [...s.runestones.shattered];
          shattered[index] = true;
          return { runestones: { ...s.runestones, shattered } };
        }),
      restoreRunestone: (index) =>
        set((s) => {
          const shattered = [...s.runestones.shattered];
          shattered[index] = false;
          return { runestones: { ...s.runestones, shattered } };
        }),
      resetRunestones: () =>
        set({ runestones: { notes: "", shattered: [false, false, false, false] } }),

      setSessionNotes: (text) => set({ sessionNotes: text }),
      setPrivateNotes: (text) => set({ privateNotes: text }),
      pushDice: (entry) =>
        set((s) => ({ diceLog: [entry, ...s.diceLog].slice(0, 20) })),

      resetSession: () => {
        const { campaignId } = get();
        set({
          campaignId,
          sceneId: null,
          completedScenes: [],
          party: [],
          initiative: [],
          initiativeRound: 1,
          skillChallenge: { ...emptySkill, log: [] },
          runestones: { notes: "", shattered: [false, false, false, false] },
          sessionNotes: "",
          privateNotes: "",
          diceLog: [],
        });
      },
    }),
    {
      name: "grimoire-session-v1",
    },
  ),
);
