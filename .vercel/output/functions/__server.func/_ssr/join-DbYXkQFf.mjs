import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C8CvZtyd.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as BookMarked, W as BookOpen, i as Users } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DtvtxkMq.mjs";
import { t as Input } from "./input-AFaF5Jsv.mjs";
import { r as useHomebrewStore } from "./homebrew-store-CISoxVrU.mjs";
import { l as makeCode } from "./types-DaYGJmtc.mjs";
import { t as Route } from "./join-43zGEkp1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-DbYXkQFf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JoinPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
	const listAll = useHomebrewStore((s) => s.listAll);
	const [code, setCode] = (0, import_react.useState)(search.code?.toUpperCase() ?? "");
	const [name, setName] = (0, import_react.useState)("");
	const [dmName, setDmName] = (0, import_react.useState)("");
	const [tableName, setTableName] = (0, import_react.useState)("Tonight's Game");
	const [campaignId, setCampaignId] = (0, import_react.useState)("");
	const [edition, setEdition] = (0, import_react.useState)("D&D 5e");
	const [levelBand, setLevelBand] = (0, import_react.useState)("1–5");
	const [campaigns, setCampaigns] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		ensureSeeded();
		setCampaigns(listAll());
	}, [ensureSeeded, listAll]);
	function joinPlayer(e) {
		e.preventDefault();
		const c = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
		if (c.length < 4) return;
		navigate({
			to: "/table/$code",
			params: { code: c },
			search: {
				role: "player",
				name: name.trim() || "Adventurer"
			}
		});
	}
	function hostTable() {
		const c = makeCode();
		const camp = campaignId ? campaigns.find((x) => x.id === campaignId) : void 0;
		navigate({
			to: "/table/$code",
			params: { code: c },
			search: {
				role: "dm",
				name: dmName.trim() || "Dungeon Master",
				campaign: camp?.id ?? "",
				table: tableName.trim() || "Table",
				edition: edition.trim() || "D&D 5e",
				levels: levelBand.trim() || "1–5"
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-[var(--color-bg)] px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid w-full max-w-4xl gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-3 flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] text-[var(--color-accent)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold tracking-tight",
							children: "Sit at the table"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-[var(--color-fg-muted)]",
							children: [
								"Host any homebrew or freeform game. Players open a link or enter a code —",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-medium text-[var(--color-fg)]",
									children: "no account required"
								}),
								"."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "flex items-center gap-2 text-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-[var(--color-steel)]" }), "Join as player"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "No sign-in. Enter the code from your DM's invite and pick a name." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-3",
						onSubmit: joinPlayer,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--color-fg-subtle)]",
									children: "Table code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: code,
									onChange: (e) => setCode(e.target.value.toUpperCase()),
									placeholder: "ABC123",
									className: "font-mono tracking-widest",
									maxLength: 8,
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--color-fg-subtle)]",
									children: "Your name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Alex"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								children: "Join table"
							})
						]
					}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-lg",
						children: "Host as DM — setup"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Choose a campaign from your library, or start freeform." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--color-fg-subtle)]",
									children: "DM display name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: dmName,
									onChange: (e) => setDmName(e.target.value),
									placeholder: "Dungeon Master"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--color-fg-subtle)]",
									children: "Table name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: tableName,
									onChange: (e) => setTableName(e.target.value),
									placeholder: "Friday Night D&D"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--color-fg-subtle)]",
									children: "Campaign module"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: campaignId,
									onChange: (e) => {
										setCampaignId(e.target.value);
										const c = campaigns.find((x) => x.id === e.target.value);
										if (c) {
											setEdition(c.edition);
											setLevelBand(c.levelRange.replace(/^Levels?\s*/i, ""));
										}
									},
									className: "flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Freeform (no module)"
									}), campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c.id,
										children: [
											c.title,
											" ",
											c.source === "homebrew" ? "· homebrew" : ""
										]
									}, c.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[var(--color-fg-subtle)]",
										children: "Edition"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: edition,
										onChange: (e) => setEdition(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[var(--color-fg-subtle)]",
										children: "Levels"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: levelBand,
										onChange: (e) => setLevelBand(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "steel",
								className: "w-full",
								onClick: hostTable,
								children: "Create table"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs leading-relaxed text-[var(--color-fg-subtle)]",
								children: [
									"Need a new adventure first?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/library",
										className: "text-[var(--color-steel)] underline-offset-2 hover:underline",
										children: "Open the campaign library"
									}),
									"."
								]
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/library",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), "Manage campaigns"]
						})
					})
				})
			]
		})
	});
}
//#endregion
export { JoinPage as component };
