"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
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
              Your AI that does things while you sleep.{" "}
              <span className="italic text-[#C0142A]">Securely.</span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl">
              LucyClaw is a 24/7 AI assistant with 1000+ tools via{" "}
              <strong className="text-foreground">OAuth</strong> and{" "}
              <strong className="text-foreground">sandboxed execution</strong>.
              Built on the ideas behind OpenClaw, rebuilt from scratch for
              security.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-lg font-semibold text-foreground underline underline-offset-4 md:text-xl"
            >
              <Zap className="h-5 w-5 text-[#C0142A]" />
              Deploy in seconds.
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                className="h-12 min-h-[44px] w-full bg-[#C0142A] px-8 text-base hover:bg-[#9E1022] sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
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
