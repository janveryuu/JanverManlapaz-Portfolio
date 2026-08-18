import { useEffect, useRef, useState } from "react";
import "./styles/Certifications.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config, Certification } from "../config";
import { FiExternalLink, FiMaximize2, FiX } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close lightbox modal
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

  // Horizontal Pin-Scroll with Reverse Direction (Mirrored counterpart to Work section)
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion) return;

    let translateX = 0;

    function setTranslateX() {
      const boxes = document.getElementsByClassName("cert-box");
      const container = document.querySelector(".cert-container");
      if (boxes.length === 0 || !container || !boxes[0].parentElement) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = boxes[0].getBoundingClientRect();
      const parentWidth = boxes[0].parentElement.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(boxes[0]).padding) / 2 || 0;

      translateX = rect.width * boxes.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".certifications-section",
        start: "top top",
        end: () => `+=${Math.max(translateX, 100)}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "certifications",
        invalidateOnRefresh: true,
      },
    });

    // Reversed direction: starts shifted left at -translateX, scrolls rightwards to 0 as user scrolls down
    timeline.fromTo(
      ".cert-flex",
      { x: -translateX },
      {
        x: 0,
        ease: "none",
      }
    );

    // Refresh ScrollTrigger to sync measurements with the rest of the page
    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("certifications")?.kill();
    };
  }, []);

  return (
    <div
      className="certifications-section"
      id="certifications"
      ref={sectionRef}
    >
      <div className="cert-container section-container">
        <div className="cert-header">
          <h2>
            Certifications <span>&amp;</span> Credentials
          </h2>
        </div>

        <div className="cert-flex">
          {(config.certifications as Certification[]).map((cert, index) => (
            <div className="cert-box" key={cert.id}>
              <article
                className="cert-card"
                tabIndex={0}
                aria-label={`${cert.title} issued by ${cert.issuer}`}
              >
                {/* Corner brackets */}
                <span className="cert-corner cert-corner-tl" aria-hidden="true" />
                <span className="cert-corner cert-corner-tr" aria-hidden="true" />
                <span className="cert-corner cert-corner-bl" aria-hidden="true" />
                <span className="cert-corner cert-corner-br" aria-hidden="true" />

                {/* Card Inner Content */}
                <div className="cert-inner">
                  {/* Certificate Image Thumbnail Preview */}
                  {cert.image && (
                    <div
                      className="cert-media-preview"
                      onClick={() => setSelectedCert(cert)}
                      title="Click to inspect full certificate"
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
                        decoding="async"
                      />
                      <div className="cert-media-overlay">
                        <span className="cert-expand-btn">
                          <FiMaximize2 /> Inspect
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="cert-body">
                    {/* Meta row */}
                    <div className="cert-meta-row">
                      <p className="cert-label">
                        <MdVerified className="cert-label-icon" aria-hidden="true" />
                        CERTIFIED • 0{index + 1}
                      </p>
                      <span className="cert-date">{cert.date}</span>
                    </div>

                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>

                    {cert.description && (
                      <p className="cert-desc">{cert.description}</p>
                    )}

                    {/* Skill Tags */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="cert-skills-wrap">
                        {cert.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="cert-skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Actions */}
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
            </div>
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
    </div>
  );
};

export default Certifications;
