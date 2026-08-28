import { motion } from "motion/react";
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Database,
  ShieldCheck,
  Cloud,
} from "lucide-react";
import { skills } from "@/content/portfolio";
import { Section } from "./Section";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code2,
  Frontend: Layout,
  Backend: Server,
  "AI / ML": BrainCircuit,
  Databases: Database,
  "Auth & Security": ShieldCheck,
  "Cloud & DevOps": Cloud,
};

const cardTheming: Record<
  string,
  {
    border: string;
    bg: string;
    text: string;
    shadow: string;
  }
> = {
  Languages: {
    border: "border-violet-500/20 hover:border-violet-500/40",
    bg: "bg-[#110e26]/80",
    text: "text-violet-400",
    shadow: "shadow-[0_0_15px_rgba(139,92,246,0.06)]",
  },
  Frontend: {
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    bg: "bg-[#0e122b]/80",
    text: "text-indigo-400",
    shadow: "shadow-[0_0_15px_rgba(99,102,241,0.06)]",
  },
  Backend: {
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    bg: "bg-[#0b1f15]/80",
    text: "text-emerald-400",
    shadow: "shadow-[0_0_15px_rgba(16,185,129,0.06)]",
  },
  "AI / ML": {
    border: "border-amber-500/20 hover:border-amber-500/40",
    bg: "bg-[#1f1a0b]/80",
    text: "text-amber-400",
    shadow: "shadow-[0_0_15px_rgba(245,158,11,0.06)]",
  },
  Databases: {
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    bg: "bg-[#0c1b24]/80",
    text: "text-cyan-400",
    shadow: "shadow-[0_0_15px_rgba(6,182,212,0.06)]",
  },
  "Auth & Security": {
    border: "border-rose-500/20 hover:border-rose-500/40",
    bg: "bg-[#240c0f]/80",
    text: "text-rose-400",
    shadow: "shadow-[0_0_15px_rgba(244,63,94,0.06)]",
  },
  "Cloud & DevOps": {
    border: "border-sky-500/20 hover:border-sky-500/40",
    bg: "bg-[#0c1e28]/80",
    text: "text-sky-400",
    shadow: "shadow-[0_0_15px_rgba(14,165,233,0.06)]",
  },
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools of the trade."
      description="Grouped by domain. No progress bars — just what I use, ship, and maintain."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = iconMap[group.category] ?? Code2;
          const theme = cardTheming[group.category] ?? {
            border: "border-border hover:border-primary/40",
            bg: "bg-surface/60",
            text: "text-primary",
            shadow: "shadow-none",
          };

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`glass rounded-3xl p-6 border transition-all duration-300 ${theme.border} ${theme.shadow}`}
            >
              <div className="mb-6 flex items-center gap-4">
                <span className={`grid h-10 w-10 place-items-center rounded-xl border border-white/5 ${theme.bg} ${theme.text}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    STACK
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base leading-tight">
                    {group.category}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface/30 px-3 py-1 text-xs text-muted-foreground transition-all duration-300 hover:border-primary hover:text-foreground hover:bg-primary/5 cursor-default"
                  >
                    {item}
                  </span>
                ))}

              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
