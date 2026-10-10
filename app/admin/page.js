"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { authStorage, logoutUser } from "@/lib/auth";
import { giftAPI, merchAPI } from "@/lib/api";
import styles from "./admin.module.css";

export default function AdminDashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState("gifts"); // "gifts" | "merch"
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  // Gifts state
  const [gifts, setGifts] = useState([]);
  const [loadingGifts, setLoadingGifts] = useState(false);
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [submittingGift, setSubmittingGift] = useState(false);

  // Merch state
  const [merchList, setMerchList] = useState([]);
  const [loadingMerch, setLoadingMerch] = useState(false);
  const [submittingMerch, setSubmittingMerch] = useState(false);
  const [merchForm, setMerchForm] = useState({
    name: "",
    detail: "",
    colorway: "",
    material: "",
    shipping: "",
    price: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  // Verify auth session
  useEffect(() => {
    const accessToken = authStorage.getAccessToken();
    const currentUser = authStorage.getUser();

    if (!accessToken) {
      router.push("/admin/login");
      return;
    }

    setToken(accessToken);
    setUser(currentUser);
  }, [router]);

  // Load initial data
  useEffect(() => {
    if (token) {
      loadGifts();
      loadMerch();
    }
  }, [token]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/admin/login");
  };

  /* =========================================================================
   * Gift Management Handlers
   * ========================================================================= */
  const loadGifts = async () => {
    setLoadingGifts(true);
    const res = await giftAPI.getGifts();
    setLoadingGifts(false);
    if (res.ok && Array.isArray(res.data)) {
      setGifts(res.data);
    } else {
      showToast("error", res.error || "Failed to load partnership gifts.");
    }
  };

  const handleCreateGift = async (e) => {
    e.preventDefault();
    if (!giftName.trim() || !giftPrice.trim()) {
      showToast("error", "Please provide both gift name and price.");
      return;
    }

    setSubmittingGift(true);
    const res = await giftAPI.createGift(
      { name: giftName, price: giftPrice },
      token
    );
    setSubmittingGift(false);

    if (res.ok) {
      showToast("success", `Partnership gift "${giftName}" created successfully.`);
      setGiftName("");
      setGiftPrice("");
      loadGifts();
    } else {
      showToast("error", res.error || "Could not create gift. Duplicate names are not permitted.");
    }
  };

  const handleDeleteGift = async (giftId, giftName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the partnership gift "${giftName}"?`
    );
    if (!confirmDelete) return;

    const res = await giftAPI.deleteGift(giftId, token);
    if (res.ok) {
      showToast("success", `Gift "${giftName}" deleted.`);
      loadGifts();
    } else {
      showToast("error", res.error || "Failed to delete partnership gift.");
    }
  };

  /* =========================================================================
   * Merch Management Handlers
   * ========================================================================= */
  const loadMerch = async () => {
    setLoadingMerch(true);
    const res = await merchAPI.getMerch();
    setLoadingMerch(false);
    if (res.ok && Array.isArray(res.data)) {
      setMerchList(res.data);
    } else {
      showToast("error", res.error || "Failed to load merchandise items.");
    }
  };

  const handleCreateMerch = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      showToast("error", "Please select an image file for photo_reference.");
      return;
    }

    const formData = new FormData();
    formData.append("name", merchForm.name);
    formData.append("detail", merchForm.detail);
    formData.append("colorway", merchForm.colorway);
    formData.append("material", merchForm.material);
    formData.append("shipping", merchForm.shipping);
    formData.append("price", merchForm.price);
    formData.append("photo_reference", selectedImage);

    setSubmittingMerch(true);
    const res = await merchAPI.createMerch(formData, token);
    setSubmittingMerch(false);

    if (res.ok) {
      showToast("success", `Merchandise "${merchForm.name}" created successfully.`);
      setMerchForm({
        name: "",
        detail: "",
        colorway: "",
        material: "",
        shipping: "",
        price: "",
      });
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      loadMerch();
    } else {
      showToast("error", res.error || "Could not create merchandise. Check fields and try again.");
    }
  };

  const handleDeleteMerch = async (merchId, merchName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete merchandise item "${merchName}"?`
    );
    if (!confirmDelete) return;

    const res = await merchAPI.deleteMerch(merchId, token);
    if (res.ok) {
      showToast("success", `Merchandise "${merchName}" deleted.`);
      loadMerch();
    } else {
      showToast("error", res.error || "Failed to delete merchandise item.");
    }
  };

  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <p>Verifying admin authorization...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full">
        <div className={styles.adminContainer}>
          {/* Top Bar */}
          <div className={styles.topBar}>
            <div>
              <span className={styles.badge}>COMMAND SANCTUARY</span>
              <h1 className={`${styles.title} font-editorial`}>Admin Dashboard</h1>
            </div>

            <div className={styles.userSection}>
              {user && (
                <div className={styles.userInfo}>
                  <strong>
                    {user.first_name} {user.last_name}
                  </strong>
                  <br />
                  <span>{user.email}</span>
                </div>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: "8px 16px", fontSize: "12px" }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Feedback Toast */}
          {toast && (
            <div
              className={
                toast.type === "success" ? styles.toastSuccess : styles.toastError
              }
              role="alert"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                {toast.type === "success" ? "check_circle" : "error"}
              </span>
              <span>{toast.message}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className={styles.navTabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${
                activeTab === "gifts" ? styles.activeTabBtn : ""
              }`}
              onClick={() => setActiveTab("gifts")}
            >
              Partnership Gifts ({gifts.length})
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${
                activeTab === "merch" ? styles.activeTabBtn : ""
              }`}
              onClick={() => setActiveTab("merch")}
            >
              Merchandise Catalog ({merchList.length})
            </button>
          </div>

          {/* =========================================================================
           * Tab 1: Partnership Gifts Section
           * ========================================================================= */}
          {activeTab === "gifts" && (
            <div className={styles.sectionGrid}>
              {/* Left Column: Create Gift */}
              <div className={styles.formCard}>
                <h2 className={styles.cardTitle}>Create Partnership Gift</h2>
                <p className={styles.cardSubtitle}>
                  Endpoint: <code>POST /finance/gift/</code>. Names must be unique.
                </p>

                <form onSubmit={handleCreateGift}>
                  <div className={styles.formGroup}>
                    <label htmlFor="gift-name" className={styles.label}>
                      Gift Name
                    </label>
                    <input
                      id="gift-name"
                      type="text"
                      className={styles.input}
                      required
                      placeholder="e.g. City Assembly"
                      value={giftName}
                      onChange={(e) => setGiftName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="gift-price" className={styles.label}>
                      Price (£ GBP)
                    </label>
                    <input
                      id="gift-price"
                      type="number"
                      step="0.01"
                      min="1"
                      className={styles.input}
                      required
                      placeholder="50.00"
                      value={giftPrice}
                      onChange={(e) => setGiftPrice(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "14px" }}
                    disabled={submittingGift}
                  >
                    {submittingGift ? "Creating Gift..." : "Create Gift"}
                  </button>
                </form>
              </div>

              {/* Right Column: Manage Gifts Table */}
              <div className={styles.tableCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 className={styles.cardTitle}>Platform Partnership Gifts</h2>
                  <button
                    type="button"
                    onClick={loadGifts}
                    className="btn btn-secondary"
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                  >
                    Refresh
                  </button>
                </div>

                {loadingGifts ? (
                  <p className={styles.emptyState}>Loading gifts from server...</p>
                ) : gifts.length === 0 ? (
                  <p className={styles.emptyState}>No gifts registered on the platform yet.</p>
                ) : (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Gift Name</th>
                        <th>Price</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gifts.map((gift) => (
                        <tr key={gift.id}>
                          <td>
                            <strong>#{gift.id}</strong>
                          </td>
                          <td>{gift.name}</td>
                          <td>£{parseFloat(gift.price).toFixed(2)}</td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              type="button"
                              onClick={() => handleDeleteGift(gift.id, gift.name)}
                              className={styles.deleteBtn}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
           * Tab 2: Merchandise Catalog Section
           * ========================================================================= */}
          {activeTab === "merch" && (
            <div className={styles.sectionGrid}>
              {/* Left Column: Create Merch */}
              <div className={styles.formCard}>
                <h2 className={styles.cardTitle}>Add Merchandise Artifact</h2>
                <p className={styles.cardSubtitle}>
                  Endpoint: <code>POST /finance/merch/</code> (Multipart/Form-Data).
                </p>

                <form onSubmit={handleCreateMerch}>
                  <div className={styles.formGroup}>
                    <label htmlFor="merch-name" className={styles.label}>
                      Product Name
                    </label>
                    <input
                      id="merch-name"
                      type="text"
                      className={styles.input}
                      required
                      placeholder="e.g. Ascension Tote"
                      value={merchForm.name}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="merch-detail" className={styles.label}>
                      Product Detail / Description
                    </label>
                    <textarea
                      id="merch-detail"
                      className={`${styles.input} ${styles.textarea}`}
                      required
                      placeholder="Oat Woven Linen. A durable and premium bag crafted for everyday utility..."
                      value={merchForm.detail}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, detail: e.target.value })
                      }
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <div className={styles.formGroup}>
                      <label htmlFor="merch-colorway" className={styles.label}>
                        Colorway
                      </label>
                      <input
                        id="merch-colorway"
                        type="text"
                        className={styles.input}
                        required
                        placeholder="e.g. Oat"
                        value={merchForm.colorway}
                        onChange={(e) =>
                          setMerchForm({ ...merchForm, colorway: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="merch-material" className={styles.label}>
                        Material
                      </label>
                      <input
                        id="merch-material"
                        type="text"
                        className={styles.input}
                        required
                        placeholder="e.g. Premium Linen Blend"
                        value={merchForm.material}
                        onChange={(e) =>
                          setMerchForm({ ...merchForm, material: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <div className={styles.formGroup}>
                      <label htmlFor="merch-shipping" className={styles.label}>
                        Shipping Date
                      </label>
                      <input
                        id="merch-shipping"
                        type="date"
                        className={styles.input}
                        required
                        value={merchForm.shipping}
                        onChange={(e) =>
                          setMerchForm({ ...merchForm, shipping: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="merch-price" className={styles.label}>
                        Price (£ GBP)
                      </label>
                      <input
                        id="merch-price"
                        type="number"
                        step="0.01"
                        min="1"
                        className={styles.input}
                        required
                        placeholder="65.00"
                        value={merchForm.price}
                        onChange={(e) =>
                          setMerchForm({ ...merchForm, price: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="merch-photo" className={styles.label}>
                      Photo Reference (Image File)
                    </label>
                    <input
                      id="merch-photo"
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className={styles.input}
                      required
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedImage(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "14px" }}
                    disabled={submittingMerch}
                  >
                    {submittingMerch ? "Uploading Merch..." : "Create Merch"}
                  </button>
                </form>
              </div>

              {/* Right Column: Manage Merch Table */}
              <div className={styles.tableCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 className={styles.cardTitle}>Registered Merch Products</h2>
                  <button
                    type="button"
                    onClick={loadMerch}
                    className="btn btn-secondary"
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                  >
                    Refresh
                  </button>
                </div>

                {loadingMerch ? (
                  <p className={styles.emptyState}>Loading merch items from server...</p>
                ) : merchList.length === 0 ? (
                  <p className={styles.emptyState}>No merchandise registered in the system yet.</p>
                ) : (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Colorway</th>
                        <th>Ships</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {merchList.map((item) => (
                        <tr key={item.id}>
                          <td>
                            {item.photo_reference ? (
                              <img
                                src={item.photo_reference}
                                alt={item.name}
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  objectFit: "cover",
                                  borderRadius: "var(--rounded-md)",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  backgroundColor: "var(--color-stone)",
                                  borderRadius: "var(--rounded-md)",
                                }}
                              />
                            )}
                          </td>
                          <td>
                            <strong>{item.name}</strong>
                            <div style={{ fontSize: "12px", color: "rgba(58, 46, 38, 0.6)" }}>
                              {item.material}
                            </div>
                          </td>
                          <td>£{parseFloat(item.price).toFixed(2)}</td>
                          <td>{item.colorway}</td>
                          <td>{item.shipping || "TBD"}</td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              type="button"
                              onClick={() => handleDeleteMerch(item.id, item.name)}
                              className={styles.deleteBtn}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
