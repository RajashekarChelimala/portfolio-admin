import { myAxios } from "./api";

const VISITOR_KEY = "portfolio_visitor_id";

/**
 * Get or initialize a unique persistent visitor ID for analytics tracking.
 */
export function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "Anonymous";
  let visitorId = localStorage.getItem(VISITOR_KEY);
  if (!visitorId) {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      visitorId = crypto.randomUUID();
    } else {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    }
    try {
      localStorage.setItem(VISITOR_KEY, visitorId);
    } catch {
      // ignore storage disabled
    }
  }
  return visitorId;
}

/**
 * Detect client device category.
 */
export function detectDevice() {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent || "";
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return "Mobile";
  return "Desktop";
}

let lastLoggedPath = null;
let lastLoggedTime = 0;

/**
 * Fire page visit analytics debounced by path and 4 seconds.
 */
export async function trackPageView(path = window.location.pathname) {
  try {
    const now = Date.now();
    if (lastLoggedPath === path && now - lastLoggedTime < 4000) {
      return;
    }
    lastLoggedPath = path;
    lastLoggedTime = now;

    const visitorId = getOrCreateVisitorId();
    const device = detectDevice();
    const referrer = document.referrer
      ? new URL(document.referrer, window.location.origin).hostname
      : "Direct";

    await myAxios.post("/analytics/visit", {
      visitorId,
      path,
      device,
      referrer,
    });
  } catch {
    // Analytics failure should never interrupt user experience
  }
}
