import { Libre_Caslon_Text, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-libre-caslon-text",
  subsets: ["latin"],
  weight: ["400"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://antidotemovement.com"),
  title: {
    default: "Antidote Movement — Christian Creative Gatherings & Editorial Apparel",
    template: "%s — Antidote Movement",
  },
  description: "An elevated spiritual-editorial movement of creative and spiritual seekers. Join our physical gatherings, preorder our heavyweight organic garments, and partner to glorify Yahweh.",
  openGraph: {
    title: "Antidote Movement — Christian Creative Gatherings & Editorial Apparel",
    description: "An elevated spiritual-editorial movement of creative and spiritual seekers.",
    url: "https://antidotemovement.com",
    siteName: "Antidote Movement",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Antidote Movement Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antidote Movement",
    description: "An elevated spiritual-editorial movement of creative and spiritual seekers.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#3A2E26",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${libreCaslonText.variable} ${hankenGrotesk.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
