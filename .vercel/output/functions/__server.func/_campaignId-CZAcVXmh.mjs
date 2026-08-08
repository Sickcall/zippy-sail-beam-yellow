import { o as __toESM } from "./_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./_ssr/button-C8CvZtyd.mjs";
import { A as notFound, h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as Menu, H as ChevronLeft, K as ArrowRight, R as Dices, S as PanelRightClose, U as Check, V as ChevronRight, b as Plus, d as Swords, f as StickyNote, i as Users, l as Trash2, n as X, q as ArrowLeft, w as NotebookPen, x as PanelRightOpen, y as RotateCcw } from "./_libs/lucide-react.mjs";
import { t as Badge } from "./_ssr/badge-DsIz5tIR.mjs";
import { t as Separator } from "./_ssr/separator-DBuOjlkl.mjs";
import { n as getCampaign } from "./_ssr/campaigns-BjJzF5PR.mjs";
import { t as Route } from "./_campaignId-tmtvaDhj.mjs";
import { t as Input } from "./_ssr/input-AFaF5Jsv.mjs";
import { n as Textarea, r as useSessionStore, t as SectionRenderer } from "./_ssr/textarea-BUvTS9Iv.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-DdOKQ1TP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_campaignId-CZAcVXmh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function roll(sides) {
	return Math.floor(Math.random() * sides) + 1;
}
var DICE = [
	4,
	6,
	8,
	10,
	12,
	20,
	100
];
function DicePanel() {
	const diceLog = useSessionStore((s) => s.diceLog);
	const pushDice = useSessionStore((s) => s.pushDice);
	function onRoll(sides) {
		const result = roll(sides);
		const stamp = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		});
		pushDice(`${stamp}  d${sides} → ${result}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[var(--color-fg-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase",
					children: "Dice"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: DICE.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					className: "tabular-nums",
					onClick: () => onRoll(d),
					children: ["d", d]
				}, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto scrollbar-thin rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2",
				children: diceLog.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-4 text-center text-xs text-[var(--color-fg-subtle)]",
					children: "No rolls yet"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: diceLog.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "font-mono text-xs tabular-nums text-[var(--color-fg-muted)]",
						children: entry
					}, `${entry}-${i}`))
				})
			})
		]
	});
}
function InitiativePanel() {
	const initiative = useSessionStore((s) => s.initiative);
	const initiativeRound = useSessionStore((s) => s.initiativeRound);
	const setInitiative = useSessionStore((s) => s.setInitiative);
	const sortInitiative = useSessionStore((s) => s.sortInitiative);
	const nextInitiative = useSessionStore((s) => s.nextInitiative);
	const clearInitiative = useSessionStore((s) => s.clearInitiative);
	const party = useSessionStore((s) => s.party);
	const [name, setName] = (0, import_react.useState)("");
	const [init, setInit] = (0, import_react.useState)("10");
	function addEntry(entryName, isPc, initVal = 10) {
		const next = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			name: entryName,
			init: initVal,
			isPc,
			active: initiative.length === 0
		};
		setInitiative([...initiative, next]);
	}
	function addManual() {
		const n = name.trim();
		if (!n) return;
		addEntry(n, false, Number(init) || 0);
		setName("");
	}
	function updateInit(id, value) {
		setInitiative(initiative.map((e) => e.id === id ? {
			...e,
			init: value
		} : e));
	}
	function remove(id) {
		setInitiative(initiative.filter((e) => e.id !== id));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[var(--color-fg-muted)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase",
						children: "Initiative"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tabular-nums text-[var(--color-fg-subtle)]",
					children: ["Round ", initiativeRound]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						onClick: sortInitiative,
						children: "Sort"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "steel",
						onClick: nextInitiative,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }), "Next"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: clearInitiative,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Clear"]
					})
				]
			}),
			party.length > 0 && initiative.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: () => {
					party.forEach((p) => addEntry(p.name, true, 10));
				},
				children: "Import party"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [initiative.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]",
					children: "Add combatants, set scores, then Sort."
				}), initiative.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-2 rounded-[var(--radius-sm)] border px-2 py-1.5", e.active ? "border-[color-mix(in_oklab,var(--color-steel)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-steel)_12%,var(--color-bg))]" : "border-[var(--color-border)] bg-[var(--color-bg)]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: e.init,
							onChange: (ev) => updateInit(e.id, Number(ev.target.value) || 0),
							className: "h-8 w-14 px-2 text-center text-xs tabular-nums"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("min-w-0 flex-1 truncate text-sm", e.isPc ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]"),
							children: e.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: () => remove(e.id),
							"aria-label": `Remove ${e.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})
					]
				}, e.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto grid gap-2 border-t border-[var(--color-border)] pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Name",
							value: name,
							onChange: (e) => setName(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && addManual()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: init,
							onChange: (e) => setInit(e.target.value),
							className: "w-16 shrink-0 text-center tabular-nums",
							"aria-label": "Initiative score"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: addManual,
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
						})
					]
				})
			})
		]
	});
}
function NotesPanel() {
	const sessionNotes = useSessionStore((s) => s.sessionNotes);
	const privateNotes = useSessionStore((s) => s.privateNotes);
	const setSessionNotes = useSessionStore((s) => s.setSessionNotes);
	const setPrivateNotes = useSessionStore((s) => s.setPrivateNotes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[var(--color-fg-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyNote, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase",
					children: "Notes"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid min-h-0 flex-1 gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-[var(--color-fg-subtle)]",
					children: "Table notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: sessionNotes,
					onChange: (e) => setSessionNotes(e.target.value),
					placeholder: "What happened this scene...",
					className: "min-h-[100px] flex-1 resize-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid min-h-0 flex-1 gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-[var(--color-fg-subtle)]",
					children: "Private DM notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: privateNotes,
					onChange: (e) => setPrivateNotes(e.target.value),
					placeholder: "Secrets, twists, upcoming beats...",
					className: "min-h-[100px] flex-1 resize-none"
				})]
			})
		]
	});
}
function PartyPanel() {
	const party = useSessionStore((s) => s.party);
	const addPartyMember = useSessionStore((s) => s.addPartyMember);
	const updatePartyMember = useSessionStore((s) => s.updatePartyMember);
	const removePartyMember = useSessionStore((s) => s.removePartyMember);
	const [name, setName] = (0, import_react.useState)("");
	const [classLabel, setClassLabel] = (0, import_react.useState)("");
	function add() {
		const n = name.trim();
		if (!n) return;
		addPartyMember({
			name: n,
			classLabel: classLabel.trim() || "Adventurer",
			maxHp: 10,
			currentHp: 10,
			ac: 12,
			notes: "",
			conditions: []
		});
		setName("");
		setClassLabel("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[var(--color-fg-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase",
					children: "Party"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [party.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]",
					children: "Add characters to track HP, AC, and conditions at the table."
				}), party.map((pc) => {
					const hpPct = Math.max(0, Math.min(100, pc.currentHp / Math.max(1, pc.maxHp) * 100));
					const low = hpPct <= 30;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: pc.name,
										onChange: (e) => updatePartyMember(pc.id, { name: e.target.value }),
										className: "h-8 border-transparent bg-transparent px-0 text-sm font-medium focus-visible:border-[var(--color-border)] focus-visible:bg-[var(--color-bg-elevated)] focus-visible:px-2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: pc.classLabel,
										onChange: (e) => updatePartyMember(pc.id, { classLabel: e.target.value }),
										className: "mt-0.5 h-7 border-transparent bg-transparent px-0 text-xs text-[var(--color-fg-muted)] focus-visible:border-[var(--color-border)] focus-visible:bg-[var(--color-bg-elevated)] focus-visible:px-2"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon-sm",
									onClick: () => removePartyMember(pc.id),
									"aria-label": `Remove ${pc.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-subtle)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full transition-[width] duration-200", low ? "bg-[var(--color-danger)]" : "bg-[var(--color-success)]"),
									style: { width: `${hpPct}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
											children: "HP"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: pc.currentHp,
													onChange: (e) => updatePartyMember(pc.id, { currentHp: Number(e.target.value) || 0 }),
													className: "h-8 px-2 text-xs tabular-nums"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-[var(--color-fg-subtle)]",
													children: "/"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: pc.maxHp,
													onChange: (e) => updatePartyMember(pc.id, { maxHp: Number(e.target.value) || 1 }),
													className: "h-8 px-2 text-xs tabular-nums"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
											children: "AC"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											value: pc.ac,
											onChange: (e) => updatePartyMember(pc.id, { ac: Number(e.target.value) || 0 }),
											className: "h-8 px-2 text-xs tabular-nums"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase",
											children: "Notes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: pc.notes,
											onChange: (e) => updatePartyMember(pc.id, { notes: e.target.value }),
											placeholder: "Buffs...",
											className: "h-8 px-2 text-xs"
										})]
									})
								]
							})
						]
					}, pc.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto grid gap-2 border-t border-[var(--color-border)] pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Character name",
					value: name,
					onChange: (e) => setName(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && add()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Class",
						value: classLabel,
						onChange: (e) => setClassLabel(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && add()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						onClick: add,
						className: "shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
					})]
				})]
			})
		]
	});
}
function SessionRunnerPage() {
	const { campaignId } = Route.useParams();
	const campaign = getCampaign(campaignId);
	if (!campaign) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionRunner, { campaign });
}
function SessionRunner({ campaign }) {
	const sceneId = useSessionStore((s) => s.sceneId);
	const setScene = useSessionStore((s) => s.setScene);
	const setCampaign = useSessionStore((s) => s.setCampaign);
	const completedScenes = useSessionStore((s) => s.completedScenes);
	const markSceneComplete = useSessionStore((s) => s.markSceneComplete);
	const resetSession = useSessionStore((s) => s.resetSession);
	const [sceneNavOpen, setSceneNavOpen] = (0, import_react.useState)(false);
	const [toolsOpen, setToolsOpen] = (0, import_react.useState)(false);
	const [toolsTab, setToolsTab] = (0, import_react.useState)("party");
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		setToolsOpen(mq.matches);
		const onChange = () => setToolsOpen(mq.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);
	(0, import_react.useEffect)(() => {
		setCampaign(campaign.id);
		if (!sceneId || !campaign.scenes.some((s) => s.id === sceneId)) setScene(campaign.scenes[0]?.id ?? null);
	}, [
		campaign.id,
		campaign.scenes,
		sceneId,
		setCampaign,
		setScene
	]);
	const sceneIndex = (0, import_react.useMemo)(() => campaign.scenes.findIndex((s) => s.id === sceneId), [campaign.scenes, sceneId]);
	const scene = sceneIndex >= 0 ? campaign.scenes[sceneIndex] : campaign.scenes[0];
	const progress = campaign.scenes.length > 0 ? completedScenes.filter((id) => campaign.scenes.some((s) => s.id === id)).length / campaign.scenes.length * 100 : 0;
	function goTo(index) {
		const next = campaign.scenes[index];
		if (next) {
			setScene(next.id);
			setSceneNavOpen(false);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	}
	if (!scene) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center text-[var(--color-fg-muted)]",
		children: "No scenes found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-[var(--color-bg)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_94%,transparent)] backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-14 items-center gap-2 px-3 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "icon-sm",
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/campaign/$campaignId",
							params: { campaignId: campaign.id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Back"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						className: "shrink-0 lg:hidden",
						onClick: () => setSceneNavOpen(true),
						"aria-label": "Open scene list",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-sm font-semibold text-[var(--color-fg)] sm:text-base",
							children: campaign.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-1 max-w-xs overflow-hidden rounded-full bg-[var(--color-bg-subtle)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-[var(--color-steel)] transition-[width] duration-300",
								style: { width: `${progress}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						className: "hidden shrink-0 sm:inline-flex",
						onClick: () => {
							if (window.confirm("Reset party, initiative, skill challenge, runestones, and notes for this session?")) {
								resetSession();
								setScene(campaign.scenes[0]?.id ?? null);
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						className: "shrink-0",
						onClick: () => setToolsOpen((v) => !v),
						children: [toolsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRightClose, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRightOpen, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Tools"
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-h-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] lg:block xl:w-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneNav, {
						campaignTitle: campaign.title,
						scenes: campaign.scenes,
						activeId: scene.id,
						completed: completedScenes,
						onSelect: (id) => {
							setScene(id);
							window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						}
					})
				}),
				sceneNavOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute inset-0 bg-black/60",
						"aria-label": "Close scene list",
						onClick: () => setSceneNavOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-y-0 left-0 w-[min(100%,20rem)] border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-panel)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-14 items-center justify-between border-b border-[var(--color-border)] px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-semibold",
								children: "Scenes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								onClick: () => setSceneNavOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneNav, {
							campaignTitle: campaign.title,
							scenes: campaign.scenes,
							activeId: scene.id,
							completed: completedScenes,
							onSelect: (id) => {
								setScene(id);
								setSceneNavOpen(false);
								window.scrollTo({
									top: 0,
									behavior: "smooth"
								});
							}
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1 overflow-y-auto scrollbar-thin",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 grid gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "steel",
											children: ["Scene ", scene.number]
										}), scene.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											children: t
										}, t))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-balance text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl",
										children: scene.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base",
										children: scene.summary
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4",
								children: scene.sections.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRenderer, { section }, `${scene.id}-${i}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-8" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "secondary",
										disabled: sceneIndex <= 0,
										onClick: () => goTo(sceneIndex - 1),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "Previous"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: completedScenes.includes(scene.id) ? "outline" : "steel",
										onClick: () => markSceneComplete(scene.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), completedScenes.includes(scene.id) ? "Scene marked done" : "Mark scene done"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										disabled: sceneIndex >= campaign.scenes.length - 1,
										onClick: () => {
											markSceneComplete(scene.id);
											goTo(sceneIndex + 1);
										},
										children: ["Next scene", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
									})
								]
							}),
							sceneIndex === campaign.scenes.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg font-semibold text-[var(--color-fg)]",
										children: "End of Act One"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-[var(--color-fg-muted)]",
										children: "Use the overview for Act Two setting seeds, lore, and PVP table guidance."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "secondary",
										className: "mt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/campaign/$campaignId",
											params: { campaignId: campaign.id },
											children: ["Open full overview", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})
								]
							})
						]
					})
				}),
				toolsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute inset-0 bg-black/60",
						"aria-label": "Close tools",
						onClick: () => setToolsOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-hidden rounded-t-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-panel)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-12 items-center justify-between border-b border-[var(--color-border)] px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-semibold",
								children: "Table tools"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								onClick: () => setToolsOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[calc(85dvh-3rem)] overflow-y-auto p-4 scrollbar-thin",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolsTabs, {
								value: toolsTab,
								onValueChange: setToolsTab
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-80 shrink-0 border-l border-[var(--color-border)] bg-[var(--color-bg-elevated)] lg:block xl:w-96",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto p-4 scrollbar-thin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolsTabs, {
							value: toolsTab,
							onValueChange: setToolsTab
						})
					})
				})] })
			]
		})]
	});
}
function SceneNav({ campaignTitle, scenes, activeId, completed, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto p-3 scrollbar-thin",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 px-2 text-xs tracking-wide text-[var(--color-fg-subtle)] uppercase",
			children: campaignTitle
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-1",
			children: scenes.map((s) => {
				const active = s.id === activeId;
				const done = completed.includes(s.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(s.id),
					className: cn("flex w-full items-start gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2.5 text-left transition-colors", active ? "bg-[color-mix(in_oklab,var(--color-steel)_14%,var(--color-bg))] text-[var(--color-fg)]" : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-fg)]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] tabular-nums", done ? "border-[color-mix(in_oklab,var(--color-success)_40%,var(--color-border))] text-[var(--color-success)]" : active ? "border-[var(--color-steel)] text-[var(--color-steel)]" : "border-[var(--color-border)] text-[var(--color-fg-subtle)]"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : s.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm font-medium",
							children: s.shortTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block truncate text-[11px] text-[var(--color-fg-subtle)]",
							children: ["Scene ", s.number]
						})]
					})]
				}) }, s.id);
			})
		})]
	});
}
function ToolsTabs({ value, onValueChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		value,
		onValueChange,
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "grid h-auto w-full grid-cols-4 gap-1 p-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "party",
						className: "flex flex-col gap-0.5 px-1 py-2 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), "Party"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "init",
						className: "flex flex-col gap-0.5 px-1 py-2 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-3.5" }), "Init"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "dice",
						className: "flex flex-col gap-0.5 px-1 py-2 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-3.5" }), "Dice"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "notes",
						className: "flex flex-col gap-0.5 px-1 py-2 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-3.5" }), "Notes"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "party",
				className: "min-h-[320px] flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPanel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "init",
				className: "min-h-[320px] flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitiativePanel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "dice",
				className: "min-h-[320px] flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DicePanel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "notes",
				className: "min-h-[320px] flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesPanel, {})
			})
		]
	});
}
//#endregion
export { SessionRunnerPage as component };
