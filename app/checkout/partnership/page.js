"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../checkout.module.css";

const TIERS = [
  { id: "25", name: "Equip a Creative", amount: 25, status: "available" },
  { id: "150", name: "Launch a City", amount: 150, status: "available" },
  { id: "500", name: "Sustain the Tribe", amount: 500, status: "available" },
  { id: "1000", name: "Establish a Pillar", amount: 1000, status: "closed" },
];

function PartnershipCheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedTier, setSelectedTier] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Patron details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Card input states
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Validation error states
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const amt = searchParams.get("amount");
    if (amt) {
      const tierExists = TIERS.find((t) => t.id === amt);
      if (tierExists) {
        setSelectedTier(amt);
        setUseCustom(false);
      } else {
        setCustomAmount(amt);
        setUseCustom(true);
      }
    }
  }, [searchParams]);

  const activeTier = TIERS.find((t) => t.id === selectedTier);
  const isClosed = !useCustom && activeTier?.status === "closed";
  const contributionAmount = useCustom ? Number(customAmount) || 0 : activeTier ? activeTier.amount : 0;
  const description = useCustom ? "Custom Partnership Support" : activeTier ? activeTier.name : "";

  // Luhn algorithm check
  const validateCardNumber = (number) => {
    const sanitized = number.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (sanitized.length < 13 || sanitized.length > 19) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i), 10);
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Card Expiry check (MM/YY)
  const validateExpiry = (exp) => {
    const match = exp.trim().match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
    if (!match) return false;
    const month = parseInt(match[1], 10);
    const year = parseInt("20" + match[2], 10);
    const now = new Date();
    const expiryDate = new Date(year, month - 1, 1);
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    return expiryDate >= currentMonthDate;
  };

  const validateCVV = (val) => {
    return /^[0-9]{3,4}$/.test(val.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    setGeneralError("");

    if (isClosed) {
      setGeneralError("Stewardship Cap Reached: Pillar investments are currently closed for Chapter IV. Please select another tier.");
      return;
    }

    if (contributionAmount <= 0) {
      setGeneralError("Partnership amount must be greater than zero.");
      return;
    }

    if (!cardholderName.trim()) {
      formErrors.cardholderName = "Cardholder name is required.";
    }

    if (!validateCardNumber(cardNumber)) {
      formErrors.cardNumber = "Invalid card number. Please check the digits.";
    }

    if (!validateExpiry(expiry)) {
      formErrors.expiry = "Invalid expiry date. Must be MM/YY and in the future.";
    }

    if (!validateCVV(cvv)) {
      formErrors.cvv = "Invalid CVV. Must be 3 or 4 digits.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setGeneralError("Partnership processing failed. Please resolve the highlighted errors.");
      return;
    }

    setErrors({});
    setIsSuccess(true);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={`${styles.title} font-editorial`}>Partner With Us</h1>
      <p className={styles.subtitle}>Empower Kingdom-focused artists and cultural renewal.</p>

      {/* Accessible Live Region for Screen Readers */}
      <div aria-live="assertive" className={styles.liveRegion} style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
        {generalError}
      </div>

      {generalError && (
        <div className={styles.errorBanner} role="alert">
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>error</span>
          <p>{generalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.layout}>
        <div className={styles.formArea}>
          {/* Step 1: Contribution Amount */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Support Tier</h2>
            
            <div className={styles.selectionGrid}>
              {TIERS.map((tier) => (
                <div 
                  key={tier.id}
                  className={`${styles.selectorCard} ${(!useCustom && selectedTier === tier.id) ? styles.selectorCardSelected : ""} ${tier.status === "closed" ? styles.selectorCardDisabled : ""}`}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    setUseCustom(false);
                    setGeneralError("");
                    setErrors({});
                  }}
                  role="radio"
                  aria-checked={!useCustom && selectedTier === tier.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      setSelectedTier(tier.id);
                      setUseCustom(false);
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className={styles.selectorTitle}>{tier.name}</h3>
                    {tier.status === "closed" && (
                      <span className={styles.soldOutBadge}>Cap Reached</span>
                    )}
                  </div>
                  <p className={styles.selectorPrice}>
                    {tier.status === "closed" ? "—" : `£${tier.amount}`}
                  </p>
                </div>
              ))}
            </div>

            <div 
              style={{
                border: "1px solid rgba(212, 196, 183, 0.6)",
                borderRadius: "var(--rounded-md)",
                padding: "24px",
                backgroundColor: useCustom ? "#ffffff" : "var(--color-stone-light)",
                borderColor: useCustom ? "var(--color-bronze)" : "rgba(212, 196, 183, 0.6)",
                cursor: "pointer",
                boxShadow: useCustom ? "var(--shadow-luxurious-md)" : "var(--shadow-luxurious-sm)",
                transition: "all 0.3s ease"
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
                <span style={{ fontSize: "16px", fontWeight: "600" }}>Custom Amount:</span>
                <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(58,46,38,0.3)", flex: 1 }}>
                  <span style={{ marginRight: "4px" }}>£</span>
                  <input 
                    type="number" 
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      padding: "8px 0",
                      width: "100%",
                      outline: "none"
                    }}
                    required={useCustom}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Contact Info */}
          <div className={styles.section} style={{ opacity: isClosed ? 0.5 : 1, pointerEvents: isClosed ? "none" : "auto" }}>
            <h2 className={styles.sectionTitle}>2. Patron Details</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldGrid2} style={{ display: "grid", gap: "20px" }}>
                <div>
                  <label htmlFor="first-name" className={styles.label}>First Name</label>
                  <input id="first-name" type="text" className="input-underlined" required value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isClosed} />
                </div>
                <div>
                  <label htmlFor="last-name" className={styles.label}>Last Name</label>
                  <input id="last-name" type="text" className="input-underlined" required value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isClosed} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input id="email" type="email" className="input-underlined" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isClosed} />
              </div>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className={styles.section} style={{ opacity: isClosed ? 0.5 : 1, pointerEvents: isClosed ? "none" : "auto" }}>
            <h2 className={styles.sectionTitle}>3. Payment Details</h2>
            <div className={styles.fieldGrid} style={{ display: "grid", gap: "20px" }}>
              <div>
                <label htmlFor="cardholder" className={styles.label}>Cardholder Name</label>
                <input 
                  id="cardholder" 
                  type="text" 
                  className={`input-underlined ${errors.cardholderName ? styles.inputError : ""}`} 
                  value={cardholderName}
                  onChange={(e) => {
                    setCardholderName(e.target.value);
                    if (errors.cardholderName) setErrors({ ...errors, cardholderName: "" });
                  }}
                  required 
                  disabled={isClosed}
                  aria-invalid={errors.cardholderName ? "true" : "false"}
                  aria-describedby={errors.cardholderName ? "cardholder-error" : undefined}
                />
                {errors.cardholderName && (
                  <span id="cardholder-error" className={styles.fieldErrorText}>{errors.cardholderName}</span>
                )}
              </div>
              <div>
                <label htmlFor="cardnumber" className={styles.label}>Card Number</label>
                <input 
                  id="cardnumber" 
                  type="text" 
                  placeholder="•••• •••• •••• ••••" 
                  className={`input-underlined ${errors.cardNumber ? styles.inputError : ""}`}
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" });
                  }}
                  required 
                  disabled={isClosed}
                  aria-invalid={errors.cardNumber ? "true" : "false"}
                  aria-describedby={errors.cardNumber ? "cardnumber-error" : undefined}
                />
                {errors.cardNumber && (
                  <span id="cardnumber-error" className={styles.fieldErrorText}>{errors.cardNumber}</span>
                )}
              </div>
              <div className={styles.fieldGrid3} style={{ display: "grid", gap: "20px" }}>
                <div>
                  <label htmlFor="expiry" className={styles.label}>Expiry Date</label>
                  <input 
                    id="expiry" 
                    type="text" 
                    placeholder="MM/YY" 
                    className={`input-underlined ${errors.expiry ? styles.inputError : ""}`}
                    value={expiry}
                    onChange={(e) => {
                      setExpiry(e.target.value);
                      if (errors.expiry) setErrors({ ...errors, expiry: "" });
                    }}
                    required 
                    disabled={isClosed}
                    aria-invalid={errors.expiry ? "true" : "false"}
                    aria-describedby={errors.expiry ? "expiry-error" : undefined}
                  />
                  {errors.expiry && (
                    <span id="expiry-error" className={styles.fieldErrorText}>{errors.expiry}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="cvv" className={styles.label}>CVV</label>
                  <input 
                    id="cvv" 
                    type="text" 
                    placeholder="•••" 
                    className={`input-underlined ${errors.cvv ? styles.inputError : ""}`}
                    maxLength={4} 
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value);
                      if (errors.cvv) setErrors({ ...errors, cvv: "" });
                    }}
                    required 
                    disabled={isClosed}
                    aria-invalid={errors.cvv ? "true" : "false"}
                    aria-describedby={errors.cvv ? "cvv-error" : undefined}
                  />
                  {errors.cvv && (
                    <span id="cvv-error" className={styles.fieldErrorText}>{errors.cvv}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className={styles.summaryArea}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Partnership Summary</h2>
            {isClosed ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <span className={styles.soldOutBadge} style={{ fontSize: "14px", padding: "8px 16px" }}>Cap Reached</span>
                <p className="text-body-md" style={{ color: "var(--color-error)", marginTop: "16px" }}>
                  This stewardship tier is currently closed.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.summaryList}>
                  <div className={styles.summaryItem}>
                    <div>
                      <div className={styles.summaryItemText}>Antidote Patronage</div>
                      <div className={styles.summaryItemSubtext}>
                        {useCustom ? "One-off Contribution" : description}
                      </div>
                    </div>
                    <div>£{contributionAmount.toFixed(2)}</div>
                  </div>
                </div>

                <div className={styles.totalRow}>
                  <span>Total Contribution</span>
                  <span>£{contributionAmount.toFixed(2)}</span>
                </div>
              </>
            )}

            <button 
              type="submit" 
              className={`btn btn-primary ${isClosed ? styles.btnDisabled : ""}`}
              style={{ width: "100%", padding: "18px" }}
              disabled={isClosed}
            >
              {isClosed ? "Cap Reached" : "Process Partnership"}
            </button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <span className={`material-symbols-outlined ${styles.modalIcon}`}>favorite</span>
            <h2 className={`${styles.modalTitle} font-editorial`}>Thank You</h2>
            <p className={styles.modalText}>
              We are deeply grateful. Your partnership contribution of <strong>£{contributionAmount.toFixed(2)}</strong> has been processed successfully. You will receive email updates about our project deployments.
            </p>
            <Link href="/" className="btn btn-primary" style={{ width: "100%" }}>
              Back to Homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PartnershipCheckout() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Suspense fallback={
          <div className={styles.checkoutContainer} style={{ textAlign: "center", padding: "100px 0" }}>
            <p>Loading partnership details...</p>
          </div>
        }>
          <PartnershipCheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
