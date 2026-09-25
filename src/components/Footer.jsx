import { userProfile } from "../data";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} style={{
      padding: "6rem 2rem 2rem",
      display: "flex",
      flexDirection: "column",
      gap: "4rem",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      marginTop: "10rem"
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        <div>
          <h3 className="body-text" style={{ marginBottom: "1rem" }}>Subscribe to the newsletter</h3>
          <p className="ui-label" style={{ marginBottom: "2rem", textTransform: "none", letterSpacing: "normal" }}>
            Thoughts on design, motion, and digital experiences. No spam, ever.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <label className="ui-label" style={{ marginBottom: "0.5rem" }}>Email Address</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--accent-color)",
                  color: "var(--text-color)",
                  padding: "0.5rem 0",
                  fontFamily: "var(--ui-font)",
                  fontSize: "1rem",
                  outline: "none",
                  width: "100%"
                }}
              />
            </div>
            <button type="submit" data-cursor="Submit" style={{
              borderBottom: "1px solid var(--text-color)",
              padding: "0.5rem 0",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontSize: "0.875rem"
            }}>
              Join
            </button>
          </form>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
          <h3 className="ui-label">Elsewhere</h3>
          {userProfile.socials.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              data-cursor="Open"
              className="body-text hover-link"
              style={{ position: "relative" }}
            >
              {social.name}
            </a>
          ))}
          <a href={`mailto:${userProfile.email}`} data-cursor="Email" className="body-text hover-link">
            Email
          </a>
        </div>
      </div>

      <div style={{ paddingTop: "4rem", borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Marquee for Organisation and Developer */}
        <div className="marquee-container">
          <div className="marquee-content" data-cursor="beyondvikas">
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", paddingRight: "4rem" }}>
                <span className="display-text" style={{ fontSize: "clamp(3rem, 10vw, 8rem)", whiteSpace: "nowrap", lineHeight: 1 }}>
                  beyondvikas
                </span>
                <span className="ui-label" style={{ margin: "0 3rem", fontSize: "1rem" }}>
                  Developer: Vikas Sharma
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
           <span className="ui-label">© {new Date().getFullYear()} beyondvikas</span>
           <span className="ui-label">All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
