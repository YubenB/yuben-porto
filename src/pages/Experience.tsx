import { useMemo, useState } from "react";

// 1. Renamed 'Role' to 'TimelineEvent' and made it more generic
type TimelineEvent = {
  organization: string;
  title: string;
  start: string; // ISO date
  end?: string; // ISO date or undefined for current
  current?: boolean;
  details?: string[];
  logo?: string; // image path or URL
};

function formatDateRange(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : new Date();
  const dateFmt = new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  });
  const startStr = dateFmt.format(start);
  const endStr = endISO ? dateFmt.format(end) : "Present";
  return `${startStr} — ${endStr}`;
}

function formatDuration(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : new Date();
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remMonths > 0) parts.push(`${remMonths} mo${remMonths > 1 ? "s" : ""}`);
  return parts.length ? parts.join(" ") : "< 1 mo";
}

// 2. Renamed 'RoleItem' to 'TimelineItem' to handle any timeline event
function TimelineItem({ event }: { event: TimelineEvent }) {
  const MAX_ITEMS = 5;
  const [isExpanded, setIsExpanded] = useState(false);

  const { details = [], logo } = event;
  const hasMore = details.length > MAX_ITEMS;

  const displayedDetails =
    hasMore && !isExpanded ? details.slice(0, MAX_ITEMS) : details;

  return (
    <li className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-3">
          <img
            src={logo || "/images/placeholder-logo.png"}
            alt={event.organization + " logo"}
            className="w-10 h-10 object-contain rounded bg-neutral-800 border border-neutral-700"
            style={{ minWidth: 40 }}
          />
          <div>
            <div className="text-lg font-semibold">{event.title}</div>
            <div className="text-neutral-300">{event.organization}</div>
          </div>
        </div>
        <div className="text-sm text-neutral-400 text-left sm:text-right">
          <div>{formatDateRange(event.start, event.end)}</div>
          <div className="mt-0.5">{formatDuration(event.start, event.end)}</div>
        </div>
      </div>
      {displayedDetails.length > 0 && (
        <ul className="mt-4 list-disc list-inside space-y-1 text-sm text-neutral-300">
          {displayedDetails.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-sm font-semibold text-sky-400 hover:text-sky-300"
        >
          {isExpanded ? "View less" : "View more"}
        </button>
      )}
    </li>
  );
}

export default function Experience() {
  const workExperience: TimelineEvent[] = useMemo(
    () => [
      {
        organization: "Rakhasa Artha Wisesa Corp",
        title: "Backend Developer",
        start: "2024-10-23",
        end: "2025-10-23",
        // current: true,
        logo: "/images/companies/rakhasa_logo.jpeg",
        details: [
          "Design and implement REST APIs with Node.js/TypeScript",
          "Build data models, migrations, and queries (PostgreSQL/Prisma)",
          "Integrate authentication/authorization and request validation",
          "Write modular services, unit tests, and improve observability",
          "Collaborate with frontend/mobile to define API contracts",
          "Built an automated data scraper using Playwright and Express to retrieve dynamic data for deployment needs.",
          "Designed and implemented database infrastructure with performance and scalability in mind.",
          "Created a secure, optimized API using NestJS, following best practices and SOLID principles.",
          "Architected and deployed a scalable microservices ecosystem, breaking down features into isolated components.",
          "Implemented the CQRS pattern to enhance database performance and ensure clear separation of concerns.",
          "Engineered an automated infrastructure of server provisioning system to spin up new Linux servers on demand, orchestrate configuration via SSH, and deploy websites with custom templates.",
          "Integrated 3rd-party infrastructure services, including DNS and CDN management via Bunny.net and Cloudflare, automating record creation and configuration during deployment.",
          "Designed Nginx virtual host configuration to support dynamic subdomain routing and proxying.",
          "Designed and implemented a flexible SEO management system in the backend to support dynamic, SEO-friendly websites featuring customizable metadata, Open Graph, and JSON-LD schema support, similar to the flexibility offered by many SEO tools in WordPress plugin.",
          "Managed multiple microservices including:",
          " • Authentication Service (Go)",
          " • Payment Service (Go)",
          " • Blast Service for email & WhatsApp notifications (Go)",
          "Operated in Agile development workflows with weekly sprints, collaborating across multiple domains.",
        ],
      },
      {
        organization: "Rapit Solution",
        title: "Mobile Developer Freelance",
        start: "2023-07-06",
        end: "2024-07-06",
        logo: "/images/companies/rapit_logo.jpeg",
        details: [
          "Develop cross‑platform mobile apps (React Native)",
          "Implement responsive UI, navigation flows, and offline support",
          "Integrate APIs, push notifications, and third‑party SDKs",
          "Optimize performance, fix bugs, and publish to stores",
          "Collaborate with backend and design for feature delivery",
        ],
      },
    ],
    []
  );

  const educationHistory: TimelineEvent[] = useMemo(
    () => [
      {
        organization: "Binus Online Learning",
        title: "Bachelor of Computer Science",
        start: "2023-08-11",
        logo: "/images/educations/binus_logo.png",
        details: [
          "Specialized in software engineering and database management.",
          "Key coursework: Data Structures, Algorithms, Web Development, and Systems Analysis.",
          "Lead a team of four for the final year capstone project, developing a campus event management system.",
        ],
      },
      {
        organization: "Hacktiv8",
        title: "Full-Stack Javascript Bootcamp",
        start: "2024-06-11",
        end: "2024-10-11",
        logo: "/images/educations/hacktiv8_logo.png",
        details: [
          "Completed an intensive 6-month full-stack web development program.",
          "Gained hands-on experience with JavaScript, Node.js, React, and databases.",
          "Built multiple projects including a social media app and e-commerce site.",
          "Collaborated in agile teams, using Git and version control.",
          "Enhanced problem-solving skills through coding challenges and pair programming.",
        ],
      },
      {
        organization: "SMK Cyber Media",
        title: "Vocational High School | Computer and Network Engineering",
        start: "2020-05-01",
        end: "2023-05-30",
        logo: "/images/educations/cyber_media_logo.jpeg",
        details: [
          "Focused on computer hardware, networking, and basic programming.",
          "Completed a capstone project on building a small office network.",
          "Active member of the tech club, organizing coding workshops and hackathons.",
        ],
      },
    ],
    []
  );

  return (
    <div className="space-y-12">
      {/* Experience Section */}
      <section>
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-neutral-400 text-sm mt-1">
            A quick look at my ongoing roles and contributions.
          </p>
        </header>
        <ul className="mt-8 space-y-6">
          {workExperience.map((event, idx) => (
            <TimelineItem key={idx} event={event} />
          ))}
        </ul>
      </section>

      {/* Education Section */}
      <section>
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Education</h1>
          <p className="text-neutral-400 text-sm mt-1">
            My academic background and qualifications.
          </p>
        </header>
        <ul className="mt-8 space-y-6">
          {educationHistory.map((event, idx) => (
            <TimelineItem key={idx} event={event} />
          ))}
        </ul>
      </section>
    </div>
  );
}
