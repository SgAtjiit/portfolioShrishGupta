import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { education } from "@/content/portfolio";
import { Section } from "./Section";

export function Timeline() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic background."
      description="Computer Science foundation, academic excellence, and coursework."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((e, i) => (
          <motion.div
            key={e.institution}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="group glass card-hover relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 text-left flex flex-col justify-between shadow-[0_0_30px_rgba(99,102,241,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="inline-block text-xs font-mono font-bold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                    {e.year}
                  </span>
                </div>
                <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-indigo-400 transition-colors" />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground group-hover:text-indigo-400 transition-colors leading-snug">
                {e.institution}
              </h3>
              <p className="text-sm font-medium text-muted-foreground mt-2">{e.degree}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-border/40">
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground mb-3">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>Academic Highlights</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {e.details.map((d) => (
                  <li
                    key={d}
                    className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 text-xs font-mono font-semibold text-foreground shadow-sm hover:border-indigo-500/40 transition-colors"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
