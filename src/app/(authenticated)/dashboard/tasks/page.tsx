import { trpcServer, HydrateClient } from "~/clients/trpc/server";
import { ErrorBoundary } from "~/components/core/error-boundary";
import { TasksPageClient } from "./_components/tasks-page-client";

export default function Page() {
  void trpcServer.api.trustclaw.getCronJobs.prefetchInfinite({ limit: 20 });

  return (
    <HydrateClient>
      <div className="h-full overflow-y-auto">
        <ErrorBoundary>
          <TasksPageClient />
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
}
