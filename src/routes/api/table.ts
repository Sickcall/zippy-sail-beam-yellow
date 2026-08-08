import { createFileRoute } from "@tanstack/react-router";
import { handleTableRelay } from "@/lib/table/table-relay.server";

const handle = ({ request }: { request: Request }) => handleTableRelay(request);

export const Route = createFileRoute("/api/table")({
  server: { handlers: { GET: handle, POST: handle } },
});
