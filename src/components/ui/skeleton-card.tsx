import { cn } from "@/lib/utils";

export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl overflow-hidden border bg-card", className)}>
      <div className="h-64 w-full bg-muted animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
        <div className="flex gap-3 pt-2">
          <div className="h-4 w-12 bg-muted animate-pulse rounded" />
          <div className="h-4 w-12 bg-muted animate-pulse rounded" />
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
