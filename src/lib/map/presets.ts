import type { MapPreset, MapState } from "@/lib/table/types";

/** Visual theme for rendering — not stored in tiles, derived from preset. */
export type MapTheme = {
  floor: string;
  floorAlt: string;
  wall: string;
  wallEdge: string;
  grid: string;
  difficult: string;
  hazard: string;
  water: string;
  door: string;
  cover: string;
  pillar: string;
  ambient: string;
};

export const MAP_PRESET_META: {
  id: MapPreset;
  label: string;
  group: string;
  defaultCols: number;
  defaultRows: number;
}[] = [
  { id: "blank", label: "Blank", group: "Basic", defaultCols: 20, defaultRows: 14 },
  { id: "room", label: "Chamber", group: "Basic", defaultCols: 16, defaultRows: 12 },
  { id: "corridor", label: "Corridor", group: "Dungeon", defaultCols: 24, defaultRows: 10 },
  { id: "dungeon", label: "Dungeon", group: "Dungeon", defaultCols: 22, defaultRows: 16 },
  { id: "crypt", label: "Crypt", group: "Dungeon", defaultCols: 18, defaultRows: 14 },
  { id: "cave", label: "Cave", group: "Wilderness", defaultCols: 20, defaultRows: 16 },
  { id: "forest", label: "Forest", group: "Wilderness", defaultCols: 22, defaultRows: 16 },
  { id: "outdoor", label: "Wilderness", group: "Wilderness", defaultCols: 24, defaultRows: 16 },
  { id: "ruins", label: "Ruins", group: "Wilderness", defaultCols: 20, defaultRows: 14 },
  { id: "arena", label: "Arena", group: "Combat", defaultCols: 20, defaultRows: 14 },
  { id: "cell", label: "Cell block", group: "Combat", defaultCols: 18, defaultRows: 12 },
  { id: "armory", label: "Armory", group: "Combat", defaultCols: 16, defaultRows: 12 },
  { id: "tavern", label: "Tavern", group: "Social", defaultCols: 16, defaultRows: 12 },
  { id: "temple", label: "Temple", group: "Social", defaultCols: 18, defaultRows: 14 },
  { id: "throne", label: "Throne hall", group: "Social", defaultCols: 16, defaultRows: 20 },
  { id: "market", label: "Market", group: "Social", defaultCols: 22, defaultRows: 14 },
  { id: "ship", label: "Ship deck", group: "Travel", defaultCols: 24, defaultRows: 10 },
  { id: "bridge", label: "Bridge", group: "Travel", defaultCols: 20, defaultRows: 12 },
  { id: "custom", label: "Custom", group: "Basic", defaultCols: 20, defaultRows: 14 },
];

