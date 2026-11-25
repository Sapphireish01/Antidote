import { authAPI } from "./api";

const ACCESS_TOKEN_KEY = "antidote_access_token";
const REFRESH_TOKEN_KEY = "antidote_refresh_token";
const USER_KEY = "antidote_user";

export const AUTH_EVENTS = {
  SESSION_EXPIRED: "antidote:session-expired",
  LOGIN: "antidote:login",
  LOGOUT: "antidote:logout",
};

/**
 * Safely decodes a JWT payload in the browser.
 */
export function parseJwt(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
}

/**
 * Checks whether a given JWT access token is still valid.
 * Buffer prevents race conditions when a token is within 10 seconds of expiry.
 */
export function isTokenValid(token, bufferSeconds = 10) {
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return false;
  const nowSeconds = Math.floor(Date.now() / 1000);
  return payload.exp - nowSeconds > bufferSeconds;
}

/**
 * Dispatches custom auth lifecycle events for cross-component reactivity.
 */
export function notifyAuthEvent(eventName, detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

export const authStorage = {
  getAccessToken() {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return null;

    // If the token is already expired, automatically purge it
    if (!isTokenValid(token)) {
      this.clearSession("expired");
      return null;
    }
    return token;
  },

  getRawToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser() {
    if (typeof window === "undefined") return null;
    try {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  setSession(access, refresh, user) {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Align cookie max-age with real token expiration
    const payload = parseJwt(access);
    const maxAge = payload?.exp
      ? Math.max(0, payload.exp - Math.floor(Date.now() / 1000))
      : 300;
    document.cookie = `antidote_access_token=${access}; path=/; max-age=${maxAge}; SameSite=Lax`;

    notifyAuthEvent(AUTH_EVENTS.LOGIN, { user, access });
  },

  clearSession(reason = "manual") {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = "antidote_access_token=; path=/; max-age=0";

    if (reason === "expired") {
      notifyAuthEvent(AUTH_EVENTS.SESSION_EXPIRED);
    } else {
      notifyAuthEvent(AUTH_EVENTS.LOGOUT);
    }
  },

  isAuthenticated() {
    return Boolean(this.getAccessToken());
  },
};

export async function loginUser(email, password) {
  const result = await authAPI.signIn({ email, password });
  if (result.ok && result.data) {
    const { access, refresh, user } = result.data;
    authStorage.setSession(access, refresh, user);
    return { ok: true, user, access };
  }
  return { ok: false, error: result.error || "Authentication failed." };
}

export function logoutUser() {
  authStorage.clearSession("manual");
}
