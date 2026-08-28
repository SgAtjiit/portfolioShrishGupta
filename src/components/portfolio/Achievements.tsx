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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group glass card-hover relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                isHighlighted
                  ? "border-2 border-amber-500/50 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                  : "border border-border/80 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]"
              }`}
            >
              {/* Card top banner with icon and label */}
              <div className="flex items-center justify-between">
                <span className={`grid h-9 w-9 place-items-center rounded-xl border ${
                  isHighlighted 
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400" 
                    : "bg-surface/80 border-border text-primary group-hover:text-amber-400 group-hover:border-amber-500/30"
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  {a.label}
                </span>
              </div>

              {/* Title and Detail */}
              <div className="mt-6">
                <h4 className="font-display text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl group-hover:text-amber-300 transition-colors">
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
