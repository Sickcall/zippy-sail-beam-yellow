import type { InventoryItem } from "@/lib/table/types";
import { emptyInventoryItem } from "@/lib/table/types";

export type RewardPreset = {
  id: string;
  label: string;
  group: string;
  kind: "item" | "gold" | "xp" | "inspiration";
  gold?: number;
  xp?: number;
  item?: Partial<InventoryItem>;
};

export const REWARD_PRESETS: RewardPreset[] = [
  {
    id: "potion-healing",
    label: "Potion of Healing",
    group: "Potions",
    kind: "item",
    item: {
      name: "Potion of Healing",
      category: "potion",
      rarity: "common",
      description:
        "As an action, drink or administer. Regain 2d4+2 hit points.",
      value: "50 gp",
      weight: "0.5 lb",
    },
  },
  {
    id: "potion-greater",
    label: "Potion of Greater Healing",
    group: "Potions",
    kind: "item",
    item: {
      name: "Potion of Greater Healing",
      category: "potion",
      rarity: "uncommon",
      description: "As an action, drink or administer. Regain 4d4+4 hit points.",
      value: "150 gp",
    },
  },
  {
    id: "scroll-1",
    label: "Spell Scroll (1st)",
    group: "Scrolls",
    kind: "item",
    item: {
      name: "Spell Scroll (1st level)",
      category: "scroll",
      rarity: "common",
      description:
        "Cast the written 1st-level spell once (your spellcasting ability). The scroll is destroyed after use. DC and attack bonus depend on the scroll's level.",
      value: "varies",
    },
  },
  {
    id: "longsword-plus1",
    label: "+1 Longsword",
    group: "Weapons",
    kind: "item",
    item: {
      name: "+1 Longsword",
      category: "weapon",
      rarity: "uncommon",
      description:
        "You have a +1 bonus to attack and damage rolls made with this magic weapon.",
      attackBonus: 6,
      damage: "1d8+4",
      value: "uncommon",
      weight: "3 lb",
    },
  },
  {
    id: "dagger",
    label: "Dagger",
    group: "Weapons",
    kind: "item",
    item: {
      name: "Dagger",
      category: "weapon",
      rarity: "common",
      description: "Simple melee weapon. Finesse, light, thrown (20/60).",
      attackBonus: 5,
      damage: "1d4+3",
      value: "2 gp",
      weight: "1 lb",
    },
  },
  {
    id: "shield",
    label: "Shield",
    group: "Armor",
    kind: "item",
    item: {
      name: "Shield",
      category: "armor",
      rarity: "common",
      description: "While holding this shield, you gain a +2 bonus to AC.",
      value: "10 gp",
      weight: "6 lb",
      equipped: false,
    },
  },
  {
    id: "bag-holding",
    label: "Bag of Holding",
    group: "Wondrous",
    kind: "item",
    item: {
      name: "Bag of Holding",
      category: "wondrous",
      rarity: "uncommon",
      description:
        "This bag has an interior space larger than its outside. It can hold up to 500 pounds, not exceeding 64 cubic feet. Retrieving an item is an action.",
      attunement: false,
      value: "uncommon",
      weight: "15 lb",
    },
  },
  {
    id: "cloak-protection",
    label: "Cloak of Protection",
    group: "Wondrous",
    kind: "item",
    item: {
      name: "Cloak of Protection",
      category: "wondrous",
      rarity: "uncommon",
      description: "Requires attunement. You gain a +1 bonus to AC and saving throws while you wear this cloak.",
      attunement: true,
      value: "uncommon",
    },
  },
  {
    id: "gem-100",
    label: "Gemstone (100 gp)",
    group: "Treasure",
    kind: "item",
    item: {
      name: "Gemstone",
      category: "treasure",
      rarity: "common",
      description: "A fine gem worth about 100 gp when sold to a jeweler.",
      value: "100 gp",
      qty: 1,
    },
  },
  {
    id: "gold-10",
    label: "10 gp",
    group: "Currency",
    kind: "gold",
    gold: 10,
  },
  {
    id: "gold-50",
    label: "50 gp",
    group: "Currency",
    kind: "gold",
    gold: 50,
  },
  {
    id: "gold-100",
    label: "100 gp",
    group: "Currency",
    kind: "gold",
    gold: 100,
  },
  {
    id: "xp-50",
    label: "50 XP",
    group: "Progression",
    kind: "xp",
    xp: 50,
  },
  {
    id: "xp-100",
    label: "100 XP",
    group: "Progression",
    kind: "xp",
    xp: 100,
  },
  {
    id: "inspiration",
    label: "Inspiration",
    group: "Progression",
    kind: "inspiration",
  },
];

export function presetToItem(preset: RewardPreset): InventoryItem | null {
  if (preset.kind !== "item" || !preset.item) return null;
  return emptyInventoryItem(preset.item);
}
