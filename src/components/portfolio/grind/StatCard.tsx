import { useEffect, useRef, useState } from "react";

type StatCardProps = {
  label: string;
  value: number | string;
  sublabel?: string;
  accentColor?: string;
  isNumeric?: boolean;
};

function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1000;
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
              const progress = elapsedTime / duration;
              // Ease out quad
              const current = Math.floor(end * (1 - (1 - progress) * (1 - progress)));
              setCount(current);
              requestAnimationFrame(updateCounter);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatCard({
  label,
  value,
  sublabel,
  accentColor,
  isNumeric = typeof value === "number",
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 backdrop-blur transition-all duration-300 hover:border-border/80 hover:bg-background/60">
      {accentColor && (
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-xl opacity-20"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-foreground leading-none">

        {typeof value === "number" && isNumeric ? <CountUp end={value} /> : value}
      </div>
      {sublabel && (
        <div className="mt-1 font-mono text-[10px] text-muted-foreground">{sublabel}</div>
      )}
    </div>
  );
}
