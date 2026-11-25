"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loginUser, authStorage } from "@/lib/auth";
import styles from "../admin.module.css";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notice, setNotice] = useState("");

  // Check if redirected due to session expiration
  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "expired") {
      setNotice("Your session has timed out for security. Please sign in again.");
    } else if (reason === "unauthorized") {
      setNotice("Please sign in to access the management portal.");
    }
  }, [searchParams]);

  // If already authenticated with a valid token, forward to dashboard
  useEffect(() => {
    if (authStorage.isAuthenticated()) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const result = await loginUser(email.trim(), password);

    if (result.ok) {
      setIsSuccess(true);
      // Brief smooth transition before redirect
      setTimeout(() => {
        router.push("/admin");
      }, 400);
    } else {
      setLoading(false);
      let userMessage = result.error || "Unable to sign in. Please check your credentials.";
      if (
        userMessage.toLowerCase().includes("no active account") ||
        userMessage.toLowerCase().includes("credentials")
      ) {
        userMessage = "The email or password entered is incorrect. Please check and try again.";
      }
      setError(userMessage);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <span className={styles.badge}>MANAGEMENT PORTAL</span>
          <h1 className={`${styles.title} font-editorial`}>Welcome Back</h1>
          <p style={{ fontSize: "13px", color: "rgba(58, 46, 38, 0.7)", marginTop: "6px" }}>
            Sign in to manage partnership giving options, merchandise, and store preorders.
          </p>
        </div>

        {notice && (
          <div className={styles.loginNotice} role="status">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              schedule
            </span>
            <span>{notice}</span>
          </div>
        )}

        {isSuccess && (
          <div className={styles.loginSuccessBanner} role="status">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              check_circle
            </span>
            <span>Access verified. Loading dashboard...</span>
          </div>
        )}

        {error && (
          <div className={styles.toastError} role="alert" style={{ marginBottom: "20px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              required
              disabled={loading || isSuccess}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@antidote.global"
              autoComplete="email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              required
              disabled={loading || isSuccess}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            disabled={loading || isSuccess}
          >
            {loading ? (
              <>
                <span className={styles.btnSpinner} aria-hidden="true"></span>
                <span>Verifying...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  lock_open
                </span>
                <span>Signed In</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              color: "rgba(58, 46, 38, 0.6)",
              textDecoration: "underline",
            }}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <>
      <Header />
      <main className="w-full">
        <Suspense
          fallback={
            <div className={styles.loginContainer}>
              <div className={styles.loginCard} style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ color: "var(--color-espresso)", fontSize: "14px" }}>
                  Loading portal...
                </p>
              </div>
            </div>
          }
        >
          <LoginFormContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
