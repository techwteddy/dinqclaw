"use client";

import type { ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

interface ParallaxContentBodyProps {
  title: string;
  children: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}

export function ParallaxContentBody({
  title,
  children,
  ctaHref = "/login",
  ctaLabel = "Get Started",
}: ParallaxContentBodyProps) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-2xl font-bold text-foreground md:col-span-4 md:text-3xl">
        {title}
      </h2>
      <div className="col-span-1 space-y-6 md:col-span-8">{children}</div>
      <div className="col-span-1 md:col-span-12">
        <Link
          href={ctaHref}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-[#6C5CE7] px-9 py-4 text-base font-semibold text-white transition-colors hover:bg-[#5a4bd6] md:w-fit"
        >
          {ctaLabel}
          <FiArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
