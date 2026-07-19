import { Bell, Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

import UserMenu from "../user/UserMenu";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();

  const location = useLocation();

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/resume": "Resume",
    "/ats-analyzer": "ATS Analyzer",
    "/jobs": "Jobs",
    "/interview": "AI Interview",
    "/profile": "My Profile",
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-8">

        {/* Left */}

        <div className="flex items-center gap-5">

          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 transition hover:bg-slate-800"
          >
            <Menu
              size={26}
              className="text-white"
            />
          </button>

          <h1 className="text-3xl font-bold text-white">
            {titles[location.pathname] ??
              "CareerForge AI"}
          </h1>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="hidden lg:flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              placeholder="Search..."
              className="w-52 bg-transparent text-white outline-none placeholder:text-slate-500"
            />

          </div>

          {/* Notification */}

          <div className="relative">

            <button className="rounded-lg p-2 transition hover:bg-slate-800">

              <Bell
                size={22}
                className="text-slate-300"
              />

            </button>

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </div>

          {/* Username */}

          <div className="hidden text-right md:block">

            <p className="font-semibold text-white">
              {user?.name}
            </p>

          </div>

          {/* Avatar */}

          <UserMenu />

        </div>

      </div>

    </header>
  );
}