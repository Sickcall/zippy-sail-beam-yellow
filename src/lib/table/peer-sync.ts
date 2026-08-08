/**
 * Browser-to-browser table sync via PeerJS cloud (no shared server DB required).
 * DM hosts a fixed peer id derived from the table code; players connect to it.
 */
import Peer, { type DataConnection, type PeerJSOption } from "peerjs";
import type { TableState, WireMessage } from "./types";

export type PeerWire =
  | { t: "state"; state: TableState }
  | { t: "action"; payload: WireMessage & { from?: string } }
  | { t: "ping"; at: number }
  | { t: "pong"; at: number };

function hostId(code: string) {
  // PeerJS ids: alphanumeric + limited punctuation
  return `grimoire1${code.toLowerCase()}`;
}

const PEER_OPTS: PeerJSOption = {
  debug: 0,
  // Public PeerJS cloud broker
  host: "0.peerjs.com",
  port: 443,
  path: "/",
  secure: true,
  config: {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:global.stun.twilio.com:3478" },
    ],
  },
};

export type PeerSyncHandle = {
  destroy: () => void;
  broadcastState: (state: TableState) => void;
  sendAction: (payload: WireMessage & { from?: string }) => void;
  connected: () => boolean;
};

export function startDmPeerSync(opts: {
  code: string;
  onAction: (payload: WireMessage & { from?: string }) => void;
  onPeerCount?: (n: number) => void;
  getState: () => TableState;
}): PeerSyncHandle {
  const id = hostId(opts.code);
  let peer: Peer | null = null;
  const conns = new Map<string, DataConnection>();
  let destroyed = false;

  const attach = (conn: DataConnection) => {
    conns.set(conn.peer, conn);
    opts.onPeerCount?.(conns.size);
    conn.on("data", (raw) => {
      try {
        const msg = raw as PeerWire;
        if (msg?.t === "action" && msg.payload) opts.onAction(msg.payload);
        if (msg?.t === "ping") conn.send({ t: "pong", at: Date.now() } satisfies PeerWire);
      } catch {
        /* ignore */
      }
    });
    conn.on("close", () => {
      conns.delete(conn.peer);
      opts.onPeerCount?.(conns.size);
    });
    conn.on("open", () => {
      try {
        conn.send({ t: "state", state: opts.getState() } satisfies PeerWire);
      } catch {
        /* ignore */
      }
    });
    // if already open
    if (conn.open) {
      try {
        conn.send({ t: "state", state: opts.getState() } satisfies PeerWire);
      } catch {
        /* ignore */
      }
    }
  };

  const boot = () => {
    if (destroyed) return;
    peer = new Peer(id, PEER_OPTS);
    peer.on("open", () => {
      /* host ready */
    });
    peer.on("connection", (conn) => attach(conn));
    peer.on("error", (err) => {
      // id taken after refresh — retry with slight delay
      const msg = String((err as { type?: string })?.type ?? err);
      if (msg.includes("unavailable-id") || msg.includes("ID is taken")) {
        try {
          peer?.destroy();
        } catch {
          /* ignore */
        }
        setTimeout(() => {
          if (!destroyed) boot();
        }, 600);
      }
    });
  };
  boot();

  return {
    destroy: () => {
      destroyed = true;
      for (const c of conns.values()) {
        try {
          c.close();
        } catch {
          /* ignore */
        }
      }
      conns.clear();
      try {
        peer?.destroy();
      } catch {
        /* ignore */
      }
      peer = null;
    },
    broadcastState: (state: TableState) => {
      const wire: PeerWire = { t: "state", state };
      for (const c of conns.values()) {
        if (c.open) {
          try {
            c.send(wire);
          } catch {
            /* ignore */
          }
        }
      }
    },
    sendAction: () => {
      /* DM does not send actions over peer */
    },
    connected: () => conns.size > 0,
  };
}

export function startPlayerPeerSync(opts: {
  code: string;
  selfId: string;
  displayName: string;
  onState: (state: TableState) => void;
  onStatus?: (s: "connecting" | "open" | "error") => void;
}): PeerSyncHandle {
  const target = hostId(opts.code);
  let peer: Peer | null = null;
  let conn: DataConnection | null = null;
  let destroyed = false;
  let retryTimer: ReturnType<typeof setTimeout> | null = null;

  const connect = () => {
    if (destroyed) return;
    opts.onStatus?.("connecting");
    peer = new Peer(PEER_OPTS);
    peer.on("open", () => {
      if (destroyed) return;
      conn = peer!.connect(target, { reliable: true });
      conn.on("open", () => {
        opts.onStatus?.("open");
        // announce
        try {
          conn?.send({
            t: "action",
            payload: {
              t: "hello",
              role: "player",
              name: opts.displayName,
              peerId: opts.selfId,
              from: opts.selfId,
            },
          } satisfies PeerWire);
          conn?.send({
            t: "action",
            payload: { t: "request-state", from: opts.selfId },
          } satisfies PeerWire);
        } catch {
          /* ignore */
        }
      });
      conn.on("data", (raw) => {
        try {
          const msg = raw as PeerWire;
          if (msg?.t === "state" && msg.state) opts.onState(msg.state);
        } catch {
          /* ignore */
        }
      });
      conn.on("close", () => {
        if (destroyed) return;
        opts.onStatus?.("connecting");
        retryTimer = setTimeout(reconnect, 1200);
      });
      conn.on("error", () => {
        opts.onStatus?.("error");
      });
    });
    peer.on("error", () => {
      opts.onStatus?.("error");
      if (!destroyed) retryTimer = setTimeout(reconnect, 1500);
    });
  };

  const reconnect = () => {
    try {
      conn?.close();
    } catch {
      /* ignore */
    }
    try {
      peer?.destroy();
    } catch {
      /* ignore */
    }
    conn = null;
    peer = null;
    connect();
  };

  connect();

  return {
    destroy: () => {
      destroyed = true;
      if (retryTimer) clearTimeout(retryTimer);
      try {
        conn?.close();
      } catch {
        /* ignore */
      }
      try {
        peer?.destroy();
      } catch {
        /* ignore */
      }
    },
    broadcastState: () => {},
    sendAction: (payload) => {
      if (conn?.open) {
        try {
          conn.send({ t: "action", payload } satisfies PeerWire);
        } catch {
          /* ignore */
        }
      }
    },
    connected: () => Boolean(conn?.open),
  };
}
