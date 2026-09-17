"use client";

import moment from "moment";
import { Clock, Loader2 } from "lucide-react";
import { trpc, type RouterOutputs } from "~/clients/trpc";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { ErrorDisplay } from "~/components/core/error-display";
import { formatCronExpression } from "./format-cron";
import { TasksPageSkeleton } from "./tasks-page-client.skeleton";

type CronJob = RouterOutputs["trustclaw"]["getCronJobs"]["items"][number];

function TaskRow({ job }: { job: CronJob }) {
  return (
    <li className="border-border bg-card rounded-xl border p-3">
      <p className="text-sm font-medium break-words">{job.prompt}</p>
      <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-2 text-xs">
        <span className="flex items-center gap-1">
          <Clock className="size-3" />
          {formatCronExpression(job.expression)}
        </span>
        {job.nextRunAt && (
          <span>Next {moment(job.nextRunAt).format("MMM D, h:mm A")}</span>
        )}
        {job.lastRunAt && (
          <span>Last ran {moment(job.lastRunAt).fromNow()}</span>
        )}
        {!job.enabled && <Badge variant="secondary">Paused</Badge>}
      </div>
    </li>
  );
}

function EmptyLine({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground mt-3 text-sm">{children}</p>;
}

export function TasksPageClient() {
  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.trustclaw.getCronJobs.useInfiniteQuery(
    { limit: 20 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const jobs = data?.pages.flatMap((page) => page.items) ?? [];
  const running = jobs.filter((job) => job.lockedAt !== null);
  const scheduled = jobs.filter((job) => job.lockedAt === null);

  if (error) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6 md:py-8">
        <ErrorDisplay
          message="Failed to load your tasks."
          retryText="Try again"
          onRetry={() => void refetch()}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6 md:py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
      <Separator className="mt-4" />

      <section className="mt-6">
        <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Running
        </h2>
        {isLoading ? (
          <TasksPageSkeleton />
        ) : running.length === 0 ? (
          <EmptyLine>No tasks running</EmptyLine>
        ) : (
          <ul className="mt-3 space-y-2">
            {running.map((job) => (
              <TaskRow key={job.id} job={job} />
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Scheduled
        </h2>
        {isLoading ? (
          <TasksPageSkeleton />
        ) : scheduled.length === 0 ? (
          <EmptyLine>
            Nothing scheduled. Ask Lucy to schedule something for you.
          </EmptyLine>
        ) : (
          <>
            <ul className="mt-3 space-y-2">
              {scheduled.map((job) => (
                <TaskRow key={job.id} job={job} />
              ))}
            </ul>
            {hasNextPage && (
              <Button
                variant="outline"
                className="mt-3 w-full"
                onClick={() => void fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Load more"
                )}
              </Button>
            )}
          </>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Completed
        </h2>
        <EmptyLine>No completed tasks yet</EmptyLine>
      </section>
    </div>
  );
}
