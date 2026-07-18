import { cn } from "../../lib/cn";

interface LoadingSkeletonProps {
  className?: string;
}

export default function LoadingSkeleton({
  className,
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-slate-800/80",
        className
      )}
    />
  );
}