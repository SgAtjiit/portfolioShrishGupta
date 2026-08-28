import { motion } from "motion/react";
import { ExternalLink, Star, GitFork, BookOpen, Github } from "lucide-react";
import { StatCard } from "./StatCard";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { GitHubStats } from "@/hooks/useCodingStats";

type DeveloperViewProps = {
  github?: GitHubStats;
};

const LANG_BADGES: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  JavaScript: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Python: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "C++": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Java: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export function DeveloperView({ github }: DeveloperViewProps) {
  const publicRepos = github?.publicRepos ?? 32;
  const totalStars = github?.totalStars ?? 45;
  const followers = github?.followers ?? 120;
  const following = github?.following ?? 15;
  const topRepos = github?.topRepos ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -12 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-8"
    >
      {/* GitHub Overview Stat Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Public Repos" value={publicRepos} accentColor="#0ea5e9" />
        <StatCard label="Stars Earned" value={totalStars} accentColor="#eab308" />
        <StatCard label="Followers" value={followers} accentColor="#3b82f6" />
        <StatCard label="Following" value={following} accentColor="#8b5cf6" />
      </div>

      {/* GitHub Contribution Heatmap */}
      <div className="glass relative overflow-hidden rounded-3xl p-6 border border-sky-500/20 shadow-[0_0_30px_rgba(14,165,233,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-sky-400" />
            <span className="font-display text-lg font-bold text-foreground">
              GitHub Contribution Heatmap
            </span>
          </div>
          <a
            href="https://github.com/SgAtjiit"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] text-sky-400 hover:underline flex items-center gap-1"
          >
            @SgAtjiit &rarr;
          </a>
        </div>

        <ActivityHeatmap
          data={github?.contributions ?? []}
          color="#0ea5e9"
          label="Open Source Contributions (Last 52 Weeks)"
          weeksBack={52}
        />

      </div>

      {/* Top Repositories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h4 className="font-display text-xl font-bold text-foreground">Top Repositories</h4>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Open Source Projects
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {topRepos.map((repo) => {
            const badgeClass =
              LANG_BADGES[repo.language] ?? "bg-surface-2 text-muted-foreground border-border";

            return (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group glass relative overflow-hidden rounded-2xl p-5 border border-border/60 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h5 className="font-display text-lg font-bold text-foreground group-hover:text-sky-400 transition-colors">
                      {repo.name}
                    </h5>

                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-sky-400 transition-colors" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs font-mono pt-3 border-t border-border/40">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeClass}`}>
                    {repo.language}
                  </span>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
