import { useEffect, useRef } from "react";
import "./styles/Certifications.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { config, Certification } from "../config";
import { FiExternalLink } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

/** Returns initials (up to 2 chars) from an issuer name */
function getInitials(issuer: string): string {
  return issuer
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const gsapCtx = useRef<gsap.Context | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 3D TILT (desktop / non-touch only) ---------- */
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (ScrollTrigger.isTouch === 1) return; // skip on touch

    const rAFHandles: number[] = [];

    cardRefs.current.forEach((card) => {
      if (!card) return;

      let targetRx = 0;
      let targetRy = 0;
      let currentRx = 0;
      let currentRy = 0;
      let rafId: number;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const animate = () => {
        currentRx = lerp(currentRx, targetRx, 0.1);
        currentRy = lerp(currentRy, targetRy, 0.1);
        card.style.setProperty("--rx", `${currentRx}deg`);
        card.style.setProperty("--ry", `${currentRy}deg`);
        rafId = requestAnimationFrame(animate);
      };

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        targetRy = dx * 12;   // max ±12°
        targetRx = -dy * 10;  // max ±10°
      };

      const onLeave = () => {
        targetRx = 0;
        targetRy = 0;
      };

      rafId = requestAnimationFrame(animate);
      rAFHandles.push(rafId);

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });

    return () => {
      rAFHandles.forEach(cancelAnimationFrame);
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, [prefersReducedMotion]);

  /* ---------- GSAP SCROLL ENTRANCE ---------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    gsapCtx.current = gsap.context(() => {
      // Heading char animation is handled globally by splitText.ts (.title class)

      // Cards stagger in
      gsap.fromTo(
        ".cert-card",
        {
          autoAlpha: 0,
          y: prefersReducedMotion ? 0 : 55,
          rotateX: prefersReducedMotion ? 0 : 14,
        },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: prefersReducedMotion ? 0.01 : 0.85,
          ease: "power3.out",
          stagger: prefersReducedMotion ? 0 : 0.13,
          scrollTrigger: {
            trigger: ".certifications-section",
            start: "top 68%",
            toggleActions: "play pause resume reverse",
            invalidateOnRefresh: true,
          },
        }
      );

      // Subtle label/badge pop-in after cards appear
      gsap.fromTo(
        ".cert-badge",
        { scale: prefersReducedMotion ? 1 : 0.6, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: prefersReducedMotion ? 0.01 : 0.5,
          ease: "back.out(1.7)",
          stagger: prefersReducedMotion ? 0 : 0.13,
          scrollTrigger: {
            trigger: ".certifications-section",
            start: "top 65%",
            toggleActions: "play pause resume reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      gsapCtx.current?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="certifications"
      className="certifications-section section-container"
      ref={sectionRef}
    >
      <div className="cert-container">
        <h2 className="title cert-heading">
          Certifications <span>&amp;</span>
          <br />
          Credentials
        </h2>

        <div className="cert-grid">
          {(config.certifications as Certification[]).map((cert, index) => (
            <article
              key={cert.id}
              className="cert-card"
              ref={(el: HTMLElement | null) => {
                cardRefs.current[index] = el;
              }}
              tabIndex={0}
              aria-label={`${cert.title} issued by ${cert.issuer}`}
            >
              {/* Blueprint dashed border — top + bottom SVG lines */}
              <div className="cert-border-h">
                <svg width="100%" height="100%" aria-hidden="true">
                  <line
                    x1="0" y1="0" x2="100%" y2="0"
                    stroke="white" strokeWidth="1.5" strokeDasharray="6,6"
                  />
                  <line
                    x1="0" y1="100%" x2="100%" y2="100%"
                    stroke="white" strokeWidth="1.5" strokeDasharray="6,6"
                  />
                </svg>
              </div>

              {/* Blueprint dashed border — left + right SVG lines */}
              <div className="cert-border-v">
                <svg width="100%" height="100%" aria-hidden="true">
                  <line
                    x1="0" y1="0" x2="0" y2="100%"
                    stroke="white" strokeWidth="1.5" strokeDasharray="6,6"
                  />
                  <line
                    x1="100%" y1="0" x2="100%" y2="100%"
                    stroke="white" strokeWidth="1.5" strokeDasharray="6,6"
                  />
                </svg>
              </div>

              {/* Corner brackets */}
              <span className="cert-corner cert-corner-tl" aria-hidden="true" />
              <span className="cert-corner cert-corner-tr" aria-hidden="true" />
              <span className="cert-corner cert-corner-bl" aria-hidden="true" />
              <span className="cert-corner cert-corner-br" aria-hidden="true" />

              {/* Card body */}
              <div className="cert-inner">
                {/* Badge / initials */}
                <div className="cert-badge" aria-hidden="true">
                  {cert.badgeImage ? (
                    <img src={cert.badgeImage} alt={`${cert.issuer} logo`} />
                  ) : (
                    <span className="cert-initials">{getInitials(cert.issuer)}</span>
                  )}
                </div>

                <div className="cert-body">
                  {/* Mono label */}
                  <p className="cert-label">
                    <MdVerified className="cert-label-icon" aria-hidden="true" />
                    CERTIFICATION
                  </p>

                  <h3 className="cert-title">{cert.title}</h3>

                  <p className="cert-issuer">{cert.issuer}</p>

                  {cert.description && (
                    <p className="cert-desc">{cert.description}</p>
                  )}

                  <div className="cert-footer">
                    <span className="cert-date">{cert.date}</span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                        aria-label={`View credential for ${cert.title}`}
                      >
                        View Credential
                        <FiExternalLink className="cert-link-icon" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
