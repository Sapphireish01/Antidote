import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPastEventById, getAllPastEvents } from "@/lib/data";
import EventGallery from "./EventGallery";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export async function generateMetadata({ params }) {
  const { city } = await params;
  const event = await getPastEventById(city);

  if (!event) {
    return {
      title: "Archive Not Found — Antidote Movement",
      description: "The requested past gathering archive could not be found.",
    };
  }

  const pageUrl = `${SITE_URL}/events/past/${event.id}`;

  return {
    title: `${event.title} — Antidote Archives`,
    description: `Photo archives from ${event.title} featuring ${event.artist}.`,
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: pageUrl,
      siteName: "Antidote Movement",
      title: `${event.title} — Antidote Archives`,
      description: `Photo archives from ${event.title} featuring ${event.artist}.`,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: `Photo archives from ${event.title} featuring ${event.artist}.`,
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
  const allPastEvents = await getAllPastEvents();

  if (!event) {
    return (
      <>
        <Header />
        <main className={styles.errorState}>
          <h1 className={`${styles.errorTitle} font-editorial`}>Archive Not Found</h1>
          <p className={styles.errorText}>
            The past archive you are searching for is not in our ledger.
          </p>
          <Link href="/events/past" className="btn btn-primary">
            Back to Archives
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const otherEvents = allPastEvents.filter((e) => e.id !== event.id);

  return (
    <>
      <Header />

      <main className={styles.detailsPage}>
        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/events/past" className={styles.breadcrumbLink}>
              Past Chapters
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span style={{ color: "var(--color-espresso)", fontWeight: 600 }}>{event.title}</span>
          </nav>

          {/* Hero details card */}
          <div className={styles.archiveHero}>
            <div className={styles.imageSection}>
              <img src={event.image} alt={event.title} className={styles.eventImage} />
            </div>

            <div className={styles.infoSection}>
              <div className={styles.headerArea}>
                <div className={styles.badgeRow}>
                  <span className={styles.chapterTag}>{event.chapter}</span>
                  {event.artist && <span className={styles.artistBadge}>{event.artist}</span>}
                </div>
                <h1 className={`${styles.archiveTitle} font-editorial`}>
                  {event.title}
                </h1>
              </div>

              <div className={styles.photoCountInfo}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "var(--color-bronze)" }}>
                  photo_camera
                </span>
                <span>{event.images?.length || 0} Captured Photographs</span>
              </div>

              <div className={styles.actionsRow}>
                <Link href="/events/past" className="btn btn-secondary">
                  Back to Archives
                </Link>
                <Link href="/gallery" className="btn btn-primary">
                  View Full Gallery
                </Link>
              </div>
            </div>
          </div>

          {/* Full Event Photo Gallery Section */}
          <EventGallery
            images={event.images}
            title={event.title}
            artist={event.artist}
            chapter={event.chapter}
          />

          {/* More Past Chapters Navigator */}
          {otherEvents.length > 0 && (
            <section className={styles.otherChaptersSection}>
              <h2 className={`${styles.otherTitle} font-editorial`}>Explore More Archives</h2>
              <div className={styles.otherGrid}>
                {otherEvents.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/events/past/${item.id}`}
                    className={styles.otherCard}
                  >
                    <div className={styles.otherImgWrap}>
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                    <div className={styles.otherContent}>
                      <span className={styles.otherChapter}>{item.chapter}</span>
                      <h3 className={styles.otherCardTitle}>{item.title}</h3>
                      <p className={styles.otherPhotos}>{item.images?.length || 0} Photos</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
