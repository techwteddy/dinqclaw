"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ExternalLink,
  Home,
  MessageCircle,
  Puzzle,
  Settings,
  ListTodo,
} from "lucide-react";

import { cn } from "~/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "~/components/ui/sidebar";

const NAV_ITEMS = [
  { title: "Home", url: "/dashboard", icon: Home, exact: true },
  { title: "Chat", url: "/dashboard", icon: MessageCircle, exact: true },
  { title: "Tasks", url: "/dashboard/tasks", icon: ListTodo },
  { title: "Activity", url: "/dashboard/activity", icon: Activity },
  { title: "Connections", url: "/dashboard/toolkits", icon: Puzzle },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
] as const;

const DINQPLUS_URL = "https://dinqplus.app";

interface DinqClawSidebarProps {
  dinqId: string | null;
}

export function DinqClawSidebar({ dinqId }: DinqClawSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-[#E8A045] text-[#010812]">
                <span className="text-sm font-bold">D</span>
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold tracking-tight">
                  DinqClaw
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  by Dinq
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overscroll-contain">
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => (
              <NavEntry key={item.title} item={item} pathname={pathname} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-1 rounded-md px-2 py-1.5 group-data-[collapsible=icon]:hidden">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Dinq ID
              </span>
              <span className="truncate font-mono text-xs text-[#E8A045]">
                {dinqId ?? "Not assigned"}
              </span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Open DinqPlus"
              className="text-[#E8A045] hover:bg-[#E8A045]/10 hover:text-[#E8A045]"
            >
              <a
                href={DINQPLUS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" />
                <span>Open DinqPlus</span>
                <span className="ml-auto text-xs opacity-70">↗</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function NavEntry({
  item,
  pathname,
}: {
  item: (typeof NAV_ITEMS)[number];
  pathname: string;
}) {
  const { setOpenMobile } = useSidebar();
  const closeMobile = () => setOpenMobile(false);

  const active =
    "exact" in item && item.exact
      ? pathname === item.url
      : pathname === item.url || pathname.startsWith(`${item.url}/`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={item.title}
        className={cn(
          active &&
            "data-active:bg-[#E8A045]/15 data-active:text-[#E8A045]",
        )}
      >
        <Link href={item.url} onClick={closeMobile}>
          <item.icon className="size-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
