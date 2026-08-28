import { createServerFn } from "@tanstack/react-start";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export type RatingPoint = {
  contest: string;
  rating: number;
};

// ─── LeetCode Official GraphQL Server Fetcher ─────────────────────────────────

export const getLeetCodeStatsServer = createServerFn({ method: "GET" })
  .validator((username: string) => username)
  .handler(async ({ data: username }) => {
    try {
      const graphqlQuery = {
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
              userCalendar {
                submissionCalendar
              }
            }
            userContestRanking(username: $username) {
              rating
            }
            userContestRankingHistory(username: $username) {
              attended
              rating
              contest {
                title
              }
            }
          }
        `,
        variables: { username },
      };

      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": USER_AGENT,
          Referer: `https://leetcode.com/${username}/`,
        },
        body: JSON.stringify(graphqlQuery),
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        const json = await res.json();
        const matched = json?.data?.matchedUser;
        if (matched) {
          const stats = matched.submitStatsGlobal?.acSubmissionNum || [];
          const getCount = (diff: string) =>
            stats.find((s: { difficulty: string; count: number }) => s.difficulty === diff)?.count || 0;

          const totalSolved = getCount("All");
          const easySolved = getCount("Easy");
          const mediumSolved = getCount("Medium");
          const hardSolved = getCount("Hard");
          const ranking = matched.profile?.ranking || 0;
          const contestRating = Math.round(json?.data?.userContestRanking?.rating || 1634);

          let submissionCalendar: Record<string, number> = {};
          if (matched.userCalendar?.submissionCalendar) {
            const cal = typeof matched.userCalendar.submissionCalendar === "string"
              ? JSON.parse(matched.userCalendar.submissionCalendar)
              : matched.userCalendar.submissionCalendar;
            for (const [ts, count] of Object.entries(cal)) {
              const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
              submissionCalendar[date] = (submissionCalendar[date] ?? 0) + Number(count);
            }
          }

          // Parse contest rating history
          const rawHistory = json?.data?.userContestRankingHistory || [];
          const ratingHistory: RatingPoint[] = rawHistory
            .filter((h: any) => h.attended && h.rating)
            .map((h: any) => ({
              contest: (h.contest?.title || "Contest")
                .replace("Weekly Contest ", "W")
                .replace("Biweekly Contest ", "BW"),
              rating: Math.round(h.rating),
            }));

          if (totalSolved > 0) {
            return {
              totalSolved,
              easySolved,
              mediumSolved,
              hardSolved,
              ranking,
              contestRating,
              ratingHistory,
              badges: [],
              submissionCalendar,
              isFallback: false,
            };
          }
        }
      }
    } catch {
      // try next
    }

    return {
      totalSolved: 623,
      easySolved: 209,
      mediumSolved: 328,
      hardSolved: 86,
      ranking: 0,
      contestRating: 1634,
      ratingHistory: [],
      badges: [],
      submissionCalendar: {},
      isFallback: true,
    };
  });

// ─── GeeksforGeeks Direct Server Fetcher ──────────────────────────────────────

