import { useMemo } from "react";

// Generates a 52-week × 7-day calendar from a map of {date: count}
// Returns weeks as arrays of day objects for rendering

export type HeatmapDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type HeatmapWeek = HeatmapDay[];

function getLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0 || max === 0) return 0;
  const ratio = count / max;
  if (ratio < 0.15) return 1;
  if (ratio < 0.4) return 2;
  if (ratio < 0.7) return 3;
  return 4;
}

function buildCalendar(
  dataMap: Record<string, number>,
  weeksBack = 52
): HeatmapWeek[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from Sunday of (weeksBack) weeks ago
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - weeksBack * 7);

  const allDays: Array<{ date: string; count: number }> = [];
  const cursor = new Date(start);
  while (cursor <= today) {
    const dateStr = cursor.toISOString().slice(0, 10);
    allDays.push({ date: dateStr, count: dataMap[dateStr] ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  const max = Math.max(...allDays.map((d) => d.count), 1);

  // Chunk into weeks (groups of 7)
  const weeks: HeatmapWeek[] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    const week = allDays.slice(i, i + 7).map((d) => ({
      ...d,
      level: getLevel(d.count, max),
    })) as HeatmapDay[];
    weeks.push(week);
  }

  return weeks;
}

// Converts ContributionDay[] array (from GitHub) to the same Record<string,number> shape
function arrayToMap(arr: Array<{ date: string; count: number }>): Record<string, number> {
  const m: Record<string, number> = {};
  for (const { date, count } of arr) m[date] = count;
  return m;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

type ActivityHeatmapProps = {
  // Either a map of {date: count} or an array of {date, count}
  data: Record<string, number> | Array<{ date: string; count: number }>;
  color: string; // CSS color for filled cells e.g. "#00ff66"
  weeksBack?: number;
  label?: string;
};

export function ActivityHeatmap({
  data,
  color,
  weeksBack = 52,
  label,
}: ActivityHeatmapProps) {
  const weeks = useMemo(() => {
    const map = Array.isArray(data) ? arrayToMap(data) : data;
    return buildCalendar(map, weeksBack);
  }, [data, weeksBack]);

  const totalActivity = useMemo(() => {
    const map = Array.isArray(data) ? arrayToMap(data) : data;
    return Object.values(map).reduce((a, b) => a + b, 0);
  }, [data]);

  // Build month label positions
  const monthPositions: Array<{ label: string; weekIndex: number }> = useMemo(() => {
    const seen = new Set<string>();
    const positions: Array<{ label: string; weekIndex: number }> = [];
    for (let wi = 0; wi < weeks.length; wi++) {
      const week = weeks[wi];
      if (!week[0]) continue;
      const month = week[0].date.slice(5, 7);
      if (!seen.has(month)) {
        seen.add(month);
        positions.push({
          label: MONTH_LABELS[parseInt(month, 10) - 1],
          weekIndex: wi,
        });
      }
    }
    return positions;
  }, [weeks]);

  const cellSize = 11;
  const gap = 2;
  const step = cellSize + gap;
  const svgWidth = weeks.length * step;
  const svgHeight = 7 * step;

  // Level → opacity
  const levelOpacity: Record<number, number> = { 0: 0.08, 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 };

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {totalActivity.toLocaleString()} total
          </span>
        </div>
      )}

      {/* Month labels */}
      <div className="mb-1 flex overflow-x-auto pb-1 scrollbar-none">
        <div style={{ width: 22, flexShrink: 0 }} />
        <div style={{ position: "relative", height: 14, width: svgWidth, flexShrink: 0 }}>
          {monthPositions.map(({ label: ml, weekIndex }) => (
            <span
              key={ml + weekIndex}
              className="absolute font-mono text-[9px] text-muted-foreground"
              style={{ left: weekIndex * step }}
            >
              {ml}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none">
        {/* Day labels */}
        <div
          className="mr-1.5 flex flex-col justify-between"
          style={{ height: svgHeight, paddingTop: 1 }}
        >
          {DAY_LABELS.map((d, i) => (
            <span
              key={i}
              className="font-mono text-[8px] text-muted-foreground leading-none"
              style={{ height: cellSize }}
            >
              {d}
            </span>
          ))}
        </div>

        {/* SVG cells */}
        <svg
          width={svgWidth}
          height={svgHeight}
          style={{ flexShrink: 0 }}
          aria-label="Activity heatmap"
        >
          {weeks.map((week, wi) =>
            week.map((day, di) => (
              <rect
                key={day.date}
                x={wi * step}
                y={di * step}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill={color}
                opacity={levelOpacity[day.level]}
                style={{ transition: "opacity 0.2s" }}
              >
                <title>{`${day.date}: ${day.count} ${day.count === 1 ? "contribution" : "contributions"}`}</title>

              </rect>
            ))
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-1 flex items-center gap-1.5">
        <span className="font-mono text-[8px] text-muted-foreground">Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span
            key={l}
            style={{
              display: "inline-block",
              width: cellSize,
              height: cellSize,
              borderRadius: 2,
              backgroundColor: color,
              opacity: levelOpacity[l],
              flexShrink: 0,
            }}
            aria-hidden
          />
        ))}
        <span className="font-mono text-[8px] text-muted-foreground">More</span>
      </div>

    </div>
  );
}
