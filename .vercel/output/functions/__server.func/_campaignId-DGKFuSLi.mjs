import { o as __toESM } from "./_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-C8CvZtyd.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { b as Plus, l as Trash2, q as ArrowLeft, v as Save } from "./_libs/lucide-react.mjs";
import { t as AppShell } from "./_ssr/app-shell-BQE9jRJg.mjs";
import { t as Badge } from "./_ssr/badge-DsIz5tIR.mjs";
import { t as Input } from "./_ssr/input-AFaF5Jsv.mjs";
import { n as Textarea, t as SectionRenderer } from "./_ssr/textarea-BUvTS9Iv.mjs";
import { t as Route } from "./_campaignId-BNSyio35.mjs";
import { r as useHomebrewStore, t as blankScene } from "./_ssr/homebrew-store-CISoxVrU.mjs";
import { l as makeCode } from "./_ssr/types-DaYGJmtc.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_campaignId-DGKFuSLi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CampaignEditorPage() {
	const { campaignId } = Route.useParams();
	const getById = useHomebrewStore((s) => s.getById);
	const update = useHomebrewStore((s) => s.update);
	const create = useHomebrewStore((s) => s.create);
	const upsertScene = useHomebrewStore((s) => s.upsertScene);
	const removeScene = useHomebrewStore((s) => s.removeScene);
	const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
	const [camp, setCamp] = (0, import_react.useState)(null);
	const [sceneId, setSceneId] = (0, import_react.useState)(null);
	const [draftTitle, setDraftTitle] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		ensureSeeded();
		const c = getById(campaignId);
		if (c) {
			setCamp(c);
			setDraftTitle(c.title);
			setSceneId(c.scenes[0]?.id ?? null);
		}
	}, [
		campaignId,
		getById,
		ensureSeeded
	]);
	const scene = (0, import_react.useMemo)(() => camp?.scenes.find((s) => s.id === sceneId) ?? null, [camp, sceneId]);
	if (!camp) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-[var(--color-fg-muted)]",
		children: "Campaign not found."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/library",
			children: "Back to library"
		})
	})] });
	const readOnlyBuiltIn = camp.source === "built-in";
	function saveMeta() {
		if (!camp) return;
		if (readOnlyBuiltIn) {
			const forked = create({
				title: draftTitle || camp.title,
				subtitle: camp.subtitle,
				synopsis: camp.synopsis,
				edition: camp.edition,
				levelRange: camp.levelRange,
				estimatedSessions: camp.estimatedSessions,
				tags: camp.tags,
				features: camp.features,
				antagonist: camp.antagonist,
				patron: camp.patron,
				scenes: structuredClone(camp.scenes),
				aftermath: camp.aftermath,
				lore: camp.lore,
				appendix: camp.appendix
			});
			toast.success("Forked built-in into your homebrew library");
			window.location.href = `/library/${forked.id}`;
			return;
		}
		update(camp.id, {
			title: draftTitle,
			subtitle: camp.subtitle,
			synopsis: camp.synopsis,
			edition: camp.edition,
			levelRange: camp.levelRange,
			estimatedSessions: camp.estimatedSessions,
			antagonist: camp.antagonist,
			patron: camp.patron,
			tags: camp.tags
		});
		setCamp(getById(camp.id) ?? camp);
		toast.success("Saved");
	}
	function saveScene(next) {
		if (!camp) return;
		if (readOnlyBuiltIn) {
			toast.message("Duplicate this campaign to edit scenes");
			return;
		}
		upsertScene(camp.id, next);
		setCamp(getById(camp.id) ?? camp);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/library",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Library"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: readOnlyBuiltIn ? "steel" : "outline",
						children: readOnlyBuiltIn ? "Built-in (read-only)" : "Homebrew"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "steel",
						className: "ml-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/table/$code",
							params: { code: makeCode() },
							search: {
								role: "dm",
								name: "Dungeon Master",
								campaign: camp.id
							},
							children: "Run at table"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-[var(--color-fg-subtle)]",
									children: "Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draftTitle,
									disabled: readOnlyBuiltIn,
									onChange: (e) => setDraftTitle(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-[var(--color-fg-subtle)]",
									children: "Edition"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: camp.edition,
									disabled: readOnlyBuiltIn,
									onChange: (e) => setCamp({
										...camp,
										edition: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-[var(--color-fg-subtle)]",
									children: "Level range"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: camp.levelRange,
									disabled: readOnlyBuiltIn,
									onChange: (e) => setCamp({
										...camp,
										levelRange: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-[var(--color-fg-subtle)]",
									children: "Sessions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: camp.estimatedSessions,
									disabled: readOnlyBuiltIn,
									onChange: (e) => setCamp({
										...camp,
										estimatedSessions: e.target.value
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase text-[var(--color-fg-subtle)]",
							children: "Synopsis"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: camp.synopsis,
							disabled: readOnlyBuiltIn,
							onChange: (e) => setCamp({
								...camp,
								synopsis: e.target.value
							}),
							className: "min-h-[80px]"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: saveMeta,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), readOnlyBuiltIn ? "Fork & edit" : "Save details"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[240px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "grid h-fit gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-semibold uppercase tracking-wide",
							children: "Scenes"
						}), !readOnlyBuiltIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "secondary",
							onClick: () => {
								const sc = blankScene(camp.scenes.length + 1);
								upsertScene(camp.id, sc);
								const next = getById(camp.id);
								if (next) {
									setCamp(next);
									setSceneId(sc.id);
								}
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
						})]
					}), camp.scenes.map((sc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSceneId(sc.id),
						className: `rounded-[var(--radius-sm)] border px-2 py-2 text-left text-sm ${sceneId === sc.id ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_12%,var(--color-bg))]" : "border-[var(--color-border)]"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-[var(--color-fg-subtle)]",
								children: [sc.number, "."]
							}),
							" ",
							sc.shortTitle || sc.title
						]
					}, sc.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: scene ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: scene.title,
									disabled: readOnlyBuiltIn,
									onChange: (e) => saveScene({
										...scene,
										title: e.target.value,
										shortTitle: e.target.value.slice(0, 24)
									}),
									className: "font-display text-lg font-semibold"
								}), !readOnlyBuiltIn && camp.scenes.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => {
										removeScene(camp.id, scene.id);
										const next = getById(camp.id);
										if (next) {
											setCamp(next);
											setSceneId(next.scenes[0]?.id ?? null);
										}
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: scene.summary,
								disabled: readOnlyBuiltIn,
								onChange: (e) => saveScene({
									...scene,
									summary: e.target.value
								}),
								placeholder: "Scene summary",
								className: "min-h-[64px]"
							}),
							!readOnlyBuiltIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "secondary",
										onClick: () => saveScene({
											...scene,
											sections: [...scene.sections, {
												type: "readAloud",
												title: "Read aloud",
												text: ""
											}]
										}),
										children: "+ Read-aloud"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "secondary",
										onClick: () => saveScene({
											...scene,
											sections: [...scene.sections, {
												type: "dmGuidance",
												title: "DM guidance",
												text: ""
											}]
										}),
										children: "+ DM note"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "secondary",
										onClick: () => saveScene({
											...scene,
											sections: [...scene.sections, {
												type: "bullets",
												title: "Bullets",
												items: [""]
											}]
										}),
										children: "+ Bullets"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "secondary",
										onClick: () => saveScene({
											...scene,
											sections: [...scene.sections, {
												type: "skillChallenge",
												challenge: {
													title: "Skill challenge",
													goal: "",
													successesNeeded: 4,
													failuresAllowed: 3,
													checks: [],
													successOutcome: "",
													failureOutcome: ""
												}
											}]
										}),
										children: "+ Skill challenge"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: scene.sections.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [!readOnlyBuiltIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionEditor, {
								section,
								onChange: (next) => {
									const sections = scene.sections.slice();
									sections[i] = next;
									saveScene({
										...scene,
										sections
									});
								},
								onRemove: () => {
									saveScene({
										...scene,
										sections: scene.sections.filter((_, j) => j !== i)
									});
								}
							}), readOnlyBuiltIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRenderer, { section })]
						}, i))
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-fg-muted)]",
						children: "Select or add a scene."
					})
				})]
			})
		]
	}) });
}
function SectionEditor({ section, onChange, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: section.type
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: onRemove,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				})]
			}),
			"title" in section && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: section.title ?? "",
				onChange: (e) => onChange({
					...section,
					title: e.target.value
				}),
				className: "mb-2",
				placeholder: "Section title"
			}),
			"text" in section && typeof section.text === "string" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: section.text,
				onChange: (e) => onChange({
					...section,
					text: e.target.value
				}),
				className: "min-h-[100px]"
			}),
			section.type === "bullets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: section.items.join("\n"),
				onChange: (e) => onChange({
					...section,
					items: e.target.value.split("\n")
				}),
				className: "min-h-[100px]",
				placeholder: "One bullet per line"
			}),
			section.type === "skillChallenge" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: section.challenge.title,
					onChange: (e) => onChange({
						...section,
						challenge: {
							...section.challenge,
							title: e.target.value
						}
					}),
					placeholder: "Title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: section.challenge.goal,
					onChange: (e) => onChange({
						...section,
						challenge: {
							...section.challenge,
							goal: e.target.value
						}
					}),
					placeholder: "Goal"
				})]
			}),
			section.type !== "bullets" && section.type !== "skillChallenge" && !("text" in section) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRenderer, { section })
		]
	});
}
//#endregion
export { CampaignEditorPage as component };
