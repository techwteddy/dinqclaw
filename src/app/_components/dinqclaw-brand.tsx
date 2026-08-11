"use client";

import Link from "next/link";
import { OpenClawLogo } from "./openclaw-logo";

interface DinqClawBrandProps {
  size?: "sm" | "md" | "lg";
  logoLink?: string;
}

const SIZES = {
  sm: { logo: 20, text: "text-xs", by: "text-[8px]", gap: "gap-1.5" },
  md: { logo: 24, text: "text-lg", by: "text-[9px]", gap: "gap-2" },
  lg: { logo: 48, text: "text-2xl", by: "text-[10px]", gap: "gap-3" },
} as const;

export function DinqClawBrand({ size = "md", logoLink }: DinqClawBrandProps) {
  const s = SIZES[size];

  const logo = <OpenClawLogo size={s.logo} />;

  return (
    <div className={`flex items-center ${s.gap}`}>
      {logoLink ? <Link href={logoLink}>{logo}</Link> : logo}
      <div className="flex flex-col leading-tight">
        <span className={`${s.text} font-bold text-foreground`}>DinqClaw</span>
        <span className={`${s.by} text-muted-foreground`}>by Dinq</span>
      </div>
    </div>
  );
}
