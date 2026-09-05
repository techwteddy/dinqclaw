import { headers } from "next/headers";
import { ErrorBoundary } from "~/components/core/error-boundary";
import { DinqClawSidebar } from "~/components/dinqclaw-sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { TooltipProvider } from "~/components/ui/tooltip";
import { auth } from "~/server/auth";
import { db } from "~/server/clients/db";
import { DashboardNavbar } from "./_components/dashboard-navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  const user = userId
    ? await db.user.findUnique({
        where: { id: userId },
        select: { dinqId: true },
      })
    : null;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <DinqClawSidebar dinqId={user?.dinqId ?? null} />
        <SidebarInset className="min-w-0">
          <div className="flex h-svh flex-col">
            <ErrorBoundary>
              <DashboardNavbar />
            </ErrorBoundary>
            <main className="min-h-0 flex-1">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
