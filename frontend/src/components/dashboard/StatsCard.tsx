import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
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
      className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-7 backdrop-blur-xl"
    >
      {/* Accent Line */}

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-80" />

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium tracking-wide text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
            {value}
          </h2>

        </div>

        <div
          className="
            flex h-16 w-16 items-center justify-center
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

      </div>

      <div
        className="
          absolute
          inset-0
          rounded-3xl
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          bg-gradient-to-br
          from-blue-500/[0.03]
          via-transparent
          to-indigo-500/[0.04]
          pointer-events-none
        "
      />
    </motion.div>
  );
}