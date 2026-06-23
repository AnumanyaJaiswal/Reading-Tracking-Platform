import { NavLink } from "react-router-dom";

function ProfileTab({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        px-6 py-3
        rounded-2xl
        font-medium
        transition-all duration-300
        ${
          isActive
            ? `
              bg-[#FFFFFF]
              text-[#4C3D63]
              shadow-[0_4px_20px_rgba(176,141,255,0.12)]
            `
            : `
              text-[#6B5A7A]
              hover:bg-[#FDF2F8]
              hover:text-[#4C3D63]
            `
        }
      `
      }
    >
      {label}
    </NavLink>
  );
}

export default ProfileTab;