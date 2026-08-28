import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Star, X, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/content/portfolio";
import { Section } from "./Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Things I've built."
      description="Production-grade apps that solve real problems — not tutorials."
    >
      <div className="relative w-full">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {projects.map((p, i) => (
              <CarouselItem
                key={p.name}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setActive(p)}
                  className="group glass card-hover relative flex h-[350px] w-full flex-col justify-between overflow-hidden rounded-3xl p-6 text-left"
                >
                  {p.featured && (
                    <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      <Star className="h-3 w-3 fill-primary" />
                      Featured
                    </div>
                  )}
                  
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {p.stack[0]} · {p.stack[1] ?? ""}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                        {p.tagline}
                      </p>
                    </div>

                    <div>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {p.stack.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-border/70 bg-surface/60 px-2 py-0.5 text-[9px] text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                        {p.stack.length > 3 && (
                          <span className="rounded-full border border-border/70 bg-surface/60 px-2 py-0.5 text-[9px] text-muted-foreground">
                            +{p.stack.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        View details
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="mt-8 flex items-center justify-between px-2">
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-foreground hover:border-primary/40 hover:text-primary transition-all active:scale-95 cursor-pointer"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-foreground hover:border-primary/40 hover:text-primary transition-all active:scale-95 cursor-pointer"
                aria-label="Next slide"
              >

                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Carousel>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  );
}


function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="glass ring-glow relative w-full max-w-3xl overflow-hidden rounded-3xl p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 hover:border-primary/40"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-10">
          {project.featured && (
            <div className="mb-3 inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              <Star className="h-3 w-3 fill-primary" />
              Featured
            </div>
          )}
          <h3 className="font-display text-3xl font-bold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-muted-foreground">{project.tagline}</p>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-6">
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Highlights
          </div>
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Tech stack
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border/70 bg-surface/60 px-2.5 py-1 text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-semibold hover:border-primary/40"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
