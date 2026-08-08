import { Users } from "lucide-react";
import type { Seat } from "@/lib/table/types";
import type { PeerInfo } from "@/lib/multiplayer/p2p";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TablePresence({
  seats,
  peers,
  selfId,
  code,
}: {
  seats: Seat[];
  peers: PeerInfo[];
  selfId: string;
  code: string;
}) {
  const peerMap = new Map(peers.map((p) => [p.id, p]));
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="steel" className="font-mono tracking-wider">
        {code}
      </Badge>
      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-fg-subtle)]">
        <Users className="size-3.5" />
        {seats.length || peers.length + 1} at table
      </span>
      <div className="flex flex-wrap gap-1.5">
        {seats.map((s) => {
          const p = peerMap.get(s.peerId);
          const connected = s.peerId === selfId || p?.connectionState === "connected" || s.connected;
          return (
            <span
              key={s.peerId}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs",
                connected
                  ? "border-[var(--color-border)] text-[var(--color-fg-muted)]"
                  : "border-[var(--color-border)] text-[var(--color-fg-subtle)] opacity-50",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  connected ? "bg-[var(--color-success)]" : "bg-[var(--color-fg-subtle)]",
                )}
              />
              {s.name}
              {s.role === "dm" && (
                <span className="text-[10px] uppercase tracking-wide text-[var(--color-steel)]">
                  DM
                </span>
              )}
              {s.peerId === selfId && <span className="text-[10px]">you</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}
