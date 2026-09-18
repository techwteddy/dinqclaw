"use client";

import { Brain, Clock, Globe, Layers, type LucideIcon } from "lucide-react";
import { TextParallaxContent } from "./text-parallax-content";
import { ParallaxContentBody } from "./parallax-content-body";

interface FeatureBlock {
  imgUrl: string;
  subheading: string;
  heading: string;
  title: string;
  description: string;
  points: { icon: LucideIcon; text: string }[];
}

const FEATURES: FeatureBlock[] = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2670&auto=format&fit=crop",
    subheading: "Memory",
    heading: "Lucy never forgets.",
    title: "Lucy never forgets",
    description:
      "Persistent memory across all your conversations — on the web and on Telegram. Lucy remembers your world so you don't have to repeat yourself.",
    points: [
      {
        icon: Brain,
        text: "Vector memory that grows with every chat, goal, and task.",
      },
      {
        icon: Layers,
        text: "Context carries across sessions — pick up right where you left off.",
      },
    ],
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop",
    subheading: "Connections",
    heading: "Connected to everything.",
    title: "Connected to everything",
    description:
      "1,000+ apps via secure OAuth. Gmail, calendars, Notion, and more — Lucy takes real actions on your behalf.",
    points: [
      {
        icon: Layers,
        text: "One-click OAuth — no passwords stored or shared.",
      },
      {
        icon: Clock,
        text: "Weyala routes Lucy to the right tool at the right time.",
      },
    ],
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2644&auto=format&fit=crop",
    subheading: "Autopilot",
    heading: "Works while you sleep.",
    title: "Works while you sleep",
    description:
      "Scheduled tasks and cron jobs keep Lucy working overnight. Morning briefings, reminders, and follow-ups — delivered when you wake up.",
    points: [
      {
        icon: Clock,
        text: "Natural-language schedules and recurring check-ins.",
      },
      {
        icon: Brain,
        text: "Runs in the cloud — no laptop left open overnight.",
      },
    ],
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop",
    subheading: "Your world",
    heading: "Your language, your world.",
    title: "Your language, your world",
    description:
      "Built from the motherland, used everywhere. Supports Amharic, English, and 12 other languages — an AI that understands your world.",
    points: [
      {
        icon: Globe,
        text: "Amharic (አማርኛ) and English first-class, plus 12 more languages.",
      },
      {
        icon: Brain,
        text: "Named for Lucy (Dinkinesh) — origin of humanity — and powered by Dinq.",
      },
    ],
  },
];

export function ParallaxSections() {
  return (
    <div className="bg-[#010812]">
      {FEATURES.map((feature) => (
        <TextParallaxContent
          key={feature.title}
          imgUrl={feature.imgUrl}
          subheading={feature.subheading}
          heading={feature.heading}
        >
          <ParallaxContentBody title={feature.title} ctaLabel="Meet Lucy">
            <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
              {feature.description}
            </p>
            <ul className="space-y-3">
              {feature.points.map((item) => (
                <li
                  key={item.text}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A045]" />
                  <span className="text-muted-foreground text-sm md:text-base">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </ParallaxContentBody>
        </TextParallaxContent>
      ))}
    </div>
  );
}
