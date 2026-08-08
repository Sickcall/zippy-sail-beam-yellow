import { StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useSessionStore } from "@/lib/store/session-store";

export function NotesPanel() {
  const sessionNotes = useSessionStore((s) => s.sessionNotes);
  const privateNotes = useSessionStore((s) => s.privateNotes);
  const setSessionNotes = useSessionStore((s) => s.setSessionNotes);
  const setPrivateNotes = useSessionStore((s) => s.setPrivateNotes);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
        <StickyNote className="size-4" />
        <h3 className="font-display text-sm font-semibold tracking-wide text-[var(--color-fg)] uppercase">
          Notes
        </h3>
      </div>

      <label className="grid min-h-0 flex-1 gap-1.5">
        <span className="text-xs text-[var(--color-fg-subtle)]">Table notes</span>
        <Textarea
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
          placeholder="What happened this scene..."
          className="min-h-[100px] flex-1 resize-none"
        />
      </label>

      <label className="grid min-h-0 flex-1 gap-1.5">
        <span className="text-xs text-[var(--color-fg-subtle)]">Private DM notes</span>
        <Textarea
          value={privateNotes}
          onChange={(e) => setPrivateNotes(e.target.value)}
          placeholder="Secrets, twists, upcoming beats..."
          className="min-h-[100px] flex-1 resize-none"
        />
      </label>
    </div>
  );
}
