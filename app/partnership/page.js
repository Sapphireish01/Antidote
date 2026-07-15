import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export default function PartnershipLedgerPage() {
  const jsonLd = {
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
        "name": "Partnership",
        "item": "https://antidotemovement.com/partnership"
      }
    ]
  };

  return (
    <>
      <head>
        <title>Partner with Us & Support the Mission — Antidote Movement</title>
        <meta 
          name="description" 
          content="Support the Antidote Movement mission. Choose from once-off or recurring partnership tiers to fund and equip Christian creative hubs globally." 
        />
        <link rel="canonical" href="https://antidotemovement.com/partnership" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <span className={styles.heroTag}>COVENANT OF CREATION</span>
            <h1 className={`${styles.heroTitle} font-editorial`}>The Ledger of Impact</h1>
            <p className={`${styles.heroDesc} font-editorial`}>
              "Investing in the Antidote is more than a transaction; it is a sacred alignment with the architects of our shared sanctuary."
            </p>
          </div>
        </section>

        {/* Elegant Rectangular Image Integration */}
        <div className={styles.maskWrapper}>
          <div className={styles.standardImageWrapper}>
            <img 
              className={styles.maskImage} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAykiYRT_ggQAjAtauo45ATE1x4-bSDmLRmM4SciSQM2-5j46O4SC2hmlh73GswoZxmx23NleE4f5f3cuQOcTen7JHi8oib71DlP8gIHkSwUpH2RsCDyAiZ7Ji_GsnChWt_gM386Oq1S8djBkXZCI0EYWzaOUOQsig1b4H9RcKMh7JgIHFyazdGi2uyNK-zAl8BiqYKTnnSv5GqzKZmGNWKWZSC7_AlhF-X8Y6XD3I7dwxfg74sj-A" 
              alt="Sanctuary landscape" 
            />
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(58, 46, 38, 0.15)" }}></div>
          </div>
        </div>

        {/* Progress Tracking */}
        <section className={styles.progressSection}>
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <div>
                <p className={styles.progressLabel}>Active Initiative</p>
                <h2 className={styles.initiativeTitle}>Lagos Hub Launch</h2>
              </div>
              <div className={styles.progressPercent}>62% FUNDED</div>
            </div>
            
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: "62%" }}></div>
              <div className={styles.progressMarker} style={{ left: "62%" }}>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  keyboard_arrow_up
                </span>
              </div>
            </div>
            
            <p className={`${styles.progressDesc} text-body-md`}>
              Our expansion into the West African creative ecosystem requires £240,000 to establish the permanent Antidote Hub. Every contribution elevates the collective ceiling.
            </p>
          </div>
        </section>

        {/* Tier Ladder System */}
        <section className={styles.ladderSection}>
          <div className={styles.ladderLine}></div>
          <div className={styles.ladderContainer}>
            <div className={styles.ladderHeader}>
              <h3>PARTNERSHIP TIERS</h3>
              <div className={styles.ladderHeaderLine}></div>
            </div>

            <div className={styles.ladderGrid}>
              {/* Tier 1: Support */}
              <div className={`${styles.ladderCard} ${styles.cardTier1}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardLabel}>TIER 01</span>
                  <div className={styles.levelBadge}>LVL 1</div>
                </div>
                <h4 className={`${styles.cardTitle} font-editorial`}>Support</h4>
                <p className={styles.cardDesc}>
                  Equips one creative with the foundational tools needed to begin their upward journey.
                </p>
                <Link href="/checkout/partnership?amount=25" className={styles.cardAction}>
                  INITIATE →
                </Link>
              </div>

              {/* Tier 2: Growth */}
              <div className={`${styles.ladderCard} ${styles.cardTier2}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardLabel}>TIER 02</span>
                  <div className={styles.levelBadge}>LVL 2</div>
                </div>
                <h4 className={`${styles.cardTitle} font-editorial`}>Growth</h4>
                <p className={styles.cardDesc}>
                  Funds the development of a masterclass series, mentoring a cohort of twelve.
                </p>
                <Link href="/checkout/partnership?amount=150" className={styles.cardAction}>
                  INITIATE →
                </Link>
              </div>

              {/* Tier 3: Vision */}
              <div className={`${styles.ladderCard} ${styles.cardTier3}`}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardLabel}>TIER 03</span>
                  <div className={styles.levelBadge}>LVL 3</div>
                </div>
                <h4 className={`${styles.cardTitle} font-editorial`}>Vision</h4>
                <p className={styles.cardDesc}>
                  Directly contributes to the operational infrastructure of a new city hub launch.
                </p>
                <Link href="/checkout/partnership?amount=500" className={styles.cardAction}>
                  INITIATE →
                </Link>
              </div>

              {/* Tier 4: Pillar */}
              <div className={`${styles.ladderCard} ${styles.ladderCardDark} ${styles.cardTier4}`} style={{ position: "relative" }}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardLabel}>TIER 04</span>
                  <div className={`${styles.levelBadge} ${styles.largeBadge}`}>ELITE</div>
                </div>
                <h4 className={`${styles.cardTitle} font-editorial`} style={{ color: "var(--color-stone)" }}>Pillar</h4>
                <p className={styles.cardDesc} style={{ color: "rgba(245, 242, 237, 0.7)" }}>
                  The ultimate alignment. Endows a permanent scholarship for emerging visionaries.
                </p>
                <Link href="/checkout/partnership?amount=1000" className={styles.cardAction}>
                  CONVENE →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stewardship Promise */}
        <section className={styles.stewardshipSection}>
          <div className={styles.stewardshipGrid}>
            <div>
              <h2 className={`${styles.stewardshipTitle} font-editorial`}>The Stewardship Promise</h2>
              <div className={styles.promises}>
                <div className={styles.promiseItem}>
                  <span className={`material-symbols-outlined ${styles.promiseIcon}`}>verified_user</span>
                  <div>
                    <h5 className={styles.promiseTitleText}>RADICAL TRANSPARENCY</h5>
                    <p className={styles.promiseDesc}>Every dollar is tracked in our quarterly Ledger report, accessible to all partners.</p>
                  </div>
                </div>
                
                <div className={styles.promiseItem}>
                  <span className={`material-symbols-outlined ${styles.promiseIcon}`}>history_edu</span>
                  <div>
                    <h5 className={styles.promiseTitleText}>EDITORIAL OVERSIGHT</h5>
                    <p className={styles.promiseDesc}>Our editorial board ensures all funded projects align with the Antidote aesthetic and ethics.</p>
                  </div>
                </div>

                <div className={styles.promiseItem}>
                  <span className={`material-symbols-outlined ${styles.promiseIcon}`}>diversity_1</span>
                  <div>
                    <h5 className={styles.promiseTitleText}>COVENANT NETWORK</h5>
                    <p className={styles.promiseDesc}>Join a restricted community of patrons including designers, poets, and founders.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.stewardshipImageArea}>
              <img 
                className={styles.stewardshipImage} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4GG3IDDQeZzwF17E4CHHtVJjmGHz5_lYIARz_s-Eek3norXZBxYyBLP3FW1-mXIcnzIXgfwD2QkXswBXgHwP2EXKICRJ6JGucn-Ll2kWwO4Mc09XxFmXxB7ZW3kTSLmGSUKvE4HPbeyfaksJwWR_gVGjz9rPlAj3W5qfWusmIemF1Igfk7FTEKqaa_xdlIhy3C7izDokdyxeqQsBS5PNbERuN5BgF_S3rQKWP5ke-Ef8l30vamk8" 
                alt="Sanctuary stewardship" 
              />
              <div className={styles.stewardshipLabel}>
                TRUSTED LEGACY
              </div>
            </div>
          </div>
        </section>

        {/* CTA Sanctuary */}
        <section className={styles.ctaSanctuary}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaDivider}>
              <div className={styles.ctaLine}></div>
              <span className={`material-symbols-outlined ${styles.ctaDividerIcon}`}>diamond</span>
              <div className={styles.ctaLine}></div>
            </div>
            
            <h2 className={styles.ctaTitle}>"Become the architect of the new quiet."</h2>
            <p className={styles.ctaDesc}>Inquire about bespoke partnership structures or legacy endowments.</p>
            
            <div className={styles.ctaButtons}>
              <Link href="/checkout/partnership?amount=150" className="btn btn-primary">
                GIVE ONCE
              </Link>
              <Link href="/checkout/partnership?amount=500" className="btn btn-secondary">
                ESTABLISH COVENANT
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
