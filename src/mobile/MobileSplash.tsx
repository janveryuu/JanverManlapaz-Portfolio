import { useEffect, useState } from "react";
import { SESSION_KEY, SPLASH_EXIT_EVENT } from "./splashState";

const HOLD_MS = 1000; // monogram + progress bar
const EXIT_MS = 650; // curtain lift (matches mSplashOut)

const MobileSplash = () => {
  const [phase, setPhase] = useState<"hold" | "leaving" | "gone">("hold");

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable (private mode): splash simply shows again next visit */
    }
    const leave = window.setTimeout(() => {
      setPhase("leaving");
      window.dispatchEvent(new Event(SPLASH_EXIT_EVENT));
    }, HOLD_MS);
    const gone = window.setTimeout(() => setPhase("gone"), HOLD_MS + EXIT_MS);
    return () => {
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`m-splash${phase === "leaving" ? " is-leaving" : ""}`} aria-hidden="true">
      <div className="m-splash-mark">
        <span>janver</span>
        <span>yu</span>
      </div>
      <div className="m-splash-bar">
        <i />
      </div>
    </div>
  );
};

export default MobileSplash;
