"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../checkout.module.css";

const PRODUCTS = {
  hoodie: { id: "hoodie", name: "The Heavyweight Ritual Hoodie", price: 145, details: "Stone Gray, Size: L", status: "available" },
  vessel: { id: "vessel", name: "The Altar Vessel", price: 48, details: "Matte Espresso Ceramic", status: "sold-out" },
  tote: { id: "tote", name: "Ascension Tote", price: 65, details: "Oat Woven Linen", status: "available" },
  socks: { id: "socks", name: "Grounding Socks", price: 24, details: "Bronze Cotton-Blend", status: "available" },
};

function PreorderCheckoutContent() {
  const searchParams = useSearchParams();
  const [productKey, setProductKey] = useState("hoodie");
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  
  // Card input states
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Validation error states
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const item = searchParams.get("item");
    if (item && PRODUCTS[item]) {
      setProductKey(item);
    }
  }, [searchParams]);

  const product = PRODUCTS[productKey] || PRODUCTS.hoodie;
  const isSoldOut = product.status === "sold-out";
  const subtotal = product.price;
  const shipping = isSoldOut ? 0 : 8.50;
  const total = isSoldOut ? 0 : subtotal + shipping;

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
      setGeneralError("This product preorder has closed. It is currently sold out.");
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
      setGeneralError("Preorder submission failed. Please resolve the highlighted issues below.");
      return;
    }

    setErrors({});
    setIsSuccess(true);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={`${styles.title} font-editorial`}>Preorder Checkout</h1>
      <p className={styles.subtitle}>Secure your craft artifacts before the release.</p>

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
          {/* Step 1: Shipping Address */}
          <div className={styles.section} style={{ opacity: isSoldOut ? 0.5 : 1, pointerEvents: isSoldOut ? "none" : "auto" }}>
            <h2 className={styles.sectionTitle}>1. Shipping Address</h2>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldGrid2} style={{ display: "grid", gap: "20px" }}>
                <div>
                  <label htmlFor="first-name" className={styles.label}>First Name</label>
                  <input id="first-name" type="text" className="input-underlined" required value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isSoldOut} />
                </div>
                <div>
                  <label htmlFor="last-name" className={styles.label}>Last Name</label>
                  <input id="last-name" type="text" className="input-underlined" required value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isSoldOut} />
                </div>
              </div>
              <div>
                <label htmlFor="address" className={styles.label}>Street Address</label>
                <input id="address" type="text" className="input-underlined" placeholder="House number and street name" required value={address} onChange={(e) => setAddress(e.target.value)} disabled={isSoldOut} />
              </div>
              <div className={styles.fieldGrid2} style={{ display: "grid", gap: "20px" }}>
                <div>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input id="city" type="text" className="input-underlined" required value={city} onChange={(e) => setCity(e.target.value)} disabled={isSoldOut} />
                </div>
                <div>
                  <label htmlFor="postcode" className={styles.label}>Postcode</label>
                  <input id="postcode" type="text" className="input-underlined" required value={postcode} onChange={(e) => setPostcode(e.target.value)} disabled={isSoldOut} />
                </div>
              </div>
              <div>
                <label htmlFor="country" className={styles.label}>Country</label>
                <input id="country" type="text" className="input-underlined" defaultValue="United Kingdom" required disabled={isSoldOut} />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Details */}
          <div className={styles.section} style={{ opacity: isSoldOut ? 0.5 : 1, pointerEvents: isSoldOut ? "none" : "auto" }}>
            <h2 className={styles.sectionTitle}>2. Payment Method</h2>
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

        {/* Order Summary */}
        <div className={styles.summaryArea}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            {isSoldOut ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <span className={styles.soldOutBadge} style={{ fontSize: "14px", padding: "8px 16px" }}>Sold Out</span>
                <p className="text-body-md" style={{ color: "var(--color-error)", marginTop: "16px" }}>
                  This product has reached preorder capacity.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.summaryList}>
                  <div className={styles.summaryItem}>
                    <div>
                      <div className={styles.summaryItemText}>{product.name}</div>
                      <div className={styles.summaryItemSubtext}>{product.details}</div>
                    </div>
                    <div>£{product.price.toFixed(2)}</div>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryItemSubtext}>Estimated Shipping</span>
                    <span>£{shipping.toFixed(2)}</span>
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
              style={{ width: "100%", padding: "18px" }}
              disabled={isSoldOut}
            >
              {isSoldOut ? "Preorder Closed" : "Reserve Preorder"}
            </button>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <span className={`material-symbols-outlined ${styles.modalIcon}`}>check_circle</span>
            <h2 className={`${styles.modalTitle} font-editorial`}>Preorder Secured</h2>
            <p className={styles.modalText}>
              Thank you. Your preorder of <strong>{product.name}</strong> is reserved. We will email you shipping updates as the drop releases on October 24.
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

export default function PreorderCheckout() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Suspense fallback={
          <div className={styles.checkoutContainer} style={{ textAlign: "center", padding: "100px 0" }}>
            <p>Loading preorder details...</p>
          </div>
        }>
          <PreorderCheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
