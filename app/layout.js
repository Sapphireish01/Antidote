import { Libre_Caslon_Text, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-libre-caslon-text",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

// FIX: domain typo corrected from antidotemovementmovement.global
const SITE_URL = "https://antidotemovement.global";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Antidote Movement — Global Christian Creative Gatherings & Editorial Apparel",
    template: "%s — Antidote Movement",
  },
  description:
    "A global spiritual-editorial movement of creative and spiritual seekers, rooted in Europe and expanding worldwide. Join our gatherings, preorder our heavyweight organic garments, and partner to glorify Yahweh.",
  keywords: [
    // Core brand keywords — kept broad/global at root level
    "Antidote Movement",
    "Antidote creative gatherings",
    "global Christian creative community",
    "Christian creative movement",
    // Gatherings & Community — region-neutral here; put city-specific
    // terms (e.g. "Christian creative events Lagos", "...London",
    // "...Berlin") in generateMetadata on each Events/[city] page instead,
    // so no single region dominates the root domain's SEO signal.
    "Christian physical gatherings",
    "Christian creative events",
    "spiritual seekers community",
    "faith-based gatherings",
    // Apparel & Fashion
    "editorial apparel",
    "heavyweight organic garments",
    "Christian streetwear",
    "ethical Christian fashion",
    "organic cotton Christian apparel",
    "preorder Antidote merch",
    // Core themes
    "glorify Yahweh",
    "spiritual editorial movement",
    "creative partnership",
  ],
  authors: [{ name: "Antidote Movement" }],
  creator: "Antidote Movement",
  openGraph: {
    type: "website",
    locale: "en_DE",
    alternateLocale: ["en_DE", "en_US", "en_NG", "en_ZA"],
    url: SITE_URL,
    siteName: "Antidote Movement",
    title: "Antidote Movement — Global Christian Creative Gatherings & Editorial Apparel",
    description:
      "A global spiritual-editorial movement of creative and spiritual seekers, rooted in Europe and expanding worldwide. Join our gatherings, preorder organic garments, and partner to glorify Yahweh.",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Antidote Movement Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antidote Movement",
    description: "A global spiritual-editorial movement of creative and spiritual seekers.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    // ADDED: placeholder for when/if region-specific routes exist.
    // Remove entries you don't actually serve — only declare
    // languages you have real pages for, to avoid duplicate-content issues.
    languages: {
      "en-GB": SITE_URL,
      "en-US": SITE_URL,
      "en-NG": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export const viewport = {
  themeColor: "#3A2E26",
  width: "device-width",
  initialScale: 1,
};

// FIX: removed the single hardcoded NGN Offer block from the root
// Organization schema — a global org shouldn't carry one currency
// at the top level. Put accurate Offer/priceCurrency schema on each
// Product page (merch) and Event page (tickets) instead, where the
// actual currency for that market is known.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Antidote Movement",
  description:
    "A global spiritual-editorial movement of creative and spiritual seekers, rooted in Europe and expanding worldwide. Join our gatherings, preorder our heavyweight organic garments, and partner to glorify Yahweh.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  // ADDED: explicit global signal for Google
  areaServed: "Worldwide",
  inLanguage: "en",
  sameAs: [
    "https://instagram.com/antidote.movement",
    "https://facebook.com/antidote.movement",
    "https://tiktok.com/@antidote.movement",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${libreCaslonText.variable} ${hankenGrotesk.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}