import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPastEventById } from "@/lib/data";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export async function generateMetadata({ params }) {
  const { city } = await params;
  const event = await getPastEventById(city);

  if (!event) {
    return {
      title: "Archive Not Found",
      description: "The requested past gathering could not be found.",
    };
  }

  const pageUrl = `${SITE_URL}/events/past/${event.id}`;

  return {
    title: `Antidote Archive — ${event.city} (${event.chapter})`,
    description: event.desc,
    keywords: [
      `Antidote Archive ${event.city}`,
      `Antidote ${event.chapter}`,
      `Past Gathering ${event.city}`,
      `Christian creative community ${event.city}`,
      `Christian creative events ${event.city}`,
      `${event.venue} ${event.city}`,
    ],
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: pageUrl,
      siteName: "Antidote Movement",
      title: `Antidote Archive — ${event.city} (${event.chapter})`,
      description: event.desc,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: `Antidote Past Chapter in ${event.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Antidote Archive — ${event.city} (${event.chapter})`,
      description: event.desc,
      images: [event.image],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function PastEventPage({ params }) {
  const { city } = await params;
  const event = await getPastEventById(city);

  if (!event) {
    return (
      <>
        <Header />
        <main className={styles.errorState}>
          <h1 className={`${styles.errorTitle} font-editorial`}>Archive Not Found</h1>
          <p className={styles.errorText}>
            The past assembly details you are searching for are not cataloged in our historical ledger.
          </p>
          <Link href="/events/past" className="btn btn-primary">
            Back to Archives
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Structured Schema for Completed Event & Breadcrumbs
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `${SITE_URL}/events/past/${event.id}#event`,
        "name": `Antidote Past Chapter — ${event.city} (${event.chapter})`,
        "description": event.desc,
        "startDate": event.date,
        "eventAttendanceMode": "https://schema.org/PhysicalEventAttendanceMode",
        "eventStatus": "https://schema.org/EventCompleted",
        "location": {
          "@type": "Place",
          "name": event.venue,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": event.city,
          },
        },
        "image": event.image,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/events/past/${event.id}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Events",
            "item": `${SITE_URL}/events`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Past Chapters",
            "item": `${SITE_URL}/events/past`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": `${event.city} (${event.chapter})`,
            "item": `${SITE_URL}/events/past/${event.id}`,
          },
        ],
      },
    ],
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
            <Link href="/events/past" className={styles.breadcrumbLink}>
              Past Chapters
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span style={{ color: "var(--color-espresso)" }}>{event.city} ({event.chapter})</span>
          </nav>

          {/* Hero details card */}
          <div className={styles.archiveHero}>
            <div className={styles.imageSection}>
              <img src={event.image} alt={event.city} className={styles.eventImage} />
            </div>

            <div className={styles.infoSection}>
              <div className={styles.headerArea}>
                <span className={styles.chapterTag}>{event.chapter}</span>
                <h1 className={`${styles.archiveTitle} font-editorial`}>
                  Chapter Archive: {event.city}
                </h1>
              </div>

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Gathering Date</span>
                  <span className={styles.metaValue}>{event.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Historic Venue</span>
                  <span className={styles.metaValue}>{event.venue}</span>
                </div>
              </div>

              <div className={styles.descriptionArea}>
                <h2 className={styles.descriptionTitle}>Gathering Summary</h2>
                <p className={styles.descriptionText}>{event.desc}</p>
                
                <div className={styles.impactSection}>
                  <h3 className={styles.impactTitle}>Historical Footprint</h3>
                  <p className={styles.impactValue}>{event.impact}</p>
                </div>
              </div>

              <div>
                <Link href="/events/past" className="btn btn-secondary backBtn">
                  Back to Archives
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
