import { LandingPage } from "./_components/landing-page";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DinqClaw",
  description:
    "Your 24/7 AI assistant with 1000+ integrations via OAuth and sandboxed execution.",
  applicationCategory: "Productivity",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "Dinq",
  },
};

export default async function Page() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <LandingPage />
    </>
  );
}
