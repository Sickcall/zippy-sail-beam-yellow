import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-43zGEkp1.js
var $$splitComponentImporter = () => import("./join-DbYXkQFf.mjs");
var Route = createFileRoute("/join")({
	validateSearch: (s) => ({ code: typeof s.code === "string" ? s.code : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
