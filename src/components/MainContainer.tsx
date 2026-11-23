import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import Certifications from "./Certifications";
import CallToAction from "./CallToAction";
import setSplitText from "./utils/splitText";
import MobileEnhancements from "../mobile/MobileEnhancements";
import MobileSplash from "../mobile/MobileSplash";
import { SHOW_MOBILE_SPLASH } from "../mobile/splashState";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth > 1024 : true
  );
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    let timeoutId: number;

    const resizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        setIsDesktopView(width > 1024);
        setIsMobile(width <= 768);
        setSplitText();
      }, 150);
    };

    setSplitText();
    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && !isMobile && children}
      <Landing />
      <About />
      <WhatIDo />
      <Career />
      <Certifications />
      <Work />
      <TechStackNew />
      <CallToAction />
      <Contact />
      {/* Phone-only motion layer + first-visit splash (never rendered on desktop/tablet) */}
      {isMobile && <MobileEnhancements />}
      {isMobile && SHOW_MOBILE_SPLASH && <MobileSplash />}
    </div>
  );
};

export default MainContainer;
