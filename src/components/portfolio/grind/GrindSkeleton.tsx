export function GrindSkeleton() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="min-w-[340px] max-w-[380px] w-full shrink-0 snap-center rounded-3xl border border-border/40 bg-surface/40 p-6 space-y-6 animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-white/10 rounded" />
              <div className="h-7 w-32 bg-white/10 rounded" />
              <div className="h-3 w-24 bg-white/10 rounded" />
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="h-20 rounded-2xl bg-white/5 p-3 space-y-2">
                <div className="h-2 w-12 bg-white/10 rounded" />
                <div className="h-6 w-16 bg-white/10 rounded" />
              </div>
            ))}
          </div>

          {/* Main Visual Shimmer */}
          <div className="h-36 rounded-2xl bg-white/5" />
        </div>
      ))}
    </div>
  );
}
