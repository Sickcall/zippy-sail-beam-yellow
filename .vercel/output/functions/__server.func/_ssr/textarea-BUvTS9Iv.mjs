import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-C8CvZtyd.mjs";
import { A as Info, F as Eye, N as GitBranch, T as MessageSquareQuote, U as Check, W as BookOpen, _ as ScrollText, d as Swords, i as Users, j as Hexagon, n as X, p as Sparkles, u as Target, y as RotateCcw } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DsIz5tIR.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-BUvTS9Iv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Progress({ className, value, indicatorClassName, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-bg-subtle)]", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: cn("h-full w-full flex-1 rounded-full bg-[var(--color-steel)] transition-transform duration-300 ease-out", indicatorClassName),
			style: { transform: `translateX(-${100 - (value || 0)}%)` }
		})
	});
}
var emptySkill = {
	successes: 0,
	failures: 0,
	log: [],
	resolved: null
};
var emptyRunes = {
	shattered: [
		false,
		false,
		false,
		false
	],
	notes: ""
};
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
var useSessionStore = create()(persist((set, get) => ({
	campaignId: null,
	sceneId: null,
	completedScenes: [],
	party: [],
	initiative: [],
	initiativeRound: 1,
	skillChallenge: { ...emptySkill },
	runestones: {
		...emptyRunes,
		shattered: [...emptyRunes.shattered]
	},
	sessionNotes: "",
	privateNotes: "",
	diceLog: [],
	setCampaign: (id) => set({ campaignId: id }),
	setScene: (id) => set({ sceneId: id }),
	markSceneComplete: (id) => set((s) => ({ completedScenes: s.completedScenes.includes(id) ? s.completedScenes : [...s.completedScenes, id] })),
	addPartyMember: (member) => set((s) => ({ party: [...s.party, {
		...member,
		id: uid()
	}] })),
	updatePartyMember: (id, patch) => set((s) => ({ party: s.party.map((p) => p.id === id ? {
		...p,
		...patch
	} : p) })),
	removePartyMember: (id) => set((s) => ({ party: s.party.filter((p) => p.id !== id) })),
	setInitiative: (entries) => set({ initiative: entries }),
	sortInitiative: () => set((s) => {
		return { initiative: [...s.initiative].sort((a, b) => b.init - a.init).map((e, i) => ({
			...e,
			active: i === 0
		})) };
	}),
	nextInitiative: () => set((s) => {
		if (s.initiative.length === 0) return s;
		const idx = s.initiative.findIndex((e) => e.active);
		const next = idx < 0 ? 0 : (idx + 1) % s.initiative.length;
		return {
			initiativeRound: next === 0 ? s.initiativeRound + 1 : s.initiativeRound,
			initiative: s.initiative.map((e, i) => ({
				...e,
				active: i === next
			}))
		};
	}),
	clearInitiative: () => set({
		initiative: [],
		initiativeRound: 1
	}),
	skillSuccess: (label) => set((s) => {
		if (s.skillChallenge.resolved) return s;
		const successes = s.skillChallenge.successes + 1;
		const resolved = successes >= 3 ? "success" : null;
		return { skillChallenge: {
			...s.skillChallenge,
			successes,
			resolved,
			log: [...s.skillChallenge.log, `Success${label ? `: ${label}` : ""} (${successes}/3)`]
		} };
	}),
	skillFailure: (label) => set((s) => {
		if (s.skillChallenge.resolved) return s;
		const failures = s.skillChallenge.failures + 1;
		const resolved = failures >= 2 ? "failure" : null;
		return { skillChallenge: {
			...s.skillChallenge,
			failures,
			resolved,
			log: [...s.skillChallenge.log, `Failure${label ? `: ${label}` : ""} (${failures}/2)`]
		} };
	}),
	resetSkillChallenge: () => set({ skillChallenge: {
		...emptySkill,
		log: []
	} }),
	shatterRunestone: (index) => set((s) => {
		const shattered = [...s.runestones.shattered];
		shattered[index] = true;
		return { runestones: {
			...s.runestones,
			shattered
		} };
	}),
	restoreRunestone: (index) => set((s) => {
		const shattered = [...s.runestones.shattered];
		shattered[index] = false;
		return { runestones: {
			...s.runestones,
			shattered
		} };
	}),
	resetRunestones: () => set({ runestones: {
		notes: "",
		shattered: [
			false,
			false,
			false,
			false
		]
	} }),
	setSessionNotes: (text) => set({ sessionNotes: text }),
	setPrivateNotes: (text) => set({ privateNotes: text }),
	pushDice: (entry) => set((s) => ({ diceLog: [entry, ...s.diceLog].slice(0, 20) })),
	resetSession: () => {
		const { campaignId } = get();
		set({
			campaignId,
			sceneId: null,
			completedScenes: [],
			party: [],
			initiative: [],
			initiativeRound: 1,
			skillChallenge: {
				...emptySkill,
				log: []
			},
			runestones: {
				notes: "",
				shattered: [
					false,
					false,
					false,
					false
				]
			},
			sessionNotes: "",
			privateNotes: "",
			diceLog: []
		});
	}
}), { name: "grimoire-session-v1" }));
function SkillChallengePanel({ challenge }) {
	const skill = useSessionStore((s) => s.skillChallenge);
	const skillSuccess = useSessionStore((s) => s.skillSuccess);
	const skillFailure = useSessionStore((s) => s.skillFailure);
	const resetSkillChallenge = useSessionStore((s) => s.resetSkillChallenge);
	const successPct = skill.successes / challenge.successesNeeded * 100;
	const failPct = skill.failures / challenge.failuresAllowed * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-lg)] border border-[color-mix(in_oklab,var(--color-warn)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-warn)_5%,var(--color-bg-elevated))] p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2 text-[var(--color-warn)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-sm font-semibold tracking-wide uppercase",
							children: "Skill challenge"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-xl font-semibold text-[var(--color-fg)]",
						children: challenge.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-2xl text-sm text-[var(--color-fg-muted)]",
						children: challenge.goal
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: resetSkillChallenge,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between text-xs text-[var(--color-fg-muted)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Successes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-[var(--color-success)]",
							children: [
								skill.successes,
								" / ",
								challenge.successesNeeded
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: successPct,
						indicatorClassName: "bg-[var(--color-success)]"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between text-xs text-[var(--color-fg-muted)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Failures" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-[var(--color-danger)]",
							children: [
								skill.failures,
								" / ",
								challenge.failuresAllowed
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: failPct,
						indicatorClassName: "bg-[var(--color-danger)]"
					})]
				})]
			}),
			skill.resolved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mb-4 rounded-[var(--radius-md)] border p-3.5 text-sm leading-relaxed", skill.resolved === "success" ? "border-[color-mix(in_oklab,var(--color-success)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-bg))] text-[var(--color-fg)]" : "border-[color-mix(in_oklab,var(--color-danger)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_10%,var(--color-bg))] text-[var(--color-fg)]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 font-medium",
					children: skill.resolved === "success" ? "Total success" : "Total failure"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[var(--color-fg-muted)]",
					children: skill.resolved === "success" ? challenge.successOutcome : challenge.failureOutcome
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 grid gap-2",
				children: challenge.checks.map((check) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-[var(--color-fg)]",
								children: check.skill
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								children: ["DC ", check.dc]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-[var(--color-fg-muted)] sm:text-sm",
							children: check.description
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							disabled: !!skill.resolved,
							onClick: () => skillSuccess(check.skill),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-[var(--color-success)]" }), "Pass"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							disabled: !!skill.resolved,
							onClick: () => skillFailure(check.skill),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5 text-[var(--color-danger)]" }), "Fail"]
						})]
					})]
				}, check.skill))
			}),
			skill.log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs font-medium tracking-wide text-[var(--color-fg-subtle)] uppercase",
					children: "Roll log"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-0.5 text-xs text-[var(--color-fg-muted)]",
					children: skill.log.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "tabular-nums",
						children: entry
					}, `${entry}-${i}`))
				})]
			})
		]
	});
}
function RunestoneTracker({ hazard }) {
	const runestones = useSessionStore((s) => s.runestones);
	const shatterRunestone = useSessionStore((s) => s.shatterRunestone);
	const restoreRunestone = useSessionStore((s) => s.restoreRunestone);
	const resetRunestones = useSessionStore((s) => s.resetRunestones);
	const shatteredCount = runestones.shattered.filter(Boolean).length;
	const sealBroken = shatteredCount >= hazard.shatterThreshold;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-lg)] border border-[color-mix(in_oklab,var(--color-rune)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-rune)_6%,var(--color-bg-elevated))] p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2 text-[var(--color-rune)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-sm font-semibold tracking-wide uppercase",
							children: "Arena hazard"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-xl font-semibold text-[var(--color-fg)]",
						children: hazard.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-2xl text-sm text-[var(--color-fg-muted)]",
						children: hazard.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "steel",
								children: ["AC ", hazard.ac]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "steel",
								children: [hazard.hp, " HP"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								children: [
									"Shatter ",
									hazard.shatterThreshold,
									" of ",
									hazard.count,
									" to break seal"
								]
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: resetRunestones,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: runestones.shattered.map((shattered, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => shattered ? restoreRunestone(i) : shatterRunestone(i),
					className: cn("group flex flex-col items-center gap-2 rounded-[var(--radius-md)] border p-4 transition-colors", shattered ? "border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_12%,var(--color-bg))]" : "border-[color-mix(in_oklab,var(--color-rune)_40%,var(--color-border))] bg-[var(--color-bg)] hover:bg-[color-mix(in_oklab,var(--color-rune)_10%,var(--color-bg))]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, {
							className: cn("size-10 transition-opacity", shattered ? "text-[var(--color-danger)] opacity-50" : "text-[var(--color-rune)]"),
							strokeWidth: 1.25,
							fill: shattered ? "currentColor" : "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-[var(--color-fg-muted)]",
							children: ["Stone ", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[10px] tracking-wide uppercase", shattered ? "text-[var(--color-danger)]" : "text-[var(--color-rune)]"),
							children: shattered ? "Shattered" : "Intact"
						})
					]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mb-4 rounded-[var(--radius-md)] border px-3.5 py-2.5 text-sm", sealBroken ? "border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_12%,var(--color-bg))] text-[var(--color-fg)]" : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg-muted)]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-medium tabular-nums",
					children: [
						"Seal integrity: ",
						hazard.count - shatteredCount,
						" / ",
						hazard.count,
						" stones intact"
					]
				}), sealBroken && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[var(--color-fg-muted)]",
					children: "Threshold met — the final gladiator falls, the arena quakes, and the cliffhanger sequence triggers immediately."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: hazard.mechanics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-sm font-medium text-[var(--color-fg)]",
						children: m.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-[var(--color-fg-muted)]",
						children: m.text
					})]
				}, m.name))
			})
		]
	});
}
function SectionShell({ icon, title, children, className, accent = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-[var(--radius-lg)] border p-4 sm:p-5", {
			default: "border-[var(--color-border)] bg-[var(--color-bg-elevated)]",
			read: "border-[var(--color-readaloud-border)] bg-[var(--color-readaloud)]",
			dm: "border-[color-mix(in_oklab,var(--color-steel)_30%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-steel)_6%,var(--color-bg-elevated))]",
			danger: "border-[color-mix(in_oklab,var(--color-danger)_35%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_6%,var(--color-bg-elevated))]",
			steel: "border-[color-mix(in_oklab,var(--color-steel)_28%,var(--color-border))] bg-[var(--color-bg-elevated)]"
		}[accent], className),
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2 text-[var(--color-fg-muted)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "opacity-80",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase",
				children: title
			})]
		}), children]
	});
}
function ReadAloudBlock({ title, text }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
		title: title ?? "Read-aloud",
		accent: "read",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base leading-relaxed whitespace-pre-wrap text-[var(--color-fg)] sm:text-lg",
				children: text
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: copy,
					children: copied ? "Copied" : "Copy text"
				})
			})]
		})
	});
}
function SectionRenderer({ section }) {
	switch (section.type) {
		case "readAloud": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadAloudBlock, {
			title: section.title,
			text: section.text
		});
		case "dmGuidance": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" }),
			title: section.title ?? "DM guidance",
			accent: "dm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-fg-muted)] sm:text-[0.95rem]",
				children: section.text
			})
		});
		case "prose": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-4" }),
			title: section.title,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-fg-muted)] sm:text-[0.95rem]",
				children: section.text
			})
		});
		case "openFloor": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
			title: section.title ?? "Open the floor",
			accent: "steel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-fg)]",
				children: section.text
			})
		});
		case "sensory": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }),
			title: section.title ?? "Sensory prompts",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: section.prompts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "steel",
							children: p.classLabel
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-[var(--color-fg-muted)]",
						children: p.text
					})]
				}, p.classLabel))
			})
		});
		case "explore": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }),
			title: section.title ?? "Environment",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-base font-semibold text-[var(--color-fg)]",
							children: item.title
						}), item.check && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: item.check
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-[var(--color-fg-muted)]",
						children: item.text
					})]
				}, item.title))
			})
		});
		case "branches": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-4" }),
			title: section.title ?? "Branching outcomes",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: section.branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-[var(--color-steel)]",
						children: b.condition
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-[var(--color-fg-muted)]",
						children: b.outcome
					})]
				}, b.condition))
			})
		});
		case "skillChallenge": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillChallengePanel, { challenge: section.challenge });
		case "runestones": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunestoneTracker, { hazard: section.hazard });
		case "dialogue": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareQuote, { className: "size-4" }),
			title: section.title ?? "Dialogue",
			accent: "read",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4",
				children: section.lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "border-l-2 border-[var(--color-border-strong)] pl-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex flex-wrap items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-display text-base font-semibold", line.speaker.includes("Mystra") ? "text-[var(--color-steel)]" : line.speaker.includes("Grundy") ? "text-[var(--color-danger)]" : "text-[var(--color-fg)]"),
							children: line.speaker
						}), line.stageDirection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs italic text-[var(--color-fg-subtle)]",
							children: line.stageDirection
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-base leading-relaxed text-[var(--color-fg)]",
						children: [
							"“",
							line.line,
							"”"
						]
					})]
				}, `${line.speaker}-${i}`))
			})
		});
		case "bullets": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" }),
			title: section.title,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-2.5",
				children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg-muted)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-border-strong)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			})
		});
		default: return null;
	}
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-[88px] w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-steel)]/40 disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as n, useSessionStore as r, SectionRenderer as t };
