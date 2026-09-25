import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText, revealText, fadeUp, pageTransition } from "../utils/animations";
import { projects, userProfile } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTitleRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const projectsRef = useRef([]);
  const previewRef = useRef(null);
  const previewImgRef = useRef(null);
  const navigate = useNavigate();

  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    // Hero Animations
    const splitTitle = splitText(heroTitleRef.current, "lines");
    // Wrap lines
    splitTitle.lines.forEach(line => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrapper");
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    revealText(splitTitle.lines, 0.2);
    fadeUp(bioRef.current, 0.8);
    
    // Stats counter (simplified for now to just fade in, can be enhanced)
    fadeUp(statsRef.current, 1);

    // Project Row Animations
    projectsRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // Preview Image Lerp setup
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    const speed = 0.1;

    const updateCoordinates = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", updateCoordinates);

    const ticker = gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      if (previewRef.current) {
        gsap.set(previewRef.current, { x: pos.x, y: pos.y });
      }
    });

    return () => {
      splitTitle.revert();
      window.removeEventListener("mousemove", updateCoordinates);
      gsap.ticker.remove(ticker);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleProjectHover = (project) => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setActiveProject(project);
      gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" });
    }
  };

  const handleProjectLeave = () => {
    gsap.to(previewRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: "expo.out" });
  };

  const handleProjectClick = (slug, e) => {
    e.preventDefault();
    handleProjectLeave();
    pageTransition(() => {
      navigate(`/projects/${slug}`);
    });
  };

  return (
    <div style={{ padding: "8rem 2rem 2rem", maxWidth: "1300px", margin: "0 auto" }}>
      {/* Hero Section */}
      <section style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "8rem" }}>
        <h1 
          ref={heroTitleRef} 
          className="display-text" 
          style={{ marginBottom: "2rem", maxWidth: "900px" }}
        >
          {userProfile.name} — <br/> {userProfile.role}
        </h1>
        
        <div ref={bioRef} style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          {userProfile.bio.map((paragraph, idx) => (
            <p key={idx} className="body-text">{paragraph}</p>
          ))}
        </div>

        <div ref={statsRef} className="ui-label" style={{ color: "var(--text-color)" }}>
          {userProfile.stats}
        </div>
      </section>

      {/* Featured Work Section */}
      <section style={{ position: "relative" }}>
        <h2 className="ui-label" style={{ marginBottom: "4rem" }}>Featured Work</h2>
        
        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((project, idx) => (
            <div 
              key={project.id}
              ref={el => projectsRef.current[idx] = el}
              onMouseEnter={() => handleProjectHover(project)}
              onMouseLeave={handleProjectLeave}
              onClick={(e) => handleProjectClick(project.slug, e)}
              data-cursor="View Case"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "3rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                cursor: "pointer",
                transition: "padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease"
              }}
              onMouseOver={(e) => { e.currentTarget.style.paddingLeft = "2rem"; e.currentTarget.style.color = "var(--text-color)"; }}
              onMouseOut={(e) => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.color = "var(--accent-color)"; }}
            >
              <span className="ui-label" style={{ width: "4rem", color: "inherit" }}>{project.id}</span>
              <h3 className="display-text" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", flex: 1, margin: 0, color: "inherit" }}>
                {project.title}
              </h3>
              <span className="ui-label hide-mobile" style={{ marginLeft: "auto", color: "inherit" }}>
                {project.category}
              </span>
            </div>
          ))}
        </div>

        {/* Hover Preview Element */}
        <div 
          ref={previewRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "350px",
            height: "450px",
            pointerEvents: "none",
            opacity: 0,
            scale: 0.9,
            transform: "translate(-50%, -50%)", // Center on cursor
            zIndex: 10,
            overflow: "hidden",
            display: window.matchMedia("(pointer: coarse)").matches ? "none" : "block"
          }}
        >
          {activeProject && (
            <img 
              ref={previewImgRef}
              src={activeProject.image} 
              alt={activeProject.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
