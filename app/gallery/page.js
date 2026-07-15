import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export default function GalleryPage() {
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
        "name": "Gallery",
        "item": "https://antidotemovement.com/gallery"
      }
    ]
  };

  return (
    <>
      <head>
        <title>Collective Resonance Gallery — Antidote Movement</title>
        <meta 
          name="description" 
          content="Browse the living archive of Antidote Movement gathering photos, creative artifacts, and spiritual seeker gatherings." 
        />
        <link rel="canonical" href="https://antidotemovement.com/gallery" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Header />
      <main className="w-full">
        {/* Wing-Mask Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.wingMask}>
              <img 
                className={styles.heroImage} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCsN0NFX8ibMPA2vc9aQFq4FLItASNReQvS7xwRWJNK1xR8bJV_sVadXU9eoplxOo3epPtGiLgk0Anpsn4ddEiONFbwKxy2ODCNczvx1u462W5ZARhFOab8VRAzEFb8Bptonptc9S0rmuy0xBqZtNhByn-jDd1tzCsvRHRgBbBMFFfFlyYRz1V6XgaAPa5KWJ0g0WRSWN0fVkBY48JFbIQBbG-1F6YGdawJqihUUwamyJUyeBVnbY" 
                alt="Community Gathering" 
              />
              <div className={styles.overlay}>
                <h1 className={`${styles.heroTitle} font-editorial`}>
                  A living archive of collective resonance.
                </h1>
                <span className={styles.heroTag}>Chapter IV: The Wall</span>
              </div>
            </div>
          </div>
        </section>

        {/* Scrapbook Grid Section */}
        <section className={styles.gallerySection}>
          <div className={styles.scrapbookGrid}>
            {/* Item 1: Hands holding ceramics */}
            <div className={styles.scrapbookItem} style={{ transform: "rotate(-1deg)" }}>
              <div className={styles.itemCard}>
                <img 
                  className={styles.cardImage} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA51DFjsHdr987gUl_czB4ogqRPcBHvtRFNvX07dNZUAuOFNmeBRAJhQpfd-_0nGMGhV6A4aXesELguQtB0SsT_gC9cUBpS-c0_vX6KrNIGRC8STrvyCDV7uPdX1IlcYXA74UfiAp9RBPMGZ91LFpPKFrrWDAJNJjDr7ab6-0QwlJGJSSrA34eJZM8TfRP4KA6MDzitSoj-Zvzl9Km0Ld11lwP01f_M_hgogyWm3zOuuhhrxVV2CI" 
                  alt="Ceramic vessels" 
                />
                <div className={styles.cardMeta}>
                  <p className={styles.cardLabel}>London, Sept 2023</p>
                </div>
              </div>
            </div>

            {/* Item 2: Quote Card (The Stone Card) */}
            <div className={styles.scrapbookItem} style={{ transform: "rotate(1.5deg)" }}>
              <div className={styles.quoteCard}>
                <span className={`material-symbols-outlined ${styles.quoteIcon}`}>format_quote</span>
                <p className={`${styles.quoteText} font-editorial`}>
                  "In the silence of the room, we found a language that didn't require words. It was the antidote to the noise outside."
                </p>
                <p className={styles.quoteAuthor}>— Julian V.</p>
              </div>
            </div>

            {/* Item 3: Journal with Wax Seal */}
            <div className={styles.scrapbookItem} style={{ transform: "rotate(-0.5deg)" }}>
              <div className={styles.itemCard}>
                <div className={styles.verifiedBadge}>
                  <span>VERIFIED</span>
                </div>
                <img 
                  className={styles.cardImage} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCko1LxFZBjvJ00MQQpwX4cHEoO_986zZqNIm5YyFLfLaICd9gULFTmg8hXjV2MKDz1u6_yTP7waiKh7w_995noNHVRcTkWwrsWUpP4udSOk76HqQ6R5FyDm9Yr0tQb8gRsijUFjGRTEaZDEM88dNL4fLAoeXril5XyM6zWa3f9r0_UnOmr-kQL4kVVslg-CqWzvHpwvPaw13xlQx0l5-WCaIDfy2Q0JsDubuDknmuaSBKHn8V94qc" 
                  alt="Journal Editorial" 
                />
                <div className={styles.cardMeta}>
                  <p className={styles.cardLabel}>Archived Identity 0012</p>
                </div>
              </div>
            </div>

            {/* Item 4: Arched doorway */}
            <div className={styles.scrapbookItem} style={{ transform: "rotate(2deg)" }}>
              <div className={styles.itemCard}>
                <img 
                  className={styles.cardImage} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyQIMFiHXFKO7cNXW0fUQaG0omMLUxD4jxAVKfBEMzUsXzHiEIiNerMOjhXq7rRzAs6mJXqbAuiUGYOyrITythY79svBw4LCmDw97BzFEEkCQZMYKAlR43wuvBETmuImSPmksOE3lsMzw9soYDNSGNaZ93PGSmPqrm5L9Io49DiVZJ97IyFr2calXKQ9JuexGpR_JltY-14X8xgQR8nDKuL3mUOmel5SAJBsGTZpqU5WiGEkyyRHo" 
                  alt="Arched architecture" 
                />
                <div className={styles.cardMeta}>
                  <p className={styles.cardLabel}>Sanctuary, Tokyo</p>
                </div>
              </div>
            </div>

            {/* Item 5: Artists circle */}
            <div className={styles.scrapbookItem} style={{ transform: "rotate(-1.8deg)" }}>
              <div className={styles.itemCard}>
                <img 
                  className={styles.cardImage} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo89Gl6jGE4TMRLV5gk8Cg36ZwxgQnpYfpjXbfY_3aTrmwRSyFeenOHv9thG5ibHYQ372DAvRlXPk4Zjwdy8TAPzK-mYHEBA7YjS6I-rP_8qD1OIAbqmIi_5V-WCVq7qFs2baK5rc3DUI-_kjitXFP6wvJWuMQPF0qmgcrDGq-VgZiVeQ1baPIx1QicN_HVMKprxOzllRya2gufa3w-gW6PFy7TSSecG2YpeWMkb-eH-vHD09hZJo" 
                  alt="Artists Circle" 
                />
                <div className={styles.cardMeta}>
                  <p className={styles.cardLabel}>Tribe Session, London</p>
                </div>
              </div>
            </div>

            {/* Item 6: Quote Card 2 (Dark background) */}
            <div className={styles.scrapbookItem} style={{ transform: "rotate(0.8deg)" }}>
              <div className={`${styles.quoteCard} ${styles.quoteCardDark}`}>
                <span className={`material-symbols-outlined ${styles.quoteIcon}`} style={{ color: "var(--color-bronze)" }}>psychology</span>
                <p className={`${styles.quoteText} font-editorial`}>
                  "The wall is not a barrier; it's a mirror of who we become when we stop rushing."
                </p>
                <p className={styles.quoteAuthor}>— Elena M.</p>
              </div>
            </div>

            {/* Item 7: Long table twilight */}
            <div className={styles.scrapbookItem} style={{ transform: "rotate(-1deg)" }}>
              <div className={styles.itemCard}>
                <img 
                  className={styles.cardImage} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6Dp31dMIIKCQShdHxf5QVj4MiLu-MLccZwbGJVBRRDSg9MM47TZZdYgT2A6emd6nevZ2xh05hC7kD-r-X-c33YcKuG-2M2mcXTNg9mWyMTt7LCzYhJ2gqbZeOrD4ai_JMnMrI-1uwnUIdW2sIHvfbwY3h_15VMlqDqj88O3qMJHOftCNqmQwOmsIichAj3Qx9OPplMROVXnKcPA3orFtzBOSoV0yE9H1L9UHSEDzX8RTjI9I2Aw" 
                  alt="Communal Long Table" 
                />
                <div className={styles.cardMeta}>
                  <p className={styles.cardLabel}>Joshua Tree, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Propose a movement */}
        <section className={styles.proposeSection}>
          <div className={styles.proposeContainer}>
            <div className={styles.ladder}>
              <div className={styles.ladderItem}>
                <span className={`material-symbols-outlined ${styles.ladderIcon}`}>location_on</span>
              </div>
              <div className={styles.ladderItem}>
                <span className={`material-symbols-outlined ${styles.ladderIcon}`}>diversity_3</span>
              </div>
              <div className={styles.ladderItem}>
                <span className={`material-symbols-outlined ${styles.ladderIcon}`}>auto_awesome</span>
              </div>
            </div>
            
            <h2 className={`${styles.proposeTitle} font-editorial`}>This could be your city next.</h2>
            <Link href="/partnership" className="text-label-lg" style={{ color: "var(--color-espresso)", borderBottom: "2px solid var(--color-bronze)", paddingBottom: "4px" }}>
              Propose a movement in your region
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
