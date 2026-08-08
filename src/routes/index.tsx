import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Dices,
  Library,
  Map as MapIcon,
  ScrollText,
  Settings2,
  Swords,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useHomebrewStore } from "@/lib/store/homebrew-store";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
  const listAll = useHomebrewStore((s) => s.listAll);
  useEffect(() => {
    ensureSeeded();
  }, [ensureSeeded]);
  const campaigns = listAll();

  return (
    <AppShell>
      <div className="grid gap-10">
        <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div className="grid gap-4">
            <Badge variant="steel" className="w-fit">
              Universal campaign platform
            </Badge>
            <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-display-gradient sm:text-5xl">
              Any homebrew. Full table. DM in control.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
              Grimoire is a complete virtual tabletop and campaign toolkit — maps, sheets, combat,
              dice, NPCs, clocks, loot, and a module library. Run official-style homebrew or pure
              freeform. Share a public invite link — players need no account; only you see DM tools.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/join">
                  Host or join
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/library">
                  <Library className="size-4" />
                  Campaign library
                </Link>
              </Button>
            </div>
          </div>

          <Card className="border-[var(--color-border-strong)] bg-[var(--color-bg-panel)]">
            <CardHeader>
              <CardTitle className="text-base">Everything a campaign needs</CardTitle>
              <CardDescription>Setup once — use every session.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Library, label: "Campaign library", detail: "Create, import, fork JSON" },
                { icon: Users, label: "Live multiplayer", detail: "Join codes, seats, roles" },
                { icon: MapIcon, label: "Battle maps", detail: "Presets, paint, tokens" },
                { icon: ScrollText, label: "Character sheets", detail: "Any class or homebrew" },
                { icon: Swords, label: "Combat tracker", detail: "Init, HP, conditions" },
                { icon: Dices, label: "Shared dice", detail: "Public & secret rolls" },
                { icon: Wrench, label: "DM toolkit", detail: "NPCs, clocks, loot, challenges" },
                { icon: Settings2, label: "Table settings", detail: "Edition, rules, visibility" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3"
                >
                  <f.icon className="mt-0.5 size-4 shrink-0 text-[var(--color-steel)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-fg)]">{f.label}</p>
                    <p className="text-xs text-[var(--color-fg-subtle)]">{f.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="library" className="grid gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[var(--color-fg)]">
                Your library
              </h2>
              <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                Built-in modules plus every homebrew you add. Load any of them when you host.
              </p>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link to="/library">
                <BookOpen className="size-3.5" />
                Open library
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {campaigns.slice(0, 6).map((campaign) => (
              <Card
                key={campaign.id}
                className="flex flex-col overflow-hidden transition-colors hover:border-[var(--color-border-strong)]"
              >
                <div className="relative h-32 overflow-hidden border-b border-[var(--color-border)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        campaign.source === "homebrew"
                          ? "linear-gradient(145deg, #1a1612 0%, #12100e 40%, color-mix(in oklab, var(--color-ember) 18%, #0c0b0a) 100%)"
                          : "linear-gradient(145deg, #141820 0%, #101418 45%, color-mix(in oklab, var(--color-steel) 22%, #0a0c10) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 12px, color-mix(in oklab, white 4%, transparent) 12px, color-mix(in oklab, white 4%, transparent) 13px)",
                    }}
                  />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="bg-[color-mix(in_oklab,var(--color-bg)_70%,transparent)]"
                    >
                      {campaign.source === "homebrew" ? "Homebrew" : campaign.edition}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl leading-snug">{campaign.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {campaign.synopsis || campaign.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-wrap gap-2">
                  <Button asChild className="flex-1">
                    <Link to="/join">Run at table</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link to="/library/$campaignId" params={{ campaignId: campaign.id }}>
                      Open
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
