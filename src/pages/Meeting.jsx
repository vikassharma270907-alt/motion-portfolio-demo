import { useEffect, useRef } from "react";
import { fadeUp } from "../utils/animations";
import { InlineWidget } from "react-calendly";

export default function Meeting() {
  const containerRef = useRef(null);

  useEffect(() => {
    fadeUp(containerRef.current, 0.2);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "8rem 2rem 2rem" }}>
      <div ref={containerRef} style={{ width: "100%", maxWidth: "1000px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="display-text" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: "1rem" }}>Let's talk</h1>
          <p className="body-text" style={{ color: "var(--accent-color)" }}>
            Book a meeting directly on my calendar.
          </p>
        </div>
        
        {/* Replace the URL below with your actual Calendly link */}
        <div style={{ height: "700px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", background: "#111" }}>
          <InlineWidget 
            url="https://calendly.com/vikas-sharma270907" 
            styles={{
              height: '100%',
              width: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
}
