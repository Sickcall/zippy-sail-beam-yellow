import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TableSettings } from "@/lib/table/types";

export function TableSettingsPanel({
  settings,
  onChange,
  onApplyName,
}: {
  settings: TableSettings;
  onChange: (s: TableSettings) => void;
  onApplyName?: (name: string) => void;
}) {
  function patch(p: Partial<TableSettings>) {
    onChange({ ...settings, ...p });
  }

  return (
    <div className="grid gap-4">
      <Field label="Table name">
        <Input
          value={settings.tableName}
          onChange={(e) => patch({ tableName: e.target.value })}
          onBlur={() => onApplyName?.(settings.tableName)}
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Edition / system">
          <Input
            value={settings.edition}
            onChange={(e) => patch({ edition: e.target.value })}
            placeholder="D&D 5e, PF2e, homebrew…"
          />
        </Field>
        <Field label="Level band">
          <Input
            value={settings.levelBand}
            onChange={(e) => patch({ levelBand: e.target.value })}
            placeholder="1–5"
          />
        </Field>
      </div>
      <Field label="Progression">
        <div className="flex flex-wrap gap-2">
          {(["milestone", "xp", "none"] as const).map((m) => (
            <Button
              key={m}
              type="button"
              size="sm"
              variant={settings.xpMode === m ? "steel" : "secondary"}
              onClick={() => patch({ xpMode: m })}
            >
              {m}
            </Button>
          ))}
        </div>
      </Field>
      <div className="grid gap-2">
        <Toggle
          label="Players can move their tokens"
          checked={settings.allowPlayerTokenMove}
          onChange={(v) => patch({ allowPlayerTokenMove: v })}
        />
        <Toggle
          label="Reveal enemy HP to players"
          checked={settings.revealEnemyHp}
          onChange={(v) => patch({ revealEnemyHp: v })}
        />
        <Toggle
          label="Reveal monster names"
          checked={settings.revealMonsterNames}
          onChange={(v) => patch({ revealMonsterNames: v })}
        />
        <Toggle
          label="Death saves public"
          checked={settings.deathSavesPublic}
          onChange={(v) => patch({ deathSavesPublic: v })}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Short rest">
          <Input
            value={settings.shortRestHint}
            onChange={(e) => patch({ shortRestHint: e.target.value })}
          />
        </Field>
        <Field label="Long rest">
          <Input
            value={settings.longRestHint}
            onChange={(e) => patch({ longRestHint: e.target.value })}
          />
        </Field>
      </div>
      <Field label="House rules (players see this)">
        <Textarea
          value={settings.houseRules}
          onChange={(e) => patch({ houseRules: e.target.value })}
          className="min-h-[96px]"
          placeholder="Critical hits, inspiration, homebrew class rules…"
        />
      </Field>
    </div>
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

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-[var(--color-steel)]"
      />
    </label>
  );
}
