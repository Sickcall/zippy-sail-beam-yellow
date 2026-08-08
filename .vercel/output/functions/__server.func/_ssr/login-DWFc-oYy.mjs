import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-C8CvZtyd.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as signIn } from "./client-B0Lqc8Iq.mjs";
import { K as BookMarked } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DtvtxkMq.mjs";
import { t as GROK_PROVIDERS } from "./providers-B-AR6wJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DWFc-oYy.js
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-[var(--color-bg)] px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] text-[var(--color-accent)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-2xl",
						children: "Sign in to Grimoire"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Optional — campaigns run fully offline in your browser. Sign in to sync identity across devices when deployed." })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-3",
				children: [GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					className: "w-full",
					onClick: () => signIn(p.providerId, { callbackURL: "/" }),
					children: ["Continue with ", p.label]
				}, p.providerId)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-2 text-center text-sm text-[var(--color-fg-subtle)] no-underline hover:text-[var(--color-fg-muted)]",
					children: "Back to library"
				})]
			})]
		})
	});
}
//#endregion
export { LoginPage as component };