export function themeForPreset(preset: MapPreset): MapTheme {
  switch (preset) {
    case "forest":
    case "outdoor":
      return {
        floor: "#1a2218",
        floorAlt: "#162016",
        wall: "#3d4a38",
        wallEdge: "#2a3328",
        grid: "color-mix(in oklab, #8a9a7a 12%, transparent)",
        difficult: "color-mix(in oklab, #6b8f71 28%, transparent)",
        hazard: "color-mix(in oklab, #b45448 30%, transparent)",
        water: "color-mix(in oklab, #4a7a8a 40%, transparent)",
        door: "#5a4a38",
        cover: "#2a3828",
        pillar: "#4a5548",
        ambient: "#0e1410",
      };
    case "cave":
    case "crypt":
    case "dungeon":
    case "corridor":
    case "cell":
    case "armory":
      return {
        floor: "#161412",
        floorAlt: "#12100e",
        wall: "#3a342c",
        wallEdge: "#2a2620",
        grid: "color-mix(in oklab, #a89884 10%, transparent)",
        difficult: "color-mix(in oklab, #c4a35a 22%, transparent)",
        hazard: "color-mix(in oklab, #b45448 32%, transparent)",
        water: "color-mix(in oklab, #4a6a8a 35%, transparent)",
        door: "#5c4a38",
        cover: "#2c2824",
        pillar: "#4a443c",
        ambient: "#0c0b0a",
      };
    case "arena":
      return {
        floor: "#2a2418",
        floorAlt: "#241e14",
        wall: "#4a4030",
        wallEdge: "#3a3228",
        grid: "color-mix(in oklab, #c4a35a 14%, transparent)",
        difficult: "color-mix(in oklab, #c4a35a 30%, transparent)",
        hazard: "color-mix(in oklab, #b45448 28%, transparent)",
        water: "color-mix(in oklab, #5a7a8a 30%, transparent)",
        door: "#6a5a40",
        cover: "#3a3228",
        pillar: "#5a5040",
        ambient: "#14100c",
      };
    case "ship":
    case "bridge":
      return {
        floor: "#1c1814",
        floorAlt: "#181410",
        wall: "#3a3228",
        wallEdge: "#2a241c",
        grid: "color-mix(in oklab, #8a9aad 12%, transparent)",
        difficult: "color-mix(in oklab, #c4a35a 20%, transparent)",
        hazard: "color-mix(in oklab, #b45448 28%, transparent)",
        water: "color-mix(in oklab, #3a6a8a 55%, transparent)",
        door: "#5a4a38",
        cover: "#2c2820",
        pillar: "#4a4034",
        ambient: "#0a1014",
      };
    case "tavern":
    case "temple":
    case "throne":
    case "market":
    case "room":
    case "ruins":
      return {
        floor: "#1a1612",
        floorAlt: "#16120e",
        wall: "#3f372e",
        wallEdge: "#2c2620",
        grid: "color-mix(in oklab, #d8cfc0 10%, transparent)",
        difficult: "color-mix(in oklab, #c4a35a 22%, transparent)",
        hazard: "color-mix(in oklab, #b45448 28%, transparent)",
        water: "color-mix(in oklab, #4a7a9a 35%, transparent)",
        door: "#6b5540",
        cover: "#2a241e",
        pillar: "#4a4034",
        ambient: "#100e0c",
      };
    default:
      return {
        floor: "#141210",
        floorAlt: "#100e0c",
        wall: "#3f372e",
        wallEdge: "#2c2620",
        grid: "color-mix(in oklab, #a89884 12%, transparent)",
        difficult: "color-mix(in oklab, #c4a35a 22%, transparent)",
        hazard: "color-mix(in oklab, #b45448 28%, transparent)",
        water: "color-mix(in oklab, #4a7a9a 35%, transparent)",
        door: "#5a4a38",
        cover: "#2a2620",
        pillar: "#4a443c",
        ambient: "#0c0b0a",
      };
  }
}

/** Tile legend: 0 empty, 1 wall, 2 difficult, 3 hazard, 4 door, 5 water, 6 cover, 7 pillar */
export const TILE_LABELS = [
  "Floor",
  "Wall",
  "Difficult",
  "Hazard",
  "Door",
  "Water",
  "Cover",
  "Pillar",
] as const;

function idx(cols: number, x: number, y: number) {
  return y * cols + x;
}

function inBounds(cols: number, rows: number, x: number, y: number) {
  return x >= 0 && y >= 0 && x < cols && y < rows;
}

function fillRect(
  tiles: number[],
  cols: number,
  rows: number,
  x0: number,
  y0: number,
  w: number,
  h: number,
  v: number,
) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      if (inBounds(cols, rows, x, y)) tiles[idx(cols, x, y)] = v;
    }
  }
}

function border(tiles: number[], cols: number, rows: number, v = 1) {
  for (let x = 0; x < cols; x++) {
    tiles[idx(cols, x, 0)] = v;
    tiles[idx(cols, x, rows - 1)] = v;
  }
  for (let y = 0; y < rows; y++) {
    tiles[idx(cols, 0, y)] = v;
    tiles[idx(cols, cols - 1, y)] = v;
  }
}

function doorAt(tiles: number[], cols: number, rows: number, x: number, y: number) {
  if (inBounds(cols, rows, x, y)) tiles[idx(cols, x, y)] = 4;
}

function seedRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function hashPreset(preset: string, cols: number, rows: number) {
  let h = 2166136261;
  const str = `${preset}:${cols}x${rows}`;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function generateMap(
  preset: MapPreset = "blank",
  cols?: number,
  rows?: number,
  name?: string,
): MapState {
  const meta = MAP_PRESET_META.find((m) => m.id === preset);
  const c = cols ?? meta?.defaultCols ?? 20;
  const r = rows ?? meta?.defaultRows ?? 14;
  const tiles = new Array(c * r).fill(0);
  const rand = seedRand(hashPreset(preset, c, r));
  let mapName = name ?? meta?.label ?? "Map";

  switch (preset) {
    case "blank":
    case "custom":
      mapName = name ?? (preset === "custom" ? "Custom grid" : "Blank grid");
      break;

    case "room": {
      border(tiles, c, r);
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      // furniture as cover
      fillRect(tiles, c, r, 2, 2, 2, 1, 6);
      fillRect(tiles, c, r, c - 4, 2, 2, 1, 6);
      tiles[idx(c, Math.floor(c / 2), Math.floor(r / 2))] = 7;
      mapName = name ?? "Chamber";
      break;
    }

    case "corridor": {
      border(tiles, c, r);
      // main hall
      for (let y = 1; y < r - 1; y++) {
        for (let x = 1; x < c - 1; x++) {
          if (y < 3 || y > r - 4) {
            if (x % 5 !== 0) tiles[idx(c, x, y)] = 1;
          }
        }
      }
      // side alcoves
      for (let x = 4; x < c - 4; x += 5) {
        fillRect(tiles, c, r, x, 1, 2, 2, 0);
        fillRect(tiles, c, r, x, r - 3, 2, 2, 0);
        doorAt(tiles, c, r, x + 1, 3);
        doorAt(tiles, c, r, x + 1, r - 4);
      }
      doorAt(tiles, c, r, 0, Math.floor(r / 2));
      doorAt(tiles, c, r, c - 1, Math.floor(r / 2));
      mapName = name ?? "Corridor";
      break;
    }

    case "dungeon": {
      border(tiles, c, r);
      // cross corridors
      const mx = Math.floor(c / 2);
      const my = Math.floor(r / 2);
      for (let y = 1; y < r - 1; y++) {
        for (let x = 1; x < c - 1; x++) {
          const onCross = x === mx || x === mx - 1 || y === my || y === my - 1;
          if (!onCross) tiles[idx(c, x, y)] = 1;
        }
      }
      // rooms off corridors
      fillRect(tiles, c, r, 2, 2, 4, 3, 0);
      fillRect(tiles, c, r, c - 6, 2, 4, 3, 0);
      fillRect(tiles, c, r, 2, r - 5, 4, 3, 0);
      fillRect(tiles, c, r, c - 6, r - 5, 4, 3, 0);
      doorAt(tiles, c, r, 4, my - 1);
      doorAt(tiles, c, r, c - 5, my - 1);
      doorAt(tiles, c, r, mx, 4);
      doorAt(tiles, c, r, mx, r - 5);
      // pillars
      tiles[idx(c, mx - 3, my - 3)] = 7;
      tiles[idx(c, mx + 2, my - 3)] = 7;
      tiles[idx(c, mx - 3, my + 2)] = 7;
      tiles[idx(c, mx + 2, my + 2)] = 7;
      // hazard trap
      tiles[idx(c, mx, my)] = 3;
      mapName = name ?? "Dungeon";
      break;
    }

    case "crypt": {
      border(tiles, c, r);
      // nave
      fillRect(tiles, c, r, 2, 2, c - 4, r - 4, 0);
      // sarcophagi as cover
      for (let i = 0; i < 4; i++) {
        const x = 3 + i * Math.floor((c - 6) / 4);
        fillRect(tiles, c, r, x, Math.floor(r / 2) - 1, 2, 1, 6);
      }
      // pillars
      for (let y = 3; y < r - 3; y += 3) {
        tiles[idx(c, 3, y)] = 7;
        tiles[idx(c, c - 4, y)] = 7;
      }
      // water pool at end
      fillRect(tiles, c, r, Math.floor(c / 2) - 2, r - 5, 4, 2, 5);
      doorAt(tiles, c, r, Math.floor(c / 2), 0);
      mapName = name ?? "Crypt";
      break;
    }

    case "cave": {
      // organic blob walls
      for (let y = 0; y < r; y++) {
        for (let x = 0; x < c; x++) {
          const nx = (x - c / 2) / (c / 2);
          const ny = (y - r / 2) / (r / 2);
          const noise = Math.sin(x * 0.7 + y * 0.4) * 0.15 + Math.cos(x * 0.3 - y * 0.6) * 0.12;
          const d = nx * nx * 0.9 + ny * ny * 1.1 + noise;
          if (d > 0.85) tiles[idx(c, x, y)] = 1;
          else if (d > 0.55 && rand() < 0.35) tiles[idx(c, x, y)] = 2;
          else if (rand() < 0.04) tiles[idx(c, x, y)] = 5;
        }
      }
      // clear center
      fillRect(tiles, c, r, Math.floor(c / 2) - 2, Math.floor(r / 2) - 2, 5, 5, 0);
      mapName = name ?? "Cave";
      break;
    }

    case "forest": {
      for (let y = 0; y < r; y++) {
        for (let x = 0; x < c; x++) {
          const n = rand();
          if (n < 0.12) tiles[idx(c, x, y)] = 7; // trees as pillars
          else if (n < 0.22) tiles[idx(c, x, y)] = 2; // underbrush
          else if (n < 0.26) tiles[idx(c, x, y)] = 6; // fallen logs
          else if (n < 0.29) tiles[idx(c, x, y)] = 5; // stream
        }
      }
      // stream path
      let sy = Math.floor(r * 0.4);
      for (let x = 0; x < c; x++) {
        tiles[idx(c, x, sy)] = 5;
        if (rand() < 0.4) sy = Math.max(1, Math.min(r - 2, sy + (rand() < 0.5 ? -1 : 1)));
      }
      // clearing
      fillRect(tiles, c, r, Math.floor(c / 2) - 3, Math.floor(r / 2) - 2, 6, 5, 0);
      mapName = name ?? "Forest";
      break;
    }

    case "outdoor": {
      for (let y = 0; y < r; y++) {
        for (let x = 0; x < c; x++) {
          const n = rand();
          if (n < 0.05) tiles[idx(c, x, y)] = 1; // rock
          else if (n < 0.14) tiles[idx(c, x, y)] = 2;
          else if (n < 0.17) tiles[idx(c, x, y)] = 7;
        }
      }
      // road
      const roadY = Math.floor(r / 2);
      for (let x = 0; x < c; x++) {
        tiles[idx(c, x, roadY)] = 0;
        tiles[idx(c, x, roadY - 1)] = 0;
        if (rand() < 0.15) tiles[idx(c, x, roadY + 1)] = 2;
      }
      mapName = name ?? "Wilderness";
      break;
    }

    case "ruins": {
      border(tiles, c, r);
      // broken walls
      for (let y = 2; y < r - 2; y++) {
        for (let x = 2; x < c - 2; x++) {
          if ((x === 4 || x === c - 5 || y === 4 || y === r - 5) && rand() < 0.7) {
            tiles[idx(c, x, y)] = 1;
          }
        }
      }
      // rubble
      for (let i = 0; i < 18; i++) {
        const x = 1 + Math.floor(rand() * (c - 2));
        const y = 1 + Math.floor(rand() * (r - 2));
        tiles[idx(c, x, y)] = rand() < 0.5 ? 2 : 6;
      }
      // pillars
      tiles[idx(c, 5, 5)] = 7;
      tiles[idx(c, c - 6, 5)] = 7;
      tiles[idx(c, 5, r - 6)] = 7;
      tiles[idx(c, c - 6, r - 6)] = 7;
      mapName = name ?? "Ruins";
      break;
    }

    case "arena": {
      for (let y = 0; y < r; y++) {
        for (let x = 0; x < c; x++) {
          const nx = (x - c / 2) / (c / 2);
          const ny = (y - r / 2) / (r / 2);
          const d = nx * nx + ny * ny;
          if (d > 0.92) tiles[idx(c, x, y)] = 1;
          else if (d > 0.72) tiles[idx(c, x, y)] = 2;
        }
      }
      // gates
      doorAt(tiles, c, r, Math.floor(c / 2), 0);
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      // pillars around
      for (const [px, py] of [
        [4, 4],
        [c - 5, 4],
        [4, r - 5],
        [c - 5, r - 5],
      ]) {
        if (inBounds(c, r, px!, py!)) tiles[idx(c, px!, py!)] = 7;
      }
      mapName = name ?? "Arena";
      break;
    }

    case "cell": {
      border(tiles, c, r);
      // three cells
      const cellW = Math.floor((c - 4) / 3);
      for (let i = 0; i < 3; i++) {
        const x0 = 1 + i * (cellW + 1);
        fillRect(tiles, c, r, x0, 1, cellW, Math.floor(r / 2) - 1, 0);
        // bars
        for (let x = x0; x < x0 + cellW; x++) {
          tiles[idx(c, x, Math.floor(r / 2))] = 1;
        }
        doorAt(tiles, c, r, x0 + Math.floor(cellW / 2), Math.floor(r / 2));
      }
      // corridor
      fillRect(tiles, c, r, 1, Math.floor(r / 2) + 1, c - 2, r - Math.floor(r / 2) - 2, 0);
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      mapName = name ?? "Cell block";
      break;
    }

    case "armory": {
      border(tiles, c, r);
      // weapon racks as walls
      fillRect(tiles, c, r, 2, 2, 3, 1, 1);
      fillRect(tiles, c, r, c - 5, 2, 3, 1, 1);
      fillRect(tiles, c, r, 2, r - 3, 3, 1, 1);
      fillRect(tiles, c, r, c - 5, r - 3, 3, 1, 1);
      // center table cover
      fillRect(tiles, c, r, Math.floor(c / 2) - 2, Math.floor(r / 2) - 1, 4, 2, 6);
      // pillars
      tiles[idx(c, 4, 4)] = 7;
      tiles[idx(c, c - 5, 4)] = 7;
      tiles[idx(c, 4, r - 5)] = 7;
      tiles[idx(c, c - 5, r - 5)] = 7;
      doorAt(tiles, c, r, Math.floor(c / 2), 0);
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      mapName = name ?? "Armory";
      break;
    }

    case "tavern": {
      border(tiles, c, r);
      // bar
      fillRect(tiles, c, r, 2, 2, c - 4, 1, 6);
      // tables
      for (let i = 0; i < 3; i++) {
        fillRect(tiles, c, r, 3 + i * 4, 5, 2, 2, 6);
      }
      // hearth hazard
      tiles[idx(c, c - 3, 3)] = 3;
      // kitchen door
      fillRect(tiles, c, r, c - 4, r - 4, 3, 2, 1);
      doorAt(tiles, c, r, c - 3, r - 4);
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      // pillars
      tiles[idx(c, 3, 8)] = 7;
      tiles[idx(c, c - 4, 8)] = 7;
      mapName = name ?? "Tavern";
      break;
    }

    case "temple": {
      border(tiles, c, r);
      // aisle
      for (let y = 2; y < r - 2; y++) {
        tiles[idx(c, Math.floor(c / 2), y)] = 0;
        tiles[idx(c, Math.floor(c / 2) - 1, y)] = 0;
      }
      // pews as cover
      for (let y = 3; y < r - 5; y += 2) {
        fillRect(tiles, c, r, 2, y, Math.floor(c / 2) - 3, 1, 6);
        fillRect(tiles, c, r, Math.floor(c / 2) + 2, y, Math.floor(c / 2) - 4, 1, 6);
      }
      // altar
      fillRect(tiles, c, r, Math.floor(c / 2) - 2, 2, 4, 2, 6);
      // holy water
      tiles[idx(c, Math.floor(c / 2), 4)] = 5;
      // pillars
      for (let y = 4; y < r - 3; y += 3) {
        tiles[idx(c, 3, y)] = 7;
        tiles[idx(c, c - 4, y)] = 7;
      }
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      mapName = name ?? "Temple";
      break;
    }

    case "throne": {
      border(tiles, c, r);
      // long hall
      // carpet difficult? no keep clear
      // throne dais
      fillRect(tiles, c, r, Math.floor(c / 2) - 2, 2, 4, 3, 6);
      tiles[idx(c, Math.floor(c / 2), 2)] = 7;
      // pillars lining hall
      for (let y = 6; y < r - 3; y += 3) {
        tiles[idx(c, 3, y)] = 7;
        tiles[idx(c, c - 4, y)] = 7;
      }
      // side alcoves
      fillRect(tiles, c, r, 1, 8, 2, 3, 0);
      fillRect(tiles, c, r, c - 3, 8, 2, 3, 0);
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      mapName = name ?? "Throne hall";
      break;
    }

    case "market": {
      // open air with stalls
      border(tiles, c, r);
      for (let i = 0; i < 6; i++) {
        const x = 2 + (i % 3) * Math.floor((c - 4) / 3);
        const y = 2 + Math.floor(i / 3) * Math.floor((r - 4) / 2);
        fillRect(tiles, c, r, x, y, 3, 2, 6);
      }
      // fountain
      fillRect(tiles, c, r, Math.floor(c / 2) - 1, Math.floor(r / 2) - 1, 3, 3, 5);
      tiles[idx(c, Math.floor(c / 2), Math.floor(r / 2))] = 7;
      // crates
      for (let i = 0; i < 8; i++) {
        const x = 1 + Math.floor(rand() * (c - 2));
        const y = 1 + Math.floor(rand() * (r - 2));
        if (tiles[idx(c, x, y)] === 0) tiles[idx(c, x, y)] = 2;
      }
      doorAt(tiles, c, r, Math.floor(c / 2), 0);
      doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
      mapName = name ?? "Market square";
      break;
    }

    case "ship": {
      // hull shape
      for (let y = 0; y < r; y++) {
        for (let x = 0; x < c; x++) {
          const edge = Math.abs(y - r / 2) / (r / 2);
          const bow = x < 3 ? (3 - x) * 0.15 : 0;
          const stern = x > c - 4 ? (x - (c - 4)) * 0.1 : 0;
          if (edge > 0.75 - bow - stern) tiles[idx(c, x, y)] = 1;
        }
      }
      // water outside is already wall; paint outer water feel by leaving walls
      // mast
      tiles[idx(c, Math.floor(c * 0.35), Math.floor(r / 2))] = 7;
      tiles[idx(c, Math.floor(c * 0.65), Math.floor(r / 2))] = 7;
      // cargo
      fillRect(tiles, c, r, Math.floor(c * 0.45), Math.floor(r / 2) - 1, 3, 2, 6);
      // hatch hazard
      tiles[idx(c, Math.floor(c * 0.5), Math.floor(r / 2) + 2)] = 3;
      mapName = name ?? "Ship deck";
      break;
    }

    case "bridge": {
      // water everywhere then bridge
      tiles.fill(5);
      const mid = Math.floor(r / 2);
      fillRect(tiles, c, r, 0, mid - 1, c, 3, 0);
      // railings
      for (let x = 0; x < c; x++) {
        tiles[idx(c, x, mid - 2)] = 1;
        tiles[idx(c, x, mid + 2)] = 1;
      }
      // broken section
      const breakX = Math.floor(c * 0.55);
      tiles[idx(c, breakX, mid)] = 3;
      tiles[idx(c, breakX + 1, mid)] = 2;
      // pillars (supports)
      for (let x = 3; x < c; x += 5) {
        tiles[idx(c, x, mid - 1)] = 7;
        tiles[idx(c, x, mid + 1)] = 7;
      }
      mapName = name ?? "Bridge";
      break;
    }
  }

  return {
    cols: c,
    rows: r,
    cellSize: 36,
    name: mapName,
    tiles,
    tokens: [],
    preset,
  };
}
