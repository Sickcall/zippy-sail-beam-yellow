import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C8CvZtyd.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Map, G as BookOpen, _ as ScrollText, d as Swords, h as Settings2, i as Users, k as Library, q as ArrowRight, r as Wrench, z as Dices } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-BQE9jRJg.mjs";
import { t as Badge } from "./badge-DsIz5tIR.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DtvtxkMq.mjs";
import { r as useHomebrewStore } from "./homebrew-store-CISoxVrU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D-DGV7-5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
	const listAll = useHomebrewStore((s) => s.listAll);
	(0, import_react.useEffect)(() => {
		ensureSeeded();
	}, [ensureSeeded]);
	const campaigns = listAll();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "steel",
						className: "w-fit",
						children: "Universal campaign platform"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-balance text-4xl font-semibold tracking-tight text-display-gradient sm:text-5xl",
						children: "Any homebrew. Full table. DM in control."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg",
						children: "Grimoire is a complete virtual tabletop and campaign toolkit — maps, sheets, combat, dice, NPCs, clocks, loot, and a module library. Run official-style homebrew or pure freeform. Share a public invite link — players need no account; only you see DM tools."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/join",
								children: ["Host or join", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/library",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "size-4" }), "Campaign library"]
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-[var(--color-border-strong)] bg-[var(--color-bg-panel)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Everything a campaign needs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Setup once — use every session." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						{
							icon: Library,
							label: "Campaign library",
							detail: "Create, import, fork JSON"
						},
						{
							icon: Users,
							label: "Live multiplayer",
							detail: "Join codes, seats, roles"
						},
						{
							icon: Map,
							label: "Battle maps",
							detail: "Presets, paint, tokens"
						},
						{
							icon: ScrollText,
							label: "Character sheets",
							detail: "Any class or homebrew"
						},
						{
							icon: Swords,
							label: "Combat tracker",
							detail: "Init, HP, conditions"
						},
						{
							icon: Dices,
							label: "Shared dice",
							detail: "Public & secret rolls"
						},
						{
							icon: Wrench,
							label: "DM toolkit",
							detail: "NPCs, clocks, loot, challenges"
						},
						{
							icon: Settings2,
							label: "Table settings",
							detail: "Edition, rules, visibility"
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "mt-0.5 size-4 shrink-0 text-[var(--color-steel)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-[var(--color-fg)]",
							children: f.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--color-fg-subtle)]",
							children: f.detail
						})] })]
					}, f.label))
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "library",
			className: "grid gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold text-[var(--color-fg)]",
					children: "Your library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-[var(--color-fg-muted)]",
					children: "Built-in modules plus every homebrew you add. Load any of them when you host."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/library",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), "Open library"]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: campaigns.slice(0, 6).map((campaign) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col overflow-hidden transition-colors hover:border-[var(--color-border-strong)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-32 overflow-hidden border-b border-[var(--color-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0",
									style: { background: campaign.source === "homebrew" ? "linear-gradient(145deg, #1a1612 0%, #12100e 40%, color-mix(in oklab, var(--color-ember) 18%, #0c0b0a) 100%)" : "linear-gradient(145deg, #141820 0%, #101418 45%, color-mix(in oklab, var(--color-steel) 22%, #0a0c10) 100%)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 opacity-30",
									style: { backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 12px, color-mix(in oklab, white 4%, transparent) 12px, color-mix(in oklab, white 4%, transparent) 13px)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "bg-[color-mix(in_oklab,var(--color-bg)_70%,transparent)]",
										children: campaign.source === "homebrew" ? "Homebrew" : campaign.edition
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-xl leading-snug",
							children: campaign.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							className: "line-clamp-2",
							children: campaign.synopsis || campaign.subtitle
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "mt-auto flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/join",
									children: "Run at table"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/library/$campaignId",
									params: { campaignId: campaign.id },
									children: "Open"
								})
							})]
						})
					]
				}, campaign.id))
			})]
		})]
	}) });
}
//#endregion
export { HomePage as component };
