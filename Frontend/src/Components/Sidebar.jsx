import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Users,
  Search,
  UserRound,
  LogOut,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: House, path: "/home" },
    { name: "Clubs", icon: Users, path: "/clubs_public" },
    { name: "Search", icon: Search, path: "/search" },
    { name: "My Profile", icon: UserRound, path: "/profile" },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Mobile top bar with hamburger — hidden on md+ */}
      <div
        className="
          md:hidden
          fixed top-0 left-0 right-0
          h-16
          bg-white
          border-b border-[#F0E5FF]
          flex items-center justify-between
          px-4
          z-40
        "
      >
        <div className="flex items-center gap-2">
          <div className="text-2xl">🌙</div>
          <h2
            className="
              text-xl
              font-serif
              font-bold
              bg-linear-to-r
              from-[#B08DFF]
              via-[#F6B6D1]
              to-[#E7C66D]
              bg-clip-text
              text-transparent
            "
          >
            Prophecy
          </h2>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl text-[#6B5A7A] hover:bg-[#FDF2F8] transition cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop overlay — mobile only, shown when drawer is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={`
          h-screen
          w-72
          bg-white
          border-r border-[#F0E5FF]
          shadow-[0_10px_30px_rgba(176,141,255,0.08)]
          p-6
          flex flex-col
          fixed
          top-0
          left-0
          z-50
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button — mobile only */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden self-end mb-2 p-2 rounded-xl text-[#6B5A7A] hover:bg-[#FDF2F8] transition cursor-pointer"
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        {/* Logo */}

        <div className="mb-12">
          <div className="flex items-center gap-2">
            <div className="text-4xl mb-3">
              🌙
            </div>
            <h2
              className="
                text-4xl
                font-serif
                font-bold
                bg-linear-to-r
                from-[#B08DFF]
                via-[#F6B6D1]
                to-[#E7C66D]
                bg-clip-text
                text-transparent
              "
            >
              Prophecy
            </h2>
          </div>

          <p className="mt-2 text-sm text-[#6B5A7A]">
            Every book holds a prophecy
          </p>
        </div>

        {/* Navigation */}

        <ul className="space-y-3">
          {menuItems.map((item) => (

            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `
              flex items-center gap-3
              px-4 py-3
              rounded-2xl
              transition-all duration-200
              ${isActive
                    ? "bg-[#FDF2F8] text-[#4C3D63] font-medium"
                    : "text-[#6B5A7A] hover:bg-[#FDF2F8]"
                  }
            `
                }
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            </li>
          ))}

        </ul>


        {/* Logout */}

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-2xl
              text-[#B85C7A]
              hover:bg-[#FFF4F7]
              transition
              cursor-pointer
            "
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;