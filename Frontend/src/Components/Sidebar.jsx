import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Users,
  Search,
  UserRound,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";



function Sidebar() {
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
    <aside
      className="
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
      "
    >
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
  );
}

export default Sidebar;