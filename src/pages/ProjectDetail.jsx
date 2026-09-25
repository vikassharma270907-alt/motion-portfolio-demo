import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data";
import { splitText, revealText, fadeUp } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const titleRef = useRef(null);
  const heroImgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    // Split and reveal title
    const splitTitle = splitText(titleRef.current, "lines");
    splitTitle.lines.forEach(line => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrapper");
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    revealText(splitTitle.lines, 0.2);

    // Fade up image
    gsap.fromTo(
      heroImgRef.current,
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 0.4 }
    );

    // Fade up content
    fadeUp(contentRef.current, 0.8);

    return () => {
      splitTitle.revert();
    };
  }, [project]);

  if (!project) {
    return <div style={{ padding: "10rem 2rem", textAlign: "center" }}>Project not found.</div>;
  }

  return (
    <article style={{ padding: "8rem 2rem 2rem", maxWidth: "1300px", margin: "0 auto" }}>
      <header style={{ marginBottom: "4rem" }}>
        <Link 
          to="/" 
          data-cursor="Home" 
          className="ui-label" 
          style={{ 
            display: "inline-block", 
            marginBottom: "4rem", 
            color: "var(--bg-color)",
            backgroundColor: "var(--text-color)",
            padding: "0.75rem 1.5rem",
            borderRadius: "2rem",
            fontWeight: "bold",
            transition: "transform 0.2s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(0.95)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          ← Back to Home
        </Link>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span className="ui-label">{project.category}</span>
          <h1 ref={titleRef} className="display-text">{project.title}</h1>
        </div>
      </header>

      <figure 
        ref={heroImgRef}
        style={{
          width: "100%",
          height: "70vh",
          overflow: "hidden",
          marginBottom: "6rem",
          position: "relative"
        }}
      >
        <img 
          src={project.image} 
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </figure>

      <section ref={contentRef} style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "10rem" }}>
        <h2 className="ui-label" style={{ marginBottom: "2rem" }}>Overview</h2>
        <p className="body-text" style={{ fontSize: "1.5rem", lineHeight: "1.5", marginBottom: "2rem" }}>
          {project.description}
        </p>
        <p className="body-text" style={{ color: "var(--accent-color)", marginBottom: "3rem" }}>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        {project.demoUrl && (
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            data-cursor="Launch"
            style={{
              display: "inline-block",
              background: "var(--text-color)",
              color: "var(--bg-color)",
              padding: "1.25rem 2.5rem",
              borderRadius: "4px",
              fontFamily: "var(--ui-font)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
              textDecoration: "none",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Visit Live Project ↗
          </a>
        )}
      </section>
    </article>
  );
}
