---
slug: hhh-company-profile
title: Hamparan Harapan Hayati | Company Profile
category: Next.js
liveUrl: https://hamparanharapanhayati.com/
excerpt: A sleek and modern company profile website designed to showcase brand identity and services.
stack:
  - Next.js
  - Tailwind CSS
  - Vercel
images:
  - /images/projects/hhh/home.png
  - /images/projects/hhh/home-1.png
  - /images/projects/hhh/home-2.png
  - /images/projects/hhh/about.png
  - /images/projects/hhh/products.png
  - /images/projects/hhh/product-detail.png
  - /images/projects/hhh/infrastructure.png
  - /images/projects/hhh/infrastructure-2.png
  - /images/projects/hhh/contact.png
---

**Hamparan Harapan Hayati (HHH)** is a clean, modern company profile website showcasing brand identity and pine-resin derivative products (e.g., _Gum Rosin WW/WG/X_). The focus is clarity, quick product understanding, and frictionless navigation for potential clients.

Built with **Next.js** and **Tailwind CSS**, deployed on **Vercel**. The client manages DNS via **cPanel**, pointed to the Vercel project.

## Goals

- Present a credible, professional corporate presence
- Introduce product lines and industrial applications
- Streamline conversion with fast contact paths (WhatsApp / email)
- Establish solid SEO foundations

## Key Features

- **Hero/PageHeader** with industrial imagery for strong first impression
- **Products & Details** (e.g., Gum Rosin WW/WG) with concise specs
- **Industrial Applications** outlining real-world use cases
- **About Page** with **dual carousels** (story + visuals)
- **Contact Page** with **copy-to-clipboard email** and **wa.me** link (new tab)
- **Responsive & Accessible** layout with readable typography
- **SEO basics**: clean headings, meta tags, optimized assets

## Stack & Architecture

- **Framework**: Next.js (App Router)
- **Styling/UI**: Tailwind CSS, utility-first components
- **Images**: Next/Image for optimization
- **State**: Lightweight React hooks; no heavy state library
- **Code style**: Modular components and shared utilities (e.g., `PageHeader`, cards, badges)

## Deployment

- **Hosting/CI**: Vercel (builds, previews, production)
- **DNS**: Managed via client’s cPanel → A/CNAME records pointing to Vercel
- **Previews**: Automatic preview deployments per branch for rapid QA

## My Role

- **End-to-end development**: page structure, layout, component implementation
- **UX & performance**: image optimization, smooth navigation, sensible loading states
- **Infra support**: Vercel setup and DNS pointing guidance

## Challenges & Solutions

- **DNS controlled in cPanel** (not registrar/Vercel) → mapped A/CNAME correctly, verified propagation
- **Content density vs. clarity** → sectioned layouts, decisive typography, relevant imagery
- **Frictionless contact** → one-click WhatsApp and instant email copy

## Results

- Professional, brand-aligned presentation
- Lightweight frontend architecture that’s easy to maintain and extend
- Clear, mobile-friendly conversion paths

## What I Learned

- Translating business needs (branding, conversion) into practical UI/UX and technical choices
- Hands-on DNS pointing to Vercel within a client-managed cPanel environment

**Live**: [https://hamparanharapanhayati.com/](https://hamparanharapanhayati.com/)
