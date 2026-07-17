import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getEventById } from "@/lib/data";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export async function generateMetadata({ params }) {
  const { city } = await params;
  const event = await getEventById(city);

  if (!event) {
    return {
      title: "Gathering Not Found",
      description: "The requested active event could not be found.",
    };
  }

  const pageUrl = `${SITE_URL}/events/${event.id}`;

  return {
    title: `Antidote Gathering — ${event.city}`,
    description: event.description,
    keywords: [
      `Antidote Gathering ${event.city}`,
      `Christian creative events ${event.city}`,
      `Christian creative gatherings ${event.city}`,
      `${event.venue} ${event.city}`,
      `Antidote ${event.city}`,
      "faith-based gatherings",
      "Christian creative community",
    ],
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: pageUrl,
      siteName: "Antidote Movement",
      title: `Antidote Gathering — ${event.city}`,
      description: event.description,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: `Antidote Gathering in ${event.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Antidote Gathering — ${event.city}`,
      description: event.description,
      images: [event.image],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function EventPage({ params }) {
  const { city } = await params;
  const event = await getEventById(city);

  if (!event) {
    return (
      <>
        <Header />
        <main className={styles.errorState}>
          <h1 className={`${styles.errorTitle} font-editorial`}>Assembly Not Found</h1>
          <p className={styles.errorText}>
            The gathering you are looking for does not exist or has been archived. Check our active ledger for scheduled assemblies.
          </p>
          <Link href="/events" className="btn btn-primary">
            Back to Assemblies
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Structured Schema for Event
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Antidote Gathering — ${event.city}`,
    "description": event.description,
    "startDate": `${event.date}T19:00:00`,
    "eventAttendanceMode": "https://schema.org/PhysicalEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.address,
        "addressLocality": event.city,
        "addressCountry": event.countryCode,
      },
    },
    "image": event.image,
    "offers": {
      "@type": "Offer",
      "price": event.price.toString(),
      "priceCurrency": event.currency,
      "url": `${SITE_URL}/checkout/tickets?city=${event.id}`,
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main className={styles.detailsPage}>
        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/events" className={styles.breadcrumbLink}>
              Events
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span style={{ color: "var(--color-espresso)" }}>{event.city}</span>
          </nav>

          {/* Hero details card */}
          <div className={styles.eventHero}>
            <div className={styles.imageSection}>
              <img src={event.image} alt={event.city} className={styles.eventImage} />
            </div>

            <div className={styles.infoSection}>
              <div className={styles.headerArea}>
                <span className={styles.regionTag}>{event.region.replace("-", " ")}</span>
                <h1 className={`${styles.eventTitle} font-editorial`}>
                  Antidote Gathering — {event.city}
                </h1>
              </div>

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Date & Time</span>
                  <span className={styles.metaValue}>{event.dateDisplay} at 7:00 PM</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Venue</span>
                  <span className={styles.metaValue}>{event.venue}</span>
                </div>
                <div className={styles.metaItem} style={{ gridColumn: "1 / -1" }}>
                  <span className={styles.metaLabel}>Address</span>
                  <span className={styles.metaValue}>{event.address}</span>
                </div>
              </div>

              <div className={styles.descriptionArea}>
                <h2 className={styles.descriptionTitle}>About the Assembly</h2>
                <p className={styles.descriptionText}>{event.description}</p>
              </div>

              <div className={styles.actionArea}>
                <div className={styles.priceDisplay}>
                  <span className={styles.priceLabel}>Ticket Price</span>
                  <span className={styles.priceAmount}>
                    {event.currencySymbol}
                    {event.price} {event.currency}
                  </span>
                </div>
                <Link href={`/checkout/tickets?city=${event.id}`} className="btn btn-primary ticketBtn">
                  Acquire Ticket
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
