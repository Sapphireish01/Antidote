"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { loginUser } from "@/lib/auth";
import styles from "../admin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginUser(email, password);

    if (result.ok) {
      router.push("/admin");
    } else {
      setLoading(false);
      setError(result.error || "Invalid email or password.");
    }
  };

  return (
    <>
      <Header />
      <main className="w-full">
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <span className={styles.badge}>PORTAL AUTHENTICATION</span>
              <h1 className={`${styles.title} font-editorial`}>Admin Sign-in</h1>
              <p style={{ fontSize: "13px", color: "rgba(58, 46, 38, 0.7)", marginTop: "6px" }}>
                Authorized access for Antidote financial and merchandise managers.
              </p>
            </div>

            {error && (
              <div className={styles.toastError} role="alert">
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>error</span>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", padding: "14px", marginTop: "12px" }}
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Sign In to Admin"}
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
      </main>
      <Footer />
    </>
  );
}
