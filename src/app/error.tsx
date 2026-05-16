"use client";

import { ButtonLink, Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center py-24">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
        Error{error.digest ? ` · ${error.digest}` : ""}
      </div>
      <h1 className="mt-4 text-display-lg font-semibold">Something went wrong.</h1>
      <p className="mt-3 max-w-md text-fg-muted">
        We&apos;ve been notified. You can try again, or head back to the homepage.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <ButtonLink href="/" variant="secondary">
          Go home
        </ButtonLink>
      </div>
    </div>
  );
}
