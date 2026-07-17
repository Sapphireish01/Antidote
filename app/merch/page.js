import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WingDivider from "@/components/WingDivider";
import Link from "next/link";
import { getAllProducts } from "@/lib/data";
import NewsletterForm from "@/components/NewsletterForm";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export const metadata = {
  title: "Antidote Movement Merch Preorder & Artifacts",
  description:
    "Preorder limited Antidote Movement heavyweight ritual hoodies, altar vessels, and grounding garments crafted from organic cotton.",
  alternates: {
    canonical: `${SITE_URL}/merch`,
  },
};

export default async function MerchPage() {
  const products = await getAllProducts();

  // Generate dynamic Schema.org Product objects for SEO crawler indexation
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": products.map((item) => ({
      "@type": "Product",
      "name": item.name,
      "image": item.image,
      "description": item.description,
      "offers": {
        "@type": "Offer",
        "price": item.price,
        "priceCurrency": item.currency,
        "url": `${SITE_URL}/checkout/preorder?item=${item.id}`,
        "availability": item.availability,
      },
    })),
  };

  // Find the featured product (hoodie)
  const featuredProduct = products.find((p) => p.id === "hoodie") || products[0];
  const preorderProducts = products.filter((p) => p.id !== "hoodie");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroText}>
              <span className={styles.heroLabel}>THE AUTUMN DROP</span>
              <h1 className={`${styles.heroTitle} font-editorial`}>
                <Link href={`/merch/${featuredProduct.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  The Heavyweight <br /> Ritual Hoodie
                </Link>
              </h1>
              <p className={`${styles.heroDescription} text-body-lg`}>
                {featuredProduct.description}
              </p>
              <div className={styles.heroActions}>
                <Link href={`/merch/${featuredProduct.id}`} className="btn btn-primary">
                  View Details
                </Link>
                <Link href={`/checkout/preorder?item=${featuredProduct.id}`} className="btn btn-secondary">
                  Preorder Now
                </Link>
              </div>
            </div>

            <div className={styles.heroImageArea}>
              <div className={styles.wingMask}>
                <Link href={`/merch/${featuredProduct.id}`}>
                  <img
                    className={styles.heroImage}
                    src='/merch/homepage-1.webp'
                    alt="Ritual Hoodie"
                  />
                </Link>
              </div>

              <div className={styles.waxSeal}>
                <span className={styles.sealLabel}>{featuredProduct.color}</span>
                <span className={styles.sealPrice}>
                  {featuredProduct.currencySymbol}
                  {parseInt(featuredProduct.price)}
                </span>
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
                <p className="text-body-md" style={{ color: "rgba(60, 42, 33, 0.65)" }}>
                  Limited quantities available. Shipping Oct 24.
                </p>
              </div>
            </div>

            <div className={styles.grid}>
              {preorderProducts.map((product, idx) => (
                <div key={product.id} className={`${styles.productCard} ${styles[`tier${idx + 1}`]}`}>
                  <div className={`${styles.productImageArea} ${product.hoverImage ? styles.flippable : ''}`}>
                    {product.hoverImage ? (
                      <div className={styles.flipContainer}>
                        <div className={styles.flipInner}>
                          <div className={styles.flipFront}>
                            <Link href={`/merch/${product.id}`}>
                              <img className={styles.productImage} src={product.image} alt={product.name} />
                            </Link>
                          </div>
                          <div className={styles.flipBack}>
                            <Link href={`/merch/${product.id}`}>
                              <img className={styles.productImage} src={product.hoverImage} alt={`${product.name} Alternate`} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link href={`/merch/${product.id}`}>
                        <img className={styles.productImage} src={product.image} alt={product.name} />
                      </Link>
                    )}
                    <div className={`${styles.waxSeal} ${styles.smallSeal}`}>
                      <span className={styles.sealPrice} style={{ fontSize: "16px" }}>
                        {product.currencySymbol}
                        {parseInt(product.price)}
                      </span>
                    </div>
                  </div>
                  <h3 className={`${styles.productCardTitle} font-editorial`}>
                    <Link href={`/merch/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className={styles.productCardMeta}>{product.shipping}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <Link href={`/merch/${product.id}`} className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Details
                    </Link>
                    <Link href={`/checkout/preorder?item=${product.id}`} className="btn btn-primary" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      Preorder
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Newsletter */}
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <span className="material-symbols-outlined styles.newsletterIcon">auto_awesome</span>
            <h2 className={styles.newsletterTitle}>Never miss a drop</h2>
            <p className={`${styles.newsletterText} text-body-md`}>
              Our collections are released in scarce quantities. Join the Inner Circle for priority
              notifications and private access.
            </p>
            <NewsletterForm className={styles.form} />
          </div>
        </section>
      </main>

      <Footer />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('touchstart', function(e) {
              var flippable = e.target.closest('.${styles.flippable}');
              if (flippable) {
                flippable.classList.toggle('${styles.touched}');
              }
            }, { passive: true });
          `
        }}
      />
    </>
  );
}
