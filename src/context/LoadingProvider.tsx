import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";
import { SHOW_MOBILE_SPLASH, SPLASH_EXIT_EVENT } from "../mobile/splashState";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 1024;
  const [isLoading, setIsLoading] = useState(() => isDesktop);
  const [loading, setLoadingRaw] = useState(0);
  // Progress only ever moves forward, so the bar can never jump back
  const setLoading = useCallback(
    (percent: number) => setLoadingRaw((prev) => Math.max(prev, Math.min(100, Math.round(percent)))),
    []
  );

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    if (!isDesktop) {
      // Auto-start animations on mobile/tablet since 3D model is not rendered
      let cancelled = false;
      let timer = 0;
      let frame = 0;
      let onSplashExit: (() => void) | null = null;

      import("../components/utils/initialFX").then((module) => {
        if (!module.initialFX || cancelled) return;
        let ran = false;
        const run = () => {
          if (cancelled || ran) return;
          ran = true;
          clearTimeout(timer);
          module.initialFX();
        };

        if (SHOW_MOBILE_SPLASH) {
          // Phones: play the hero text entrance as the splash curtain lifts
          onSplashExit = run;
          window.addEventListener(SPLASH_EXIT_EVENT, run, { once: true });
          timer = window.setTimeout(run, 2500); // safety net
          return;
        }

        // Wait for the (lazy) hero markup to exist before animating it,
        // otherwise GSAP targets are missing and the entrance is skipped.
        const startedAt = performance.now();
        const waitForHero = () => {
          if (cancelled) return;
          if (document.querySelector(".landing-section") || performance.now() - startedAt > 3000) {
            timer = window.setTimeout(run, 100);
          } else {
            frame = requestAnimationFrame(waitForHero);
          }
        };
        waitForHero();
      });

      return () => {
        cancelled = true;
        clearTimeout(timer);
        cancelAnimationFrame(frame);
        if (onSplashExit) window.removeEventListener(SPLASH_EXIT_EVENT, onSplashExit);
      };
    } else {
      // Scene.tsx drives progress; this is only a safety net if the model never loads
      const failsafeTimer = setTimeout(() => setLoadingRaw(100), 15000);
      return () => clearTimeout(failsafeTimer);
    }
  }, [isDesktop]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
