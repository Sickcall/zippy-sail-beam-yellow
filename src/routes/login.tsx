import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[var(--color-bg)] px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] text-[var(--color-accent)]">
            <BookMarked className="size-5" />
          </div>
          <CardTitle className="text-2xl">Sign in to Grimoire</CardTitle>
          <CardDescription>
            Optional — campaigns run fully offline in your browser. Sign in to sync identity across
            devices when deployed.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-center text-sm text-[var(--color-fg-muted)]">
              Sign-in is disabled in this environment.
            </p>
          )}
          <Link
            to="/"
            className="mt-2 text-center text-sm text-[var(--color-fg-subtle)] no-underline hover:text-[var(--color-fg-muted)]"
          >
            Back to library
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
