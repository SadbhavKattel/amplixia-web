import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Amplixia home"
      className={cn(
        "group inline-flex items-center gap-2.5 text-fg transition-opacity hover:opacity-90",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative grid h-7 w-7 place-items-center rounded-md bg-fg text-bg ring-1 ring-fg/20"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <path
            d="M2 13L8 3l6 10M5 10h6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">Amplixia</span>
    </Link>
  );
}
