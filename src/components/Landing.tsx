import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          {/* Mobile status indicator badge */}
          <div className="mobile-status-tag">
            <span className="status-ping">
              <span className="status-ping-ring"></span>
              <span className="status-ping-dot"></span>
            </span>
            <span className="status-text">AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>

          <div className="landing-info">
            <h3>A</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full Stack Dev</div>
            </h2>
            <h2>
              <div className="landing-h2-info">AI Engineer</div>
            </h2>
          </div>

          {/* Mobile photo section with ambient glow and floating tech tags */}
          <div className="mobile-photo">
            <div className="mobile-photo-backdrop"></div>
            <div className="mobile-photo-wrapper">
              <img
                src="/images/janver-professional.png"
                alt="Janver Manlapaz"
                loading="eager"
              />
              <div className="mobile-float-tag tag-left">
                <span className="tag-icon">⚡</span>
                <span className="tag-text">Full Stack</span>
              </div>
              <div className="mobile-float-tag tag-right">
                <span className="tag-icon">🤖</span>
                <span className="tag-text">AI Engineer</span>
              </div>
            </div>
          </div>

          {/* Mobile Hero Actions & Scroll cue */}
          <div className="mobile-hero-actions">
            <a href="#work" className="mobile-cta-btn primary">
              <span>View Projects</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <a
              href="/Janver_Manlapaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cta-btn secondary"
            >
              <span>Resume</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>

          <div className="mobile-scroll-cue">
            <span>SCROLL</span>
            <div className="mobile-scroll-line">
              <div className="mobile-scroll-dot"></div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
