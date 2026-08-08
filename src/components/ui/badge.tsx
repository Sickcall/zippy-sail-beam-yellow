import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-bg-subtle)] text-[var(--color-fg-muted)]",
        accent:
          "border-transparent bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] text-[var(--color-accent)]",
        steel:
          "border-transparent bg-[color-mix(in_oklab,var(--color-steel)_16%,transparent)] text-[var(--color-steel)]",
        danger:
          "border-transparent bg-[color-mix(in_oklab,var(--color-danger)_18%,transparent)] text-[var(--color-danger)]",
        success:
          "border-transparent bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[var(--color-success)]",
        warn:
          "border-transparent bg-[color-mix(in_oklab,var(--color-warn)_18%,transparent)] text-[var(--color-warn)]",
        outline: "border-[var(--color-border-strong)] text-[var(--color-fg-muted)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
