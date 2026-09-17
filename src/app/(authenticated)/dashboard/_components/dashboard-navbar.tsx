"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, PanelRight } from "lucide-react";
import { trpc } from "~/clients/trpc";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useSidebar } from "~/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ThemeToggle } from "~/components/core/theme-toggle";
import { authClient } from "~/clients/auth/react";
import { useTerminalStore } from "./terminal-store";

const DEFAULT_AGENT_NAME = "Lucy";

export function DashboardNavbar() {
  const pathname = usePathname();
  const isChat = pathname === "/dashboard";
  const terminalOpen = useTerminalStore((s) => s.terminalOpen);
  const setTerminalOpen = useTerminalStore((s) => s.setTerminalOpen);
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const { data, isLoading } = trpc.trustclaw.getInstance.useQuery();
  const agentName = data?.onboardingState?.name?.trim() ?? DEFAULT_AGENT_NAME;
  const agentInitial = (agentName[0] ?? DEFAULT_AGENT_NAME[0]!).toUpperCase();

  const handleToggleTerminal = () => {
    setTerminalOpen(!terminalOpen);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="border-border bg-background/95 grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b px-4 backdrop-blur">
      <div className="flex items-center justify-start">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>

      <Link
        href="/dashboard"
        className="flex flex-col items-center justify-center gap-0.5"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-[#E8A045] text-xs font-bold text-[#010812]">
          {agentInitial}
        </span>
        {isLoading ? (
          <Skeleton className="h-3 w-12" />
        ) : (
          <span className="text-foreground text-[11px] leading-none font-medium">
            {agentName}
          </span>
        )}
      </Link>

      <div className="flex items-center justify-end gap-1">
        {isChat && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`hidden h-9 w-9 md:inline-flex ${terminalOpen ? "bg-accent" : ""}`}
                onClick={handleToggleTerminal}
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {terminalOpen ? "Hide" : "Show"} Terminal
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <ThemeToggle />
          </TooltipTrigger>
          <TooltipContent>Toggle theme</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => handleLogout()}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
