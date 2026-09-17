import { ErrorBoundary } from "~/components/core/error-boundary";
import { GoalsPageClient } from "./_components/goals-page-client";

export default function Page() {
  return (
    <div className="h-full overflow-y-auto">
      <ErrorBoundary>
        <GoalsPageClient />
      </ErrorBoundary>
    </div>
  );
}
