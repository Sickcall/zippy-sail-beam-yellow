import type { Campaign } from "@/data/types";
import { actOneCellToSand } from "./act-one-cell-to-sand";

export const campaigns: Campaign[] = [actOneCellToSand];

export function getCampaign(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}
