import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-C8CvZtyd.mjs";
import { A as notFound, h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_campaignId-DhYJMMbZ.mjs";
import { G as BookOpen, J as ArrowLeft, q as ArrowRight } from "./_libs/lucide-react.mjs";
import { t as AppShell } from "./_ssr/app-shell-BQE9jRJg.mjs";
import { t as Badge } from "./_ssr/badge-DsIz5tIR.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./_ssr/card-DtvtxkMq.mjs";
import { t as Separator } from "./_ssr/separator-DBuOjlkl.mjs";
import { n as getCampaign } from "./_ssr/campaigns-BjJzF5PR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_campaignId-BGpqg6gp.js
var import_jsx_runtime = require_jsx_runtime();
function CampaignOverviewPage() {
	const { campaignId } = Route.useParams();
	const campaign = getCampaign(campaignId);
	if (!campaign) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-4xl gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Library"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "steel",
								children: campaign.edition
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "default",
								children: campaign.levelRange
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "default",
								children: campaign.estimatedSessions
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
						children: campaign.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base text-[var(--color-fg-muted)] sm:text-lg",
						children: campaign.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base",
						children: campaign.synopsis
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/run/$campaignId",
								params: { campaignId: campaign.id },
								children: ["Open session runner", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Antagonist"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: campaign.antagonist })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Divine patron"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: campaign.patron })] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Module features"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: campaign.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-3 text-sm text-[var(--color-fg-muted)]",
						children: f
					}, f))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Scene map"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: campaign.scenes.map((scene) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex-row items-start gap-3 space-y-0 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] font-display text-sm text-[var(--color-steel)]",
							children: scene.number
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-base",
									children: scene.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									className: "mt-1",
									children: scene.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-1.5",
									children: scene.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: t
									}, t))
								})
							]
						})]
					}) }, scene.id))
				})]
			}),
			campaign.aftermath && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: campaign.aftermath.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: campaign.aftermath.actTwoSettings.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: s.text })] }) }, s.title))
				})]
			}),
			campaign.lore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: campaign.lore.title
				}), campaign.lore.sections.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: sec.title
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-2",
					children: sec.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-[var(--color-fg-muted)]",
						children: item
					}, item))
				})] }, sec.title))]
			}),
			campaign.appendix && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-[var(--color-steel)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: campaign.appendix.title
					})]
				}), campaign.appendix.sections.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: sec.title
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-2",
					children: sec.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-[var(--color-fg-muted)]",
						children: item
					}, item))
				})] }, sec.title))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center pb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/run/$campaignId",
						params: { campaignId: campaign.id },
						children: ["Run this campaign", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			})
		]
	}) });
}
//#endregion
export { CampaignOverviewPage as component };
