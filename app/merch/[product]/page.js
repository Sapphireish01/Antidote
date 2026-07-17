import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getProductById } from "@/lib/data";
import styles from "./page.module.css";

const SITE_URL = "https://antidotemovement.global";

export async function generateMetadata({ params }) {
  const { product } = await params;
  const item = await getProductById(product);

  if (!item) {
    return {
      title: "Product Not Found",
      description: "The requested merchandise artifact could not be found.",
    };
  }

  const pageUrl = `${SITE_URL}/merch/${item.id}`;

  return {
    title: `${item.name} — Antidote Merch`,
    description: item.description,
    keywords: [
      `Antidote ${item.name}`,
      `preorder Antidote ${item.id}`,
      "heavyweight organic garments",
      "ethical Christian fashion",
      "organic cotton apparel",
      `Christian streetwear ${item.color}`,
      "Antidote Movement Merch",
    ],
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: pageUrl,
      siteName: "Antidote Movement",
      title: `${item.name} — Antidote Merch`,
      description: item.description,
      images: [
        {
          url: item.image,
          width: 1200,
          height: 630,
          alt: item.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} — Antidote Merch`,
      description: item.description,
      images: [item.image],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ProductPage({ params }) {
  const { product } = await params;
  const item = await getProductById(product);

  if (!item) {
    return (
      <>
        <Header />
        <main className={styles.errorState}>
          <h1 className={`${styles.errorTitle} font-editorial`}>Artifact Not Found</h1>
          <p className={styles.errorText}>
            The merchandise item you are looking for is not cataloged in our autumn drop.
          </p>
          <Link href="/merch" className="btn btn-primary">
            Back to Merch Store
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Structured Schema for Product
  const schemaMarkup = {
    "@context": "https://schema.org",
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main className={styles.detailsPage}>
        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/merch" className={styles.breadcrumbLink}>
              Merch
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span style={{ color: "var(--color-espresso)" }}>{item.name}</span>
          </nav>

          {/* Product details layout */}
          <div className={styles.productLayout}>
            <div className={styles.imageSection}>
              <div className={styles.wingMask}>
                <img src={item.image} alt={item.name} className={styles.productImage} />
                <div className={styles.waxSeal}>
                  <span className={styles.sealLabel}>{item.color}</span>
                  <span className={styles.sealPrice}>
                    {item.currencySymbol}
                    {parseInt(item.price)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.headerArea}>
                <span className={styles.dropTag}>The Autumn Drop</span>
                <h1 className={`${styles.productName} font-editorial`}>{item.name}</h1>
                
                <div className={styles.specRow}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Colorway</span>
                    <span className={styles.specValue}>{item.color}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Material</span>
                    <span className={styles.specValue}>
                      {item.id === "hoodie" ? "500GSM Organic Cotton" : "Premium Sourced Blend"}
                    </span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Shipping</span>
                    <span className={styles.specValue}>Oct 24</span>
                  </div>
                </div>
              </div>

              <div className={styles.descriptionArea}>
                <h2 className={styles.descriptionTitle}>Artifact Details</h2>
                <p className={styles.descriptionText}>{item.description}</p>
              </div>

              <div className={styles.actionArea}>
                <div className={styles.priceDisplay}>
                  <span className={styles.priceLabel}>Preorder Investment</span>
                  <span className={styles.priceAmount}>
                    {item.currencySymbol}
                    {item.price} {item.currency}
                  </span>
                </div>
                <Link href={`/checkout/preorder?item=${item.id}`} className="btn btn-primary preorderBtn">
                  Preorder Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
