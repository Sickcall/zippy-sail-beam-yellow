import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./button-C8CvZtyd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DsIz5tIR.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors", {
	variants: { variant: {
		default: "border-transparent bg-[var(--color-bg-subtle)] text-[var(--color-fg-muted)]",
		accent: "border-transparent bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] text-[var(--color-accent)]",
		steel: "border-transparent bg-[color-mix(in_oklab,var(--color-steel)_16%,transparent)] text-[var(--color-steel)]",
		danger: "border-transparent bg-[color-mix(in_oklab,var(--color-danger)_18%,transparent)] text-[var(--color-danger)]",
		success: "border-transparent bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[var(--color-success)]",
		warn: "border-transparent bg-[color-mix(in_oklab,var(--color-warn)_18%,transparent)] text-[var(--color-warn)]",
		outline: "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
