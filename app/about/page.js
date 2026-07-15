"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Antidote Movement",
    "url": "https://antidotemovement.com",
    "logo": "https://antidotemovement.com/logo.png",
    "description": "An elevated spiritual-editorial movement of creative and spiritual seekers glorifying Yahweh through art, design, and gathering.",
    "sameAs": [
      "https://instagram.com/antidote.movement"
    ]
  };

  return (
    <>
      <head>
        <title>About the Tribe — Antidote Movement</title>
        <meta 
          name="description" 
          content="Discover the heartbeat of Antidote Movement—an elevated spiritual-editorial movement of creative and spiritual seekers glorifying Yahweh through design, art, and gathering." 
        />
        <link rel="canonical" href="https://antidotemovement.com/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <Header />

      <main className="w-full">
        {/* Editorial Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <span className={styles.heroSubtitle}>OUR IDENTITY</span>
            <h1 className={`${styles.heroTitle} font-editorial`}>The Quiet Cure</h1>
            <p className={`${styles.heroLead} text-body-lg`}>
              Antidote Movement exists to cultivate a sanctuary for creative expression that honors the Creator. In a world defined by noise and distraction, we choose silence, craft, and reverence.
            </p>
          </div>
        </section>

        {/* Philosophy Grid */}
        <section className={styles.philosophySection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="text-label-md">The Pillars</span>
              <h2 className="text-headline-lg font-editorial">Our Sacred Stance</h2>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <h3 className={`${styles.pillarTitle} font-editorial`}>I. Glorifying Yahweh</h3>
                <p className="text-body-md">
                  We believe that the capacity to create is a divine reflection. Every line drawn, garment stitched, and note played is an act of communion and devotion to the Lord.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <h3 className={`${styles.pillarTitle} font-editorial`}>II. Uncompromised Craft</h3>
                <p className="text-body-md">
                  We reject the disposable culture. From heavy 500GSM organic cotton fibers to intentional typographic hierarchies, our work is crafted to endure and inspire.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <h3 className={`${styles.pillarTitle} font-editorial`}>III. The Gathered Tribe</h3>
                <p className="text-body-md">
                  We gather in physical spaces to slow down, share tables, and participate in collective resonance. Community is the antidote to the isolated digital self.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Legacy Section */}
        <section className={styles.storySection}>
          <div className="container">
            <div className={styles.storyLayout}>
              <div className={styles.storyText}>
                <h2 className={`${styles.storyTitle} font-editorial`}>The Chronicle</h2>
                <p className="text-body-md">
                  Founded in London in 2023, Antidote Movement began as a small gathering of designers, poets, and musicians seeking depth in an age of superficiality. We recognized that the modern creative engine is often driven by performance, ego, and haste.
                </p>
                <p className="text-body-md">
                  We sought a different rhythm—one that values silence, craftsmanship, and spiritual alignment. Over the past year, we have expanded our city gatherings across the UK, Europe, and now Africa and North America, creating local ecosystems of creators who support each other's development.
                </p>
                <p className="text-body-md">
                  Through our limited edition preorder garments, physical assemblies, and stewardship partnerships, we fund and develop spaces where creatives can use their talents to renew culture.
                </p>
              </div>
              <div className={styles.storyImageWrapper}>
                <img 
                  className={styles.storyImage} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4GG3IDDQeZzwF17E4CHHtVJjmGHz5_lYIARz_s-Eek3norXZBxYyBLP3FW1-mXIcnzIXgfwD2QkXswBXgHwP2EXKICRJ6JGucn-Ll2kWwO4Mc09XxFmXxB7ZW3kTSLmGSUKvE4HPbeyfaksJwWR_gVGjz9rPlAj3W5qfWusmIemF1Igfk7FTEKqaa_xdlIhy3C7izDokdyxeqQsBS5PNbERuN5BgF_S3rQKWP5ke-Ef8l30vamk8" 
                  alt="Antidote creative study session" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className="container">
            <h2 className={`${styles.ctaTitle} font-editorial`}>Participate in the Rhythms</h2>
            <p className="text-body-lg">Whether by attending a gathering, acquiring our craft, or supporting the ledger.</p>
            <div className={styles.ctaButtons}>
              <Link href="/events" className="btn btn-primary">
                Explore Gatherings
              </Link>
              <Link href="/partnership" className="btn btn-secondary">
                Support the Mission
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
