"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  CheckSquare,
  Lightbulb,
  Target,
  Plug,
} from "lucide-react";

import { cn } from "~/lib/utils";

const NAV_ITEMS = [
  { title: "Chat", url: "/dashboard", icon: MessageCircle },
  { title: "Tasks", url: "/dashboard/tasks", icon: CheckSquare },
  { title: "Ideas", url: "/dashboard/ideas", icon: Lightbulb },
  { title: "Goals", url: "/dashboard/goals", icon: Target },
  { title: "Connect", url: "/dashboard/toolkits", icon: Plug },
] as const;

export function RedatBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      <div className="border-t border-white/10 bg-[#010812]/95 backdrop-blur-md">
        <div className="flex items-center justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.url === "/dashboard"
                ? pathname === item.url
                : pathname === item.url || pathname.startsWith(`${item.url}/`);

            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex min-w-[44px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all",
                  isActive
                    ? "text-[#E8A045]"
                    : "text-white/40 hover:text-white/70",
                )}
              >
                <item.icon
                  className={cn("h-5 w-5 transition-all", isActive && "scale-110")}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium transition-all",
                    isActive ? "opacity-100" : "opacity-70",
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
