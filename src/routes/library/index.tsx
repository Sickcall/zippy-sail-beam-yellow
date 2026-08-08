import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Copy, Download, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useHomebrewStore } from "@/lib/store/homebrew-store";

export const Route = createFileRoute("/library/")({
  component: LibraryPage,
});

function LibraryPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const ensureSeeded = useHomebrewStore((s) => s.ensureSeeded);
  const listAll = useHomebrewStore((s) => s.listAll);
  const create = useHomebrewStore((s) => s.create);
  const remove = useHomebrewStore((s) => s.remove);
  const duplicate = useHomebrewStore((s) => s.duplicate);
  const importJson = useHomebrewStore((s) => s.importJson);
  const exportJson = useHomebrewStore((s) => s.exportJson);
  const homebrew = useHomebrewStore((s) => s.homebrew);
  const [tick, setTick] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureSeeded();
    setReady(true);
    setTick((t) => t + 1);
  }, [ensureSeeded, homebrew]);

  const campaigns = ready ? listAll() : [];

  function handleImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const res = importJson(String(reader.result ?? ""));
      if (res.ok) {
        toast.success("Campaign imported");
        setTick((t) => t + 1);
      } else toast.error(res.error);
    };
    reader.readAsText(file);
  }

  return (
    <AppShell>
      <div className="grid gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">Campaign library</h1>
            <p className="mt-1 max-w-xl text-sm text-[var(--color-fg-muted)]">
              Built-in modules, your homebrew, or import JSON. Any campaign can be loaded when you
              host a table — nothing is locked to a single adventure.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImport(f);
                e.target.value = "";
              }}
            />
            <Button type="button" variant="secondary" onClick={() => fileRef.current?.click()}>
              <Upload className="size-4" />
              Import JSON
            </Button>
            <Button
              type="button"
              onClick={() => {
                const c = create({ title: "New Homebrew Campaign" });
                toast.success("Campaign created");
                window.location.href = `/library/${c.id}`;
              }}
            >
              <Plus className="size-4" />
              New campaign
            </Button>
          </div>
        </div>

        {!ready && (
          <p className="text-sm text-[var(--color-fg-muted)]">Loading library…</p>
        )}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((c) => (
            <Card key={`${c.id}-${c.source}-${tick}`}>
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={c.source === "built-in" ? "steel" : "outline"}>
                    {c.source === "built-in" ? "Built-in" : "Homebrew"}
                  </Badge>
                  <Badge variant="default">{c.edition}</Badge>
                </div>
                <CardTitle className="text-xl leading-snug">{c.title}</CardTitle>
                <CardDescription className="line-clamp-2">{c.synopsis || c.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <p className="text-xs text-[var(--color-fg-subtle)]">
                  {c.scenes.length} scenes · {c.levelRange} · {c.estimatedSessions}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link to="/library/$campaignId" params={{ campaignId: c.id }}>
                      <BookOpen className="size-3.5" />
                      {c.source === "built-in" ? "View / fork" : "Edit"}
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const d = duplicate(c.id);
                      if (d) toast.success("Duplicated");
                      setTick((t) => t + 1);
                    }}
                  >
                    <Copy className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const json = exportJson(c.id);
                      if (!json) return;
                      const blob = new Blob([json], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${c.id}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="size-3.5" />
                  </Button>
                  {c.source === "homebrew" && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete ${c.title}?`)) {
                          remove(c.id);
                          setTick((t) => t + 1);
                        }
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
