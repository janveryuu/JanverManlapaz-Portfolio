import "./styles/Certifications.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { config, Certification } from "../config";
import { MdArrowOutward } from "react-icons/md";
import { FiX, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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

  useEffect(() => {
    // Disable pinning on mobile to allow native vertical scrolling
    if (window.innerWidth <= 768) return;

    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("cert-box");
      if (box.length === 0) return;
      const container = document.querySelector(".cert-container");
      if (!container || !box[0].parentElement) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2 || 0;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".certifications-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "certifications",
        invalidateOnRefresh: true,
      },
    });

    // Reversed horizontal scroll: translates +translateX (starts at right, scrolls to left)
    timeline.to(".cert-flex", {
      x: translateX,
      ease: "none",
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("certifications")?.kill();
    };
  }, []);

  return (
    <div className="certifications-section" id="certifications">
      <div className="cert-container section-container">
        <h2>
          My <span>Certifications</span>
        </h2>
        <div className="cert-flex">
          {(config.certifications as Certification[]).map((cert, index) => (
            <div className="cert-box" key={cert.id}>
              <div className="cert-info">
                <div className="cert-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{cert.title}</h4>
                    <p>
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>
                <h4>Domain &amp; Competencies</h4>
                <p>{cert.description}</p>
                {cert.skills && cert.skills.length > 0 && (
                  <div className="cert-skills-tags">
                    {cert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="cert-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Certificate Image with Hover Zoom & Inspect Modal */}
              <div className="cert-image">
                <div
                  className="cert-image-in"
                  onClick={() => setSelectedCert(cert)}
                  data-cursor="disable"
                  title="Click to inspect certificate"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedCert(cert);
                    }
                  }}
                >
                  <div className="cert-link">
                    <MdArrowOutward />
                  </div>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Inspection Modal */}
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
              {(selectedCert.image || selectedCert.credentialUrl) && (
                <a
                  href={selectedCert.image || selectedCert.credentialUrl}
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
