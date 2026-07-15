"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const PAST_EVENTS = [
  {
    id: "paris-2024",
    city: "Paris",
    chapter: "Chapter V",
    venue: "L'Atelier des Halles",
    date: "August 24, 2024",
    impact: "120 Seekers • 3 Live Installations",
    desc: "A summer assembly in Paris. Our first cross-channel gathering centered on physical sculpture and liturgical design. Three collaborative canvas pieces were developed during the worship set.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsfQ3ZCQBtO2DAe_WZxOLseIs8C9wDlRMvWjLoIeDehuiNvQRn7c3BbtsOflRk5KDkho_xzzr4ZbBUYYnsobarOAGIBkjC_srMHL_JFLzz-u9y7fHvW3CIEVEZ8BhXjwxaczM5CkIU53Mf16xwRr2KYBi9VUMPx9CenfOVEqedBuw_4EpF4o3igiUlKMn-XhmcZjPq81d5vlIAPSIyb0-KG0ZHcCb6Ef_Qx55HO7wAexAF0sQu8mY"
  },
  {
    id: "london-chap3",
    city: "London",
    chapter: "Chapter IV",
    venue: "Asylum Chapel",
    date: "June 15, 2024",
    impact: "160 Seekers • £4,500 Raised for Mentorship",
    desc: "Set within the decaying stone and candlelight of Asylum Chapel, Peckham. Undergirded by ambient cellos and spontaneous choral liturgy. Raised crucial funds to establish our quarterly creative development grant.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCko1LxFZBjvJ00MQQpwX4cHEoO_986zZqNIm5YyFLfLaICd9gULFTmg8hXjV2MKDz1u6_yTP7waiKh7w_995noNHVRcTkWwrsWUpP4udSOk76HqQ6R5FyDm9Yr0tQb8gRsijUFjGRTEaZDEM88dNL4fLAoeXril5XyM6zWa3f9r0_UnOmr-kQL4kVVslg-CqWzvHpwvPaw13xlQx0l5-WCaIDfy2Q0JsDubuDknmuaSBKHn8V94qc"
  },
  {
    id: "bristol-2024",
    city: "Bristol",
    chapter: "Chapter III",
    venue: "The Loco Klub",
    date: "May 18, 2024",
    impact: "95 Seekers • 12 Artists Commissioned",
    desc: "A deep subterranean gathering in the brick vaults of Bristol Temple Meads. An exploration of hidden beauty and light in dark spaces. Commissioned local painters and structural designers for public displays.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC6Dp31dMIIKCQShdHxf5QVj4MiLu-MLccZwbGJVBRRDSg9MM47TZZdYgT2A6emd6nevZ2xh05hC7kD-r-X-c33YcKuG-2M2mcXTNg9mWyMTt7LCzYhJ2gqbZeOrD4ai_JMnMrI-1uwnUIdW2sIHvfbwY3h_15VMlqDqj88O3qMJHOftCNqmQwOmsIichAj3Qx9OPplMROVXnKcPA3orFtzBOSoV0yE9H1L9UHSEDzX8RTjI9I2Aw"
  }
];

export default function PastEventsPage() {
  // Breadcrumb schema for SEO indexation
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://antidotemovement.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Events",
        "item": "https://antidotemovement.com/events"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Past Chapters",
        "item": "https://antidotemovement.com/events/past"
      }
    ]
  };

  return (
    <>
      <head>
        <title>Past Gathering Archives & Impact — Antidote Movement</title>
        <meta 
          name="description" 
          content="Explore the archive of past Antidote Movement gatherings and creative Christian festivals, featuring stories, gallery snapshots, and cultural impact logs." 
        />
        <link rel="canonical" href="https://antidotemovement.com/events/past" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
        />
      </head>

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
              {PAST_EVENTS.map((item) => (
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
                    
                    <h2 className={`${styles.cardTitle} font-editorial`}>{item.city} — {item.venue}</h2>
                    <span className={styles.impactBadge}>{item.impact}</span>
                    <p className={styles.cardDesc}>{item.desc}</p>
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
            <p className="text-body-md" style={{ color: 'rgba(58, 46, 38, 0.7)' }}>Join us for the next chapter in your nearest city.</p>
            <div style={{ marginTop: '32px' }}>
              <Link href="/events" className="btn btn-primary" style={{ minHeight: '44px' }}>
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
