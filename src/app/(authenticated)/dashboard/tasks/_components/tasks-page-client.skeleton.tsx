import { Skeleton } from "~/components/ui/skeleton";

export function TasksPageSkeleton() {
  return (
    <div className="mt-3 space-y-2">
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  );
}
