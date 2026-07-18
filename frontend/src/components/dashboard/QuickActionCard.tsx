import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

export default function QuickActionCard({
  title,
  description,
  icon,
  to,
}: QuickActionCardProps) {
  return (
    <Link to={to}>
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 22,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-800
          bg-slate-900/80
          p-6
          backdrop-blur-xl
        "
      >
        {/* Background Glow */}

        <div
          className="
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
            bg-gradient-to-br
            from-blue-500/[0.05]
            via-transparent
            to-indigo-500/[0.08]
          "
        />

        {/* Icon */}

        <div
          className="
            relative
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600/20
            to-indigo-600/20
            text-blue-400
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:rotate-6
            group-hover:shadow-lg
            group-hover:shadow-blue-500/20
          "
        >
          {icon}
        </div>

        {/* Content */}

        <h3 className="relative text-xl font-semibold text-white">
          {title}
        </h3>

        <p className="relative mt-2 text-sm leading-6 text-slate-400">
          {description}
        </p>

        {/* Footer */}

        <div className="relative mt-6 flex items-center justify-between">

          <span className="text-sm font-medium text-blue-400">
            Open
          </span>

          <ArrowRight
            className="
              text-blue-400
              transition-transform
              duration-300
              group-hover:translate-x-2
            "
            size={20}
          />

        </div>

      </motion.div>
    </Link>
  );
}