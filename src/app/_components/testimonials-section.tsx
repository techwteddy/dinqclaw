import Image from "next/image";
import { MessageCircle, Repeat2, Heart, BarChart2 } from "lucide-react";
import { AnimateOnView } from "~/components/core/animate-on-view";

interface Tweet {
  displayName: string;
  handle: string;
  avatar: string;
  body: string;
  replies: number;
  retweets: number;
  likes: number;
  views: string;
  timestamp: string;
}

const TWEETS: Tweet[] = [
  {
    displayName: "Sara",
    handle: "@sarafromdc",
    avatar: "/images/testimonials/sarah.jpg",
    body: "finally an AI assistant that remembers I speak Amharic with my mom and English at work. Lucy just gets it. ረዳት for real.",
    replies: 14,
    retweets: 87,
    likes: 342,
    views: "12.4K",
    timestamp: "3:42 PM · Feb 8, 2026",
  },
  {
    displayName: "Palash Kala",
    handle: "@kalapolish",
    avatar: "/images/testimonials/palash.jpg",
    body: "Set up Redat in like 5 minutes. Connected Gmail and Calendar, then messaged Lucy on Telegram from the bus. She drafted my follow-ups before I got home.",
    replies: 7,
    retweets: 28,
    likes: 189,
    views: "3.2K",
    timestamp: "9:15 AM · Feb 10, 2026",
  },
  {
    displayName: "Soham",
    handle: "@GanatraSoham",
    avatar: "/images/testimonials/soham.jpg",
    body: "generic chatbots answer questions. Lucy books the meeting, finds the forgotten subscription, and briefs me every morning. different category entirely.",
    replies: 34,
    retweets: 93,
    likes: 412,
    views: "11.3K",
    timestamp: "11:30 AM · Feb 11, 2026",
  },
  {
    displayName: "Karan Vaidya",
    handle: "@KaranVaidya6",
    avatar: "/images/testimonials/karan.jpg",
    body: "Redat = Muse vibes but with OAuth, Telegram, and an AI that actually knows diaspora life. Built by Dinq. Powered by Lucy. I'm in.",
    replies: 31,
    retweets: 156,
    likes: 847,
    views: "38.2K",
    timestamp: "2:08 PM · Feb 12, 2026",
  },
];

function TweetCard({ tweet, index }: { tweet: Tweet; index: number }) {
  return (
    <AnimateOnView
      className="border-border bg-card rounded-xl border p-4"
      delay={index * 0.1}
      margin="-60px"
    >
      <div className="flex items-center gap-2.5">
        <Image
          src={tweet.avatar}
          alt={tweet.displayName}
          width={40}
          height={40}
          loading="lazy"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="text-foreground text-sm font-bold">
            {tweet.displayName}
          </div>
          <div className="text-muted-foreground text-sm">{tweet.handle}</div>
        </div>
      </div>

      <p className="text-foreground mt-3 text-sm leading-relaxed">
        {tweet.body}
      </p>

      <div className="text-muted-foreground/60 mt-3 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <MessageCircle className="h-3.5 w-3.5" />
          {tweet.replies}
        </span>
        <span className="flex items-center gap-1">
          <Repeat2 className="h-3.5 w-3.5" />
          {tweet.retweets}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-3.5 w-3.5" />
          {tweet.likes}
        </span>
        <span className="flex items-center gap-1">
          <BarChart2 className="h-3.5 w-3.5" />
          {tweet.views}
        </span>
      </div>

      <div className="text-muted-foreground mt-2 text-xs">
        {tweet.timestamp}
      </div>
    </AnimateOnView>
  );
}

export function TestimonialsSection() {
  return (
    <section className="border-border relative overflow-hidden border-t px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            Built from the motherland. Used everywhere.
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TWEETS.map((tweet, index) => (
            <TweetCard key={tweet.handle} tweet={tweet} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
