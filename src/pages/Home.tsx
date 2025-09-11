import { Briefcase, Mail } from "lucide-react";
import InteractiveButton from "../components/ui/InteractiveButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
        <div className="order-2 md:order-1 md:col-span-3 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-snug bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
            Yuben Bauty | Software Engineer
          </h1>
          <p className="mt-6 text-neutral-300 max-w-2xl text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
            Hi, I’m Yuben Rizky Putra Bauty, a passionate Software Engineer
            focused on backend systems, mobile apps, and web development.
            Currently, I work as a Backend Developer at Rakhasa Artha Wisesa,
            where I architect and scale event-driven microservices using NestJS,
            Kafka, RabbitMQ, and Golang in an Agile environment.
            <br />
            <br />
            Outside of work, I freelance on React Native mobile apps that solve
            real-world problems—from forest monitoring to insurance claim
            processing. I’m also pursuing a Computer Science degree at Binus
            Online Learning, continuously sharpening my skills in clean
            architecture, design patterns, and infrastructure tools.
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
    </div>
  );
};

export default Home;
