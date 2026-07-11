import { motion } from "motion/react";
import { about } from "@/content/portfolio";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineer building products, not clones.">
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-3"
        >
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="glass rounded-3xl p-6">
            <div className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              At a glance
            </div>
            <dl className="divide-y divide-border/60">
              {about.facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <dt className="text-sm text-muted-foreground">{f.label}</dt>
                  <dd className="text-right font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
