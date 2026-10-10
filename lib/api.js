export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.72.105.190";

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
  return localStorage.getItem("antidote_access_token");
}

/**
 * Generic fetch wrapper with automatic Bearer token injection
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const headers = { ...options.headers };

  // Set Content-Type only if body is not FormData
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  // Inject Bearer token if explicitly passed OR automatically from local session
  const token = options.token || (options.auth !== false ? getStoredAccessToken() : null);
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
   * Endpoint: /finance/gift/ (GET)
   */
  async getGifts() {
    return apiFetch("/finance/gift/", {
      method: "GET",
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
    });
  },
};

/* =========================================================================
 * 3. Merchandise (Merch)
 * ========================================================================= */
export const merchAPI = {
  /**
   * Retrieves all merchandise items registered on the system.
   * Endpoint: /finance/merch/ (GET)
   */
  async getMerch() {
    return apiFetch("/finance/merch/", {
      method: "GET",
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
   * Endpoint: /finance/partner/payment/ (POST)
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
      payload.gift = String(gift);
    } else if (
      custom_amount !== undefined &&
      custom_amount !== null &&
      String(custom_amount).trim() !== ""
    ) {
      payload.custom_amount = String(custom_amount);
    } else {
      return {
        ok: false,
        error: "Either a partnership gift tier or a custom amount must be specified.",
      };
    }

    return apiFetch("/finance/partner/payment/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
