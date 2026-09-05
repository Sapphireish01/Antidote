"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PAST_EVENTS, getAllGalleryImages } from "@/lib/data";
import styles from "./page.module.css";

export default function GalleryPage() {
  const allImages = useMemo(() => getAllGalleryImages(), []);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Filter images based on selected event/artist
  const filteredImages = useMemo(() => {
    if (selectedFilter === "all") return allImages;
    return allImages.filter((item) => item.eventId === selectedFilter);
  }, [allImages, selectedFilter]);

  const activeImage = activeModalIndex !== null ? filteredImages[activeModalIndex] : null;

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) => (prev + 1) % filteredImages.length);
      } else if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
      }
    },
    [activeModalIndex, filteredImages.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal is active
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

  const filterTabs = [
    { id: "all", label: "All Archives", count: allImages.length },
    { id: "travis-greene-berlin", label: "Travis Greene", count: 10 },
    { id: "dr-prinz-worship", label: "Dr Prinz", count: 10 },
    { id: "smith-worship", label: "Smith", count: 10 },
    { id: "young-chosen", label: "Young & Chosen", count: 6 },
    { id: "night-of-worship", label: "Night of Worship", count: 10 },
    { id: "antidote-vertical", label: "Vertical Sessions", count: 10 },
  ];

  return (
    <>
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.wingMask}>
              <img
                className={styles.heroImage}
                src="/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN.jpg"
                alt="Antidote Moments Archive"
              />
              <div className={styles.overlay}>
                <span className={styles.heroSubtitle}>LIVING ARCHIVE & VISUAL CHRONICLES</span>
                <h1 className={`${styles.heroTitle} font-editorial`}>
                  A Sanctuary of Light, Sound & Sacred Encounter
                </h1>
                <p className={styles.heroLead}>
                  Moments captured across tours, concert stages, and intimate worship assemblies — glorifying Yahweh through the creative arts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Navigation Bar */}
        <section className={styles.filterSection}>
          <div className="container">
            <div className={styles.filterScroll}>
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedFilter(tab.id);
                    setActiveModalIndex(null);
                  }}
                  className={`${styles.filterButton} ${
                    selectedFilter === tab.id ? styles.filterButtonActive : ""
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={styles.tabCount}>{tab.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className={styles.gallerySection}>
          <div className="container">
            <div className={styles.galleryMetaRow}>
              <div className={styles.metaCount}>
                Showing <strong>{filteredImages.length}</strong> archived photos
              </div>
            </div>

            <div className={styles.photoGrid}>
              {filteredImages.map((img, index) => (
                <div
                  key={img.id}
                  className={styles.photoCard}
                  onClick={() => setActiveModalIndex(index)}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={img.src}
                      alt={`${img.artist} - ${img.eventTitle}`}
                      loading="lazy"
                      className={styles.photoImg}
                    />
                    <div className={styles.photoOverlay}>
                      <span className={styles.overlayArtist}>{img.artist}</span>
                      <h3 className={styles.overlayTitle}>{img.eventTitle}</h3>
                      <span className={styles.zoomPrompt}>
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                          zoom_in
                        </span>
                        Click to view
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardCaption}>
                    <span className={styles.cardArtistTag}>{img.artist}</span>
                    <span className={styles.cardChapterTag}>{img.chapter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className={styles.modalOverlay} onClick={() => setActiveModalIndex(null)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className={styles.closeBtn}
                onClick={() => setActiveModalIndex(null)}
                aria-label="Close photo viewer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Prev Button */}
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={() =>
                  setActiveModalIndex(
                    (activeModalIndex - 1 + filteredImages.length) % filteredImages.length
                  )
                }
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              {/* Image Preview */}
              <div className={styles.modalImageContainer}>
                <img
                  src={activeImage.src}
                  alt={`${activeImage.artist} - ${activeImage.eventTitle}`}
                  className={styles.modalImage}
                />
              </div>

              {/* Next Button */}
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={() =>
                  setActiveModalIndex((activeModalIndex + 1) % filteredImages.length)
                }
                aria-label="Next image"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              {/* Modal Footer Info */}
              <div className={styles.modalFooter}>
                <div className={styles.modalInfo}>
                  <div className={styles.modalHeaderTag}>
                    <span className={styles.chapterBadge}>{activeImage.chapter}</span>
                    <span className={styles.counterText}>
                      {activeModalIndex + 1} / {filteredImages.length}
                    </span>
                  </div>
                  <h2 className={`${styles.modalTitle} font-editorial`}>
                    {activeImage.eventTitle}
                  </h2>
                  <p className={styles.modalDetails}>
                    <strong>{activeImage.artist}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Propose a movement section */}
        <section className={styles.proposeSection}>
          <div className={styles.proposeContainer}>
            <div className={styles.ladder}>
              <div className={styles.ladderItem}>
                <span className={`material-symbols-outlined ${styles.ladderIcon}`}>
                  location_on
                </span>
              </div>
              <div className={styles.ladderItem}>
                <span className={`material-symbols-outlined ${styles.ladderIcon}`}>
                  diversity_3
                </span>
              </div>
              <div className={styles.ladderItem}>
                <span className={`material-symbols-outlined ${styles.ladderIcon}`}>
                  auto_awesome
                </span>
              </div>
            </div>

            <h2 className={`${styles.proposeTitle} font-editorial`}>
              Connect with Antidote
            </h2>
            <p className={styles.proposeLead}>
              We are connecting Christian creatives, artists, and worshipers worldwide. Partner with us to host a gathering or creative tour.
            </p>
            <Link href="/partnership" className="btn btn-primary" style={{ marginTop: "24px" }}>
              Partner With Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
