"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isAboutActive = pathname === "/about";
  const isEventsActive = pathname === "/events" || pathname.startsWith("/events/");
  const isGalleryActive = pathname === "/gallery";
  const isMerchActive = pathname === "/merch";
  const isPartnerActive = pathname === "/partnership";

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Left: Logo */}
        <Link href="/" className={styles.logoLink}>
          <img src="/ANTIDOTE-mainlogo.svg" alt="Antidote Movement" className={styles.logoImage} />
        </Link>

        {/* Right Section containing Desktop Menu & Action Buttons */}
        <div className={styles.rightContainer}>
          <div className={styles.desktopMenu}>
            <Link href="/" className={`${styles.link} ${isHomeActive ? styles.activeLink : ""}`}>
              Home
            </Link>
            <Link href="/about" className={`${styles.link} ${isAboutActive ? styles.activeLink : ""}`}>
              About
            </Link>
            <Link href="/events" className={`${styles.link} ${isEventsActive ? styles.activeLink : ""}`}>
              Events
            </Link>
            <Link href="/gallery" className={`${styles.link} ${isGalleryActive ? styles.activeLink : ""}`}>
              Gallery
            </Link>
            <Link href="/merch" className={`${styles.link} ${isMerchActive ? styles.activeLink : ""}`}>
              Merch
            </Link>
            <Link href="/partnership" className={`${styles.link} ${isPartnerActive ? styles.activeLink : ""}`}>
              Partner
            </Link>
          </div>

          <div className={styles.actions}>
            <Link
              href="/checkout/tickets"
              className="btn btn-primary"
              style={{
                padding: '10px 24px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                borderRadius: '50px'
              }}
            >
              Tickets
            </Link>
            <button className={styles.iconBtn} aria-label="Shopping Bag">
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
            <button
              className={`${styles.iconBtn} ${styles.mobileToggle}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: 0,
            width: "100%",
            backgroundColor: "var(--color-stone)",
            borderBottom: "1px solid rgba(212, 196, 183, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 0",
            gap: "20px",
            zIndex: 49,
            boxShadow: "var(--shadow-luxurious-md)"
          }}
        >
          <Link href="/" className={`${styles.link} ${isHomeActive ? styles.activeLink : ""}`} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" className={`${styles.link} ${isAboutActive ? styles.activeLink : ""}`} onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/events" className={`${styles.link} ${isEventsActive ? styles.activeLink : ""}`} onClick={() => setMobileMenuOpen(false)}>
            Upcoming Events
          </Link>
          <Link href="/events/past" className={`${styles.link} ${pathname === "/events/past" ? styles.activeLink : ""}`} onClick={() => setMobileMenuOpen(false)}>
            Past Events
          </Link>
          <Link href="/gallery" className={`${styles.link} ${isGalleryActive ? styles.activeLink : ""}`} onClick={() => setMobileMenuOpen(false)}>
            Gallery
          </Link>
          <Link href="/merch" className={`${styles.link} ${isMerchActive ? styles.activeLink : ""}`} onClick={() => setMobileMenuOpen(false)}>
            Merch Preorder
          </Link>
          <Link href="/partnership" className={`${styles.link} ${isPartnerActive ? styles.activeLink : ""}`} onClick={() => setMobileMenuOpen(false)}>
            Partner
          </Link>
          <Link href="/checkout/tickets" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)} style={{ width: '80%', padding: '12px 24px' }}>
            Get Tickets
          </Link>
        </div>
      )}
    </header>
  );
}
