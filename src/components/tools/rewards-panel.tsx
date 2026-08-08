import { useMemo, useState } from "react";
import { Gift, Package, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { REWARD_PRESETS, presetToItem } from "@/lib/map/reward-presets";
import {
  applyRewardToSheet,
  emptyInventoryItem,
  type CharacterSheet,
  type InventoryItem,
  type ItemCategory,
  type ItemRarity,
  type RewardKind,
  type SessionLogEntry,
} from "@/lib/table/types";
import { cn } from "@/lib/utils";

export function RewardsPanel({
  characters,
  onGrant,
}: {
  characters: CharacterSheet[];
  onGrant: (
    nextCharacters: CharacterSheet[],
    log: SessionLogEntry,
  ) => void;
}) {
  const [kind, setKind] = useState<RewardKind>("item");
  const [targets, setTargets] = useState<string[]>([]);
  const [announce, setAnnounce] = useState(true);
  const [addAsAttack, setAddAsAttack] = useState(false);

  const [item, setItem] = useState<InventoryItem>(() =>
    emptyInventoryItem({
      name: "",
      description: "",
      category: "gear",
      rarity: "common",
    }),
  );
  const [gold, setGold] = useState(25);
  const [xp, setXp] = useState(100);
  const [featureText, setFeatureText] = useState("");

  const groups = useMemo(() => {
    const map = new Map<string, typeof REWARD_PRESETS>();
    for (const p of REWARD_PRESETS) {
      const list = map.get(p.group) ?? [];
      list.push(p);
      map.set(p.group, list);
    }
    return [...map.entries()];
  }, []);

  function toggleTarget(id: string) {
    setTargets((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function selectAll() {
    setTargets(characters.map((c) => c.id));
  }

  function applyPreset(id: string) {
    const preset = REWARD_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    if (preset.kind === "item") {
      setKind("item");
      const it = presetToItem(preset);
      if (it) {
        setItem(it);
        setAddAsAttack(it.category === "weapon");
      }
    } else if (preset.kind === "gold") {
      setKind("gold");
      setGold(preset.gold ?? 0);
    } else if (preset.kind === "xp") {
      setKind("xp");
      setXp(preset.xp ?? 0);
    } else if (preset.kind === "inspiration") {
      setKind("inspiration");
    }
  }

  function grant() {
    if (characters.length === 0) {
      toast.error("No characters at the table yet");
      return;
    }
    const ids = targets.length ? targets : characters.map((c) => c.id);
    if (ids.length === 0) {
      toast.error("Pick at least one recipient");
      return;
    }

    if (kind === "item" && !item.name.trim()) {
      toast.error("Give the item a name");
      return;
    }
    if (kind === "feature" && !featureText.trim()) {
      toast.error("Describe the feature or boon");
      return;
    }

    const recipients = characters.filter((c) => ids.includes(c.id));
    const nextCharacters = characters.map((c) => {
      if (!ids.includes(c.id)) return c;
      if (kind === "item") {
        return applyRewardToSheet(
          c,
          {
            kind: "item",
            item: { ...item, name: item.name.trim() },
            addAsAttack,
          },
          "DM",
        );
      }
      if (kind === "gold") {
        return applyRewardToSheet(c, { kind: "gold", gold }, "DM");
      }
      if (kind === "xp") {
        return applyRewardToSheet(c, { kind: "xp", xp }, "DM");
      }
      if (kind === "inspiration") {
        return applyRewardToSheet(c, { kind: "inspiration" }, "DM");
      }
      return applyRewardToSheet(
        c,
        { kind: "feature", featureText },
        "DM",
      );
    });

    const names = recipients.map((c) => c.name).join(", ");
    let summary = "";
    if (kind === "item") {
      summary = `Rewarded ${item.qty > 1 ? `${item.qty}× ` : ""}${item.name} → ${names}`;
    } else if (kind === "gold") {
      summary = `Rewarded ${gold} gp → ${names}`;
    } else if (kind === "xp") {
      summary = `Awarded ${xp} XP → ${names}`;
    } else if (kind === "inspiration") {
      summary = `Granted inspiration → ${names}`;
    } else {
      summary = `Granted boon → ${names}`;
    }

    const log: SessionLogEntry = {
      id: `log-${Date.now()}`,
      at: Date.now(),
      text: summary,
      kind: "loot",
    };

    onGrant(nextCharacters, log);
    toast.success(summary);

    if (kind === "item") {
      setItem((prev) =>
        emptyInventoryItem({
          category: prev.category,
          rarity: prev.rarity,
          name: "",
          description: "",
        }),
      );
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Gift className="size-4 text-[var(--color-steel)]" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
            Rewards
          </h3>
        </div>
        <p className="text-xs text-[var(--color-fg-subtle)]">
          Grant loot, gold, XP, or boons to party sheets
        </p>
      </div>

      {/* Recipients */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]">
            Recipients
          </span>
          <Button type="button" size="sm" variant="ghost" onClick={selectAll}>
            Everyone
          </Button>
        </div>
        {characters.length === 0 ? (
          <p className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-xs text-[var(--color-fg-subtle)]">
            Wait for players to create characters, then reward them here.
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {characters.map((c) => {
              const on = targets.includes(c.id) || targets.length === 0;
              const explicit = targets.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleTarget(c.id)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs transition-colors",
                    explicit
                      ? "border-[var(--color-steel)] bg-[color-mix(in_oklab,var(--color-steel)_16%,transparent)] text-[var(--color-fg)]"
                      : targets.length === 0
                        ? "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]"
                        : "border-[var(--color-border)] text-[var(--color-fg-subtle)]",
                  )}
                  title={targets.length === 0 ? "All selected by default" : undefined}
                >
                  <span
                    className="mr-1.5 inline-block size-2 rounded-full"
                    style={{ background: c.tokenColor }}
                  />
                  {c.name}
                  {targets.length === 0 && on ? " · all" : ""}
                </button>
              );
            })}
          </div>
        )}
        <p className="mt-1 text-[11px] text-[var(--color-fg-subtle)]">
          {targets.length === 0
            ? "No chips selected → grants to the whole party."
            : `${targets.length} selected.`}
        </p>
      </div>

      {/* Kind */}
      <div className="flex flex-wrap gap-1.5">
        {(
          [
            ["item", "Item"],
            ["gold", "Gold"],
            ["xp", "XP"],
            ["inspiration", "Inspiration"],
            ["feature", "Boon / feature"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            type="button"
            size="sm"
            variant={kind === id ? "steel" : "secondary"}
            onClick={() => setKind(id)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Presets */}
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[var(--color-fg-subtle)]">
          Quick presets
        </p>
        <div className="grid gap-2">
          {groups.map(([group, list]) => (
            <div key={group}>
              <p className="mb-1 text-[11px] text-[var(--color-fg-muted)]">{group}</p>
              <div className="flex flex-wrap gap-1">
                {list.map((p) => (
                  <Button
                    key={p.id}
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 text-[11px]"
                    onClick={() => applyPreset(p.id)}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editors */}
      {kind === "item" && (
        <div className="grid gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Item name">
              <Input
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                placeholder="Cloak of Billowing"
              />
            </Field>
            <Field label="Quantity">
              <Input
                type="number"
                value={item.qty}
                onChange={(e) =>
                  setItem({ ...item, qty: Math.max(1, Number(e.target.value) || 1) })
                }
                className="tabular-nums"
              />
            </Field>
            <Field label="Category">
              <select
                value={item.category}
                onChange={(e) => {
                  const category = e.target.value as ItemCategory;
                  setItem({ ...item, category });
                  if (category === "weapon") setAddAsAttack(true);
                }}
                className="flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm"
              >
                {(
                  [
                    "weapon",
                    "armor",
                    "potion",
                    "scroll",
                    "wondrous",
                    "gear",
                    "treasure",
                    "currency",
                    "other",
                  ] as ItemCategory[]
                ).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Rarity">
              <select
                value={item.rarity}
                onChange={(e) =>
                  setItem({ ...item, rarity: e.target.value as ItemRarity })
                }
                className="flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm"
              >
                {(
                  [
                    "common",
                    "uncommon",
                    "rare",
                    "very rare",
                    "legendary",
                    "artifact",
                    "unique",
                  ] as ItemRarity[]
                ).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description / how to use">
            <Textarea
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
              className="min-h-[96px]"
              placeholder="What the item does, action cost, saves, charges, attunement notes…"
            />
          </Field>

          <div className="grid gap-2 sm:grid-cols-3">
            <Field label="Value">
              <Input
                value={item.value}
                onChange={(e) => setItem({ ...item, value: e.target.value })}
                placeholder="150 gp"
              />
            </Field>
            <Field label="Weight">
              <Input
                value={item.weight}
                onChange={(e) => setItem({ ...item, weight: e.target.value })}
                placeholder="1 lb"
              />
            </Field>
            <Field label="DM notes (private to sheet notes field)">
              <Input
                value={item.notes}
                onChange={(e) => setItem({ ...item, notes: e.target.value })}
                placeholder="Optional"
              />
            </Field>
          </div>

          {(item.category === "weapon" || addAsAttack) && (
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Attack bonus (if weapon)">
                <Input
                  type="number"
                  value={item.attackBonus ?? ""}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      attackBonus: e.target.value === "" ? undefined : Number(e.target.value),
                    })
                  }
                  placeholder="+5"
                  className="tabular-nums"
                />
              </Field>
              <Field label="Damage">
                <Input
                  value={item.damage ?? ""}
                  onChange={(e) => setItem({ ...item, damage: e.target.value })}
                  placeholder="1d8+3"
                  className="font-mono"
                />
              </Field>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
              <input
                type="checkbox"
                checked={item.attunement}
                onChange={(e) => setItem({ ...item, attunement: e.target.checked })}
                className="size-3.5 accent-[var(--color-steel)]"
              />
              Requires attunement
            </label>
            <label className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
              <input
                type="checkbox"
                checked={addAsAttack}
                onChange={(e) => setAddAsAttack(e.target.checked)}
                className="size-3.5 accent-[var(--color-steel)]"
              />
              Also add as attack on sheet
            </label>
          </div>
        </div>
      )}

      {kind === "gold" && (
        <Field label="Gold pieces">
          <Input
            type="number"
            value={gold}
            onChange={(e) => setGold(Number(e.target.value) || 0)}
            className="max-w-xs tabular-nums"
          />
        </Field>
      )}

      {kind === "xp" && (
        <Field label="Experience points">
          <Input
            type="number"
            value={xp}
            onChange={(e) => setXp(Number(e.target.value) || 0)}
            className="max-w-xs tabular-nums"
          />
        </Field>
      )}

      {kind === "inspiration" && (
        <p className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-fg-muted)]">
          <Sparkles className="mr-1.5 inline size-3.5 text-[var(--color-warn)]" />
          Selected characters receive inspiration (shown on party tracker and sheet).
        </p>
      )}

      {kind === "feature" && (
        <Field label="Boon / feature text (appended to Features)">
          <Textarea
            value={featureText}
            onChange={(e) => setFeatureText(e.target.value)}
            className="min-h-[100px]"
            placeholder="Blessing of the Arena — Once per long rest, you can reroll a failed save."
          />
        </Field>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={grant} disabled={characters.length === 0}>
          <Send className="size-3.5" />
          Grant reward
        </Button>
        <label className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
          <input
            type="checkbox"
            checked={announce}
            onChange={(e) => setAnnounce(e.target.checked)}
            className="size-3.5 accent-[var(--color-steel)]"
          />
          Log in session history
        </label>
        <span className="text-xs text-[var(--color-fg-subtle)]">
          <Package className="mr-1 inline size-3.5" />
          Items appear in inventory with full details
        </span>
      </div>
      {/* announce is always used via log - keep checkbox for future handout; currently always logs */}
      {!announce && (
        <p className="text-[11px] text-[var(--color-fg-subtle)]">
          Session log still records the grant for DM reference.
        </p>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] uppercase tracking-wide text-[var(--color-fg-subtle)]">
        {label}
      </span>
      {children}
    </label>
  );
}
