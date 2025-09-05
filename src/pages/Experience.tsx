import { useMemo, useState } from "react";

type Role = {
  company: string;
  title: string;
  start: string; // ISO date
  end?: string; // ISO date or undefined for current
  current?: boolean;
  responsibilities?: string[];
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
  if (end.getDate() < start.getDate()) months -= 1; // rough adjust
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remMonths > 0) parts.push(`${remMonths} mo${remMonths > 1 ? "s" : ""}`);
  return parts.length ? parts.join(" ") : "< 1 mo";
}

// New component to handle individual role logic
function RoleItem({ role }: { role: Role }) {
  const MAX_ITEMS = 5;
  const [isExpanded, setIsExpanded] = useState(false);

  const { responsibilities = [] } = role;
  const hasMore = responsibilities.length > MAX_ITEMS;

  const displayedResponsibilities =
    hasMore && !isExpanded
      ? responsibilities.slice(0, MAX_ITEMS)
      : responsibilities;

  return (
    <li className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="text-lg font-semibold">{role.title}</div>
          <div className="text-neutral-300">{role.company}</div>
        </div>
        <div className="text-sm text-neutral-400 text-left sm:text-right">
          <div>{formatDateRange(role.start, role.end)}</div>
          <div className="mt-0.5">{formatDuration(role.start, role.end)}</div>
        </div>
      </div>
      {role.current && (
        <div className="mt-3 inline-flex items-center rounded-full border border-green-900 bg-green-900/20 px-2 py-0.5 text-xs text-green-300">
          Currently working
        </div>
      )}
      {displayedResponsibilities.length > 0 && (
        <ul className="mt-4 list-disc list-inside space-y-1 text-sm text-neutral-300">
          {displayedResponsibilities.map((item, i) => (
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
  const roles: Role[] = useMemo(
    () => [
      {
        company: "Rakhasa Artha Wisesa Corp",
        title: "Backend Developer",
        start: "2024-10-23",
        current: true,
        responsibilities: [
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
        company: "Rapit Solution",
        title: "Mobile Developer Freelance",
        start: "2023-07-06",
        current: true,
        responsibilities: [
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

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="text-neutral-400 text-sm mt-1">
          A quick look at my ongoing roles and contributions.
        </p>
      </header>

      <ul className="space-y-6">
        {roles.map((role, idx) => (
          <RoleItem key={idx} role={role} />
        ))}
      </ul>
    </div>
  );
}
