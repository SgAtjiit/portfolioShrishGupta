import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type RatingPoint = {
  contest: string;
  rating: number;
};

type RatingChartProps = {
  data: RatingPoint[];
  color?: string;
  height?: number;
  currentRating?: number;
  maxRating?: number;
};

export function RatingChart({
  data,
  color = "#f59e0b",
  height = 140,
  currentRating,
  maxRating,
}: RatingChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[140px] items-center justify-center rounded-xl border border-border/40 bg-background/30 p-4 text-xs font-mono text-muted-foreground">
        No rating history available
      </div>
    );
  }

  const minVal = Math.min(...data.map((d) => d.rating));
  const maxVal = Math.max(...data.map((d) => d.rating));
  const domainPadding = Math.max(20, Math.round((maxVal - minVal) * 0.15));

  return (
    <div className="w-full">
      {(currentRating !== undefined || maxRating !== undefined) && (
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Rating History
          </span>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            {currentRating !== undefined && (
              <span className="text-foreground">
                Current: <strong className="text-white">{currentRating}</strong>
              </span>
            )}
            {maxRating !== undefined && (
              <span className="text-muted-foreground">
                Peak: <strong className="text-primary">{maxRating}</strong>
              </span>
            )}
          </div>
        </div>
      )}

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id={`ratingGrad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="contest"
              stroke="#666"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(255,255,255,0.4)" }}
            />
            <YAxis
              domain={[minVal - domainPadding, maxVal + domainPadding]}
              stroke="#666"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(255,255,255,0.4)" }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload as RatingPoint;
                  return (
                    <div className="rounded-lg border border-border/80 bg-background/90 p-2 shadow-xl backdrop-blur">
                      <p className="font-mono text-[10px] text-muted-foreground">{p.contest}</p>
                      <p className="font-display text-sm font-bold text-white">
                        Rating: <span style={{ color }}>{p.rating}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="rating"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#ratingGrad-${color.replace("#", "")})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
