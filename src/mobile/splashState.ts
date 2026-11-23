import { isMobileViewport, prefersReducedMotion } from "./useIsMobile";

/** Fired when the splash curtain starts lifting; LoadingProvider starts the hero text animation on it. */
export const SPLASH_EXIT_EVENT = "m-splash:exit";

export const SESSION_KEY = "jm-mobile-splash-seen";

const readSeen = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * Decided once per page load so MainContainer (renders it) and
 * LoadingProvider (waits for it) always agree. Shown once per session,
 * phones only, and never when the user prefers reduced motion.
 */
export const SHOW_MOBILE_SPLASH =
  typeof window !== "undefined" && isMobileViewport() && !prefersReducedMotion() && !readSeen();
