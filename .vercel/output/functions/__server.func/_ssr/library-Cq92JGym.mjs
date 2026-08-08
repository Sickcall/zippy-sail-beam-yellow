import { o as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C8CvZtyd.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Copy, L as Download, W as BookOpen, b as Plus, l as Trash2, s as Upload } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-BQE9jRJg.mjs";
import { t as Badge } from "./badge-DsIz5tIR.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DtvtxkMq.mjs";
import { r as useHomebrewStore } from "./homebrew-store-CISoxVrU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-Cq92JGym.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LibraryPage() {
	const fileRef = (0, import_react.useRef)(null);
	const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
	const listAll = useHomebrewStore((s) => s.listAll);
	const create = useHomebrewStore((s) => s.create);
	const remove = useHomebrewStore((s) => s.remove);
	const duplicate = useHomebrewStore((s) => s.duplicate);
	const importJson = useHomebrewStore((s) => s.importJson);
	const exportJson = useHomebrewStore((s) => s.exportJson);
	const homebrew = useHomebrewStore((s) => s.homebrew);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		ensureSeeded();
		setReady(true);
		setTick((t) => t + 1);
	}, [ensureSeeded, homebrew]);
	const campaigns = ready ? listAll() : [];
	function handleImport(file) {
		const reader = new FileReader();
		reader.onload = () => {
			const res = importJson(String(reader.result ?? ""));
			if (res.ok) {
				toast.success("Campaign imported");
				setTick((t) => t + 1);
			} else toast.error(res.error);
		};
		reader.readAsText(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Campaign library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-[var(--color-fg-muted)]",
					children: "Built-in modules, your homebrew, or import JSON. Any campaign can be loaded when you host a table — nothing is locked to a single adventure."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "application/json,.json",
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) handleImport(f);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Import JSON"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: () => {
								const c = create({ title: "New Homebrew Campaign" });
								toast.success("Campaign created");
								window.location.href = `/library/${c.id}`;
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New campaign"]
						})
					]
				})]
			}),
			!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-[var(--color-fg-muted)]",
				children: "Loading library…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: c.source === "built-in" ? "steel" : "outline",
							children: c.source === "built-in" ? "Built-in" : "Homebrew"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "default",
							children: c.edition
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-xl leading-snug",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						className: "line-clamp-2",
						children: c.synopsis || c.subtitle
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-[var(--color-fg-subtle)]",
						children: [
							c.scenes.length,
							" scenes · ",
							c.levelRange,
							" · ",
							c.estimatedSessions
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/library/$campaignId",
									params: { campaignId: c.id },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), c.source === "built-in" ? "View / fork" : "Edit"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => {
									if (duplicate(c.id)) toast.success("Duplicated");
									setTick((t) => t + 1);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => {
									const json = exportJson(c.id);
									if (!json) return;
									const blob = new Blob([json], { type: "application/json" });
									const url = URL.createObjectURL(blob);
									const a = document.createElement("a");
									a.href = url;
									a.download = `${c.id}.json`;
									a.click();
									URL.revokeObjectURL(url);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" })
							}),
							c.source === "homebrew" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "ghost",
								onClick: () => {
									if (confirm(`Delete ${c.title}?`)) {
										remove(c.id);
										setTick((t) => t + 1);
									}
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})
						]
					})]
				})] }, `${c.id}-${c.source}-${tick}`))
			})
		]
	}) });
}
//#endregion
export { LibraryPage as component };
