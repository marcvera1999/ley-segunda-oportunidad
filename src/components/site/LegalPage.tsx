import type { ReactNode } from "react";

export const LEGAL_UPDATED = "23 de noviembre de 2026";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <h1 className="font-display text-4xl text-primary">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Última actualización: {LEGAL_UPDATED}</p>
      <div className="mt-8 space-y-8 text-primary/85 leading-relaxed">{children}</div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl text-primary">{title}</h2>
      {children}
    </section>
  );
}
