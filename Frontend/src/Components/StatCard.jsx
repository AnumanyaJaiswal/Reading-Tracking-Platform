import React from "react";

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div
      className="
        group
        relative
        bg-white/70
        backdrop-blur-xl
        rounded-2xl sm:rounded-3xl
        p-4 sm:p-6
        border border-[#F3E8FF]
        shadow-[0_4px_24px_rgba(176,141,255,0.12)]
        hover:-translate-y-1.5
        hover:shadow-[0_12px_36px_rgba(176,141,255,0.22)]
        hover:border-[#E9D8FF]
        transition-all
        duration-300
        ease-out
        overflow-hidden
      "
    >
      {/* subtle glow accent in corner */}
      <div
        className="
          absolute
          -top-8
          -right-8
          w-24
          h-24
          rounded-full
          opacity-[0.15]
          blur-2xl
          group-hover:opacity-25
          transition-opacity
          duration-300
        "
        style={{ backgroundColor: color }}
      />

      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-[#6B5A7A] text-xs sm:text-sm font-medium tracking-wide">
            {title}
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#4C3D63] mt-2">
            {value}
          </h2>
        </div>

        <div
          className="
            w-11 h-11
            sm:w-14 sm:h-14
            rounded-xl sm:rounded-2xl
            flex items-center justify-center
            shadow-md
            group-hover:scale-110
            group-hover:rotate-3
            transition-transform
            duration-300
          "
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
          }}
        >
          <Icon size={22} className="text-white sm:hidden" strokeWidth={2.2} />
          <Icon size={26} className="text-white hidden sm:block" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;