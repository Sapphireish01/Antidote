"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function EventsList({ initialEvents }) {
  const [activeTab, setActiveTab] = useState("uk-europe");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    setFilteredEvents(initialEvents.filter((e) => e.region === activeTab));
  }, [activeTab, initialEvents]);

  return (
    <section className={styles.tabSection}>
      <div className="container">
        {/* Localized Region Selector Tabs */}
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
          <span className={styles.seoKeywordTag}>
            Christian creative festival{" "}
            {activeTab === "uk-europe"
              ? "London"
              : activeTab === "africa"
              ? "Lagos"
              : "New York"}
          </span>
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
                  <h2 className={`${styles.cardCity} font-editorial`}>
                    <Link href={`/events/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {event.city}
                    </Link>
                  </h2>
                  <p className={styles.cardVenue}>{event.venue}</p>
                  <p className={styles.cardDesc}>{event.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>
                    Passes from {event.currencySymbol}
                    {event.price}
                  </span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link
                      href={`/events/${event.id}`}
                      className="btn btn-secondary"
                      style={{
                        minHeight: "44px",
                        display: "flex",
                        alignItems: "center",
                        justify: "center",
                      }}
                    >
                      Details
                    </Link>
                    <Link
                      href={`/checkout/tickets?city=${event.id}`}
                      className="btn btn-primary"
                      style={{
                        minHeight: "44px",
                        display: "flex",
                        alignItems: "center",
                        justify: "center",
                      }}
                    >
                      Get Tickets
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
