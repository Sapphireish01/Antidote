"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { merchAPI } from "@/lib/api";
import styles from "../checkout.module.css";

function PreorderCheckoutContent() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
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
    async function loadItem() {
      setLoadingProduct(true);
      const requestedId = searchParams.get("item");
      const res = await merchAPI.getMerch();
      if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
        let matched = null;
        if (requestedId) {
          matched = res.data.find(
            (m) =>
              String(m.id) === requestedId ||
              m.name.toLowerCase().replace(/\s+/g, "-") === requestedId.toLowerCase()
          );
        }
        const chosen = matched || res.data[0];
        setProduct({
          id: String(chosen.id),
          name: chosen.name,
          price: parseFloat(chosen.price) || 0,
          details: `${chosen.colorway ? `Color: ${chosen.colorway}` : ""}${chosen.material ? ` · ${chosen.material}` : ""}`,
          shippingDisplay: chosen.shipping ? `Ships ${chosen.shipping}` : "Standard preorder dispatch",
          status: "available",
        });
      } else {
        setProduct(null);
      }
      setLoadingProduct(false);
    }
    loadItem();
  }, [searchParams]);

  const isSoldOut = product?.status === "sold-out";
  const subtotal = product ? product.price : 0;
  const shipping = isSoldOut || !product ? 0 : 8.50;
  const total = isSoldOut || !product ? 0 : subtotal + shipping;

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

    if (!product) {
      setGeneralError("Please choose a valid merchandise artifact to preorder.");
      return;
    }

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
      <div className={styles.headerArea}>
        <span className={styles.preorderBadge}>EXCLUSIVE PREORDER</span>
        <h1 className={`${styles.mainHeading} font-editorial`}>Reserve Your Artifact</h1>
        <p className="text-body-md" style={{ color: "rgba(60, 42, 33, 0.7)" }}>
          Limited pieces. Complete your details below to secure your piece.
        </p>
      </div>

      {generalError && (
        <div className={styles.generalErrorBanner} role="alert">
          <span className="material-symbols-outlined">error</span>
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.checkoutLayout} noValidate>
        {/* Form Inputs Area */}
        <div className={styles.formArea}>
          {/* Shipping Address */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>1. Shipping Destination</h2>
            <div className={styles.formGrid}>
              <div>
                <label htmlFor="firstName" className={styles.label}>First Name</label>
                <input 
                  id="firstName" 
                  type="text" 
                  placeholder="John" 
                  className="input-underlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label htmlFor="lastName" className={styles.label}>Last Name</label>
                <input 
                  id="lastName" 
                  type="text" 
                  placeholder="Doe" 
                  className="input-underlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required 
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label htmlFor="address" className={styles.label}>Delivery Address</label>
                <input 
                  id="address" 
                  type="text" 
                  placeholder="123 Kingdom Way, Apt 4B" 
                  className="input-underlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label htmlFor="city" className={styles.label}>City</label>
                <input 
                  id="city" 
                  type="text" 
                  placeholder="London" 
                  className="input-underlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label htmlFor="postcode" className={styles.label}>Postcode / ZIP</label>
                <input 
                  id="postcode" 
                  type="text" 
                  placeholder="W11 2AY" 
                  className="input-underlined"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  required 
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>2. Payment Method</h2>
            <div className={styles.paymentNotice}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "var(--color-bronze)" }}>lock</span>
              <span>Encrypted payment. Card will be charged immediately upon reservation.</span>
            </div>

            <div className={styles.formGrid}>
              <div style={{ gridColumn: "span 2" }}>
                <label htmlFor="cardholderName" className={styles.label}>Name on Card</label>
                <input 
                  id="cardholderName" 
                  type="text" 
                  placeholder="John Doe" 
                  className={`input-underlined ${errors.cardholderName ? styles.inputError : ""}`}
                  value={cardholderName}
                  onChange={(e) => {
                    setCardholderName(e.target.value);
                    if (errors.cardholderName) setErrors({ ...errors, cardholderName: "" });
                  }}
                  required 
                  disabled={isSoldOut}
                  aria-invalid={errors.cardholderName ? "true" : "false"}
                  aria-describedby={errors.cardholderName ? "name-error" : undefined}
                />
                {errors.cardholderName && (
                  <span id="name-error" className={styles.fieldErrorText}>{errors.cardholderName}</span>
                )}
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label htmlFor="cardNumber" className={styles.label}>Card Number</label>
                <input 
                  id="cardNumber" 
                  type="text" 
                  placeholder="4000 1234 5678 9010" 
                  className={`input-underlined ${errors.cardNumber ? styles.inputError : ""}`}
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" });
                  }}
                  required 
                  disabled={isSoldOut}
                  aria-invalid={errors.cardNumber ? "true" : "false"}
                  aria-describedby={errors.cardNumber ? "card-error" : undefined}
                />
                {errors.cardNumber && (
                  <span id="card-error" className={styles.fieldErrorText}>{errors.cardNumber}</span>
                )}
              </div>
              <div>
                <label htmlFor="expiry" className={styles.label}>Expiry (MM/YY)</label>
                <input 
                  id="expiry" 
                  type="text" 
                  placeholder="08/27" 
                  className={`input-underlined ${errors.expiry ? styles.inputError : ""}`}
                  maxLength={5} 
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

        {/* Order Summary */}
        <div className={styles.summaryArea}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            {loadingProduct ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ color: "var(--color-espresso)", fontSize: "14px" }}>
                  Loading artifact details...
                </p>
              </div>
            ) : !product ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <p style={{ color: "var(--color-espresso)", fontSize: "14px", marginBottom: "16px" }}>
                  Artifact not cataloged in current collection.
                </p>
                <Link href="/merch" className="btn btn-secondary">
                  Back to Merch Store
                </Link>
              </div>
            ) : isSoldOut ? (
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
                      <div className={styles.summaryItemSubtext} style={{ color: "var(--color-bronze)" }}>
                        {product.shippingDisplay}
                      </div>
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

                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSoldOut ? styles.btnDisabled : ""}`}
                  style={{ width: "100%", padding: "18px" }}
                  disabled={isSoldOut || loadingProduct}
                >
                  Reserve Preorder
                </button>
              </>
            )}
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && product && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <span className={`material-symbols-outlined ${styles.modalIcon}`}>check_circle</span>
            <h2 className={`${styles.modalTitle} font-editorial`}>Preorder Secured</h2>
            <p className={styles.modalText}>
              Thank you. Your preorder of <strong>{product.name}</strong> is reserved. We will email you shipping updates as this artifact is released.
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
