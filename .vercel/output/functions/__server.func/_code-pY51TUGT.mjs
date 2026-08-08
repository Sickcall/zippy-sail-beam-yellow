import { f as lazyRouteComponent, p as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-pY51TUGT.js
var $$splitComponentImporter = () => import("./_code-CMYirgEH.mjs");
var Route = createFileRoute("/table/$code")({
	validateSearch: (s) => ({
		role: typeof s.role === "string" ? s.role : void 0,
		name: typeof s.name === "string" ? s.name : void 0,
		campaign: typeof s.campaign === "string" ? s.campaign : void 0,
		table: typeof s.table === "string" ? s.table : void 0,
		edition: typeof s.edition === "string" ? s.edition : void 0,
		levels: typeof s.levels === "string" ? s.levels : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
