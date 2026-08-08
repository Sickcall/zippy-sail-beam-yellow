export type SensoryPrompt = {
  classLabel: string;
  text: string;
};

export type ExploreItem = {
  title: string;
  text: string;
  check?: string;
};

export type Branch = {
  condition: string;
  outcome: string;
};

export type SkillCheck = {
  skill: string;
  dc: number;
  description: string;
};

export type SkillChallenge = {
  title: string;
  goal: string;
  successesNeeded: number;
  failuresAllowed: number;
  checks: SkillCheck[];
  successOutcome: string;
  failureOutcome: string;
};

export type RunestoneHazard = {
  title: string;
  description: string;
  ac: number;
  hp: number;
  count: number;
  shatterThreshold: number;
  mechanics: { name: string; text: string }[];
};

export type DialogueLine = {
  speaker: string;
  line: string;
  stageDirection?: string;
};

export type SceneSection =
  | { type: "readAloud"; title?: string; text: string }
  | { type: "dmGuidance"; title?: string; text: string }
  | { type: "sensory"; title?: string; prompts: SensoryPrompt[] }
  | { type: "explore"; title?: string; items: ExploreItem[] }
  | { type: "branches"; title?: string; branches: Branch[] }
  | { type: "skillChallenge"; challenge: SkillChallenge }
  | { type: "runestones"; hazard: RunestoneHazard }
  | { type: "dialogue"; title?: string; lines: DialogueLine[] }
  | { type: "bullets"; title?: string; items: string[] }
  | { type: "openFloor"; title?: string; text: string }
  | { type: "prose"; title?: string; text: string };

export type Scene = {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  summary: string;
  tags: string[];
  sections: SceneSection[];
};

export type Campaign = {
  id: string;
  title: string;
  subtitle: string;
  edition: string;
  levelRange: string;
  estimatedSessions: string;
  tags: string[];
  synopsis: string;
  features: string[];
  antagonist: string;
  patron: string;
  scenes: Scene[];
  aftermath?: {
    title: string;
    considerations: { title: string; items: string[] }[];
    actTwoSettings: { title: string; text: string }[];
  };
  lore?: {
    title: string;
    sections: { title: string; items: string[] }[];
  };
  appendix?: {
    title: string;
    sections: { title: string; items: string[] }[];
  };
};
