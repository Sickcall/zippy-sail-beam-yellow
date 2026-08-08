import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCampaign } from "@/data/campaigns";

export const Route = createFileRoute("/campaign/$campaignId")({
  component: CampaignOverviewPage,
});

function CampaignOverviewPage() {
  const { campaignId } = Route.useParams();
  const campaign = getCampaign(campaignId);
  if (!campaign) throw notFound();

  return (
    <AppShell>
      <div className="mx-auto grid max-w-4xl gap-8">
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Library
            </Link>
          </Button>
        </div>

        <header className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="steel">{campaign.edition}</Badge>
            <Badge variant="default">{campaign.levelRange}</Badge>
            <Badge variant="default">{campaign.estimatedSessions}</Badge>
          </div>
          <h1 className="font-display text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {campaign.title}
          </h1>
          <p className="text-base text-[var(--color-fg-muted)] sm:text-lg">{campaign.subtitle}</p>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
            {campaign.synopsis}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg">
              <Link to="/run/$campaignId" params={{ campaignId: campaign.id }}>
                Open session runner
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Antagonist</CardTitle>
              <CardDescription>{campaign.antagonist}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Divine patron</CardTitle>
              <CardDescription>{campaign.patron}</CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="grid gap-3">
          <h2 className="font-display text-xl font-semibold">Module features</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {campaign.features.map((f) => (
              <li
                key={f}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-3 text-sm text-[var(--color-fg-muted)]"
              >
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-3">
          <h2 className="font-display text-xl font-semibold">Scene map</h2>
          <div className="grid gap-2">
            {campaign.scenes.map((scene) => (
              <Card key={scene.id}>
                <CardHeader className="flex-row items-start gap-3 space-y-0 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] font-display text-sm text-[var(--color-steel)]">
                    {scene.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base">{scene.title}</CardTitle>
                    <CardDescription className="mt-1">{scene.summary}</CardDescription>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {scene.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {campaign.aftermath && (
          <section className="grid gap-3">
            <h2 className="font-display text-xl font-semibold">{campaign.aftermath.title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {campaign.aftermath.actTwoSettings.map((s) => (
                <Card key={s.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                    <CardDescription>{s.text}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        )}

        {campaign.lore && (
          <section className="grid gap-3">
            <h2 className="font-display text-xl font-semibold">{campaign.lore.title}</h2>
            {campaign.lore.sections.map((sec) => (
              <Card key={sec.title}>
                <CardHeader>
                  <CardTitle className="text-base">{sec.title}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {sec.items.map((item) => (
                    <p key={item} className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {item}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {campaign.appendix && (
          <section className="grid gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-[var(--color-steel)]" />
              <h2 className="font-display text-xl font-semibold">{campaign.appendix.title}</h2>
            </div>
            {campaign.appendix.sections.map((sec) => (
              <Card key={sec.title}>
                <CardHeader>
                  <CardTitle className="text-base">{sec.title}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {sec.items.map((item) => (
                    <p key={item} className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {item}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        <Separator />

        <div className="flex justify-center pb-6">
          <Button asChild size="lg">
            <Link to="/run/$campaignId" params={{ campaignId: campaign.id }}>
              Run this campaign
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
