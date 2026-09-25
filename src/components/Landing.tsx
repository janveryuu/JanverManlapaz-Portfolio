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

          {/* Mobile photo section with ambient glow */}
          <div className="mobile-photo">
            <div className="mobile-photo-backdrop"></div>
            <div className="mobile-photo-wrapper">
              <img
                src="/images/janver-professional.png"
                alt="Janver Manlapaz"
                loading="eager"
              />
            </div>
          </div>

          {/* Mobile Hero Actions & Scroll cue */}
          <div className="mobile-hero-actions">
            <a href="#work" className="mobile-cta-btn primary">
              <span>View Projects</span>
            </a>
            <a
              href="/Janver_Manlapaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cta-btn secondary"
            >
              <span>Resume</span>
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
