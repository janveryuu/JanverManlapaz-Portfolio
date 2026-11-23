import { CSSProperties, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const MOBILE_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

/** Section the reader is currently in (40% down the viewport), for highlighting the menu link. */
const findCurrentSection = () => {
  const probe = window.innerHeight * 0.4;
  let current = "";
  MOBILE_LINKS.forEach(({ href }) => {
    const el = document.querySelector(href);
    if (el && el.getBoundingClientRect().top <= probe) current = href;
  });
  return current;
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Lock/unlock body scroll when mobile menu is open
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (menuOpen) {
      // On mobile: use native overflow hidden
      // On desktop: pause lenis
      if (isMobile) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        // Inline overflow loses to the mobile `!important` scroll rules; this class wins
        document.documentElement.classList.add("m-lock");
        setCurrentSection(findCurrentSection());
      } else if (lenis) {
        lenis.stop();
      }
    } else {
      if (isMobile) {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.documentElement.classList.remove("m-lock");
      } else if (lenis) {
        lenis.start();
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener("keydown", onKeyDown);

    return () => {
      // Always clean up on unmount
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove("m-lock");
    };
  }, [menuOpen]);

  useEffect(() => {
    // IMPORTANT: Do NOT initialize Lenis on mobile.
    // Lenis intercepts touch events and conflicts with native mobile scrolling,
    // causing the page to get stuck after the loading screen.
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // On mobile, ensure body can scroll natively
      document.body.style.overflow = "";
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
      return; // Skip Lenis entirely on mobile
    }

    // Initialize Lenis smooth scroll (desktop only)
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenis = lenisInstance;

    // Start paused — will be started by initialFX after loading screen
    lenisInstance.stop();

    // Synchronize Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Bind Lenis animation frame directly to GSAP ticker for 60-120fps stutter-free sync
    const updateTicker = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Handle desktop navigation link clicks with smooth Lenis scroll
    const links = document.querySelectorAll(".header ul a");
    const handleLinkClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        if (section && lenis) {
          const target = document.querySelector(section) as HTMLElement;
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    links.forEach((elem) => {
      elem.addEventListener("click", handleLinkClick);
    });

    // Handle resize
    const handleResize = () => {
      lenisInstance.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(updateTicker);
      links.forEach((elem) => {
        elem.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("resize", handleResize);
      lenisInstance.destroy();
      lenis = null;
    };
  }, []);

  const handleMobileNavClick = (href: string) => {
    closeMenu();

    // After menu closes (CSS transition ~350ms), scroll to target natively
    setTimeout(() => {
      // Ensure overflow is restored before scrolling
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      const target = document.querySelector(href) as HTMLElement;
      if (target) {
        // Use offsetTop for most reliable mobile scroll
        const offsetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }, 400);
  };

  return (
    <>
      <div className={`header${menuOpen ? " menu-open" : ""}`}>
        <a href="/#" className="navbar-title" data-cursor="disable">
          JM
        </a>
        <a
          href="mailto:Janvermanlapaz@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          Janvermanlapaz@gmail.com
        </a>
        {/* Desktop nav */}
        <ul className="navbar-desktop-links">
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#certifications" href="#certifications">
              <HoverLinks text="CERTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
        {/* Hamburger button - mobile only */}
        <button
          className={`hamburger-btn${menuOpen ? " hamburger-open" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu-overlay${menuOpen ? " mobile-menu-active" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-content">
          <nav className="mobile-menu-nav">
            {MOBILE_LINKS.map(({ href, label }, i) => (
              <a
                key={href}
                href={href}
                className={currentSection === href ? "is-current" : undefined}
                aria-current={currentSection === href ? "location" : undefined}
                style={{ "--i": i } as CSSProperties}
                tabIndex={menuOpen ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick(href);
                }}
              >
                <span className="mobile-menu-index">{String(i + 1).padStart(2, "0")}</span>
                {label.toUpperCase()}
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <span className="mobile-menu-label">Get in touch</span>
            <a
              href="mailto:Janvermanlapaz@gmail.com"
              className="mobile-menu-email"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              Janvermanlapaz@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
