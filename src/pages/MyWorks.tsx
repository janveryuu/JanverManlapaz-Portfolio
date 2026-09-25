import { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";

const MyWorks = () => {
  useEffect(() => {
    // Explicitly unlock scrolling across all devices and reset scroll position to top
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.overflowX = "hidden";
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowY = "";
      document.body.style.overflowX = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowY = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="myworks-card-link"
                  data-cursor="disable"
                >
                  View Live →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
