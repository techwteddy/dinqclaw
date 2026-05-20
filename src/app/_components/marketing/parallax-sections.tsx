"use client";

import Image from "next/image";
import { Clock, Cloud, Shield, Zap } from "lucide-react";
import { TextParallaxContent } from "./text-parallax-content";
import { ParallaxContentBody } from "./parallax-content-body";

const MESSAGING_PLATFORMS = [
  { name: "Telegram", slug: "telegram", live: true },
  { name: "WhatsApp", slug: "whatsapp", live: false },
  { name: "Discord", slug: "discord", live: false },
  { name: "Slack", slug: "slack", live: false },
] as const;

export function ParallaxSections() {
  return (
    <div className="bg-[#010812]">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=2574&auto=format&fit=crop"
        subheading="Chat Anywhere"
        heading="Your AI on every platform."
      >
        <ParallaxContentBody title="Every Messaging App">
          <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
            Chat with your AI on Telegram, WhatsApp, Discord, or Slack. Same
            agent, same tools, wherever you are.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {MESSAGING_PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl${platform.live ? "" : " opacity-50"}`}
              >
                <Image
                  src={`/images/logos/${platform.slug}.svg`}
                  alt=""
                  aria-hidden
                  width={20}
                  height={20}
                />
                <span className="text-foreground text-sm font-medium">
                  {platform.name}
                  {!platform.live && (
                    <span className="text-muted-foreground ml-1 text-xs">
                      Soon
                    </span>
                  )}
                  {platform.live && (
                    <span className="ml-1 text-xs text-[#6C5CE7]">Live</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </ParallaxContentBody>
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2644&auto=format&fit=crop"
        subheading="Autopilot"
        heading="Works while you sleep."
      >
        <ParallaxContentBody title="Works While You Sleep">
          <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
            Schedule tasks, set cron jobs, and get morning briefings — your agent
            handles recurring work on autopilot while you rest.
          </p>
          <ul className="space-y-3">
            {[
              {
                icon: Clock,
                text: "Schedule tasks and recurring check-ins with natural-language cron.",
              },
              {
                icon: Zap,
                text: "Morning briefings and status updates delivered when you wake up.",
              },
              {
                icon: Cloud,
                text: "Agent runs in the cloud — no laptop left open overnight.",
              },
            ].map((item) => (
              <li
                key={item.text}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#6C5CE7]" />
                <span className="text-muted-foreground text-sm md:text-base">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </ParallaxContentBody>
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop"
        subheading="Security First"
        heading="Zero Setup. Full Power."
      >
        <ParallaxContentBody title="OAuth Only · Sandboxed Execution">
          <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
            Connects through OAuth — no passwords stored or shared. Every action
            runs in an isolated cloud environment that&apos;s gone when the task
            is done.
          </p>
          <ul className="space-y-3">
            {[
              {
                icon: Shield,
                title: "OAuth Only",
                text: "No passwords stored. Encrypted credentials with one-click revocation.",
              },
              {
                icon: Zap,
                title: "Zero Setup",
                text: "Sign up, chat, done. No API keys or config files.",
              },
              {
                icon: Cloud,
                title: "Sandboxed Execution",
                text: "Isolated cloud runs — nothing executes on your local machine.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                <div className="mb-1 flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-[#6C5CE7]" />
                  <span className="text-foreground font-semibold">
                    {item.title}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </ParallaxContentBody>
      </TextParallaxContent>
    </div>
  );
}
