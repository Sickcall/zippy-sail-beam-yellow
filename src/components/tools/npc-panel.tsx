import { Plus, Swords, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { abilityMod, emptyNpc, type NpcStatBlock } from "@/lib/table/types";

export function NpcPanel({
  npcs,
  onChange,
  onSpawn,
  onRoll,
}: {
  npcs: NpcStatBlock[];
  onChange: (npcs: NpcStatBlock[]) => void;
  onSpawn: (npc: NpcStatBlock) => void;
  onRoll: (expr: string, label: string) => void;
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
          NPCs & monsters
        </h3>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => onChange([...npcs, emptyNpc()])}
        >
          <Plus className="size-3.5" />
          Add
        </Button>
      </div>
      {npcs.length === 0 && (
        <p className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-6 text-center text-xs text-[var(--color-fg-subtle)]">
          Build stat blocks for any adventure — then spawn them onto the map.
        </p>
      )}
      {npcs.map((npc) => (
        <div
          key={npc.id}
          className="grid gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3"
        >
          <div className="flex flex-wrap gap-2">
            <Input
              value={npc.name}
              onChange={(e) =>
                onChange(npcs.map((n) => (n.id === npc.id ? { ...n, name: e.target.value } : n)))
              }
              className="min-w-[8rem] flex-1 font-medium"
            />
            <Input
              value={npc.cr}
              onChange={(e) =>
                onChange(npcs.map((n) => (n.id === npc.id ? { ...n, cr: e.target.value } : n)))
              }
              className="w-16"
              placeholder="CR"
            />
            <Button type="button" size="sm" variant="steel" onClick={() => onSpawn(npc)}>
              <Swords className="size-3.5" />
              Spawn
            </Button>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              onClick={() => onChange(npcs.filter((n) => n.id !== npc.id))}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Num label="AC" value={npc.ac} onChange={(ac) => onChange(npcs.map((n) => (n.id === npc.id ? { ...n, ac } : n)))} />
            <Num label="HP" value={npc.hp} onChange={(hp) => onChange(npcs.map((n) => (n.id === npc.id ? { ...n, hp, maxHp: Math.max(n.maxHp, hp) } : n)))} />
            <Num label="Max" value={npc.maxHp} onChange={(maxHp) => onChange(npcs.map((n) => (n.id === npc.id ? { ...n, maxHp } : n)))} />
          </div>
          <div className="flex flex-wrap gap-1">
            {(Object.keys(npc.abilities) as (keyof typeof npc.abilities)[]).map((k) => {
              const mod = abilityMod(npc.abilities[k]);
              return (
                <button
                  key={k}
                  type="button"
                  className="rounded border border-[var(--color-border)] px-2 py-1 text-[10px] uppercase tabular-nums"
                  onClick={() => onRoll(`1d20${mod >= 0 ? `+${mod}` : mod}`, `${npc.name} ${k.toUpperCase()}`)}
                >
                  {k} {mod >= 0 ? `+${mod}` : mod}
                </button>
              );
            })}
          </div>
          {npc.attacks.map((atk, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium">{atk.name}</span>
              <Button type="button" size="sm" variant="secondary" onClick={() => onRoll(`1d20${atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}`, `${npc.name} ${atk.name}`)}>
                Atk {atk.bonus >= 0 ? `+${atk.bonus}` : atk.bonus}
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => onRoll(atk.damage, `${npc.name} dmg`)}>
                {atk.damage}
              </Button>
            </div>
          ))}
          <Textarea
            value={npc.traits}
            onChange={(e) =>
              onChange(npcs.map((n) => (n.id === npc.id ? { ...n, traits: e.target.value } : n)))
            }
            placeholder="Traits, legendary actions…"
            className="min-h-[56px] text-xs"
          />
        </div>
      ))}
    </div>
  );
}

function Num({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="grid gap-0.5">
      <span className="text-[10px] text-[var(--color-fg-subtle)]">{label}</span>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-8 tabular-nums"
      />
    </label>
  );
}
