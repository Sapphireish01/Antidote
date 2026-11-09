"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { authStorage, logoutUser } from "@/lib/auth";
import { giftAPI, merchAPI } from "@/lib/api";
import CustomDropdown from "@/components/CustomDropdown";
import styles from "./admin.module.css";

const GIFT_SORT_OPTIONS = [
  { value: "id-desc", label: "Recently Added", icon: "schedule" },
  { value: "id-asc", label: "First Added", icon: "history" },
  { value: "name-asc", label: "Name (A — Z)", icon: "sort_by_alpha" },
  { value: "name-desc", label: "Name (Z — A)", icon: "sort_by_alpha" },
  { value: "price-asc", label: "Amount: Low to High", icon: "north" },
  { value: "price-desc", label: "Amount: High to Low", icon: "south" },
];

const MERCH_SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A — Z)", icon: "sort_by_alpha" },
  { value: "name-desc", label: "Name (Z — A)", icon: "sort_by_alpha" },
  { value: "price-asc", label: "Price: Low to High", icon: "north" },
  { value: "price-desc", label: "Price: High to Low", icon: "south" },
  { value: "shipping-asc", label: "Shipping Schedule", icon: "local_shipping" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Authentication & Session
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Navigation & View
  const [activeTab, setActiveTab] = useState("gifts"); // "gifts" | "merch"
  const [searchQuery, setSearchQuery] = useState("");
  const [giftSortBy, setGiftSortBy] = useState("id-desc");
  const [merchSortBy, setMerchSortBy] = useState("name-asc");

  // Notifications (Floating Toasts)
  const [toasts, setToasts] = useState([]);

  // Data Collections & Loading States
  const [gifts, setGifts] = useState([]);
  const [loadingGifts, setLoadingGifts] = useState(true);
  const [merchList, setMerchList] = useState([]);
  const [loadingMerch, setLoadingMerch] = useState(true);

  // Slide-over Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State: Gift
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");

  // Form State: Merch
  const [merchForm, setMerchForm] = useState({
    name: "",
    detail: "",
    colorway: "",
    material: "",
    shipping: "",
    price: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Modals
  const [itemToDelete, setItemToDelete] = useState(null); // { type: 'gift' | 'merch', id, name }
  const [isDeleting, setIsDeleting] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null); // { url, name }

  /* =========================================================================
   * Toast System
   * ========================================================================= */
  const addToast = useCallback((type, message) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  /* =========================================================================
   * Auth Verification
   * ========================================================================= */
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

  const handleLogout = () => {
    logoutUser();
    router.push("/admin/login");
  };

  /* =========================================================================
   * Data Fetching
   * ========================================================================= */
  const loadGifts = useCallback(async () => {
    setLoadingGifts(true);
    const res = await giftAPI.getGifts();
    setLoadingGifts(false);
    if (res.ok && Array.isArray(res.data)) {
      setGifts(res.data);
    } else {
      addToast("error", res.error || "Unable to load gifts right now. Please try again.");
    }
  }, [addToast]);

  const loadMerch = useCallback(async () => {
    setLoadingMerch(true);
    const res = await merchAPI.getMerch();
    setLoadingMerch(false);
    if (res.ok && Array.isArray(res.data)) {
      setMerchList(res.data);
    } else {
      addToast("error", res.error || "Unable to load products right now. Please try again.");
    }
  }, [addToast]);

  useEffect(() => {
    if (token) {
      loadGifts();
      loadMerch();
    }
  }, [token, loadGifts, loadMerch]);

  /* =========================================================================
   * Drawer & Image Handlers
   * ========================================================================= */
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    if (submitting) return;
    setIsDrawerOpen(false);
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (lightboxImage) setLightboxImage(null);
        else if (itemToDelete && !isDeleting) setItemToDelete(null);
        else if (isDrawerOpen && !submitting) setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, itemToDelete, lightboxImage, submitting, isDeleting]);

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      addToast("error", "Please choose an image file (such as JPG or PNG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      addToast("error", "The chosen image is larger than 10MB. Please choose a smaller file.");
      return;
    }

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    setSelectedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedImage = (e) => {
    e?.stopPropagation();
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setSelectedImage(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================================
   * Form Submissions
   * ========================================================================= */
  const handleCreateGift = async (e) => {
    e.preventDefault();
    if (!giftName.trim() || !giftPrice.trim()) {
      addToast("error", "Please enter both an option title and amount.");
      return;
    }

    setSubmitting(true);
    const res = await giftAPI.createGift(
      { name: giftName.trim(), price: giftPrice.trim() },
      token
    );
    setSubmitting(false);

    if (res.ok) {
      addToast("success", `"${giftName.trim()}" added to partnership options.`);
      setGiftName("");
      setGiftPrice("");
      setIsDrawerOpen(false);
      loadGifts();
    } else {
      addToast("error", res.error || "Could not save gift. Please choose a different title.");
    }
  };

  const handleCreateMerch = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      addToast("error", "Please add a photo for this product.");
      return;
    }

    const formData = new FormData();
    formData.append("name", merchForm.name.trim());
    formData.append("detail", merchForm.detail.trim());
    formData.append("colorway", merchForm.colorway.trim());
    formData.append("material", merchForm.material.trim());
    formData.append("shipping", merchForm.shipping);
    formData.append("price", merchForm.price);
    formData.append("photo_reference", selectedImage);

    setSubmitting(true);
    const res = await merchAPI.createMerch(formData, token);
    setSubmitting(false);

    if (res.ok) {
      addToast("success", `"${merchForm.name.trim()}" added to the store.`);
      setMerchForm({
        name: "",
        detail: "",
        colorway: "",
        material: "",
        shipping: "",
        price: "",
      });
      clearSelectedImage();
      setIsDrawerOpen(false);
      loadMerch();
    } else {
      addToast("error", res.error || "Could not save product. Please check the details and try again.");
    }
  };

  /* =========================================================================
   * Deletion Handling (Custom Branded Modal)
   * ========================================================================= */
  const confirmDeleteAction = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);

    if (itemToDelete.type === "gift") {
      const res = await giftAPI.deleteGift(itemToDelete.id, token);
      setIsDeleting(false);
      if (res.ok) {
        addToast("success", `"${itemToDelete.name}" has been removed.`);
        setItemToDelete(null);
        loadGifts();
      } else {
        addToast("error", res.error || "Unable to remove gift. Please try again.");
      }
    } else if (itemToDelete.type === "merch") {
      const res = await merchAPI.deleteMerch(itemToDelete.id, token);
      setIsDeleting(false);
      if (res.ok) {
        addToast("success", `"${itemToDelete.name}" has been removed.`);
        setItemToDelete(null);
        loadMerch();
      } else {
        addToast("error", res.error || "Unable to remove product. Please try again.");
      }
    }
  };

  /* =========================================================================
   * Filtered & Sorted Data Calculations
   * ========================================================================= */
  const filteredGifts = useMemo(() => {
    let result = [...gifts];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name?.toLowerCase().includes(query) ||
          String(g.price).includes(query)
      );
    }

    result.sort((a, b) => {
      switch (giftSortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-desc":
          return parseFloat(b.price) - parseFloat(a.price);
        case "id-asc":
          return Number(a.id) - Number(b.id);
        case "id-desc":
        default:
          return Number(b.id) - Number(a.id);
      }
    });

    return result;
  }, [gifts, searchQuery, giftSortBy]);

  const filteredMerch = useMemo(() => {
    let result = [...merchList];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name?.toLowerCase().includes(query) ||
          m.colorway?.toLowerCase().includes(query) ||
          m.material?.toLowerCase().includes(query) ||
          m.detail?.toLowerCase().includes(query) ||
          String(m.price).includes(query)
      );
    }

    result.sort((a, b) => {
      switch (merchSortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-desc":
          return parseFloat(b.price) - parseFloat(a.price);
        case "shipping-asc":
          return (a.shipping || "").localeCompare(b.shipping || "");
        default:
          return 0;
      }
    });

    return result;
  }, [merchList, searchQuery, merchSortBy]);

  // Key KPI metrics
  const minGiftPrice = useMemo(() => {
    if (gifts.length === 0) return 0;
    return Math.min(...gifts.map((g) => parseFloat(g.price) || 0));
  }, [gifts]);

  const maxGiftPrice = useMemo(() => {
    if (gifts.length === 0) return 0;
    return Math.max(...gifts.map((g) => parseFloat(g.price) || 0));
  }, [gifts]);

  const avgMerchPrice = useMemo(() => {
    if (merchList.length === 0) return "0.00";
    const total = merchList.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    return (total / merchList.length).toFixed(2);
  }, [merchList]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "To be announced";
    try {
      const parsed = new Date(dateStr);
      if (isNaN(parsed.getTime())) return dateStr;
      return parsed.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  /* =========================================================================
   * Render Guard for Auth
   * ========================================================================= */
  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px" }}>
        <p style={{ color: "var(--color-espresso)", fontSize: "15px" }}>
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />

      {/* Floating Notifications */}
      <div className={styles.toastContainer} aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${styles.floatingToast} ${
              t.type === "success" ? styles.toastSuccess : styles.toastError
            }`}
            role="alert"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                {t.type === "success" ? "check_circle" : "info"}
              </span>
              <span>{t.message}</span>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              className={styles.toastDismissBtn}
              aria-label="Dismiss notification"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                close
              </span>
            </button>
          </div>
        ))}
      </div>

      <main className="w-full">
        <div className={styles.adminContainer}>
          {/* Top Bar Header */}
          <header className={styles.topBar}>
            <div>
              <span className={styles.badge}>ANTIDOTE SANCTUARY</span>
              <h1 className={`${styles.title} font-editorial`}>Admin Dashboard</h1>
              <p className={styles.subtitle}>
                Manage your community giving options, store merchandise, and preorder schedule.
              </p>
            </div>

            <div className={styles.userSection}>
              <div className={styles.userAvatar}>
                {user?.first_name ? user.first_name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>
                  {user ? `${user.first_name} ${user.last_name}` : "Team Member"}
                </div>
                <div className={styles.userEmail}>{user?.email || "admin@antidote.global"}</div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.signOutBtn}
                title="Sign out"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  logout
                </span>
                <span>Sign Out</span>
              </button>
            </div>
          </header>

          {/* Metric Overview Cards */}
          <section className={styles.metricsGrid} aria-label="Overview summary">
            <div className={styles.metricCard}>
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Giving Options</span>
                <span className={styles.metricValue}>{gifts.length}</span>
                <span className={styles.metricSubtext}>
                  {gifts.length > 0
                    ? `£${minGiftPrice.toFixed(2)} — £${maxGiftPrice.toFixed(2)} options`
                    : "None active"}
                </span>
              </div>
              <div className={styles.metricIconWrap}>
                <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
                  volunteer_activism
                </span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Store Products</span>
                <span className={styles.metricValue}>{merchList.length}</span>
                <span className={styles.metricSubtext}>
                  {merchList.length > 0 ? `Avg. £${avgMerchPrice}` : "Catalog empty"}
                </span>
              </div>
              <div className={styles.metricIconWrap}>
                <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
                  apparel
                </span>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Live Status</span>
                <span className={styles.metricValue} style={{ fontSize: "20px", color: "#2e7d32" }}>
                  Active
                </span>
                <span className={styles.metricSubtext} style={{ color: "rgba(58, 46, 38, 0.6)" }}>
                  All systems operational
                </span>
              </div>
              <div className={styles.metricIconWrap}>
                <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#2e7d32" }}>
                  check_circle
                </span>
              </div>
            </div>
          </section>

          {/* Workspace Controls Header */}
          <div className={styles.workspaceHeader}>
            {/* Tabs */}
            <div className={styles.navTabs} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "gifts"}
                className={`${styles.tabBtn} ${
                  activeTab === "gifts" ? styles.activeTabBtn : ""
                }`}
                onClick={() => {
                  setActiveTab("gifts");
                  setSearchQuery("");
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  card_giftcard
                </span>
                <span>Partnership Gifts</span>
                <span className={styles.tabBadge}>{gifts.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "merch"}
                className={`${styles.tabBtn} ${
                  activeTab === "merch" ? styles.activeTabBtn : ""
                }`}
                onClick={() => {
                  setActiveTab("merch");
                  setSearchQuery("");
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  inventory_2
                </span>
                <span>Store Catalog</span>
                <span className={styles.tabBadge}>{merchList.length}</span>
              </button>
            </div>

            {/* Toolbar Actions */}
            <div className={styles.toolbar}>
              {/* Search */}
              <div className={styles.searchBox}>
                <span className={`material-symbols-outlined ${styles.searchIcon}`}>
                  search
                </span>
                <input
                  type="text"
                  placeholder={
                    activeTab === "gifts"
                      ? "Search gifts by name or amount..."
                      : "Search products by name, color, or material..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={styles.clearSearchBtn}
                    title="Clear search"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      close
                    </span>
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              {activeTab === "gifts" ? (
                <CustomDropdown
                  options={GIFT_SORT_OPTIONS}
                  value={giftSortBy}
                  onChange={setGiftSortBy}
                  icon="sort"
                  ariaLabel="Sort gifts"
                />
              ) : (
                <CustomDropdown
                  options={MERCH_SORT_OPTIONS}
                  value={merchSortBy}
                  onChange={setMerchSortBy}
                  icon="sort"
                  ariaLabel="Sort products"
                />
              )}

              {/* Refresh Button */}
              <button
                type="button"
                onClick={activeTab === "gifts" ? loadGifts : loadMerch}
                className={styles.refreshBtn}
                title="Refresh data"
              >
                <span
                  className={`material-symbols-outlined ${
                    (activeTab === "gifts" ? loadingGifts : loadingMerch)
                      ? styles.refreshIconRotating
                      : ""
                  }`}
                  style={{ fontSize: "16px" }}
                >
                  refresh
                </span>
                <span>Refresh</span>
              </button>

              {/* Primary Add Action */}
              <button
                type="button"
                onClick={openDrawer}
                className={styles.primaryActionBtn}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  add
                </span>
                <span>{activeTab === "gifts" ? "Add Gift Option" : "Add Product"}</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
           * Tab 1: Partnership Gifts Table
           * ========================================================================= */}
          {activeTab === "gifts" && (
            <div className={styles.tableCard}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ width: "90px" }}>Tier</th>
                      <th
                        className={styles.sortableTh}
                        onClick={() =>
                          setGiftSortBy(giftSortBy === "name-asc" ? "name-desc" : "name-asc")
                        }
                      >
                        <div className={styles.thContent}>
                          <span>Title</span>
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                            {giftSortBy === "name-asc"
                              ? "arrow_upward"
                              : giftSortBy === "name-desc"
                              ? "arrow_downward"
                              : "unfold_more"}
                          </span>
                        </div>
                      </th>
                      <th
                        className={styles.sortableTh}
                        onClick={() =>
                          setGiftSortBy(
                            giftSortBy === "price-asc" ? "price-desc" : "price-asc"
                          )
                        }
                      >
                        <div className={styles.thContent}>
                          <span>Giving Amount</span>
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                            {giftSortBy === "price-asc"
                              ? "arrow_upward"
                              : giftSortBy === "price-desc"
                              ? "arrow_downward"
                              : "unfold_more"}
                          </span>
                        </div>
                      </th>
                      <th>Category</th>
                      <th style={{ textAlign: "right", width: "100px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingGifts ? (
                      // 4 Shimmer Skeleton Rows
                      [1, 2, 3, 4].map((i) => (
                        <tr key={i} className={styles.skeletonRow}>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "40px" }}></div>
                          </td>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "180px" }}></div>
                          </td>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "80px" }}></div>
                          </td>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "120px" }}></div>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div
                              className={styles.shimmerBox}
                              style={{ width: "34px", marginLeft: "auto" }}
                            ></div>
                          </td>
                        </tr>
                      ))
                    ) : filteredGifts.length === 0 ? (
                      <tr>
                        <td colSpan="5">
                          <div className={styles.emptyState}>
                            <div className={styles.emptyIconWrap}>
                              <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                                {searchQuery ? "search_off" : "card_giftcard"}
                              </span>
                            </div>
                            <h3 className={styles.emptyTitle}>
                              {searchQuery ? "No matching gifts found" : "No giving options created yet"}
                            </h3>
                            <p className={styles.emptyDesc}>
                              {searchQuery
                                ? `No results match "${searchQuery}". Clear your search or try another word.`
                                : "Add your first partnership option to allow supporters to back the Antidote Movement."}
                            </p>
                            {searchQuery ? (
                              <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="btn btn-secondary"
                                style={{ padding: "8px 16px", fontSize: "13px" }}
                              >
                                Clear Search Filter
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={openDrawer}
                                className="btn btn-primary"
                                style={{ padding: "10px 20px", fontSize: "13px" }}
                              >
                                Add First Gift Option
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredGifts.map((gift) => (
                        <tr key={gift.id}>
                          <td>
                            <span className={styles.idBadge}>Tier {gift.id}</span>
                          </td>
                          <td>
                            <div className={styles.cellMain}>{gift.name}</div>
                            <div className={styles.cellSub}>
                              Visible on the partnership page
                            </div>
                          </td>
                          <td>
                            <span className={styles.priceBadge}>
                              £{parseFloat(gift.price).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <span className={styles.tagPill}>Community Giving</span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div className={styles.rowActions}>
                              <button
                                type="button"
                                onClick={() =>
                                  setItemToDelete({
                                    type: "gift",
                                    id: gift.id,
                                    name: gift.name,
                                  })
                                }
                                className={styles.deleteBtn}
                                title={`Remove "${gift.name}"`}
                              >
                                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
           * Tab 2: Merchandise Catalog Table
           * ========================================================================= */}
          {activeTab === "merch" && (
            <div className={styles.tableCard}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ width: "70px" }}>Photo</th>
                      <th
                        className={styles.sortableTh}
                        onClick={() =>
                          setMerchSortBy(
                            merchSortBy === "name-asc" ? "name-desc" : "name-asc"
                          )
                        }
                      >
                        <div className={styles.thContent}>
                          <span>Product & Story</span>
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                            {merchSortBy === "name-asc"
                              ? "arrow_upward"
                              : merchSortBy === "name-desc"
                              ? "arrow_downward"
                              : "unfold_more"}
                          </span>
                        </div>
                      </th>
                      <th
                        className={styles.sortableTh}
                        onClick={() =>
                          setMerchSortBy(
                            merchSortBy === "price-asc" ? "price-desc" : "price-asc"
                          )
                        }
                      >
                        <div className={styles.thContent}>
                          <span>Price</span>
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                            {merchSortBy === "price-asc"
                              ? "arrow_upward"
                              : merchSortBy === "price-desc"
                              ? "arrow_downward"
                              : "unfold_more"}
                          </span>
                        </div>
                      </th>
                      <th>Color & Material</th>
                      <th
                        className={styles.sortableTh}
                        onClick={() => setMerchSortBy("shipping-asc")}
                      >
                        <div className={styles.thContent}>
                          <span>Shipping Window</span>
                        </div>
                      </th>
                      <th style={{ textAlign: "right", width: "110px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingMerch ? (
                      // 4 Shimmer Skeleton Rows
                      [1, 2, 3, 4].map((i) => (
                        <tr key={i} className={styles.skeletonRow}>
                          <td>
                            <div
                              className={styles.shimmerBox}
                              style={{ width: "52px", height: "52px", borderRadius: "6px" }}
                            ></div>
                          </td>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "200px", marginBottom: "6px" }}></div>
                            <div className={styles.shimmerBox} style={{ width: "130px", height: "12px" }}></div>
                          </td>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "70px" }}></div>
                          </td>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "110px" }}></div>
                          </td>
                          <td>
                            <div className={styles.shimmerBox} style={{ width: "90px" }}></div>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div
                              className={styles.shimmerBox}
                              style={{ width: "34px", marginLeft: "auto" }}
                            ></div>
                          </td>
                        </tr>
                      ))
                    ) : filteredMerch.length === 0 ? (
                      <tr>
                        <td colSpan="6">
                          <div className={styles.emptyState}>
                            <div className={styles.emptyIconWrap}>
                              <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                                {searchQuery ? "search_off" : "apparel"}
                              </span>
                            </div>
                            <h3 className={styles.emptyTitle}>
                              {searchQuery ? "No matching products found" : "No products in store catalog"}
                            </h3>
                            <p className={styles.emptyDesc}>
                              {searchQuery
                                ? `No items match "${searchQuery}". Clear your search or check spelling.`
                                : "Add your first apparel or ritual accessory to the Antidote online store."}
                            </p>
                            {searchQuery ? (
                              <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="btn btn-secondary"
                                style={{ padding: "8px 16px", fontSize: "13px" }}
                              >
                                Clear Search Filter
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={openDrawer}
                                className="btn btn-primary"
                                style={{ padding: "10px 20px", fontSize: "13px" }}
                              >
                                Add First Product
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredMerch.map((item) => (
                        <tr key={item.id}>
                          <td>
                            {item.photo_reference ? (
                              <div
                                className={styles.thumbnailWrap}
                                onClick={() =>
                                  setLightboxImage({
                                    url: item.photo_reference,
                                    name: item.name,
                                  })
                                }
                                title="Click to view full photo"
                              >
                                <img
                                  src={item.photo_reference}
                                  alt={item.name}
                                  className={styles.thumbnailImg}
                                />
                                <div className={styles.thumbnailOverlay}>
                                  <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "18px" }}
                                  >
                                    zoom_in
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.thumbnailWrap}>
                                <div
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "rgba(58, 46, 38, 0.4)",
                                  }}
                                >
                                  <span className="material-symbols-outlined">image</span>
                                </div>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className={styles.cellMain}>{item.name}</div>
                            <div className={styles.cellSub} title={item.detail}>
                              {item.detail || "No description added."}
                            </div>
                          </td>
                          <td>
                            <span className={styles.priceBadge}>
                              £{parseFloat(item.price).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                              <span className={styles.tagPill}>{item.colorway || "Standard"}</span>
                              {item.material && (
                                <span
                                  className={styles.tagPill}
                                  style={{ background: "#ffffff" }}
                                >
                                  {item.material}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className={styles.datePill}>
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "15px", color: "var(--color-bronze)" }}
                              >
                                local_shipping
                              </span>
                              <span>{formatDate(item.shipping)}</span>
                            </span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div className={styles.rowActions}>
                              {item.photo_reference && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setLightboxImage({
                                      url: item.photo_reference,
                                      name: item.name,
                                    })
                                  }
                                  className={styles.actionIconBtn}
                                  title="View full photo"
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                                    visibility
                                  </span>
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  setItemToDelete({
                                    type: "merch",
                                    id: item.id,
                                    name: item.name,
                                  })
                                }
                                className={styles.deleteBtn}
                                title={`Remove "${item.name}"`}
                              >
                                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
       * Slide-Over Drawer for Creation
       * ========================================================================= */}
      <div
        className={`${styles.drawerBackdrop} ${
          isDrawerOpen ? styles.drawerBackdropOpen : ""
        }`}
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
      />

      <aside
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className={styles.drawerHeader}>
          <div>
            <span className={styles.badge}>
              {activeTab === "gifts" ? "PARTNERSHIP" : "STORE COLLECTION"}
            </span>
            <h2 id="drawer-title" className={styles.drawerTitle}>
              {activeTab === "gifts" ? "Add Giving Option" : "Add Store Product"}
            </h2>
            <p className={styles.drawerSubtitle}>
              {activeTab === "gifts"
                ? "Create a new giving tier for supporters to choose on the website."
                : "Add a new apparel or accessory item to the online preorder store."}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className={styles.drawerCloseBtn}
            disabled={submitting}
            aria-label="Close"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              close
            </span>
          </button>
        </div>

        {/* Drawer Body Forms */}
        <div className={styles.drawerBody}>
          {activeTab === "gifts" ? (
            <form id="gift-form" onSubmit={handleCreateGift}>
              <div className={styles.formGroup}>
                <label htmlFor="gift-name" className={styles.label}>
                  Option Title *
                </label>
                <input
                  id="gift-name"
                  type="text"
                  className={styles.input}
                  required
                  placeholder="e.g. Equip a Creative"
                  value={giftName}
                  onChange={(e) => setGiftName(e.target.value)}
                  disabled={submitting}
                />
                <span className={styles.fieldHelper}>
                  Give this giving tier an inspiring name that describes its positive impact.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="gift-price" className={styles.label}>
                  Suggested Amount (£) *
                </label>
                <div className={styles.currencyInputWrap}>
                  <span className={styles.currencyPrefix}>£</span>
                  <input
                    id="gift-price"
                    type="number"
                    step="0.01"
                    min="1"
                    className={`${styles.input} ${styles.currencyInput}`}
                    required
                    placeholder="25.00"
                    value={giftPrice}
                    onChange={(e) => setGiftPrice(e.target.value)}
                    disabled={submitting}
                  />
                </div>
                <span className={styles.fieldHelper}>
                  The contribution amount supporters can choose monthly or as a one-time gift.
                </span>
              </div>
            </form>
          ) : (
            <form id="merch-form" onSubmit={handleCreateMerch}>
              {/* Section 1: Product Information */}
              <div className={styles.formSection}>
                <span className={styles.sectionHeading}>1. Product Information</span>
                <div className={styles.formGroup}>
                  <label htmlFor="merch-name" className={styles.label}>
                    Product Name *
                  </label>
                  <input
                    id="merch-name"
                    type="text"
                    className={styles.input}
                    required
                    placeholder="e.g. The Heavyweight Ritual Hoodie"
                    value={merchForm.name}
                    onChange={(e) => setMerchForm({ ...merchForm, name: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="merch-detail" className={styles.label}>
                    Story & Description *
                  </label>
                  <textarea
                    id="merch-detail"
                    className={`${styles.input} ${styles.textarea}`}
                    required
                    placeholder="Describe the material, tactile feel, and aesthetic design of this piece..."
                    value={merchForm.detail}
                    onChange={(e) => setMerchForm({ ...merchForm, detail: e.target.value })}
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Section 2: Pricing & Options */}
              <div className={styles.formSection}>
                <span className={styles.sectionHeading}>2. Pricing & Options</span>
                <div className={styles.formGroup}>
                  <label htmlFor="merch-price" className={styles.label}>
                    Price (£) *
                  </label>
                  <div className={styles.currencyInputWrap}>
                    <span className={styles.currencyPrefix}>£</span>
                    <input
                      id="merch-price"
                      type="number"
                      step="0.01"
                      min="1"
                      className={`${styles.input} ${styles.currencyInput}`}
                      required
                      placeholder="145.00"
                      value={merchForm.price}
                      onChange={(e) => setMerchForm({ ...merchForm, price: e.target.value })}
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label htmlFor="merch-colorway" className={styles.label}>
                      Color *
                    </label>
                    <input
                      id="merch-colorway"
                      type="text"
                      className={styles.input}
                      required
                      placeholder="e.g. Stone Gray"
                      value={merchForm.colorway}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, colorway: e.target.value })
                      }
                      disabled={submitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="merch-material" className={styles.label}>
                      Material *
                    </label>
                    <input
                      id="merch-material"
                      type="text"
                      className={styles.input}
                      required
                      placeholder="e.g. Organic Cotton"
                      value={merchForm.material}
                      onChange={(e) =>
                        setMerchForm({ ...merchForm, material: e.target.value })
                      }
                      disabled={submitting}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Shipping */}
              <div className={styles.formSection}>
                <span className={styles.sectionHeading}>3. Shipping Schedule</span>
                <div className={styles.formGroup}>
                  <label htmlFor="merch-shipping" className={styles.label}>
                    Estimated Dispatch Date *
                  </label>
                  <input
                    id="merch-shipping"
                    type="date"
                    className={styles.input}
                    required
                    value={merchForm.shipping}
                    onChange={(e) => setMerchForm({ ...merchForm, shipping: e.target.value })}
                    disabled={submitting}
                  />
                  <span className={styles.fieldHelper}>
                    The estimated date when supporters can expect their order to ship.
                  </span>
                </div>
              </div>

              {/* Section 4: Photo */}
              <div className={styles.formSection}>
                <span className={styles.sectionHeading}>4. Product Photo *</span>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />

                {selectedImage && imagePreviewUrl ? (
                  <div className={styles.previewCard}>
                    <img
                      src={imagePreviewUrl}
                      alt="Uploaded preview"
                      className={styles.previewThumb}
                    />
                    <div className={styles.previewInfo}>
                      <div className={styles.previewName}>{selectedImage.name}</div>
                      <div className={styles.previewMeta}>
                        {(selectedImage.size / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedImage}
                      className={styles.removeImgBtn}
                      title="Remove image"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                        delete
                      </span>
                    </button>
                  </div>
                ) : (
                  <div
                    className={`${styles.dropzone} ${
                      isDraggingFile ? styles.dropzoneActive : ""
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileSelect(e.dataTransfer.files[0]);
                      }
                    }}
                  >
                    <div className={styles.dropzoneContent}>
                      <span className={`material-symbols-outlined ${styles.dropzoneIcon}`}>
                        cloud_upload
                      </span>
                      <div className={styles.dropzoneText}>
                        Click or drag your product photo here
                      </div>
                      <div className={styles.dropzoneSubtext}>
                        High quality image up to 10MB
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className={styles.drawerFooter}>
          <button
            type="button"
            onClick={closeDrawer}
            className={styles.cancelBtn}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            form={activeTab === "gifts" ? "gift-form" : "merch-form"}
            className={styles.primaryActionBtn}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span
                  className="material-symbols-outlined"
                  style={{ animation: "spin 1s linear infinite", fontSize: "18px" }}
                >
                  progress_activity
                </span>
                <span>{activeTab === "gifts" ? "Saving..." : "Saving..."}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  check
                </span>
                <span>{activeTab === "gifts" ? "Save Gift Option" : "Save Product"}</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* =========================================================================
       * Branded Confirmation Modal for Delete
       * ========================================================================= */}
      {itemToDelete && (
        <div
          className={styles.modalBackdrop}
          onClick={() => {
            if (!isDeleting) setItemToDelete(null);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalWarningIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                warning
              </span>
            </div>
            <h3 className={styles.modalTitle}>Remove Item</h3>
            <p className={styles.modalDesc}>
              Are you sure you want to remove <strong>"{itemToDelete.name}"</strong>? It
              will no longer be available for supporters to choose on the website. This
              action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className={styles.cancelBtn}
                disabled={isDeleting}
              >
                Keep Item
              </button>
              <button
                type="button"
                onClick={confirmDeleteAction}
                className={styles.dangerBtn}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{ animation: "spin 1s linear infinite", fontSize: "16px" }}
                    >
                      progress_activity
                    </span>
                    <span>Removing...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      delete
                    </span>
                    <span>Remove Item</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
       * Lightbox Modal for High-Resolution Artifact Images
       * ========================================================================= */}
      {lightboxImage && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.lightboxCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className={styles.lightboxCloseBtn}
              aria-label="Close image preview"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.name}
              className={styles.lightboxImg}
            />
            <div className={styles.lightboxCaption}>{lightboxImage.name}</div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
