export function getApiBaseUrl() {
  // When running in the browser on HTTPS or in production, route through Next.js proxy
  // if the backend is insecure HTTP to prevent browser Mixed Content blocks.
  if (typeof window !== "undefined") {
    if (window.location.protocol === "https:" || process.env.NODE_ENV === "production") {
      const configured = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      if (!configured || configured.startsWith("http://")) {
        return "/api/proxy";
      }
      return configured;
    }
  }
  return (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://3.72.105.190"
  );
}

export const API_BASE_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://3.72.105.190";

/**
 * Helper to extract human-readable error messages from diverse response formats.
 */
async function parseErrorResponse(response) {
  try {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      if (data.detail) return data.detail;
      if (data.error) return data.error;
      if (data.message) return data.message;
      if (typeof data === "object") {
        const firstKey = Object.keys(data)[0];
        if (firstKey && Array.isArray(data[firstKey])) {
          return `${firstKey}: ${data[firstKey].join(", ")}`;
        } else if (firstKey && typeof data[firstKey] === "string") {
          return `${firstKey}: ${data[firstKey]}`;
        }
      }
      return JSON.stringify(data);
    }
    const text = await response.text();
    // Catch common HTML exceptions like Django's debug page
    if (text.includes("OperationalError") || text.includes("connection to server")) {
      return "Database connection temporarily unavailable on the server. Please try again shortly.";
    }
    return `Server responded with status ${response.status}: ${response.statusText || "Unknown error"}`;
  } catch (err) {
    return response.statusText || "An unexpected network error occurred.";
  }
}

function getStoredAccessToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("antidote_access_token");
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(
        decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        )
      );
      // If token has 5 seconds or less remaining, treat as expired
      if (payload.exp && payload.exp - Math.floor(Date.now() / 1000) <= 5) {
        localStorage.removeItem("antidote_access_token");
        localStorage.removeItem("antidote_refresh_token");
        localStorage.removeItem("antidote_user");
        document.cookie = "antidote_access_token=; path=/; max-age=0";
        window.dispatchEvent(new CustomEvent("antidote:session-expired"));
        return null;
      }
    }
  } catch {
    // If malformed, let it pass to server or return null
  }
  return token;
}

/**
 * Generic fetch wrapper with automatic Bearer token injection and session recovery
 */
async function apiFetch(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl().replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;
  const headers = { ...options.headers };

  // Set Content-Type only if body is not FormData
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  // Inject Bearer token only if explicitly passed OR if auth is required
  const requiresAuth = options.auth === true || Boolean(options.token);
  const token = options.token || (requiresAuth ? getStoredAccessToken() : null);

  if (requiresAuth && !token) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("antidote:session-expired"));
    }
    return {
      ok: false,
      status: 401,
      error: "Your session has timed out. Please sign in again to continue.",
    };
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.status === 204) {
      return { ok: true, status: 204, data: null };
    }

    if (res.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("antidote_access_token");
        localStorage.removeItem("antidote_refresh_token");
        localStorage.removeItem("antidote_user");
        document.cookie = "antidote_access_token=; path=/; max-age=0";
        window.dispatchEvent(new CustomEvent("antidote:session-expired"));
      }
      return {
        ok: false,
        status: 401,
        error: "Your session has timed out. Please sign in again to continue.",
      };
    }

    if (!res.ok) {
      const errorMessage = await parseErrorResponse(res);
      return { ok: false, status: res.status, error: errorMessage };
    }

    const data = await res.json();
    return { ok: true, status: res.status, data };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.message || "Failed to connect to the backend server.",
    };
  }
}

/* =========================================================================
 * 1. User Authentication
 * ========================================================================= */
export const authAPI = {
  /**
   * Signs in a user and returns access and refresh tokens along with user details.
   * Endpoint: /user/signin/ (POST)
   */
  async signIn({ email, password }) {
    return apiFetch("/user/signin/", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email, password }),
    });
  },
};

/* =========================================================================
 * 2. Partnership Gifts
 * ========================================================================= */
export const giftAPI = {
  /**
   * Retrieves all partnership gifts created on the platform.
   * Endpoint: /finance/gift/ (GET) - Public read-only
   */
  async getGifts() {
    return apiFetch("/finance/gift/", {
      method: "GET",
      auth: false,
      cache: "no-store",
    });
  },

  /**
   * Creates a new partnership gift (Admin).
   * Endpoint: /finance/gift/ (POST)
   * Payload: { name, price }
   */
  async createGift({ name, price }, token) {
    return apiFetch("/finance/gift/", {
      method: "POST",
      token,
      auth: true,
      body: JSON.stringify({
        name: String(name).trim(),
        price: String(price).trim(),
      }),
    });
  },

  /**
   * Deletes a partnership gift (Admin).
   * Endpoint: /finance/gift/?gift_id=:id (DELETE)
   */
  async deleteGift(giftId, token) {
    return apiFetch(`/finance/gift/?gift_id=${encodeURIComponent(giftId)}`, {
      method: "DELETE",
      token,
      auth: true,
    });
  },
};

/* =========================================================================
 * 3. Merchandise (Merch)
 * ========================================================================= */
export const merchAPI = {
  /**
   * Retrieves all merchandise items registered on the system.
   * Endpoint: /finance/merch/ (GET) - Public read-only
   */
  async getMerch() {
    return apiFetch("/finance/merch/", {
      method: "GET",
      auth: false,
      cache: "no-store",
    });
  },

  /**
   * Creates a new Merch item (Admin).
   * Endpoint: /finance/merch/ (POST)
   * Payload: FormData with name, detail, colorway, material, shipping, price, photo_reference
   */
  async createMerch(formData, token) {
    return apiFetch("/finance/merch/", {
      method: "POST",
      token,
      auth: true,
      body: formData,
    });
  },

  /**
   * Deletes a Merch item (Admin).
   * Endpoint: /finance/merch/?merch_id=:id (DELETE)
   */
  async deleteMerch(merchId, token) {
    return apiFetch(`/finance/merch/?merch_id=${encodeURIComponent(merchId)}`, {
      method: "DELETE",
      token,
      auth: true,
    });
  },
};

/* =========================================================================
 * 4. Patron Partnership Payment
 * ========================================================================= */
export const paymentAPI = {
  /**
   * Initiates payment for a partnership gift or custom amount.
   * N.B: Exactly one of either gift or custom_amount must be provided.
   * Endpoint: /finance/partner/payment/ (POST) - Public checkout
   */
  async initiatePartnerPayment({
    gift,
    custom_amount,
    first_name,
    last_name,
    email,
    recurrent_type,
  }) {
    const payload = {
      first_name: String(first_name).trim(),
      last_name: String(last_name).trim(),
      email: String(email).trim(),
      recurrent_type: recurrent_type === "monthly" ? "monthly" : "oneoff",
    };

    if (gift !== undefined && gift !== null && String(gift).trim() !== "") {
      const trimmedGift = String(gift).trim();
      if (/^\d+$/.test(trimmedGift)) {
        payload.gift = Number(trimmedGift);
      } else if (!custom_amount) {
        return {
          ok: false,
          error: "Selected partnership gift is not a valid tier.",
        };
      }
    } else if (
      custom_amount !== undefined &&
      custom_amount !== null &&
      String(custom_amount).trim() !== ""
    ) {
      payload.custom_amount = String(custom_amount);
    } else {
      return {
        ok: false,
        error: "Please select a partnership option or enter a custom amount.",
      };
    }

    return apiFetch("/finance/partner/payment/", {
      method: "POST",
      auth: false,
      body: JSON.stringify(payload),
    });
  },
};
