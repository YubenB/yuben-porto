import { projects } from "../data/projects";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const Projects = () => (
  <div>
    <h2 className="text-3xl font-bold tracking-tighter">
      Freelance & Personal Projects
    </h2>
    <p className="mt-2 text-neutral-400">
      A selection of my work, demonstrating my skills in building real-world
      applications.
    </p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-lg hover:border-neutral-700 transition-all duration-300 group"
        >
          <Link
            to={`/projects/${encodeURIComponent((project as any).slug || "")}`}
            className="block focus:outline-none"
          >
            <div className="flex items-start justify-between">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="h-8"
                />
              ) : (
                React.createElement(project.icon)
              )}
              <span className="text-xs font-medium text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded-full">
                {project.category}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              {project.description}
            </p>
            <div className="mt-4">
              <span className="text-sm font-medium text-cyan-400 flex items-center group-hover:translate-x-1 transition-transform duration-300">
                View Case Study <ArrowRight size={14} className="ml-1" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Projects;
