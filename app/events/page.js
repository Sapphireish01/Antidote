import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllEvents } from "@/lib/data";
import EventsList from "./EventsList";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export const metadata = {
  title: "Upcoming Gatherings & Creative Festivals — Antidote Movement",
  description:
    "Join upcoming Antidote Movement gatherings and creative Christian festivals in London, Manchester, Birmingham, Lagos, Nairobi, and New York. Secure tickets.",
  alternates: {
    canonical: `${SITE_URL}/events`,
  },
};

export default async function EventsPage() {
  const events = await getAllEvents();

  // Generate dynamic Schema.org Event objects for SEO crawler indexation
  const schemaMarkup = events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Antidote Gathering — ${e.city}`,
    "description": e.description,
    "startDate": `${e.date}T19:00:00`,
    "eventAttendanceMode": "https://schema.org/PhysicalEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": e.venue,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": e.address,
        "addressLocality": e.city,
        "addressCountry": e.countryCode,
      },
    },
    "image": e.image,
    "offers": {
      "@type": "Offer",
      "price": e.price.toString(),
      "priceCurrency": e.currency,
      "url": `${SITE_URL}/checkout/tickets?city=${e.id}`,
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main className="w-full">
        {/* Intro */}
        <section className={styles.introSection}>
          <div className={styles.introContainer}>
            <span className={styles.introSubtitle}>PHYSICAL COVENANT</span>
            <h1 className={`${styles.introTitle} font-editorial`}>The Assemblies</h1>
            <p className={styles.introLead}>
              We do not build for screens alone. We convene in historic halls and industrial sanctuaries to slow down, break bread, and share the fruits of our craft.
            </p>
          </div>
        </section>

        {/* Tab List Section (Client Component) */}
        <EventsList initialEvents={events} />

        {/* View Past Gatherings Link */}
        <section className={styles.pastLinkSection}>
          <div className="container">
            <div className={styles.pastLinkCard}>
              <h3 className={`${styles.pastLinkTitle} font-editorial`}>Looking for the Archives?</h3>
              <p className="text-body-md">Reflect on the stories, snapshots, and community impact of our previous chapters.</p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/events/past" className="btn btn-secondary" style={{ minHeight: '44px' }}>
                  View Past Chapters
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
