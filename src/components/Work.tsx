import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSProperties, useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { DESKTOP_QUERY, useIsMobile } from "../mobile/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Pin-scroll only above the mobile breakpoint. gsap.matchMedia reverts the
    // pin + translate when the viewport crosses into mobile (resize/rotation),
    // so phones always get the native vertical layout.
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_QUERY, () => {
      const workContainer = document.querySelector(".work-container") as HTMLElement;
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      const boxes = document.querySelectorAll(".work-box");
      if (!workContainer || !workFlex || boxes.length === 0) return;

      const getTranslateX = () => {
        const lastBox = boxes[boxes.length - 1] as HTMLElement;
        if (!lastBox) return 0;
        const containerRect = workContainer.getBoundingClientRect();
        const lastBoxRect = lastBox.getBoundingClientRect();
        const excess = lastBoxRect.right - containerRect.right + 80;
        return Math.max(0, excess);
      };

      const initialDistance = getTranslateX();
      if (initialDistance <= 0) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: () => -getTranslateX(),
        ease: "none",
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
      ScrollTrigger.refresh();

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => mm.revert();
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => (
            <div
              className="work-box"
              key={project.id}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
          {/* See All Works Button */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and creations</p>
              <Link
                to="/myworks"
                className="see-all-btn"
                data-cursor="disable"
                viewTransition={isMobile}
              >
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
