import { motion } from "motion/react";
import { Code2, Terminal } from "lucide-react";

export type GrindMode = "problem_solver" | "developer";

type ModeSwitcherProps = {
  mode: GrindMode;
  onModeChange: (mode: GrindMode) => void;
};

export function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="relative flex items-center rounded-2xl border border-border/60 bg-surface/80 p-1.5 backdrop-blur max-w-md w-full mx-auto sm:mx-0">
      <button
        onClick={() => onModeChange("problem_solver")}
        className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-4 font-display text-xs sm:text-sm font-semibold transition-colors z-10 ${
          mode === "problem_solver" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Code2 className="h-4 w-4 text-emerald-400" />
        <span>Problem Solver</span>
        {mode === "problem_solver" && (
          <motion.div
            layoutId="modeIndicator"
            className="absolute inset-0 rounded-xl bg-primary/20 border border-primary/40 -z-10 shadow-[0_0_20px_rgba(0,255,102,0.15)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      <button
        onClick={() => onModeChange("developer")}
        className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-4 font-display text-xs sm:text-sm font-semibold transition-colors z-10 ${
          mode === "developer" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
        }`}
      >

        <Terminal className="h-4 w-4 text-sky-400" />
        <span>Developer</span>
        {mode === "developer" && (
          <motion.div
            layoutId="modeIndicator"
            className="absolute inset-0 rounded-xl bg-sky-500/20 border border-sky-500/40 -z-10 shadow-[0_0_20px_rgba(14,165,233,0.15)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
