import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Bot,
  User,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { NavLink } from "react-router-dom";

import { useSidebar } from "../../context/SidebarContext";

import Logo from "../ui/Logo";

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Resume",
    icon: FileText,
    path: "/resume",
  },
  {
    name: "Jobs",
    icon: Briefcase,
    path: "/jobs",
  },
  {
    name: "AI Interview",
    icon: Bot,
    path: "/interview",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  const {
    isOpen,
    closeSidebar,
  } = useSidebar();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />

          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
            }}
            className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 shadow-2xl"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 p-6">

              <div className="flex items-center gap-3">

                <Logo variant="icon" />

                <div>
                  <h1 className="text-xl font-bold text-white">
                    CareerForge
                  </h1>

                  <p className="text-xs text-slate-400">
                    AI Career Assistant
                  </p>
                </div>

              </div>

              <button
                onClick={closeSidebar}
                className="rounded-lg p-2 transition hover:bg-slate-800"
              >
                <X
                  size={22}
                  className="text-white"
                />
              </button>

            </div>

            {/* Navigation */}

            <nav className="flex-1 space-y-2 p-4">

              {navItems.map((item) => {

                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-300 hover:bg-slate-800"
                      }`
                    }
                  >
                    <Icon size={22} />

                    <span className="font-medium">
                      {item.name}
                    </span>

                  </NavLink>
                );

              })}

            </nav>

            {/* Footer */}

            <div className="border-t border-slate-800 p-6">

              <p className="text-center text-xs text-slate-500">
                CareerForge AI v1.0
              </p>

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}