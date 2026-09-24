import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const projectImages: Record<string, string> = {
  "hexa-ai": "/images/projects/hexa-ai/control-plane-hero.webp",
  "hexa-dashboard": "/images/projects/hexa-dashboard/overview.png",
  "hexa-sensor": "/images/projects/hexa-sensor/overview.png",
  "simontana-forest-monitoring": "/images/projects/simontana/simontana_1.png",
  "intra-asia-insurance": "/images/projects/intra-asia/1.jpg",
  "erzengel-ecommerce": "/images/projects/erzengel/home.png",
  "fvi-company-profile": "/images/projects/fvi/hero.png",
  "hhh-company-profile": "/images/projects/hhh/home.png",
};

const Projects = () => (
  <div className="inner-page projects-page">
    <div className="page-intro"><p className="section-kicker">Projects</p><h1>Work that went <em>into the world.</em></h1><p>A selection of platforms, automation workflows, and applications I've helped build across AI, backend, web, and mobile.</p></div>
    <div className="project-list">
      {projects.map((project, index) => (
        <Link to={`/projects/${project.slug}`} key={project.slug} className="project-list-item">
          <div className="project-list-image"><img src={projectImages[project.slug || ""]} alt={`${project.title} interface`} loading={index < 2 ? "eager" : "lazy"} /></div>
          <div className="project-list-copy"><span className="project-index">{String(index + 1).padStart(2, "0")} / {project.category}</span><h2>{project.title}</h2><p>{project.description}</p><span className="project-view">View case study <ArrowUpRight size={18} strokeWidth={1.7} /></span></div>
        </Link>
      ))}
    </div>
  </div>
);

export default Projects;
