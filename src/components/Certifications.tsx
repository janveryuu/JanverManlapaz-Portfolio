import { useEffect, useRef, useState } from "react";
import "./styles/Certifications.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { config, Certification } from "../config";
import { FiExternalLink, FiMaximize2, FiX } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const gsapCtx = useRef<gsap.Context | null>(null);

  // State for image lightbox preview
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

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
        targetRy = dx * 10;   // max ±10°
        targetRx = -dy * 8;   // max ±8°
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
      // Cards stagger in
      gsap.fromTo(
        ".cert-card",
        {
          autoAlpha: 0,
          y: prefersReducedMotion ? 0 : 50,
          rotateX: prefersReducedMotion ? 0 : 12,
        },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: prefersReducedMotion ? 0.01 : 0.85,
          ease: "power3.out",
          stagger: prefersReducedMotion ? 0 : 0.12,
          scrollTrigger: {
            trigger: ".certifications-section",
            start: "top 70%",
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
        <div className="cert-header-row">
          <div>
            <h2 className="title cert-heading">
              Certifications <span>&amp;</span>
              <br />
              Credentials
            </h2>
          </div>
          <div className="cert-subtitle-wrap">
            <p className="cert-subtitle">
              Verified certifications, academy completions, and technical awards in software development, cloud systems, and engineering.
            </p>
          </div>
        </div>

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
                {/* Certificate Image Preview / Thumbnail */}
                {cert.image && (
                  <div
                    className="cert-media-preview"
                    onClick={() => setSelectedCert(cert)}
                    title="Click to view full certificate"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCert(cert);
                      }
                    }}
                  >
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      loading="lazy"
                    />
                    <div className="cert-media-overlay">
                      <span className="cert-expand-btn">
                        <FiMaximize2 /> Preview
                      </span>
                    </div>
                  </div>
                )}

                <div className="cert-body">
                  {/* Top meta row */}
                  <div className="cert-meta-row">
                    <p className="cert-label">
                      <MdVerified className="cert-label-icon" aria-hidden="true" />
                      CERTIFIED
                    </p>
                    <span className="cert-date">{cert.date}</span>
                  </div>

                  <h3 className="cert-title">{cert.title}</h3>

                  <p className="cert-issuer">{cert.issuer}</p>

                  {cert.description && (
                    <p className="cert-desc">{cert.description}</p>
                  )}

                  {/* Skills badges */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="cert-skills-wrap">
                      {cert.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="cert-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="cert-footer">
                    <button
                      type="button"
                      className="cert-view-btn"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <FiMaximize2 className="cert-link-icon" aria-hidden="true" />
                      Inspect Certificate
                    </button>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                        aria-label={`Open credential for ${cert.title}`}
                      >
                        Open Full
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

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="cert-modal-backdrop"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
            >
              <FiX />
            </button>

            <div className="cert-modal-image-wrap">
              <img
                src={selectedCert.image || selectedCert.credentialUrl}
                alt={selectedCert.title}
                className="cert-modal-img"
              />
            </div>

            <div className="cert-modal-footer">
              <div className="cert-modal-info">
                <h4>{selectedCert.title}</h4>
                <p>
                  {selectedCert.issuer} • {selectedCert.date}
                </p>
              </div>
              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-modal-open-btn"
                >
                  Open in New Tab <FiExternalLink />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
