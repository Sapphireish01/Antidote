"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { giftAPI, paymentAPI } from "@/lib/api";
import styles from "../checkout.module.css";

const DEFAULT_TIERS = [
  { id: "1", name: "City Assembly", amount: 50 },
  { id: "2", name: "Sanctuary Hub", amount: 250 },
  { id: "gift-25", name: "Equip a Creative", amount: 25 },
  { id: "gift-100", name: "Tour & Production", amount: 100 },
];

function PartnershipCheckoutContent() {
  const searchParams = useSearchParams();
  const [tiers, setTiers] = useState(DEFAULT_TIERS);
  const [frequency, setFrequency] = useState("monthly"); // "monthly" | "onetime"
  const [selectedTierId, setSelectedTierId] = useState("1");
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Patron details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Error handling
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    async function loadGifts() {
      const res = await giftAPI.getGifts();
      if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
        const loaded = res.data.map((g) => ({
          id: String(g.id),
          name: g.name,
          amount: parseFloat(g.price) || 0,
        }));
        setTiers(loaded);
      }
    }
    loadGifts();
  }, []);

  useEffect(() => {
    const giftId = searchParams.get("giftId");
    const amt = searchParams.get("amount");
    const customAmt = searchParams.get("customAmount");
    const freq = searchParams.get("frequency");

    if (freq === "onetime" || freq === "monthly") {
      setFrequency(freq);
    }

    if (customAmt) {
      setCustomAmount(customAmt);
      setUseCustom(true);
    } else if (giftId) {
      setSelectedTierId(giftId);
      setUseCustom(false);
    } else if (amt) {
      const found = tiers.find((t) => t.amount === Number(amt));
      if (found) {
        setSelectedTierId(found.id);
        setUseCustom(false);
      } else {
        setCustomAmount(amt);
        setUseCustom(true);
      }
    }
  }, [searchParams, tiers]);

  const activeTier = tiers.find((t) => t.id === selectedTierId) || tiers[0];
  const contributionAmount = useCustom
    ? Number(customAmount) || 0
    : activeTier
    ? activeTier.amount
    : 0;
  const description = useCustom
    ? "Custom Partnership Support"
    : activeTier
    ? activeTier.name
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    setGeneralError("");

    if (!firstName.trim()) formErrors.firstName = "First name is required.";
    if (!lastName.trim()) formErrors.lastName = "Last name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "A valid email address is required.";
    }

    if (contributionAmount <= 0) {
      setGeneralError("Partnership contribution must be greater than £0.");
      return;
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setGeneralError("Please complete all required patron fields.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Build API payload ensuring EXACTLY ONE of gift or custom_amount is sent
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      recurrent_type: frequency === "monthly" ? "monthly" : "oneoff",
    };

    if (useCustom) {
      payload.custom_amount = String(contributionAmount.toFixed(2));
    } else {
      payload.gift = String(activeTier.id);
    }

    const res = await paymentAPI.initiatePartnerPayment(payload);

    if (res.ok && res.data?.url) {
      // Redirect patron to Stripe Checkout
      window.location.href = res.data.url;
    } else {
      setIsSubmitting(false);
      setGeneralError(
        res.error ||
          "Could not initialize secure checkout session. Please try again or contact support."
      );
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={`${styles.title} font-editorial`}>Partner With Us</h1>
      <p className={styles.subtitle}>
        Empower Christian creatives and facilitate clean, godly content to glorify Yahweh.
      </p>

      {/* Accessible Live Region */}
      <div
        aria-live="assertive"
        className={styles.liveRegion}
        style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }}
      >
        {generalError}
      </div>

      {generalError && (
        <div className={styles.errorBanner} role="alert" style={{ marginBottom: "24px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>error</span>
          <p>{generalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.layout}>
        <div className={styles.formArea}>
          {/* Step 1: Contribution Frequency & Amount */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Partnership Gift</h2>

            {/* Frequency selection */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <button
                type="button"
                onClick={() => setFrequency("onetime")}
                className="btn"
                style={{
                  backgroundColor:
                    frequency === "onetime"
                      ? "var(--color-espresso)"
                      : "var(--color-stone-light)",
                  color:
                    frequency === "onetime"
                      ? "var(--color-stone)"
                      : "var(--color-espresso)",
                  border: "1px solid rgba(212, 196, 183, 0.8)",
                  borderRadius: "var(--rounded-md)",
                  padding: "12px",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency("monthly")}
                className="btn"
                style={{
                  backgroundColor:
                    frequency === "monthly"
                      ? "var(--color-espresso)"
                      : "var(--color-stone-light)",
                  color:
                    frequency === "monthly"
                      ? "var(--color-stone)"
                      : "var(--color-espresso)",
                  border: "1px solid rgba(212, 196, 183, 0.8)",
                  borderRadius: "var(--rounded-md)",
                  padding: "12px",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Monthly Recurring
              </button>
            </div>

            <div className={styles.selectionGrid}>
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`${styles.selectorCard} ${
                    !useCustom && selectedTierId === tier.id
                      ? styles.selectorCardSelected
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTierId(tier.id);
                    setUseCustom(false);
                    setGeneralError("");
                    setErrors({});
                  }}
                  role="radio"
                  aria-checked={!useCustom && selectedTierId === tier.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      setSelectedTierId(tier.id);
                      setUseCustom(false);
                    }
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 className={styles.selectorTitle}>{tier.name}</h3>
                  </div>
                  <p className={styles.selectorPrice}>
                    £{tier.amount.toFixed(2)}
                    {frequency === "monthly" ? " / mo" : ""}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "16px",
                border: "1px solid rgba(212, 196, 183, 0.6)",
                borderRadius: "var(--rounded-md)",
                padding: "20px",
                backgroundColor: useCustom ? "#ffffff" : "var(--color-stone-light)",
                borderColor: useCustom ? "var(--color-bronze)" : "rgba(212, 196, 183, 0.6)",
                cursor: "pointer",
                boxShadow: useCustom
                  ? "var(--shadow-luxurious-md)"
                  : "var(--shadow-luxurious-sm)",
                transition: "all 0.3s ease",
              }}
              onClick={() => {
                setUseCustom(true);
                setGeneralError("");
                setErrors({});
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  setUseCustom(true);
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "15px", fontWeight: "600" }}>Custom Amount:</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(58,46,38,0.3)",
                    flex: 1,
                  }}
                >
                  <span style={{ marginRight: "4px" }}>£</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      padding: "8px 0",
                      width: "100%",
                      outline: "none",
                    }}
                    required={useCustom}
                  />
                  {frequency === "monthly" && (
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(58, 46, 38, 0.6)",
                        marginLeft: "6px",
                      }}
                    >
                      / month
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Contact Info */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Patron Details</h2>
            <div className={styles.fieldGrid}>
              <div
                className={styles.fieldGrid2}
                style={{ display: "grid", gap: "20px" }}
              >
                <div>
                  <label htmlFor="first-name" className={styles.label}>
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    className="input-underlined"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors({ ...errors, firstName: "" });
                    }}
                  />
                  {errors.firstName && (
                    <span className={styles.fieldErrorText}>{errors.firstName}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="last-name" className={styles.label}>
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    className="input-underlined"
                    required
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors({ ...errors, lastName: "" });
                    }}
                  />
                  {errors.lastName && (
                    <span className={styles.fieldErrorText}>{errors.lastName}</span>
                  )}
                </div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-underlined"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                />
                {errors.email && (
                  <span className={styles.fieldErrorText}>{errors.email}</span>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Secure Payment Flow */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Secure Payment</h2>
            <div
              style={{
                backgroundColor: "var(--color-stone-light)",
                border: "1px solid rgba(212, 196, 183, 0.6)",
                borderRadius: "var(--rounded-md)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--color-bronze)" }}>
                  lock
                </span>
                <span style={{ fontWeight: 600, fontSize: "15px" }}>
                  Hosted Stripe Checkout
                </span>
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-charcoal)" }}>
                You will be redirected to the official encrypted Stripe payment page to complete your contribution securely. We support cards, Apple Pay, Google Pay, and bank payments.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  fontSize: "12px",
                  color: "rgba(58, 46, 38, 0.7)",
                  marginTop: "8px",
                }}
              >
                <span>✓ 256-Bit SSL Encryption</span>
                <span>✓ PCI DSS Compliant</span>
                {frequency === "monthly" && <span>✓ Cancel Anytime</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className={styles.summaryArea}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Partnership Summary</h2>
            <div className={styles.summaryList}>
              <div className={styles.summaryItem}>
                <div>
                  <div className={styles.summaryItemText}>
                    {frequency === "monthly"
                      ? "Monthly Recurring Partnership"
                      : "One-Time Contribution"}
                  </div>
                  <div className={styles.summaryItemSubtext}>
                    {useCustom ? "Custom Partnership Support" : description}
                  </div>
                </div>
                <div>
                  £{contributionAmount.toFixed(2)}
                  {frequency === "monthly" ? "/mo" : ""}
                </div>
              </div>
            </div>

            <div className={styles.totalRow}>
              <span>Total {frequency === "monthly" ? "Per Month" : "Due Today"}</span>
              <span>
                £{contributionAmount.toFixed(2)}
                {frequency === "monthly" ? "/mo" : ""}
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "18px", marginTop: "16px" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Connecting to Checkout...</span>
              ) : frequency === "monthly" ? (
                `Proceed to Stripe (£${contributionAmount.toFixed(2)}/mo)`
              ) : (
                `Proceed to Stripe (£${contributionAmount.toFixed(2)})`
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function PartnershipCheckout() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Suspense
          fallback={
            <div
              className={styles.checkoutContainer}
              style={{ textAlign: "center", padding: "100px 0" }}
            >
              <p>Loading partnership details...</p>
            </div>
          }
        >
          <PartnershipCheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
