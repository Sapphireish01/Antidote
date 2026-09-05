"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";

export default function EventGallery({ images, title, artist, chapter }) {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const activeImage = activeModalIndex !== null ? images[activeModalIndex] : null;

  const handleKeyDown = useCallback(
    (e) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    },
    [activeModalIndex, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalIndex]);

  if (!images || images.length === 0) return null;

  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryHeader}>
        <div>
          <span className={styles.gallerySubtitle}>PHOTO ARCHIVE</span>
          <h2 className={`${styles.galleryTitle} font-editorial`}>
            Event Gallery
          </h2>
        </div>
        <span className={styles.galleryCountBadge}>
          {images.length} Captured Moments
        </span>
      </div>

      <div className={styles.photoGrid}>
        {images.map((imgSrc, idx) => (
          <div
            key={idx}
            className={styles.photoCard}
            onClick={() => setActiveModalIndex(idx)}
          >
            <div className={styles.photoWrapper}>
              <img
                src={imgSrc}
                alt={`${title} photo ${idx + 1}`}
                loading="lazy"
                className={styles.photoImg}
              />
              <div className={styles.photoHover}>
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                  zoom_in
                </span>
                <span>Photo {idx + 1} of {images.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className={styles.modalOverlay} onClick={() => setActiveModalIndex(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setActiveModalIndex(null)}
              aria-label="Close photo modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={() =>
                setActiveModalIndex(
                  (activeModalIndex - 1 + images.length) % images.length
                )
              }
              aria-label="Previous photo"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className={styles.modalImageContainer}>
              <img
                src={activeImage}
                alt={`${title} photo ${activeModalIndex + 1}`}
                className={styles.modalImage}
              />
            </div>

            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={() =>
                setActiveModalIndex((activeModalIndex + 1) % images.length)
              }
              aria-label="Next photo"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>

            <div className={styles.modalFooter}>
              <div>
                <span className={styles.modalCount}>
                  Photo {activeModalIndex + 1} of {images.length}
                </span>
                <h3 className={styles.modalCaption}>{title}</h3>
                <p className={styles.modalSub}>{artist}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
