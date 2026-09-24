import type { NavItem } from "../App";
import { Link } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children, navItems }: { children: React.ReactNode; navItems: NavItem[] }) => (
  <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="site-container">
      <Header navItems={navItems} />
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div>
          <Link to="/" className="footer-name">Yuben Bauty<span className="accent-period">.</span></Link>
          <p>Full-stack development &amp; AI automation.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:yubenbauty@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/yuben-bauty/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/yubenB/" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Yuben Rizky Putra Bauty</span>
      </footer>
    </div>
  </div>
);

export default Layout;
