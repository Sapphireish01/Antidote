"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WingDivider from "@/components/WingDivider";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Antidote Movement",
    "url": "https://antidotemovement.com",
    "logo": "https://antidotemovement.com/logo.png",
    "slogan": "The cure the world needs",
    "description": "Spreading the love of God and the consciousness of His light in a dark world through creative arts. Creating platforms where Christian creatives use their gifts to glorify Yahweh."
  };

  return (
    <>
      <head>
        <title>Antidote Movement — The Cure The World Needs | Christian Creative Gatherings & Arts</title>
        <meta
          name="description"
          content="Antidote Movement — The cure the world needs. Spreading the love of God and the consciousness of His light in a dark world through creative arts. Creating spaces and platforms where Christian creatives glorify Yahweh."
        />
        <link rel="canonical" href="https://antidotemovement.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Header />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <video
              className={styles.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/hero/landing-page-hero.webp"
            >
              <source src="/hero/hero-video.mp4" type="video/mp4" />
            </video>
            <div className={styles.heroOverlay} />
          </div>
          <div className={`${styles.heroContent} animate-fade-in-up`}>
            <h1 className={`${styles.heroTitle} font-editorial`}>Antidote Movement</h1>
            <p className={styles.heroSubtitle}>The cure the world needs</p>
            <p className="text-body-lg" style={{ color: "rgba(245, 242, 237, 0.9)", maxWidth: "560px", marginBottom: "32px", lineHeight: "1.6" }}>
              Spreading the love of God and the consciousness of His light in a dark world through creative arts.
            </p>

            <div className={styles.heroActions}>
              <Link href="/events" className="btn btn-primary">
                Explore Gatherings
              </Link>
              <Link href="/merch" className="btn btn-secondary">
                Preorder Merch
              </Link>
              <Link href="/partnership" className="btn btn-ghost" style={{ color: '#F5F2ED' }}>
                Partner With Us
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Vision & Mission Strip */}
        <section className={styles.missionStrip}>
          <div className="container">
            <span className="text-label-md" style={{ color: "var(--color-bronze)", display: "block", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Our Calling & Purpose
            </span>
            <blockquote className={styles.missionQuote} style={{ marginBottom: "28px" }}>
              "Creating spaces where God will be glorified through the performing arts."
            </blockquote>
            <p className="text-body-md" style={{ maxWidth: "700px", margin: "0 auto", color: "rgba(245, 242, 237, 0.75)", lineHeight: "1.7" }}>
              Creating platforms where Christian creatives can use their gifts to glorify Yahweh — taking one city at a time and building a community (Tribe of creatives).
            </p>
          </div>
        </section>

        <WingDivider />

        {/* Featured Merch */}
        <section className={styles.merchSection}>
          <div className="container">
            <div className={styles.merchGrid}>
              <div className={styles.merchContent}>
                <span className="text-label-md">Artifacts of Identity</span>
                <h2 className="font-editorial">The Antidote Drop</h2>
                <p className="text-body-lg">
                  Garments crafted for the journey. Made with heavily weighted organic cotton, each piece carries the signature Antidote wing embroidery — designed for the tribe of Christian creatives walking in reverence, craft, and purpose.
                </p>
                <div style={{ marginBottom: '32px' }}>
                  <p className="text-label-lg">Preorder the New Drop - Ships Oct 14th</p>
                </div>
                <div>
                  <Link href="/merch" className="btn btn-primary">
                    Preorder Now
                  </Link>
                </div>
              </div>

              <div className={styles.merchCollageArea}>
                <div className={styles.collageContainer}>
                  <div className={`${styles.collageItem} ${styles.collageItem1}`}>
                    <img src="/merch/homepage-1.webp" alt="Collage Item 1" />
                  </div>
                  <div className={`${styles.collageItem} ${styles.collageItem2}`}>
                    <img src="/merch/homepage-2.webp" alt="Collage Item 2" />
                  </div>
                  <div className={`${styles.collageItem} ${styles.collageItem3}`}>
                    <img src="/merch/homepage-3.webp" alt="Collage Item 3" />
                  </div>
                  <div className={`${styles.collageItem} ${styles.collageItem4}`}>
                    <img src="/merch/homepage-4.webp" alt="Collage Item 4" />
                  </div>
                  <div className={`${styles.collageItem} ${styles.collageItem5}`}>
                    <img src="/merch/homepage-5.webp" alt="Collage Item 5" />
                  </div>
                  <div className={`${styles.collageItem} ${styles.collageItem6}`}>
                    <img src="/merch/homepage-6.webp" alt="Collage Item 6" />
                  </div>
                  <div className={`${styles.collageItem} ${styles.collageItem7}`}>
                    <img src="/merch/homepage-7.webp" alt="Collage Item 7" />
                  </div>
                  <div className={`${styles.collageItem} ${styles.collageItem8}`}>
                    <img src="/merch/homepage-8.webp" alt="Collage Item 8" />
                  </div>
                  <div className={styles.waxSeal}>
                    <span>New Drop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Block */}
        <section className={styles.partnerSection}>
          <div className="container">
            <div className={styles.partnerIntro}>
              <span className="text-label-md" style={{ color: "var(--color-bronze)", display: "block", marginBottom: "8px" }}>Partner with us</span>
              <h2 className="font-editorial">Fuel the Mission</h2>
              <p className="text-body-lg">
                Your support directly empowers the next generation of Kingdom-focused creatives and help people encounter Jesus
              </p>
            </div>

            <div className={styles.partnerGrid}>
              {/* Tier 1 */}
              <div className={styles.tierCard}>
                <div className={styles.tierCardLightStamp}></div>
                <span className={`${styles.tierLabel} text-label-md`}>Support</span>
                <h3 className={`${styles.tierPrice} font-editorial`}>£25</h3>
                <p className={styles.tierTitle}>Equip a Creative</p>
                <ul className={styles.tierFeatures}>
                  <li>Clean content creation tools</li>
                  <li>Studio access & resources</li>
                  <li>Mentorship in the creative tribe</li>
                </ul>
                <Link href="/checkout/partnership?amount=25" className="btn btn-secondary">
                  Partner Now
                </Link>
              </div>

              {/* Tier 2 */}
              <div className={`${styles.tierCard} ${styles.tierCardDark}`}>
                <div className={styles.tierCardDarkStamp}></div>
                <span className={`${styles.tierLabel} text-label-md`}>Growth</span>
                <h3 className={`${styles.tierPrice} font-editorial`}>£150</h3>
                <p className={styles.tierTitle}>Launch a City Gathering</p>
                <ul className={styles.tierFeatures}>
                  <li>Venue booking & stage production</li>
                  <li>Tour logistics for Christian artists</li>
                  <li>Local creative tribe networking</li>
                </ul>
                <Link href="/checkout/partnership?amount=150" className="btn btn-primary">
                  Partner Now
                </Link>
              </div>

              {/* Tier 3 */}
              <div className={styles.tierCard}>
                <div className={styles.tierCardLightStamp}></div>
                <span className={`${styles.tierLabel} text-label-md`}>Vision</span>
                <h3 className={`${styles.tierPrice} font-editorial`}>£500</h3>
                <p className={styles.tierTitle}>Sustain the Movement</p>
                <ul className={styles.tierFeatures}>
                  <li>Full production & tour scholarships</li>
                  <li>Permanent performing arts spaces</li>
                  <li>Global creative tour expansion</li>
                </ul>
                <Link href="/checkout/partnership?amount=500" className="btn btn-secondary">
                  Partner Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Faces of the Tribe Gallery */}
        {/* <section className={styles.gallerySection}>
          <div className={styles.galleryTitle}>
            <h2 className="text-headline-lg font-editorial container">Faces of the Tribe</h2>
          </div>

          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <img className={styles.galleryImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBncmh_hWJ3k4qfbxJTXRSG4uRFdoiHk02gflE6MGqtOtlJ2V-kkklmLmxRvyc-r2IhH5plS6CR6aVH1NndXVFJsp4uBgO1JNIO0qx4ggBWSO7t1mfdqYp9A3z1gt1X6yt2hEbHoA5BB-e6w7lGeY7ojAkSeQyMqTXFBSfqFqbLhVzfYJThKyQ3lxlHnkxo_ZVznKRooUD4y3F81Vpjk5O6y7FnnA5rAx78BHyMYbwzKEGGVNQt5Vs" alt="Tribe Face 1" />
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryItemOdd}`}>
              <img className={styles.galleryImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLRbF0hI7zpkt1IO8gqFcfyw1jumP4-BF-wgSFR6IQNeIBN26AbVqNOXWvaieRrlMrswpiOGGQDTE8bYWQ7346_S0T8BxknrllxX-X5zlM8ZXGvgQJrfoiPWCux87YvfRxWH7IPiYy1fQ7ihxrsMcKzpriGZfcEX-kzzoYEaNlqbirwL1MvAhdd0p7HmhQ7FDCQX8RVcKpp2H4KVoOBgjzz0dWkTZWtP0KyQefdgW4IVfDlV8bGfk" alt="Tribe Face 2" />
            </div>
            <div className={styles.galleryItem}>
              <img className={styles.galleryImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJmqiNCzZtoQLTGen5i9CFU2IQ_x91deTVCQcUghOQD0eUfGbdAeWv3zpirwYCxkNWDXCjuvdjHPkVMzrd6I0WPxyCUaYCTEJg9Q8FhTS0WDOXzgzkE-vJ26O2bDRVimFP-pQsGg6E1ns27U2SpFRlwGzqfzKwBHMJAcfGDXQvjZFFaqcUpA562gKD1TYA3zTdkHCaksqinfFewMejXipFH2J7xUsC7xPyLJ5FG0Y9qACZ3ZHIVlU" alt="Tribe Handcraft" />
            </div>
            <div className={styles.galleryItem}>
              <img className={styles.galleryImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv7EBD38U8xTHxbEoAuDD9oOelH1y6z3CYWMB0b5CvqVjgHG65A_XeYYN8PRdgOQRF34UjWl92__tJtTkUC1Zab8UWf2pARmCylNaAXP14JQd1mvTX0yFLGmmuVAjD8xaeoGuFYglCAms7OATD94ZZGALlhETCeqrXnNW6g2kOKQ3SkHC92-17C9wcJsIM7ftAiOuqo6aRTNpknpJnncZG-VUwC1w9l2uXGXLms_7fv9ffMXBa_Ic" alt="Tribe Landscape" />
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryItemOdd}`}>
              <img className={styles.galleryImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqm5uMQdboiI9Xoi6fG2hsLPjPsEpHtPmc07PLSab6fhCSIMiU0QVONhsOF8M8IM57RgXMS6ssUw_a28VYlTtROpr_GOMtEarl22XSFp1p5FOHFPnd7hBhdk-mPvotNH8gluPSAPVruwYu20vF8IzYuDgVxVnG3ehn8hbwaDmNXtI7-Dr86TFYP0Ttr2ndQ26dJ4ZOmvSQ-r5DwmlaawKW-pR2RiNTHF5qdVwll88OJiPykRwwGP4" alt="Tribe HQ Study" />
            </div>
            <div className={styles.galleryItem}>
              <img className={styles.galleryImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDapUc-y2p11ByiA6oafzBmWZGfuI5wK0apxli5dohwh44yI-OBfucpid8L9MZSMiSIwVARnDxUOdNaL5Fm6NAcwUeWAY-_I1gLPmkqD6FJEHNKGJ7l02u7K5aD_NJ6-rkX0ZlU-xOO9Xi5bWIfDeMLOErAw6NW_GYelkJpQVJ2OM4glJW6aexILK32TAU7j6tZyrOQS_Qe74HfPgFp8z4zgzaX_moXhHohAQ12pAulv3ji5oeTjs" alt="Tribe Face 3" />
            </div>
          </div>
        </section> */}

        {/* Closing CTA & Newsletter */}
        {/* <section className={styles.closingSection}>
          <div className="container">
            <p className={styles.closingSubtitle}>The cure the world needs</p>
            <h2 className={`${styles.closingTitle} font-editorial`}>Antidote Movement</h2>
            
            <div className={styles.closingButtons}>
              <Link href="/checkout/tickets" className="btn btn-primary" style={{ padding: '20px 40px' }}>
                Get Tickets
              </Link>
              <Link href="/merch" className="btn btn-stone" style={{ padding: '20px 40px' }}>
                Preorder Merch
              </Link>
              <Link href="/partnership" className="btn btn-ghost" style={{ padding: '20px 40px', color: 'var(--color-stone)' }}>
                Partner With Us
              </Link>
            </div>

            <div className={styles.newsletterWrapper}>
              <h3 className="text-label-lg styles.newsletterTitle">Join the Newsletter</h3>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  className="input-underlined input-underlined-stone" 
                  placeholder="Email Address" 
                  required 
                />
                <button type="submit" className="btn btn-stone">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </>
  );
}
