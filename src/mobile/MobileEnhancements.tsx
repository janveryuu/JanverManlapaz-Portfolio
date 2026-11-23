import { useEffect, useRef } from "react";
import "./mobile.css";

/**
 * Mobile-only motion layer. Mounted by MainContainer only below the mobile
 * breakpoint and fully cleaned up when the viewport grows past it, so the
 * desktop experience never sees any of these classes or styles.
 *
 * One passive scroll listener + one rAF drives:
 *  - the scroll progress hairline
 *  - header glass / hide-on-scroll-down / show-on-scroll-up
 *  - scroll-linked hero depth (--hero-p)
 *  - sticky project-card stacking depth (--stack)
 * An IntersectionObserver drives one-shot section reveals.
 */

type RevealSpec = { selector: string; variant?: "mask" | "side" | "pop"; stagger?: boolean };

const REVEALS: RevealSpec[] = [
  { selector: ".about-me .title", variant: "mask" },
  { selector: ".about-me .para" },
  { selector: ".what-box h2", variant: "mask" },
  { selector: ".what-content", stagger: true },
  { selector: ".career-section h2", variant: "mask" },
  { selector: ".career-info-box", variant: "side" },
  { selector: ".certifications-section h2", variant: "mask" },
  { selector: ".cert-pager" },
  { selector: ".work-section h2", variant: "mask" },
  { selector: ".techstack-content h2", variant: "mask" },
  { selector: ".techstack-item", variant: "pop", stagger: true },
  { selector: ".cta-btn", stagger: true },
];

const REVEAL_CLASSES = ["m-reveal", "m-reveal--mask", "m-reveal--side", "m-reveal--pop", "is-in"];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const MobileEnhancements = () => {
  const progressRef = useRef<HTMLSpanElement>(null);

  // ── Scroll-driven effects ──
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".header");
    const landing = document.querySelector<HTMLElement>(".landing-section");
    const workSection = document.querySelector<HTMLElement>(".work-section");
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".work-box:not(.work-box-cta)")
    );
    const cta = document.querySelector<HTMLElement>(".work-box-cta");
    const followers = [...cards.slice(1), cta].filter(Boolean) as HTMLElement[];

    let lastY = window.scrollY;
    let frame = 0;
    let lastHero = -1;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;

      // Progress hairline
      progressRef.current?.style.setProperty("--p", max > 0 ? clamp01(y / max).toFixed(4) : "0");

      // Header behaviour (never hide while the menu is open)
      if (header) {
        const menuOpen = header.classList.contains("menu-open");
        header.classList.toggle("is-scrolled", y > 24);
        if (!menuOpen) {
          if (y > lastY + 6 && y > 140) header.classList.add("is-hidden");
          else if (y < lastY - 6 || y <= 140) header.classList.remove("is-hidden");
        }
      }
      lastY = y;

      // Hero depth: only write while the hero is (nearly) on screen
      if (landing) {
        const heroP = clamp01(y / Math.max(1, landing.offsetHeight * 0.75));
        if (heroP !== lastHero && (heroP < 1 || lastHero < 1)) {
          landing.style.setProperty("--hero-p", heroP.toFixed(3));
          lastHero = heroP;
        }
      }

      // Stacking project cards: how far the next card has slid over this one
      if (workSection && cards.length) {
        const rect = workSection.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          cards.forEach((card, i) => {
            const next = followers[i];
            if (!next) return;
            const c = card.getBoundingClientRect();
            const n = next.getBoundingClientRect();
            const covered = clamp01((c.bottom - n.top) / Math.max(1, c.height));
            card.style.setProperty("--stack", covered.toFixed(3));
          });
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      header?.classList.remove("is-scrolled", "is-hidden");
      landing?.style.removeProperty("--hero-p");
      cards.forEach((card) => card.style.removeProperty("--stack"));
    };
  }, []);

  // ── One-shot scroll reveals ──
  useEffect(() => {
    const tagged: HTMLElement[] = [];
    const timers: number[] = [];
    // Fully clip-pathed headings never report as intersecting, so masked
    // reveals observe their parent and reveal the heading through this map.
    const targets = new Map<Element, HTMLElement[]>();

    const reveal = (el: HTMLElement) => {
      el.classList.add("is-in");
      // Once the entrance has played, drop the reveal classes so the
      // element's own transitions (accordion, press feedback) take over.
      const i = Number(el.style.getPropertyValue("--i")) || 0;
      timers.push(
        window.setTimeout(() => {
          el.classList.remove(...REVEAL_CLASSES);
          el.style.removeProperty("--i");
        }, 1200 + Math.min(i, 30) * 70)
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            targets.get(entry.target)?.forEach(reveal);
            targets.delete(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    REVEALS.forEach(({ selector, variant, stagger }) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
        el.classList.add("m-reveal");
        if (variant) el.classList.add(`m-reveal--${variant}`);
        if (stagger) el.style.setProperty("--i", String(i));
        tagged.push(el);
        const target = variant === "mask" && el.parentElement ? el.parentElement : el;
        targets.set(target, [...(targets.get(target) ?? []), el]);
        observer.observe(target);
      });
    });

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
      tagged.forEach((el) => {
        el.classList.remove(...REVEAL_CLASSES);
        el.style.removeProperty("--i");
      });
    };
  }, []);

  return (
    <div className="m-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
};

export default MobileEnhancements;
