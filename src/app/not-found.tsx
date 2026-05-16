import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center py-24">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">404</div>
      <h1 className="mt-4 text-display-lg font-semibold">This page doesn&apos;t exist.</h1>
      <p className="mt-3 max-w-md text-fg-muted">
        The link may be outdated, or the page may have moved. Head back to the homepage or browse our services.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          View services
        </ButtonLink>
      </div>
    </div>
  );
}
