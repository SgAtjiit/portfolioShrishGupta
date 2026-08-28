import { useEffect, useRef, useState } from "react";
import type { LanguageStat } from "@/hooks/useCodingStats";

type LanguageBarProps = {
  languages: LanguageStat[];
};

function AnimatedBar({ percentage, color }: { percentage: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so the animation is visible
          setTimeout(() => setWidth(percentage), 80);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div
      ref={ref}
      className="h-1.5 rounded-full overflow-hidden"
      style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          backgroundColor: color,
          transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

export function LanguageBar({ languages }: LanguageBarProps) {
  if (!languages.length) {
    return (
      <div className="text-xs text-muted-foreground font-mono">No language data</div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Stacked color bar */}
      <div className="flex h-2 w-full overflow-hidden rounded-full gap-0.5">
        {languages.map((l) => (
          <div
            key={l.language}
            style={{
              width: `${l.percentage}%`,
              backgroundColor: l.color,
              flexShrink: 0,
            }}
            className="h-full"
          />
        ))}
      </div>

      {/* Individual rows */}
      <div className="flex flex-col gap-2">
        {languages.map((l) => (
          <div key={l.language}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: l.color }}
                />
                <span className="font-mono text-[11px] text-foreground">{l.language}</span>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                {l.percentage}%
              </span>
            </div>
            <LanguageBar.Bar percentage={l.percentage} color={l.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component for the animated bar row (used internally)
LanguageBar.Bar = AnimatedBar;
