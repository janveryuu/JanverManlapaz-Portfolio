import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextSplitter } from "../../utils/textSplitter";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: TextSplitter;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  if (window.innerWidth < 900) {
    paras.forEach((para) => {
      if (para.anim) {
        para.anim.kill();
        para.anim = undefined;
      }
      para.split?.revert();
      para.split = undefined;
      para.classList.add("visible");
    });
    titles.forEach((title) => {
      if (title.anim) {
        title.anim.kill();
        title.anim = undefined;
      }
      title.split?.revert();
      title.split = undefined;
    });
    return;
  }

  const TriggerStart = window.innerWidth <= 1024 ? "top 75%" : "20% 65%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.kill();
    }
    para.split?.revert();

    para.split = new TextSplitter(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement || para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.9,
        ease: "power3.out",
        y: 0,
        stagger: 0.015,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.kill();
    }
    title.split?.revert();

    title.split = new TextSplitter(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });

    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 60, rotate: 6 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement || title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.out",
        y: 0,
        rotate: 0,
        stagger: 0.02,
      }
    );
  });
}
