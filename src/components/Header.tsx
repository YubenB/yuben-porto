import { useState } from "react";
import type { NavItem } from "../App";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = ({ navItems }: { navItems: NavItem[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <NavLink to="/" className="brand" onClick={() => setIsMenuOpen(false)} aria-label="Yuben Bauty, home">
        <span>Yuben<span className="accent-period">Bauty.</span></span>
        <span className="brand-caption">Full-stack / AI</span>
      </NavLink>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.id} to={item.id} end={item.id === "/"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <a className="header-mail" href="mailto:yubenbauty@gmail.com">Let's talk <span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" type="button" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="mobile-menu" onClick={() => setIsMenuOpen((open) => !open)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isMenuOpen && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink key={item.id} to={item.id} end={item.id === "/"} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
