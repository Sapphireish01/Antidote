import { authAPI } from "./api";

const ACCESS_TOKEN_KEY = "antidote_access_token";
const REFRESH_TOKEN_KEY = "antidote_refresh_token";
const USER_KEY = "antidote_user";

export const authStorage = {
  getAccessToken() {
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
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Also store token in cookie for middleware or SSR access
    document.cookie = `antidote_access_token=${access}; path=/; max-age=604800; SameSite=Lax`;
  },

  clearSession() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = "antidote_access_token=; path=/; max-age=0";
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
  authStorage.clearSession();
}
