import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

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
      import("../components/utils/initialFX").then((module) => {
        if (module.initialFX) {
          setTimeout(() => {
            module.initialFX();
          }, 100);
        }
      });
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
