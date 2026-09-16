"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PanelRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ThemeToggle } from "~/components/core/theme-toggle";
import { OpenClawLogo } from "~/app/_components/openclaw-logo";
import { authClient } from "~/clients/auth/react";
import { useTerminalStore } from "./terminal-store";

export function DashboardNavbar() {
  const pathname = usePathname();
  const isChat = pathname === "/dashboard";
  const terminalOpen = useTerminalStore((s) => s.terminalOpen);
  const setTerminalOpen = useTerminalStore((s) => s.setTerminalOpen);
  const router = useRouter();
  const handleToggleTerminal = () => {
    setTerminalOpen(!terminalOpen);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="border-border bg-background/95 grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b px-4 backdrop-blur">
      <div aria-hidden />

      <Link
        href="/dashboard"
        className="flex items-center justify-center gap-1.5"
      >
        <OpenClawLogo size={20} />
        <span className="text-foreground text-xs font-bold">Redat</span>
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
