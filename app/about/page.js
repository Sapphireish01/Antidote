"use client";

import AboutHero from "@/components/AboutHero";
import ResonanceNetwork from "@/components/ResonanceNetwork";
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
    "slogan": "The cure the world needs",
    "description": "Spreading the love of God and the consciousness of His light in a dark world through creative arts. Creating spaces and platforms where Christian creatives use their gifts to glorify Yahweh.",
    "sameAs": [
      "https://instagram.com/antidote.movement"
    ]
  };

  return (
    <>
      <head>
        <title>About the Movement, Vision & Mission — Antidote Movement</title>
        <meta
          name="description"
          content="Antidote Movement — The cure the world needs. Spreading the love of God and the consciousness of His light in a dark world through creative arts. Learn about our vision, mission, and goals."
        />
        <link rel="canonical" href="https://antidotemovement.com/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <Header />

      <main className="w-full">
        {/* Living Crosses & Worshipping Figures Hero Section */}
        <AboutHero />

        {/* Vision, Mission & Goals Grid */}
        <section id="foundations-section" className={styles.philosophySection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="text-label-md">Core Foundations</span>
              <h2 className="text-headline-lg font-editorial">Vision, Mission & Goals</h2>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <h3 className={`${styles.pillarTitle} font-editorial`}>Our Vision</h3>
                <p className="text-body-md">
                  Creating spaces where God will be glorified through the performing arts. We build uplifting environments where sound, movement, word, and imagery reflect the majesty of our Creator.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <h3 className={`${styles.pillarTitle} font-editorial`}>Our Mission</h3>
                <p className="text-body-md">
                  Create platforms where Christian creatives can use their gifts to glorify Yahweh. Taking one city at a time and building a vibrant community — a global Tribe of creatives.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <h3 className={`${styles.pillarTitle} font-editorial`}>Our Goals</h3>
                <p className="text-body-md">
                  • Facilitate the creation of godly and clean content for the world.<br /><br />
                  • Organise godly gatherings to engage people in authentic community.<br /><br />
                  • Organise tours for Christian creatives to bring God's light city by city.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Legacy Section: Full-Bleed Resonance Network */}
        <ResonanceNetwork />

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className="container">
            <h2 className={`${styles.ctaTitle} font-editorial`}>Join the Tribe</h2>
            <p className="text-body-lg">Experience our gatherings, wear the vision, or partner with us to fuel the movement.</p>
            <div className={styles.ctaButtons}>
              <Link href="/events" className="btn btn-primary">
                Explore Gatherings
              </Link>
              <Link href="/partnership" className="btn btn-secondary">
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
