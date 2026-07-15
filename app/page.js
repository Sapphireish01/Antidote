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
    "description": "An elevated spiritual-editorial movement of creative and spiritual seekers glorifying Yahweh through art, design, and gathering."
  };

  return (
    <>
      <head>
        <title>Antidote Movement — Christian Creative Gatherings & Editorial Apparel</title>
        <meta
          name="description"
          content="An elevated spiritual-editorial movement of creative and spiritual seekers. Join our physical gatherings, preorder our heavyweight organic garments, and partner to glorify Yahweh."
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
          <div
            className={styles.heroBg}
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBH_Isp3haBSCkjYem1T65fBDNtlGdyYEMX9f4f_kW5YRTlXu9lPr0G0TUfJGZpOlQX2K1yZdETtIAGHwApJYNHsphogaqv2uvMzkbtmTGG8GdHWqkde6FZgqoz621A_3DcBNUaFkpjqps6c0KJ8RUKGuMchmUkiIztDnROhwPZlF1bsyYRmJypW4tDKS_H3UJnOdUCSF4qPe2niH5AKNx9PRN0_RVuOS9OgRWs1kS3BdKBUhsKFFI')`
            }}
          />
          <div className={`${styles.heroContent} animate-fade-in-up`}>
            <h1 className={`${styles.heroTitle} font-editorial`}>Antidote Movement</h1>
            <p className={styles.heroSubtitle}>The cure the world needs</p>

            <div className={styles.heroActions}>
              <Link href="/checkout/tickets" className="btn btn-primary">
                Get Tickets
              </Link>
              <Link href="/merch" className="btn btn-secondary">
                Preorder Merch
              </Link>
              <Link href="/partnership" className="btn btn-ghost">
                Partner With Us
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Strip */}
        <section className={styles.missionStrip}>
          <div className="container">
            <blockquote className={styles.missionQuote}>
              "Creating platforms where creatives can use their gifts to glorify Yahweh."
            </blockquote>
          </div>
        </section>

        {/* Events Section */}
        <section className={styles.eventsSection}>
          <div className="container">
            <div className={styles.eventsHeader}>
              <div className={styles.eventsTitleGroup}>
                <span className="text-label-md">The Gathering</span>
                <h2 className="text-headline-lg font-editorial">Upcoming Events</h2>
              </div>
            </div>

            <div className={styles.carousel}>
              {/* London Card */}
              <div className={styles.eventCard}>
                <div className={styles.cardStamp}></div>
                <div className={styles.imageWrapper}>
                  <img
                    className={styles.cardImage}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF2d2B5UCOLNEhTVMjZFF-nNCsSq1yGX1JOYu5zt8LytBHuOAUHTWK3mGhnpct8FD_NTzhCCG-_1dq5U4d6hFIu6SUdS5XXZOJgjzOfcP9mphsHwnQK16W7BCZGVLarIHxZz3pXX4UwjW27YAhRyVwYBhX0QET7PcZWARJLbbK6Ld5mEXYzxgdbejh7wnh7N7IBXcsKPmBYleOpmREsXrKq-jCa-rhh4rj6dS5DM-aKH6GRRnYLfc"
                    alt="London Event"
                  />
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.cardMeta}>
                    <div>
                      <h3 className="text-headline-md font-editorial" style={{ marginBottom: '4px' }}>London</h3>
                      <p className="text-label-lg" style={{ color: 'var(--color-bronze)' }}>October 12, 2024</p>
                    </div>
                    <span className={styles.cardLocation}>The Tabernacle</span>
                  </div>
                  <Link href="/checkout/tickets" className="btn btn-primary" style={{ width: '100%' }}>
                    Get Tickets
                  </Link>
                </div>
              </div>

              {/* Manchester Card */}
              <div className={styles.eventCard}>
                <div className={styles.cardStamp}></div>
                <div className={styles.imageWrapper}>
                  <img
                    className={styles.cardImage}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpK69PE2V7bbSu7QVkCmkDu8DDeG8fvhPRf_h4QBg74EHeMctskhHPRTxa1MJGS9plQlslWPNszRT7iQxap1-0zuZ1yWHM_pLsqeu9VhnKwplTqdIn2VRr20eCVpM32s4wLHMJSMn13YAyubGmhhbjrfbfFM2PUFQtY0KBMnJmyvqCmP-Tt6xf7yrZB9bJTKTYbZ__vtYcN8jpPmCoujdSVkPzDuudcXHJ018xqIVfkEbbW2bo6PE"
                    alt="Manchester Event"
                  />
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.cardMeta}>
                    <div>
                      <h3 className="text-headline-md font-editorial" style={{ marginBottom: '4px' }}>Manchester</h3>
                      <p className="text-label-lg" style={{ color: 'var(--color-bronze)' }}>October 19, 2024</p>
                    </div>
                    <span className={styles.cardLocation}>Victoria Warehouse</span>
                  </div>
                  <Link href="/checkout/tickets" className="btn btn-primary" style={{ width: '100%' }}>
                    Get Tickets
                  </Link>
                </div>
              </div>

              {/* Birmingham Card */}
              <div className={styles.eventCard}>
                <div className={styles.cardStamp}></div>
                <div className={styles.imageWrapper}>
                  <img
                    className={styles.cardImage}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt3orYUCkay-f92yVr2Y7YUESADJ8STHkas8S-X3oHFIDtJ1UFCNO8jqxERbrIt0MxjeEjV11fFf2qpG0ViyN-iDvzp8u_ffZtXE9xbTyF164c9XmT1QKia9xG3xTjTp5eugeWdX7Y6-qorb3Un0uVOkF8MNQMEZLn6MyfL_v62qAD3yFxTf_zMMjmXftAIrglmOvA00az2OJxdk4X9TnTuRaunadsAeMIvb8hZT0eqw_STeBoAxY"
                    alt="Birmingham Event"
                  />
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.cardMeta}>
                    <div>
                      <h3 className="text-headline-md font-editorial" style={{ marginBottom: '4px' }}>Birmingham</h3>
                      <p className="text-label-lg" style={{ color: 'var(--color-bronze)' }}>October 26, 2024</p>
                    </div>
                    <span className={styles.cardLocation}>The Custard Factory</span>
                  </div>
                  <Link href="/checkout/tickets" className="btn btn-primary" style={{ width: '100%' }}>
                    Get Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WingDivider />

        {/* Featured Merch */}
        <section className={styles.merchSection}>
          <div className="container">
            <div className={styles.merchGrid}>
              <div className={styles.merchContent}>
                <span className="text-label-md">New Drop</span>
                <h2 className="font-editorial">The Tribe Hoodie</h2>
                <p className="text-body-lg">
                  A garment crafted for the journey. Heavily weighted organic cotton, featuring the Antidote signature wing embroidery. Designed for comfort during the craft and reverence during the rest.
                </p>
                <div style={{ marginBottom: '32px' }}>
                  <p className="text-label-lg">Preorder the New Drop - Ships Oct 24</p>
                </div>
                <div>
                  <Link href="/merch" className="btn btn-primary">
                    Preorder Now
                  </Link>
                </div>
              </div>

              <div className={styles.merchImageArea}>
                <div className={styles.merchStamp}></div>
                <div className={styles.merchImageWrapper}>
                  <img
                    className={styles.merchImage}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCABrc5r7Uiilof0PcbCatvU_3Xzgz1D8waOIJX3yb6FkDR0o23WKnumR0ml6PMamr0bjQFcEgurfNW3zIHXamnb_lBQjys6rgKWq4-YiMzrh69JHnG5uYjhx8yFBxmg2YzkqSGNoWRYeYuWc3sfTNxV1GVRrGb-aT_33LFeDuYFyhvp91W38JArEtp9bDu12dQ_RST3ZMwEUbnrnuAQx4GSyH9g6xA5zIKlRT2w1e0YZI52c9mLWw"
                    alt="The Tribe Hoodie"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Block */}
        <section className={styles.partnerSection}>
          <div className="container">
            <div className={styles.partnerIntro}>
              <h2 className="font-editorial">Fuel the Mission</h2>
              <p className="text-body-lg">Your support directly empowers the next generation of Kingdom-focused creatives.</p>
            </div>

            <div className={styles.partnerGrid}>
              {/* Tier 1 */}
              <div className={styles.tierCard}>
                <div className={styles.tierCardLightStamp}></div>
                <span className={`${styles.tierLabel} text-label-md`}>Support</span>
                <h3 className={`${styles.tierPrice} font-editorial`}>£25</h3>
                <p className={styles.tierTitle}>Equip a Creative</p>
                <ul className={styles.tierFeatures}>
                  <li>Studio access for 1 day</li>
                  <li>Essential craft materials</li>
                  <li>Mentorship credit</li>
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
                <p className={styles.tierTitle}>Launch a City</p>
                <ul className={styles.tierFeatures}>
                  <li>Venue scouting & booking</li>
                  <li>Production logistics</li>
                  <li>Local tribe networking</li>
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
                <p className={styles.tierTitle}>Sustain the Tribe</p>
                <ul className={styles.tierFeatures}>
                  <li>Year-round HQ funding</li>
                  <li>Full production scholarship</li>
                  <li>International expansion</li>
                </ul>
                <Link href="/checkout/partnership?amount=500" className="btn btn-secondary">
                  Partner Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Faces of the Tribe Gallery */}
        <section className={styles.gallerySection}>
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
        </section>

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
