import { motion } from "motion/react";
import { ExternalLink, Trophy, Flame, Target } from "lucide-react";
import { StatCard } from "./StatCard";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { RatingChart } from "./RatingChart";
import { DifficultyRing } from "./DifficultyRing";
import {
  LeetCodeStats,
  GFGStats,
  CodeChefStats,
  getUnifiedSubmissionHeatmap,
} from "@/hooks/useCodingStats";

type ProblemSolverViewProps = {
  leetcode?: LeetCodeStats;
  gfg?: GFGStats;
  codechef?: CodeChefStats;
};

// Mock CodeChef Rating history
const mockCodeChefRating = [
  { contest: "Starters 110", rating: 1240 },
  { contest: "Starters 115", rating: 1310 },
  { contest: "Starters 120", rating: 1385 },
  { contest: "Starters 125", rating: 1414 },
];

const mockLeetCodeRating = [
  { contest: "Weekly 380", rating: 1512 },
  { contest: "Biweekly 122", rating: 1534 },
  { contest: "Weekly 384", rating: 1560 },
  { contest: "Weekly 390", rating: 1582 },
  { contest: "Biweekly 128", rating: 1570 },
  { contest: "Weekly 395", rating: 1634 },
];

export function ProblemSolverView({ leetcode, gfg, codechef }: ProblemSolverViewProps) {
  // Combined totals
  const lcSolved = leetcode?.totalSolved ?? 623;
  const gfgSolved = gfg?.totalProblemsSolved ?? 306;
  const ccSolved = codechef?.problemsSolved ?? 115;
  const grandTotalSolved = lcSolved + gfgSolved + ccSolved;

  const totalEasy = (leetcode?.easySolved ?? 209) + (gfg?.easySolved ?? 72);
  const totalMedium = (leetcode?.mediumSolved ?? 328) + (gfg?.mediumSolved ?? 199);
  const totalHard = (leetcode?.hardSolved ?? 86) + (gfg?.hardSolved ?? 20);

  const unifiedHeatmapData = getUnifiedSubmissionHeatmap(leetcode, gfg, codechef);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -12 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-8"
    >
      {/* KPI Hero Stat Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total DSA Solved"
          value={grandTotalSolved}
          sublabel="LeetCode + GFG + CodeChef"
          accentColor="#00ff66"
        />
        <StatCard label="Easy Solved" value={totalEasy} accentColor="#22c55e" />
        <StatCard label="Medium Solved" value={totalMedium} accentColor="#f59e0b" />
        <StatCard label="Hard Solved" value={totalHard} accentColor="#ef4444" />
      </div>

      {/* Unified Heatmap & Difficulty Ring Container */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Master Unified Heatmap (2 cols) */}
        <div className="lg:col-span-2 glass relative overflow-hidden rounded-3xl p-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-display text-lg font-bold text-foreground">
                Unified Problem Solving Activity
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              52-Week Master Heatmap
            </span>
          </div>

          <ActivityHeatmap
            data={unifiedHeatmapData}
            color="#10b981"
            label="Combined Submissions (LeetCode + GFG + CodeChef)"
            weeksBack={36}
          />
        </div>

        {/* Combined Difficulty Ring (1 col) */}
        <div className="glass relative overflow-hidden rounded-3xl p-6 border border-border/60 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-base font-bold text-foreground">
              Difficulty Breakdown
            </span>
            <Target className="h-4 w-4 text-primary" />
          </div>

          <DifficultyRing
            easy={totalEasy}
            medium={totalMedium}
            hard={totalHard}
            total={grandTotalSolved}
          />
        </div>
      </div>

      {/* Platform Quick Badges */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* LEETCODE BADGE */}
        <a
          href="https://leetcode.com/Shrish_Gupta"
          target="_blank"
          rel="noreferrer"
          className="group glass relative overflow-hidden rounded-3xl p-5 border border-amber-500/25 hover:border-amber-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.08)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                LEETCODE
              </span>
              <h4 className="font-display text-xl font-bold text-foreground group-hover:text-amber-400 transition-colors mt-0.5">
                @Shrish_Gupta
              </h4>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-amber-400 transition-colors" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-border/40 bg-background/40 p-2.5">
              <span className="text-[9px] font-mono text-muted-foreground uppercase">Solved</span>
              <p className="font-display text-lg font-bold text-foreground">{lcSolved}</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/40 p-2.5">
              <span className="text-[9px] font-mono text-muted-foreground uppercase">Rating</span>
              <p className="font-display text-lg font-bold text-amber-400">
                {leetcode?.contestRating ?? 1634}
              </p>
            </div>
          </div>
        </a>

        {/* GEEKFORGEEKS BADGE */}
        <a
          href="https://www.geeksforgeeks.org/profile/shrishgupta1"
          target="_blank"
          rel="noreferrer"
          className="group glass relative overflow-hidden rounded-3xl p-5 border border-emerald-500/25 hover:border-emerald-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                GEEKSFORGEEKS
              </span>
              <h4 className="font-display text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors mt-0.5">
                @shrishgupta1
              </h4>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border/40 bg-background/40 p-2">
              <span className="text-[8px] font-mono text-muted-foreground uppercase">Score</span>
              <p className="font-display text-base font-bold text-foreground">{gfg?.codingScore ?? 1068}</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/40 p-2">
              <span className="text-[8px] font-mono text-muted-foreground uppercase">Solved</span>
              <p className="font-display text-base font-bold text-foreground">{gfgSolved}</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/40 p-2">
              <span className="text-[8px] font-mono text-muted-foreground uppercase">Inst. Rank</span>
              <p className="font-display text-base font-bold text-emerald-400">#{gfg?.instituteRank ?? 187}</p>
            </div>
          </div>
        </a>

        {/* CODECHEF BADGE */}
        <a
          href="https://www.codechef.com/users/shrish57"
          target="_blank"
          rel="noreferrer"
          className="group glass relative overflow-hidden rounded-3xl p-5 border border-fuchsia-500/25 hover:border-fuchsia-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(217,70,239,0.08)]"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                CODECHEF
              </span>
              <h4 className="font-display text-xl font-bold text-foreground group-hover:text-fuchsia-400 transition-colors mt-0.5">
                @shrish57
              </h4>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-fuchsia-400 transition-colors" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border/40 bg-background/40 p-2">
              <span className="text-[8px] font-mono text-muted-foreground uppercase">Rating</span>
              <p className="font-display text-base font-bold text-fuchsia-400">{codechef?.rating ?? 1414}</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/40 p-2">
              <span className="text-[8px] font-mono text-muted-foreground uppercase">Stars</span>
              <p className="font-display text-base font-bold text-foreground">{codechef?.stars ?? "2★"}</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/40 p-2">
              <span className="text-[8px] font-mono text-muted-foreground uppercase">Division</span>
              <p className="font-display text-base font-bold text-foreground">Div {codechef?.division ?? 3}</p>
            </div>
          </div>
        </a>
      </div>

      {/* Contest Rating Graphs Side-by-Side */}
      {(() => {
        const lcHistory =
          leetcode?.ratingHistory && leetcode.ratingHistory.length > 0
            ? leetcode.ratingHistory
            : mockLeetCodeRating;
        const lcCurrent = leetcode?.contestRating ?? 1634;
        const lcMax = Math.max(lcCurrent, ...lcHistory.map((r) => r.rating));

        const ccHistory =
          codechef?.ratingHistory && codechef.ratingHistory.length > 0
            ? codechef.ratingHistory
            : mockCodeChefRating;
        const ccCurrent = codechef?.rating ?? 1414;
        const ccMax = Math.max(ccCurrent, ...ccHistory.map((r) => r.rating));

        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass rounded-3xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-4 w-4 text-amber-400" />
                <h4 className="font-display text-base font-bold text-foreground">LeetCode Rating History</h4>
              </div>
              <RatingChart
                data={lcHistory}
                color="#f59e0b"
                currentRating={lcCurrent}
                maxRating={lcMax}
                height={160}
              />
            </div>

            <div className="glass rounded-3xl p-6 border border-fuchsia-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-4 w-4 text-fuchsia-400" />
                <h4 className="font-display text-base font-bold text-foreground">CodeChef Rating History</h4>
              </div>
              <RatingChart
                data={ccHistory}
                color="#d946ef"
                currentRating={ccCurrent}
                maxRating={ccMax}
                height={160}
              />
            </div>
          </div>
        );
      })()}
    </motion.div>
  );
}
