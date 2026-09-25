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
    <div className="page-container" style={{ minHeight: "100vh" }}>
      <h1 className="ui-label" style={{ marginBottom: "4rem" }}>Full Archive</h1>
      
      <div ref={containerRef} style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={(e) => handleProjectClick(project.slug, e)}
            data-cursor="View"
            className="archive-grid"
            style={{
              color: "var(--accent-color)",
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = "var(--text-color)"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = "var(--accent-color)"; }}
          >
            <span className="ui-label archive-grid-id" style={{ color: "inherit" }}>{project.id}</span>
            <span className="body-text" style={{ color: "inherit" }}>{project.title}</span>
            <span className="ui-label" style={{ color: "inherit", textAlign: "left" }}>{project.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
