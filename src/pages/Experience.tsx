import { useMemo } from "react";

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
          <li
            key={idx}
            className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 sm:p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-lg font-semibold">{role.title}</div>
                <div className="text-neutral-300">{role.company}</div>
              </div>
              <div className="text-sm text-neutral-400">
                <div>{formatDateRange(role.start, role.end)}</div>
                <div className="mt-0.5">
                  {formatDuration(role.start, role.end)}
                </div>
              </div>
            </div>
            {role.current && (
              <div className="mt-3 inline-flex items-center rounded-full border border-green-900 bg-green-900/20 px-2 py-0.5 text-xs text-green-300">
                Currently working
              </div>
            )}
            {role.responsibilities?.length ? (
              <ul className="mt-4 list-disc list-inside space-y-1 text-sm text-neutral-300">
                {role.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
