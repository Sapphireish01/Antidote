import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllPastEvents } from "@/lib/data";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export const metadata = {
  title: "Past Gathering Archives & Impact — Antidote Movement",
  description:
    "Explore the archive of past Antidote Movement gatherings and creative Christian festivals, featuring stories, gallery snapshots, and cultural impact logs.",
  alternates: {
    canonical: `${SITE_URL}/events/past`,
  },
};

export default async function PastEventsPage() {
  const pastEvents = await getAllPastEvents();

  // Breadcrumb schema for SEO indexation
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <span className={styles.heroSubtitle}>HISTORICAL LEDGER</span>
            <h1 className={`${styles.heroTitle} font-editorial`}>The Archives</h1>
            <p className={styles.heroLead}>
              Every gathering leaves a mark. Discover the stories, metrics, and spiritual footprints of our past chapters.
            </p>
          </div>
        </section>

        {/* Archives Grid */}
        <section className={styles.archiveSection}>
          <div className="container">
            <div className={styles.archiveList}>
              {pastEvents.map((item) => (
                <article key={item.id} className={styles.archiveCard}>
                  <div className={styles.cardImageWrapper}>
                    <img
                      className={styles.cardImage}
                      src={item.image}
                      alt={`Past gathering in ${item.city} at ${item.venue}`}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.chapterTag}>{item.chapter}</span>
                      <span className={styles.dateTag}>{item.date}</span>
                    </div>

                    <h2 className={`${styles.cardTitle} font-editorial`}>
                      <Link href={`/events/past/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.city} — {item.venue}
                      </Link>
                    </h2>
                    <span className={styles.impactBadge}>{item.impact}</span>
                    <p className={styles.cardDesc}>{item.desc}</p>
                    
                    <div style={{ marginTop: '20px' }}>
                      <Link href={`/events/past/${item.id}`} className="btn btn-secondary" style={{ display: 'inline-flex', padding: '8px 16px', fontSize: '12px' }}>
                        View Archive details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section to future events */}
        <section className={styles.backCta}>
          <div className="container">
            <h2 className={`${styles.ctaTitle} font-editorial`}>The Story Continues</h2>
            <p className="text-body-md" style={{ color: "rgba(58, 46, 38, 0.7)" }}>
              Join us for the next chapter in your nearest city.
            </p>
            <div style={{ marginTop: "32px" }}>
              <Link href="/events" className="btn btn-primary" style={{ minHeight: "44px" }}>
                View Upcoming Gatherings
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
