import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Github, Linkedin, Download, MapPin } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/content/portfolio";
import { Section } from "./Section";

export function Contact() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleSubmitMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMessage) {
      toast.error("Please fill in your name and message.");
      return;
    }
    
    const subject = encodeURIComponent(`Contact from ${formName}`);
    const body = encodeURIComponent(
      `Hello Shrish,\n\n${formMessage}\n\nBest regards,\n${formName}\nEmail: ${formEmail || "Not provided"}`
    );
    
    // Construct URLs
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    
    // 1. Open Gmail Web Compose in a new tab (perfect for browser-based mail users)
    window.open(gmailUrl, "_blank");
    
    // 2. Trigger native mailto client fallback in the current window
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 100);

    toast.success("Opening Gmail & Mail client...");
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something."
      description="Open to full-time roles, internships, and interesting collaborations."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Command Center Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-border/80 lg:col-span-3 flex flex-col justify-between"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
              / COMMAND-CENTER
            </div>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Reach out.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fastest way is email. I usually reply within a day.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Channel 1: Email */}
              <div className="rounded-2xl border border-border/60 bg-background/30 p-4 flex flex-col justify-between h-28">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-primary/10 text-primary">
                      <Mail className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      EMAIL
                    </span>
                  </div>
                  <div className="mt-3 truncate text-xs font-semibold text-foreground">
                    {profile.email}
                  </div>
                </div>
                <div className="mt-2 flex gap-1.5 justify-end">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all"
                  >
                    OPEN ↗
                  </a>
                  <button
                    onClick={() => handleCopy(profile.email, "Email")}
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all cursor-pointer"
                  >
                    COPY
                  </button>
                </div>
              </div>

              {/* Channel 2: Phone */}
              <div className="rounded-2xl border border-border/60 bg-background/30 p-4 flex flex-col justify-between h-28">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-primary/10 text-primary">
                      <Phone className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      PHONE
                    </span>
                  </div>
                  <div className="mt-3 truncate text-xs font-semibold text-foreground">
                    {profile.phone}
                  </div>
                </div>
                <div className="mt-2 flex gap-1.5 justify-end">
                  <a
                    href={`tel:${profile.phone}`}
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all"
                  >
                    OPEN ↗
                  </a>
                  <button
                    onClick={() => handleCopy(profile.phone, "Phone number")}
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all cursor-pointer"
                  >
                    COPY
                  </button>
                </div>
              </div>

              {/* Channel 3: LinkedIn */}
              <div className="rounded-2xl border border-border/60 bg-background/30 p-4 flex flex-col justify-between h-28">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-primary/10 text-primary">
                      <Linkedin className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      LINKEDIN
                    </span>
                  </div>
                  <div className="mt-3 truncate text-xs font-semibold text-foreground">
                    shrish-gupta-
                  </div>
                </div>
                <div className="mt-2 flex gap-1.5 justify-end">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all"
                  >
                    OPEN ↗
                  </a>
                  <button
                    onClick={() => handleCopy(profile.linkedin, "LinkedIn URL")}
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all cursor-pointer"
                  >
                    COPY
                  </button>
                </div>
              </div>

              {/* Channel 4: GitHub */}
              <div className="rounded-2xl border border-border/60 bg-background/30 p-4 flex flex-col justify-between h-28">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded bg-primary/10 text-primary">
                      <Github className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      GITHUB
                    </span>
                  </div>
                  <div className="mt-3 truncate text-xs font-semibold text-foreground">
                    SgAtjiit
                  </div>
                </div>
                <div className="mt-2 flex gap-1.5 justify-end">
                  <a
                    href={profile.github}

                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all"
                  >
                    OPEN ↗
                  </a>
                  <button
                    onClick={() => handleCopy(profile.github, "GitHub URL")}
                    className="inline-flex items-center gap-1 rounded bg-surface/80 border border-border/80 hover:border-primary/40 hover:text-foreground px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-all cursor-pointer"
                  >

                    COPY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmitMail} className="mt-8 border-t border-border/50 pt-6 space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold mb-2">
              / Send a message
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <textarea
                placeholder="Your Message..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                required
                rows={3}
                className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary/50 focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2 justify-between items-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black shadow-lg shadow-primary/25 hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Mail className="h-4 w-4" /> Send Message
              </button>
              
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-xs font-semibold hover:border-primary/40 hover:text-foreground transition-all active:scale-[0.98]"
              >
                <Download className="h-3.5 w-3.5" /> Download résumé
              </a>
            </div>
          </form>
        </motion.div>

        {/* Right Info Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          {/* Location Card */}
          <div className="glass rounded-3xl p-6 border border-border/80 flex flex-col justify-between flex-1">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                CURRENTLY BASED IN
              </div>
              <div className="mt-4 flex items-center gap-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                <MapPin className="h-5 w-5 text-primary" />
                {profile.location}
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Open to remote, hybrid & relocation for the right role.
            </p>
          </div>

          {/* Status Card */}
          <div className="rounded-3xl p-6 border border-primary bg-primary/5 shadow-[0_0_20px_rgba(0,255,102,0.08)] flex flex-col justify-between flex-1">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                STATUS
              </div>
              <div className="mt-4 flex items-center gap-2.5 font-display text-sm font-bold text-foreground sm:text-base">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Actively looking for opportunities.
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Full-time • Internships • Hackathons • Side projects.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
