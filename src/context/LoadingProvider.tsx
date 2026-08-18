import {
  createContext,
  PropsWithChildren,
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
  const [loading, setLoading] = useState(0);

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
      // Progress simulation for desktop while 3D assets load
      let current = 0;
      const progressTimer = setInterval(() => {
        current += Math.round(Math.random() * 8) + 2;
        if (current >= 90) {
          current = 90;
          clearInterval(progressTimer);
        }
        setLoading((prev) => Math.max(prev, current));
      }, 80);

      // Failsafe timer: if 3D model or network takes too long or fails, force complete to 100%
      const failsafeTimer = setTimeout(() => {
        clearInterval(progressTimer);
        setLoading(100);
      }, 4000);

      return () => {
        clearInterval(progressTimer);
        clearTimeout(failsafeTimer);
      };
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
