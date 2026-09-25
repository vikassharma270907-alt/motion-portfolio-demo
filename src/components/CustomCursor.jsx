import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Lerp setup
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    const speed = 0.2; // Damping

    const updateCoordinates = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", updateCoordinates);

    const ticker = gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      gsap.set(cursorRef.current, { x: pos.x, y: pos.y });
    });

    // Handle hover states
    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setIsHovering(true);
        setCursorText(target.getAttribute("data-cursor") || "");
        gsap.to(cursorRef.current, {
          scale: 3,
          duration: 0.3,
          ease: "expo.out",
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setIsHovering(false);
        setCursorText("");
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "expo.out",
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateCoordinates);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      {isHovering && <span style={{ fontSize: "3px" }}>{cursorText}</span>}
    </div>
  );
}
