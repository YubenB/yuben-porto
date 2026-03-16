import { Briefcase, Mail } from "lucide-react";
import InteractiveButton from "../components/ui/InteractiveButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
        <div className="order-2 md:order-1 md:col-span-3 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-snug bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
            Yuben Rizky Putra Bauty (Yuben) | Software Engineer
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
            I am Yuben Rizky Putra Bauty, often called Yuben, a Full-Stack
            Software Engineer with strong backend specialization, experienced in
            designing high-concurrency enterprise systems, financial transaction
            platforms, and scalable microservices architectures.
            <br />
            <br />
            Currently working as a Full-Stack Developer (Freelance) for a
            Digital Platform Indonesia, I architect and maintain a large-scale
            transactional system built with PHP 8 and CodeIgniter 4.
            {isExpanded && (
              <>
                <span> </span>The platform integrates with 10+ external service
                providers, processes high-volume financial operations, and
                implements strict security mechanisms including HMAC validation,
                IP whitelisting, idempotent transaction handling, and role-based
                access control (RBAC). I designed the webhook engine, wallet
                system, incentive rule engine, and administrative control panel
                from the ground up, ensuring transactional integrity and
                operational reliability.
                <br />
                <br />
                Previously, I worked as a Backend Developer at Rakhasa Artha
                Wisesa Corp, where I built REST APIs using Node.js and
                TypeScript, designed PostgreSQL database schemas, and
                implemented authentication and validation systems. I helped
                architect a microservices ecosystem using Go, applying CQRS to
                improve scalability and performance. I also engineered an
                automated Linux server provisioning system that dynamically
                deploys websites, configures Nginx virtual hosts, and integrates
                DNS/CDN services (including Bunny.net and Cloudflare) to support
                large-scale deployment automation.
                <br />
                <br />
                Outside of work, I freelance on React Native mobile apps that
                solve real-world problems, from forest monitoring to insurance
                claim processing. I’m also pursuing a Computer Science degree at
                Binus Online Learning, continuously sharpening my skills in
                clean architecture, design patterns, and infrastructure tools.
              </>
            )}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <InteractiveButton
              href="/contact"
              icon={<Mail size={16} />}
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
              }}
            >
              Contact Me
            </InteractiveButton>
            <InteractiveButton
              href="/projects"
              icon={<Briefcase size={16} />}
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/projects");
              }}
            >
              View My Work
            </InteractiveButton>
          </div>
        </div>
        <div className="order-1 md:order-2 md:col-span-2 md:justify-self-end">
          <img
            src="/images/profile.jpg"
            alt="Portrait of Yuben Rizky Putra Bauty"
            width="320"
            height="320"
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 18rem, 14rem"
            className="mx-auto md:mx-0 h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full object-cover shadow-lg ring-1 ring-neutral-800 md:scale-[1.25] scale-[1]"
            style={{ objectPosition: "center" }}
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">
          Core Technologies
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "JavaScript",
            "TypeScript",
            "Node.js",
            "NestJS",
            "React",
            "Next.js",
            "React Native",
            "PostgreSQL",
            "Docker",
            "Kubernetes",
            "RabbitMQ",
            "Go",
          ].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-neutral-800 bg-black/40 px-3 py-1 text-xs sm:text-sm text-neutral-300 transition-colors hover:border-neutral-700 hover:bg-black/60"
              aria-label={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <section className="mt-14 rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">
          About Yuben Rizky Putra Bauty
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-300">
          If you were searching for <strong>Yuben Rizky Putra Bauty</strong>,
          you are in the right place. This is the official portfolio of Yuben,
          featuring software engineering projects, technical articles, and
          professional experience.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            to="/projects"
            className="text-sky-300 hover:text-sky-200 underline underline-offset-4"
          >
            View Yuben Rizky Putra Bauty projects
          </Link>
          <Link
            to="/articles"
            className="text-sky-300 hover:text-sky-200 underline underline-offset-4"
          >
            Read articles by Yuben
          </Link>
          <Link
            to="/contact"
            className="text-sky-300 hover:text-sky-200 underline underline-offset-4"
          >
            Contact Yuben Rizky Putra Bauty
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
