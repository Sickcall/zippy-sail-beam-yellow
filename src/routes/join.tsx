import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookMarked, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useHomebrewStore } from "@/lib/store/homebrew-store";
import { makeCode } from "@/lib/table/types";

type Search = { code?: string };

export const Route = createFileRoute("/join")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    code: typeof s.code === "string" ? s.code : undefined,
  }),
  component: JoinPage,
});

function JoinPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
  const listAll = useHomebrewStore((s) => s.listAll);
  const [code, setCode] = useState(search.code?.toUpperCase() ?? "");
  const [name, setName] = useState("");
  const [dmName, setDmName] = useState("");
  const [tableName, setTableName] = useState("Tonight's Game");
  const [campaignId, setCampaignId] = useState<string>("");
  const [edition, setEdition] = useState("D&D 5e");
  const [levelBand, setLevelBand] = useState("1–5");
  const [campaigns, setCampaigns] = useState<{ id: string; title: string; source: string; edition: string; levelRange: string }[]>([]);

  useEffect(() => {
    ensureSeeded();
    setCampaigns(listAll());
  }, [ensureSeeded, listAll]);

  function joinPlayer(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (c.length < 4) return;
    void navigate({
      to: "/table/$code",
      params: { code: c },
      search: { role: "player", name: name.trim() || "Adventurer" },
    });
  }

  function hostTable() {
    const c = makeCode();
    const camp = campaignId ? campaigns.find((x) => x.id === campaignId) : undefined;
    void navigate({
      to: "/table/$code",
      params: { code: c },
      search: {
        role: "dm",
        name: dmName.trim() || "Dungeon Master",
        campaign: camp?.id ?? "",
        table: tableName.trim() || "Table",
        edition: edition.trim() || "D&D 5e",
        levels: levelBand.trim() || "1–5",
      },
    });
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-[var(--color-bg)] px-4 py-10">
      <div className="grid w-full max-w-4xl gap-6">
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] text-[var(--color-accent)]">
            <BookMarked className="size-5" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Sit at the table</h1>
          <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
            Host any homebrew or freeform game. Players open a link or enter a code —{" "}
            <strong className="font-medium text-[var(--color-fg)]">no account required</strong>.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="size-4 text-[var(--color-steel)]" />
                Join as player
              </CardTitle>
              <CardDescription>
                No sign-in. Enter the code from your DM's invite and pick a name.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-3" onSubmit={joinPlayer}>
                <label className="grid gap-1">
                  <span className="text-xs text-[var(--color-fg-subtle)]">Table code</span>
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    className="font-mono tracking-widest"
                    maxLength={8}
                    required
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs text-[var(--color-fg-subtle)]">Your name</span>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex"
                  />
                </label>
                <Button type="submit" className="w-full">
                  Join table
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Host as DM — setup</CardTitle>
              <CardDescription>
                Choose a campaign from your library, or start freeform.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <label className="grid gap-1">
                <span className="text-xs text-[var(--color-fg-subtle)]">DM display name</span>
                <Input
                  value={dmName}
                  onChange={(e) => setDmName(e.target.value)}
                  placeholder="Dungeon Master"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs text-[var(--color-fg-subtle)]">Table name</span>
                <Input
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="Friday Night D&D"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs text-[var(--color-fg-subtle)]">Campaign module</span>
                <select
                  value={campaignId}
                  onChange={(e) => {
                    setCampaignId(e.target.value);
                    const c = campaigns.find((x) => x.id === e.target.value);
                    if (c) {
                      setEdition(c.edition);
                      setLevelBand(c.levelRange.replace(/^Levels?\s*/i, ""));
                    }
                  }}
                  className="flex h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)]"
                >
                  <option value="">Freeform (no module)</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} {c.source === "homebrew" ? "· homebrew" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="grid gap-1">
                  <span className="text-xs text-[var(--color-fg-subtle)]">Edition</span>
                  <Input value={edition} onChange={(e) => setEdition(e.target.value)} />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs text-[var(--color-fg-subtle)]">Levels</span>
                  <Input value={levelBand} onChange={(e) => setLevelBand(e.target.value)} />
                </label>
              </div>
              <Button type="button" variant="steel" className="w-full" onClick={hostTable}>
                Create table
              </Button>
              <p className="text-xs leading-relaxed text-[var(--color-fg-subtle)]">
                Need a new adventure first?{" "}
                <Link to="/library" className="text-[var(--color-steel)] underline-offset-2 hover:underline">
                  Open the campaign library
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/library">
              <BookOpen className="size-3.5" />
              Manage campaigns
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
