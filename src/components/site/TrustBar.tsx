import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { value: 500, prefix: "+", label: "casos" },
  { value: 98, suffix: "%", label: "éxito" },
  { value: 2015, label: "Desde", asIs: true },
  { value: 0, label: "ICAB Colegiados", text: "ICAB" },
];

function CountUp({ to, prefix = "", suffix = "", asIs = false }: { to: number; prefix?: string; suffix?: string; asIs?: boolean }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1500;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setN(asIs ? to : Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, asIs]);

  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

export function TrustBar() {
  return (
    <section className="bg-primary text-primary-foreground py-5">
      <div className="max-w-4xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-y-4 md:divide-x md:divide-primary-foreground/15">
        <Stat number={<CountUp to={500} prefix="+" />} label="casos" />
        <Stat number={<CountUp to={98} suffix="%" />} label="éxito" />
        <Stat number={<CountUp to={2015} asIs />} label="Desde" />
        <Stat number={<span>ICAB</span>} label="Colegiados" />
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: React.ReactNode; label: string }) {
  return (
    <div className="text-center md:px-4">
      <p className="font-display font-bold text-gold text-2xl md:text-[28px] leading-none">{number}</p>
      <p className="mt-1 text-[12px] uppercase tracking-wider text-primary-foreground/75">{label}</p>
    </div>
  );
}
