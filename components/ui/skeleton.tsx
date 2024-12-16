import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-800/50", className)}
      {...props}
    />
  );
}

export const NFTCardSkeleton = () => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full" />
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
};

export const NFTGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <NFTCardSkeleton key={i} />
      ))}
    </div>
  );
};
