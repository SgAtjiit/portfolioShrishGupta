import { motion } from "motion/react";
import { GraduationCap, Route as RouteIcon } from "lucide-react";
import { education, journey } from "@/content/portfolio";
import { Section } from "./Section";

export function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="Timeline"
      title="Education & journey."
      description="From the first line of C++ to shipping AI products in production."
    >
      <div className="space-y-20">
        {/* Education Section */}
        <div>
          <div className="mb-8 flex items-center gap-3 justify-center lg:justify-start">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold tracking-tight">Education</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((e, i) => (
              <motion.div
                key={e.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative glass card-hover rounded-2xl p-6 border border-border/50 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block text-xs font-mono font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                    {e.year}
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">{e.institution}</h4>
                  <p className="text-sm text-muted-foreground mt-1.5">{e.degree}</p>
                </div>
                
                <ul className="mt-6 flex flex-wrap gap-2">
                  {e.details.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-border bg-surface/50 px-2.5 py-1 text-xs font-mono text-muted-foreground"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Section */}
        <div>
          <div className="mb-12 flex items-center gap-3 justify-center">
            <RouteIcon className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold tracking-tight">My Journey</h3>
          </div>

          <div className="relative border-l border-border/80 lg:border-l-0 lg:max-w-4xl lg:mx-auto text-left">
            {/* Center line (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-border/50 to-transparent -translate-x-1/2" />

            <div className="space-y-10 relative pl-8 lg:pl-0">
              {journey.map((j, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={j.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
                    className={`relative flex flex-col lg:flex-row lg:items-center ${
                      isLeft ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Pulsing indicator node */}
                    <span className="absolute -left-[41px] lg:left-1/2 top-1.5 lg:top-auto h-4.5 w-4.5 -translate-x-1/2 rounded-full border-2 border-primary bg-[#030303] shadow-md shadow-primary/20 z-10 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="absolute inset-0 h-full w-full rounded-full bg-primary/40 animate-ping" />
                    </span>

                    {/* Timeline card content */}
                    <div className={`w-full lg:w-1/2 ${
                      isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                    }`}>
                      <div className="glass card-hover rounded-2xl p-5 border border-border/50">
                        <div className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-1.5">
                          Milestone {i + 1}
                        </div>
                        <h4 className="text-base font-bold text-white leading-snug">{j.title}</h4>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{j.desc}</p>
                      </div>
                    </div>

                    {/* Spacer block */}
                    <div className="hidden lg:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
