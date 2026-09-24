import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";

const featuredWork = [
  {
    slug: "hexa-ai",
    name: "Hexa.AI",
    category: "Enterprise AI · Platform Engineering",
    description: "A sovereign control plane for composing, governing, deploying, and operating reusable AI capabilities across customer-controlled infrastructure.",
    image: "/images/projects/hexa-ai/control-plane-hero.webp",
    className: "work-featured",
  },
  {
    slug: "hexa-dashboard",
    name: "Hexa.Dashboard",
    category: "Full-stack · Analytics",
    description: "A self-hosted workspace that turns operational data into dashboards, spatial analysis, and evidence-backed AI insights.",
    image: "/images/projects/hexa-dashboard/overview.png",
    className: "",
  },
  {
    slug: "hexa-sensor",
    name: "Hexa.Sensor",
    category: "Backend · Industrial IoT",
    description: "Field telemetry, fleet monitoring, event detection, and alarms in one on-premise platform.",
    image: "/images/projects/hexa-sensor/live-map.png",
    className: "",
  },
];

const Home = () => (
  <div className="home-page">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-intro">Yuben Bauty <span className="intro-divider" /> Full-stack developer &amp; AI automation</p>
        <h1 id="hero-title">Making complex work <em>run itself.</em></h1>
        <p className="hero-description">I build reliable software and AI workflows for the work that takes too many tabs, too many steps, and too much time.</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/projects">Explore my work <ArrowUpRight size={18} strokeWidth={1.8} /></Link>
          <Link className="text-action" to="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-frame"><img src="/images/profile.jpg" alt="Yuben Bauty seated by a window" fetchPriority="high" /></div>
        <p className="portrait-caption">Based in Indonesia. Building for real-world complexity.</p>
      </div>
    </section>

    <div className="hero-bottom-line"><span>Code that connects systems.</span><span>Automation that earns trust.</span></div>

    <section className="work-section" aria-labelledby="work-title">
      <div className="section-heading">
        <div><p className="section-kicker">Selected work</p><h2 id="work-title">Built for the messy parts.</h2></div>
        <Link to="/projects" className="text-action">All projects <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="work-grid">
        {featuredWork.map((work) => (
          <Link to={`/projects/${work.slug}`} className={`work-card ${work.className}`} key={work.slug}>
            <div className="work-image"><img src={work.image} alt={`${work.name} interface`} loading="lazy" /></div>
            <div className="work-info">
              <p>{work.category}</p>
              <div className="work-title-row"><h3>{work.name}</h3><ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" /></div>
              <span>{work.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="approach-section" aria-labelledby="approach-title">
      <div className="approach-lead">
        <p className="section-kicker">The way I work</p>
        <h2 id="approach-title">A good system does more than look smart.</h2>
        <p>It handles edge cases, fits the people using it, and keeps working after the demo ends.</p>
      </div>
      <div className="approach-list">
        <div><span>01</span><h3>Understand the workflow</h3><p>Map the people, data, approvals, and failure points before writing code.</p></div>
        <div><span>02</span><h3>Build the whole path</h3><p>From interface to API to deployment, make each part work together.</p></div>
        <div><span>03</span><h3>Keep AI accountable</h3><p>Ground outputs in sources, add review steps, and make decisions traceable.</p></div>
      </div>
    </section>

    <section className="about-section" aria-labelledby="about-title">
      <div className="about-heading"><h2 id="about-title">Developer by trade.<br />Systems thinker by habit.</h2></div>
      <div className="about-copy"><p>I'm Yuben Rizky Putra Bauty, a full-stack developer currently working on enterprise AI at Hexacode Teknologi Indonesia. My work spans agentic workflows, on-premise deployments, backend architecture, and the interfaces people use to run them.</p><p>Before that, I built backend services and automation with Node.js, Go, PostgreSQL, and messaging systems. I still enjoy getting close to the infrastructure when the product needs it.</p><Link className="text-action" to="/experience">More about my experience <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="writing-section" aria-labelledby="writing-title">
      <div className="section-heading"><div><h2 id="writing-title">Notes from the build.</h2></div><Link to="/articles" className="text-action">All articles <span aria-hidden="true">↗</span></Link></div>
      <div className="writing-list">{articles.slice(0, 3).map((article) => <Link key={article.slug} to={`/articles/${article.slug}`} className="writing-item"><span>{article.date}</span><h3>{article.title}</h3><ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" /></Link>)}</div>
    </section>

    <section className="home-contact" aria-labelledby="contact-title"><h2 id="contact-title">Let's make the work <em>work better.</em></h2><Link className="button button-light" to="/contact">Start a conversation <ArrowUpRight size={18} strokeWidth={1.8} /></Link></section>
  </div>
);

export default Home;
