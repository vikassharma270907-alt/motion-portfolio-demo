import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="noise-overlay"></div>
      <CustomCursor />
      <Header />
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
