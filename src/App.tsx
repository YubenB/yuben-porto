import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Articles from "./pages/Article";
import ArticleDetailRoute from "./pages/ArticleDetailRoute.tsx";
import ProjectDetailRoute from "./pages/ProjectDetailRoute";
import Experience from "./pages/Experience";

export interface NavItem {
  id: string;
  label: string;
}

export default function App() {
  // location is not needed here currently; routes transition without keying

  // Set body background color
  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const navItems: NavItem[] = [
    { id: "/", label: "Home" },
    { id: "/projects", label: "Projects" },
    { id: "/experience", label: "Experience" },
    { id: "/articles", label: "Articles" },
    { id: "/contact", label: "Contact" },
  ];

  return (
    <Layout navItems={navItems}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetailRoute />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetailRoute />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
