import {
  abilityMod,
  type AbilityKey,
  type CharacterSheet,
  type InventoryItem,
} from "@/lib/table/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ABILITIES: { key: AbilityKey; label: string }[] = [
  { key: "str", label: "STR" },
  { key: "dex", label: "DEX" },
  { key: "con", label: "CON" },
  { key: "int", label: "INT" },
  { key: "wis", label: "WIS" },
  { key: "cha", label: "CHA" },
];

export function CharacterSheetPanel({
  sheet,
  editable,
  onChange,
  onRoll,
  compact,
}: {
  sheet: CharacterSheet;
  editable: boolean;
  onChange: (s: CharacterSheet) => void;
  onRoll?: (expr: string, label: string) => void;
  compact?: boolean;
}) {
  function patch(p: Partial<CharacterSheet>) {
    onChange({ ...sheet, ...p });
  }

  function setAbility(key: AbilityKey, value: number) {
    patch({ abilities: { ...sheet.abilities, [key]: value } });
  }

  return (
    <div className={cn("grid gap-3", compact && "gap-2")}>
      <div className="grid gap-2 sm:grid-cols-2">
        <Field label="Name">
          <Input
            value={sheet.name}
            disabled={!editable}
            onChange={(e) => patch({ name: e.target.value })}
          />
        </Field>
        <Field label="Player">
          <Input
            value={sheet.playerName}
            disabled={!editable}
            onChange={(e) => patch({ playerName: e.target.value })}
          />
        </Field>
        <Field label="Class">
          <Input
            value={sheet.className}
            disabled={!editable}
            onChange={(e) => patch({ className: e.target.value })}
          />
        </Field>
        <Field label="Race">
          <Input
            value={sheet.race}
            disabled={!editable}
            onChange={(e) => patch({ race: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {ABILITIES.map((a) => {
          const score = sheet.abilities[a.key];
          const mod = abilityMod(score);
          return (
            <div
              key={a.key}
              className="flex flex-col items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2"
            >
              <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)]">
                {a.label}
              </span>
              <button
                type="button"
                disabled={!onRoll}
                onClick={() => onRoll?.(`1d20${mod >= 0 ? `+${mod}` : mod}`, a.label)}
                className="font-display text-lg font-semibold tabular-nums text-[var(--color-fg)] disabled:cursor-default"
              >
                {mod >= 0 ? `+${mod}` : mod}
              </button>
              <Input
                type="number"
                value={score}
                disabled={!editable}
                onChange={(e) => setAbility(a.key, Number(e.target.value) || 0)}
                className="mt-1 h-7 w-full px-1 text-center text-xs tabular-nums"
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat
          label="HP"
          value={`${sheet.currentHp}/${sheet.maxHp}`}
          editable={editable}
          onEdit={(v) => {
            const [cur, max] = v.split("/").map((n) => Number(n.trim()));
            if (!Number.isNaN(cur)) patch({ currentHp: cur });
            if (max !== undefined && !Number.isNaN(max)) patch({ maxHp: max });
          }}
        />
        <Stat
          label="AC"
          value={String(sheet.ac)}
          editable={editable}
          onEdit={(v) => patch({ ac: Number(v) || 0 })}
        />
        <Stat
          label="Speed"
          value={String(sheet.speed)}
          editable={editable}
          onEdit={(v) => patch({ speed: Number(v) || 0 })}
        />
        <Stat
          label="Prof"
          value={`+${sheet.proficiencyBonus}`}
          editable={editable}
          onEdit={(v) => patch({ proficiencyBonus: Number(v.replace("+", "")) || 0 })}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-wide text-[var(--color-fg-subtle)] uppercase">
            Attacks
          </span>
          {editable && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() =>
                patch({
                  attacks: [
                    ...sheet.attacks,
                    { name: "Attack", bonus: 0, damage: "1d6" },
                  ],
                })
              }
            >
              Add
            </Button>
          )}
        </div>
        {sheet.attacks.map((atk, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2"
          >
            <Input
              value={atk.name}
              disabled={!editable}
              onChange={(e) => {
                const attacks = sheet.attacks.slice();
                attacks[i] = { ...atk, name: e.target.value };
                patch({ attacks });
              }}
              className="h-8 min-w-[6rem] flex-1"
            />
            <Badge variant="outline" className="tabular-nums">
              {atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}
            </Badge>
            <span className="text-xs text-[var(--color-fg-muted)]">{atk.damage}</span>
            {onRoll && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() =>
                  onRoll(
                    `1d20${atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}`,
                    `${atk.name} attack`,
                  )
                }
              >
                Attack
              </Button>
            )}
            {onRoll && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onRoll(atk.damage, `${atk.name} damage`)}
              >
                Dmg
              </Button>
            )}
          </div>
        ))}
      </div>

      {!compact && (
        <>
          <Field label="Features">
            <Textarea
              value={sheet.features}
              disabled={!editable}
              onChange={(e) => patch({ features: e.target.value })}
              className="min-h-[64px]"
            />
          </Field>

          <div className="grid gap-2">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
                Inventory & rewards
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                  Gold
                </span>
                <Input
                  type="number"
                  value={sheet.gold ?? 0}
                  disabled={!editable}
                  onChange={(e) => patch({ gold: Number(e.target.value) || 0 })}
                  className="h-8 w-24 tabular-nums"
                />
                {sheet.xp != null && sheet.xp > 0 && (
                  <span className="text-xs tabular-nums text-[var(--color-fg-muted)]">
                    XP {sheet.xp}
                  </span>
                )}
              </div>
            </div>

            {(sheet.items?.length ?? 0) === 0 ? (
              <p className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]">
                No structured items yet. Rewards from the DM appear here with full details.
              </p>
            ) : (
              <ul className="grid gap-2">
                {(sheet.items ?? []).map((it) => (
                  <ItemCard
                    key={it.id}
                    item={it}
                    editable={editable}
                    onChange={(next) =>
                      patch({
                        items: (sheet.items ?? []).map((x) =>
                          x.id === next.id ? next : x,
                        ),
                      })
                    }
                    onRemove={() =>
                      patch({
                        items: (sheet.items ?? []).filter((x) => x.id !== it.id),
                      })
                    }
                    onRoll={onRoll}
                  />
                ))}
              </ul>
            )}

            <Field label="Other inventory notes">
              <Textarea
                value={sheet.inventory}
                disabled={!editable}
                onChange={(e) => patch({ inventory: e.target.value })}
                className="min-h-[56px]"
                placeholder="Loose gear, freeform notes…"
              />
            </Field>
          </div>
        </>
      )}

      {compact && (sheet.items?.length ?? 0) > 0 && (
        <div className="grid gap-1">
          <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Items
          </span>
          {(sheet.items ?? []).slice(0, 4).map((it) => (
            <div
              key={it.id}
              className="rounded border border-[var(--color-border)] px-2 py-1 text-xs"
            >
              <span className="font-medium">
                {it.qty > 1 ? `${it.qty}× ` : ""}
                {it.name}
              </span>
              {it.description && (
                <p className="mt-0.5 line-clamp-2 text-[11px] text-[var(--color-fg-muted)]">
                  {it.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ItemCard({
  item,
  editable,
  onChange,
  onRemove,
  onRoll,
}: {
  item: InventoryItem;
  editable: boolean;
  onChange: (i: InventoryItem) => void;
  onRemove: () => void;
  onRoll?: (expr: string, label: string) => void;
}) {
  const rarityColor =
    item.rarity === "legendary" || item.rarity === "artifact"
      ? "text-[var(--color-warn)]"
      : item.rarity === "rare" || item.rarity === "very rare"
        ? "text-[var(--color-steel)]"
        : item.rarity === "uncommon"
          ? "text-[var(--color-success)]"
          : "text-[var(--color-fg-subtle)]";

  return (
    <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          {editable ? (
            <Input
              value={item.name}
              onChange={(e) => onChange({ ...item, name: e.target.value })}
              className="h-8 font-medium"
            />
          ) : (
            <p className="font-medium text-[var(--color-fg)]">
              {item.qty > 1 ? `${item.qty}× ` : ""}
              {item.name}
            </p>
          )}
          <p className={cn("mt-0.5 text-[11px] capitalize", rarityColor)}>
            {item.rarity} · {item.category}
            {item.attunement ? " · attunement" : ""}
            {item.equipped ? " · equipped" : ""}
            {item.value ? ` · ${item.value}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {editable && (
            <Input
              type="number"
              value={item.qty}
              onChange={(e) =>
                onChange({ ...item, qty: Math.max(0, Number(e.target.value) || 0) })
              }
              className="h-8 w-14 tabular-nums"
              title="Quantity"
            />
          )}
          {item.damage && onRoll && (
            <>
              <Button
                type="button"
                size="sm"
                variant="steel"
                onClick={() =>
                  onRoll(
                    `1d20${(item.attackBonus ?? 0) >= 0 ? `+${item.attackBonus ?? 0}` : item.attackBonus}`,
                    `${item.name} attack`,
                  )
                }
              >
                Atk
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => onRoll(item.damage!, `${item.name} damage`)}
              >
                Dmg
              </Button>
            </>
          )}
          {editable && (
            <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
              Remove
            </Button>
          )}
        </div>
      </div>
      {editable ? (
        <Textarea
          value={item.description}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
          className="mt-2 min-h-[64px] text-sm"
          placeholder="What this does…"
        />
      ) : (
        item.description && (
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-fg-muted)]">
            {item.description}
          </p>
        )
      )}
      {editable && (
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--color-fg-muted)]">
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={item.equipped}
              onChange={(e) => onChange({ ...item, equipped: e.target.checked })}
              className="size-3.5 accent-[var(--color-steel)]"
            />
            Equipped
          </label>
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={item.attunement}
              onChange={(e) => onChange({ ...item, attunement: e.target.checked })}
              className="size-3.5 accent-[var(--color-steel)]"
            />
            Attunement
          </label>
        </div>
      )}
      {item.grantedBy && (
        <p className="mt-1 text-[10px] text-[var(--color-fg-subtle)]">
          Granted by {item.grantedBy}
          {item.grantedAt
            ? ` · ${new Date(item.grantedAt).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}`
            : ""}
        </p>
      )}
    </li>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function Stat({
  label,
  value,
  editable,
  onEdit,
}: {
  label: string;
  value: string;
  editable: boolean;
  onEdit: (v: string) => void;
}) {
  return (
    <label className="grid gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-2">
      <span className="text-[10px] tracking-wide text-[var(--color-fg-subtle)] uppercase">
        {label}
      </span>
      <Input
        value={value}
        disabled={!editable}
        onChange={(e) => onEdit(e.target.value)}
        className="h-8 border-transparent bg-transparent px-0 font-display text-base font-semibold tabular-nums focus-visible:border-[var(--color-border)] focus-visible:px-2"
      />
    </label>
  );
}
