//#region node_modules/.nitro/vite/services/ssr/assets/types-DaYGJmtc.js
function abilityMod(score) {
	return Math.floor((score - 10) / 2);
}
function defaultAbilities() {
	return {
		str: 15,
		dex: 14,
		con: 13,
		int: 12,
		wis: 10,
		cha: 8
	};
}
function emptySheet(ownerPeerId, playerName) {
	return {
		id: `c-${Math.random().toString(36).slice(2, 9)}`,
		ownerPeerId,
		name: "Unnamed Hero",
		playerName,
		className: "Fighter",
		race: "Human",
		background: "Soldier",
		level: 1,
		abilities: defaultAbilities(),
		maxHp: 12,
		currentHp: 12,
		tempHp: 0,
		ac: 16,
		speed: 30,
		proficiencyBonus: 2,
		initiativeMod: 2,
		skills: ["Athletics", "Perception"],
		attacks: [{
			name: "Longsword",
			bonus: 5,
			damage: "1d8+3"
		}],
		features: "",
		inventory: "Explorer's pack",
		items: [],
		gold: 0,
		notes: "",
		conditions: [],
		tokenColor: pickColor(ownerPeerId),
		inspiration: false,
		xp: 0,
		status: "active",
		effects: [],
		deathSaves: {
			successes: 0,
			failures: 0
		},
		spellSlots: "",
		hitDice: ""
	};
}
var COLORS = [
	"#8a9aad",
	"#b45448",
	"#6b8f71",
	"#c4a35a",
	"#9b8bb4",
	"#7a9bb8",
	"#d4a574"
];
function pickColor(seed) {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = h * 31 + seed.charCodeAt(i) >>> 0;
	return COLORS[h % COLORS.length];
}
function defaultSettings(tableName = "Table") {
	return {
		tableName,
		edition: "D&D 5e",
		levelBand: "1–5",
		allowPlayerTokenMove: true,
		revealEnemyHp: false,
		revealMonsterNames: true,
		houseRules: "",
		xpMode: "milestone",
		deathSavesPublic: false,
		shortRestHint: "1 hour · spend Hit Dice",
		longRestHint: "8 hours · recover HP, HD, slots"
	};
}
function emptySkillChallenge() {
	return {
		active: false,
		title: "Skill Challenge",
		goal: "",
		successesNeeded: 4,
		failuresAllowed: 3,
		successes: 0,
		failures: 0,
		log: [],
		resolved: null
	};
}
function emptyNpc(partial) {
	return {
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
			damage: "1d6+1",
			notes: "or 1d8+1 two-handed"
		}],
		traits: "",
		notes: "",
		tokenColor: "#b45448",
		...partial,
		id: partial?.id ?? `npc-${Math.random().toString(36).slice(2, 9)}`
	};
}
function tokenFromNpc(npc, x, y, opts) {
	return {
		id: `tok-${npc.id}-${Date.now().toString(36)}`,
		label: npc.name.slice(0, 3).toUpperCase(),
		name: npc.name,
		kind: "monster",
		npcId: npc.id,
		x,
		y,
		color: npc.tokenColor,
		size: opts?.size ?? 1,
		hidden: opts?.hidden ?? false,
		hp: npc.hp,
		maxHp: npc.maxHp,
		ac: npc.ac,
		cr: npc.cr,
		notes: npc.traits || npc.notes,
		attacks: npc.attacks,
		speed: npc.speed,
		conditions: []
	};
}
function emptyMap(preset = "blank", cols = 20, rows = 14, name) {
	const tiles = new Array(cols * rows).fill(0);
	if (preset !== "blank" && preset !== "custom" && preset !== "outdoor" && preset !== "forest" && preset !== "cave") {
		for (let x = 0; x < cols; x++) {
			tiles[x] = 1;
			tiles[(rows - 1) * cols + x] = 1;
		}
		for (let y = 0; y < rows; y++) {
			tiles[y * cols] = 1;
			tiles[y * cols + cols - 1] = 1;
		}
	}
	return {
		cols,
		rows,
		cellSize: 36,
		name: name ?? "Map",
		tiles,
		tokens: [],
		preset
	};
}
function createTableState(code, name = "Table") {
	return {
		version: 1,
		code,
		name,
		dmPeerId: null,
		campaignId: null,
		campaignTitle: "Freeform session",
		sceneId: null,
		sceneTitle: "",
		seats: [],
		characters: [],
		map: emptyMap("blank"),
		combat: {
			active: false,
			round: 1,
			combatants: []
		},
		diceLog: [],
		handouts: [],
		sharedNotes: "",
		dmNotes: "",
		settings: defaultSettings(name),
		npcs: [],
		loot: [],
		sessionLog: [],
		clocks: [],
		skillChallenge: emptySkillChallenge(),
		hazards: []
	};
}
/** Migrate older table payloads so UI never crashes on missing fields. */
function normalizeTableState(raw) {
	const base = createTableState(raw.code ?? "TABLE", raw.name ?? raw.settings?.tableName ?? "Table");
	return {
		...base,
		...raw,
		settings: {
			...base.settings,
			...raw.settings ?? {}
		},
		map: raw.map ? {
			...base.map,
			...raw.map,
			tokens: raw.map.tokens ?? [],
			tiles: raw.map.tiles ?? base.map.tiles
		} : base.map,
		combat: raw.combat ?? base.combat,
		skillChallenge: {
			...base.skillChallenge,
			...raw.skillChallenge ?? {}
		},
		characters: raw.characters ?? [],
		seats: raw.seats ?? [],
		diceLog: raw.diceLog ?? [],
		handouts: raw.handouts ?? [],
		npcs: raw.npcs ?? [],
		loot: raw.loot ?? [],
		sessionLog: raw.sessionLog ?? [],
		clocks: raw.clocks ?? [],
		hazards: raw.hazards ?? (raw.runestones ? raw.runestones.map((shattered, i) => ({
			id: `rs-${i}`,
			name: `Runestone ${i + 1}`,
			count: shattered ? 1 : 0,
			max: 1,
			notes: "Shatter to weaken the seal"
		})) : []),
		campaignId: raw.campaignId ?? null,
		campaignTitle: raw.campaignTitle ?? (raw.campaignId ? "Campaign" : "Freeform session"),
		sceneId: raw.sceneId ?? null,
		sceneTitle: raw.sceneTitle ?? "",
		sharedNotes: raw.sharedNotes ?? "",
		dmNotes: raw.dmNotes ?? "",
		version: raw.version ?? 1
	};
}
function rollDice(expression) {
	const cleaned = expression.trim().toLowerCase().replace(/\s+/g, "");
	const m = cleaned.match(/^(\d*)d(\d+)([+-]\d+)?$/);
	if (!m) {
		const n = Number(cleaned);
		if (!Number.isNaN(n)) return {
			total: n,
			detail: String(n)
		};
		return {
			total: 0,
			detail: "invalid"
		};
	}
	const count = m[1] ? parseInt(m[1], 10) : 1;
	const sides = parseInt(m[2], 10);
	const mod = m[3] ? parseInt(m[3], 10) : 0;
	const rolls = [];
	for (let i = 0; i < Math.min(count, 40); i++) rolls.push(Math.floor(Math.random() * sides) + 1);
	const sum = rolls.reduce((a, b) => a + b, 0) + mod;
	return {
		total: sum,
		detail: rolls.join("+") + (mod ? mod > 0 ? `+${mod}` : `${mod}` : "") + ` = ${sum}`
	};
}
function makeCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let s = "";
	for (let i = 0; i < 6; i++) s += alphabet[Math.floor(Math.random() * 32)];
	return s;
}
var CONDITIONS_5E = [
	"Blinded",
	"Charmed",
	"Deafened",
	"Frightened",
	"Grappled",
	"Incapacitated",
	"Invisible",
	"Paralyzed",
	"Petrified",
	"Poisoned",
	"Prone",
	"Restrained",
	"Stunned",
	"Unconscious",
	"Exhaustion"
];
var COMMON_EFFECTS = [
	{
		name: "Bless",
		kind: "buff",
		duration: "1 min"
	},
	{
		name: "Bane",
		kind: "debuff",
		duration: "1 min"
	},
	{
		name: "Haste",
		kind: "buff",
		duration: "1 min · concentration"
	},
	{
		name: "Slow",
		kind: "debuff",
		duration: "1 min · concentration"
	},
	{
		name: "Hex",
		kind: "debuff",
		duration: "1 hr · concentration"
	},
	{
		name: "Hunter's Mark",
		kind: "buff",
		duration: "1 hr · concentration"
	},
	{
		name: "Shield of Faith",
		kind: "buff",
		duration: "10 min · concentration"
	},
	{
		name: "Barkskin",
		kind: "buff",
		duration: "1 hr · concentration"
	},
	{
		name: "Invisibility",
		kind: "buff",
		duration: "1 hr · concentration"
	},
	{
		name: "Faerie Fire",
		kind: "debuff",
		duration: "1 min · concentration"
	},
	{
		name: "Guidance",
		kind: "buff",
		duration: "1 min · concentration"
	},
	{
		name: "Resistance",
		kind: "buff",
		duration: "1 min · concentration"
	},
	{
		name: "Inspiration",
		kind: "buff",
		duration: "until used"
	},
	{
		name: "Rage",
		kind: "buff",
		duration: "1 min"
	},
	{
		name: "Concentration",
		kind: "other",
		duration: "active"
	},
	{
		name: "Exhaustion 1",
		kind: "debuff",
		duration: "until rest"
	}
];
function newEffect(partial) {
	return {
		id: `fx-${Math.random().toString(36).slice(2, 9)}`,
		kind: "buff",
		duration: "",
		source: "",
		notes: "",
		...partial
	};
}
function emptyInventoryItem(partial) {
	return {
		name: "Mysterious Item",
		qty: 1,
		rarity: "common",
		category: "gear",
		description: "",
		attunement: false,
		equipped: false,
		value: "",
		weight: "",
		notes: "",
		...partial,
		id: partial?.id ?? `it-${Math.random().toString(36).slice(2, 9)}`
	};
}
/** Apply a DM reward onto a character sheet. */
function applyRewardToSheet(sheet, reward, grantedBy = "DM") {
	const next = {
		...sheet,
		items: [...sheet.items ?? []],
		gold: sheet.gold ?? 0,
		xp: sheet.xp ?? 0,
		attacks: [...sheet.attacks]
	};
	if (reward.kind === "item" && reward.item) {
		const item = {
			...reward.item,
			id: reward.item.id || `it-${Math.random().toString(36).slice(2, 9)}`,
			grantedAt: Date.now(),
			grantedBy
		};
		const existing = next.items.find((i) => i.name === item.name && i.description === item.description && i.rarity === item.rarity && !i.attunement);
		if (existing && item.qty > 0) next.items = next.items.map((i) => i.id === existing.id ? {
			...i,
			qty: i.qty + item.qty
		} : i);
		else next.items = [...next.items, item];
		const line = `${item.qty > 1 ? `${item.qty}× ` : ""}${item.name}`;
		next.inventory = next.inventory ? `${next.inventory}
${line}` : line;
		if (reward.addAsAttack && (item.category === "weapon" || item.damage || item.attackBonus != null)) next.attacks = [...next.attacks, {
			name: item.name,
			bonus: item.attackBonus ?? sheet.proficiencyBonus + abilityMod(sheet.abilities.str),
			damage: item.damage || "1d8"
		}];
	}
	if (reward.kind === "gold" || reward.gold && reward.gold !== 0) {
		const g = reward.gold ?? 0;
		next.gold = (next.gold ?? 0) + g;
		if (g !== 0) {
			const line = g > 0 ? `+${g} gp` : `${g} gp`;
			next.inventory = next.inventory ? `${next.inventory}
${line}` : line;
		}
	}
	if (reward.kind === "xp" || reward.xp && reward.xp !== 0) next.xp = (next.xp ?? 0) + (reward.xp ?? 0);
	if (reward.kind === "inspiration") next.inspiration = true;
	if (reward.kind === "feature" && reward.featureText?.trim()) {
		const block = reward.featureText.trim();
		next.features = next.features ? `${next.features}

${block}` : block;
	}
	return next;
}
/** Keep map tokens + combat rows in sync when a party sheet changes. */
function syncCharacterDerived(state, sheet) {
	const map = {
		...state.map,
		tokens: state.map.tokens.map((t) => t.characterId === sheet.id ? {
			...t,
			label: sheet.name.slice(0, 3).toUpperCase(),
			name: sheet.name,
			color: sheet.tokenColor,
			hp: sheet.currentHp,
			maxHp: sheet.maxHp,
			ac: sheet.ac,
			conditions: sheet.conditions
		} : t)
	};
	const combat = {
		...state.combat,
		combatants: state.combat.combatants.map((c) => c.characterId === sheet.id ? {
			...c,
			name: sheet.name,
			hp: sheet.currentHp,
			maxHp: sheet.maxHp,
			ac: sheet.ac,
			conditions: sheet.conditions
		} : c)
	};
	return {
		...state,
		map,
		combat
	};
}
//#endregion
export { createTableState as a, emptySheet as c, normalizeTableState as d, rollDice as f, applyRewardToSheet as i, makeCode as l, tokenFromNpc as m, CONDITIONS_5E as n, emptyInventoryItem as o, syncCharacterDerived as p, abilityMod as r, emptyNpc as s, COMMON_EFFECTS as t, newEffect as u };
