import type { LucideIcon } from "lucide-react";
import { Code } from "lucide-react";

export type Project = {
  icon: LucideIcon; // icon component, render with <Icon size={24} className={iconColor} />
  iconColor: string; // Tailwind class for the icon color
  title: string;
  category: string;
  liveUrl?: string; // optional live project URL
  logo?: string; // optional logo image URL
  description: string;
  slug?: string;
};

export const projects: Project[] = [
  {
    icon: Code,
    iconColor: "text-cyan-400",
    title: "Simontana | Forest Monitoring App",
    slug: "simontana-forest-monitoring",
    category: "React Native",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_of_the_Ministry_of_Environmental_Affairs_and_Forestry_of_the_Republic_of_Indonesia.svg",
    description:
      "A government mobile application for real-time forest monitoring, built to provide crucial data and alerts.",
  },
  {
    icon: Code,
    iconColor: "text-purple-400",
    title: "Intra Asia | Insurance App",
    slug: "intra-asia-insurance",
    category: "React Native",
    logo: "/images/companies/intra-asia-logo.png",
    description:
      "A comprehensive mobile app for an automobile insurance provider, streamlining claims and policy management.",
  },
  {
    icon: Code,
    iconColor: "text-emerald-400",
    title: "Erzengel | E-commerce Platform",
    slug: "erzengel-ecommerce",
    category: "Next.js & NestJS",
    logo: "https://erzengel.id/erzengel.png",
    description:
      "A full-stack e-commerce solution featuring a Next.js frontend and a powerful NestJS backend for server operations.",
  },
  {
    icon: Code,
    iconColor: "text-rose-400",
    title: "FVI | Corporate Company Profile",
    slug: "fvi-company-profile",
    category: "Next.js",
    logo: "https://www.fvi-group.com/images/logo.png",
    description:
      "A sleek and modern company profile website, designed to showcase brand identity and services effectively.",
  },
  {
    icon: Code,
    iconColor: "text-rose-400",
    title: "HHH | Corporate Company Profile",
    slug: "hhh-company-profile",
    category: "Next.js",
    logo: "/images/companies/hamparan-harapan-hayati-logo.png",
    description:
      "A professional company profile website for an agricultural enterprise, highlighting their mission and projects.",
  },
];
