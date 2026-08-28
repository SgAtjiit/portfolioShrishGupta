import { motion } from "motion/react";
import { ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { DifficultyRing } from "./DifficultyRing";
import { RatingChart } from "./RatingChart";
import { LanguageBar } from "./LanguageBar";
import { StatCard } from "./StatCard";
import type {
  LeetCodeStats,
  GFGStats,
  CodeChefStats,
  GitHubStats,
} from "@/hooks/useCodingStats";

export type PlatformProfileConfig = {
  platform: "LeetCode" | "GeeksForGeeks" | "CodeChef" | "GitHub";
  handle: string;
  url: string;
  accent: string;
  themeColor: string;
  border: string;
  glow: string;
};

type PlatformCardProps = {
  config: PlatformProfileConfig;
  data: {
    leetcode?: LeetCodeStats;
    gfg?: GFGStats;
    codechef?: CodeChefStats;
    github?: GitHubStats;
  };
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  index: number;
};

// Mock LeetCode rating history data for demonstration
const mockLeetCodeRating = [
  { contest: "Weekly 380", rating: 1512 },
  { contest: "Biweekly 122", rating: 1534 },
  { contest: "Weekly 384", rating: 1560 },
  { contest: "Weekly 390", rating: 1582 },
  { contest: "Biweekly 128", rating: 1570 },
  { contest: "Weekly 395", rating: 1608 },
];

export function PlatformCard({
  config,
  data,
  isLoading,
  isError,
  refetch,
  index,
}: PlatformCardProps) {
  const { platform, handle, url, accent, themeColor, border, glow } = config;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 border transition-all duration-500 min-w-[340px] max-w-[400px] sm:min-w-[380px] w-full shrink-0 snap-center ${border} ${glow}`}
    >
      {/* Background Glow */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-30 transition-opacity duration-500 group-hover:opacity-50`}
      />

      <div>
        {/* Card Header */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                PLATFORM
              </span>
              {isError ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[9px] font-mono text-destructive">
                  <AlertCircle className="h-2.5 w-2.5" /> Cached
                </span>
              ) : isLoading ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-mono text-amber-500">
                  <RefreshCw className="h-2.5 w-2.5 animate-spin" /> Live Sync
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
              )}
            </div>

            <h3 className="mt-1 font-display text-2xl font-bold text-white group-hover:text-primary transition-colors">
              {platform}
            </h3>
            <p className="text-xs font-mono text-muted-foreground">@{handle}</p>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
            title={`Visit ${platform} profile`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Content based on Platform */}
        <div className="relative z-10 space-y-6">
          {/* LEETCODE */}
          {platform === "LeetCode" && data.leetcode && (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <StatCard label="Solved" value={data.leetcode.totalSolved} accentColor={themeColor} />
                <StatCard label="Rating" value={data.leetcode.contestRating || 1608} accentColor={themeColor} />
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/30 p-4 backdrop-blur">
                <DifficultyRing
                  easy={data.leetcode.easySolved}
                  medium={data.leetcode.mediumSolved}
                  hard={data.leetcode.hardSolved}
                  total={data.leetcode.totalSolved}
                />
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/30 p-4 backdrop-blur">
                <RatingChart
                  data={mockLeetCodeRating}
                  color={themeColor}
                  currentRating={data.leetcode.contestRating || 1608}
                />
              </div>

              {Object.keys(data.leetcode.submissionCalendar).length > 0 && (
                <div className="rounded-2xl border border-border/40 bg-background/30 p-4 backdrop-blur">
                  <ActivityHeatmap
                    data={data.leetcode.submissionCalendar}
                    color={themeColor}
                    label="Submission Heatmap"
                    weeksBack={24}
                  />
                </div>
              )}
            </>
          )}

          {/* GEEKSFORGEEKS */}
          {platform === "GeeksForGeeks" && data.gfg && (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <StatCard label="Score" value={data.gfg.codingScore} accentColor={themeColor} />
                <StatCard label="Problems" value={data.gfg.totalProblemsSolved} accentColor={themeColor} />
                <StatCard label="Inst. Rank" value={`#${data.gfg.instituteRank}`} isNumeric={false} />
                <StatCard label="POTD" value={data.gfg.potdSolved} />
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/30 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Streak Status
                    </div>
                    <div className="mt-1 font-display text-xl font-bold text-white">
                      {data.gfg.longestStreak} Days Max
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 grid place-items-center text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                    🔥
                  </div>
                </div>
              </div>
            </>
          )}

          {/* CODECHEF */}
          {platform === "CodeChef" && data.codechef && (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <StatCard label="Rating" value={data.codechef.rating} accentColor={themeColor} />
                <StatCard label="Stars" value={data.codechef.stars} isNumeric={false} accentColor={themeColor} />
                <StatCard label="Division" value={`Div ${data.codechef.division}`} isNumeric={false} />
                {data.codechef.globalRank > 0 && (
                  <StatCard label="Global Rank" value={`#${data.codechef.globalRank}`} isNumeric={false} />
                )}
              </div>
            </>
          )}

          {/* GITHUB */}
          {platform === "GitHub" && data.github && (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <StatCard label="Public Repos" value={data.github.publicRepos} accentColor={themeColor} />
                <StatCard label="Followers" value={data.github.followers} accentColor={themeColor} />
                <StatCard label="Stars Earned" value={data.github.totalStars} />
                <StatCard label="Following" value={data.github.following} />
              </div>

              {data.github.topLanguages && data.github.topLanguages.length > 0 && (
                <div className="rounded-2xl border border-border/40 bg-background/30 p-4 backdrop-blur">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                    Top Languages
                  </div>
                  <LanguageBar languages={data.github.topLanguages} />
                </div>
              )}


              {data.github.contributions.length > 0 && (
                <div className="rounded-2xl border border-border/40 bg-background/30 p-4 backdrop-blur">
                  <ActivityHeatmap
                    data={data.github.contributions}
                    color={themeColor}
                    label="GitHub Activity (Public)"
                    weeksBack={24}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer link */}
      <div className="relative z-10 mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono text-[10px]">VERIFIED USER</span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] text-primary hover:underline flex items-center gap-1"
        >
          View Live Profile &rarr;
        </a>
      </div>
    </motion.div>
  );
}
