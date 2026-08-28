import { useEffect, useRef, useState } from "react";

type Slice = {
  label: string;
  value: number;
  color: string;
};

type DifficultyRingProps = {
  easy: number;
  medium: number;
  hard: number;
  total: number;
  easyColor?: string;
  mediumColor?: string;
  hardColor?: string;
};

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = Date.now();
    const duration = 900;
    const startVal = 0;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(startVal + eased * (value - startVal)));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value]);

  return <>{displayed}</>;
}

export function DifficultyRing({
  easy,
  medium,
  hard,
  total,
  easyColor = "#22c55e",
  mediumColor = "#f59e0b",
  hardColor = "#ef4444",
}: DifficultyRingProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const slices: Slice[] = [
    { label: "Easy", value: easy, color: easyColor },
    { label: "Medium", value: medium, color: mediumColor },
    { label: "Hard", value: hard, color: hardColor },
  ];

  const size = 120;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  const gap = 3; // gap in px between segments

  // Build segments
  let offset = 0;
  const segments = slices.map((s) => {
    const frac = total > 0 ? s.value / total : 0;
    const dashLen = animated ? Math.max(0, frac * circ - gap) : 0;
    const dashOffset = -offset;
    offset += frac * circ;
    return { ...s, dashLen, dashOffset, frac };
  });

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      {/* Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          {segments.map((seg) => (
            <circle
              key={seg.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${seg.dashLen} ${circ - seg.dashLen}`}
              strokeDashoffset={seg.dashOffset}
              style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }}
            />
          ))}
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-foreground leading-none">
            {total}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
            Total Solved
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl border border-border/40 bg-background/40 p-2">
          <span className="text-[9px] font-mono text-emerald-400 font-semibold uppercase">Easy</span>
          <p className="font-display text-base font-bold text-foreground">{easy}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-background/40 p-2">
          <span className="text-[9px] font-mono text-amber-400 font-semibold uppercase">Med</span>
          <p className="font-display text-base font-bold text-foreground">{medium}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-background/40 p-2">
          <span className="text-[9px] font-mono text-rose-400 font-semibold uppercase">Hard</span>
          <p className="font-display text-base font-bold text-foreground">{hard}</p>
        </div>
      </div>
    </div>
  );
}
