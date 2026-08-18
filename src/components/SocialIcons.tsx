import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { config } from "../config";

const SocialIcons = () => {
  useEffect(() => {
    // Skip on touch/mobile
    if (window.innerWidth <= 768) return;

    const social = document.getElementById("social");
    if (!social) return;

    const items = social.querySelectorAll("span");
    const itemData: Array<{
      link: HTMLElement;
      elem: HTMLElement;
      mouseX: number;
      mouseY: number;
      currentX: number;
      currentY: number;
    }> = [];

    items.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;
      const rect = elem.getBoundingClientRect();
      itemData.push({
        link,
        elem,
        mouseX: rect.width / 2,
        mouseY: rect.height / 2,
        currentX: 0,
        currentY: 0,
      });
    });

    let rafId: number;
    const updatePosition = () => {
      itemData.forEach((data) => {
        data.currentX += (data.mouseX - data.currentX) * 0.1;
        data.currentY += (data.mouseY - data.currentY) * 0.1;
        data.link.style.setProperty("--siLeft", `${data.currentX}px`);
        data.link.style.setProperty("--siTop", `${data.currentY}px`);
      });
      rafId = requestAnimationFrame(updatePosition);
    };
    rafId = requestAnimationFrame(updatePosition);

    const onMouseMove = (e: MouseEvent) => {
      itemData.forEach((data) => {
        const rect = data.elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          data.mouseX = x;
          data.mouseY = y;
        } else {
          data.mouseX = rect.width / 2;
          data.mouseY = rect.height / 2;
        }
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={config.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href={config.contact.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/Janver_Manlapaz_Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
