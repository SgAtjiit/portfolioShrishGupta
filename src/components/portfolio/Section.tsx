import type { ReactNode } from "react";
import { motion } from "motion/react";

const sectionNumbers: Record<string, string> = {
  about: "01",
  education: "02",
  coding: "03",
  projects: "04",
  skills: "05",
  achievements: "06",
  contact: "07",
};


const formatTitle = (text: string) => {
  const words = text.trim().split(" ");
  if (words.length <= 1) return text;
  const lastWord = words[words.length - 1];
  const rest = words.slice(0, words.length - 1).join(" ");
  return (
    <>
      {rest}{" "}
      <span className="text-primary">{lastWord}</span>
    </>
  );
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const sectionNumber = sectionNumbers[id];

  return (
    <section id={id} className={`relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden ${className}`}>
      {/* Ambient background glow */}
      {id && (
        <div
          className={`pointer-events-none absolute -z-10 h-[450px] w-[450px] rounded-full blur-3xl transform-gpu translate-z-0 opacity-25 ${
            id === "about"
              ? "bg-purple-500/20 -right-40 top-0"
              : id === "education"
                ? "bg-indigo-500/20 -left-40 top-20"
                : id === "coding"
                  ? "bg-emerald-500/20 -right-40 top-0"
                  : id === "projects"
                    ? "bg-blue-500/20 -left-40 top-20"
                    : id === "skills"
                      ? "bg-primary/20 -right-40 top-0"
                      : id === "achievements"
                        ? "bg-amber-500/20 -left-40 top-20"
                        : id === "contact"
                          ? "bg-indigo-500/20 -right-40 top-0"
                          : ""
          }`}
        />
      )}
      <div className="mx-auto max-w-6xl px-4">
        {(sectionNumber || title || description || eyebrow) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            {sectionNumber && (
              <div className="mb-8 flex items-center gap-4 origin-left">
                <span className="font-mono text-xs font-bold tracking-tight text-primary">
                  {sectionNumber}
                </span>
                <div className="h-[1px] flex-1 bg-border/40 bg-gradient-to-r from-primary/30 to-border/10" />
                {eyebrow && (
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {eyebrow}
                  </span>
                )}
              </div>
            )}

            {(title || description || (eyebrow && !sectionNumber)) && (
              <div className="mb-12 max-w-2xl">
                {eyebrow && !sectionNumber && (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {eyebrow}
                  </div>
                )}
                {title && (
                  <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                    {formatTitle(title)}
                  </h2>
                )}
                {description && (
                  <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                    {description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
