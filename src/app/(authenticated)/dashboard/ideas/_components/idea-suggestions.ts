import {
  CalendarHeart,
  CreditCard,
  Search,
  Unlink,
  Zap,
} from "lucide-react";

export const IDEA_SUGGESTIONS = [
  {
    title: "Break a habit",
    description:
      "Name a habit you want to break. Lucy will nudge you before your trigger.",
    icon: Unlink,
    prompt:
      "I want to break a habit. Help me name the trigger and nudge me before it happens.",
  },
  {
    title: "Find forgotten subscriptions",
    description:
      "Connect your inbox and Lucy combs billing emails for subscriptions you forgot about.",
    icon: CreditCard,
    prompt:
      "Comb through my billing emails and list any subscriptions I might have forgotten about.",
  },
  {
    title: "Reconnect with someone",
    description:
      "Name people you keep meaning to see. Lucy finds calendar windows and drafts an invite.",
    icon: CalendarHeart,
    prompt:
      "There are people I keep meaning to see. Find open windows on my calendar and draft an invite.",
  },
  {
    title: "Research anything",
    description:
      "Give Lucy a topic. She researches, summarizes, and sends it to Telegram.",
    icon: Search,
    prompt:
      "Research a topic for me, summarize what you find, and send it to me on Telegram.",
  },
  {
    title: "Automate your morning",
    description:
      "Tell Lucy your morning routine. She'll brief you every day via Telegram.",
    icon: Zap,
    prompt:
      "Here's my morning routine — set up a daily brief and send it to me on Telegram.",
  },
] as const;
