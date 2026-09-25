import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config, Certification } from "../config";
import { MdArrowOutward } from "react-icons/md";
import { FiX, FiExternalLink } from "react-icons/fi";
import "./MyCertificates.css";

const MyCertificates = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    // Explicitly unlock scrolling across all devices and reset scroll position to top
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.overflowX = "hidden";
    window.scrollTo(0, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowY = "";
      document.body.style.overflowX = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowY = "";
      document.documentElement.style.overflowX = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="mycerts-page">
      <div className="mycerts-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Certifications</span>
        </h1>
        <p>A collection of all my verified certifications and credentials</p>
      </div>

      <div className="mycerts-grid">
        {(config.certifications as Certification[]).map((cert, index) => (
          <div className="mycerts-card" key={cert.id} data-cursor="disable">
            <div className="mycerts-card-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div
              className="mycerts-card-image"
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              title="Click to inspect certificate"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
            >
              <div className="mycerts-image-overlay">
                <MdArrowOutward />
              </div>
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="mycerts-card-info">
              <h3>{cert.title}</h3>
              <p className="mycerts-card-issuer">
                {cert.issuer} • {cert.date}
              </p>
              <p className="mycerts-card-description">{cert.description}</p>

              {cert.skills && cert.skills.length > 0 && (
                <div className="mycerts-skills-tags">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="mycerts-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="mycerts-card-actions">
                <button
                  type="button"
                  className="mycerts-card-inspect-btn"
                  onClick={() => setSelectedCert(cert)}
                  data-cursor="disable"
                >
                  Inspect Certificate
                </button>
                {(cert.image || cert.credentialUrl) && (
                  <a
                    href={cert.image || cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mycerts-card-link"
                    data-cursor="disable"
                    title="Open certificate in new tab"
                  >
                    Open <FiExternalLink />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
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

export default MyCertificates;
