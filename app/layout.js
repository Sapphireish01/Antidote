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
    default: "Antidote Movement — The Cure The World Needs | Christian Creative Gatherings & Arts",
    template: "%s — Antidote Movement",
  },
  description:
    "Antidote Movement — The cure the world needs. Spreading the love of God and the consciousness of His light in a dark world through creative arts. Creating spaces and platforms where Christian creatives glorify Yahweh.",
  keywords: [
    // Core brand keywords — kept broad/global at root level
    "Antidote Movement",
    "The cure the world needs",
    "Christian creative movement",
    "Christian creative gatherings",
    "Christian performing arts",
    "Tribe of creatives",
    "Godly and clean content",
    "Christian creative tours",
    // Gatherings & Community
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
    title: "Antidote Movement — The Cure The World Needs | Christian Creative Gatherings & Arts",
    description:
      "Spreading the love of God and the consciousness of His light in a dark world through creative arts. Creating platforms where Christian creatives use their gifts to glorify Yahweh.",
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
    title: "Antidote Movement — The Cure The World Needs",
    description: "Spreading the love of God and the consciousness of His light in a dark world through creative arts.",
    images: ["/logo.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Antidote Movement",
  slogan: "The cure the world needs",
  description:
    "Spreading the love of God and the consciousness of His light in a dark world through creative arts. Creating platforms where Christian creatives can use their gifts to glorify Yahweh.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
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