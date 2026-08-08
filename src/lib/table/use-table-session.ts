import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createTableState,
  emptySheet,
  normalizeTableState,
  syncCharacterDerived,
  type CharacterSheet,
  type DiceEntry,
  type Role,
  type Seat,
  type TableSettings,
  type TableState,
  type WireMessage,
  rollDice,
} from "./types";
import { generateMap } from "@/lib/map/presets";

function requireMap(preset: TableState["map"]["preset"]) {
  return generateMap(preset);
}

function bump(state: TableState): TableState {
  return { ...state, version: state.version + 1 };
}

function upsertSeat(state: TableState, seat: Seat): TableState {
  const others = state.seats.filter((s) => s.peerId !== seat.peerId);
  return { ...state, seats: [...others, seat] };
}

function newPeerId() {
  return `p-${Math.random().toString(36).slice(2, 10)}`;
}

type RelayAction = {
  id: number;
  payload: WireMessage & { from?: string };
};

export function useTableSession(opts: {
  code: string;
  role: Role;
  displayName: string;
  /** Optional DM bootstrap: campaign + settings applied once on host */
  bootstrap?: {
    campaignId?: string | null;
    campaignTitle?: string;
    sceneId?: string | null;
    sceneTitle?: string;
    tableName?: string;
    settings?: Partial<TableSettings>;
    mapPreset?: TableState["map"]["preset"];
  };
}) {
  const code = opts.code.toUpperCase();
  const isDm = opts.role === "dm";
  const [selfId] = useState(newPeerId);
  const [state, setState] = useState<TableState>(() => {
    const base = createTableState(code, opts.bootstrap?.tableName ?? "Table");
    if (!opts.bootstrap) return base;
    return {
      ...base,
      name: opts.bootstrap.tableName ?? base.name,
      campaignId: opts.bootstrap.campaignId ?? null,
      campaignTitle: opts.bootstrap.campaignTitle ?? base.campaignTitle,
      sceneId: opts.bootstrap.sceneId ?? null,
      sceneTitle: opts.bootstrap.sceneTitle ?? "",
      settings: { ...base.settings, ...(opts.bootstrap.settings ?? {}), tableName: opts.bootstrap.tableName ?? base.settings.tableName },
      map: opts.bootstrap.mapPreset ? { ...base.map, ...requireMap(opts.bootstrap.mapPreset) } : base.map,
    };
  });
  const [ready, setReady] = useState(isDm);
  const [joined, setJoined] = useState(false);
  const [waitingHint, setWaitingHint] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;
  const readyRef = useRef(isDm);
  readyRef.current = ready;
  const actionCursor = useRef(0);
  const putting = useRef(false);
  const lastPutVersion = useRef(0);

  const publishState = useCallback(
    async (next: TableState) => {
      if (!isDm) return;
      if (putting.current) {
        // latest wins via lastPutVersion check below
      }
      putting.current = true;
      try {
        await fetch("/api/table", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ op: "put", code, state: next, version: next.version }),
        });
        lastPutVersion.current = next.version;
      } catch {
        // retry on next change
      } finally {
        putting.current = false;
      }
    },
    [code, isDm],
  );

  const applyAsDm = useCallback(
    (fn: (s: TableState) => TableState) => {
      if (!isDm) return;
      setState((prev) => {
        const drafted = fn(prev);
        if (drafted === prev) return prev;
        const next = bump(drafted);
        stateRef.current = next;
        queueMicrotask(() => void publishState(next));
        return next;
      });
    },
    [isDm, publishState],
  );

  const postAction = useCallback(
    async (payload: WireMessage) => {
      await fetch("/api/table", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          op: "action",
          code,
          payload: { ...payload, from: selfId },
        }),
      });
    },
    [code, selfId],
  );

  // DM bootstrap — publish initial state once (keeps campaign bootstrap)
  useEffect(() => {
    if (!isDm) return;
    const initial = bump({
      ...stateRef.current,
      code,
      dmPeerId: selfId,
      seats: [
        {
          peerId: selfId,
          name: opts.displayName,
          role: "dm",
          characterId: null,
          connected: true,
          lastSeen: Date.now(),
        },
      ],
    });
    stateRef.current = initial;
    setState(initial);
    setReady(true);
    setJoined(true);
    void publishState(initial);
    void postAction({
      t: "hello",
      role: "dm",
      name: opts.displayName,
      peerId: selfId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isDm, selfId]);

  // Player bootstrap hello
  useEffect(() => {
    if (isDm) return;
    setJoined(true);
    void postAction({
      t: "hello",
      role: "player",
      name: opts.displayName,
      peerId: selfId,
    });
    void postAction({ t: "request-state" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isDm, selfId]);

  // Process a player action on DM
  const handleAction = useCallback(
    (msg: WireMessage & { from?: string }) => {
      if (!isDm) return;
      const from = msg.from ?? "";

      if (msg.t === "hello") {
        applyAsDm((s) => {
          const existing = s.seats.find((x) => x.peerId === msg.peerId);
          if (existing && existing.name === msg.name && existing.connected) return s;
          return upsertSeat(s, {
            peerId: msg.peerId,
            name: msg.name,
            role: msg.role === "dm" ? "player" : "player",
            characterId: existing?.characterId ?? null,
            connected: true,
            lastSeen: Date.now(),
          });
        });
        return;
      }

      if (msg.t === "request-state") {
        void publishState(stateRef.current);
        return;
      }

      if (msg.t === "player-upsert-sheet") {
        applyAsDm((s) => {
          const sheet = { ...msg.sheet, ownerPeerId: from || msg.sheet.ownerPeerId };
          const characters = s.characters.some((c) => c.id === sheet.id)
            ? s.characters.map((c) => (c.id === sheet.id ? sheet : c))
            : [...s.characters, sheet];
          const seats = s.seats.map((seat) =>
            seat.peerId === sheet.ownerPeerId ? { ...seat, characterId: sheet.id } : seat,
          );
          let tokens = s.map.tokens;
          if (!tokens.some((t) => t.characterId === sheet.id)) {
            tokens = [
              ...tokens,
              {
                id: `tok-${sheet.id}`,
                label: sheet.name.slice(0, 3).toUpperCase(),
                kind: "pc" as const,
                characterId: sheet.id,
                x: 2 + (tokens.length % 6),
                y: 2 + Math.floor(tokens.length / 6),
                color: sheet.tokenColor,
                size: 1 as const,
                hidden: false,
                hp: sheet.currentHp,
                maxHp: sheet.maxHp,
              },
            ];
          } else {
            tokens = tokens.map((t) =>
              t.characterId === sheet.id
                ? {
                    ...t,
                    label: sheet.name.slice(0, 3).toUpperCase(),
                    color: sheet.tokenColor,
                    hp: sheet.currentHp,
                    maxHp: sheet.maxHp,
                  }
                : t,
            );
          }
          const withChars = { ...s, characters, seats, map: { ...s.map, tokens } };
          return syncCharacterDerived(withChars, sheet);
        });
        return;
      }

      if (msg.t === "player-roll") {
        applyAsDm((s) => ({
          ...s,
          diceLog: [msg.entry, ...s.diceLog].slice(0, 40),
        }));
        return;
      }

      if (msg.t === "player-move-token") {
        applyAsDm((s) => {
          if (!s.settings.allowPlayerTokenMove) return s;
          const token = s.map.tokens.find((t) => t.id === msg.tokenId);
          if (!token) return s;
          const sheet = s.characters.find((c) => c.id === token.characterId);
          if (!sheet || sheet.ownerPeerId !== from) return s;
          if (msg.x < 0 || msg.y < 0 || msg.x >= s.map.cols || msg.y >= s.map.rows) return s;
          if (s.map.tiles[msg.y * s.map.cols + msg.x] === 1) return s;
          return {
            ...s,
            map: {
              ...s.map,
              tokens: s.map.tokens.map((t) =>
                t.id === msg.tokenId ? { ...t, x: msg.x, y: msg.y } : t,
              ),
            },
          };
        });
      }
    },
    [isDm, applyAsDm, publishState],
  );

  // Poll loop
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = async () => {
      if (cancelled) return;
      try {
        // Players must use since=0 until first full state arrives, otherwise a
        // local default version can hide an existing room forever.
        const since = isDm
          ? actionCursor.current
          : readyRef.current
            ? stateRef.current.version
            : 0;
        const res = await fetch(
          `/api/table?code=${encodeURIComponent(code)}&since=${since}`,
        );
        if (res.ok) {
          const body = (await res.json()) as {
            state: TableState | null;
            version: number;
            actions: RelayAction[];
          };

          if (!isDm) {
            if (body.state && typeof body.version === "number" && body.version > 0) {
              const next = normalizeTableState(body.state);
              setState(next);
              stateRef.current = next;
              readyRef.current = true;
              setReady(true);
              setWaitingHint(false);
            } else if (!readyRef.current) {
              setWaitingHint(true);
            }
          }

          if (isDm && body.actions?.length) {
            let maxId = actionCursor.current;
            for (const a of body.actions) {
              maxId = Math.max(maxId, a.id);
              handleAction(a.payload as WireMessage & { from?: string });
            }
            actionCursor.current = maxId;
            // ack
            void fetch("/api/table", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ op: "ack", code, upTo: maxId }),
            });
          }

          // player heartbeat / re-hello occasionally
          if (!isDm && Math.random() < 0.05) {
            void postAction({
              t: "hello",
              role: "player",
              name: opts.displayName,
              peerId: selfId,
            });
          }
        }
      } catch {
        // ignore transient
      }
      if (!cancelled) timer = setTimeout(tick, isDm ? 600 : 700);
    };

    timer = setTimeout(tick, 200);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [code, isDm, handleAction, postAction, opts.displayName, selfId]);

  const updateSheet = useCallback(
    (sheet: CharacterSheet) => {
      if (isDm) {
        applyAsDm((s) => {
          const characters = s.characters.some((c) => c.id === sheet.id)
            ? s.characters.map((c) => (c.id === sheet.id ? sheet : c))
            : [...s.characters, sheet];
          return syncCharacterDerived({ ...s, characters }, sheet);
        });
      } else {
        setState((s) => {
          const characters = s.characters.some((c) => c.id === sheet.id)
            ? s.characters.map((c) => (c.id === sheet.id ? sheet : c))
            : [...s.characters, sheet];
          return { ...s, characters };
        });
        void postAction({ t: "player-upsert-sheet", sheet });
      }
    },
    [isDm, applyAsDm, postAction],
  );

  const createMySheet = useCallback(() => {
    const sheet = emptySheet(selfId, opts.displayName);
    updateSheet(sheet);
    return sheet;
  }, [selfId, opts.displayName, updateSheet]);

  const roll = useCallback(
    (expression: string, label?: string, secret = false) => {
      const { total, detail } = rollDice(expression);
      const entry: DiceEntry = {
        id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        at: Date.now(),
        peerId: selfId,
        name: opts.displayName,
        expression: label ? `${label} (${expression})` : expression,
        detail,
        total,
        secret: secret && isDm,
      };
      if (isDm) {
        applyAsDm((s) => ({
          ...s,
          diceLog: [entry, ...s.diceLog].slice(0, 40),
        }));
      } else {
        void postAction({ t: "player-roll", entry });
        setState((s) => ({ ...s, diceLog: [entry, ...s.diceLog].slice(0, 40) }));
      }
      return entry;
    },
    [isDm, applyAsDm, postAction, selfId, opts.displayName],
  );

  const moveToken = useCallback(
    (tokenId: string, x: number, y: number) => {
      if (isDm) {
        applyAsDm((s) => {
          if (x < 0 || y < 0 || x >= s.map.cols || y >= s.map.rows) return s;
          if (s.map.tiles[y * s.map.cols + x] === 1) return s;
          return {
            ...s,
            map: {
              ...s.map,
              tokens: s.map.tokens.map((t) =>
                t.id === tokenId ? { ...t, x, y } : t,
              ),
            },
          };
        });
      } else {
        void postAction({ t: "player-move-token", tokenId, x, y });
      }
    },
    [isDm, applyAsDm, postAction],
  );

  const dmSetState = useCallback(
    (fn: (s: TableState) => TableState) => {
      if (!isDm) return;
      applyAsDm(fn);
    },
    [isDm, applyAsDm],
  );

  const visibleDice = useMemo(() => {
    if (isDm) return state.diceLog;
    return state.diceLog.filter((d) => !d.secret);
  }, [state.diceLog, isDm]);

  const visibleTokens = useMemo(() => {
    if (isDm) return state.map.tokens;
    return state.map.tokens.filter((t) => !t.hidden);
  }, [state.map.tokens, isDm]);

  const mySheet = useMemo(
    () => state.characters.find((c) => c.ownerPeerId === selfId) ?? null,
    [state.characters, selfId],
  );

  // Presence list from seats in state
  const peers = useMemo(
    () =>
      state.seats
        .filter((s) => s.peerId !== selfId)
        .map((s) => ({
          id: s.peerId,
          name: s.name,
          connectionState: (s.connected ? "connected" : "disconnected") as RTCPeerConnectionState,
          candidateType: null,
          rttMs: null,
        })),
    [state.seats, selfId],
  );

  return {
    selfId,
    peers,
    joined,
    ready,
    waitingHint,
    syncError: null as string | null,
    isDm,
    state,
    visibleDice,
    visibleTokens,
    mySheet,
    updateSheet,
    createMySheet,
    roll,
    moveToken,
    dmSetState,
  };
}

export type TableSession = ReturnType<typeof useTableSession>;
