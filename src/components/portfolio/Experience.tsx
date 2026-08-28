import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experience } from "@/content/portfolio";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Work & internships."
      description="Professional industry experience building production web applications."
    >
      <div className="relative pl-4 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-primary/80 before:via-primary/30 before:to-border/20">
        {experience.map((exp, i) => (
          <div key={exp.company} className="relative pl-6 sm:pl-8">
            {/* Timeline Pulsing Node */}
            <div className="absolute -left-[17px] sm:-left-[21px] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-background border-2 border-primary shadow-[0_0_12px_rgba(0,255,102,0.6)]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group glass card-hover relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-border/60 hover:border-primary/40 transition-all duration-300 text-left shadow-[0_0_30px_rgba(0,255,102,0.03)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/80 px-3 py-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/80 px-3 py-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-6">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-border/40 flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-mono text-muted-foreground hover:border-primary/30 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}
