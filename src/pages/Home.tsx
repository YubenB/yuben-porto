import { Briefcase, Mail } from "lucide-react";
import InteractiveButton from "../components/ui/InteractiveButton";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
        <div className="order-2 md:order-1 md:col-span-3 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-snug bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
            Yuben Rizky Putra Bauty | Software Engineer
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
            I am Yuben Rizky Putra Bauty, often called Yuben, a backend-focused
            Full-Stack Software Engineer building integration-heavy platforms,
            agentic AI workflows, and high-concurrency backend systems.
            <br />
            <br />I currently work at Hexacode Teknologi Indonesia as a
            Full-Stack Developer / AI Agentic Engineer, building an on-premise
            agentic AI platform for enterprise banking, alongside a remote
            freelance role architecting a webhook system and admin dashboard for
            a digital platform. Previously, I was a Backend Developer at Rakhasa
            Artha Wisesa, working with Node.js, PostgreSQL, RabbitMQ/Kafka, and
            Go-based schedulers.
          </p>
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
