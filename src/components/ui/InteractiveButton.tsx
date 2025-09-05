import type { JSX } from "react";
import { motion } from "framer-motion";

export type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  href: string;
  variant?: "primary" | "secondary";
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const InteractiveButton = ({
  children,
  icon,
  href,
  variant = "primary",
  onClick,
}: Props) => {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]";
  const variantClasses = {
    primary:
      "bg-white text-black hover:bg-neutral-200 focus-visible:ring-white",
    secondary:
      "bg-transparent border border-neutral-800 text-neutral-200 hover:bg-neutral-900 hover:border-neutral-700 focus-visible:ring-neutral-700",
  };

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      {children}
    </motion.a>
  );
};

export default InteractiveButton;
