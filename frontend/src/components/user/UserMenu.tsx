import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  LogOut,
  Moon,
  Settings,
  User,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function UserMenu() {
  const { user, logoutUser } =
    useAuth();

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function clickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    function esc(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      clickOutside
    );

    document.addEventListener(
      "keydown",
      esc
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        clickOutside
      );

      document.removeEventListener(
        "keydown",
        esc
      );
    };
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  function logout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg transition hover:scale-105"
      >
        {initials}
      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.97,
            }}
            transition={{
              duration: 0.18,
            }}
            className="absolute right-0 mt-4 w-72 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
          >

            <div className="border-b border-slate-800 p-6">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
                {initials}
              </div>

              <h3 className="text-lg font-semibold text-white">
                {user?.name}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {user?.email}
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="flex w-full items-center gap-3 px-6 py-4 text-left text-slate-300 transition hover:bg-slate-800"
            >
              <User size={18} />
              My Profile
            </button>

            <button
              disabled
              className="flex w-full items-center gap-3 px-6 py-4 text-left text-slate-500"
            >
              <Settings size={18} />
              Settings
            </button>

            <button
              disabled
              className="flex w-full items-center gap-3 px-6 py-4 text-left text-slate-500"
            >
              <Moon size={18} />
              Theme
            </button>

            <div className="border-t border-slate-800">

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-6 py-4 text-left text-red-400 transition hover:bg-slate-800"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}