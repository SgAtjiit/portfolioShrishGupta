import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { navSections, profile } from "@/content/portfolio";
import { scrollToSection } from "@/hooks/useSmoothScroll";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY >= 50);

      if (currentScrollY < 50) {
        setVisible(true);
      } else {
        // Show when scrolling up, hide when scrolling down
        setVisible(currentScrollY < lastScrollY);
      }

      // Determine active section based on section offsetTop
      const triggerPoint = currentScrollY + 250;
      let currentActive = navSections[0]?.id || "home";

      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (triggerPoint >= top) {
            currentActive = section.id;
          }
        }
      }

      // Highlight contact when at the very bottom of the page
      if (
        window.innerHeight + Math.round(currentScrollY) >=
        document.documentElement.scrollHeight - 50
      ) {
        currentActive = navSections[navSections.length - 1].id;
      }

      setActive(currentActive);

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  const handleClick = (id: string) => {
    setOpen(false);
    setActive(id);
    scrollToSection(id, 0);
  };

  return (
    <header
      onMouseEnter={() => { setHovered(true); setVisible(true); }}
      onMouseLeave={() => setHovered(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 transform ${
        scrolled ? "py-2" : "py-4"
      } ${
        visible || window.scrollY < 50 || open || hovered
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${scrolled ? "glass ring-glow" : "border border-transparent"
            }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-sm font-bold tracking-wider"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900 font-display text-sm font-bold text-foreground shadow-md">
              S
              <span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-primary border border-background animate-pulse" />
            </div>
            <span className="font-display font-bold text-foreground text-xs tracking-wider">SHRISH GUPTA</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-primary bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              aria-label="Toggle theme"
              onClick={() => setLight((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-primary/40"
            >
              {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-black shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] md:flex"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 rounded-2xl p-2 md:hidden"
            >
              {navSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleClick(s.id)}
                  className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium ${active === s.id
                      ? "bg-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-surface"
                    }`}
                >
                  {s.label}
                </button>
              ))}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-black"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
