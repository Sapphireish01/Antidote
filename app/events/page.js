import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllPastEvents } from "@/lib/data";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export const metadata = {
  title: "Gatherings & Creative Archives — Antidote Movement",
  description:
    "Explore Antidote Movement gatherings, tours, and nights of worship featuring Travis Greene, Dr Prinz, Smith, Young & Chosen, and the Antidote Tribe.",
  alternates: {
    canonical: `${SITE_URL}/events`,
  },
};

export default async function EventsPage() {
  const events = await getAllPastEvents();

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gatherings & Archives",
        item: `${SITE_URL}/events`,
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
            <span className={styles.heroSubtitle}>HISTORICAL LEDGER & CHRONICLES</span>
            <h1 className={`${styles.heroTitle} font-editorial`}>Gatherings & Archives</h1>
            <p className={styles.heroLead}>
              Moments captured across our chapters, concerts, and worship assemblies — glorifying Yahweh through the performing arts.
            </p>
            <div className={styles.quickNav}>
              <Link href="/gallery" className="btn btn-secondary" style={{ fontSize: "13px", padding: "10px 20px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>photo_library</span>
                Explore Full Photo Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Gatherings Grid */}
        <section className={styles.archiveSection}>
          <div className="container">
            <div className={styles.archiveList}>
              {events.map((item) => (
                <article key={item.id} className={styles.archiveCard}>
                  <div className={styles.cardImageWrapper}>
                    <img
                      className={styles.cardImage}
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className={styles.imageOverlayBadge}>
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>photo_camera</span>
                      <span>{item.images?.length || 0} Photos</span>
                    </div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.tagGroup}>
                        <span className={styles.chapterTag}>{item.chapter}</span>
                        {item.artist && <span className={styles.artistTag}>{item.artist}</span>}
                      </div>
                    </div>

                    <h2 className={`${styles.cardTitle} font-editorial`}>
                      <Link href={`/events/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {item.title}
                      </Link>
                    </h2>

                    {/* Thumbnail Strip */}
                    {item.images && item.images.length > 0 && (
                      <div className={styles.thumbStrip}>
                        {item.images.slice(0, 5).map((thumb, idx) => (
                          <div key={idx} className={styles.thumbItem}>
                            <img src={thumb} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
                          </div>
                        ))}
                        {item.images.length > 5 && (
                          <div className={styles.thumbMore}>
                            +{item.images.length - 5}
                          </div>
                        )}
                      </div>
                    )}

                    <div className={styles.cardActions}>
                      <Link href={`/events/${item.id}`} className="btn btn-primary" style={{ display: "inline-flex", padding: "10px 20px", fontSize: "13px" }}>
                        View Photo Gallery ({item.images?.length || 0})
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.backCta}>
          <div className="container">
            <h2 className={`${styles.ctaTitle} font-editorial`}>The Journey Continues</h2>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/gallery" className="btn btn-primary" style={{ minHeight: "44px" }}>
                Browse Full Gallery
              </Link>
              <Link href="/partnership" className="btn btn-secondary" style={{ minHeight: "44px" }}>
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
