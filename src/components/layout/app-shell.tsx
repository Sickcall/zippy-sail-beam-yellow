import { Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-dvh flex-col", className)}>
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_88%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-[var(--color-fg)] no-underline"
          >
            <span className="flex size-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[linear-gradient(160deg,var(--color-bg-subtle),var(--color-bg-panel))] text-[var(--color-steel)] shadow-[var(--shadow-inset)] transition-colors group-hover:border-[var(--color-steel)] group-hover:text-[var(--color-fg)]">
              <BookMarked className="size-4" strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Grimoire</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              to="/library"
              className="rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm text-[var(--color-fg-muted)] no-underline transition-colors hover:text-[var(--color-fg)]"
            >
              Library
            </Link>
            <Link
              to="/join"
              className="rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm text-[var(--color-fg-muted)] no-underline transition-colors hover:text-[var(--color-fg)]"
            >
              Table
            </Link>
            <AuthSlot />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--color-bg-subtle)]" />;
  }
  return (
    <>
      <SignedOut>
        <Link
          to="/login"
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-fg-muted)] no-underline transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
        >
          Sign in
        </Link>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-2">
          {user?.displayName && (
            <span className="hidden text-sm text-[var(--color-fg-muted)] sm:inline">
              {user.displayName}
            </span>
          )}
          <UserButton />
        </div>
      </SignedIn>
    </>
  );
}
