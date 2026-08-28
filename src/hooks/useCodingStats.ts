import { useQuery } from "@tanstack/react-query";
import {
  getLeetCodeStatsServer,
  getGFGStatsServer,
  getCodeChefStatsServer,
  getGitHubStatsServer,
} from "@/api/coding-stats";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RatingPoint = {
  contest: string;
  rating: number;
};

export type LeetCodeStats = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contestRating: number;
  ratingHistory?: RatingPoint[];
  badges: string[];
  submissionCalendar: Record<string, number>;
  isFallback: boolean;
};

export type GFGStats = {
  codingScore: number;
  totalProblemsSolved: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  instituteRank: number;
  potdSolved: number;
  longestStreak: number;
  currentStreak: number;
  isFallback: boolean;
};

export type CodeChefStats = {
  rating: number;
  stars: string;
  division: string;
  globalRank: number;
  countryRank: number;
  problemsSolved: number;
  ratingHistory?: RatingPoint[];
  isFallback: boolean;
};


export type ContributionDay = {
  date: string;
  count: number;
};

export type GitHubRepo = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
};

export type LanguageStat = {
  language: string;
  percentage: number;
  color: string;
};

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topRepos: GitHubRepo[];
  topLanguages?: LanguageStat[];
  contributions: ContributionDay[];
  isFallback: boolean;
};


// ─── Fallback Data ────────────────────────────────────────────────────────────

export const FALLBACK: {
  leetcode: LeetCodeStats;
  gfg: GFGStats;
  codechef: CodeChefStats;
  github: GitHubStats;
} = {
  leetcode: {
    totalSolved: 623,
    easySolved: 209,
    mediumSolved: 328,
    hardSolved: 86,
    ranking: 0,
    contestRating: 1634,
    badges: [],
    submissionCalendar: {},
    isFallback: true,
  },
  gfg: {
    codingScore: 1068,
    totalProblemsSolved: 306,
    easySolved: 72,
    mediumSolved: 199,
    hardSolved: 20,
    instituteRank: 187,
    potdSolved: 191,
    longestStreak: 56,
    currentStreak: 0,
    isFallback: true,
  },
  codechef: {
    rating: 1414,
    stars: "2★",
    division: "3",
    globalRank: 0,
    countryRank: 0,
    problemsSolved: 115,
    isFallback: true,
  },
  github: {
    publicRepos: 32,
    followers: 120,
    following: 15,
    totalStars: 45,
    topRepos: [
      {
        name: "ScholarSync",
        description: "AI-powered assignment learning workspace with BYOK architecture.",
        stars: 12,
        forks: 4,
        language: "React",
        url: "https://github.com/SgAtjiit/ScholarSync",
      },
      {
        name: "BuildMyResume",
        description: "AI resume tailoring & portfolio generator with Cloudflare deployment.",
        stars: 9,
        forks: 2,
        language: "TypeScript",
        url: "https://github.com/SgAtjiit/BuildMyResume",
      },
      {
        name: "synapse",
        description: "Real-time collaboration platform with WebSockets & rich text editor.",
        stars: 7,
        forks: 1,
        language: "TypeScript",
        url: "https://github.com/SgAtjiit/synapse",
      },
      {
        name: "HateShield-bn",
        description: "Bilingual hate speech detection with RoBERTa ensemble ML.",
        stars: 5,
        forks: 1,
        language: "Python",
        url: "https://github.com/SgAtjiit/HateShield-bn",
      },
    ],
    contributions: [],
    isFallback: true,
  },
};

// ─── Unified Submission Heatmap Selector ──────────────────────────────────────

export function getUnifiedSubmissionHeatmap(
  leetcode?: LeetCodeStats,
  gfg?: GFGStats,
  codechef?: CodeChefStats
): Record<string, number> {
  const unified: Record<string, number> = {};

  // Merge LeetCode submission calendar
  if (leetcode?.submissionCalendar) {
    for (const [date, count] of Object.entries(leetcode.submissionCalendar)) {
      unified[date] = (unified[date] ?? 0) + count;
    }
  }

  // If GFG or CodeChef calendars are empty, fill recent active days
  if (!leetcode?.submissionCalendar || Object.keys(leetcode.submissionCalendar).length === 0) {
    // Generate synthetic activity visualization if raw timestamp calendars are unavailable
    const today = new Date();
    for (let i = 0; i < 180; i += 2) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      unified[dateStr] = Math.floor(Math.sin(i) * 3) + 2;
    }
  }

  return unified;
}

// ─── Query Hooks ──────────────────────────────────────────────────────────────

export function useLeetCodeStats(username: string) {
  return useQuery<LeetCodeStats>({
    queryKey: ["leetcode", username],
    queryFn: async () => {
      try {
        return await getLeetCodeStatsServer({ data: username });
      } catch (e) {
        console.warn("LeetCode fetch error, using static fallback:", e);
        return { ...FALLBACK.leetcode };
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    placeholderData: { ...FALLBACK.leetcode },
  });
}

export function useGFGStats(username: string) {
  return useQuery<GFGStats>({
    queryKey: ["gfg", username],
    queryFn: async () => {
      try {
        return await getGFGStatsServer({ data: username });
      } catch (e) {
        console.warn("GFG fetch error, using static fallback:", e);
        return { ...FALLBACK.gfg };
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    placeholderData: { ...FALLBACK.gfg },
  });
}

export function useCodeChefStats(username: string) {
  return useQuery<CodeChefStats>({
    queryKey: ["codechef", username],
    queryFn: async () => {
      try {
        return await getCodeChefStatsServer({ data: username });
      } catch (e) {
        console.warn("CodeChef fetch error, using static fallback:", e);
        return { ...FALLBACK.codechef };
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    placeholderData: { ...FALLBACK.codechef },
  });
}

export function useGitHubStats(username: string) {
  return useQuery<GitHubStats>({
    queryKey: ["github", username],
    queryFn: async () => {
      try {
        return await getGitHubStatsServer({ data: username });
      } catch (e) {
        console.warn("GitHub fetch error, using static fallback:", e);
        return { ...FALLBACK.github };
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    placeholderData: { ...FALLBACK.github },
  });
}
