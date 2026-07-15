"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WingDivider from "@/components/WingDivider";
import Link from "next/link";
import styles from "./page.module.css";

export default function MerchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "The Heavyweight Ritual Hoodie",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAh6eqxi5V-bnoP18fb7ORI3HUVQPb57txzAu7DwHLr7qfxl3dbJA4zbtBXzMrjufMxvvFUyxKZ03cDR6LjbTE_6L0mlhIeCC4qtjUbi98h1wJYGeYQ8ItmhmGW54x_Ze-CkiYFV-y3b2EWIc_ZdKhnuMJAoMq8WqyRnrlIfo8bQpm6SOx2s__f7egCU8740E3_PAbmXrDSifvGWac2TppO9VSSDNP1zQo0EseILh5HBfUVnOBIpxw",
        "description": "Crafted from 500GSM organic cotton, designed for grounding in the shifting seasons. A tactile artifact for the conscious mover.",
        "offers": {
          "@type": "Offer",
          "price": "145.00",
          "priceCurrency": "GBP",
          "url": "https://antidotemovement.com/checkout/preorder?item=hoodie",
          "availability": "https://schema.org/PreOrder"
        }
      },
      {
        "@type": "Product",
        "name": "The Altar Vessel",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAsfQ3ZCQBtO2DAe_WZxOLseIs8C9wDlRMvWjLoIeDehuiNvQRn7c3BbtsOflRk5KDkho_xzzr4ZbBUYYnsobarOAGIBkjC_srMHL_JFLzz-u9y7fHvW3CIEVEZ8BhXjwxaczM5CkIU53Mf16xwRr2KYBi9VUMPx9CenfOVEqedBuw_4EpF4o3igiUlKMn-XhmcZjPq81d5vlIAPSIyb0-KG0ZHcCb6Ef_Qx55HO7wAexAF0sQu8mY",
        "description": "Matte Espresso Ceramic.",
        "offers": {
          "@type": "Offer",
          "price": "48.00",
          "priceCurrency": "GBP",
          "url": "https://antidotemovement.com/checkout/preorder?item=vessel",
          "availability": "https://schema.org/PreOrder"
        }
      },
      {
        "@type": "Product",
        "name": "Ascension Tote",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBpSMLLMvbnZYdvMYHovrzz3xC7KZgSDX4UDXeaXMbd9nCshI_qW0_X6iHhU9O4RogIOL7BzU0znMfJH4euscFWFCIwMnPm2U6FgOW2b3yGIGgHQe_hHyNjtI1KxMAELK3DnJZW8m0v-b5NUHp6XVHNVJodADx_RO649SmFD-CBpV2LKL5hYptLvEWvvtoIqp8CLbo9giDhSytxS8Kzp0gF6yQX3EunpuEWYj-TNeChgVqsGutz8jI",
        "description": "Oat Woven Linen.",
        "offers": {
          "@type": "Offer",
          "price": "65.00",
          "priceCurrency": "GBP",
          "url": "https://antidotemovement.com/checkout/preorder?item=tote",
          "availability": "https://schema.org/PreOrder"
        }
      },
      {
        "@type": "Product",
        "name": "Grounding Socks",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAutvC5Q8S8FEzapmGLtmtTWnKgbtx3dNMcyYTGWf0erGieTPcxfsih4v2upy0LrQqgT68_5kXHhoa_lg7-v3S5R84EMpe3QicXipxiWKxCVKo0Vu6Waw1-PSzdfUFskna2E3mz1Z6wlPIB7X-U3vP6ZYsKYv6lHGE_JGNYqIyF0116fK8CTomf5NHH-nt3zIDNvYN-X4AJTC-sH-FH1A5sHxqdUXQsbnqDLaBCw9tOYM50yLc1Oas",
        "description": "Bronze Cotton-Blend.",
        "offers": {
          "@type": "Offer",
          "price": "24.00",
          "priceCurrency": "GBP",
          "url": "https://antidotemovement.com/checkout/preorder?item=socks",
          "availability": "https://schema.org/PreOrder"
        }
      }
    ]
  };

  return (
    <>
      <head>
        <title>Antidote Movement Merch Preorder & Artifacts</title>
        <meta 
          name="description" 
          content="Preorder limited Antidote Movement heavyweight ritual hoodies, altar vessels, and grounding garments crafted from organic cotton." 
        />
        <link rel="canonical" href="https://antidotemovement.com/merch" />
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
            <div className={styles.heroText}>
              <span className={styles.heroLabel}>THE AUTUMN DROP</span>
              <h1 className={`${styles.heroTitle} font-editorial`}>
                The Heavyweight <br/> Ritual Hoodie
              </h1>
              <p className={`${styles.heroDescription} text-body-lg`}>
                Crafted from 500GSM organic cotton, designed for grounding in the shifting seasons. A tactile artifact for the conscious mover.
              </p>
              <div className={styles.heroActions}>
                <Link href="/checkout/preorder?item=hoodie" className="btn btn-primary">
                  Preorder Now
                </Link>
                <a href="#details" className="btn btn-secondary">
                  View Details
                </a>
              </div>
            </div>
            
            <div className={styles.heroImageArea}>
              <div className={styles.wingMask}>
                <img 
                  className={styles.heroImage} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6eqxi5V-bnoP18fb7ORI3HUVQPb57txzAu7DwHLr7qfxl3dbJA4zbtBXzMrjufMxvvFUyxKZ03cDR6LjbTE_6L0mlhIeCC4qtjUbi98h1wJYGeYQ8ItmhmGW54x_Ze-CkiYFV-y3b2EWIc_ZdKhnuMJAoMq8WqyRnrlIfo8bQpm6SOx2s__f7egCU8740E3_PAbmXrDSifvGWac2TppO9VSSDNP1zQo0EseILh5HBfUVnOBIpxw" 
                  alt="Ritual Hoodie" 
                />
              </div>
              
              <div className={styles.waxSeal}>
                <span className={styles.sealLabel}>Stone Gray</span>
                <span className={styles.sealPrice}>£145</span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Section: Preorder */}
        <section className={styles.productsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <h2 className="text-headline-lg font-editorial">Available to Preorder</h2>
                <p className="text-body-md" style={{ color: 'rgba(60, 42, 33, 0.65)' }}>Limited quantities available. Shipping Oct 24.</p>
              </div>
            </div>
            
            <div className={styles.grid}>
              {/* Product 1 */}
              <div className={`${styles.productCard} ${styles.tier1}`}>
                <div className={styles.productImageArea}>
                  <img 
                    className={styles.productImage} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsfQ3ZCQBtO2DAe_WZxOLseIs8C9wDlRMvWjLoIeDehuiNvQRn7c3BbtsOflRk5KDkho_xzzr4ZbBUYYnsobarOAGIBkjC_srMHL_JFLzz-u9y7fHvW3CIEVEZ8BhXjwxaczM5CkIU53Mf16xwRr2KYBi9VUMPx9CenfOVEqedBuw_4EpF4o3igiUlKMn-XhmcZjPq81d5vlIAPSIyb0-KG0ZHcCb6Ef_Qx55HO7wAexAF0sQu8mY" 
                    alt="Altar Vessel" 
                  />
                  <div className={`${styles.waxSeal} ${styles.smallSeal}`}>
                    <span className={styles.sealPrice} style={{ fontSize: '16px' }}>£48</span>
                  </div>
                </div>
                <h3 className={`${styles.productCardTitle} font-editorial`}>The Altar Vessel</h3>
                <p className={styles.productCardMeta}>Preorder — ships Oct 24</p>
                <Link href="/checkout/preorder?item=vessel" className="btn btn-primary" style={{ width: '100%' }}>
                  Preorder Now
                </Link>
              </div>

              {/* Product 2 */}
              <div className={`${styles.productCard} ${styles.tier2}`}>
                <div className={styles.productImageArea}>
                  <img 
                    className={styles.productImage} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpSMLLMvbnZYdvMYHovrzz3xC7KZgSDX4UDXeaXMbd9nCshI_qW0_X6iHhU9O4RogIOL7BzU0znMfJH4euscFWFCIwMnPm2U6FgOW2b3yGIGgHQe_hHyNjtI1KxMAELK3DnJZW8m0v-b5NUHp6XVHNVJodADx_RO649SmFD-CBpV2LKL5hYptLvEWvvtoIqp8CLbo9giDhSytxS8Kzp0gF6yQX3EunpuEWYj-TNeChgVqsGutz8jI" 
                    alt="Ascension Tote" 
                  />
                  <div className={`${styles.waxSeal} ${styles.smallSeal}`}>
                    <span className={styles.sealPrice} style={{ fontSize: '16px' }}>£65</span>
                  </div>
                </div>
                <h3 className={`${styles.productCardTitle} font-editorial`}>Ascension Tote</h3>
                <p className={styles.productCardMeta}>Preorder — ships Oct 24</p>
                <Link href="/checkout/preorder?item=tote" className="btn btn-primary" style={{ width: '100%' }}>
                  Preorder Now
                </Link>
              </div>

              {/* Product 3 */}
              <div className={`${styles.productCard} ${styles.tier3}`}>
                <div className={styles.productImageArea}>
                  <img 
                    className={styles.productImage} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAutvC5Q8S8FEzapmGLtmtTWnKgbtx3dNMcyYTGWf0erGieTPcxfsih4v2upy0LrQqgT68_5kXHhoa_lg7-v3S5R84EMpe3QicXipxiWKxCVKo0Vu6Waw1-PSzdfUFskna2E3mz1Z6wlPIB7X-U3vP6ZYsKYv6lHGE_JGNYqIyF0116fK8CTomf5NHH-nt3zIDNvYN-X4AJTC-sH-FH1A5sHxqdUXQsbnqDLaBCw9tOYM50yLc1Oas" 
                    alt="Grounding Socks" 
                  />
                  <div className={`${styles.waxSeal} ${styles.smallSeal}`}>
                    <span className={styles.sealPrice} style={{ fontSize: '16px' }}>£24</span>
                  </div>
                </div>
                <h3 className={`${styles.productCardTitle} font-editorial`}>Grounding Socks</h3>
                <p className={styles.productCardMeta}>Preorder — ships Oct 24</p>
                <Link href="/checkout/preorder?item=socks" className="btn btn-primary" style={{ width: '100%' }}>
                  Preorder Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <WingDivider />

        {/* Section: Coming Soon */}
        <section className={styles.comingSoonSection}>
          <div className="container">
            <div className={styles.comingSoonHeader}>
              <h2 className="text-headline-lg font-editorial">Coming Soon</h2>
              <p className="text-body-md" style={{ color: 'rgba(60, 42, 33, 0.65)' }}>Archives in the making. Register for early access.</p>
            </div>
            
            <div className={styles.comingSoonGrid}>
              {/* Product 4 */}
              <div className={styles.soonCard}>
                <div className={styles.soonImageWrapper}>
                  <img 
                    className={styles.soonImage} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA5-8fBiLkwmAzkAf005j1Zg6F0Zjx-WT6HGeB6wqmvboU7PTEYmpeXE1TlRcoc7da3MjEj8CCn8HlgTlOJN5hIF7tO0NXemrfMP9qvqbvc3s98yrt-ahUIHsEbh35lAYhQfsnYcm3AkjLaoLkI-0FBWAXX6K_7BinURO3wtNJ4jU5-keHc6dgbmzIrp0iIIZfS_Lj7LRPAwyFa72AK6E0ebMFvh2TU2zy4suB9k8WbfJuEl_U7UI" 
                    alt="The Void Burner" 
                  />
                </div>
                <div className={styles.soonContent}>
                  <h3 className={`${styles.soonTitle} font-editorial`}>The Void Burner</h3>
                  <p className={styles.soonDesc}>A sculptural piece for sensory atmosphere. Solid bronze construction.</p>
                  <button className="btn btn-ghost">Notify Me</button>
                </div>
              </div>

              {/* Product 5 */}
              <div className={styles.soonCard}>
                <div className={styles.soonImageWrapper}>
                  <img 
                    className={styles.soonImage} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-4b0OLflu6kJpMwPpbtalw7aWxRmWOounz_FmmX7q22tjpomVQUiOjPe7haxSDnuasvW5XqkTuTmm1bF-bSasL27FLHo02L4pjcFrV2PaiEYE2j07kg_F8i3Rpsd5UMSmCKsR2fNwvJIW4RfTHHf0xDeM64hdaodEzIYil56LboWUQz-pZNNxw2h7PgOr_hJx4WihukAgDmBppdkNXQA01NqHqijdToxVm6SHYp6YyUmktXZppx8" 
                    alt="The Daily Codex" 
                  />
                </div>
                <div className={styles.soonContent}>
                  <h3 className={`${styles.soonTitle} font-editorial`}>The Daily Codex</h3>
                  <p className={styles.soonDesc}>400 pages of heavyweight paper for unhurried reflection.</p>
                  <button className="btn btn-ghost">Notify Me</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <span className="material-symbols-outlined styles.newsletterIcon">auto_awesome</span>
            <h2 className={styles.newsletterTitle}>Never miss a drop</h2>
            <p className={`${styles.newsletterText} text-body-md`}>
              Our collections are released in scarce quantities. Join the Inner Circle for priority notifications and private access.
            </p>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                className="input-underlined input-underlined-stone" 
                placeholder="YOUR EMAIL ADDRESS" 
                required 
              />
              <button type="submit" className="btn btn-stone">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
