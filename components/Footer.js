"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Row 1A: Primary Transactional CTAs */}
        <div className={styles.ctaRow}>
          <Link href="/events" className="btn btn-primary">
            Explore Events
          </Link>
          <Link href="/merch" className="btn btn-secondary">
            Preorder Merch
          </Link>
          <Link href="/partnership" className="btn">
            Partner With Us
          </Link>
        </div>

        {/* Row 1B: Newsletter Signup Prompt */}
        <div className={styles.newsletterRow}>
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

        {/* Divider Line */}
        <div className={styles.divider}></div>

        {/* Row 2: Footer Columns */}
        <div className={styles.bottomRow}>
          {/* Left Column: Logo & Copyright */}
          <div className={styles.leftColumn}>
            <Link href="/" className={styles.logoLink}>
              <img src="/ANTIDOTE-logo.png" alt="Antidote Movement" className={styles.logoImage} />
            </Link>
            <div className={styles.copyright}>
              © 2024 Antidote Movement. The cure the world needs.
            </div>
          </div>

          {/* Center Column: Navigation Links */}
          <div className={styles.linksColumn}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/events" className={styles.link}>Events</Link>
            <Link href="/gallery" className={styles.link}>Gallery</Link>
            <Link href="/merch" className={styles.link}>Merch</Link>
            <Link href="/partnership" className={styles.link}>Partner</Link>
            <Link href="/admin" className={styles.link}>Admin</Link>
          </div>

          {/* Right Column: Social Links */}
          <div className={styles.socialsColumn}>
            <a
              href="https://instagram.com/antidote.movement"
              className={styles.socialLink}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://facebook.com/antidote.movement"
              className={styles.socialLink}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://tiktok.com/@antidote.movement"
              className={styles.socialLink}
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.01c.13-.01.26-.01.39-.01 1.09.01 2.18.01 3.27.01.07.72.35 1.41.81 1.98.67.83 1.62 1.37 2.67 1.53v3.42c-1.12-.04-2.22-.38-3.17-1-.31-.2-.59-.44-.84-.71l-.02 5.37c0 1.25-.26 2.47-.78 3.6-1.07 2.37-3.14 4.07-5.69 4.67-1.39.33-2.84.31-4.22-.05-1.9-.49-3.56-1.68-4.63-3.32C-.48 13.91-.49 11.45.54 9.38c.84-1.68 2.29-2.99 4.06-3.66.97-.37 2-.54 3.03-.52V8.71c-.72-.05-1.45.09-2.09.43-.88.46-1.5 1.3-1.7 2.27-.22.97.02 2 .65 2.76.63.76 1.57 1.15 2.56 1.07.9-.07 1.71-.62 2.13-1.42.23-.44.34-.94.34-1.44l.02-12.11z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
