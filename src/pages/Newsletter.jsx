import { useEffect, useRef } from "react";
import { fadeUp } from "../utils/animations";

export default function Newsletter() {
  const containerRef = useRef(null);

  useEffect(() => {
    fadeUp(containerRef.current, 0.2);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
      <div ref={containerRef} style={{ maxWidth: "500px", width: "100%", textAlign: "center" }}>
        <h1 className="display-text" style={{ fontSize: "3rem", marginBottom: "1rem" }}>Stay in the loop</h1>
        <p className="body-text" style={{ color: "var(--accent-color)", marginBottom: "3rem" }}>
          Thoughts on design, motion, and digital experiences. Occasional updates, no spam.
        </p>
        
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "2rem", textAlign: "left" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="ui-label" style={{ marginBottom: "1rem" }}>Your Email</label>
            <input 
              type="email" 
              placeholder="hello@example.com"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--accent-color)",
                color: "var(--text-color)",
                padding: "1rem 0",
                fontFamily: "var(--ui-font)",
                fontSize: "1.25rem",
                outline: "none"
              }}
            />
          </div>
          <button 
            type="submit" 
            data-cursor="Subscribe"
            style={{
              background: "var(--text-color)",
              color: "var(--bg-color)",
              padding: "1.25rem 2rem",
              borderRadius: "4px",
              fontFamily: "var(--ui-font)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
