import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "../ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const links = [
    "Features",
    "Resume AI",
    "Jobs",
    "Interview",
    "About",
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[var(--primary-dark)]/80 border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

          <Logo />

          {/* Desktop */}

          <nav className="hidden items-center gap-8 lg:flex">

            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="relative text-[15px] text-[var(--text-secondary)] transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                {link}
              </a>
            ))}

          </nav>

          {/* Right */}

          <div className="hidden items-center gap-4 lg:flex">

            <Link
              to="/login"
              className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-[var(--text-secondary)] transition hover:bg-white/5 hover:text-white"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/30"
            >
              Get Started
            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="rounded-lg p-2 lg:hidden"
          >
            {mobileMenu ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>
      </header>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileMenu && (

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="fixed left-0 top-20 z-40 w-full border-b border-[var(--border)] bg-[var(--primary-dark)] px-8 py-6 lg:hidden"
          >

            <div className="space-y-5">

              {links.map((item) => (

                <a
                  key={item}
                  href="#"
                  className="block text-lg text-[var(--text-secondary)] transition hover:text-white"
                >
                  {item}
                </a>

              ))}

              <div className="pt-5 space-y-3">

                <Link
                  to="/login"
                  className="block rounded-xl border border-[var(--border)] py-3 text-center text-white"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="block rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] py-3 text-center font-semibold text-white"
                >
                  Get Started
                </Link>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}