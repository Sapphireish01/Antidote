"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const EVENTS = [
  {
    id: "london",
    city: "London",
    region: "uk-europe",
    venue: "The Tabernacle",
    date: "2024-10-12",
    dateDisplay: "October 12, 2024",
    price: 35,
    currency: "GBP",
    currencySymbol: "£",
    address: "35 Powis Square, London W11 2AY",
    countryCode: "GB",
    description: "The premier Autumn gathering of UK Christian creatives and seekers. A night of worship, poetry, and shared space.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF2d2B5UCOLNEhTVMjZFF-nNCsSq1yGX1JOYu5zt8LytBHuOAUHTWK3mGhnpct8FD_NTzhCCG-_1dq5U4d6hFIu6SUdS5XXZOJgjzOfcP9mphsHwnQK16W7BCZGVLarIHxZz3pXX4UwjW27YAhRyVwYBhX0QET7PcZWARJLbbK6Ld5mEXYzxgdbejh7wnh7N7IBXcsKPmBYleOpmREsXrKq-jCa-rhh4rj6dS5DM-aKH6GRRnYLfc"
  },
  {
    id: "manchester",
    city: "Manchester",
    region: "uk-europe",
    venue: "Victoria Warehouse",
    date: "2024-10-19",
    dateDisplay: "October 19, 2024",
    price: 30,
    currency: "GBP",
    currencySymbol: "£",
    address: "Trafford Wharf Rd, Stretford, Manchester M17 1AB",
    countryCode: "GB",
    description: "Connecting northern creatives for an evening of quiet reflection, high craft, and covenant networking.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpK69PE2V7bbSu7QVkCmkDu8DDeG8fvhPRf_h4QBg74EHeMctskhHPRTxa1MJGS9plQlslWPNszRT7iQxap1-0zuZ1yWHM_pLsqeu9VhnKwplTqdIn2VRr20eCVpM32s4wLHMJSMn13YAyubGmhhbjrfbfFM2PUFQtY0KBMnJmyvqCmP-Tt6xf7yrZB9bJTKTYbZ__vtYcN8jpPmCoujdSVkPzDuudcXHJ018xqIVfkEbbW2bo6PE"
  },
  {
    id: "birmingham",
    city: "Birmingham",
    region: "uk-europe",
    venue: "The Custard Factory",
    date: "2024-10-26",
    dateDisplay: "October 26, 2024",
    price: 25,
    currency: "GBP",
    currencySymbol: "£",
    address: "Gibb St, Deritend, Birmingham B9 4AA",
    countryCode: "GB",
    description: "A collaborative gathering in the heart of Birmingham's creative quarter. Focused on the art of restoration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt3orYUCkay-f92yVr2Y7YUESADJ8STHkas8S-X3oHFIDtJ1UFCNO8jqxERbrIt0MxjeEjV11fFf2qpG0ViyN-iDvzp8u_ffZtXE9xbTyF164c9XmT1QKia9xG3xTjTp5eugeWdX7Y6-qorb3Un0uVOkF8MNQMEZLn6MyfL_v62qAD3yFxTf_zMMjmXftAIrglmOvA00az2OJxdk4X9TnTuRaunadsAeMIvb8hZT0eqw_STeBoAxY"
  },
  {
    id: "lagos",
    city: "Lagos",
    region: "africa",
    venue: "Freedom Park",
    date: "2024-11-15",
    dateDisplay: "November 15, 2024",
    price: 15,
    currency: "GBP",
    currencySymbol: "£",
    address: "Hospital Rd, Lagos Island, Lagos, Nigeria",
    countryCode: "NG",
    description: "Inaugural gathering in West Africa. Establishing the Lagos creative covenant, connecting local sound and art.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCsN0NFX8ibMPA2vc9aQFq4FLItASNReQvS7xwRWJNK1xR8bJV_sVadXU9eoplxOo3epPtGiLgk0Anpsn4ddEiONFbwKxy2ODCNczvx1u462W5ZARhFOab8VRAzEFb8Bptonptc9S0rmuy0xBqZtNhByn-jDd1tzCsvRHRgBbBMFFfFlyYRz1V6XgaAPa5KWJ0g0WRSWN0fVkBY48JFbIQBbG-1F6YGdawJqihUUwamyJUyeBVnbY"
  },
  {
    id: "nairobi",
    city: "Nairobi",
    region: "africa",
    venue: "The Alchemist Bar",
    date: "2024-11-22",
    dateDisplay: "November 22, 2024",
    price: 12,
    currency: "GBP",
    currencySymbol: "£",
    address: "Parklands Rd, Nairobi, Kenya",
    countryCode: "KE",
    description: "East African tribe assembly. Uniting local designers, builders, and spiritual seekers around intentional craft.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo89Gl6jGE4TMRLV5gk8Cg36ZwxgQnpYfpjXbfY_3aTrmwRSyFeenOHv9thG5ibHYQ372DAvRlXPk4Zjwdy8TAPzK-mYHEBA7YjS6I-rP_8qD1OIAbqmIi_5V-WCVq7qFs2baK5rc3DUI-_kjitXFP6wvJWuMQPF0qmgcrDGq-VgZiVeQ1baPIx1QicN_HVMKprxOzllRya2gufa3w-gW6PFy7TSSecG2YpeWMkb-eH-vHD09hZJo"
  },
  {
    id: "new-york",
    city: "New York",
    region: "north-america",
    venue: "Brooklyn Pioneer",
    date: "2024-12-05",
    dateDisplay: "December 5, 2024",
    price: 45,
    currency: "USD",
    currencySymbol: "$",
    address: "240 pioneer St, Brooklyn, NY 11231",
    countryCode: "US",
    description: "East Coast winter convening. A winter sanctuary of candlelight, ambient sound, and spiritual reflection.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJmqiNCzZtoQLTGen5i9CFU2IQ_x91deTVCQcUghOQD0eUfGbdAeWv3zpirwYCxkNWDXCjuvdjHPkVMzrd6I0WPxyCUaYCTEJg9Q8FhTS0WDOXzgzkE-vJ26O2bDRVimFP-pQsGg6E1ns27U2SpFRlwGzqfzKwBHMJAcfGDXQvjZFFaqcUpA562gKD1TYA3zTdkHCaksqinfFewMejXipFH2J7xUsC7xPyLJ5FG0Y9qACZ3ZHIVlU"
  },
  {
    id: "los-angeles",
    city: "Los Angeles",
    region: "north-america",
    venue: "The Cathedral Sanctuary",
    date: "2024-12-12",
    dateDisplay: "December 12, 2024",
    price: 40,
    currency: "USD",
    currencySymbol: "$",
    address: "514 W Adams Blvd, Los Angeles, CA 90007",
    countryCode: "US",
    description: "West Coast assembly focusing on digital sabbath, organic installation, and the architecture of the quiet.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv7EBD38U8xTHxbEoAuDD9oOelH1y6z3CYWMB0b5CvqVjgHG65A_XeYYN8PRdgOQRF34UjWl92__tJtTkUC1Zab8UWf2pARmCylNaAXP14JQd1mvTX0yFLGmmuVAjD8xaeoGuFYglCAms7OATD94ZZGALlhETCeqrXnNW6g2kOKQ3SkHC92-17C9wcJsIM7ftAiOuqo6aRTNpknpJnncZG-VUwC1w9l2uXGXLms_7fv9ffMXBa_Ic"
  }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("uk-europe");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    setFilteredEvents(EVENTS.filter((e) => e.region === activeTab));
  }, [activeTab]);

  // Generate dynamic Schema.org Event objects for SEO crawler indexation
  const schemaMarkup = filteredEvents.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Antidote Gathering — ${e.city}`,
    "description": e.description,
    "startDate": `${e.date}T19:00:00`,
    "eventAttendanceMode": "https://schema.org/PhysicalEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": e.venue,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": e.address,
        "addressLocality": e.city,
        "addressCountry": e.countryCode
      }
    },
    "image": e.image,
    "offers": {
      "@type": "Offer",
      "price": e.price.toString(),
      "priceCurrency": e.currency,
      "url": `https://antidotemovement.com/checkout/tickets?city=${e.id}`,
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    }
  }));

  return (
    <>
      <head>
        <title>Upcoming Gatherings & Creative Festivals — Antidote Movement</title>
        <meta 
          name="description" 
          content="Join upcoming Antidote Movement gatherings and creative Christian festivals in London, Manchester, Birmingham, Lagos, Nairobi, and New York. Secure tickets." 
        />
        <link rel="canonical" href="https://antidotemovement.com/events" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>

      <Header />

      <main className="w-full">
        {/* Intro */}
        <section className={styles.introSection}>
          <div className={styles.introContainer}>
            <span className={styles.introSubtitle}>PHYSICAL COVENANT</span>
            <h1 className={`${styles.introTitle} font-editorial`}>The Assemblies</h1>
            <p className={styles.introLead}>
              We do not build for screens alone. We convene in historic halls and industrial sanctuaries to slow down, break bread, and share the fruits of our craft.
            </p>
          </div>
        </section>

        {/* Localized Region Selector Tabs */}
        <section className={styles.tabSection}>
          <div className="container">
            <div className={styles.tabsWrapper}>
              <button 
                className={`${styles.tabBtn} ${activeTab === "uk-europe" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("uk-europe")}
              >
                UK & Europe
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "africa" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("africa")}
              >
                Africa
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "north-america" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("north-america")}
              >
                North America
              </button>
            </div>

            {/* Localized search query hint for search indexers */}
            <div className={styles.seoKeywordsContainer}>
              <span className={styles.seoKeywordTag}>Christian creative festival {activeTab === "uk-europe" ? "London" : activeTab === "africa" ? "Lagos" : "New York"}</span>
              <span className={styles.seoKeywordTag}>spiritual seekers community hub</span>
              <span className={styles.seoKeywordTag}>worship and poetry night</span>
            </div>

            {/* Events Grid */}
            <div className={styles.eventsGrid}>
              {filteredEvents.map((event) => (
                <article key={event.id} className={styles.eventCard}>
                  <div className={styles.cardImageWrapper}>
                    <img 
                      className={styles.cardImage} 
                      src={event.image} 
                      alt={`Antidote gathering in ${event.city} - ${event.venue}`}
                      loading="lazy"
                    />
                  </div>
                  
                  <div className={styles.cardDetails}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>{event.dateDisplay}</span>
                      <h2 className={`${styles.cardCity} font-editorial`}>{event.city}</h2>
                      <p className={styles.cardVenue}>{event.venue}</p>
                      <p className={styles.cardDesc}>{event.description}</p>
                    </div>

                    <div className={styles.cardFooter}>
                      <span className={styles.cardPrice}>
                        Passes from {event.currencySymbol}{event.price}
                      </span>
                      <Link 
                        href={`/checkout/tickets?city=${event.id}`} 
                        className="btn btn-primary"
                        style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        Get Tickets
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* View Past Gatherings Link */}
        <section className={styles.pastLinkSection}>
          <div className="container">
            <div className={styles.pastLinkCard}>
              <h3 className={`${styles.pastLinkTitle} font-editorial`}>Looking for the Archives?</h3>
              <p className="text-body-md">Reflect on the stories, snapshots, and community impact of our previous chapters.</p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/events/past" className="btn btn-secondary" style={{ minHeight: '44px' }}>
                  View Past Chapters
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
