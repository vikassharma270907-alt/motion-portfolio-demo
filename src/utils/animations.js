import gsap from "gsap";
import SplitType from "split-type";

export const splitText = (element, type = "lines") => {
  return new SplitType(element, { types: type });
};

export const revealText = (elements, delay = 0) => {
  gsap.fromTo(
    elements,
    { y: "100%" },
    {
      y: "0%",
      duration: 1.2,
      stagger: 0.08,
      ease: "expo.out",
      delay: delay,
    }
  );
};

export const fadeUp = (element, delay = 0) => {
  gsap.fromTo(
    element,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay }
  );
};

// Transition overlay logic
export const pageTransition = (onComplete) => {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "#0a0a0a";
  overlay.style.zIndex = "99999";
  overlay.style.transformOrigin = "bottom";
  document.body.appendChild(overlay);

  gsap.fromTo(
    overlay,
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 0.6,
      ease: "expo.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
        overlay.style.transformOrigin = "top";
        gsap.to(overlay, {
          scaleY: 0,
          duration: 0.6,
          ease: "expo.inOut",
          delay: 0.1,
          onComplete: () => {
            overlay.remove();
          }
        });
      }
    }
  );
};
