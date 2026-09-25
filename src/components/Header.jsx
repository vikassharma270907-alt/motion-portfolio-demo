import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { userProfile } from "../data";

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Blur background logic
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show on scroll
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isHidden) {
      gsap.to(headerRef.current, { y: "-100%", duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(headerRef.current, { y: "0%", duration: 0.3, ease: "power2.out" });
    }
  }, [isHidden]);

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        padding: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        transition: "background-color 0.3s, backdrop-filter 0.3s",
        backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.6)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Link to="/" data-cursor="Home" style={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "-0.01em" }}>
          {userProfile.name}
        </Link>
        <span className="ui-label">Profile</span>
      </div>

      <nav style={{ display: "flex", gap: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to="/" data-cursor="View" className="ui-label" style={{ color: location.pathname === '/' ? 'var(--text-color)' : 'var(--accent-color)' }}>
            Featured
          </Link>
          <span className="ui-label">/</span>
          <Link to="/full" data-cursor="View" className="ui-label" style={{ color: location.pathname === '/full' ? 'var(--text-color)' : 'var(--accent-color)' }}>
            Full
          </Link>
        </div>
        <Link to="/newsletter" data-cursor="Subscribe" className="ui-label" style={{ color: location.pathname === '/newsletter' ? 'var(--text-color)' : 'var(--accent-color)' }}>
          Newsletter
        </Link>
        <Link to="/meeting" data-cursor="Book" className="ui-label" style={{ color: location.pathname === '/meeting' ? 'var(--text-color)' : 'var(--accent-color)' }}>
          Meeting
        </Link>
      </nav>
    </header>
  );
}
