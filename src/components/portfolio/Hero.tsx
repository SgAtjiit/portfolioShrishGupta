import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Download, Mail, MapPin, Github, Linkedin, Sparkles } from "lucide-react";
import { profile, skills } from "@/content/portfolio";

const words = [
  "Full Stack Engineer",
  "Real-time Systems Developer",
  "AI Application Builder",
  "Backend Architect",
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  const tickerItems = skills.map((s) => s.items.map(item => item.toUpperCase()).join(" · "));

  // Blinking cursor
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 530);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2000); // Hold word for 2s
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80); // Speed: fast delete, moderate type

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28 flex flex-col justify-between">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[80%] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 sm:pt-24 w-full flex-1 flex items-center">
        <div className="grid gap-12 lg:grid-cols-12 items-center w-full">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="max-w-4xl text-6xl font-bold leading-[1.05] tracking-tight sm:text-8xl md:text-9xl text-white"
            >
              Shrish
              <br />
              <span className="text-primary drop-shadow-[0_0_30px_rgba(0,255,102,0.25)]">Gupta.</span>
            </motion.h1>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="flex items-center gap-2 font-display text-sm font-medium uppercase tracking-widest sm:text-base"
            >
              <span className="text-muted-foreground">CURRENTLY</span>
              <span className="text-white font-bold tracking-normal sm:text-lg">
                {words[index].substring(0, subIndex)}
                <span className={`inline-block w-[3px] h-[18px] bg-primary ml-1 align-middle ${blink ? "opacity-100" : "opacity-0"}`} />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              {profile.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:border-primary/40"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </button>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:border-primary/40"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </motion.div>
          </div>

          {/* Right Column: Terminal Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-sm rounded-2xl border border-border/80 bg-[#070709] p-5 shadow-[0_0_40px_rgba(99,102,241,0.06)] backdrop-blur"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/60">~/whoami.sh</span>
              </div>

              {/* Body */}
              <div className="font-mono text-xs sm:text-sm space-y-4 text-left">
                <div className="flex gap-2">
                  <span className="text-primary font-bold">$</span>
                  <span className="text-white">cat profile.json</span>
                </div>
                <div className="pl-3 space-y-2 text-muted-foreground">
                  <div>
                    <span className="text-indigo-400">name</span>: <span className="text-primary">"Shrish"</span>,
                  </div>
                  <div>
                    <span className="text-indigo-400">stack</span>: [<span className="text-primary">"Full Stack"</span>, <span className="text-primary">"MERN"</span>, <span className="text-primary">"AI"</span>],
                  </div>
                  <div>
                    <span className="text-indigo-400">dsa problems solved</span>: <span className="text-amber-400">862</span>,
                  </div>
                  <div>
                    <span className="text-indigo-400">shipping</span>: <span className="text-emerald-400">true</span>
                  </div>
                </div>
                <div className="pl-3 mt-4 flex items-center gap-1.5 text-muted-foreground/50 text-[10px] border-t border-border/20 pt-3">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Noida, India
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Infinite scrolling marquee band */}
      <div className="relative flex overflow-x-hidden border-t border-b border-border/40 bg-surface/20 py-3.5 w-full mt-16">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
        `}</style>
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {tickerItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
          {tickerItems.map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-muted-foreground/60 uppercase">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
