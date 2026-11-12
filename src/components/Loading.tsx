import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 500);
        return () => clearTimeout(t2);
      }, 150);
      return () => clearTimeout(t1);
    }
  }, [percent]);

  useEffect(() => {
    if (isLoaded) {
      import("./utils/initialFX").then((module) => {
        setClicked(true);
        const timer = setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 700);
        return () => clearTimeout(timer);
      });
    }
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          JanverManlapaz
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span>&nbsp; Full Stack Developer &nbsp;</span> <span>&nbsp; AI Engineer &nbsp;</span>
            <span>&nbsp; Full Stack Developer &nbsp;</span> <span>&nbsp; AI Engineer &nbsp;</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  // Eases toward 90% while assets load, then finishes to 100% quickly once ready.
  let percent = 0;
  let timerId = 0;
  let last = performance.now();
  let finishing = false;
  let onDone: ((v: number) => void) | null = null;

  const tick = (now: number) => {
    const dt = Math.min(now - last, 250);
    last = now;
    if (finishing) {
      percent = Math.min(100, percent + dt * 0.25); // ~0.3s to finish
    } else {
      percent += (90 - percent) * (1 - Math.exp(-dt / 900));
    }
    setLoading(percent);
    if (percent >= 100) {
      clearInterval(timerId);
      onDone?.(100);
    }
  };
  // setInterval (not rAF) so progress keeps moving even in a background tab
  timerId = window.setInterval(() => tick(performance.now()), 16);

  function clear() {
    clearInterval(timerId);
    percent = 100;
    setLoading(100);
  }

  function loaded() {
    finishing = true;
    return new Promise<number>((resolve) => {
      onDone = resolve;
    });
  }
  return { loaded, percent, clear };
};
