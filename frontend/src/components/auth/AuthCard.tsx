import type { ReactNode } from "react";
import { motion } from "framer-motion";

import Card from "../ui/Card";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.35,
        }}
        className="relative w-full max-w-md"
      >
        <Card
          hover={false}
          className="p-8"
        >
          {children}
        </Card>
      </motion.div>

    </div>
  );
}