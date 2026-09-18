"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ContainerScroll } from "~/components/ui/container-scroll-animation";
import { ChatMockup } from "../chat-mockup";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4 px-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Your AI that gets things done.{" "}
              <span className="text-[#E8A045]">ረዳት.</span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl">
              Meet Lucy — your personal assistant powered by Redat. She connects
              to your tools, remembers your world, and works on your behalf 24/7.
            </p>
            <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-12 min-h-[44px] w-full bg-[#E8A045] px-8 text-base text-[#010812] hover:bg-[#C8862E] sm:w-auto"
                >
                  Meet Lucy
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 min-h-[44px] w-full border-white/20 bg-transparent px-8 text-base text-foreground hover:bg-white/10 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on Telegram
                </Button>
              </Link>
            </div>
          </div>
        }
      >
        <div className="relative flex h-full min-h-[20rem] w-full items-center justify-center overflow-hidden bg-[#010812] p-4 md:p-8">
          <div className="hero-gradient-mesh pointer-events-none absolute inset-0 opacity-90" />
          <div className="relative z-10 w-full max-w-md scale-[0.92] md:max-w-lg md:scale-100">
            <ChatMockup />
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
