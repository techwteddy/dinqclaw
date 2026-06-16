"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "~/components/core/theme-toggle";
import { DinqClawBrand } from "./dinqclaw-brand";

export function LandingNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#010812]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <DinqClawBrand size="md" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button size="sm" className="bg-[#E8A045] hover:bg-[#C8862E]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