export const getGFGStatsServer = createServerFn({ method: "GET" })
  .validator((username: string) => username)
  .handler(async ({ data: username }) => {
    const handle = username || "shrishgupta1";

    try {
      const res = await fetch(`https://practiceapi.geeksforgeeks.org/api/vr/user/profile/${handle}`, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const json = await res.json();
        const data = json?.data || json;
        if (data && (data.score !== undefined || data.total_problems_solved !== undefined)) {
          return {
            codingScore: Number(data.score ?? data.codingScore ?? 1068),
            totalProblemsSolved: Number(data.total_problems_solved ?? data.totalSolved ?? 306),
            easySolved: Number(data.easy_solved ?? 72),
            mediumSolved: Number(data.medium_solved ?? 199),
            hardSolved: Number(data.hard_solved ?? 20),
            instituteRank: Number(data.institute_rank ?? data.rank ?? 187),
            potdSolved: Number(data.pod_solved_count ?? data.potdSolved ?? 191),
            longestStreak: Number(data.max_streak ?? data.longestStreak ?? 56),
            currentStreak: Number(data.current_streak ?? 0),
            isFallback: false,
          };
        }
      }
    } catch {
      // try next
    }

    const profileUrls = [
      `https://www.geeksforgeeks.org/profile/${handle}`,
      `https://www.geeksforgeeks.org/user/${handle}/`,
    ];

    for (const pageUrl of profileUrls) {
      try {
        const res = await fetch(pageUrl, {
          headers: {
            "User-Agent": USER_AGENT,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const html = await res.text();
          const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
          if (nextDataMatch && nextDataMatch[1]) {
            try {
              const nextData = JSON.parse(nextDataMatch[1]);
              const userInfo =
                nextData?.props?.pageProps?.userInfo ||
                nextData?.props?.pageProps?.userData ||
                nextData?.props?.pageProps?.data;

              if (userInfo) {
                return {
                  codingScore: Number(userInfo.score ?? userInfo.coding_score ?? 1068),
                  totalProblemsSolved: Number(
                    userInfo.total_problem_solved ?? userInfo.total_problems_solved ?? 306
                  ),
                  easySolved: Number(userInfo.easy_solved ?? 72),
                  mediumSolved: Number(userInfo.medium_solved ?? 199),
                  hardSolved: Number(userInfo.hard_solved ?? 20),
                  instituteRank: Number(userInfo.institute_rank ?? 187),
                  potdSolved: Number(userInfo.pod_solved_count ?? 191),
                  longestStreak: Number(userInfo.max_streak ?? 56),
                  currentStreak: Number(userInfo.current_streak ?? 0),
                  isFallback: false,
                };
              }
            } catch {
              // try regex
            }
          }
        }
      } catch {
        // try next
      }
    }

    return {
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
    };
  });

// ─── CodeChef Direct Server Fetcher ───────────────────────────────────────────

export const getCodeChefStatsServer = createServerFn({ method: "GET" })
  .validator((username: string) => username)
  .handler(async ({ data: username }) => {
    const handle = username || "shrish57";

    // 1. Try public CodeChef REST APIs first
    const apiEndpoints = [
      `https://codechef-api.vercel.app/handle/${handle}`,
      `https://codechef-api.vercel.app/${handle}`,
      `https://codeindex.vercel.app/api/codechef?username=${handle}`,
    ];

    for (const url of apiEndpoints) {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": USER_AGENT },
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const json = await res.json();
          const data = json?.data || json;
          const rating = Number(data.currentRating ?? data.rating ?? data.ratingNumber ?? 1414);
          const stars = String(data.stars ?? data.ratingStar ?? (rating >= 1400 ? "2★" : "1★"));
          const division = String(data.division ?? data.div ?? (rating >= 1400 ? "3" : "4"));
          const problemsSolved = Number(data.totalSolved ?? data.problemsSolved ?? data.fullySolved ?? 115);

          let ratingHistory: RatingPoint[] = [];
          const rawHistory = data.ratingData || data.ratingHistory || data.all_rating || data.contests;
          if (Array.isArray(rawHistory) && rawHistory.length > 0) {
            ratingHistory = rawHistory
              .map((item: any) => ({
                contest: String(item.code || item.name || item.contest_code || "Contest"),
                rating: Number(item.rating || item.currentRating || item.val),
              }))
              .filter((r: RatingPoint) => !isNaN(r.rating) && r.rating > 0);
          }

          if (rating > 0) {
            return {
              rating,
              stars,
              division,
              globalRank: Number(data.globalRank ?? 0),
              countryRank: Number(data.countryRank ?? 0),
              problemsSolved,
              ratingHistory,
              isFallback: false,
            };
          }
        }
      } catch {
        // try next
      }
    }

    // 2. Fallback to direct HTML scrape of https://www.codechef.com/users/${handle}
    try {
      const res = await fetch(`https://www.codechef.com/users/${handle}`, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const html = await res.text();

        const ratingMatch =
          html.match(/class="rating-number">(\d+)</i) ||
          html.match(/rating-header.*?(\d{3,4})/i) ||
          html.match(/"rating":\s*(\d{3,4})/);
        const rating = ratingMatch ? Number(ratingMatch[1]) : 1414;

        const starsMatch =
          html.match(/class="rating-star"><span>(.*?)<\/span>/i) ||
          html.match(/(\d★)/);
        const stars = starsMatch ? starsMatch[1] : rating >= 1400 ? "2★" : "1★";

        const divMatch = html.match(/Div\s*(\d)/i);
        const division = divMatch ? divMatch[1] : "3";

        const solvedMatch =
          html.match(/Total Problems Solved:?\s*(\d+)/i) ||
          html.match(/Fully Solved \((\d+)\)/i) ||
          html.match(/problems-solved.*?(\d+)/i);
        const problemsSolved = solvedMatch ? Number(solvedMatch[1]) : 115;

        let ratingHistory: RatingPoint[] = [];
        const allRatingMatch =
          html.match(/var all_rating = (\[.*?\]);/s) ||
          html.match(/all_rating\s*=\s*(\[.*?\]);/s);
        if (allRatingMatch && allRatingMatch[1]) {
          try {
            const rawList = JSON.parse(allRatingMatch[1]);
            ratingHistory = rawList.map((item: any) => ({
              contest: String(item.code || item.name || (item.getyear ? `${item.getyear}-${item.getmonth}` : "Contest")),
              rating: Number(item.rating),
            }));
          } catch {
            // ignore
          }
        }

        return {
          rating,
          stars,
          division,
          globalRank: 0,
          countryRank: 0,
          problemsSolved,
          ratingHistory,
          isFallback: false,
        };
      }
    } catch {
      // try fallback
    }

    return {
      rating: 1414,
      stars: "2★",
      division: "3",
      globalRank: 0,
      countryRank: 0,
      problemsSolved: 115,
      ratingHistory: [],
      isFallback: true,
    };
  });

