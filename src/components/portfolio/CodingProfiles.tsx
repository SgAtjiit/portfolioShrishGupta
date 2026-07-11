import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { codingProfiles } from "@/content/portfolio";
import { Section } from "./Section";

const platformThemes: Record<
  string,
  {
    border: string;
    glow: string;
  }
> = {
  LeetCode: {
    border: "border-amber-500/25 hover:border-amber-500/40",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.08)]",
  },
  GeeksForGeeks: {
    border: "border-emerald-500/25 hover:border-emerald-500/40",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.08)]",
  },
  CodeChef: {
    border: "border-fuchsia-500/25 hover:border-fuchsia-500/40",
    glow: "shadow-[0_0_20px_rgba(217,70,239,0.08)]",
  },
  GitHub: {
    border: "border-sky-500/25 hover:border-sky-500/40",
    glow: "shadow-[0_0_20px_rgba(14,165,233,0.08)]",
  },
};

export function CodingProfiles() {
  return (
    <Section
      id="coding"
      eyebrow="Coding Profiles"
      title="Where I grind."
      description="Live stats across LeetCode, GFG, CodeChef & GitHub."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {codingProfiles.map((p, i) => {
          const theme = platformThemes[p.platform] ?? {
            border: "border-border hover:border-primary/40",
            glow: "shadow-none",
          };

          return (
            <motion.a
              key={p.platform}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group glass relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 ${theme.border} ${theme.glow}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-40`}
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        PLATFORM
                      </div>
                      <div className="mt-1 font-display text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {p.platform}
                      </div>
                    </div>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    @{p.handle}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-2.5">
                  {p.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-border/40 bg-background/50 p-3 backdrop-blur"
                    >
                      <div className="text-[8px] uppercase tracking-widest text-muted-foreground">
                        {s.label}
                      </div>
                      <div className="mt-1 font-display text-lg sm:text-xl font-bold text-white leading-none">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
