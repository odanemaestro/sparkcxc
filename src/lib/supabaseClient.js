// ============================================================================
// Done by: Odane Robinson
// Supabase client + auth-storage setup, extracted out of App.js so the
// connection details and the (slightly unusual) remember-me storage
// adapter live in one obvious place instead of being buried among the UI.
// ============================================================================
import { createClient } from "@supabase/supabase-js";

// Supabase connection details come from environment variables (see .env /
// .env.example) rather than being hardcoded, so the same source can point
// at a different Supabase project (e.g. a staging environment) without any
// code changes. The fallback values below are this project's original
// defaults, kept only so an existing checkout without a .env file yet keeps
// working exactly as before - set REACT_APP_SUPABASE_URL and
// REACT_APP_SUPABASE_ANON_KEY in your own .env for anything beyond that.
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://ymnfexzyjtvjkufcefmf.supabase.co";
const SUPABASE_ANON = process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltbmZleHp5anR2amt1ZmNlZm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNTI0OTMsImV4cCI6MjA5NzkyODQ5M30.qDQzAS_zyKPFeK8UkSjOMzJe6yd1_AxZM37mNNRe8gI";

// Supabase persists browser sessions in localStorage by default. SPARK's
// Remember Me option switches the same Supabase auth session between
// localStorage (remember me) and sessionStorage (this browser tab only).
// We keep the normal Supabase storage key so existing sessions are not
// needlessly invalidated when this feature is introduced.
const SPARK_REMEMBER_ME_KEY = "spark_remember_me";
const SPARK_LEGACY_AUTH_KEY = "sb-ymnfexzyjtvjkufcefmf-auth-token";

export const getRememberMePreference = () => {
  const saved = localStorage.getItem(SPARK_REMEMBER_ME_KEY);
  if (saved === "true") return true;
  if (saved === "false") return false;

  // Backwards compatibility: if the user already had a persisted Supabase
  // session before Remember Me was added, keep that session persistent.
  if (localStorage.getItem(SPARK_LEGACY_AUTH_KEY)) {
    localStorage.setItem(SPARK_REMEMBER_ME_KEY, "true");
    return true;
  }
  return false;
};

const sparkAuthStorage = {
  getItem(key) {
    return getRememberMePreference()
      ? localStorage.getItem(key)
      : sessionStorage.getItem(key);
  },
  setItem(key, value) {
    const remember = getRememberMePreference();
    const target = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    target.setItem(key, value);
    // Never leave a second copy behind in the other storage type.
    other.removeItem(key);
  },
  removeItem(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

export const setRememberMePreference = (remember) => {
  localStorage.setItem(SPARK_REMEMBER_ME_KEY, remember ? "true" : "false");
  if (!remember) {
    // If a previous remembered session exists, remove it so an unchecked
    // Remember Me choice cannot silently restore it later.
    localStorage.removeItem(SPARK_LEGACY_AUTH_KEY);
  }
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    storage: sparkAuthStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
