import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { Section } from "../Section";
import { ModeSwitcher, GrindMode } from "./ModeSwitcher";
import { ProblemSolverView } from "./ProblemSolverView";
import { DeveloperView } from "./DeveloperView";
import { GrindSkeleton } from "./GrindSkeleton";
import {
  useLeetCodeStats,
  useGFGStats,
  useCodeChefStats,
  useGitHubStats,
} from "@/hooks/useCodingStats";

export function GrindSection() {
  const [mode, setMode] = useState<GrindMode>("problem_solver");

  // Fetch live stats from server functions
  const leetcodeQuery = useLeetCodeStats("Shrish_Gupta");
  const gfgQuery = useGFGStats("shrishgupta1");
  const codechefQuery = useCodeChefStats("shrish57");
  const githubQuery = useGitHubStats("SgAtjiit");

  const isAnyLoading =
    leetcodeQuery.isLoading ||
    gfgQuery.isLoading ||
    codechefQuery.isLoading ||
    githubQuery.isLoading;

  return (
    <Section
      id="coding"
      eyebrow="Coding Profiles"
      title="Where I grind."
      description="Interactive dual-mode dashboard: Problem Solving (LeetCode, GFG, CodeChef) & Software Engineering (GitHub)."
    >
      {/* Header controls & Mode Switcher */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <ModeSwitcher mode={mode} onModeChange={setMode} />

        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3.5 py-1.5 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground">
            Live Server Sync
          </span>
        </div>
      </div>

      {/* Main View Area */}
      {isAnyLoading ? (
        <GrindSkeleton />
      ) : (
        <AnimatePresence mode="wait">
          {mode === "problem_solver" ? (
            <ProblemSolverView
              key="problem_solver"
              leetcode={leetcodeQuery.data}
              gfg={gfgQuery.data}
              codechef={codechefQuery.data}
            />
          ) : (
            <DeveloperView key="developer" github={githubQuery.data} />
          )}
        </AnimatePresence>
      )}
    </Section>
  );
}
