import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import Lenis from "lenis";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FullIndex from "./pages/FullIndex";
import ProjectDetail from "./pages/ProjectDetail";
import Newsletter from "./pages/Newsletter";
import Meeting from "./pages/Meeting";
import "./index.css";

// Lenis scroll integration component
function ScrollManager() {
  const location = useLocation();
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="full" element={<FullIndex />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="meeting" element={<Meeting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
