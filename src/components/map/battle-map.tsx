import { useCallback, useMemo, useRef, useState } from "react";
import { themeForPreset, TILE_LABELS } from "@/lib/map/presets";
import type { MapState, MapToken } from "@/lib/table/types";
import { cn } from "@/lib/utils";

export function BattleMap({
  map,
  tokens,
  isDm,
  selectedId,
  onSelect,
  onMove,
  onPaint,
  paintMode,
  dropMode,
  onDropAt,
}: {
  map: MapState;
  tokens: MapToken[];
  isDm: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (tokenId: string, x: number, y: number) => void;
  onPaint?: (x: number, y: number) => void;
  paintMode?: boolean;
  /** When set, click places a drop instead of selecting */
  dropMode?: boolean;
  onDropAt?: (x: number, y: number) => void;
}) {
  const cell = map.cellSize;
  const width = map.cols * cell;
  const height = map.rows * cell;
  const dragging = useRef<string | null>(null);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const theme = useMemo(() => themeForPreset(map.preset), [map.preset]);
  const uid = useMemo(
    () => `${map.preset}-${map.cols}x${map.rows}-${map.name.replace(/\s+/g, "")}`,
    [map.preset, map.cols, map.rows, map.name],
  );

  const cellFromEvent = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      const x = Math.floor(((e.clientX - rect.left) * scaleX) / cell);
      const y = Math.floor(((e.clientY - rect.top) * scaleY) / cell);
      return {
        x: Math.max(0, Math.min(map.cols - 1, x)),
        y: Math.max(0, Math.min(map.rows - 1, y)),
      };
    },
    [cell, width, height, map.cols, map.rows],
  );

  return (
    <div className="map-stage relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] shadow-[var(--shadow-panel)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse at 25% 15%, color-mix(in oklab, var(--color-steel) 14%, transparent), transparent 50%), radial-gradient(ellipse at 90% 85%, color-mix(in oklab, var(--color-ember) 8%, transparent), transparent 45%)`,
        }}
      />
      <div className="relative overflow-auto scrollbar-thin" style={{ background: theme.ambient }}>
        <div className="min-w-0 p-2 sm:p-3">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className={cn(
              "mx-auto block h-auto w-full max-w-full touch-none select-none",
              dropMode && "cursor-crosshair",
            )}
            style={{ maxHeight: "min(64vh, 620px)" }}
            onPointerMove={(e) => {
              const c = cellFromEvent(e);
              setHover(c);
              if (paintMode && isDm && e.buttons === 1 && onPaint) onPaint(c.x, c.y);
              if (dragging.current && e.buttons === 1) {
                onMove(dragging.current, c.x, c.y);
              }
            }}
            onPointerDown={(e) => {
              const c = cellFromEvent(e);
              if (dropMode && isDm && onDropAt) {
                onDropAt(c.x, c.y);
                return;
              }
              if (paintMode && isDm && onPaint) {
                onPaint(c.x, c.y);
                return;
              }
              const hit = [...tokens]
                .reverse()
                .find(
                  (t) =>
                    c.x >= t.x &&
                    c.y >= t.y &&
                    c.x < t.x + t.size &&
                    c.y < t.y + t.size,
                );
              if (hit) {
                onSelect(hit.id);
                dragging.current = hit.id;
                (e.target as Element).setPointerCapture?.(e.pointerId);
              } else {
                onSelect(null);
              }
            }}
            onPointerUp={() => {
              dragging.current = null;
            }}
            onPointerLeave={() => setHover(null)}
          >
            <defs>
              {/* Floor checker + grit */}
              <pattern id={`${uid}-floor`} width={cell * 2} height={cell * 2} patternUnits="userSpaceOnUse">
                <rect width={cell * 2} height={cell * 2} fill={theme.floor} />
                <rect width={cell} height={cell} fill={theme.floorAlt} opacity={0.65} />
                <rect x={cell} y={cell} width={cell} height={cell} fill={theme.floorAlt} opacity={0.65} />
                <circle cx={cell * 0.25} cy={cell * 0.35} r={1.1} fill={theme.wallEdge} opacity={0.22} />
                <circle cx={cell * 1.55} cy={cell * 0.7} r={0.9} fill={theme.wallEdge} opacity={0.18} />
                <circle cx={cell * 0.9} cy={cell * 1.4} r={1.3} fill={theme.wallEdge} opacity={0.15} />
                <circle cx={cell * 1.7} cy={cell * 1.75} r={0.7} fill={theme.wallEdge} opacity={0.2} />
              </pattern>

              {/* Brick wall */}
              <pattern id={`${uid}-brick`} width={cell} height={cell} patternUnits="userSpaceOnUse">
                <rect width={cell} height={cell} fill={theme.wall} />
                <path
                  d={`M0 ${cell / 2} H${cell} M${cell / 2} 0 V${cell / 2} M0 ${cell} H${cell}`}
                  stroke={theme.wallEdge}
                  strokeWidth={1}
                  opacity={0.55}
                />
                <rect x={1} y={1} width={cell / 2 - 2} height={cell / 2 - 2} fill="white" opacity={0.04} />
              </pattern>

              {/* Difficult hatch */}
              <pattern id={`${uid}-diff`} width={8} height={8} patternUnits="userSpaceOnUse">
                <path d="M0 8 L8 0" stroke={theme.difficult} strokeWidth={1.4} opacity={0.9} />
              </pattern>

              {/* Water */}
              <pattern id={`${uid}-water`} width={cell} height={cell} patternUnits="userSpaceOnUse">
                <rect width={cell} height={cell} fill={theme.water} />
                <path
                  d={`M2 ${cell * 0.35} Q ${cell * 0.35} ${cell * 0.2}, ${cell * 0.7} ${cell * 0.38} T ${cell - 2} ${cell * 0.4}`}
                  fill="none"
                  stroke="white"
                  strokeOpacity={0.22}
                  strokeWidth={1.3}
                />
                <path
                  d={`M4 ${cell * 0.65} Q ${cell * 0.4} ${cell * 0.52}, ${cell * 0.75} ${cell * 0.68} T ${cell - 3} ${cell * 0.7}`}
                  fill="none"
                  stroke="white"
                  strokeOpacity={0.12}
                  strokeWidth={1}
                />
              </pattern>

              {/* Wood cover */}
              <pattern id={`${uid}-wood`} width={cell} height={cell} patternUnits="userSpaceOnUse">
                <rect width={cell} height={cell} fill={theme.cover} />
                <path
                  d={`M3 4 Q ${cell / 2} 8, ${cell - 3} 5 M4 ${cell / 2} Q ${cell / 2} ${cell / 2 + 4}, ${cell - 4} ${cell / 2} M5 ${cell - 6} Q ${cell / 2} ${cell - 3}, ${cell - 5} ${cell - 7}`}
                  fill="none"
                  stroke={theme.wallEdge}
                  strokeWidth={1}
                  opacity={0.45}
                />
              </pattern>

              <filter id={`${uid}-depth`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodOpacity="0.5" />
              </filter>
              <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.4" floodOpacity="0.4" />
              </filter>
              <radialGradient id={`${uid}-shine`} cx="32%" cy="28%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="50%" stopColor="white" stopOpacity="0.05" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${uid}-wall-top`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.12" />
                <stop offset="100%" stopColor="black" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Ambient floor */}
            <rect width={width} height={height} fill={`url(#${uid}-floor)`} />

            {/* Floor edge vignette */}
            <rect
              width={width}
              height={height}
              fill="none"
              stroke="black"
              strokeWidth={cell * 0.35}
              opacity={0.12}
            />

            {/* Tiles */}
            {map.tiles.map((tile, i) => {
              if (!tile) return null;
              const x = i % map.cols;
              const y = Math.floor(i / map.cols);
              const px = x * cell;
              const py = y * cell;

              if (tile === 1) {
                return (
                  <g key={i} filter={`url(#${uid}-depth)`}>
                    <rect x={px} y={py} width={cell} height={cell} fill={`url(#${uid}-brick)`} />
                    <rect x={px} y={py} width={cell} height={cell} fill={`url(#${uid}-wall-top)`} />
                    <rect x={px} y={py} width={cell} height={2} fill={theme.wallEdge} opacity={0.5} />
                    <rect x={px} y={py + cell - 2} width={cell} height={2} fill="black" opacity={0.28} />
                  </g>
                );
              }

              if (tile === 2) {
                return (
                  <g key={i}>
                    <rect x={px} y={py} width={cell} height={cell} fill={theme.difficult} opacity={0.35} />
                    <rect x={px} y={py} width={cell} height={cell} fill={`url(#${uid}-diff)`} />
                  </g>
                );
              }

              if (tile === 3) {
                return (
                  <g key={i}>
                    <rect x={px} y={py} width={cell} height={cell} fill={theme.hazard} opacity={0.85} />
                    <path
                      d={`M${px + cell * 0.5} ${py + 6} L${px + cell - 7} ${py + cell - 7} L${px + 7} ${py + cell - 7} Z`}
                      fill="none"
                      stroke="var(--color-warn)"
                      strokeWidth={1.5}
                      opacity={0.85}
                    />
                    <text
                      x={px + cell / 2}
                      y={py + cell * 0.62}
                      textAnchor="middle"
                      fill="var(--color-warn)"
                      fontSize={cell * 0.32}
                      fontWeight={700}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      !
                    </text>
                  </g>
                );
              }

              if (tile === 4) {
                return (
                  <g key={i} filter={`url(#${uid}-soft)`}>
                    <rect
                      x={px + 3}
                      y={py + 3}
                      width={cell - 6}
                      height={cell - 6}
                      rx={3}
                      fill={theme.door}
                    />
                    <rect
                      x={px + 5}
                      y={py + 5}
                      width={cell - 10}
                      height={cell - 10}
                      rx={2}
                      fill="none"
                      stroke={theme.wallEdge}
                      strokeWidth={1}
                      opacity={0.6}
                    />
                    <circle
                      cx={px + cell * 0.68}
                      cy={py + cell * 0.5}
                      r={2.2}
                      fill={theme.floorAlt}
                    />
                    <line
                      x1={px + cell * 0.5}
                      y1={py + 6}
                      x2={px + cell * 0.5}
                      y2={py + cell - 6}
                      stroke={theme.wallEdge}
                      strokeWidth={1}
                      opacity={0.4}
                    />
                  </g>
                );
              }

              if (tile === 5) {
                return (
                  <rect
                    key={i}
                    x={px}
                    y={py}
                    width={cell}
                    height={cell}
                    fill={`url(#${uid}-water)`}
                  />
                );
              }

              if (tile === 6) {
                return (
                  <g key={i} filter={`url(#${uid}-soft)`}>
                    <rect
                      x={px + 3}
                      y={py + 4}
                      width={cell - 6}
                      height={cell - 8}
                      rx={2}
                      fill={`url(#${uid}-wood)`}
                    />
                    <rect
                      x={px + 3}
                      y={py + 4}
                      width={cell - 6}
                      height={3}
                      fill="white"
                      opacity={0.08}
                    />
                  </g>
                );
              }

              if (tile === 7) {
                const cx = px + cell / 2;
                const cy = py + cell / 2;
                return (
                  <g key={i} filter={`url(#${uid}-depth)`}>
                    <ellipse
                      cx={cx + 1}
                      cy={cy + cell * 0.22}
                      rx={cell * 0.28}
                      ry={cell * 0.1}
                      fill="black"
                      opacity={0.3}
                    />
                    <circle cx={cx} cy={cy} r={cell * 0.3} fill={theme.pillar} />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={cell * 0.3}
                      fill="none"
                      stroke={theme.wallEdge}
                      strokeWidth={2}
                    />
                    <circle cx={cx} cy={cy} r={cell * 0.16} fill={theme.wallEdge} opacity={0.35} />
                    <circle cx={cx - 3} cy={cy - 3} r={cell * 0.08} fill="white" opacity={0.15} />
                  </g>
                );
              }

              return null;
            })}

            {/* Soft wall AO shadow: darken floor next to walls */}
            {map.tiles.map((tile, i) => {
              if (tile !== 1) return null;
              const x = i % map.cols;
              const y = Math.floor(i / map.cols);
              const neighbors: [number, number][] = [
                [x + 1, y],
                [x - 1, y],
                [x, y + 1],
                [x, y - 1],
              ];
              return neighbors.map(([nx, ny], ni) => {
                if (nx < 0 || ny < 0 || nx >= map.cols || ny >= map.rows) return null;
                const t = map.tiles[ny * map.cols + nx];
                if (t === 1) return null;
                return (
                  <rect
                    key={`sh-${i}-${ni}`}
                    x={nx * cell}
                    y={ny * cell}
                    width={cell}
                    height={cell}
                    fill="black"
                    opacity={0.08}
                    pointerEvents="none"
                  />
                );
              });
            })}

            {/* Grid */}
            {Array.from({ length: map.cols + 1 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * cell}
                y1={0}
                x2={i * cell}
                y2={height}
                stroke={theme.grid}
                strokeWidth={i % 5 === 0 ? 1.4 : 1}
                opacity={i % 5 === 0 ? 1 : 0.75}
              />
            ))}
            {Array.from({ length: map.rows + 1 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * cell}
                x2={width}
                y2={i * cell}
                stroke={theme.grid}
                strokeWidth={i % 5 === 0 ? 1.4 : 1}
                opacity={i % 5 === 0 ? 1 : 0.75}
              />
            ))}

            {/* Coordinate ticks every 5 */}
            {Array.from({ length: Math.ceil(map.cols / 5) }).map((_, i) => (
              <text
                key={`cx${i}`}
                x={i * 5 * cell + 3}
                y={10}
                fill={theme.grid}
                fontSize={9}
                opacity={0.7}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {i * 5}
              </text>
            ))}

            {hover && (
              <rect
                x={hover.x * cell}
                y={hover.y * cell}
                width={cell}
                height={cell}
                fill={
                  dropMode
                    ? "color-mix(in oklab, var(--color-danger) 28%, transparent)"
                    : "color-mix(in oklab, var(--color-steel) 22%, transparent)"
                }
                stroke={
                  dropMode
                    ? "color-mix(in oklab, var(--color-danger) 55%, transparent)"
                    : "color-mix(in oklab, var(--color-steel) 50%, transparent)"
                }
                strokeWidth={1.5}
                pointerEvents="none"
              />
            )}

            {/* Tokens */}
            {tokens.map((t) => {
              const cx = t.x * cell + (t.size * cell) / 2;
              const cy = t.y * cell + (t.size * cell) / 2;
              const r = (t.size * cell) / 2 - 3;
              const selected = selectedId === t.id;
              const isPc = t.kind === "pc";
              const ring =
                selected
                  ? "var(--color-accent)"
                  : isPc
                    ? "color-mix(in oklab, var(--color-steel) 70%, white)"
                    : t.kind === "npc"
                      ? "var(--color-rune)"
                      : "var(--color-bg)";
              return (
                <g key={t.id} className={cn(t.hidden && isDm && "opacity-40")}>
                  <ellipse
                    cx={cx + 1}
                    cy={cy + r * 0.62}
                    rx={r * 0.78}
                    ry={r * 0.3}
                    fill="black"
                    opacity={0.32}
                  />
                  {/* outer ring by kind */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 2}
                    fill="none"
                    stroke={ring}
                    strokeWidth={selected ? 2.5 : 1.5}
                    opacity={selected ? 1 : 0.75}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={t.color}
                    stroke="var(--color-bg)"
                    strokeWidth={2}
                    className="cursor-grab active:cursor-grabbing"
                  />
                  <circle cx={cx} cy={cy} r={r} fill={`url(#${uid}-shine)`} className="pointer-events-none" />
                  {/* inner rim */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r - 3}
                    fill="none"
                    stroke="white"
                    strokeOpacity={0.12}
                    strokeWidth={1}
                    className="pointer-events-none"
                  />
                  <text
                    x={cx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--color-accent-fg)"
                    fontSize={Math.max(10, cell * 0.26 * Math.min(t.size, 2))}
                    fontWeight={700}
                    className="pointer-events-none"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t.label.slice(0, t.size >= 2 ? 4 : 3)}
                  </text>
                  {/* HP bar */}
                  {typeof t.hp === "number" && typeof t.maxHp === "number" && t.maxHp > 0 && (
                    <g className="pointer-events-none">
                      <rect
                        x={t.x * cell + 4}
                        y={t.y * cell + t.size * cell - 9}
                        width={t.size * cell - 8}
                        height={5}
                        rx={2}
                        fill="var(--color-bg)"
                        opacity={0.8}
                      />
                      <rect
                        x={t.x * cell + 4}
                        y={t.y * cell + t.size * cell - 9}
                        width={Math.max(0, (t.size * cell - 8) * Math.min(1, t.hp / t.maxHp))}
                        height={5}
                        rx={2}
                        fill={
                          t.hp / t.maxHp <= 0.3
                            ? "var(--color-danger)"
                            : t.hp / t.maxHp <= 0.6
                              ? "var(--color-warn)"
                              : "var(--color-success)"
                        }
                      />
                    </g>
                  )}
                  {/* conditions dots */}
                  {!!t.conditions?.length && (
                    <circle
                      cx={cx + r * 0.65}
                      cy={cy - r * 0.65}
                      r={4}
                      fill="var(--color-warn)"
                      stroke="var(--color-bg)"
                      strokeWidth={1}
                      className="pointer-events-none"
                    />
                  )}
                  {t.hidden && isDm && (
                    <text
                      x={cx}
                      y={cy - r - 4}
                      textAnchor="middle"
                      fill="var(--color-fg-subtle)"
                      fontSize={8}
                      className="pointer-events-none"
                    >
                      hidden
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg-elevated)_94%,transparent)] px-3 py-2 backdrop-blur-sm">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            {map.name}
          </span>
          <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
            {map.preset}
          </span>
          {dropMode && (
            <span className="rounded-full border border-[color-mix(in_oklab,var(--color-danger)_40%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] px-2 py-0.5 text-[10px] text-[var(--color-danger)]">
              Click map to place
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-fg-subtle)]">
          <span className="tabular-nums">
            {map.cols}×{map.rows}
            {hover ? ` · ${hover.x},${hover.y}` : ""}
            {` · ${tokens.length} tokens`}
          </span>
          <span className="hidden opacity-40 sm:inline">|</span>
          <span className="hidden flex-wrap gap-1.5 sm:flex">
            {[1, 2, 3, 4, 5, 6, 7].map((tile) => (
              <span key={tile} className="inline-flex items-center gap-1">
                <span
                  className="inline-block size-2.5 rounded-[2px] border border-[var(--color-border)]"
                  style={{
                    background:
                      tile === 1
                        ? theme.wall
                        : tile === 2
                          ? theme.difficult
                          : tile === 3
                            ? theme.hazard
                            : tile === 4
                              ? theme.door
                              : tile === 5
                                ? theme.water
                                : tile === 6
                                  ? theme.cover
                                  : theme.pillar,
                  }}
                />
                {TILE_LABELS[tile]}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
