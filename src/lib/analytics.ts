// src/lib/analytics.ts
// Thin helpers around the Google Analytics gtag() that index.html sets up.
// Consent Mode v2 is in play: analytics_storage starts "denied" and is only
// granted once the visitor accepts cookies (see CookieConsent + setConsent).

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "kudo_cookie_consent";

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Push raw so it works even if the gtag function hasn't initialised yet.
  window.dataLayer.push(args);
}

/** Record the visitor's cookie choice and update GA consent accordingly. */
export function setConsent(accepted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "declined");
  } catch { /* ignore */ }
  gtag("consent", "update", {
    analytics_storage: accepted ? "granted" : "denied",
  });
}

/** Returns "accepted" | "declined" | null (not yet chosen). */
export function getConsent(): "accepted" | "declined" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Track a conversion / interaction event in GA4.
 * No-ops cleanly if GA isn't loaded or consent was declined (GA itself
 * honours Consent Mode, so events without consent won't set cookies).
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  gtag("event", name, params);
}
