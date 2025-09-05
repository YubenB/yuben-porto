import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem } from "../App";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = ({ navItems }: { navItems: NavItem[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header className="flex justify-between items-center py-4 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold tracking-tighter"
      >
        <NavLink to="/" className="" style={{ textDecoration: "none" }}>
          <span className="text-white">Yuben</span>
          <span className="text-neutral-400">Bauty</span>
        </NavLink>
      </motion.div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-full px-2 py-1">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.id}
            onClick={handleNavClick}
            className={({ isActive }: { isActive: boolean }) =>
              `${
                isActive ? "" : "hover:text-white/60"
              } relative rounded-full px-4 py-2 text-sm font-medium text-white transition focus-visible:outline-2 focus-visible:outline-white`
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-white/10"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        {!isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 z-20 relative"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Mobile Nav Overlay and Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            {/* panel */}
            <motion.nav
              id="mobile-menu"
              className="fixed top-0 right-0 h-full w-64 max-w-[80%] bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <span className="text-sm font-semibold text-white/80">
                  Menu
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <ul className="p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.id}
                      onClick={handleNavClick}
                      className={({ isActive }: { isActive: boolean }) =>
                        `${
                          isActive ? "bg-white/10" : "hover:bg-white/5"
                        } block rounded-lg px-3 py-2 text-sm text-white`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