// ─── GitHub Server Fetcher ────────────────────────────────────────────────────

export const getGitHubStatsServer = createServerFn({ method: "GET" })
  .validator((username: string) => username)
  .handler(async ({ data: username }) => {
    const token = process.env.VITE_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      "User-Agent": "Portfolio-App",
      ...(token ? { Authorization: `token ${token}` } : {}),
    };

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          headers,
          signal: AbortSignal.timeout(8000),
        }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
          headers,
          signal: AbortSignal.timeout(8000),
        }),
      ]);

      if (!userRes.ok) throw new Error("GitHub user fetch failed");
      const user = await userRes.json();

      let totalStars = 0;
      let topRepos: Array<{
        name: string;
        description: string;
        stars: number;
        forks: number;
        language: string;
        url: string;
      }> = [];

      if (reposRes.ok) {
        const repos: Array<{
          name: string;
          description: string | null;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          fork: boolean;
          html_url: string;
        }> = await reposRes.json();

        const nonForks = repos.filter((r) => !r.fork);
        for (const repo of nonForks) {
          totalStars += repo.stargazers_count ?? 0;
        }

        topRepos = nonForks
          .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
          .slice(0, 6)
          .map((r) => ({
            name: r.name,
            description: r.description || "No description provided.",
            stars: r.stargazers_count ?? 0,
            forks: r.forks_count ?? 0,
            language: r.language || "TypeScript",
            url: r.html_url,
          }));
      }

      let contributions: Array<{ date: string; count: number }> = [];

      try {
        const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.contributions)) {
            const flat = data.contributions.flat(2);
            for (const item of flat) {
              if (item && item.date && item.count !== undefined) {
                contributions.push({ date: String(item.date), count: Number(item.count) });
              }
            }
          }
        }
      } catch {
        // try next
      }

      if (contributions.length === 0) {
        try {
          const res = await fetch(`https://github.com/users/${username}/contributions`, {
            headers: { "User-Agent": USER_AGENT },
            signal: AbortSignal.timeout(8000),
          });
          if (res.ok) {
            const html = await res.text();
            const counts: Record<string, number> = {};
            const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="(\d+)"/g;
            let match;
            while ((match = regex.exec(html)) !== null) {
              const date = match[1];
              const level = Number(match[2]);
              counts[date] = level === 0 ? 0 : level === 1 ? 2 : level === 2 ? 5 : level === 3 ? 8 : 12;
            }
            contributions = Object.entries(counts)
              .map(([date, count]) => ({ date, count }))
              .sort((a, b) => a.date.localeCompare(b.date));
          }
        } catch {
          // fallback
        }
      }

      if (topRepos.length === 0) {
        topRepos = [
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
        ];
      }

      return {
        publicRepos: user.public_repos ?? 32,
        followers: user.followers ?? 120,
        following: user.following ?? 15,
        totalStars,
        topRepos,
        contributions,
        isFallback: false,
      };
    } catch {
      return {
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
      };
    }
  });
