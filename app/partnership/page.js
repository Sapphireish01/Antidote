"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { giftAPI } from "@/lib/api";
import styles from "./page.module.css";

export default function PartnershipPage() {
  const [presets, setPresets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [frequency, setFrequency] = useState("monthly"); // "monthly" | "onetime"
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  useEffect(() => {
    async function loadGifts() {
      setIsLoading(true);
      const res = await giftAPI.getGifts();
      if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
        const apiPresets = res.data.map((g) => ({
          id: String(g.id),
          amount: parseFloat(g.price) || 0,
          label: g.name,
          desc: `${g.name} — your partnership support directly fuels the Antidote Movement.`,
        }));
        setPresets(apiPresets);
        setSelectedPreset(apiPresets[0]);
      } else {
        setPresets([]);
        setIsCustom(true);
      }
      setIsLoading(false);
    }
    loadGifts();
  }, []);

  const activeAmount = isCustom ? Number(customAmount) || 0 : selectedPreset?.amount || 0;

  const currentImpact = isCustom
    ? `Your ${frequency === "monthly" ? "monthly" : "one-time"} gift directly fuels our ongoing tours, content creation, and gathering spaces.`
    : selectedPreset?.desc || "Directly fuels the Antidote Movement.";

  const checkoutUrl = isCustom
    ? `/checkout/partnership?customAmount=${encodeURIComponent(customAmount)}&frequency=${frequency}`
    : selectedPreset
    ? `/checkout/partnership?giftId=${encodeURIComponent(selectedPreset.id)}&amount=${selectedPreset.amount}&frequency=${frequency}`
    : `/checkout/partnership?frequency=${frequency}`;


  return (
    <>
      <Header />

      <main className={styles.partnershipPage}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            {/* Scrollable Left Side: Copy, Story & Visuals */}
            <div className={styles.scrollableContent}>
              {/* Header Block */}
              <div className={styles.introHeader}>
                <span className={styles.covenantBadge}>COVENANT OF CREATIVES</span>
                <h1 className={`${styles.mainTitle} font-editorial`}>
                  Fuel the Movement
                </h1>
                <p className={styles.leadQuote}>
                  "Spreading the love of God and the consciousness of His light in a dark world through creative arts."
                </p>
              </div>

              {/* Main Visual Image Card */}
              <div className={styles.visualCard}>
                <img
                  src="/Pastevents/Travis Greene Concert/TRAVIS GREENE MADE A WAY TOUR BERLIN.jpg"
                  alt="Antidote Gathering Encounter"
                  className={styles.visualImg}
                />
                <div className={styles.visualOverlay}>
                  <span className={styles.visualTag}>ONE CITY AT A TIME</span>
                  <p className={styles.visualCaption}>
                    Building an authentic global tribe of Christian creatives to glorify Yahweh.
                  </p>
                </div>
              </div>

              {/* Mission Pillars (Concise & Focused) */}
              <div className={styles.pillarsSection}>
                <h2 className={`${styles.sectionHeading} font-editorial`}>
                  What Your Support Fuels
                </h2>

                <div className={styles.pillarItem}>
                  <div className={styles.pillarIconWrap}>
                    <span className="material-symbols-outlined">palette</span>
                  </div>
                  <div>
                    <h3 className={styles.pillarTitle}>Godly & Clean Content</h3>
                    <p className={styles.pillarDesc}>
                      Providing production resources, studio recording time, and media distribution for Christian artists to produce world-class creative works.
                    </p>
                  </div>
                </div>

                <div className={styles.pillarItem}>
                  <div className={styles.pillarIconWrap}>
                    <span className="material-symbols-outlined">tour</span>
                  </div>
                  <div>
                    <h3 className={styles.pillarTitle}>Gatherings & Creative Tours</h3>
                    <p className={styles.pillarDesc}>
                      Organising live concerts, worship assemblies, and regional tours that ignite faith, engage communities, and unite believers.
                    </p>
                  </div>
                </div>

                <div className={styles.pillarItem}>
                  <div className={styles.pillarIconWrap}>
                    <span className="material-symbols-outlined">temple_buddhist</span>
                  </div>
                  <div>
                    <h3 className={styles.pillarTitle}>Sanctuary Spaces</h3>
                    <p className={styles.pillarDesc}>
                      Establishing dedicated hubs where musicians, painters, writers, and performers can rehearse, pray, and create in sacred fellowship.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondary Photo Mosaic */}
              <div className={styles.photoMosaic}>
                <div className={styles.mosaicCol}>
                  <img
                    src="/Pastevents/Dr Prinz- Night of Worship/DSC037131.jpg"
                    alt="Worship Gathering"
                    loading="lazy"
                  />
                </div>
                <div className={styles.mosaicCol}>
                  <img
                    src="/Pastevents/Smith Night of Worship/DSC03124.jpg"
                    alt="Creative Community"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Stewardship Badges */}
              <div className={styles.stewardshipCard}>
                <h3 className={`${styles.stewardshipHeading} font-editorial`}>
                  The Stewardship Covenant
                </h3>
                <div className={styles.stewardshipGrid}>
                  <div className={styles.stewardshipItem}>
                    <span className="material-symbols-outlined">verified_user</span>
                    <div>
                      <strong>Transparency</strong>
                      <p>Every pound directly empowers creative Kingdom deployment.</p>
                    </div>
                  </div>
                  <div className={styles.stewardshipItem}>
                    <span className="material-symbols-outlined">auto_awesome</span>
                    <div>
                      <strong>Excellence</strong>
                      <p>Ensuring high artistic craft and unwavering theological devotion.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Right Side: Partnership Giving Panel */}
            <div className={styles.stickyColumn}>
              <div className={styles.givingPanel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelLabel}>PARTNERSHIP SELECTION</span>
                  <h2 className={`${styles.panelTitle} font-editorial`}>
                    Join the Mission
                  </h2>
                </div>

                {/* 2-Option Frequency Switcher */}
                <div className={styles.frequencyToggle}>
                  <button
                    type="button"
                    onClick={() => setFrequency("onetime")}
                    className={`${styles.freqBtn} ${
                      frequency === "onetime" ? styles.freqBtnActive : ""
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`${styles.freqBtn} ${
                      frequency === "monthly" ? styles.freqBtnActive : ""
                    }`}
                  >
                    <span>Monthly Partner</span>
                    <span className={styles.recBadge}>Recommended</span>
                  </button>
                </div>

                {/* Amount Selection Grid */}
                <div className={styles.amountGrid}>
                  {isLoading ? (
                    <>
                      <div className={styles.amountCard} style={{ opacity: 0.5, cursor: "default" }}>
                        <span className={styles.amountNumber}>...</span>
                        <span className={styles.amountLabel}>Loading options...</span>
                      </div>
                      <div className={styles.amountCard} style={{ opacity: 0.5, cursor: "default" }}>
                        <span className={styles.amountNumber}>...</span>
                        <span className={styles.amountLabel}>Loading options...</span>
                      </div>
                    </>
                  ) : presets.length > 0 ? (
                    presets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(preset);
                          setIsCustom(false);
                        }}
                        className={`${styles.amountCard} ${
                          !isCustom && selectedPreset?.id === preset.id
                            ? styles.amountCardActive
                            : ""
                        }`}
                      >
                        <span className={styles.amountNumber}>
                          £{preset.amount}
                          {frequency === "monthly" && <small>/mo</small>}
                        </span>
                        <span className={styles.amountLabel}>{preset.label}</span>
                      </button>
                    ))
                  ) : null}
                </div>

                {/* Custom Amount Input */}
                <div
                  className={`${styles.customBox} ${
                    isCustom ? styles.customBoxActive : ""
                  }`}
                  onClick={() => setIsCustom(true)}
                >
                  <span className={styles.customPrefix}>£</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    className={styles.customInput}
                  />
                  {frequency === "monthly" && (
                    <span className={styles.customSuffix}>/ month</span>
                  )}
                </div>

                {/* Live Impact Preview */}
                <div className={styles.impactPreviewBox}>
                  <div className={styles.impactHeader}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "var(--color-bronze)" }}>
                      sparkles
                    </span>
                    <span>Your Kingdom Impact</span>
                  </div>
                  <p className={styles.impactPreviewText}>{currentImpact}</p>
                </div>

                {/* Direct Checkout CTA */}
                <Link
                  href={checkoutUrl}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {activeAmount > 0
                    ? frequency === "monthly"
                      ? `Become a Partner (Give £${activeAmount}/mo)`
                      : `Make a One-Time Gift of £${activeAmount}`
                    : "Become a Partner"}
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    arrow_forward
                  </span>
                </Link>

                {/* Guarantee & Security Badges */}
                <div className={styles.securityRow}>
                  <span className={styles.secItem}>
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>lock</span>
                    Safe & Secure Checkout
                  </span>
                  {frequency === "monthly" && (
                    <span className={styles.secItem}>
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>sync_saved_locally</span>
                      Cancel Anytime
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
