import { useEffect, useState } from "react";

/** Single source of truth for the mobile breakpoint (matches every `max-width: 768px` stylesheet rule). */
export const MOBILE_QUERY = "(max-width: 768px)";
/** Desktop/tablet query used by GSAP pin-scroll galleries (inverse of MOBILE_QUERY). */
export const DESKTOP_QUERY = "(min-width: 769px)";

export const isMobileViewport = () =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Reactive mobile flag. Updates live when the viewport crosses the breakpoint (rotation, DevTools, resize). */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(isMobileViewport);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
