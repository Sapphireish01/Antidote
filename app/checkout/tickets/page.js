"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../checkout.module.css";

const CITIES = [
  { id: "london", name: "London", venue: "The Tabernacle", date: "Oct 12, 2024", price: 35, status: "available" },
  { id: "manchester", name: "Manchester", venue: "Victoria Warehouse", date: "Oct 19, 2024", price: 30, status: "available" },
  { id: "birmingham", name: "Birmingham", venue: "The Custard Factory", date: "Oct 26, 2024", price: 25, status: "sold-out" },
];

function TicketsCheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedCity, setSelectedCity] = useState("london");
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Card input states
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Validation error states
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam && CITIES.some((c) => c.id === cityParam)) {
      setSelectedCity(cityParam);
    }
  }, [searchParams]);

  const cityData = CITIES.find((c) => c.id === selectedCity);
  const isSoldOut = cityData?.status === "sold-out";
  const ticketPrice = cityData ? cityData.price : 0;
  const subtotal = ticketPrice * quantity;
  const bookingFee = isSoldOut ? 0 : 2.50;
  const total = isSoldOut ? 0 : subtotal + bookingFee;

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

    if (isSoldOut) {
      setGeneralError("This gathering has reached maximum capacity. You cannot book tickets for this city.");
      return;
    }

    if (!cardholderName.trim()) {
      formErrors.cardholderName = "Cardholder name is required.";
    }

    if (!validateCardNumber(cardNumber)) {
      formErrors.cardNumber = "Invalid card number. Please check the digit sequence.";
    }

    if (!validateExpiry(expiry)) {
      formErrors.expiry = "Invalid expiry date. Must be MM/YY and in the future.";
    }

    if (!validateCVV(cvv)) {
      formErrors.cvv = "Invalid CVV. Must be 3 or 4 digits.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setGeneralError("Registration failed. Please resolve the highlighted issues in the form.");
      return;
    }

    setErrors({});
    setIsSuccess(true);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={`${styles.title} font-editorial`}>Event Registration</h1>
      <p className={styles.subtitle}>Secure your place in the upcoming gathering.</p>

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
          {/* Step 1: Select Gathering */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Select Gathering</h2>
            <div className={styles.selectionGrid}>
              {CITIES.map((city) => (
                <div 
                  key={city.id}
                  className={`${styles.selectorCard} ${selectedCity === city.id ? styles.selectorCardSelected : ""} ${city.status === "sold-out" ? styles.selectorCardDisabled : ""}`}
                  onClick={() => {
                    setSelectedCity(city.id);
                    setGeneralError("");
                    setErrors({});
                  }}
                  role="radio"
                  aria-checked={selectedCity === city.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      setSelectedCity(city.id);
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className={styles.selectorTitle}>{city.name}</h3>
                    {city.status === "sold-out" && (
                      <span className={styles.soldOutBadge}>Sold Out</span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: 'rgba(58, 46, 38, 0.6)', marginBottom: '8px' }}>
                    {city.venue}
                  </p>
                  <p className={styles.selectorPrice}>
                    {city.status === "sold-out" ? "—" : `£${city.price}`}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label htmlFor="ticket-quantity" className={styles.label} style={{ marginBottom: 0 }}>Quantity:</label>
              <select 
                id="ticket-quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={isSoldOut}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(58, 46, 38, 0.3)',
                  borderRadius: 'var(--rounded-default)',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-espresso)',
                  opacity: isSoldOut ? 0.5 : 1
                }}
              >
                {[1, 2, 3, 4, 5, 10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 2: Contact Information */}
          <div className={styles.section} style={{ opacity: isSoldOut ? 0.5 : 1, pointerEvents: isSoldOut ? "none" : "auto" }}>
            <h2 className={styles.sectionTitle}>2. Contact Information</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldGrid2} style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label htmlFor="first-name" className={styles.label}>First Name</label>
                  <input id="first-name" type="text" className="input-underlined" required disabled={isSoldOut} />
                </div>
                <div>
                  <label htmlFor="last-name" className={styles.label}>Last Name</label>
                  <input id="last-name" type="text" className="input-underlined" required disabled={isSoldOut} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input id="email" type="email" className="input-underlined" required disabled={isSoldOut} />
              </div>
            </div>
          </div>

          {/* Step 3: Payment Details */}
          <div className={styles.section} style={{ opacity: isSoldOut ? 0.5 : 1, pointerEvents: isSoldOut ? "none" : "auto" }}>
            <h2 className={styles.sectionTitle}>3. Payment Details</h2>
            <div className={styles.fieldGrid} style={{ display: 'grid', gap: '20px' }}>
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
                  disabled={isSoldOut}
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
                  disabled={isSoldOut}
                  aria-invalid={errors.cardNumber ? "true" : "false"}
                  aria-describedby={errors.cardNumber ? "cardnumber-error" : undefined}
                />
                {errors.cardNumber && (
                  <span id="cardnumber-error" className={styles.fieldErrorText}>{errors.cardNumber}</span>
                )}
              </div>
              <div className={styles.fieldGrid3} style={{ display: 'grid', gap: '20px' }}>
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
                    disabled={isSoldOut}
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
                    disabled={isSoldOut}
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

        {/* Summary Panel */}
        <div className={styles.summaryArea}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Gathering Summary</h2>
            {isSoldOut ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <span className={styles.soldOutBadge} style={{ fontSize: '14px', padding: '8px 16px' }}>Sold Out</span>
                <p className="text-body-md" style={{ color: 'var(--color-error)', marginTop: '16px' }}>
                  This gathering is currently at capacity.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.summaryList}>
                  <div className={styles.summaryItem}>
                    <div>
                      <div className={styles.summaryItemText}>Antidote {cityData?.name}</div>
                      <div className={styles.summaryItemSubtext}>{cityData?.venue} — {cityData?.date}</div>
                    </div>
                    <div>£{ticketPrice} x {quantity}</div>
                  </div>
                  <div className={styles.summaryItem}>
                    <div className={styles.summaryItemSubtext}>Booking Fee</div>
                    <div>£{bookingFee.toFixed(2)}</div>
                  </div>
                </div>

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </>
            )}

            <button 
              type="submit" 
              className={`btn btn-primary ${isSoldOut ? styles.btnDisabled : ""}`}
              style={{ width: '100%', padding: '18px' }}
              disabled={isSoldOut}
            >
              {isSoldOut ? "Capacity Reached" : "Complete Registration"}
            </button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <span className={`material-symbols-outlined ${styles.modalIcon}`}>check_circle</span>
            <h2 className={`${styles.modalTitle} font-editorial`}>Pass Reserved</h2>
            <p className={styles.modalText}>
              Your registration for <strong>Antidote {cityData?.name}</strong> is complete. We've sent a digital ticket confirmation email to you.
            </p>
            <Link href="/" className="btn btn-primary" style={{ width: '100%' }}>
              Back to Homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TicketsCheckout() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Suspense fallback={
          <div className={styles.checkoutContainer} style={{ textAlign: "center", padding: "100px 0" }}>
            <p>Loading registration details...</p>
          </div>
        }>
          <TicketsCheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
