import type { NavItem } from "../App";
import Header from "./Header";

const Layout = ({
  children,
  navItems,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
}) => {
  return (
    <div className="bg-[#0a0a0a] text-neutral-200 min-h-screen font-sans antialiased relative">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <Header navItems={navItems} />
        <main className="mt-16 sm:mt-24">{children}</main>
      </div>
      {/* --- Background Gradient --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full filter blur-[150px] animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-[150px] animate-pulse-delayed"></div>
      </div>
    </div>
  );
};

export default Layout;
