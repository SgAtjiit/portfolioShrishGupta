import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Wrench,
  Trophy,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { navSections } from "@/content/portfolio";
import { scrollToSection } from "@/hooks/useSmoothScroll";

const sectionIcons: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  education: GraduationCap,
  coding: Code2,
  projects: FolderGit2,
  skills: Wrench,
  achievements: Trophy,
  contact: Mail,
};

const sectionNumbers: Record<string, string> = {
  about: "01",
  education: "02",
  coding: "03",
  projects: "04",
  skills: "05",
  achievements: "06",
  contact: "07",
};

export function SideDock() {
  const [active, setActive] = useState("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100)));
      }

      const triggerPoint = currentScrollY + 250;
      let currentActive = navSections[0]?.id || "home";

      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (el) {
          if (triggerPoint >= el.offsetTop) {
            currentActive = section.id;
          }
        }
      }

      if (
        window.innerHeight + Math.round(currentScrollY) >=
        document.documentElement.scrollHeight - 50
      ) {
        currentActive = navSections[navSections.length - 1].id;
      }

      setActive(currentActive);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    setActive(id);
    scrollToSection(id, 0);
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2.5">
      {/* Side Rail Container */}
      <div className="glass relative flex flex-col items-center gap-2.5 rounded-full border border-border/60 p-2.5 shadow-2xl backdrop-blur-xl">
        {/* Scroll Progress Indicator Line */}
        <div className="absolute -left-1 top-4 bottom-4 w-[2px] rounded-full bg-border/40 overflow-hidden">
          <div
            className="w-full bg-primary transition-all duration-150"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {navSections.map((s) => {
          const isActive = active === s.id;
          const isHovered = hoveredId === s.id;
          const Icon = sectionIcons[s.id] ?? Home;
          const num = sectionNumbers[s.id];

          return (
            <div
              key={s.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                onClick={() => handleClick(s.id)}
                aria-label={`Navigate to ${s.label}`}
                className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 cursor-pointer ${
                  isActive
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,255,102,0.4)]"
                    : "bg-surface/60 border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-surface"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sideDockActiveRing"
                    className="absolute inset-0 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(0,255,102,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "text-primary scale-110" : "group-hover:scale-110"}`} />
              </button>

              {/* Tooltip on Hover for all items */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="glass pointer-events-none absolute right-12 flex items-center gap-2 whitespace-nowrap rounded-xl border border-border/60 px-3 py-1.5 shadow-xl backdrop-blur-md"
                  >
                    {num && (
                      <span className="font-mono text-[10px] font-bold text-primary">
                        {num}
                      </span>
                    )}
                    <span className="font-display text-xs font-semibold uppercase tracking-wider text-foreground">
                      {s.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
