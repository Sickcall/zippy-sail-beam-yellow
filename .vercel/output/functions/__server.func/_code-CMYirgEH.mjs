import { o as __toESM } from "./_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./_ssr/button-C8CvZtyd.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { A as LayoutGrid, B as Crosshair, C as Package, D as Map$1, F as Gift, G as BookOpen, H as ChevronRight, I as Eye, L as EyeOff, N as Heart, O as Link2, V as Copy, _ as ScrollText, a as User, b as Plus, d as Swords, g as Send, h as Settings2, i as Users, l as Trash2, m as Share2, n as X, o as UserRound, p as Sparkles, r as Wrench, t as Zap, z as Dices } from "./_libs/lucide-react.mjs";
import { t as Badge } from "./_ssr/badge-DsIz5tIR.mjs";
import { t as Input } from "./_ssr/input-AFaF5Jsv.mjs";
import { n as Textarea, t as SectionRenderer } from "./_ssr/textarea-BUvTS9Iv.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-DdOKQ1TP.mjs";
import { n as resolveCampaign, r as useHomebrewStore } from "./_ssr/homebrew-store-CISoxVrU.mjs";
import { a as createTableState, c as emptySheet, d as normalizeTableState, f as rollDice, i as applyRewardToSheet, m as tokenFromNpc, n as CONDITIONS_5E, o as emptyInventoryItem, p as syncCharacterDerived, r as abilityMod, s as emptyNpc, t as COMMON_EFFECTS, u as newEffect } from "./_ssr/types-DaYGJmtc.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_code-pY51TUGT.mjs";
import { t as $dd0187d7f28e386f$export$2e2bcd8739ae039 } from "./_libs/peerjs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-CMYirgEH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAP_PRESET_META = [
	{
		id: "blank",
		label: "Blank",
		group: "Basic",
		defaultCols: 20,
		defaultRows: 14
	},
	{
		id: "room",
		label: "Chamber",
		group: "Basic",
		defaultCols: 16,
		defaultRows: 12
	},
	{
		id: "corridor",
		label: "Corridor",
		group: "Dungeon",
		defaultCols: 24,
		defaultRows: 10
	},
	{
		id: "dungeon",
		label: "Dungeon",
		group: "Dungeon",
		defaultCols: 22,
		defaultRows: 16
	},
	{
		id: "crypt",
		label: "Crypt",
		group: "Dungeon",
		defaultCols: 18,
		defaultRows: 14
	},
	{
		id: "cave",
		label: "Cave",
		group: "Wilderness",
		defaultCols: 20,
		defaultRows: 16
	},
	{
		id: "forest",
		label: "Forest",
		group: "Wilderness",
		defaultCols: 22,
		defaultRows: 16
	},
	{
		id: "outdoor",
		label: "Wilderness",
		group: "Wilderness",
		defaultCols: 24,
		defaultRows: 16
	},
	{
		id: "ruins",
		label: "Ruins",
		group: "Wilderness",
		defaultCols: 20,
		defaultRows: 14
	},
	{
		id: "arena",
		label: "Arena",
		group: "Combat",
		defaultCols: 20,
		defaultRows: 14
	},
	{
		id: "cell",
		label: "Cell block",
		group: "Combat",
		defaultCols: 18,
		defaultRows: 12
	},
	{
		id: "armory",
		label: "Armory",
		group: "Combat",
		defaultCols: 16,
		defaultRows: 12
	},
	{
		id: "tavern",
		label: "Tavern",
		group: "Social",
		defaultCols: 16,
		defaultRows: 12
	},
	{
		id: "temple",
		label: "Temple",
		group: "Social",
		defaultCols: 18,
		defaultRows: 14
	},
	{
		id: "throne",
		label: "Throne hall",
		group: "Social",
		defaultCols: 16,
		defaultRows: 20
	},
	{
		id: "market",
		label: "Market",
		group: "Social",
		defaultCols: 22,
		defaultRows: 14
	},
	{
		id: "ship",
		label: "Ship deck",
		group: "Travel",
		defaultCols: 24,
		defaultRows: 10
	},
	{
		id: "bridge",
		label: "Bridge",
		group: "Travel",
		defaultCols: 20,
		defaultRows: 12
	},
	{
		id: "custom",
		label: "Custom",
		group: "Basic",
		defaultCols: 20,
		defaultRows: 14
	}
];
function themeForPreset(preset) {
	switch (preset) {
		case "forest":
		case "outdoor": return {
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
			ambient: "#0e1410"
		};
		case "cave":
		case "crypt":
		case "dungeon":
		case "corridor":
		case "cell":
		case "armory": return {
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
			ambient: "#0c0b0a"
		};
		case "arena": return {
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
			ambient: "#14100c"
		};
		case "ship":
		case "bridge": return {
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
			ambient: "#0a1014"
		};
		case "tavern":
		case "temple":
		case "throne":
		case "market":
		case "room":
		case "ruins": return {
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
			ambient: "#100e0c"
		};
		default: return {
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
			ambient: "#0c0b0a"
		};
	}
}
/** Tile legend: 0 empty, 1 wall, 2 difficult, 3 hazard, 4 door, 5 water, 6 cover, 7 pillar */
var TILE_LABELS = [
	"Floor",
	"Wall",
	"Difficult",
	"Hazard",
	"Door",
	"Water",
	"Cover",
	"Pillar"
];
function idx(cols, x, y) {
	return y * cols + x;
}
function inBounds(cols, rows, x, y) {
	return x >= 0 && y >= 0 && x < cols && y < rows;
}
function fillRect(tiles, cols, rows, x0, y0, w, h, v) {
	for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) if (inBounds(cols, rows, x, y)) tiles[idx(cols, x, y)] = v;
}
function border(tiles, cols, rows, v = 1) {
	for (let x = 0; x < cols; x++) {
		tiles[idx(cols, x, 0)] = v;
		tiles[idx(cols, x, rows - 1)] = v;
	}
	for (let y = 0; y < rows; y++) {
		tiles[idx(cols, 0, y)] = v;
		tiles[idx(cols, cols - 1, y)] = v;
	}
}
function doorAt(tiles, cols, rows, x, y) {
	if (inBounds(cols, rows, x, y)) tiles[idx(cols, x, y)] = 4;
}
function seedRand(seed) {
	let s = seed >>> 0;
	return () => {
		s = s * 1664525 + 1013904223 >>> 0;
		return s / 4294967295;
	};
}
function hashPreset(preset, cols, rows) {
	let h = 2166136261;
	const str = `${preset}:${cols}x${rows}`;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function generateMap(preset = "blank", cols, rows, name) {
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
		case "room":
			border(tiles, c, r);
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			fillRect(tiles, c, r, 2, 2, 2, 1, 6);
			fillRect(tiles, c, r, c - 4, 2, 2, 1, 6);
			tiles[idx(c, Math.floor(c / 2), Math.floor(r / 2))] = 7;
			mapName = name ?? "Chamber";
			break;
		case "corridor":
			border(tiles, c, r);
			for (let y = 1; y < r - 1; y++) for (let x = 1; x < c - 1; x++) if (y < 3 || y > r - 4) {
				if (x % 5 !== 0) tiles[idx(c, x, y)] = 1;
			}
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
		case "dungeon": {
			border(tiles, c, r);
			const mx = Math.floor(c / 2);
			const my = Math.floor(r / 2);
			for (let y = 1; y < r - 1; y++) for (let x = 1; x < c - 1; x++) if (!(x === mx || x === mx - 1 || y === my || y === my - 1)) tiles[idx(c, x, y)] = 1;
			fillRect(tiles, c, r, 2, 2, 4, 3, 0);
			fillRect(tiles, c, r, c - 6, 2, 4, 3, 0);
			fillRect(tiles, c, r, 2, r - 5, 4, 3, 0);
			fillRect(tiles, c, r, c - 6, r - 5, 4, 3, 0);
			doorAt(tiles, c, r, 4, my - 1);
			doorAt(tiles, c, r, c - 5, my - 1);
			doorAt(tiles, c, r, mx, 4);
			doorAt(tiles, c, r, mx, r - 5);
			tiles[idx(c, mx - 3, my - 3)] = 7;
			tiles[idx(c, mx + 2, my - 3)] = 7;
			tiles[idx(c, mx - 3, my + 2)] = 7;
			tiles[idx(c, mx + 2, my + 2)] = 7;
			tiles[idx(c, mx, my)] = 3;
			mapName = name ?? "Dungeon";
			break;
		}
		case "crypt":
			border(tiles, c, r);
			fillRect(tiles, c, r, 2, 2, c - 4, r - 4, 0);
			for (let i = 0; i < 4; i++) fillRect(tiles, c, r, 3 + i * Math.floor((c - 6) / 4), Math.floor(r / 2) - 1, 2, 1, 6);
			for (let y = 3; y < r - 3; y += 3) {
				tiles[idx(c, 3, y)] = 7;
				tiles[idx(c, c - 4, y)] = 7;
			}
			fillRect(tiles, c, r, Math.floor(c / 2) - 2, r - 5, 4, 2, 5);
			doorAt(tiles, c, r, Math.floor(c / 2), 0);
			mapName = name ?? "Crypt";
			break;
		case "cave":
			for (let y = 0; y < r; y++) for (let x = 0; x < c; x++) {
				const nx = (x - c / 2) / (c / 2);
				const ny = (y - r / 2) / (r / 2);
				const noise = Math.sin(x * .7 + y * .4) * .15 + Math.cos(x * .3 - y * .6) * .12;
				const d = nx * nx * .9 + ny * ny * 1.1 + noise;
				if (d > .85) tiles[idx(c, x, y)] = 1;
				else if (d > .55 && rand() < .35) tiles[idx(c, x, y)] = 2;
				else if (rand() < .04) tiles[idx(c, x, y)] = 5;
			}
			fillRect(tiles, c, r, Math.floor(c / 2) - 2, Math.floor(r / 2) - 2, 5, 5, 0);
			mapName = name ?? "Cave";
			break;
		case "forest": {
			for (let y = 0; y < r; y++) for (let x = 0; x < c; x++) {
				const n = rand();
				if (n < .12) tiles[idx(c, x, y)] = 7;
				else if (n < .22) tiles[idx(c, x, y)] = 2;
				else if (n < .26) tiles[idx(c, x, y)] = 6;
				else if (n < .29) tiles[idx(c, x, y)] = 5;
			}
			let sy = Math.floor(r * .4);
			for (let x = 0; x < c; x++) {
				tiles[idx(c, x, sy)] = 5;
				if (rand() < .4) sy = Math.max(1, Math.min(r - 2, sy + (rand() < .5 ? -1 : 1)));
			}
			fillRect(tiles, c, r, Math.floor(c / 2) - 3, Math.floor(r / 2) - 2, 6, 5, 0);
			mapName = name ?? "Forest";
			break;
		}
		case "outdoor": {
			for (let y = 0; y < r; y++) for (let x = 0; x < c; x++) {
				const n = rand();
				if (n < .05) tiles[idx(c, x, y)] = 1;
				else if (n < .14) tiles[idx(c, x, y)] = 2;
				else if (n < .17) tiles[idx(c, x, y)] = 7;
			}
			const roadY = Math.floor(r / 2);
			for (let x = 0; x < c; x++) {
				tiles[idx(c, x, roadY)] = 0;
				tiles[idx(c, x, roadY - 1)] = 0;
				if (rand() < .15) tiles[idx(c, x, roadY + 1)] = 2;
			}
			mapName = name ?? "Wilderness";
			break;
		}
		case "ruins":
			border(tiles, c, r);
			for (let y = 2; y < r - 2; y++) for (let x = 2; x < c - 2; x++) if ((x === 4 || x === c - 5 || y === 4 || y === r - 5) && rand() < .7) tiles[idx(c, x, y)] = 1;
			for (let i = 0; i < 18; i++) {
				const x = 1 + Math.floor(rand() * (c - 2));
				const y = 1 + Math.floor(rand() * (r - 2));
				tiles[idx(c, x, y)] = rand() < .5 ? 2 : 6;
			}
			tiles[idx(c, 5, 5)] = 7;
			tiles[idx(c, c - 6, 5)] = 7;
			tiles[idx(c, 5, r - 6)] = 7;
			tiles[idx(c, c - 6, r - 6)] = 7;
			mapName = name ?? "Ruins";
			break;
		case "arena":
			for (let y = 0; y < r; y++) for (let x = 0; x < c; x++) {
				const nx = (x - c / 2) / (c / 2);
				const ny = (y - r / 2) / (r / 2);
				const d = nx * nx + ny * ny;
				if (d > .92) tiles[idx(c, x, y)] = 1;
				else if (d > .72) tiles[idx(c, x, y)] = 2;
			}
			doorAt(tiles, c, r, Math.floor(c / 2), 0);
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			for (const [px, py] of [
				[4, 4],
				[c - 5, 4],
				[4, r - 5],
				[c - 5, r - 5]
			]) if (inBounds(c, r, px, py)) tiles[idx(c, px, py)] = 7;
			mapName = name ?? "Arena";
			break;
		case "cell": {
			border(tiles, c, r);
			const cellW = Math.floor((c - 4) / 3);
			for (let i = 0; i < 3; i++) {
				const x0 = 1 + i * (cellW + 1);
				fillRect(tiles, c, r, x0, 1, cellW, Math.floor(r / 2) - 1, 0);
				for (let x = x0; x < x0 + cellW; x++) tiles[idx(c, x, Math.floor(r / 2))] = 1;
				doorAt(tiles, c, r, x0 + Math.floor(cellW / 2), Math.floor(r / 2));
			}
			fillRect(tiles, c, r, 1, Math.floor(r / 2) + 1, c - 2, r - Math.floor(r / 2) - 2, 0);
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			mapName = name ?? "Cell block";
			break;
		}
		case "armory":
			border(tiles, c, r);
			fillRect(tiles, c, r, 2, 2, 3, 1, 1);
			fillRect(tiles, c, r, c - 5, 2, 3, 1, 1);
			fillRect(tiles, c, r, 2, r - 3, 3, 1, 1);
			fillRect(tiles, c, r, c - 5, r - 3, 3, 1, 1);
			fillRect(tiles, c, r, Math.floor(c / 2) - 2, Math.floor(r / 2) - 1, 4, 2, 6);
			tiles[idx(c, 4, 4)] = 7;
			tiles[idx(c, c - 5, 4)] = 7;
			tiles[idx(c, 4, r - 5)] = 7;
			tiles[idx(c, c - 5, r - 5)] = 7;
			doorAt(tiles, c, r, Math.floor(c / 2), 0);
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			mapName = name ?? "Armory";
			break;
		case "tavern":
			border(tiles, c, r);
			fillRect(tiles, c, r, 2, 2, c - 4, 1, 6);
			for (let i = 0; i < 3; i++) fillRect(tiles, c, r, 3 + i * 4, 5, 2, 2, 6);
			tiles[idx(c, c - 3, 3)] = 3;
			fillRect(tiles, c, r, c - 4, r - 4, 3, 2, 1);
			doorAt(tiles, c, r, c - 3, r - 4);
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			tiles[idx(c, 3, 8)] = 7;
			tiles[idx(c, c - 4, 8)] = 7;
			mapName = name ?? "Tavern";
			break;
		case "temple":
			border(tiles, c, r);
			for (let y = 2; y < r - 2; y++) {
				tiles[idx(c, Math.floor(c / 2), y)] = 0;
				tiles[idx(c, Math.floor(c / 2) - 1, y)] = 0;
			}
			for (let y = 3; y < r - 5; y += 2) {
				fillRect(tiles, c, r, 2, y, Math.floor(c / 2) - 3, 1, 6);
				fillRect(tiles, c, r, Math.floor(c / 2) + 2, y, Math.floor(c / 2) - 4, 1, 6);
			}
			fillRect(tiles, c, r, Math.floor(c / 2) - 2, 2, 4, 2, 6);
			tiles[idx(c, Math.floor(c / 2), 4)] = 5;
			for (let y = 4; y < r - 3; y += 3) {
				tiles[idx(c, 3, y)] = 7;
				tiles[idx(c, c - 4, y)] = 7;
			}
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			mapName = name ?? "Temple";
			break;
		case "throne":
			border(tiles, c, r);
			fillRect(tiles, c, r, Math.floor(c / 2) - 2, 2, 4, 3, 6);
			tiles[idx(c, Math.floor(c / 2), 2)] = 7;
			for (let y = 6; y < r - 3; y += 3) {
				tiles[idx(c, 3, y)] = 7;
				tiles[idx(c, c - 4, y)] = 7;
			}
			fillRect(tiles, c, r, 1, 8, 2, 3, 0);
			fillRect(tiles, c, r, c - 3, 8, 2, 3, 0);
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			mapName = name ?? "Throne hall";
			break;
		case "market":
			border(tiles, c, r);
			for (let i = 0; i < 6; i++) fillRect(tiles, c, r, 2 + i % 3 * Math.floor((c - 4) / 3), 2 + Math.floor(i / 3) * Math.floor((r - 4) / 2), 3, 2, 6);
			fillRect(tiles, c, r, Math.floor(c / 2) - 1, Math.floor(r / 2) - 1, 3, 3, 5);
			tiles[idx(c, Math.floor(c / 2), Math.floor(r / 2))] = 7;
			for (let i = 0; i < 8; i++) {
				const x = 1 + Math.floor(rand() * (c - 2));
				const y = 1 + Math.floor(rand() * (r - 2));
				if (tiles[idx(c, x, y)] === 0) tiles[idx(c, x, y)] = 2;
			}
			doorAt(tiles, c, r, Math.floor(c / 2), 0);
			doorAt(tiles, c, r, Math.floor(c / 2), r - 1);
			mapName = name ?? "Market square";
			break;
		case "ship":
			for (let y = 0; y < r; y++) for (let x = 0; x < c; x++) {
				const edge = Math.abs(y - r / 2) / (r / 2);
				const bow = x < 3 ? (3 - x) * .15 : 0;
				const stern = x > c - 4 ? (x - (c - 4)) * .1 : 0;
				if (edge > .75 - bow - stern) tiles[idx(c, x, y)] = 1;
			}
			tiles[idx(c, Math.floor(c * .35), Math.floor(r / 2))] = 7;
			tiles[idx(c, Math.floor(c * .65), Math.floor(r / 2))] = 7;
			fillRect(tiles, c, r, Math.floor(c * .45), Math.floor(r / 2) - 1, 3, 2, 6);
			tiles[idx(c, Math.floor(c * .5), Math.floor(r / 2) + 2)] = 3;
			mapName = name ?? "Ship deck";
			break;
		case "bridge": {
			tiles.fill(5);
			const mid = Math.floor(r / 2);
			fillRect(tiles, c, r, 0, mid - 1, c, 3, 0);
			for (let x = 0; x < c; x++) {
				tiles[idx(c, x, mid - 2)] = 1;
				tiles[idx(c, x, mid + 2)] = 1;
			}
			const breakX = Math.floor(c * .55);
			tiles[idx(c, breakX, mid)] = 3;
			tiles[idx(c, breakX + 1, mid)] = 2;
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
		preset
	};
}
function BattleMap({ map, tokens, isDm, selectedId, onSelect, onMove, onPaint, paintMode, dropMode, onDropAt }) {
	const cell = map.cellSize;
	const width = map.cols * cell;
	const height = map.rows * cell;
	const dragging = (0, import_react.useRef)(null);
	const [hover, setHover] = (0, import_react.useState)(null);
	const theme = (0, import_react.useMemo)(() => themeForPreset(map.preset), [map.preset]);
	const uid = (0, import_react.useMemo)(() => `${map.preset}-${map.cols}x${map.rows}-${map.name.replace(/\s+/g, "")}`, [
		map.preset,
		map.cols,
		map.rows,
		map.name
	]);
	const cellFromEvent = (0, import_react.useCallback)((e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const scaleX = width / rect.width;
		const scaleY = height / rect.height;
		const x = Math.floor((e.clientX - rect.left) * scaleX / cell);
		const y = Math.floor((e.clientY - rect.top) * scaleY / cell);
		return {
			x: Math.max(0, Math.min(map.cols - 1, x)),
			y: Math.max(0, Math.min(map.rows - 1, y))
		};
	}, [
		cell,
		width,
		height,
		map.cols,
		map.rows
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "map-stage relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] shadow-[var(--shadow-panel)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-50",
				style: { background: `radial-gradient(ellipse at 25% 15%, color-mix(in oklab, var(--color-steel) 14%, transparent), transparent 50%), radial-gradient(ellipse at 90% 85%, color-mix(in oklab, var(--color-ember) 8%, transparent), transparent 45%)` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative overflow-auto scrollbar-thin",
				style: { background: theme.ambient },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 p-2 sm:p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: `0 0 ${width} ${height}`,
						className: cn("mx-auto block h-auto w-full max-w-full touch-none select-none", dropMode && "cursor-crosshair"),
						style: { maxHeight: "min(64vh, 620px)" },
						onPointerMove: (e) => {
							const c = cellFromEvent(e);
							setHover(c);
							if (paintMode && isDm && e.buttons === 1 && onPaint) onPaint(c.x, c.y);
							if (dragging.current && e.buttons === 1) onMove(dragging.current, c.x, c.y);
						},
						onPointerDown: (e) => {
							const c = cellFromEvent(e);
							if (dropMode && isDm && onDropAt) {
								onDropAt(c.x, c.y);
								return;
							}
							if (paintMode && isDm && onPaint) {
								onPaint(c.x, c.y);
								return;
							}
							const hit = [...tokens].reverse().find((t) => c.x >= t.x && c.y >= t.y && c.x < t.x + t.size && c.y < t.y + t.size);
							if (hit) {
								onSelect(hit.id);
								dragging.current = hit.id;
								e.target.setPointerCapture?.(e.pointerId);
							} else onSelect(null);
						},
						onPointerUp: () => {
							dragging.current = null;
						},
						onPointerLeave: () => setHover(null),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
									id: `${uid}-floor`,
									width: cell * 2,
									height: cell * 2,
									patternUnits: "userSpaceOnUse",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											width: cell * 2,
											height: cell * 2,
											fill: theme.floor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											width: cell,
											height: cell,
											fill: theme.floorAlt,
											opacity: .65
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: cell,
											y: cell,
											width: cell,
											height: cell,
											fill: theme.floorAlt,
											opacity: .65
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: cell * .25,
											cy: cell * .35,
											r: 1.1,
											fill: theme.wallEdge,
											opacity: .22
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: cell * 1.55,
											cy: cell * .7,
											r: .9,
											fill: theme.wallEdge,
											opacity: .18
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: cell * .9,
											cy: cell * 1.4,
											r: 1.3,
											fill: theme.wallEdge,
											opacity: .15
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: cell * 1.7,
											cy: cell * 1.75,
											r: .7,
											fill: theme.wallEdge,
											opacity: .2
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
									id: `${uid}-brick`,
									width: cell,
									height: cell,
									patternUnits: "userSpaceOnUse",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											width: cell,
											height: cell,
											fill: theme.wall
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: `M0 ${cell / 2} H${cell} M${cell / 2} 0 V${cell / 2} M0 ${cell} H${cell}`,
											stroke: theme.wallEdge,
											strokeWidth: 1,
											opacity: .55
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: 1,
											y: 1,
											width: cell / 2 - 2,
											height: cell / 2 - 2,
											fill: "white",
											opacity: .04
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
									id: `${uid}-diff`,
									width: 8,
									height: 8,
									patternUnits: "userSpaceOnUse",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M0 8 L8 0",
										stroke: theme.difficult,
										strokeWidth: 1.4,
										opacity: .9
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
									id: `${uid}-water`,
									width: cell,
									height: cell,
									patternUnits: "userSpaceOnUse",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											width: cell,
											height: cell,
											fill: theme.water
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: `M2 ${cell * .35} Q ${cell * .35} ${cell * .2}, ${cell * .7} ${cell * .38} T ${cell - 2} ${cell * .4}`,
											fill: "none",
											stroke: "white",
											strokeOpacity: .22,
											strokeWidth: 1.3
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: `M4 ${cell * .65} Q ${cell * .4} ${cell * .52}, ${cell * .75} ${cell * .68} T ${cell - 3} ${cell * .7}`,
											fill: "none",
											stroke: "white",
											strokeOpacity: .12,
											strokeWidth: 1
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
									id: `${uid}-wood`,
									width: cell,
									height: cell,
									patternUnits: "userSpaceOnUse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										width: cell,
										height: cell,
										fill: theme.cover
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M3 4 Q ${cell / 2} 8, ${cell - 3} 5 M4 ${cell / 2} Q ${cell / 2} ${cell / 2 + 4}, ${cell - 4} ${cell / 2} M5 ${cell - 6} Q ${cell / 2} ${cell - 3}, ${cell - 5} ${cell - 7}`,
										fill: "none",
										stroke: theme.wallEdge,
										strokeWidth: 1,
										opacity: .45
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
									id: `${uid}-depth`,
									x: "-20%",
									y: "-20%",
									width: "140%",
									height: "140%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
										dx: "0",
										dy: "1.2",
										stdDeviation: "1",
										floodOpacity: "0.5"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
									id: `${uid}-soft`,
									x: "-30%",
									y: "-30%",
									width: "160%",
									height: "160%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
										dx: "0.5",
										dy: "1.5",
										stdDeviation: "1.4",
										floodOpacity: "0.4"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
									id: `${uid}-shine`,
									cx: "32%",
									cy: "28%",
									r: "70%",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "white",
											stopOpacity: "0.4"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "50%",
											stopColor: "white",
											stopOpacity: "0.05"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "white",
											stopOpacity: "0"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: `${uid}-wall-top`,
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "white",
										stopOpacity: "0.12"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "black",
										stopOpacity: "0.2"
									})]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								width,
								height,
								fill: `url(#${uid}-floor)`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								width,
								height,
								fill: "none",
								stroke: "black",
								strokeWidth: cell * .35,
								opacity: .12
							}),
							map.tiles.map((tile, i) => {
								if (!tile) return null;
								const x = i % map.cols;
								const y = Math.floor(i / map.cols);
								const px = x * cell;
								const py = y * cell;
								if (tile === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									filter: `url(#${uid}-depth)`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: px,
											y: py,
											width: cell,
											height: cell,
											fill: `url(#${uid}-brick)`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: px,
											y: py,
											width: cell,
											height: cell,
											fill: `url(#${uid}-wall-top)`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: px,
											y: py,
											width: cell,
											height: 2,
											fill: theme.wallEdge,
											opacity: .5
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: px,
											y: py + cell - 2,
											width: cell,
											height: 2,
											fill: "black",
											opacity: .28
										})
									]
								}, i);
								if (tile === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: px,
									y: py,
									width: cell,
									height: cell,
									fill: theme.difficult,
									opacity: .35
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: px,
									y: py,
									width: cell,
									height: cell,
									fill: `url(#${uid}-diff)`
								})] }, i);
								if (tile === 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: px,
										y: py,
										width: cell,
										height: cell,
										fill: theme.hazard,
										opacity: .85
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M${px + cell * .5} ${py + 6} L${px + cell - 7} ${py + cell - 7} L${px + 7} ${py + cell - 7} Z`,
										fill: "none",
										stroke: "var(--color-warn)",
										strokeWidth: 1.5,
										opacity: .85
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: px + cell / 2,
										y: py + cell * .62,
										textAnchor: "middle",
										fill: "var(--color-warn)",
										fontSize: cell * .32,
										fontWeight: 700,
										style: { fontFamily: "var(--font-body)" },
										children: "!"
									})
								] }, i);
								if (tile === 4) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									filter: `url(#${uid}-soft)`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: px + 3,
											y: py + 3,
											width: cell - 6,
											height: cell - 6,
											rx: 3,
											fill: theme.door
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: px + 5,
											y: py + 5,
											width: cell - 10,
											height: cell - 10,
											rx: 2,
											fill: "none",
											stroke: theme.wallEdge,
											strokeWidth: 1,
											opacity: .6
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: px + cell * .68,
											cy: py + cell * .5,
											r: 2.2,
											fill: theme.floorAlt
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: px + cell * .5,
											y1: py + 6,
											x2: px + cell * .5,
											y2: py + cell - 6,
											stroke: theme.wallEdge,
											strokeWidth: 1,
											opacity: .4
										})
									]
								}, i);
								if (tile === 5) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: px,
									y: py,
									width: cell,
									height: cell,
									fill: `url(#${uid}-water)`
								}, i);
								if (tile === 6) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									filter: `url(#${uid}-soft)`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: px + 3,
										y: py + 4,
										width: cell - 6,
										height: cell - 8,
										rx: 2,
										fill: `url(#${uid}-wood)`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: px + 3,
										y: py + 4,
										width: cell - 6,
										height: 3,
										fill: "white",
										opacity: .08
									})]
								}, i);
								if (tile === 7) {
									const cx = px + cell / 2;
									const cy = py + cell / 2;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
										filter: `url(#${uid}-depth)`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
												cx: cx + 1,
												cy: cy + cell * .22,
												rx: cell * .28,
												ry: cell * .1,
												fill: "black",
												opacity: .3
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx,
												cy,
												r: cell * .3,
												fill: theme.pillar
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx,
												cy,
												r: cell * .3,
												fill: "none",
												stroke: theme.wallEdge,
												strokeWidth: 2
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx,
												cy,
												r: cell * .16,
												fill: theme.wallEdge,
												opacity: .35
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: cx - 3,
												cy: cy - 3,
												r: cell * .08,
												fill: "white",
												opacity: .15
											})
										]
									}, i);
								}
								return null;
							}),
							map.tiles.map((tile, i) => {
								if (tile !== 1) return null;
								const x = i % map.cols;
								const y = Math.floor(i / map.cols);
								return [
									[x + 1, y],
									[x - 1, y],
									[x, y + 1],
									[x, y - 1]
								].map(([nx, ny], ni) => {
									if (nx < 0 || ny < 0 || nx >= map.cols || ny >= map.rows) return null;
									if (map.tiles[ny * map.cols + nx] === 1) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: nx * cell,
										y: ny * cell,
										width: cell,
										height: cell,
										fill: "black",
										opacity: .08,
										pointerEvents: "none"
									}, `sh-${i}-${ni}`);
								});
							}),
							Array.from({ length: map.cols + 1 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: i * cell,
								y1: 0,
								x2: i * cell,
								y2: height,
								stroke: theme.grid,
								strokeWidth: i % 5 === 0 ? 1.4 : 1,
								opacity: i % 5 === 0 ? 1 : .75
							}, `v${i}`)),
							Array.from({ length: map.rows + 1 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: 0,
								y1: i * cell,
								x2: width,
								y2: i * cell,
								stroke: theme.grid,
								strokeWidth: i % 5 === 0 ? 1.4 : 1,
								opacity: i % 5 === 0 ? 1 : .75
							}, `h${i}`)),
							Array.from({ length: Math.ceil(map.cols / 5) }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: i * 5 * cell + 3,
								y: 10,
								fill: theme.grid,
								fontSize: 9,
								opacity: .7,
								style: { fontFamily: "var(--font-mono)" },
								children: i * 5
							}, `cx${i}`)),
							hover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: hover.x * cell,
								y: hover.y * cell,
								width: cell,
								height: cell,
								fill: dropMode ? "color-mix(in oklab, var(--color-danger) 28%, transparent)" : "color-mix(in oklab, var(--color-steel) 22%, transparent)",
								stroke: dropMode ? "color-mix(in oklab, var(--color-danger) 55%, transparent)" : "color-mix(in oklab, var(--color-steel) 50%, transparent)",
								strokeWidth: 1.5,
								pointerEvents: "none"
							}),
							tokens.map((t) => {
								const cx = t.x * cell + t.size * cell / 2;
								const cy = t.y * cell + t.size * cell / 2;
								const r = t.size * cell / 2 - 3;
								const selected = selectedId === t.id;
								const isPc = t.kind === "pc";
								const ring = selected ? "var(--color-accent)" : isPc ? "color-mix(in oklab, var(--color-steel) 70%, white)" : t.kind === "npc" ? "var(--color-rune)" : "var(--color-bg)";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									className: cn(t.hidden && isDm && "opacity-40"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
											cx: cx + 1,
											cy: cy + r * .62,
											rx: r * .78,
											ry: r * .3,
											fill: "black",
											opacity: .32
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx,
											cy,
											r: r + 2,
											fill: "none",
											stroke: ring,
											strokeWidth: selected ? 2.5 : 1.5,
											opacity: selected ? 1 : .75
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx,
											cy,
											r,
											fill: t.color,
											stroke: "var(--color-bg)",
											strokeWidth: 2,
											className: "cursor-grab active:cursor-grabbing"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx,
											cy,
											r,
											fill: `url(#${uid}-shine)`,
											className: "pointer-events-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx,
											cy,
											r: r - 3,
											fill: "none",
											stroke: "white",
											strokeOpacity: .12,
											strokeWidth: 1,
											className: "pointer-events-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
											x: cx,
											y: cy + 1,
											textAnchor: "middle",
											dominantBaseline: "middle",
											fill: "var(--color-accent-fg)",
											fontSize: Math.max(10, cell * .26 * Math.min(t.size, 2)),
											fontWeight: 700,
											className: "pointer-events-none",
											style: { fontFamily: "var(--font-body)" },
											children: t.label.slice(0, t.size >= 2 ? 4 : 3)
										}),
										typeof t.hp === "number" && typeof t.maxHp === "number" && t.maxHp > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											className: "pointer-events-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: t.x * cell + 4,
												y: t.y * cell + t.size * cell - 9,
												width: t.size * cell - 8,
												height: 5,
												rx: 2,
												fill: "var(--color-bg)",
												opacity: .8
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: t.x * cell + 4,
												y: t.y * cell + t.size * cell - 9,
												width: Math.max(0, (t.size * cell - 8) * Math.min(1, t.hp / t.maxHp)),
												height: 5,
												rx: 2,
												fill: t.hp / t.maxHp <= .3 ? "var(--color-danger)" : t.hp / t.maxHp <= .6 ? "var(--color-warn)" : "var(--color-success)"
											})]
										}),
										!!t.conditions?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: cx + r * .65,
											cy: cy - r * .65,
											r: 4,
											fill: "var(--color-warn)",
											stroke: "var(--color-bg)",
											strokeWidth: 1,
											className: "pointer-events-none"
										}),
										t.hidden && isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
											x: cx,
											y: cy - r - 4,
											textAnchor: "middle",
											fill: "var(--color-fg-subtle)",
											fontSize: 8,
											className: "pointer-events-none",
											children: "hidden"
										})
									]
								}, t.id);
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg-elevated)_94%,transparent)] px-3 py-2 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-display text-sm font-semibold tracking-tight",
							children: map.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
							children: map.preset
						}),
						dropMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] px-2 py-0.5 text-[10px] text-[var(--color-danger)]",
							children: "Click map to place"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-fg-subtle)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								map.cols,
								"×",
								map.rows,
								hover ? ` · ${hover.x},${hover.y}` : "",
								` · ${tokens.length} tokens`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden opacity-40 sm:inline",
							children: "|"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden flex-wrap gap-1.5 sm:flex",
							children: [
								1,
								2,
								3,
								4,
								5,
								6,
								7
							].map((tile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block size-2.5 rounded-[2px] border border-[var(--color-border)]",
									style: { background: tile === 1 ? theme.wall : tile === 2 ? theme.difficult : tile === 3 ? theme.hazard : tile === 4 ? theme.door : tile === 5 ? theme.water : tile === 6 ? theme.cover : theme.pillar }
								}), TILE_LABELS[tile]]
							}, tile))
						})
					]
				})]
			})
		]
	});
}
var BESTIARY = [
	{
		id: "guard",
		category: "minion",
		template: {
			name: "Guard",
			cr: "1/8",
			ac: 16,
			hp: 11,
			maxHp: 11,
			speed: "30 ft.",
			abilities: {
				str: 13,
				dex: 12,
				con: 12,
				int: 10,
				wis: 11,
				cha: 10
			},
			attacks: [{
				name: "Spear",
				bonus: 3,
				damage: "1d6+1"
			}],
			traits: "Pack tactics optional",
			notes: "",
			tokenColor: "#7a8a9a"
		}
	},
	{
		id: "bandit",
		category: "skirmisher",
		template: {
			name: "Bandit",
			cr: "1/8",
			ac: 12,
			hp: 11,
			maxHp: 11,
			speed: "30 ft.",
			abilities: {
				str: 11,
				dex: 12,
				con: 12,
				int: 10,
				wis: 10,
				cha: 10
			},
			attacks: [{
				name: "Scimitar",
				bonus: 3,
				damage: "1d6+1"
			}, {
				name: "Light crossbow",
				bonus: 3,
				damage: "1d8+1"
			}],
			traits: "",
			notes: "",
			tokenColor: "#8a6a48"
		}
	},
	{
		id: "goblin",
		category: "skirmisher",
		template: {
			name: "Goblin",
			cr: "1/4",
			ac: 15,
			hp: 7,
			maxHp: 7,
			speed: "30 ft.",
			abilities: {
				str: 8,
				dex: 14,
				con: 10,
				int: 10,
				wis: 8,
				cha: 8
			},
			attacks: [{
				name: "Scimitar",
				bonus: 4,
				damage: "1d6+2"
			}, {
				name: "Shortbow",
				bonus: 4,
				damage: "1d6+2"
			}],
			traits: "Nimble Escape: Disengage or Hide as bonus action",
			notes: "",
			tokenColor: "#5a8a4a"
		}
	},
	{
		id: "wolf",
		category: "skirmisher",
		template: {
			name: "Wolf",
			cr: "1/4",
			ac: 13,
			hp: 11,
			maxHp: 11,
			speed: "40 ft.",
			abilities: {
				str: 12,
				dex: 15,
				con: 12,
				int: 3,
				wis: 12,
				cha: 6
			},
			attacks: [{
				name: "Bite",
				bonus: 4,
				damage: "2d4+2",
				notes: "DC 11 Str or prone"
			}],
			traits: "Pack Tactics",
			notes: "",
			tokenColor: "#8a8a9a"
		}
	},
	{
		id: "skeleton",
		category: "minion",
		template: {
			name: "Skeleton",
			cr: "1/4",
			ac: 13,
			hp: 13,
			maxHp: 13,
			speed: "30 ft.",
			abilities: {
				str: 10,
				dex: 14,
				con: 15,
				int: 6,
				wis: 8,
				cha: 5
			},
			attacks: [{
				name: "Shortsword",
				bonus: 4,
				damage: "1d6+2"
			}, {
				name: "Shortbow",
				bonus: 4,
				damage: "1d6+2"
			}],
			traits: "Vulnerable bludgeoning; immune poison/exhaustion",
			notes: "",
			tokenColor: "#c8c0b0"
		}
	},
	{
		id: "zombie",
		category: "brute",
		template: {
			name: "Zombie",
			cr: "1/4",
			ac: 8,
			hp: 22,
			maxHp: 22,
			speed: "20 ft.",
			abilities: {
				str: 13,
				dex: 6,
				con: 16,
				int: 3,
				wis: 6,
				cha: 5
			},
			attacks: [{
				name: "Slam",
				bonus: 3,
				damage: "1d6+1"
			}],
			traits: "Undead Fortitude (DC 5+damage Con save)",
			notes: "",
			tokenColor: "#5a6a48"
		}
	},
	{
		id: "orc",
		category: "brute",
		template: {
			name: "Orc",
			cr: "1/2",
			ac: 13,
			hp: 15,
			maxHp: 15,
			speed: "30 ft.",
			abilities: {
				str: 16,
				dex: 12,
				con: 16,
				int: 7,
				wis: 11,
				cha: 10
			},
			attacks: [{
				name: "Greataxe",
				bonus: 5,
				damage: "1d12+3"
			}, {
				name: "Javelin",
				bonus: 5,
				damage: "1d6+3"
			}],
			traits: "Aggressive: bonus move toward enemy",
			notes: "",
			tokenColor: "#6a8a48"
		}
	},
	{
		id: "ogre",
		category: "brute",
		template: {
			name: "Ogre",
			cr: "2",
			ac: 11,
			hp: 59,
			maxHp: 59,
			speed: "40 ft.",
			abilities: {
				str: 19,
				dex: 8,
				con: 16,
				int: 5,
				wis: 7,
				cha: 7
			},
			attacks: [{
				name: "Greatclub",
				bonus: 6,
				damage: "2d8+4"
			}, {
				name: "Javelin",
				bonus: 6,
				damage: "2d6+4"
			}],
			traits: "Large",
			notes: "",
			tokenColor: "#8a5a48"
		}
	},
	{
		id: "hobgoblin",
		category: "elite",
		template: {
			name: "Hobgoblin",
			cr: "1/2",
			ac: 18,
			hp: 11,
			maxHp: 11,
			speed: "30 ft.",
			abilities: {
				str: 13,
				dex: 12,
				con: 12,
				int: 10,
				wis: 10,
				cha: 9
			},
			attacks: [{
				name: "Longsword",
				bonus: 3,
				damage: "1d8+1"
			}, {
				name: "Longbow",
				bonus: 3,
				damage: "1d8+1"
			}],
			traits: "Martial Advantage: +2d6 once/turn with ally adjacent",
			notes: "",
			tokenColor: "#b45448"
		}
	},
	{
		id: "cultist",
		category: "minion",
		template: {
			name: "Cultist",
			cr: "1/8",
			ac: 12,
			hp: 9,
			maxHp: 9,
			speed: "30 ft.",
			abilities: {
				str: 11,
				dex: 12,
				con: 10,
				int: 10,
				wis: 11,
				cha: 10
			},
			attacks: [{
				name: "Scimitar",
				bonus: 3,
				damage: "1d6+1"
			}],
			traits: "Dark Devotion: advantage vs charm/frighten",
			notes: "",
			tokenColor: "#6a4a8a"
		}
	},
	{
		id: "acolyte",
		category: "npc",
		template: {
			name: "Acolyte",
			cr: "1/4",
			ac: 10,
			hp: 9,
			maxHp: 9,
			speed: "30 ft.",
			abilities: {
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 14,
				cha: 11
			},
			attacks: [{
				name: "Club",
				bonus: 2,
				damage: "1d4"
			}],
			traits: "Spellcasting (Wis): Sacred Flame, Bless, Cure Wounds, Sanctuary",
			notes: "Friendly or hostile NPC",
			tokenColor: "#8a9aad"
		}
	},
	{
		id: "spy",
		category: "skirmisher",
		template: {
			name: "Spy",
			cr: "1",
			ac: 12,
			hp: 27,
			maxHp: 27,
			speed: "30 ft.",
			abilities: {
				str: 10,
				dex: 15,
				con: 10,
				int: 12,
				wis: 14,
				cha: 16
			},
			attacks: [{
				name: "Shortsword",
				bonus: 4,
				damage: "1d6+2"
			}, {
				name: "Hand crossbow",
				bonus: 4,
				damage: "1d6+2"
			}],
			traits: "Cunning Action; Sneak Attack 2d6",
			notes: "",
			tokenColor: "#4a5a6a"
		}
	},
	{
		id: "veteran",
		category: "elite",
		template: {
			name: "Veteran",
			cr: "3",
			ac: 17,
			hp: 58,
			maxHp: 58,
			speed: "30 ft.",
			abilities: {
				str: 16,
				dex: 13,
				con: 14,
				int: 10,
				wis: 11,
				cha: 10
			},
			attacks: [
				{
					name: "Longsword",
					bonus: 5,
					damage: "1d8+3"
				},
				{
					name: "Shortsword",
					bonus: 5,
					damage: "1d6+3"
				},
				{
					name: "Heavy crossbow",
					bonus: 3,
					damage: "1d10+1"
				}
			],
			traits: "Multiattack: two longsword",
			notes: "",
			tokenColor: "#6a7a8a"
		}
	},
	{
		id: "mage",
		category: "elite",
		template: {
			name: "Mage",
			cr: "6",
			ac: 12,
			hp: 40,
			maxHp: 40,
			speed: "30 ft.",
			abilities: {
				str: 9,
				dex: 14,
				con: 11,
				int: 17,
				wis: 12,
				cha: 11
			},
			attacks: [{
				name: "Dagger",
				bonus: 5,
				damage: "1d4+2"
			}],
			traits: "Spellcasting (Int): Fire Bolt, Mage Armor, Fireball, Counterspell, Fly…",
			notes: "",
			tokenColor: "#5a7aaa"
		}
	},
	{
		id: "knight",
		category: "elite",
		template: {
			name: "Knight",
			cr: "3",
			ac: 18,
			hp: 52,
			maxHp: 52,
			speed: "30 ft.",
			abilities: {
				str: 16,
				dex: 11,
				con: 14,
				int: 11,
				wis: 11,
				cha: 15
			},
			attacks: [{
				name: "Greatsword",
				bonus: 5,
				damage: "2d6+3"
			}, {
				name: "Heavy crossbow",
				bonus: 2,
				damage: "1d10"
			}],
			traits: "Brave; Leadership",
			notes: "",
			tokenColor: "#9a8a5a"
		}
	},
	{
		id: "gladiator",
		category: "boss",
		template: {
			name: "Gladiator",
			cr: "5",
			ac: 16,
			hp: 112,
			maxHp: 112,
			speed: "30 ft.",
			abilities: {
				str: 18,
				dex: 15,
				con: 16,
				int: 10,
				wis: 12,
				cha: 15
			},
			attacks: [{
				name: "Spear",
				bonus: 7,
				damage: "2d6+4"
			}, {
				name: "Shield bash",
				bonus: 7,
				damage: "2d4+4",
				notes: "DC 15 Str or prone"
			}],
			traits: "Multiattack; Brave; Parry",
			notes: "Arena boss",
			tokenColor: "#b45448"
		}
	},
	{
		id: "basic-npc",
		category: "npc",
		template: {
			name: "Commoner",
			cr: "0",
			ac: 10,
			hp: 4,
			maxHp: 4,
			speed: "30 ft.",
			abilities: {
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10
			},
			attacks: [{
				name: "Club",
				bonus: 2,
				damage: "1d4"
			}],
			traits: "",
			notes: "Civilian / quest giver",
			tokenColor: "#8a9aad"
		}
	},
	{
		id: "custom",
		category: "npc",
		template: {
			name: "Custom foe",
			cr: "1",
			ac: 13,
			hp: 20,
			maxHp: 20,
			speed: "30 ft.",
			abilities: {
				str: 14,
				dex: 12,
				con: 14,
				int: 10,
				wis: 10,
				cha: 10
			},
			attacks: [{
				name: "Attack",
				bonus: 4,
				damage: "1d8+2"
			}],
			traits: "",
			notes: "Edit after drop",
			tokenColor: "#b45448"
		}
	}
];
function makeBestiaryNpc(entry) {
	return emptyNpc({ ...entry.template });
}
function EncounterPalette({ customNpcs, pending, onPick, onClear, onAddCustom, onDropCenter }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		let list = BESTIARY;
		if (cat !== "all" && cat !== "yours") list = list.filter((b) => b.category === cat);
		if (query) list = list.filter((b) => b.template.name.toLowerCase().includes(query));
		return list;
	}, [q, cat]);
	const customFiltered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return customNpcs.filter((n) => !query || n.name.toLowerCase().includes(query));
	}, [customNpcs, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3 shadow-[var(--shadow-inset)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4 text-[var(--color-steel)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-semibold tracking-wide uppercase",
						children: "Encounter drop"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: onAddCustom,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Custom"]
					}), pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: onClear,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Cancel"]
					})]
				})]
			}),
			pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center gap-2 rounded-[var(--radius-sm)] border border-[color-mix(in_oklab,var(--color-danger)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_10%,var(--color-bg))] px-3 py-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "size-4 shrink-0 text-[var(--color-danger)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex-1",
						children: [
							"Placing ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pending.name }),
							" — click the map"
						]
					}),
					onDropCenter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "steel",
						onClick: onDropCenter,
						children: "Drop center"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-[var(--color-fg-subtle)]",
				children: "Pick a foe or NPC, then click the map to drop them. Edit stats after placing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex flex-wrap gap-1.5",
				children: [
					["all", "All"],
					["yours", "Yours"],
					["minion", "Minions"],
					["skirmisher", "Skirmish"],
					["brute", "Brutes"],
					["elite", "Elites"],
					["boss", "Bosses"],
					["npc", "NPCs"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: cat === id ? "steel" : "ghost",
					onClick: () => setCat(id),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search monsters…",
				className: "mb-2 h-8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid max-h-52 gap-1.5 overflow-y-auto scrollbar-thin sm:grid-cols-2",
				children: [cat !== "yours" && filtered.map((entry) => {
					const active = pending?.name === entry.template.name && pending?.cr === entry.template.cr;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onPick(makeBestiaryNpc(entry)),
						className: cn("flex items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2 text-left transition-colors", active ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_14%,var(--color-bg))]" : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-strong)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[var(--color-accent-fg)]",
							style: { background: entry.template.tokenColor },
							children: entry.template.name.slice(0, 2).toUpperCase()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-medium",
								children: entry.template.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[11px] text-[var(--color-fg-subtle)]",
								children: [
									"CR ",
									entry.template.cr,
									" · AC ",
									entry.template.ac,
									" · HP ",
									entry.template.hp
								]
							})]
						})]
					}, entry.id);
				}), (cat === "all" || cat === "yours") && customFiltered.map((npc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(npc),
					className: cn("flex items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2 text-left transition-colors", pending?.id === npc.id ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_14%,var(--color-bg))]" : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-border-strong)]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[var(--color-accent-fg)]",
						style: { background: npc.tokenColor },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm font-medium",
							children: npc.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-[11px] text-[var(--color-fg-subtle)]",
							children: [
								"Your roster · CR ",
								npc.cr,
								" · HP ",
								npc.hp
							]
						})]
					})]
				}, npc.id))]
			}),
			cat === "yours" && customFiltered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-[var(--color-fg-subtle)]",
				children: "No custom NPCs yet — add one in Tools, or hit Custom above."
			})
		]
	});
}
function TokenInspector({ token, isDm, onChange, onDuplicate, onDelete, onRoll }) {
	const name = token.name || token.label;
	const conditions = token.conditions ?? [];
	if (!isDm && token.kind !== "pc") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-full text-xs font-bold text-[var(--color-accent-fg)]",
					style: { background: token.color },
					children: token.label.slice(0, 3)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display font-semibold",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[var(--color-fg-subtle)] capitalize",
					children: token.kind
				})] })]
			}),
			typeof token.hp === "number" && typeof token.maxHp === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm tabular-nums text-[var(--color-fg-muted)]",
				children: [
					"HP ",
					token.hp,
					"/",
					token.maxHp,
					token.ac != null ? ` · AC ${token.ac}` : ""
				]
			}),
			conditions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-[var(--color-warn)]",
				children: conditions.join(", ")
			})
		]
	});
	if (!isDm) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3 shadow-[var(--shadow-inset)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-full text-xs font-bold text-[var(--color-accent-fg)] ring-2 ring-[var(--color-border-strong)]",
						style: { background: token.color },
						children: token.label.slice(0, 3)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
						children: "Selected token"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-base font-semibold leading-tight",
						children: name
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => onChange({
								...token,
								hidden: !token.hidden
							}),
							children: [token.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-3.5" }), token.hidden ? "Reveal" : "Hide"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							onClick: onDuplicate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: onDelete,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => {
								const n = e.target.value;
								onChange({
									...token,
									name: n,
									label: n.slice(0, 3).toUpperCase() || token.label
								});
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "Kind",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: token.kind,
							onChange: (e) => onChange({
								...token,
								kind: e.target.value
							}),
							className: "flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "monster",
									children: "Monster"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "npc",
									children: "NPC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "pc",
									children: "PC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "object",
									children: "Object"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "Label (map)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: token.label,
							maxLength: 4,
							onChange: (e) => onChange({
								...token,
								label: e.target.value.toUpperCase()
							}),
							className: "font-mono"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "Color",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: token.color,
								onChange: (e) => onChange({
									...token,
									color: e.target.value
								}),
								className: "h-10 w-12 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: token.color,
								onChange: (e) => onChange({
									...token,
									color: e.target.value
								}),
								className: "font-mono text-xs"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "Size",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: [
								1,
								2,
								3,
								4
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: token.size === s ? "steel" : "secondary",
								onClick: () => onChange({
									...token,
									size: s
								}),
								children: s === 1 ? "M" : s === 2 ? "L" : s === 3 ? "H" : "G"
							}, s))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "CR",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: token.cr ?? "",
							onChange: (e) => onChange({
								...token,
								cr: e.target.value
							}),
							placeholder: "—"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "HP",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: token.hp ?? 0,
									onChange: (e) => onChange({
										...token,
										hp: Number(e.target.value) || 0
									}),
									className: "tabular-nums"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex items-center text-xs text-[var(--color-fg-subtle)]",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: token.maxHp ?? 0,
									onChange: (e) => onChange({
										...token,
										maxHp: Number(e.target.value) || 0
									}),
									className: "tabular-nums"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "AC",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: token.ac ?? 10,
							onChange: (e) => onChange({
								...token,
								ac: Number(e.target.value) || 0
							}),
							className: "tabular-nums"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "Position",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: token.x,
								onChange: (e) => onChange({
									...token,
									x: Number(e.target.value) || 0
								}),
								className: "tabular-nums"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: token.y,
								onChange: (e) => onChange({
									...token,
									y: Number(e.target.value) || 0
								}),
								className: "tabular-nums"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
						label: "Speed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: token.speed ?? "",
							onChange: (e) => onChange({
								...token,
								speed: e.target.value
							}),
							placeholder: "30 ft."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1.5",
				children: [
					-10,
					-5,
					-1,
					1,
					5,
					10
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					className: cn("tabular-nums", n < 0 && "text-[var(--color-danger)]"),
					onClick: () => {
						const hp = Math.max(0, (token.hp ?? 0) + n);
						onChange({
							...token,
							hp
						});
					},
					children: n > 0 ? `+${n}` : n
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
						children: "Attacks"
					}),
					(token.attacks ?? []).map((atk, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: atk.name,
								onChange: (e) => {
									const attacks = [...token.attacks ?? []];
									attacks[i] = {
										...atk,
										name: e.target.value
									};
									onChange({
										...token,
										attacks
									});
								},
								className: "h-8 min-w-[6rem] flex-1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "steel",
								onClick: () => onRoll(`1d20${atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}`, `${name} ${atk.name}`),
								children: ["+", atk.bonus]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => onRoll(atk.damage, `${name} dmg`),
								children: atk.damage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon-sm",
								variant: "ghost",
								onClick: () => onChange({
									...token,
									attacks: (token.attacks ?? []).filter((_, j) => j !== i)
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => onChange({
							...token,
							attacks: [...token.attacks ?? [], {
								name: "Attack",
								bonus: 4,
								damage: "1d8+2"
							}]
						}),
						children: "Add attack"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
					children: "Conditions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: CONDITIONS_5E.map((c) => {
						const on = conditions.includes(c);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange({
								...token,
								conditions: on ? conditions.filter((x) => x !== c) : [...conditions, c]
							}),
							className: cn("rounded-full border px-2 py-0.5 text-[11px] transition-colors", on ? "border-[var(--color-warn)] bg-[color-mix(in_oklab,var(--color-warn)_18%,transparent)] text-[var(--color-warn)]" : "border-[var(--color-border)] text-[var(--color-fg-subtle)] hover:border-[var(--color-border-strong)]"),
							children: c
						}, c);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$3, {
				label: "Notes / traits",
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: token.notes ?? "",
					onChange: (e) => onChange({
						...token,
						notes: e.target.value
					}),
					className: "min-h-[64px] text-sm",
					placeholder: "Traits, legendary actions, roleplay notes…"
				})
			})
		]
	});
}
function Field$3({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("grid gap-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
			children: label
		}), children]
	});
}
var ABILITIES = [
	{
		key: "str",
		label: "STR"
	},
	{
		key: "dex",
		label: "DEX"
	},
	{
		key: "con",
		label: "CON"
	},
	{
		key: "int",
		label: "INT"
	},
	{
		key: "wis",
		label: "WIS"
	},
	{
		key: "cha",
		label: "CHA"
	}
];
function CharacterSheetPanel({ sheet, editable, onChange, onRoll, compact }) {
	function patch(p) {
		onChange({
			...sheet,
			...p
		});
	}
	function setAbility(key, value) {
		patch({ abilities: {
			...sheet.abilities,
			[key]: value
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-3", compact && "gap-2"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: sheet.name,
							disabled: !editable,
							onChange: (e) => patch({ name: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
						label: "Player",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: sheet.playerName,
							disabled: !editable,
							onChange: (e) => patch({ playerName: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
						label: "Class",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: sheet.className,
							disabled: !editable,
							onChange: (e) => patch({ className: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
						label: "Race",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: sheet.race,
							disabled: !editable,
							onChange: (e) => patch({ race: e.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2 sm:grid-cols-6",
				children: ABILITIES.map((a) => {
					const score = sheet.abilities[a.key];
					const mod = abilityMod(score);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)]",
								children: a.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !onRoll,
								onClick: () => onRoll?.(`1d20${mod >= 0 ? `+${mod}` : mod}`, a.label),
								className: "font-display text-lg font-semibold tabular-nums text-[var(--color-fg)] disabled:cursor-default",
								children: mod >= 0 ? `+${mod}` : mod
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: score,
								disabled: !editable,
								onChange: (e) => setAbility(a.key, Number(e.target.value) || 0),
								className: "mt-1 h-7 w-full px-1 text-center text-xs tabular-nums"
							})
						]
					}, a.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "HP",
						value: `${sheet.currentHp}/${sheet.maxHp}`,
						editable,
						onEdit: (v) => {
							const [cur, max] = v.split("/").map((n) => Number(n.trim()));
							if (!Number.isNaN(cur)) patch({ currentHp: cur });
							if (max !== void 0 && !Number.isNaN(max)) patch({ maxHp: max });
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "AC",
						value: String(sheet.ac),
						editable,
						onEdit: (v) => patch({ ac: Number(v) || 0 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Speed",
						value: String(sheet.speed),
						editable,
						onEdit: (v) => patch({ speed: Number(v) || 0 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Prof",
						value: `+${sheet.proficiencyBonus}`,
						editable,
						onEdit: (v) => patch({ proficiencyBonus: Number(v.replace("+", "")) || 0 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-wide text-[var(--color-fg-subtle)] uppercase",
						children: "Attacks"
					}), editable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => patch({ attacks: [...sheet.attacks, {
							name: "Attack",
							bonus: 0,
							damage: "1d6"
						}] }),
						children: "Add"
					})]
				}), sheet.attacks.map((atk, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: atk.name,
							disabled: !editable,
							onChange: (e) => {
								const attacks = sheet.attacks.slice();
								attacks[i] = {
									...atk,
									name: e.target.value
								};
								patch({ attacks });
							},
							className: "h-8 min-w-[6rem] flex-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "tabular-nums",
							children: atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-[var(--color-fg-muted)]",
							children: atk.damage
						}),
						onRoll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							onClick: () => onRoll(`1d20${atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}`, `${atk.name} attack`),
							children: "Attack"
						}),
						onRoll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => onRoll(atk.damage, `${atk.name} damage`),
							children: "Dmg"
						})
					]
				}, i))]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
				label: "Features",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: sheet.features,
					disabled: !editable,
					onChange: (e) => patch({ features: e.target.value }),
					className: "min-h-[64px]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
							children: "Inventory & rewards"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
									children: "Gold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: sheet.gold ?? 0,
									disabled: !editable,
									onChange: (e) => patch({ gold: Number(e.target.value) || 0 }),
									className: "h-8 w-24 tabular-nums"
								}),
								sheet.xp != null && sheet.xp > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs tabular-nums text-[var(--color-fg-muted)]",
									children: ["XP ", sheet.xp]
								})
							]
						})]
					}),
					(sheet.items?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]",
						children: "No structured items yet. Rewards from the DM appear here with full details."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2",
						children: (sheet.items ?? []).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemCard, {
							item: it,
							editable,
							onChange: (next) => patch({ items: (sheet.items ?? []).map((x) => x.id === next.id ? next : x) }),
							onRemove: () => patch({ items: (sheet.items ?? []).filter((x) => x.id !== it.id) }),
							onRoll
						}, it.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$2, {
						label: "Other inventory notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: sheet.inventory,
							disabled: !editable,
							onChange: (e) => patch({ inventory: e.target.value }),
							className: "min-h-[56px]",
							placeholder: "Loose gear, freeform notes…"
						})
					})
				]
			})] }),
			compact && (sheet.items?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
					children: "Items"
				}), (sheet.items ?? []).slice(0, 4).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded border border-[var(--color-border)] px-2 py-1 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [it.qty > 1 ? `${it.qty}× ` : "", it.name]
					}), it.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 line-clamp-2 text-[11px] text-[var(--color-fg-muted)]",
						children: it.description
					})]
				}, it.id))]
			})
		]
	});
}
function ItemCard({ item, editable, onChange, onRemove, onRoll }) {
	const rarityColor = item.rarity === "legendary" || item.rarity === "artifact" ? "text-[var(--color-warn)]" : item.rarity === "rare" || item.rarity === "very rare" ? "text-[var(--color-steel)]" : item.rarity === "uncommon" ? "text-[var(--color-success)]" : "text-[var(--color-fg-subtle)]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: item.name,
						onChange: (e) => onChange({
							...item,
							name: e.target.value
						}),
						className: "h-8 font-medium"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-[var(--color-fg)]",
						children: [item.qty > 1 ? `${item.qty}× ` : "", item.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("mt-0.5 text-[11px] capitalize", rarityColor),
						children: [
							item.rarity,
							" · ",
							item.category,
							item.attunement ? " · attunement" : "",
							item.equipped ? " · equipped" : "",
							item.value ? ` · ${item.value}` : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						editable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: item.qty,
							onChange: (e) => onChange({
								...item,
								qty: Math.max(0, Number(e.target.value) || 0)
							}),
							className: "h-8 w-14 tabular-nums",
							title: "Quantity"
						}),
						item.damage && onRoll && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "steel",
							onClick: () => onRoll(`1d20${(item.attackBonus ?? 0) >= 0 ? `+${item.attackBonus ?? 0}` : item.attackBonus}`, `${item.name} attack`),
							children: "Atk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							onClick: () => onRoll(item.damage, `${item.name} damage`),
							children: "Dmg"
						})] }),
						editable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: onRemove,
							children: "Remove"
						})
					]
				})]
			}),
			editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: item.description,
				onChange: (e) => onChange({
					...item,
					description: e.target.value
				}),
				className: "mt-2 min-h-[64px] text-sm",
				placeholder: "What this does…"
			}) : item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-fg-muted)]",
				children: item.description
			}),
			editable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-3 text-xs text-[var(--color-fg-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: item.equipped,
						onChange: (e) => onChange({
							...item,
							equipped: e.target.checked
						}),
						className: "size-3.5 accent-[var(--color-steel)]"
					}), "Equipped"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: item.attunement,
						onChange: (e) => onChange({
							...item,
							attunement: e.target.checked
						}),
						className: "size-3.5 accent-[var(--color-steel)]"
					}), "Attunement"]
				})]
			}),
			item.grantedBy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-[10px] text-[var(--color-fg-subtle)]",
				children: [
					"Granted by ",
					item.grantedBy,
					item.grantedAt ? ` · ${new Date(item.grantedAt).toLocaleString([], {
						month: "short",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit"
					})}` : ""
				]
			})
		]
	});
}
function Field$2({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
			children: label
		}), children]
	});
}
function Stat({ label, value, editable, onEdit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			disabled: !editable,
			onChange: (e) => onEdit(e.target.value),
			className: "h-8 border-transparent bg-transparent px-0 font-display text-base font-semibold tabular-nums focus-visible:border-[var(--color-border)] focus-visible:px-2"
		})]
	});
}
function CombatTracker({ combat, characters, isDm, onChange }) {
	function sort() {
		const combatants = [...combat.combatants].sort((a, b) => b.init - a.init).map((c, i) => ({
			...c,
			active: i === 0
		}));
		onChange({
			...combat,
			combatants,
			round: 1,
			active: true
		});
	}
	function next() {
		if (combat.combatants.length === 0) return;
		const idx = combat.combatants.findIndex((c) => c.active);
		const nextIdx = idx < 0 ? 0 : (idx + 1) % combat.combatants.length;
		const round = nextIdx === 0 ? combat.round + 1 : combat.round;
		onChange({
			...combat,
			round,
			active: true,
			combatants: combat.combatants.map((c, i) => ({
				...c,
				active: i === nextIdx
			}))
		});
	}
	function addFromParty() {
		const combatants = characters.map((ch) => ({
			id: `cb-${ch.id}`,
			name: ch.name,
			init: 10 + ch.initiativeMod,
			isPc: true,
			characterId: ch.id,
			hp: ch.currentHp,
			maxHp: ch.maxHp,
			ac: ch.ac,
			conditions: ch.conditions,
			active: false
		}));
		onChange({
			...combat,
			combatants,
			active: true,
			round: 1
		});
	}
	function addNpc(name = "Enemy") {
		const id = `cb-${Date.now()}`;
		onChange({
			...combat,
			active: true,
			combatants: [...combat.combatants, {
				id,
				name,
				init: 10,
				isPc: false,
				hp: 20,
				maxHp: 20,
				ac: 13,
				conditions: [],
				active: combat.combatants.length === 0
			}]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4 text-[var(--color-steel)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-semibold uppercase tracking-wide",
						children: "Combat"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tabular-nums text-[var(--color-fg-subtle)]",
					children: combat.active ? `Round ${combat.round}` : "Idle"
				})]
			}),
			isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: addFromParty,
						children: "Import party"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: () => addNpc(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "NPC"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "steel",
						onClick: sort,
						children: "Sort"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						onClick: next,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }), "Next"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => onChange({
							active: false,
							round: 1,
							combatants: []
						}),
						children: "End"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [combat.combatants.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-6 text-center text-xs text-[var(--color-fg-subtle)]",
					children: isDm ? "Import the party or add NPCs to start combat." : "Waiting for combat…"
				}), combat.combatants.map((c) => {
					const pct = Math.max(0, Math.min(100, c.hp / Math.max(1, c.maxHp) * 100));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("rounded-[var(--radius-sm)] border px-2.5 py-2", c.active ? "border-[color-mix(in_oklab,var(--color-steel)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-steel)_12%,var(--color-bg))]" : "border-[var(--color-border)] bg-[var(--color-bg)]"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [isDm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: c.init,
								onChange: (e) => onChange({
									...combat,
									combatants: combat.combatants.map((x) => x.id === c.id ? {
										...x,
										init: Number(e.target.value) || 0
									} : x)
								}),
								className: "h-8 w-14 px-2 text-center text-xs tabular-nums"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 text-center text-xs tabular-nums text-[var(--color-fg-muted)]",
								children: c.init
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-sm font-medium",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs tabular-nums text-[var(--color-fg-muted)]",
											children: ["AC ", c.ac]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full rounded-full", pct <= 30 ? "bg-[var(--color-danger)]" : "bg-[var(--color-success)]"),
											style: { width: `${pct}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex items-center gap-2",
										children: isDm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												value: c.hp,
												onChange: (e) => onChange({
													...combat,
													combatants: combat.combatants.map((x) => x.id === c.id ? {
														...x,
														hp: Number(e.target.value) || 0
													} : x)
												}),
												className: "h-7 w-16 px-2 text-xs tabular-nums"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-[var(--color-fg-subtle)]",
												children: ["/ ", c.maxHp]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "icon-sm",
												variant: "ghost",
												className: "ml-auto",
												onClick: () => onChange({
													...combat,
													combatants: combat.combatants.filter((x) => x.id !== c.id)
												}),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											})
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs tabular-nums text-[var(--color-fg-muted)]",
											children: (c.isPc, `${c.hp}/${c.maxHp}`)
										})
									})
								]
							})]
						})
					}, c.id);
				})]
			})
		]
	});
}
var STATUS_META = [
	{
		id: "active",
		label: "Active",
		tone: "text-[var(--color-success)] border-[color-mix(in_oklab,var(--color-success)_40%,var(--color-border))]"
	},
	{
		id: "unconscious",
		label: "Unconscious",
		tone: "text-[var(--color-warn)] border-[color-mix(in_oklab,var(--color-warn)_40%,var(--color-border))]"
	},
	{
		id: "dying",
		label: "Dying",
		tone: "text-[var(--color-danger)] border-[color-mix(in_oklab,var(--color-danger)_45%,var(--color-border))]"
	},
	{
		id: "stable",
		label: "Stable",
		tone: "text-[var(--color-steel)] border-[color-mix(in_oklab,var(--color-steel)_40%,var(--color-border))]"
	},
	{
		id: "dead",
		label: "Dead",
		tone: "text-[var(--color-fg-subtle)] border-[var(--color-border-strong)]"
	},
	{
		id: "absent",
		label: "Absent",
		tone: "text-[var(--color-fg-subtle)] border-[var(--color-border)]"
	}
];
function PartyTracker({ characters, seats, isDm, selfId, compact, onChange, onRoll }) {
	const [expanded, setExpanded] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const sorted = (0, import_react.useMemo)(() => {
		let list = [...characters].sort((a, b) => a.name.localeCompare(b.name));
		if (filter === "hurt") list = list.filter((c) => c.currentHp < c.maxHp || c.status && c.status !== "active");
		else if (filter === "buffed") list = list.filter((c) => (c.effects?.length ?? 0) > 0 || c.conditions.length > 0);
		return list;
	}, [characters, filter]);
	const partyHp = (0, import_react.useMemo)(() => {
		const cur = characters.reduce((s, c) => s + Math.max(0, c.currentHp), 0);
		const max = characters.reduce((s, c) => s + Math.max(1, c.maxHp), 0);
		return {
			cur,
			max,
			pct: max ? Math.round(cur / max * 100) : 100
		};
	}, [characters]);
	if (characters.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			compact,
			partyHp,
			count: 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-8 text-center text-xs text-[var(--color-fg-subtle)]",
			children: isDm ? "No party sheets yet. Players create a character from the Sheet tab, or you can wait for them to join." : "Create your character in the Sheet tab to appear on the party tracker."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				compact,
				partyHp,
				count: characters.length
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [[
					["all", "All"],
					["hurt", "Hurt"],
					["buffed", "Buffed"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: filter === id ? "steel" : "ghost",
					onClick: () => setFilter(id),
					children: label
				}, id)), isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					className: "ml-auto",
					onClick: () => {
						for (const c of characters) onChange({
							...c,
							currentHp: c.maxHp,
							tempHp: 0,
							status: "active",
							deathSaves: {
								successes: 0,
								failures: 0
							},
							conditions: c.conditions.filter((x) => x !== "Unconscious" && x !== "Prone")
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5" }), "Full heal"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid gap-2", !compact && "sm:grid-cols-1"),
				children: sorted.map((pc) => {
					const open = expanded === pc.id || !compact;
					const seat = seats.find((s) => s.peerId === pc.ownerPeerId);
					const canEdit = isDm || pc.ownerPeerId === selfId;
					const pct = Math.max(0, Math.min(100, pc.currentHp / Math.max(1, pc.maxHp) * 100));
					const status = pc.status ?? "active";
					const statusMeta = STATUS_META.find((s) => s.id === status) ?? STATUS_META[0];
					const effects = pc.effects ?? [];
					const death = pc.deathSaves ?? {
						successes: 0,
						failures: 0
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: cn("rounded-[var(--radius-md)] border bg-[var(--color-bg)] transition-colors", status === "dying" || status === "dead" ? "border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))]" : "border-[var(--color-border)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-start gap-2.5 px-3 py-2.5 text-left",
							onClick: () => setExpanded(open && compact ? null : pc.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[var(--color-accent-fg)] ring-2 ring-[var(--color-border)]",
								style: { background: pc.tokenColor },
								children: pc.name.slice(0, 2).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-x-2 gap-y-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate font-medium text-[var(--color-fg)]",
												children: pc.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full border px-1.5 py-0 text-[10px] font-medium uppercase tracking-wide", statusMeta.tone),
												children: statusMeta.label
											}),
											pc.inspiration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-0.5 text-[10px] text-[var(--color-warn)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), "Insp"]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-[11px] text-[var(--color-fg-subtle)]",
										children: [
											pc.playerName,
											seat?.connected === false ? " · offline" : "",
											" · ",
											"L",
											pc.level,
											" ",
											pc.className,
											pc.race ? ` · ${pc.race}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full rounded-full transition-[width] duration-200", pct <= 25 ? "bg-[var(--color-danger)]" : pct <= 50 ? "bg-[var(--color-warn)]" : "bg-[var(--color-success)]"),
											style: { width: `${pct}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] tabular-nums text-[var(--color-fg-muted)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"HP ",
												pc.currentHp,
												pc.tempHp > 0 ? `+${pc.tempHp}` : "",
												"/",
												pc.maxHp
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["AC ", pc.ac] }),
											(pc.gold ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pc.gold, " gp"] }),
											(pc.items?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												pc.items.length,
												" item",
												pc.items.length === 1 ? "" : "s"
											] }),
											effects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[var(--color-steel)]",
												children: [
													effects.length,
													" effect",
													effects.length === 1 ? "" : "s"
												]
											}),
											pc.conditions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[var(--color-warn)]",
												children: [pc.conditions.slice(0, 3).join(", "), pc.conditions.length > 3 ? "…" : ""]
											})
										]
									})
								]
							})]
						}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-[var(--color-border)] px-3 py-3",
							children: [
								canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-3 flex flex-wrap gap-1",
									children: [
										-10,
										-5,
										-1,
										1,
										5,
										10
									].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "secondary",
										className: cn("tabular-nums", n < 0 && "text-[var(--color-danger)]"),
										onClick: () => {
											let hp = pc.currentHp;
											let temp = pc.tempHp;
											if (n < 0) {
												let dmg = -n;
												if (temp > 0) {
													const absorb = Math.min(temp, dmg);
													temp -= absorb;
													dmg -= absorb;
												}
												hp = Math.max(0, hp - dmg);
											} else hp = Math.min(pc.maxHp, hp + n);
											let nextStatus = pc.status ?? "active";
											if (hp <= 0 && nextStatus === "active") nextStatus = "dying";
											if (hp > 0 && (nextStatus === "dying" || nextStatus === "unconscious" || nextStatus === "stable")) nextStatus = "active";
											onChange({
												...pc,
												currentHp: hp,
												tempHp: temp,
												status: nextStatus,
												conditions: hp <= 0 && !pc.conditions.includes("Unconscious") ? [...pc.conditions, "Unconscious"] : hp > 0 ? pc.conditions.filter((c) => c !== "Unconscious") : pc.conditions
											});
										},
										children: n > 0 ? `+${n}` : n
									}, n))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("grid gap-2", !compact && "sm:grid-cols-3"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
											label: "HP",
											value: pc.currentHp,
											disabled: !canEdit,
											onChange: (v) => onChange({
												...pc,
												currentHp: v
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
											label: "Temp",
											value: pc.tempHp,
											disabled: !canEdit,
											onChange: (v) => onChange({
												...pc,
												tempHp: Math.max(0, v)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
											label: "Max",
											value: pc.maxHp,
											disabled: !canEdit,
											onChange: (v) => onChange({
												...pc,
												maxHp: Math.max(1, v)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
											label: "AC",
											value: pc.ac,
											disabled: !canEdit,
											onChange: (v) => onChange({
												...pc,
												ac: v
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
												children: "Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												disabled: !canEdit,
												value: status,
												onChange: (e) => onChange({
													...pc,
													status: e.target.value
												}),
												className: "flex h-9 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2 text-sm disabled:opacity-60",
												children: STATUS_META.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: s.id,
													children: s.label
												}, s.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-end gap-2 pb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												disabled: !canEdit,
												checked: !!pc.inspiration,
												onChange: (e) => onChange({
													...pc,
													inspiration: e.target.checked
												}),
												className: "size-4 accent-[var(--color-warn)]"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-[var(--color-fg-muted)]",
												children: "Inspiration"
											})]
										})
									]
								}),
								(status === "dying" || status === "stable" || status === "unconscious") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]",
										children: "Death saves"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeathPips, {
											label: "Success",
											value: death.successes,
											max: 3,
											tone: "success",
											disabled: !canEdit,
											onChange: (successes) => onChange({
												...pc,
												deathSaves: {
													...death,
													successes
												},
												status: successes >= 3 ? "stable" : pc.status
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeathPips, {
											label: "Failure",
											value: death.failures,
											max: 3,
											tone: "danger",
											disabled: !canEdit,
											onChange: (failures) => onChange({
												...pc,
												deathSaves: {
													...death,
													failures
												},
												status: failures >= 3 ? "dead" : pc.status
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]",
										children: "Conditions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: CONDITIONS_5E.map((c) => {
											const on = pc.conditions.includes(c);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												disabled: !canEdit,
												onClick: () => {
													if (!canEdit) return;
													onChange({
														...pc,
														conditions: on ? pc.conditions.filter((x) => x !== c) : [...pc.conditions, c]
													});
												},
												className: cn("rounded-full border px-2 py-0.5 text-[11px] transition-colors disabled:opacity-50", on ? "border-[var(--color-warn)] bg-[color-mix(in_oklab,var(--color-warn)_16%,transparent)] text-[var(--color-warn)]" : "border-[var(--color-border)] text-[var(--color-fg-subtle)] hover:border-[var(--color-border-strong)]"),
												children: c
											}, c);
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-1.5 flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]",
												children: "Buffs & effects"
											}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												size: "sm",
												variant: "ghost",
												onClick: () => onChange({
													...pc,
													effects: [...effects, newEffect({
														name: "Custom effect",
														kind: "buff"
													})]
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add"]
											})]
										}),
										canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-2 flex flex-wrap gap-1",
											children: COMMON_EFFECTS.slice(0, compact ? 6 : 12).map((fx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "sm",
												variant: "secondary",
												className: "h-7 text-[11px]",
												onClick: () => onChange({
													...pc,
													effects: [...effects, newEffect({
														name: fx.name,
														kind: fx.kind,
														duration: fx.duration
													})]
												}),
												children: fx.name
											}, fx.name))
										}),
										effects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-[var(--color-fg-subtle)]",
											children: "No active effects."
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "grid gap-1.5",
											children: effects.map((fx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EffectRow, {
												effect: fx,
												canEdit,
												onChange: (next) => onChange({
													...pc,
													effects: effects.map((e) => e.id === next.id ? next : e)
												}),
												onRemove: () => onChange({
													...pc,
													effects: effects.filter((e) => e.id !== fx.id)
												})
											}, fx.id))
										})
									]
								}),
								canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("mt-3 grid gap-2", !compact && "sm:grid-cols-2"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
												children: "Spell slots"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: pc.spellSlots ?? "",
												onChange: (e) => onChange({
													...pc,
													spellSlots: e.target.value
												}),
												placeholder: "4/3/2…",
												className: "h-8 text-xs"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
												children: "Hit dice"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: pc.hitDice ?? "",
												onChange: (e) => onChange({
													...pc,
													hitDice: e.target.value
												}),
												placeholder: "3d10 remaining",
												className: "h-8 text-xs"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-0.5 sm:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
												children: "Session notes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: pc.notes,
												onChange: (e) => onChange({
													...pc,
													notes: e.target.value
												}),
												placeholder: "Goals, bonds, reminders…",
												className: "h-8 text-xs"
											})]
										})
									]
								}),
								onRoll && canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "sm",
										variant: "steel",
										onClick: () => onRoll(`1d20${pc.initiativeMod >= 0 ? `+${pc.initiativeMod}` : pc.initiativeMod}`, `${pc.name} initiative`),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), "Init"]
									}), [
										"str",
										"dex",
										"con",
										"int",
										"wis",
										"cha"
									].map((k) => {
										const mod = Math.floor(((pc.abilities[k] ?? 10) - 10) / 2);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											variant: "ghost",
											className: "uppercase tabular-nums",
											onClick: () => onRoll(`1d20${mod >= 0 ? `+${mod}` : mod}`, `${pc.name} ${k.toUpperCase()}`),
											children: [
												k,
												" ",
												mod >= 0 ? `+${mod}` : mod
											]
										}, k);
									})]
								})
							]
						})]
					}, pc.id);
				})
			})
		]
	});
}
function Header({ compact, partyHp, count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-[var(--color-steel)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-wide",
					children: "Party"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs tabular-nums text-[var(--color-fg-subtle)]",
					children: count
				})
			]
		}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[11px] tabular-nums text-[var(--color-fg-subtle)]",
				children: [
					"Party HP ",
					partyHp.cur,
					"/",
					partyHp.max
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 w-16 overflow-hidden rounded-full bg-[var(--color-bg-subtle)] sm:w-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full", partyHp.pct <= 30 ? "bg-[var(--color-danger)]" : partyHp.pct <= 60 ? "bg-[var(--color-warn)]" : "bg-[var(--color-success)]"),
					style: { width: `${partyHp.pct}%` }
				})
			})]
		})]
	});
}
function NumField({ label, value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			value,
			disabled,
			onChange: (e) => onChange(Number(e.target.value) || 0),
			className: "h-9 tabular-nums"
		})]
	});
}
function DeathPips({ label, value, max, tone, disabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-[var(--color-fg-muted)]",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1",
			children: Array.from({ length: max }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled,
				onClick: () => onChange(i < value ? i : i + 1),
				className: cn("size-4 rounded-full border transition-colors disabled:opacity-50", i < value ? tone === "success" ? "border-[var(--color-success)] bg-[var(--color-success)]" : "border-[var(--color-danger)] bg-[var(--color-danger)]" : "border-[var(--color-border-strong)] bg-transparent")
			}, i))
		})]
	});
}
function EffectRow({ effect, canEdit, onChange, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: cn("rounded-[var(--radius-sm)] border px-2 py-1.5", effect.kind === "buff" ? "border-[color-mix(in_oklab,var(--color-success)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-success)_6%,var(--color-bg))]" : effect.kind === "debuff" ? "border-[color-mix(in_oklab,var(--color-danger)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_6%,var(--color-bg))]" : "border-[var(--color-border)] bg-[var(--color-bg-elevated)]"),
		children: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1.5 sm:grid-cols-[1fr_auto_auto]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: effect.name,
					onChange: (e) => onChange({
						...effect,
						name: e.target.value
					}),
					className: "h-8 text-sm font-medium"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: effect.kind,
					onChange: (e) => onChange({
						...effect,
						kind: e.target.value
					}),
					className: "h-8 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "buff",
							children: "Buff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "debuff",
							children: "Debuff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "other",
							children: "Other"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: onRemove,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: effect.duration,
					onChange: (e) => onChange({
						...effect,
						duration: e.target.value
					}),
					placeholder: "Duration",
					className: "h-8 text-xs sm:col-span-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: effect.source,
					onChange: (e) => onChange({
						...effect,
						source: e.target.value
					}),
					placeholder: "Source",
					className: "h-8 text-xs"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: effect.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
				children: effect.kind
			})]
		}), (effect.duration || effect.source) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-[11px] text-[var(--color-fg-muted)]",
			children: [effect.duration, effect.source].filter(Boolean).join(" · ")
		})] })
	});
}
var QUICK = [
	"1d20",
	"1d4",
	"1d6",
	"1d8",
	"1d10",
	"1d12",
	"2d6",
	"1d100"
];
function SharedDice({ log, onRoll, isDm }) {
	const [expr, setExpr] = (0, import_react.useState)("1d20");
	const [secret, setSecret] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4 text-[var(--color-steel)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-wide",
					children: "Dice"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1.5",
				children: QUICK.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					className: "tabular-nums",
					onClick: () => onRoll(d),
					children: d
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: expr,
					onChange: (e) => setExpr(e.target.value),
					placeholder: "2d6+3",
					className: "font-mono text-sm",
					onKeyDown: (e) => {
						if (e.key === "Enter") onRoll(expr, void 0, secret);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => onRoll(expr, void 0, secret),
					children: "Roll"
				})]
			}),
			isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-xs text-[var(--color-fg-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: secret,
					onChange: (e) => setSecret(e.target.checked),
					className: "size-3.5 accent-[var(--color-steel)]"
				}), "Secret roll (DM only)"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_80%,var(--color-bg-subtle))] p-2 scrollbar-thin",
				children: log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-xs text-[var(--color-fg-subtle)]",
					children: "No rolls yet"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1.5",
					children: log.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2.5 py-1.5 shadow-[var(--shadow-inset)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate text-xs font-medium text-[var(--color-fg)]",
								children: [d.name, d.secret ? " · secret" : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-semibold tabular-nums text-[var(--color-steel)]",
								children: d.total
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate font-mono text-[10px] text-[var(--color-fg-subtle)]",
							children: [
								d.expression,
								": ",
								d.detail
							]
						})]
					}, d.id))
				})
			})
		]
	});
}
function TablePresence({ seats, peers, selfId, code }) {
	const peerMap = new Map(peers.map((p) => [p.id, p]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "steel",
				className: "font-mono tracking-wider",
				children: code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-fg-subtle)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
					seats.length || peers.length + 1,
					" at table"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: seats.map((s) => {
					const p = peerMap.get(s.peerId);
					const connected = s.peerId === selfId || p?.connectionState === "connected" || s.connected;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs", connected ? "border-[var(--color-border)] text-[var(--color-fg-muted)]" : "border-[var(--color-border)] text-[var(--color-fg-subtle)] opacity-50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", connected ? "bg-[var(--color-success)]" : "bg-[var(--color-fg-subtle)]") }),
							s.name,
							s.role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wide text-[var(--color-steel)]",
								children: "DM"
							}),
							s.peerId === selfId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px]",
								children: "you"
							})
						]
					}, s.peerId);
				})
			})
		]
	});
}
function TableSettingsPanel({ settings, onChange, onApplyName }) {
	function patch(p) {
		onChange({
			...settings,
			...p
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
				label: "Table name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.tableName,
					onChange: (e) => patch({ tableName: e.target.value }),
					onBlur: () => onApplyName?.(settings.tableName)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
					label: "Edition / system",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: settings.edition,
						onChange: (e) => patch({ edition: e.target.value }),
						placeholder: "D&D 5e, PF2e, homebrew…"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
					label: "Level band",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: settings.levelBand,
						onChange: (e) => patch({ levelBand: e.target.value }),
						placeholder: "1–5"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
				label: "Progression",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"milestone",
						"xp",
						"none"
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: settings.xpMode === m ? "steel" : "secondary",
						onClick: () => patch({ xpMode: m }),
						children: m
					}, m))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Players can move their tokens",
						checked: settings.allowPlayerTokenMove,
						onChange: (v) => patch({ allowPlayerTokenMove: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Reveal enemy HP to players",
						checked: settings.revealEnemyHp,
						onChange: (v) => patch({ revealEnemyHp: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Reveal monster names",
						checked: settings.revealMonsterNames,
						onChange: (v) => patch({ revealMonsterNames: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Death saves public",
						checked: settings.deathSavesPublic,
						onChange: (v) => patch({ deathSavesPublic: v })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
					label: "Short rest",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: settings.shortRestHint,
						onChange: (e) => patch({ shortRestHint: e.target.value })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
					label: "Long rest",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: settings.longRestHint,
						onChange: (e) => patch({ longRestHint: e.target.value })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
				label: "House rules (players see this)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: settings.houseRules,
					onChange: (e) => patch({ houseRules: e.target.value }),
					className: "min-h-[96px]",
					placeholder: "Critical hits, inspiration, homebrew class rules…"
				})
			})
		]
	});
}
function Field$1({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
			children: label
		}), children]
	});
}
function Toggle({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked),
			className: "size-4 accent-[var(--color-steel)]"
		})]
	});
}
function NpcPanel({ npcs, onChange, onSpawn, onRoll }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-wide",
					children: "NPCs & monsters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					onClick: () => onChange([...npcs, emptyNpc()]),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add"]
				})]
			}),
			npcs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-6 text-center text-xs text-[var(--color-fg-subtle)]",
				children: "Build stat blocks for any adventure — then spawn them onto the map."
			}),
			npcs.map((npc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: npc.name,
								onChange: (e) => onChange(npcs.map((n) => n.id === npc.id ? {
									...n,
									name: e.target.value
								} : n)),
								className: "min-w-[8rem] flex-1 font-medium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: npc.cr,
								onChange: (e) => onChange(npcs.map((n) => n.id === npc.id ? {
									...n,
									cr: e.target.value
								} : n)),
								className: "w-16",
								placeholder: "CR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "steel",
								onClick: () => onSpawn(npc),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-3.5" }), "Spawn"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon-sm",
								variant: "ghost",
								onClick: () => onChange(npcs.filter((n) => n.id !== npc.id)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: "AC",
								value: npc.ac,
								onChange: (ac) => onChange(npcs.map((n) => n.id === npc.id ? {
									...n,
									ac
								} : n))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: "HP",
								value: npc.hp,
								onChange: (hp) => onChange(npcs.map((n) => n.id === npc.id ? {
									...n,
									hp,
									maxHp: Math.max(n.maxHp, hp)
								} : n))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
								label: "Max",
								value: npc.maxHp,
								onChange: (maxHp) => onChange(npcs.map((n) => n.id === npc.id ? {
									...n,
									maxHp
								} : n))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: Object.keys(npc.abilities).map((k) => {
							const mod = abilityMod(npc.abilities[k]);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "rounded border border-[var(--color-border)] px-2 py-1 text-[10px] uppercase tabular-nums",
								onClick: () => onRoll(`1d20${mod >= 0 ? `+${mod}` : mod}`, `${npc.name} ${k.toUpperCase()}`),
								children: [
									k,
									" ",
									mod >= 0 ? `+${mod}` : mod
								]
							}, k);
						})
					}),
					npc.attacks.map((atk, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: atk.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => onRoll(`1d20${atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}`, `${npc.name} ${atk.name}`),
								children: ["Atk ", atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "ghost",
								onClick: () => onRoll(atk.damage, `${npc.name} dmg`),
								children: atk.damage
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: npc.traits,
						onChange: (e) => onChange(npcs.map((n) => n.id === npc.id ? {
							...n,
							traits: e.target.value
						} : n)),
						placeholder: "Traits, legendary actions…",
						className: "min-h-[56px] text-xs"
					})
				]
			}, npc.id))
		]
	});
}
function Num({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] text-[var(--color-fg-subtle)]",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			value,
			onChange: (e) => onChange(Number(e.target.value) || 0),
			className: "h-8 tabular-nums"
		})]
	});
}
var REWARD_PRESETS = [
	{
		id: "potion-healing",
		label: "Potion of Healing",
		group: "Potions",
		kind: "item",
		item: {
			name: "Potion of Healing",
			category: "potion",
			rarity: "common",
			description: "As an action, drink or administer. Regain 2d4+2 hit points.",
			value: "50 gp",
			weight: "0.5 lb"
		}
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
			value: "150 gp"
		}
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
			description: "Cast the written 1st-level spell once (your spellcasting ability). The scroll is destroyed after use. DC and attack bonus depend on the scroll's level.",
			value: "varies"
		}
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
			description: "You have a +1 bonus to attack and damage rolls made with this magic weapon.",
			attackBonus: 6,
			damage: "1d8+4",
			value: "uncommon",
			weight: "3 lb"
		}
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
			weight: "1 lb"
		}
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
			equipped: false
		}
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
			description: "This bag has an interior space larger than its outside. It can hold up to 500 pounds, not exceeding 64 cubic feet. Retrieving an item is an action.",
			attunement: false,
			value: "uncommon",
			weight: "15 lb"
		}
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
			value: "uncommon"
		}
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
			qty: 1
		}
	},
	{
		id: "gold-10",
		label: "10 gp",
		group: "Currency",
		kind: "gold",
		gold: 10
	},
	{
		id: "gold-50",
		label: "50 gp",
		group: "Currency",
		kind: "gold",
		gold: 50
	},
	{
		id: "gold-100",
		label: "100 gp",
		group: "Currency",
		kind: "gold",
		gold: 100
	},
	{
		id: "xp-50",
		label: "50 XP",
		group: "Progression",
		kind: "xp",
		xp: 50
	},
	{
		id: "xp-100",
		label: "100 XP",
		group: "Progression",
		kind: "xp",
		xp: 100
	},
	{
		id: "inspiration",
		label: "Inspiration",
		group: "Progression",
		kind: "inspiration"
	}
];
function presetToItem(preset) {
	if (preset.kind !== "item" || !preset.item) return null;
	return emptyInventoryItem(preset.item);
}
function RewardsPanel({ characters, onGrant }) {
	const [kind, setKind] = (0, import_react.useState)("item");
	const [targets, setTargets] = (0, import_react.useState)([]);
	const [announce, setAnnounce] = (0, import_react.useState)(true);
	const [addAsAttack, setAddAsAttack] = (0, import_react.useState)(false);
	const [item, setItem] = (0, import_react.useState)(() => emptyInventoryItem({
		name: "",
		description: "",
		category: "gear",
		rarity: "common"
	}));
	const [gold, setGold] = (0, import_react.useState)(25);
	const [xp, setXp] = (0, import_react.useState)(100);
	const [featureText, setFeatureText] = (0, import_react.useState)("");
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const p of REWARD_PRESETS) {
			const list = map.get(p.group) ?? [];
			list.push(p);
			map.set(p.group, list);
		}
		return [...map.entries()];
	}, []);
	function toggleTarget(id) {
		setTargets((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	}
	function selectAll() {
		setTargets(characters.map((c) => c.id));
	}
	function applyPreset(id) {
		const preset = REWARD_PRESETS.find((p) => p.id === id);
		if (!preset) return;
		if (preset.kind === "item") {
			setKind("item");
			const it = presetToItem(preset);
			if (it) {
				setItem(it);
				setAddAsAttack(it.category === "weapon");
			}
		} else if (preset.kind === "gold") {
			setKind("gold");
			setGold(preset.gold ?? 0);
		} else if (preset.kind === "xp") {
			setKind("xp");
			setXp(preset.xp ?? 0);
		} else if (preset.kind === "inspiration") setKind("inspiration");
	}
	function grant() {
		if (characters.length === 0) {
			toast.error("No characters at the table yet");
			return;
		}
		const ids = targets.length ? targets : characters.map((c) => c.id);
		if (ids.length === 0) {
			toast.error("Pick at least one recipient");
			return;
		}
		if (kind === "item" && !item.name.trim()) {
			toast.error("Give the item a name");
			return;
		}
		if (kind === "feature" && !featureText.trim()) {
			toast.error("Describe the feature or boon");
			return;
		}
		const recipients = characters.filter((c) => ids.includes(c.id));
		const nextCharacters = characters.map((c) => {
			if (!ids.includes(c.id)) return c;
			if (kind === "item") return applyRewardToSheet(c, {
				kind: "item",
				item: {
					...item,
					name: item.name.trim()
				},
				addAsAttack
			}, "DM");
			if (kind === "gold") return applyRewardToSheet(c, {
				kind: "gold",
				gold
			}, "DM");
			if (kind === "xp") return applyRewardToSheet(c, {
				kind: "xp",
				xp
			}, "DM");
			if (kind === "inspiration") return applyRewardToSheet(c, { kind: "inspiration" }, "DM");
			return applyRewardToSheet(c, {
				kind: "feature",
				featureText
			}, "DM");
		});
		const names = recipients.map((c) => c.name).join(", ");
		let summary = "";
		if (kind === "item") summary = `Rewarded ${item.qty > 1 ? `${item.qty}× ` : ""}${item.name} → ${names}`;
		else if (kind === "gold") summary = `Rewarded ${gold} gp → ${names}`;
		else if (kind === "xp") summary = `Awarded ${xp} XP → ${names}`;
		else if (kind === "inspiration") summary = `Granted inspiration → ${names}`;
		else summary = `Granted boon → ${names}`;
		onGrant(nextCharacters, {
			id: `log-${Date.now()}`,
			at: Date.now(),
			text: summary,
			kind: "loot"
		});
		toast.success(summary);
		if (kind === "item") setItem((prev) => emptyInventoryItem({
			category: prev.category,
			rarity: prev.rarity,
			name: "",
			description: ""
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4 text-[var(--color-steel)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-semibold uppercase tracking-wide",
						children: "Rewards"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[var(--color-fg-subtle)]",
					children: "Grant loot, gold, XP, or boons to party sheets"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]",
						children: "Recipients"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: selectAll,
						children: "Everyone"
					})]
				}),
				characters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]",
					children: "Wait for players to create characters, then reward them here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: characters.map((c) => {
						const on = targets.includes(c.id) || targets.length === 0;
						const explicit = targets.includes(c.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggleTarget(c.id),
							className: cn("rounded-full border px-2.5 py-1 text-xs transition-colors", explicit ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_16%,transparent)] text-[var(--color-fg)]" : targets.length === 0 ? "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]" : "border-[var(--color-border)] text-[var(--color-fg-subtle)]"),
							title: targets.length === 0 ? "All selected by default" : void 0,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-1.5 inline-block size-2 rounded-full",
									style: { background: c.tokenColor }
								}),
								c.name,
								targets.length === 0 && on ? " · all" : ""
							]
						}, c.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-[var(--color-fg-subtle)]",
					children: targets.length === 0 ? "No chips selected → grants to the whole party." : `${targets.length} selected.`
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [
					["item", "Item"],
					["gold", "Gold"],
					["xp", "XP"],
					["inspiration", "Inspiration"],
					["feature", "Boon / feature"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: kind === id ? "steel" : "secondary",
					onClick: () => setKind(id),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]",
					children: "Quick presets"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: groups.map(([group, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-[11px] text-[var(--color-fg-muted)]",
						children: group
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							className: "h-7 text-[11px]",
							onClick: () => applyPreset(p.id),
							children: p.label
						}, p.id))
					})] }, group))
				})]
			}),
			kind === "item" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Item name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: item.name,
									onChange: (e) => setItem({
										...item,
										name: e.target.value
									}),
									placeholder: "Cloak of Billowing"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Quantity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: item.qty,
									onChange: (e) => setItem({
										...item,
										qty: Math.max(1, Number(e.target.value) || 1)
									}),
									className: "tabular-nums"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: item.category,
									onChange: (e) => {
										const category = e.target.value;
										setItem({
											...item,
											category
										});
										if (category === "weapon") setAddAsAttack(true);
									},
									className: "flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm",
									children: [
										"weapon",
										"armor",
										"potion",
										"scroll",
										"wondrous",
										"gear",
										"treasure",
										"currency",
										"other"
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Rarity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: item.rarity,
									onChange: (e) => setItem({
										...item,
										rarity: e.target.value
									}),
									className: "flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm",
									children: [
										"common",
										"uncommon",
										"rare",
										"very rare",
										"legendary",
										"artifact",
										"unique"
									].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r,
										children: r
									}, r))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Description / how to use",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: item.description,
							onChange: (e) => setItem({
								...item,
								description: e.target.value
							}),
							className: "min-h-[96px]",
							placeholder: "What the item does, action cost, saves, charges, attunement notes…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Value",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: item.value,
									onChange: (e) => setItem({
										...item,
										value: e.target.value
									}),
									placeholder: "150 gp"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Weight",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: item.weight,
									onChange: (e) => setItem({
										...item,
										weight: e.target.value
									}),
									placeholder: "1 lb"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "DM notes (private to sheet notes field)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: item.notes,
									onChange: (e) => setItem({
										...item,
										notes: e.target.value
									}),
									placeholder: "Optional"
								})
							})
						]
					}),
					(item.category === "weapon" || addAsAttack) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Attack bonus (if weapon)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: item.attackBonus ?? "",
								onChange: (e) => setItem({
									...item,
									attackBonus: e.target.value === "" ? void 0 : Number(e.target.value)
								}),
								placeholder: "+5",
								className: "tabular-nums"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Damage",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: item.damage ?? "",
								onChange: (e) => setItem({
									...item,
									damage: e.target.value
								}),
								placeholder: "1d8+3",
								className: "font-mono"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs text-[var(--color-fg-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: item.attunement,
								onChange: (e) => setItem({
									...item,
									attunement: e.target.checked
								}),
								className: "size-3.5 accent-[var(--color-steel)]"
							}), "Requires attunement"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs text-[var(--color-fg-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: addAsAttack,
								onChange: (e) => setAddAsAttack(e.target.checked),
								className: "size-3.5 accent-[var(--color-steel)]"
							}), "Also add as attack on sheet"]
						})]
					})
				]
			}),
			kind === "gold" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Gold pieces",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					value: gold,
					onChange: (e) => setGold(Number(e.target.value) || 0),
					className: "max-w-xs tabular-nums"
				})
			}),
			kind === "xp" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Experience points",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					value: xp,
					onChange: (e) => setXp(Number(e.target.value) || 0),
					className: "max-w-xs tabular-nums"
				})
			}),
			kind === "inspiration" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-fg-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 inline size-3.5 text-[var(--color-warn)]" }), "Selected characters receive inspiration (shown on party tracker and sheet)."]
			}),
			kind === "feature" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Boon / feature text (appended to Features)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: featureText,
					onChange: (e) => setFeatureText(e.target.value),
					className: "min-h-[100px]",
					placeholder: "Blessing of the Arena — Once per long rest, you can reroll a failed save."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						onClick: grant,
						disabled: characters.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), "Grant reward"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-[var(--color-fg-muted)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: announce,
							onChange: (e) => setAnnounce(e.target.checked),
							className: "size-3.5 accent-[var(--color-steel)]"
						}), "Log in session history"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-[var(--color-fg-subtle)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mr-1 inline size-3.5" }), "Items appear in inventory with full details"]
					})
				]
			}),
			!announce && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-[var(--color-fg-subtle)]",
				children: "Session log still records the grant for DM reference."
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
			children: label
		}), children]
	});
}
function SkillChallengeTool({ challenge, onChange, isDm }) {
	if (!isDm && !challenge.active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-[var(--color-fg-subtle)]",
		children: "No active skill challenge."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: challenge.title,
					onChange: (e) => onChange({
						...challenge,
						title: e.target.value
					}),
					placeholder: "Challenge title"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: challenge.goal,
					onChange: (e) => onChange({
						...challenge,
						goal: e.target.value
					}),
					placeholder: "Goal / stakes",
					className: "min-h-[64px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs",
						children: ["Successes needed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: challenge.successesNeeded,
							onChange: (e) => onChange({
								...challenge,
								successesNeeded: Number(e.target.value) || 1
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs",
						children: ["Failures allowed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: challenge.failuresAllowed,
							onChange: (e) => onChange({
								...challenge,
								failuresAllowed: Number(e.target.value) || 1
							})
						})]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold",
					children: challenge.title || "Skill challenge"
				}), challenge.goal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[var(--color-fg-muted)]",
					children: challenge.goal
				})] }), challenge.resolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("text-xs font-medium uppercase", challenge.resolved === "success" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"),
					children: challenge.resolved
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase text-[var(--color-fg-subtle)]",
						children: "Successes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl tabular-nums text-[var(--color-success)]",
						children: [
							challenge.successes,
							"/",
							challenge.successesNeeded
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase text-[var(--color-fg-subtle)]",
						children: "Failures"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl tabular-nums text-[var(--color-danger)]",
						children: [
							challenge.failures,
							"/",
							challenge.failuresAllowed
						]
					})]
				})]
			}),
			isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: () => {
							const successes = challenge.successes + 1;
							const resolved = successes >= challenge.successesNeeded ? "success" : challenge.resolved;
							onChange({
								...challenge,
								active: true,
								successes,
								resolved,
								log: [...challenge.log, `Success (${successes})`]
							});
						},
						children: "+ Success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: () => {
							const failures = challenge.failures + 1;
							const resolved = failures >= challenge.failuresAllowed ? "failure" : challenge.resolved;
							onChange({
								...challenge,
								active: true,
								failures,
								resolved,
								log: [...challenge.log, `Failure (${failures})`]
							});
						},
						children: "+ Failure"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => onChange({
							...challenge,
							active: true,
							successes: 0,
							failures: 0,
							resolved: null,
							log: []
						}),
						children: "Reset"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: challenge.active ? "outline" : "steel",
						onClick: () => onChange({
							...challenge,
							active: !challenge.active
						}),
						children: challenge.active ? "Hide from play" : "Activate"
					})
				]
			}),
			challenge.log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-xs text-[var(--color-fg-muted)]",
				children: challenge.log.slice(-8).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", l] }, i))
			})
		]
	});
}
function ClocksPanel({ clocks, onChange, isDm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-wide",
					children: "Clocks"
				}), isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					onClick: () => onChange([...clocks, {
						id: `clk-${Date.now()}`,
						name: "Clock",
						filled: 0,
						segments: 4
					}]),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add"]
				})]
			}),
			clocks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--color-fg-subtle)]",
				children: "Progress clocks for rituals, pursuits, doom — any campaign."
			}),
			clocks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center gap-2",
					children: [
						isDm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: c.name,
							onChange: (e) => onChange(clocks.map((x) => x.id === c.id ? {
								...x,
								name: e.target.value
							} : x)),
							className: "h-8 flex-1"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 text-sm font-medium",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs tabular-nums text-[var(--color-fg-muted)]",
							children: [
								c.filled,
								"/",
								c.segments
							]
						}),
						isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							onClick: () => onChange(clocks.filter((x) => x.id !== c.id)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: Array.from({ length: c.segments }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !isDm,
						onClick: () => onChange(clocks.map((x) => x.id === c.id ? {
							...x,
							filled: i < x.filled ? i : i + 1
						} : x)),
						className: `size-5 rounded-full border ${i < c.filled ? "border-[var(--color-steel)] bg-[var(--color-steel)]" : "border-[var(--color-border-strong)] bg-transparent"}`
					}, i))
				})]
			}, c.id))
		]
	});
}
function HazardsPanel({ hazards, onChange, isDm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-wide",
					children: "Hazard counters"
				}), isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					onClick: () => onChange([...hazards, {
						id: `hz-${Date.now()}`,
						name: "Hazard",
						count: 0,
						max: 4,
						notes: ""
					}]),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--color-fg-subtle)]",
				children: "Runestones, ritual seals, siege progress — track any multi-step threat."
			}),
			hazards.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						isDm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: h.name,
							onChange: (e) => onChange(hazards.map((x) => x.id === h.id ? {
								...x,
								name: e.target.value
							} : x)),
							className: "h-8 flex-1"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 text-sm",
							children: h.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							disabled: !isDm,
							onClick: () => onChange(hazards.map((x) => x.id === h.id ? {
								...x,
								count: Math.min(x.max, x.count + 1)
							} : x)),
							children: [
								h.count,
								"/",
								h.max
							]
						}),
						isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							onClick: () => onChange(hazards.filter((x) => x.id !== h.id)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})
					]
				})
			}, h.id))
		]
	});
}
function LootPanel({ loot, onChange, isDm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-sm font-semibold uppercase tracking-wide",
				children: "Loot"
			}), isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "sm",
				variant: "secondary",
				onClick: () => onChange([...loot, {
					id: `lt-${Date.now()}`,
					name: "Item",
					qty: 1,
					notes: "",
					claimedBy: ""
				}]),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add"]
			})]
		}), loot.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: item.name,
						disabled: !isDm,
						onChange: (e) => onChange(loot.map((x) => x.id === item.id ? {
							...x,
							name: e.target.value
						} : x)),
						className: "h-8 flex-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: item.qty,
						disabled: !isDm,
						onChange: (e) => onChange(loot.map((x) => x.id === item.id ? {
							...x,
							qty: Number(e.target.value) || 0
						} : x)),
						className: "h-8 w-16"
					}),
					isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "ghost",
						onClick: () => onChange(loot.filter((x) => x.id !== item.id)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: item.claimedBy,
				disabled: !isDm,
				onChange: (e) => onChange(loot.map((x) => x.id === item.id ? {
					...x,
					claimedBy: e.target.value
				} : x)),
				placeholder: "Claimed by…",
				className: "h-8 text-xs"
			})]
		}, item.id))]
	});
}
function SessionLogPanel({ log, onChange, isDm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold uppercase tracking-wide",
					children: "Session log"
				}), isDm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					onClick: () => {
						const text = window.prompt("Log entry");
						if (!text?.trim()) return;
						onChange([{
							id: `log-${Date.now()}`,
							at: Date.now(),
							text: text.trim(),
							kind: "note"
						}, ...log]);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Note"]
				})]
			}),
			log.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--color-fg-subtle)]",
				children: "Milestones, kills, and story beats."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-48 space-y-1 overflow-y-auto scrollbar-thin",
				children: log.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded border border-[var(--color-border)] px-2 py-1.5 text-xs text-[var(--color-fg-muted)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[var(--color-fg-subtle)]",
							children: new Date(e.at).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit"
							})
						}),
						" ",
						e.text
					]
				}, e.id))
			})
		]
	});
}
function DmNotesPanel({ notes, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-sm font-semibold uppercase tracking-wide",
				children: "DM private notes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: notes,
				onChange: (e) => onChange(e.target.value),
				className: "min-h-[120px]",
				placeholder: "Secrets, NPC names, upcoming twists — never shown to players as a handout."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-[var(--color-fg-subtle)]",
				children: "Stored with table state for this session. Use Handouts for player-facing text."
			})
		]
	});
}
/**
* Browser-to-browser table sync via PeerJS cloud (no shared server DB required).
* DM hosts a fixed peer id derived from the table code; players connect to it.
*/
function hostId(code) {
	return `grimoire1${code.toLowerCase()}`;
}
var PEER_OPTS = {
	debug: 0,
	host: "0.peerjs.com",
	port: 443,
	path: "/",
	secure: true,
	config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:global.stun.twilio.com:3478" }] }
};
function startDmPeerSync(opts) {
	const id = hostId(opts.code);
	let peer = null;
	const conns = /* @__PURE__ */ new Map();
	let destroyed = false;
	const attach = (conn) => {
		conns.set(conn.peer, conn);
		opts.onPeerCount?.(conns.size);
		conn.on("data", (raw) => {
			try {
				const msg = raw;
				if (msg?.t === "action" && msg.payload) opts.onAction(msg.payload);
				if (msg?.t === "ping") conn.send({
					t: "pong",
					at: Date.now()
				});
			} catch {}
		});
		conn.on("close", () => {
			conns.delete(conn.peer);
			opts.onPeerCount?.(conns.size);
		});
		conn.on("open", () => {
			try {
				conn.send({
					t: "state",
					state: opts.getState()
				});
			} catch {}
		});
		if (conn.open) try {
			conn.send({
				t: "state",
				state: opts.getState()
			});
		} catch {}
	};
	const boot = () => {
		if (destroyed) return;
		peer = new $dd0187d7f28e386f$export$2e2bcd8739ae039(id, PEER_OPTS);
		peer.on("open", () => {});
		peer.on("connection", (conn) => attach(conn));
		peer.on("error", (err) => {
			const msg = String(err?.type ?? err);
			if (msg.includes("unavailable-id") || msg.includes("ID is taken")) {
				try {
					peer?.destroy();
				} catch {}
				setTimeout(() => {
					if (!destroyed) boot();
				}, 600);
			}
		});
	};
	boot();
	return {
		destroy: () => {
			destroyed = true;
			for (const c of conns.values()) try {
				c.close();
			} catch {}
			conns.clear();
			try {
				peer?.destroy();
			} catch {}
			peer = null;
		},
		broadcastState: (state) => {
			const wire = {
				t: "state",
				state
			};
			for (const c of conns.values()) if (c.open) try {
				c.send(wire);
			} catch {}
		},
		sendAction: () => {},
		connected: () => conns.size > 0
	};
}
function startPlayerPeerSync(opts) {
	const target = hostId(opts.code);
	let peer = null;
	let conn = null;
	let destroyed = false;
	let retryTimer = null;
	const connect = () => {
		if (destroyed) return;
		opts.onStatus?.("connecting");
		peer = new $dd0187d7f28e386f$export$2e2bcd8739ae039(PEER_OPTS);
		peer.on("open", () => {
			if (destroyed) return;
			conn = peer.connect(target, { reliable: true });
			conn.on("open", () => {
				opts.onStatus?.("open");
				try {
					conn?.send({
						t: "action",
						payload: {
							t: "hello",
							role: "player",
							name: opts.displayName,
							peerId: opts.selfId,
							from: opts.selfId
						}
					});
					conn?.send({
						t: "action",
						payload: {
							t: "request-state",
							from: opts.selfId
						}
					});
				} catch {}
			});
			conn.on("data", (raw) => {
				try {
					const msg = raw;
					if (msg?.t === "state" && msg.state) opts.onState(msg.state);
				} catch {}
			});
			conn.on("close", () => {
				if (destroyed) return;
				opts.onStatus?.("connecting");
				retryTimer = setTimeout(reconnect, 1200);
			});
			conn.on("error", () => {
				opts.onStatus?.("error");
			});
		});
		peer.on("error", () => {
			opts.onStatus?.("error");
			if (!destroyed) retryTimer = setTimeout(reconnect, 1500);
		});
	};
	const reconnect = () => {
		try {
			conn?.close();
		} catch {}
		try {
			peer?.destroy();
		} catch {}
		conn = null;
		peer = null;
		connect();
	};
	connect();
	return {
		destroy: () => {
			destroyed = true;
			if (retryTimer) clearTimeout(retryTimer);
			try {
				conn?.close();
			} catch {}
			try {
				peer?.destroy();
			} catch {}
		},
		broadcastState: () => {},
		sendAction: (payload) => {
			if (conn?.open) try {
				conn.send({
					t: "action",
					payload
				});
			} catch {}
		},
		connected: () => Boolean(conn?.open)
	};
}
function requireMap(preset) {
	return generateMap(preset);
}
function bump(state) {
	return {
		...state,
		version: state.version + 1
	};
}
function upsertSeat(state, seat) {
	const others = state.seats.filter((s) => s.peerId !== seat.peerId);
	return {
		...state,
		seats: [...others, seat]
	};
}
function newPeerId() {
	return `p-${Math.random().toString(36).slice(2, 10)}`;
}
function useTableSession(opts) {
	const code = opts.code.toUpperCase();
	const isDm = opts.role === "dm";
	const [selfId] = (0, import_react.useState)(newPeerId);
	const [state, setState] = (0, import_react.useState)(() => {
		const base = createTableState(code, opts.bootstrap?.tableName ?? "Table");
		if (!opts.bootstrap) return base;
		return {
			...base,
			name: opts.bootstrap.tableName ?? base.name,
			campaignId: opts.bootstrap.campaignId ?? null,
			campaignTitle: opts.bootstrap.campaignTitle ?? base.campaignTitle,
			sceneId: opts.bootstrap.sceneId ?? null,
			sceneTitle: opts.bootstrap.sceneTitle ?? "",
			settings: {
				...base.settings,
				...opts.bootstrap.settings ?? {},
				tableName: opts.bootstrap.tableName ?? base.settings.tableName
			},
			map: opts.bootstrap.mapPreset ? {
				...base.map,
				...requireMap(opts.bootstrap.mapPreset)
			} : base.map
		};
	});
	const [ready, setReady] = (0, import_react.useState)(isDm);
	const [joined, setJoined] = (0, import_react.useState)(false);
	const [waitingHint, setWaitingHint] = (0, import_react.useState)(false);
	/** none | ok | blocked | missing */
	const [syncStatus, setSyncStatus] = (0, import_react.useState)("none");
	const stateRef = (0, import_react.useRef)(state);
	stateRef.current = state;
	const readyRef = (0, import_react.useRef)(isDm);
	readyRef.current = ready;
	const actionCursor = (0, import_react.useRef)(0);
	const putting = (0, import_react.useRef)(false);
	const lastPutVersion = (0, import_react.useRef)(0);
	const peerRef = (0, import_react.useRef)(null);
	const handleActionRef = (0, import_react.useRef)(() => {});
	const publishState = (0, import_react.useCallback)(async (next) => {
		if (!isDm) return;
		putting.current = true;
		try {
			const res = await fetch("/api/table", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					op: "put",
					code,
					state: next,
					version: next.version
				})
			});
			if (res.status === 401 || res.status === 403) setSyncStatus("blocked");
			else if (res.ok) {
				lastPutVersion.current = next.version;
				setSyncStatus("ok");
			}
		} catch {} finally {
			putting.current = false;
		}
		try {
			peerRef.current?.broadcastState(next);
		} catch {}
	}, [code, isDm]);
	const applyAsDm = (0, import_react.useCallback)((fn) => {
		if (!isDm) return;
		setState((prev) => {
			const drafted = fn(prev);
			if (drafted === prev) return prev;
			const next = bump(drafted);
			stateRef.current = next;
			queueMicrotask(() => void publishState(next));
			return next;
		});
	}, [isDm, publishState]);
	const postAction = (0, import_react.useCallback)(async (payload) => {
		const full = {
			...payload,
			from: selfId
		};
		try {
			peerRef.current?.sendAction(full);
		} catch {}
		try {
			await fetch("/api/table", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					op: "action",
					code,
					payload: full
				})
			});
		} catch {}
	}, [code, selfId]);
	(0, import_react.useEffect)(() => {
		if (!isDm) return;
		const initial = bump({
			...stateRef.current,
			code,
			dmPeerId: selfId,
			seats: [{
				peerId: selfId,
				name: opts.displayName,
				role: "dm",
				characterId: null,
				connected: true,
				lastSeen: Date.now()
			}]
		});
		stateRef.current = initial;
		setState(initial);
		setReady(true);
		setJoined(true);
		publishState(initial);
		postAction({
			t: "hello",
			role: "dm",
			name: opts.displayName,
			peerId: selfId
		});
	}, [
		code,
		isDm,
		selfId
	]);
	(0, import_react.useEffect)(() => {
		if (isDm) return;
		setJoined(true);
		postAction({
			t: "hello",
			role: "player",
			name: opts.displayName,
			peerId: selfId
		});
		postAction({ t: "request-state" });
	}, [
		code,
		isDm,
		selfId
	]);
	const handleAction = (0, import_react.useCallback)((msg) => {
		if (!isDm) return;
		const from = msg.from ?? "";
		if (msg.t === "hello") {
			applyAsDm((s) => {
				const existing = s.seats.find((x) => x.peerId === msg.peerId);
				if (existing && existing.name === msg.name && existing.connected) return s;
				return upsertSeat(s, {
					peerId: msg.peerId,
					name: msg.name,
					role: msg.role === "dm" ? "player" : "player",
					characterId: existing?.characterId ?? null,
					connected: true,
					lastSeen: Date.now()
				});
			});
			return;
		}
		if (msg.t === "request-state") {
			publishState(stateRef.current);
			return;
		}
		if (msg.t === "player-upsert-sheet") {
			applyAsDm((s) => {
				const sheet = {
					...msg.sheet,
					ownerPeerId: from || msg.sheet.ownerPeerId
				};
				const characters = s.characters.some((c) => c.id === sheet.id) ? s.characters.map((c) => c.id === sheet.id ? sheet : c) : [...s.characters, sheet];
				const seats = s.seats.map((seat) => seat.peerId === sheet.ownerPeerId ? {
					...seat,
					characterId: sheet.id
				} : seat);
				let tokens = s.map.tokens;
				if (!tokens.some((t) => t.characterId === sheet.id)) tokens = [...tokens, {
					id: `tok-${sheet.id}`,
					label: sheet.name.slice(0, 3).toUpperCase(),
					kind: "pc",
					characterId: sheet.id,
					x: 2 + tokens.length % 6,
					y: 2 + Math.floor(tokens.length / 6),
					color: sheet.tokenColor,
					size: 1,
					hidden: false,
					hp: sheet.currentHp,
					maxHp: sheet.maxHp
				}];
				else tokens = tokens.map((t) => t.characterId === sheet.id ? {
					...t,
					label: sheet.name.slice(0, 3).toUpperCase(),
					color: sheet.tokenColor,
					hp: sheet.currentHp,
					maxHp: sheet.maxHp
				} : t);
				const withChars = {
					...s,
					characters,
					seats,
					map: {
						...s.map,
						tokens
					}
				};
				return syncCharacterDerived(withChars, sheet);
			});
			return;
		}
		if (msg.t === "player-roll") {
			applyAsDm((s) => ({
				...s,
				diceLog: [msg.entry, ...s.diceLog].slice(0, 40)
			}));
			return;
		}
		if (msg.t === "player-move-token") applyAsDm((s) => {
			if (!s.settings.allowPlayerTokenMove) return s;
			const token = s.map.tokens.find((t) => t.id === msg.tokenId);
			if (!token) return s;
			const sheet = s.characters.find((c) => c.id === token.characterId);
			if (!sheet || sheet.ownerPeerId !== from) return s;
			if (msg.x < 0 || msg.y < 0 || msg.x >= s.map.cols || msg.y >= s.map.rows) return s;
			if (s.map.tiles[msg.y * s.map.cols + msg.x] === 1) return s;
			return {
				...s,
				map: {
					...s.map,
					tokens: s.map.tokens.map((t) => t.id === msg.tokenId ? {
						...t,
						x: msg.x,
						y: msg.y
					} : t)
				}
			};
		});
	}, [
		isDm,
		applyAsDm,
		publishState
	]);
	handleActionRef.current = handleAction;
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (isDm) {
			const handle = startDmPeerSync({
				code,
				getState: () => stateRef.current,
				onAction: (payload) => {
					handleActionRef.current(payload);
					if (payload.t === "request-state" || payload.t === "hello") try {
						peerRef.current?.broadcastState(stateRef.current);
					} catch {}
				}
			});
			peerRef.current = handle;
			return () => {
				handle.destroy();
				if (peerRef.current === handle) peerRef.current = null;
			};
		}
		const handle = startPlayerPeerSync({
			code,
			selfId,
			displayName: opts.displayName,
			onState: (raw) => {
				const next = normalizeTableState(raw);
				setState(next);
				stateRef.current = next;
				readyRef.current = true;
				setReady(true);
				setWaitingHint(false);
				setSyncStatus("ok");
			},
			onStatus: (s) => {
				if (s === "error" || s === "connecting") {
					if (!readyRef.current) setWaitingHint(true);
				}
			}
		});
		peerRef.current = handle;
		return () => {
			handle.destroy();
			if (peerRef.current === handle) peerRef.current = null;
		};
	}, [
		code,
		isDm,
		selfId
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let timer = null;
		let beats = 0;
		const tick = async () => {
			if (cancelled) return;
			beats += 1;
			try {
				const since = isDm ? actionCursor.current : readyRef.current ? stateRef.current.version : 0;
				const res = await fetch(`/api/table?code=${encodeURIComponent(code)}&since=${since}`, { cache: "no-store" });
				if (res.status === 401 || res.status === 403) setSyncStatus("blocked");
				else if (res.ok) {
					const body = await res.json();
					if (!isDm) {
						if (body.state && typeof body.version === "number" && body.version > 0) {
							const next = normalizeTableState(body.state);
							setState(next);
							stateRef.current = next;
							readyRef.current = true;
							setReady(true);
							setWaitingHint(false);
							setSyncStatus("ok");
						} else if (!readyRef.current) {
							setWaitingHint(true);
							setSyncStatus(body.exists === false ? "missing" : "missing");
							if (beats % 3 === 0) {
								postAction({ t: "request-state" });
								postAction({
									t: "hello",
									role: "player",
									name: opts.displayName,
									peerId: selfId
								});
							}
						}
					}
					if (isDm) {
						setSyncStatus("ok");
						if (beats % 3 === 0) publishState(stateRef.current);
						if (body.actions?.length) {
							let maxId = actionCursor.current;
							for (const a of body.actions) {
								maxId = Math.max(maxId, a.id);
								handleAction(a.payload);
							}
							actionCursor.current = maxId;
							fetch("/api/table", {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									op: "ack",
									code,
									upTo: maxId
								})
							});
						}
					}
					if (!isDm && readyRef.current && beats % 8 === 0) postAction({
						t: "hello",
						role: "player",
						name: opts.displayName,
						peerId: selfId
					});
				}
			} catch {}
			const delay = isDm ? 700 : readyRef.current ? 800 : 400;
			if (!cancelled) timer = setTimeout(tick, delay);
		};
		timer = setTimeout(tick, 100);
		return () => {
			cancelled = true;
			if (timer) clearTimeout(timer);
		};
	}, [
		code,
		isDm,
		handleAction,
		postAction,
		publishState,
		opts.displayName,
		selfId
	]);
	const updateSheet = (0, import_react.useCallback)((sheet) => {
		if (isDm) applyAsDm((s) => {
			const characters = s.characters.some((c) => c.id === sheet.id) ? s.characters.map((c) => c.id === sheet.id ? sheet : c) : [...s.characters, sheet];
			return syncCharacterDerived({
				...s,
				characters
			}, sheet);
		});
		else {
			setState((s) => {
				const characters = s.characters.some((c) => c.id === sheet.id) ? s.characters.map((c) => c.id === sheet.id ? sheet : c) : [...s.characters, sheet];
				return {
					...s,
					characters
				};
			});
			postAction({
				t: "player-upsert-sheet",
				sheet
			});
		}
	}, [
		isDm,
		applyAsDm,
		postAction
	]);
	const createMySheet = (0, import_react.useCallback)(() => {
		const sheet = emptySheet(selfId, opts.displayName);
		updateSheet(sheet);
		return sheet;
	}, [
		selfId,
		opts.displayName,
		updateSheet
	]);
	const roll = (0, import_react.useCallback)((expression, label, secret = false) => {
		const { total, detail } = rollDice(expression);
		const entry = {
			id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			at: Date.now(),
			peerId: selfId,
			name: opts.displayName,
			expression: label ? `${label} (${expression})` : expression,
			detail,
			total,
			secret: secret && isDm
		};
		if (isDm) applyAsDm((s) => ({
			...s,
			diceLog: [entry, ...s.diceLog].slice(0, 40)
		}));
		else {
			postAction({
				t: "player-roll",
				entry
			});
			setState((s) => ({
				...s,
				diceLog: [entry, ...s.diceLog].slice(0, 40)
			}));
		}
		return entry;
	}, [
		isDm,
		applyAsDm,
		postAction,
		selfId,
		opts.displayName
	]);
	const moveToken = (0, import_react.useCallback)((tokenId, x, y) => {
		if (isDm) applyAsDm((s) => {
			if (x < 0 || y < 0 || x >= s.map.cols || y >= s.map.rows) return s;
			if (s.map.tiles[y * s.map.cols + x] === 1) return s;
			return {
				...s,
				map: {
					...s.map,
					tokens: s.map.tokens.map((t) => t.id === tokenId ? {
						...t,
						x,
						y
					} : t)
				}
			};
		});
		else postAction({
			t: "player-move-token",
			tokenId,
			x,
			y
		});
	}, [
		isDm,
		applyAsDm,
		postAction
	]);
	const dmSetState = (0, import_react.useCallback)((fn) => {
		if (!isDm) return;
		applyAsDm(fn);
	}, [isDm, applyAsDm]);
	const visibleDice = (0, import_react.useMemo)(() => {
		if (isDm) return state.diceLog;
		return state.diceLog.filter((d) => !d.secret);
	}, [state.diceLog, isDm]);
	const visibleTokens = (0, import_react.useMemo)(() => {
		if (isDm) return state.map.tokens;
		return state.map.tokens.filter((t) => !t.hidden);
	}, [state.map.tokens, isDm]);
	const mySheet = (0, import_react.useMemo)(() => state.characters.find((c) => c.ownerPeerId === selfId) ?? null, [state.characters, selfId]);
	return {
		selfId,
		peers: (0, import_react.useMemo)(() => state.seats.filter((s) => s.peerId !== selfId).map((s) => ({
			id: s.peerId,
			name: s.name,
			connectionState: s.connected ? "connected" : "disconnected",
			candidateType: null,
			rttMs: null
		})), [state.seats, selfId]),
		joined,
		ready,
		waitingHint,
		syncStatus,
		syncError: null,
		isDm,
		state,
		visibleDice,
		visibleTokens,
		mySheet,
		updateSheet,
		createMySheet,
		roll,
		moveToken,
		dmSetState
	};
}
var MAP_PRESETS = MAP_PRESET_META.filter((m) => m.id !== "custom");
function TablePage() {
	const { code } = Route.useParams();
	const search = Route.useSearch();
	const role = search.role === "dm" ? "dm" : "player";
	const [displayName] = (0, import_react.useState)(() => search.name?.trim() || (role === "dm" ? "Dungeon Master" : "Adventurer"));
	const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
	(0, import_react.useEffect)(() => {
		ensureSeeded();
	}, [ensureSeeded]);
	const bootstrapCamp = search.campaign ? resolveCampaign(search.campaign) : void 0;
	const session = useTableSession({
		code: code.toUpperCase(),
		role,
		displayName,
		bootstrap: role === "dm" ? {
			campaignId: bootstrapCamp?.id ?? (search.campaign || null),
			campaignTitle: bootstrapCamp?.title ?? (search.campaign ? "Campaign" : "Freeform session"),
			sceneId: bootstrapCamp?.scenes[0]?.id ?? null,
			sceneTitle: bootstrapCamp?.scenes[0]?.title ?? "",
			tableName: search.table || "Table",
			settings: {
				edition: search.edition || bootstrapCamp?.edition || "D&D 5e",
				levelBand: search.levels || bootstrapCamp?.levelRange || "1–5"
			},
			mapPreset: "dungeon"
		} : void 0
	});
	const campaign = (0, import_react.useMemo)(() => {
		const id = session.state.campaignId;
		return id ? resolveCampaign(id) : void 0;
	}, [session.state.campaignId, session.state.version]);
	const scene = campaign?.scenes.find((s) => s.id === session.state.sceneId);
	const [tab, setTab] = (0, import_react.useState)(role === "dm" ? "map" : "sheet");
	const [selectedToken, setSelectedToken] = (0, import_react.useState)(null);
	const [paintMode, setPaintMode] = (0, import_react.useState)(false);
	const [paintTile, setPaintTile] = (0, import_react.useState)(1);
	const [pendingDrop, setPendingDrop] = (0, import_react.useState)(null);
	const [mapCols, setMapCols] = (0, import_react.useState)(20);
	const [mapRows, setMapRows] = (0, import_react.useState)(14);
	const [mapName, setMapName] = (0, import_react.useState)("");
	const [privateNotes, setPrivateNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		document.title = `Grimoire · ${code.toUpperCase()}`;
	}, [code]);
	(0, import_react.useEffect)(() => {
		try {
			setPrivateNotes(localStorage.getItem(`grimoire-dm-notes-${code}`) ?? "");
		} catch {}
	}, [code]);
	(0, import_react.useEffect)(() => {
		if (role !== "dm") return;
		try {
			localStorage.setItem(`grimoire-dm-notes-${code}`, privateNotes);
		} catch {}
	}, [
		privateNotes,
		code,
		role
	]);
	const tableCode = code.toUpperCase();
	const inviteUrl = typeof window !== "undefined" ? `${window.location.origin}/join?code=${tableCode}` : `/join?code=${tableCode}`;
	async function copyInvite() {
		const message = [
			`Join my D&D table on Grimoire — no account needed.`,
			``,
			`Open this link: ${inviteUrl}`,
			`Or open Grimoire → Table → enter code: ${tableCode}`
		].join("\n");
		try {
			await navigator.clipboard.writeText(message);
			toast.success("Invite copied — paste it to your players");
		} catch {
			try {
				await navigator.clipboard.writeText(inviteUrl);
				toast.success("Invite link copied");
			} catch {
				toast.message(inviteUrl);
			}
		}
	}
	async function copyCodeOnly() {
		try {
			await navigator.clipboard.writeText(tableCode);
			toast.success(`Code ${tableCode} copied`);
		} catch {
			toast.message(tableCode);
		}
	}
	async function copyLinkOnly() {
		try {
			await navigator.clipboard.writeText(inviteUrl);
			toast.success("Join link copied");
		} catch {
			toast.message(inviteUrl);
		}
	}
	(0, import_react.useEffect)(() => {
		if (role !== "dm" || !session.joined) return;
		const key = `grimoire-share-tip-${tableCode}`;
		try {
			if (sessionStorage.getItem(key)) return;
			sessionStorage.setItem(key, "1");
		} catch {}
		toast.message("Table is live — use Invite to send players the link + code", { duration: 6e3 });
	}, [
		role,
		session.joined,
		tableCode
	]);
	if (!session.joined || !session.ready && role === "player") {
		const blocked = session.syncStatus === "blocked";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-h-dvh place-items-center bg-[var(--color-bg)] px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 text-center shadow-[var(--shadow-panel)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 size-10 animate-pulse rounded-full bg-[var(--color-bg-subtle)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold",
						children: blocked ? "Site login is blocking the table" : role === "player" ? "Looking for the table…" : "Opening your table…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-[var(--color-fg-muted)]",
						children: blocked ? "This deployment requires a Vercel login. The host must turn off Deployment Protection so anyone can open the link." : role === "player" ? session.waitingHint ? "No live table for this code yet. Your DM must Create table first, keep that tab open, then send Invite." : "Connecting to the DM’s table…" : "Starting the DM channel."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-mono text-lg tracking-[0.35em] text-[var(--color-steel)]",
						children: tableCode
					}),
					role === "player" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3 text-left text-xs text-[var(--color-fg-subtle)]",
						children: [blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[var(--radius-sm)] border border-[var(--color-warn)]/40 bg-[color-mix(in_oklab,var(--color-warn)_10%,transparent)] p-3 text-[var(--color-fg-muted)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-[var(--color-fg)]",
								children: "Tell your DM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "mt-1 list-decimal space-y-1 pl-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open the Vercel project for this app." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Settings → Deployment Protection → set to ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "None" }),
										" (or only protect Previews)."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Use the ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Production" }),
										" URL, not a protected Preview URL."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Re-send Invite after saving." })
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-[var(--color-fg-muted)]",
								children: "Checklist"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "list-decimal space-y-1 pl-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"DM opens Grimoire → ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Create table" }),
										" (same site as this link)."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"DM clicks ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Invite players" }),
										" and pastes you that message."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"You open ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "their" }),
										" link (not a different copy of the app)."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "DM leaves their table tab open." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pt-1",
								children: "Stay here — you join automatically when the table is live. If you were asked to “Sign in to Vercel”, that is a host settings issue (see above), not a Grimoire account."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-center gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/join",
									children: "Back to join"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "steel",
								onClick: () => window.location.reload(),
								children: "Retry"
							})]
						})]
					})
				]
			})
		});
	}
	const st = session.state;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_90%,transparent)] backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-3 py-2.5 sm:px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-base font-semibold tracking-tight text-[var(--color-fg)] no-underline",
							children: "Grimoire"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: role === "dm" ? "steel" : "outline",
							children: role === "dm" ? "Dungeon Master" : "Player"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden min-w-0 sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium text-[var(--color-fg)]",
								children: st.settings.tableName || st.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-[11px] text-[var(--color-fg-subtle)]",
								children: [
									st.campaignTitle,
									st.sceneTitle ? ` · ${st.sceneTitle}` : "",
									` · ${st.settings.edition}`
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TablePresence, {
								seats: st.seats,
								peers: session.peers,
								selfId: session.selfId,
								code: code.toUpperCase()
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "steel",
							onClick: copyInvite,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), "Invite players"]
						})
					]
				})
			}),
			role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-steel)_8%,var(--color-bg-elevated))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1600px] flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "mt-0.5 size-4 shrink-0 text-[var(--color-steel)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-[var(--color-fg)]",
									children: "Share this exact link — players need no account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 break-all font-mono text-xs text-[var(--color-fg-muted)]",
									children: inviteUrl
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-[var(--color-fg-subtle)]",
									children: [
										"Code",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono tracking-widest text-[var(--color-steel)]",
											children: tableCode
										}),
										" · ",
										"Keep this tab open · If players see “Sign in to Vercel”, turn off Deployment Protection on Production"
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "steel",
								onClick: copyInvite,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), "Copy invite"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: copyLinkOnly,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Link only"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: copyCodeOnly,
								children: "Code only"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid w-full max-w-[1600px] flex-1 gap-0 lg:grid-cols-[1fr_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 border-b border-[var(--color-border)] lg:border-b-0 lg:border-r",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						value: tab,
						onValueChange: setTab,
						className: "flex h-full flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-[var(--color-border)] px-3 py-2 sm:px-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "h-auto w-full justify-start gap-1 overflow-x-auto bg-transparent p-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "map",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, { className: "size-3.5" }), "Map"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "sheet",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5" }), "Sheet"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "party",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), "Party"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "combat",
											className: "gap-1.5 lg:hidden",
											children: "Combat"
										}),
										role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "module",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), "Module"]
										}),
										role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "tools",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }), "Tools"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "handouts",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-3.5" }), "Handouts"]
										}),
										role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "settings",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-3.5" }), "Settings"]
										}),
										role === "player" && st.settings.houseRules && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
											value: "rules",
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Rules"]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "map",
								className: "m-0 flex-1 p-3 sm:p-4",
								children: [
									role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-medium tracking-wide text-[var(--color-fg-subtle)] uppercase",
												children: "Map pack"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex max-w-full flex-wrap gap-1.5",
												children: MAP_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													size: "sm",
													variant: st.map.preset === p.id ? "steel" : "secondary",
													onClick: () => session.dmSetState((s) => ({
														...s,
														map: {
															...generateMap(p.id),
															tokens: s.map.tokens
														}
													})),
													title: p.group,
													children: p.label
												}, p.id))
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: mapCols,
													onChange: (e) => setMapCols(Number(e.target.value) || 10),
													className: "h-8 w-16",
													title: "Columns"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-[var(--color-fg-subtle)]",
													children: "×"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: mapRows,
													onChange: (e) => setMapRows(Number(e.target.value) || 8),
													className: "h-8 w-16",
													title: "Rows"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													size: "sm",
													variant: "outline",
													onClick: () => session.dmSetState((s) => ({
														...s,
														map: {
															...generateMap("blank", Math.min(40, Math.max(8, mapCols)), Math.min(30, Math.max(6, mapRows)), mapName || s.map.name),
															tokens: s.map.tokens,
															name: mapName || "Custom grid",
															preset: "custom"
														}
													})),
													children: "Resize"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: mapName,
													onChange: (e) => setMapName(e.target.value),
													placeholder: "Map name",
													className: "h-8 w-32",
													onBlur: () => {
														if (!mapName.trim()) return;
														session.dmSetState((s) => ({
															...s,
															map: {
																...s.map,
																name: mapName.trim()
															}
														}));
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													size: "sm",
													variant: paintMode ? "default" : "outline",
													onClick: () => setPaintMode((v) => !v),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-3.5" }), "Paint"]
												}),
												paintMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-1",
													children: [
														{
															t: 0,
															l: "Erase"
														},
														{
															t: 1,
															l: "Wall"
														},
														{
															t: 2,
															l: "Diff"
														},
														{
															t: 3,
															l: "Hazard"
														},
														{
															t: 4,
															l: "Door"
														},
														{
															t: 5,
															l: "Water"
														},
														{
															t: 6,
															l: "Cover"
														},
														{
															t: 7,
															l: "Pillar"
														}
													].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "button",
														size: "sm",
														variant: paintTile === x.t ? "steel" : "ghost",
														onClick: () => setPaintTile(x.t),
														children: x.l
													}, x.t))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													size: "sm",
													variant: "secondary",
													onClick: () => {
														const id = `tok-npc-${Date.now()}`;
														const token = {
															id,
															label: "NPC",
															kind: "monster",
															x: Math.floor(st.map.cols / 2),
															y: Math.floor(st.map.rows / 2),
															color: "#b45448",
															size: 1,
															hidden: false,
															hp: 20,
															maxHp: 20
														};
														session.dmSetState((s) => ({
															...s,
															map: {
																...s.map,
																tokens: [...s.map.tokens, token]
															}
														}));
														setSelectedToken(id);
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Token"]
												}),
												selectedToken && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													size: "sm",
													variant: "ghost",
													onClick: () => {
														session.dmSetState((s) => ({
															...s,
															map: {
																...s.map,
																tokens: s.map.tokens.map((t) => t.id === selectedToken ? {
																	...t,
																	hidden: !t.hidden
																} : t)
															}
														}));
													},
													children: [st.map.tokens.find((t) => t.id === selectedToken)?.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-3.5" }), "Hide"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													size: "sm",
													variant: "ghost",
													onClick: () => {
														session.dmSetState((s) => ({
															...s,
															map: {
																...s.map,
																tokens: s.map.tokens.filter((t) => t.id !== selectedToken)
															}
														}));
														setSelectedToken(null);
													},
													children: "Delete"
												})] })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BattleMap, {
										map: st.map,
										tokens: session.visibleTokens,
										isDm: session.isDm,
										selectedId: selectedToken,
										onSelect: (id) => {
											setSelectedToken(id);
											if (id) setPendingDrop(null);
										},
										onMove: session.moveToken,
										paintMode: paintMode && session.isDm && !pendingDrop,
										dropMode: !!pendingDrop && session.isDm,
										onDropAt: session.isDm && pendingDrop ? (x, y) => {
											const npc = pendingDrop;
											const size = /large|ogre|giant/i.test(npc.name) ? 2 : 1;
											const token = tokenFromNpc(npc, x, y, { size });
											session.dmSetState((s) => {
												const npcs = s.npcs.some((n) => n.id === npc.id) ? s.npcs : [...s.npcs, npc];
												const combat = s.combat.active ? {
													...s.combat,
													combatants: [...s.combat.combatants, {
														id: `cb-${token.id}`,
														name: npc.name,
														init: 10,
														isPc: false,
														tokenId: token.id,
														hp: npc.hp,
														maxHp: npc.maxHp,
														ac: npc.ac,
														conditions: [],
														active: false
													}]
												} : s.combat;
												return {
													...s,
													npcs,
													combat,
													map: {
														...s.map,
														tokens: [...s.map.tokens, token]
													}
												};
											});
											setSelectedToken(token.id);
											setPendingDrop(null);
											toast.success(`${npc.name} placed`);
										} : void 0,
										onPaint: session.isDm ? (x, y) => {
											session.dmSetState((s) => {
												const tiles = s.map.tiles.slice();
												const i = y * s.map.cols + x;
												if (i < 0 || i >= tiles.length) return s;
												tiles[i] = paintTile;
												return {
													...s,
													map: {
														...s.map,
														tiles
													}
												};
											});
										} : void 0
									}),
									role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid gap-3 lg:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncounterPalette, {
											customNpcs: st.npcs,
											pending: pendingDrop,
											onPick: (npc) => {
												setPaintMode(false);
												setPendingDrop(npc);
												toast.message(`Click the map to place ${npc.name}`);
											},
											onClear: () => setPendingDrop(null),
											onAddCustom: () => {
												const npc = emptyNpc({
													name: "Custom foe",
													cr: "1",
													hp: 20,
													maxHp: 20
												});
												session.dmSetState((s) => ({
													...s,
													npcs: [...s.npcs, npc]
												}));
												setPendingDrop(npc);
												toast.message("Custom foe ready — click map to place");
											},
											onDropCenter: () => {
												if (!pendingDrop) return;
												const x = Math.floor(st.map.cols / 2);
												const y = Math.floor(st.map.rows / 2);
												const npc = pendingDrop;
												const size = /large|ogre|giant/i.test(npc.name) ? 2 : 1;
												const token = tokenFromNpc(npc, x, y, { size });
												session.dmSetState((s) => {
													const npcs = s.npcs.some((n) => n.id === npc.id) ? s.npcs : [...s.npcs, npc];
													const combat = s.combat.active ? {
														...s.combat,
														combatants: [...s.combat.combatants, {
															id: `cb-${token.id}`,
															name: npc.name,
															init: 10,
															isPc: false,
															tokenId: token.id,
															hp: npc.hp,
															maxHp: npc.maxHp,
															ac: npc.ac,
															conditions: [],
															active: false
														}]
													} : s.combat;
													return {
														...s,
														npcs,
														combat,
														map: {
															...s.map,
															tokens: [...s.map.tokens, token]
														}
													};
												});
												setSelectedToken(token.id);
												setPendingDrop(null);
												toast.success(`${npc.name} placed`);
											}
										}), selectedToken && (() => {
											const tok = st.map.tokens.find((x) => x.id === selectedToken);
											if (!tok) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenInspector, {
												token: tok,
												isDm: true,
												onChange: (next) => {
													session.dmSetState((s) => ({
														...s,
														map: {
															...s.map,
															tokens: s.map.tokens.map((t) => t.id === next.id ? next : t)
														},
														combat: {
															...s.combat,
															combatants: s.combat.combatants.map((c) => c.tokenId === next.id ? {
																...c,
																name: next.name || c.name,
																hp: next.hp ?? c.hp,
																maxHp: next.maxHp ?? c.maxHp,
																ac: next.ac ?? c.ac,
																conditions: next.conditions ?? c.conditions
															} : c)
														},
														npcs: next.npcId ? s.npcs.map((n) => n.id === next.npcId ? {
															...n,
															name: next.name || n.name,
															hp: next.hp ?? n.hp,
															maxHp: next.maxHp ?? n.maxHp,
															ac: next.ac ?? n.ac,
															tokenColor: next.color,
															attacks: next.attacks ?? n.attacks,
															traits: next.notes ?? n.traits,
															cr: next.cr ?? n.cr
														} : n) : s.npcs
													}));
												},
												onDuplicate: () => {
													const copy = {
														...tok,
														id: `tok-copy-${Date.now()}`,
														x: Math.min(st.map.cols - tok.size, tok.x + 1),
														y: tok.y
													};
													session.dmSetState((s) => ({
														...s,
														map: {
															...s.map,
															tokens: [...s.map.tokens, copy]
														}
													}));
													setSelectedToken(copy.id);
													toast.success("Token duplicated");
												},
												onDelete: () => {
													session.dmSetState((s) => ({
														...s,
														map: {
															...s.map,
															tokens: s.map.tokens.filter((t) => t.id !== tok.id)
														},
														combat: {
															...s.combat,
															combatants: s.combat.combatants.filter((c) => c.tokenId !== tok.id)
														}
													}));
													setSelectedToken(null);
												},
												onRoll: (expr, label) => session.roll(expr, label, true)
											});
										})()]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "sheet",
								className: "m-0 flex-1 overflow-y-auto p-3 sm:p-4 scrollbar-thin",
								children: [!session.mySheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid place-items-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] px-4 py-16 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg font-semibold",
											children: "No character yet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 max-w-sm text-sm text-[var(--color-fg-muted)]",
											children: "Create a sheet for this table — works with any class, race, or homebrew."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											className: "mt-4",
											onClick: () => session.createMySheet(),
											children: "Create character"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-2xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-xl font-semibold",
											children: session.mySheet.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											children: session.mySheet.className
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterSheetPanel, {
										sheet: session.mySheet,
										editable: true,
										onChange: session.updateSheet,
										onRoll: (expr, label) => session.roll(expr, label)
									})]
								}), role === "dm" && st.characters.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto mt-8 max-w-2xl border-t border-[var(--color-border)] pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mb-3 font-display text-sm font-semibold uppercase tracking-wide text-[var(--color-fg-muted)]",
										children: "Party sheets"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4",
										children: st.characters.filter((c) => c.ownerPeerId !== session.selfId).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mb-2 text-sm text-[var(--color-fg-muted)]",
												children: [
													c.playerName,
													" · ",
													c.className,
													" · L",
													c.level
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterSheetPanel, {
												sheet: c,
												editable: true,
												compact: true,
												onChange: session.updateSheet,
												onRoll: (expr, label) => session.roll(expr, label)
											})]
										}, c.id))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "party",
								className: "m-0 max-h-[calc(100dvh-8rem)] overflow-y-auto p-3 sm:p-4 scrollbar-thin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto max-w-2xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyTracker, {
										characters: st.characters,
										seats: st.seats,
										isDm: session.isDm,
										selfId: session.selfId,
										onChange: (sheet) => {
											if (session.isDm) session.updateSheet(sheet);
											else if (sheet.ownerPeerId === session.selfId) session.updateSheet(sheet);
										},
										onRoll: (expr, label) => session.roll(expr, label, session.isDm)
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "combat",
								className: "m-0 p-3 sm:p-4 lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CombatTracker, {
									combat: st.combat,
									characters: st.characters,
									isDm: session.isDm,
									onChange: (combat) => session.dmSetState((s) => ({
										...s,
										combat
									}))
								})
							}),
							role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "module",
								className: "m-0 max-h-[calc(100dvh-8rem)] overflow-y-auto p-3 sm:p-4 scrollbar-thin",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 grid gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-[var(--color-fg-subtle)]",
											children: "Load campaign from library"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: st.campaignId ?? "",
											onChange: (e) => {
												const id = e.target.value || null;
												const c = id ? resolveCampaign(id) : void 0;
												session.dmSetState((s) => ({
													...s,
													campaignId: id,
													campaignTitle: c?.title ?? "Freeform session",
													sceneId: c?.scenes[0]?.id ?? null,
													sceneTitle: c?.scenes[0]?.title ?? "",
													settings: {
														...s.settings,
														edition: c?.edition ?? s.settings.edition,
														levelBand: c?.levelRange ?? s.settings.levelBand
													}
												}));
											},
											className: "flex h-10 w-full max-w-md rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Freeform (tools only)"
											}), useHomebrewStore.getState().listAll().map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: c.id,
												children: c.title
											}, c.id))]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										variant: "secondary",
										className: "w-fit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/library",
											children: "Manage library"
										})
									})]
								}), campaign ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 flex flex-wrap gap-2",
									children: campaign.scenes.map((sc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "sm",
										variant: st.sceneId === sc.id ? "steel" : "secondary",
										onClick: () => session.dmSetState((s) => ({
											...s,
											sceneId: sc.id,
											sceneTitle: sc.title
										})),
										children: [
											sc.number,
											". ",
											sc.shortTitle
										]
									}, sc.id))
								}), scene ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto grid max-w-3xl gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "steel",
											children: ["Scene ", scene.number]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-2 font-display text-2xl font-semibold",
											children: scene.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-[var(--color-fg-muted)]",
											children: scene.summary
										})
									] }), scene.sections.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRenderer, { section }, `${scene.id}-${i}`))]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-[var(--color-fg-muted)]",
									children: "Select a scene."
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] px-4 py-12 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-semibold",
										children: "Freeform table"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-2 max-w-md text-sm text-[var(--color-fg-muted)]",
										children: "No module loaded. Use Tools for NPCs, clocks, skill challenges, and loot — or pick any campaign from your library above."
									})]
								})]
							}),
							role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "tools",
								className: "m-0 max-h-[calc(100dvh-8rem)] overflow-y-auto p-3 sm:p-4 scrollbar-thin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto grid max-w-3xl gap-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NpcPanel, {
											npcs: st.npcs,
											onChange: (npcs) => session.dmSetState((s) => ({
												...s,
												npcs
											})),
											onRoll: (expr, label) => session.roll(expr, label, true),
											onSpawn: (npc) => {
												setTab("map");
												setPendingDrop(npc);
												toast.message(`Click the map to place ${npc.name}`);
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillChallengeTool, {
											challenge: st.skillChallenge,
											isDm: true,
											onChange: (skillChallenge) => session.dmSetState((s) => ({
												...s,
												skillChallenge
											}))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClocksPanel, {
											clocks: st.clocks,
											isDm: true,
											onChange: (clocks) => session.dmSetState((s) => ({
												...s,
												clocks
											}))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HazardsPanel, {
											hazards: st.hazards,
											isDm: true,
											onChange: (hazards) => session.dmSetState((s) => ({
												...s,
												hazards
											}))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsPanel, {
											characters: st.characters,
											onGrant: (characters, log) => {
												session.dmSetState((s) => {
													let next = {
														...s,
														characters,
														sessionLog: [log, ...s.sessionLog]
													};
													for (const ch of characters) if (s.characters.find((c) => c.id === ch.id) !== ch) next = {
														...next,
														map: {
															...next.map,
															tokens: next.map.tokens.map((t) => t.characterId === ch.id ? {
																...t,
																label: ch.name.slice(0, 3).toUpperCase(),
																name: ch.name,
																color: ch.tokenColor,
																hp: ch.currentHp,
																maxHp: ch.maxHp,
																ac: ch.ac,
																conditions: ch.conditions
															} : t)
														}
													};
													return next;
												});
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LootPanel, {
											loot: st.loot,
											isDm: true,
											onChange: (loot) => session.dmSetState((s) => ({
												...s,
												loot
											}))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionLogPanel, {
											log: st.sessionLog,
											isDm: true,
											onChange: (sessionLog) => session.dmSetState((s) => ({
												...s,
												sessionLog
											}))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DmNotesPanel, {
											notes: privateNotes,
											onChange: setPrivateNotes
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-sm font-semibold uppercase tracking-wide",
												children: "Shared party notes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												value: st.sharedNotes,
												onChange: (e) => session.dmSetState((s) => ({
													...s,
													sharedNotes: e.target.value
												})),
												className: "min-h-[80px]",
												placeholder: "Visible to everyone at the table…"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "sm",
												variant: "secondary",
												onClick: () => {
													session.dmSetState((s) => ({
														...s,
														sessionLog: [{
															id: `log-${Date.now()}`,
															at: Date.now(),
															text: `Short rest — ${s.settings.shortRestHint}`,
															kind: "rest"
														}, ...s.sessionLog]
													}));
													toast.message("Short rest logged");
												},
												children: "Log short rest"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "sm",
												variant: "secondary",
												onClick: () => {
													session.dmSetState((s) => ({
														...s,
														characters: s.characters.map((c) => ({
															...c,
															currentHp: c.maxHp
														})),
														sessionLog: [{
															id: `log-${Date.now()}`,
															at: Date.now(),
															text: `Long rest — ${s.settings.longRestHint}`,
															kind: "rest"
														}, ...s.sessionLog]
													}));
													toast.success("Long rest — party HP restored");
												},
												children: "Long rest (heal party)"
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "handouts",
								className: "m-0 overflow-y-auto p-3 sm:p-4 scrollbar-thin",
								children: [
									role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DmHandoutComposer, { onPublish: (title, body) => {
										session.dmSetState((s) => ({
											...s,
											handouts: [{
												id: `h-${Date.now()}`,
												title,
												body,
												createdAt: Date.now()
											}, ...s.handouts]
										}));
										toast.success("Handout shared");
									} }),
									st.sharedNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]",
											children: "Party notes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 whitespace-pre-wrap text-sm text-[var(--color-fg-muted)]",
											children: st.sharedNotes
										})]
									}),
									st.skillChallenge.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillChallengeTool, {
											challenge: st.skillChallenge,
											isDm: false,
											onChange: () => {}
										})
									}),
									(st.clocks.length > 0 || st.hazards.length > 0 || st.loot.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 grid gap-4",
										children: [
											st.clocks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClocksPanel, {
												clocks: st.clocks,
												isDm: false,
												onChange: () => {}
											}),
											st.hazards.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HazardsPanel, {
												hazards: st.hazards,
												isDm: false,
												onChange: () => {}
											}),
											st.loot.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LootPanel, {
												loot: st.loot,
												isDm: role === "dm",
												onChange: (loot) => session.dmSetState((s) => ({
													...s,
													loot
												}))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 grid gap-3",
										children: [st.handouts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] px-4 py-10 text-center text-sm text-[var(--color-fg-subtle)]",
											children: "No handouts yet. DM can share read-alouds, clues, and player-facing notes."
										}), st.handouts.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "rounded-[var(--radius-lg)] border border-[var(--color-readaloud-border)] bg-[var(--color-readaloud)] p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-base font-semibold",
												children: h.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-fg-muted)]",
												children: h.body
											})]
										}, h.id))]
									})
								]
							}),
							role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "settings",
								className: "m-0 overflow-y-auto p-3 sm:p-4 scrollbar-thin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mb-4 font-display text-xl font-semibold",
										children: "Table settings"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSettingsPanel, {
										settings: st.settings,
										onChange: (settings) => session.dmSetState((s) => ({
											...s,
											settings,
											name: settings.tableName || s.name
										}))
									})]
								})
							}),
							role === "player" && st.settings.houseRules && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "rules",
								className: "m-0 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg font-semibold",
										children: "House rules"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-[var(--color-fg-subtle)]",
										children: [
											st.settings.edition,
											" · ",
											st.settings.levelBand,
											" · progression: ",
											st.settings.xpMode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-fg-muted)]",
										children: st.settings.houseRules
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 grid gap-2 text-sm text-[var(--color-fg-muted)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-[var(--color-fg)]",
												children: "Short rest:"
											}),
											" ",
											st.settings.shortRestHint
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-[var(--color-fg)]",
												children: "Long rest:"
											}),
											" ",
											st.settings.longRestHint
										] })]
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "grid gap-0 bg-[color-mix(in_oklab,var(--color-bg-elevated)_55%,transparent)] lg:grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden min-h-0 flex-col border-b border-[var(--color-border)] lg:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrackers, {
							combat: st.combat,
							characters: st.characters,
							seats: st.seats,
							isDm: session.isDm,
							selfId: session.selfId,
							onCombat: (combat) => session.dmSetState((s) => ({
								...s,
								combat
							})),
							onSheet: (sheet) => {
								if (session.isDm) session.updateSheet(sheet);
								else if (sheet.ownerPeerId === session.selfId) session.updateSheet(sheet);
							},
							onRoll: (expr, label) => session.roll(expr, label, session.isDm)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 overflow-y-auto p-4 scrollbar-thin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedDice, {
							log: session.visibleDice,
							onRoll: session.roll,
							isDm: session.isDm
						})
					})]
				})]
			}),
			role === "dm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 sm:px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 text-xs text-[var(--color-fg-subtle)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-3.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DM tools active" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-40",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Module text stays on your device. Players see map, dice, combat, sheets, handouts, and whatever you reveal in Tools." })
					]
				})
			})
		]
	});
}
function DmHandoutComposer({ onPublish }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs font-medium tracking-wide text-[var(--color-fg-subtle)] uppercase",
			children: "Share with players"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Title",
					value: title,
					onChange: (e) => setTitle(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					placeholder: "Read-aloud, clue, or player-facing note…",
					value: body,
					onChange: (e) => setBody(e.target.value),
					className: "min-h-[88px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					disabled: !title.trim() || !body.trim(),
					onClick: () => {
						onPublish(title.trim(), body.trim());
						setTitle("");
						setBody("");
					},
					children: "Publish handout"
				})
			]
		})]
	});
}
function SidebarTrackers({ combat, characters, seats, isDm, selfId, onCombat, onSheet, onRoll }) {
	const [side, setSide] = (0, import_react.useState)("party");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-1 border-b border-[var(--color-border)] px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: side === "party" ? "steel" : "ghost",
				onClick: () => setSide("party"),
				children: "Party"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: side === "combat" ? "steel" : "ghost",
				onClick: () => setSide("combat"),
				children: "Combat"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto p-3 scrollbar-thin",
			children: side === "party" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyTracker, {
				characters,
				seats,
				isDm,
				selfId,
				compact: true,
				onChange: onSheet,
				onRoll
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CombatTracker, {
				combat,
				characters,
				isDm,
				onChange: onCombat
			})
		})]
	});
}
//#endregion
export { TablePage as component };
