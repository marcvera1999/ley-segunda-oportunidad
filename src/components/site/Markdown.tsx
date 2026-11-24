import type { ReactNode } from "react";

// Renderizador mínimo de Markdown (sin dependencias ni HTML crudo):
// ## títulos, ### subtítulos, listas (- / 1.), **negrita**, *cursiva*, [texto](url).

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={k++}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("*")) out.push(<em key={k++}>{t.slice(1, -1)}</em>);
    else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)\s]+)\)/)!;
      const safe = /^(\/|https?:\/\/|tel:|mailto:)/.test(href) ? href : "#";
      out.push(
        <a key={k++} href={safe} className="text-gold-ink underline underline-offset-2 font-medium">
          {label}
        </a>,
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.split(/\r?\n\s*\r?\n/);
  return (
    <div className="space-y-5 text-[17px] text-primary/85 leading-relaxed">
      {blocks.map((raw, i) => {
        const b = raw.trim();
        if (!b) return null;
        if (b.startsWith("### "))
          return (
            <h3 key={i} className="font-display text-xl text-primary pt-2">
              {inline(b.slice(4))}
            </h3>
          );
        if (b.startsWith("## "))
          return (
            <h2 key={i} className="font-display text-2xl md:text-3xl text-primary pt-4">
              {inline(b.slice(3))}
            </h2>
          );
        const lines = b.split(/\r?\n/);
        if (lines.every((l) => /^\s*[-*]\s+/.test(l)))
          return (
            <ul key={i} className="list-disc pl-6 space-y-2">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\s*[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l)))
          return (
            <ol key={i} className="list-decimal pl-6 space-y-2">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\s*\d+[.)]\s+/, ""))}</li>
              ))}
            </ol>
          );
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
