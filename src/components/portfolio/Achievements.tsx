import { motion } from "motion/react";
import { Trophy, Award, GraduationCap, Flame } from "lucide-react";
import { achievements } from "@/content/portfolio";
import { Section } from "./Section";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  problem_solving: Trophy,
  rating: Award,
  academic: GraduationCap,
  hackathon: Flame,
};

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Milestones & wins."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => {
          const Icon = iconMap[a.category || ""] ?? Trophy;
          const isHighlighted = a.highlighted;

          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`glass relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
                isHighlighted
                  ? "border-2 border-primary bg-primary/5 shadow-[0_0_25px_rgba(0,255,102,0.15)] scale-[1.01]"
                  : "border border-border/80 hover:border-primary/40"
              }`}
            >
              {/* Card top banner with icon and label */}
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {a.label}
                </span>
              </div>

              {/* Title and Detail */}
              <div className="mt-8">
                <h4 className="font-display text-lg font-bold leading-tight tracking-tight text-white sm:text-xl">
                  {a.title}
                </h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {a.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
