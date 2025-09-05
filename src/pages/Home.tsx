import { Briefcase, Mail } from "lucide-react";
import InteractiveButton from "../components/ui/InteractiveButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-snug bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
        Software Engineer Crafting Modern Web & Mobile Solutions.
      </h1>
      <p className="mt-6 text-neutral-300 max-w-2xl text-base sm:text-lg leading-relaxed">
        Hi, I’m Yuben, a passionate Software Engineer focused on backend
        systems, mobile apps, and web development. Currently, I work as a
        Backend Developer at Rakhasa Artha Wisesa, where I architect and scale
        event-driven microservices using NestJS, Kafka, RabbitMQ, and Golang in
        an Agile environment.
        <br />
        <br />
        <span className="block font-semibold text-neutral-200 mt-2 mb-1">
          Key achievements:
        </span>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            Automated server provisioning pipelines for on-demand Linux VM
            creation and deployment via SSH.
          </li>
          <li>
            Integrated external services like Bunny.net and Cloudflare for
            seamless DNS/CDN automation.
          </li>
          <li>
            Designed flexible SEO and media infrastructure to support dynamic,
            high-performance websites.
          </li>
          <li>
            Managed multiple Go-based services, including Auth, Payments, and
            Blast (email/WhatsApp) modules.
          </li>
        </ul>
        <br />
        Outside of work, I freelance on React Native mobile apps that solve
        real-world problems—from forest monitoring to insurance claim
        processing. I’m also pursuing a Computer Science degree at Binus Online
        Learning, continuously sharpening my skills in clean architecture,
        design patterns, and infrastructure tools.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
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
