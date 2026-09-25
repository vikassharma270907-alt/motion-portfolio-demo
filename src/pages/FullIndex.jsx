import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { projects } from "../data";
import { pageTransition } from "../utils/animations";

export default function FullIndex() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "expo.out", delay: 0.2 }
    );
  }, []);

  const handleProjectClick = (slug, e) => {
    e.preventDefault();
    pageTransition(() => {
      navigate(`/projects/${slug}`);
    });
  };

  return (
    <div style={{ padding: "10rem 2rem 2rem", maxWidth: "1300px", margin: "0 auto", minHeight: "100vh" }}>
      <h1 className="ui-label" style={{ marginBottom: "4rem" }}>Full Archive</h1>
      
      <div ref={containerRef} style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={(e) => handleProjectClick(project.slug, e)}
            data-cursor="View"
            style={{
              display: "grid",
              gridTemplateColumns: "4rem 2fr 1fr",
              padding: "1.5rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              color: "var(--accent-color)",
              cursor: "pointer",
              transition: "color 0.3s ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = "var(--text-color)"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = "var(--accent-color)"; }}
          >
            <span className="ui-label" style={{ color: "inherit" }}>{project.id}</span>
            <span className="body-text" style={{ color: "inherit" }}>{project.title}</span>
            <span className="ui-label" style={{ color: "inherit", textAlign: "right" }}>{project.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
