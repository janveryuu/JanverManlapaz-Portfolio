import "./styles/Certifications.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { config, Certification } from "../config";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { FiX, FiExternalLink } from "react-icons/fi";
import { DESKTOP_QUERY, prefersReducedMotion, useIsMobile } from "../mobile/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const SHEET_EXIT_MS = 280;

/** Marks an image's frame as loaded so the mobile shimmer skeleton fades out (also handles cached images). */
const markLoaded = (img: HTMLImageElement | null) => {
  if (img && img.complete && img.naturalWidth > 0) {
    img.parentElement?.classList.add("is-loaded");
  }
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [sheetClosing, setSheetClosing] = useState(false);
  const [modalImgLoaded, setModalImgLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useIsMobile();

  const flexRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; startT: number; dy: number; active: boolean }>({
    startY: 0,
    startT: 0,
    dy: 0,
    active: false,
  });

  const certs = (config.certifications as Certification[]).slice(0, 7);
  const slideCount = certs.length + 1; // + "See all" CTA slide

  const openCert = (cert: Certification) => {
    setModalImgLoaded(false);
    setSheetClosing(false);
    setSelectedCert(cert);
  };

  // Mobile closes with a slide-down exit; desktop closes instantly as before
  const closeModal = useCallback(() => {
    if (isMobile && !prefersReducedMotion()) {
      setSheetClosing(true);
      window.setTimeout(() => {
        setSelectedCert(null);
        setSheetClosing(false);
      }, SHEET_EXIT_MS);
    } else {
      setSelectedCert(null);
    }
  }, [isMobile]);

  // Handle ESC key to close lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      // Mobile scroll lock (inline overflow loses to the mobile !important rules)
      if (isMobile) document.documentElement.classList.add("m-lock");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.classList.remove("m-lock");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert, closeModal, isMobile]);

  // Desktop/tablet reversed pin-scroll gallery.
  // gsap.matchMedia tears the pin down when the viewport crosses into mobile
  // (and rebuilds it on the way back), so a resized/rotated viewport never keeps
  // a stale horizontal translate that would leave the section blank.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_QUERY, () => {
      function getTranslateX() {
        const box = document.getElementsByClassName("cert-box");
        if (box.length === 0) return 0;
        const container = document.querySelector(".cert-container");
        if (!container || !box[0].parentElement) return 0;

        const rectLeft = container.getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement.getBoundingClientRect().width;
        const padding: number =
          parseInt(window.getComputedStyle(box[0]).padding) / 2 || 0;
        return Math.max(0, rect.width * box.length - (rectLeft + parentWidth) + padding);
      }

      const initialDistance = getTranslateX();
      if (initialDistance <= 0) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".certifications-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
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
        x: () => getTranslateX(),
        ease: "none",
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      // Refresh ScrollTrigger after layout settles
      ScrollTrigger.refresh();

      // Clean up
      return () => {
        timeline.kill();
        ScrollTrigger.getById("certifications")?.kill();
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => mm.revert();
  }, []);

  // Mobile carousel: track the centred slide and feed each card its distance
  // from centre (--d, 0..1) so CSS can scale/dim the neighbours.
  useEffect(() => {
    const flex = flexRef.current;
    if (!isMobile || !flex) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const boxes = Array.from(flex.children) as HTMLElement[];
      const center = flex.scrollLeft + flex.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      boxes.forEach((box, i) => {
        const boxCenter = box.offsetLeft + box.offsetWidth / 2;
        const dist = Math.abs(boxCenter - center);
        box.style.setProperty("--d", Math.min(1, dist / box.offsetWidth).toFixed(3));
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveSlide(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    flex.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      flex.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      Array.from(flex.children).forEach((box) =>
        (box as HTMLElement).style.removeProperty("--d")
      );
    };
  }, [isMobile]);

  const goToSlide = (index: number) => {
    const flex = flexRef.current;
    const box = flex?.children[index] as HTMLElement | undefined;
    if (!flex || !box) return;
    flex.scrollTo({
      left: box.offsetLeft - (flex.clientWidth - box.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // ── Bottom-sheet swipe-to-dismiss (mobile only) ──
  const onSheetTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const imageWrap = sheetRef.current?.querySelector(".cert-modal-image-wrap");
    // Don't hijack the gesture while the image area itself is scrolled
    if (imageWrap && imageWrap.contains(e.target as Node) && imageWrap.scrollTop > 0) return;
    dragRef.current = {
      startY: e.touches[0].clientY,
      startT: performance.now(),
      dy: 0,
      active: true,
    };
    if (sheetRef.current) sheetRef.current.style.transition = "none";
  };

  const onSheetTouchMove = (e: React.TouchEvent) => {
    const drag = dragRef.current;
    if (!drag.active || !sheetRef.current) return;
    const raw = e.touches[0].clientY - drag.startY;
    // Rubber-band upward pulls, follow the finger downward
    drag.dy = raw > 0 ? raw : raw * 0.15;
    sheetRef.current.style.transform = `translateY(${drag.dy}px)`;
    if (backdropRef.current) {
      const fade = Math.max(0, 1 - Math.max(0, drag.dy) / 500);
      backdropRef.current.style.setProperty("--sheet-fade", fade.toFixed(3));
    }
  };

  const onSheetTouchEnd = () => {
    const drag = dragRef.current;
    const sheet = sheetRef.current;
    if (!drag.active || !sheet) return;
    drag.active = false;
    const velocity = drag.dy / Math.max(1, performance.now() - drag.startT); // px/ms
    sheet.style.transition = "";
    if (drag.dy > 110 || (drag.dy > 30 && velocity > 0.55)) {
      // Keep the dragged offset: the exit keyframes continue from it
      closeModal();
    } else {
      sheet.style.transform = "";
      backdropRef.current?.style.removeProperty("--sheet-fade");
    }
  };

  return (
    <div className="certifications-section" id="certifications">
      <div className="cert-container section-container">
        <h2>
          My <span>Certifications</span>
        </h2>
        <div className="cert-flex" ref={flexRef}>
          {certs.map((cert, index) => (
            <div className="cert-box" key={cert.id}>
              <div className="cert-info">
                <div className="cert-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>

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
                  onClick={() => openCert(cert)}
                  data-cursor="disable"
                  title="Click to inspect certificate"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openCert(cert);
                    }
                  }}
                >
                  <div className="cert-link">
                    <MdArrowOutward />
                  </div>
                  <img
                    ref={markLoaded}
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => markLoaded(e.currentTarget)}
                  />
                  {isMobile && <span className="cert-tap-hint">Tap to view</span>}
                </div>
              </div>
            </div>
          ))}

          {/* See All Certificates CTA Box */}
          <div className="cert-box cert-box-cta">
            <div className="see-all-certs">
              <h3>Want to see more?</h3>
              <p>Explore all of my credentials and certifications</p>
              <Link
                to="/certificates"
                className="see-all-btn"
                data-cursor="disable"
                viewTransition={isMobile}
              >
                See All Certificates →
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile carousel pager: counter + dots */}
        {isMobile && (
          <div className="cert-pager" aria-label="Certificate slides">
            <span className="cert-pager-count" aria-live="polite">
              <strong>{String(Math.min(activeSlide + 1, slideCount)).padStart(2, "0")}</strong>
              {" / "}
              {String(slideCount).padStart(2, "0")}
            </span>
            <div className="cert-pager-dots">
              {Array.from({ length: slideCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`cert-pager-dot${i === activeSlide ? " is-active" : ""}`}
                  aria-label={i < certs.length ? `Go to certificate ${i + 1}` : "Go to see all certificates"}
                  aria-current={i === activeSlide ? "true" : undefined}
                  onClick={() => goToSlide(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Inspection Modal (bottom sheet on mobile) */}
      {selectedCert && (
        <div
          ref={backdropRef}
          className={`cert-modal-backdrop${sheetClosing ? " is-closing" : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div
            ref={sheetRef}
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onSheetTouchStart}
            onTouchMove={onSheetTouchMove}
            onTouchEnd={onSheetTouchEnd}
            onTouchCancel={onSheetTouchEnd}
          >
            {isMobile && <div className="cert-sheet-handle" aria-hidden="true" />}
            <button
              className="cert-modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FiX />
            </button>

            <div className={`cert-modal-image-wrap${modalImgLoaded ? " is-loaded" : ""}`}>
              <img
                src={selectedCert.image || selectedCert.credentialUrl}
                alt={selectedCert.title}
                className="cert-modal-img"
                onLoad={() => setModalImgLoaded(true)}
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
