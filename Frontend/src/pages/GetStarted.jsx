import React from 'react'
import { useNavigate } from 'react-router-dom';

function GetStarted() {
  const navigate = useNavigate();
  return (
    <main
      className="
      min-h-screen
      bg-linear-to-r
      from-[#FFF9F6]
      via-[#FDF2F8]
      to-[#F4EDFF]
      overflow-hidden
      relative
    "
    >
      {/* Floating Stars */}

      <span className="absolute top-20 left-20 text-[#E7C66D] animate-sparkle">
        ✦
      </span>

      <span className="absolute top-40 right-40 text-[#E7C66D] animate-sparkle">
        ✦
      </span>

      <span className="absolute bottom-32 left-32 text-[#E7C66D] animate-sparkle">
        ✦
      </span>

      <span className="absolute top-1/4 right-1/4 text-[10px] text-[#E7C66D] animate-sparkle">
        ✦
      </span>

      <span className="absolute bottom-1/4 left-1/3 text-xs text-[#D56A9B] animate-sparkle">
        ✦
      </span>

      <span className="absolute top-16 right-1/3 text-xs text-[#D56A9B] animate-sparkle">
        ✦
      </span>

      {/* Corner rose sprigs */}
      <svg
        viewBox="0 0 160 200"
        className="absolute bottom-0 left-0 w-40 md:w-56 opacity-90 pointer-events-none"
        fill="none"
      >
        <path d="M10 200 C 30 150, 25 110, 55 70 C 70 50, 75 35, 70 15"
          stroke="#C98FA6" strokeWidth="1.5" />
        <path d="M55 70 C 45 60, 30 58, 20 65" stroke="#B98B6B" strokeWidth="1.2" />
        <path d="M62 50 C 75 45, 85 48, 92 58" stroke="#B98B6B" strokeWidth="1.2" />
        <ellipse cx="20" cy="65" rx="9" ry="5" fill="#F3C9D8" opacity="0.8" transform="rotate(-30 20 65)" />
        <ellipse cx="92" cy="58" rx="9" ry="5" fill="#F3C9D8" opacity="0.8" transform="rotate(20 92 58)" />
        <circle cx="55" cy="70" r="13" fill="#E9A6BE" />
        <circle cx="55" cy="70" r="7" fill="#D87FA0" />
        <circle cx="70" cy="15" r="8" fill="#EFB9CD" opacity="0.9" />
        <circle cx="70" cy="15" r="4" fill="#D56A9B" />
      </svg>

      <svg
        viewBox="0 0 160 200"
        className="absolute bottom-0 right-0 w-40 md:w-56 opacity-90 pointer-events-none scale-x-[-1]"
        fill="none"
      >
        <path d="M10 200 C 30 150, 25 110, 55 70 C 70 50, 75 35, 70 15"
          stroke="#C98FA6" strokeWidth="1.5" />
        <path d="M55 70 C 45 60, 30 58, 20 65" stroke="#B98B6B" strokeWidth="1.2" />
        <path d="M62 50 C 75 45, 85 48, 92 58" stroke="#B98B6B" strokeWidth="1.2" />
        <ellipse cx="20" cy="65" rx="9" ry="5" fill="#F3C9D8" opacity="0.8" transform="rotate(-30 20 65)" />
        <ellipse cx="92" cy="58" rx="9" ry="5" fill="#F3C9D8" opacity="0.8" transform="rotate(20 92 58)" />
        <circle cx="55" cy="70" r="13" fill="#E9A6BE" />
        <circle cx="55" cy="70" r="7" fill="#D87FA0" />
        <circle cx="70" cy="15" r="8" fill="#EFB9CD" opacity="0.9" />
        <circle cx="70" cy="15" r="4" fill="#D56A9B" />
      </svg>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24 relative">

        {/* Emblem: crescent moon + open book + rose sprigs */}
        <div className="relative flex items-end justify-center mb-2 animate-float">
          <svg viewBox="0 0 220 130" className="w-40 md:w-48" fill="none">
            {/* crescent moon */}
            <path d="M104 14 a10 10 0 1 0 9 16 a8 8 0 1 1 -9 -16 Z" fill="#E7C66D" />
            {/* sparkle above book */}
            <path d="M110 32 l2 8 l8 2 l-8 2 l-2 8 l-2 -8 l-8 -2 l8 -2 Z" fill="#E7C66D" />
            {/* book */}
            <path d="M110 55 L110 105" stroke="#C8567E" strokeWidth="1.4" />
            <path
              d="M110 58 C 95 50, 75 50, 62 56 C 60 78, 60 92, 62 100 C 75 94, 95 96, 110 105"
              fill="#FFFDFB" stroke="#C8567E" strokeWidth="1.6"
            />
            <path
              d="M110 58 C 125 50, 145 50, 158 56 C 160 78, 160 92, 158 100 C 145 94, 125 96, 110 105"
              fill="#FFFDFB" stroke="#C8567E" strokeWidth="1.6"
            />
            <path d="M68 60 C 80 56, 92 57, 103 62" stroke="#E3B6C4" strokeWidth="1" />
            <path d="M68 68 C 80 64, 92 65, 103 70" stroke="#E3B6C4" strokeWidth="1" />
            <path d="M68 76 C 80 72, 92 73, 103 78" stroke="#E3B6C4" strokeWidth="1" />
            <path d="M117 62 C 128 57, 140 56, 152 60" stroke="#E3B6C4" strokeWidth="1" />
            <path d="M117 70 C 128 65, 140 64, 152 68" stroke="#E3B6C4" strokeWidth="1" />
            <path d="M117 78 C 128 73, 140 72, 152 76" stroke="#E3B6C4" strokeWidth="1" />
            {/* left rose sprig */}
            <path d="M62 56 C 48 50, 38 52, 28 62" stroke="#B98B6B" strokeWidth="1.2" />
            <circle cx="26" cy="64" r="9" fill="#E9A6BE" />
            <circle cx="26" cy="64" r="4.5" fill="#D56A9B" />
            <ellipse cx="40" cy="58" rx="7" ry="4" fill="#F3C9D8" transform="rotate(-20 40 58)" />
            {/* right rose sprig */}
            <path d="M158 56 C 172 50, 182 52, 192 62" stroke="#B98B6B" strokeWidth="1.2" />
            <circle cx="194" cy="64" r="9" fill="#E9A6BE" />
            <circle cx="194" cy="64" r="4.5" fill="#D56A9B" />
            <ellipse cx="180" cy="58" rx="7" ry="4" fill="#F3C9D8" transform="rotate(20 180 58)" />
          </svg>
        </div>

        <h1
          className="
          text-7xl md:text-8xl
          font-serif
          font-bold
          italic
          animate-fade-up
          bg-linear-to-r
          from-[#D56A9B]
          via-[#F6B6D1]
          to-[#E7C66D]
          bg-clip-text
          text-transparent
        "
        >
          Prophecy
        </h1>

        <p
          className="
          mt-5
          text-xs
          md:text-sm
          tracking-[0.45em]
          text-[#A1527A]
          animate-fade-up
        "
        >
          EVERY BOOK HOLDS A PROPHECY
        </p>

        <div className="mt-12 flex items-start gap-3 max-w-3xl animate-fade-up">
          <span className="text-5xl md:text-6xl font-serif text-[#D56A9B] leading-none -mt-2 select-none">
            “
          </span>
          <blockquote
            className="
            text-2xl
            md:text-3xl
            text-[#4C3D63]
            leading-relaxed
            font-serif
          "
          >
            Books are the whispers of yesterday
            and the prophecies of tomorrow.
          </blockquote>
          <span className="text-5xl md:text-6xl font-serif text-[#E7C66D] leading-none self-end select-none">
            ”
          </span>
        </div>

        <div className="mt-6 flex items-center gap-3 animate-fade-up" aria-hidden="true">
          <span className="h-px w-10 bg-[#D9B98C]" />
          <span className="text-[#D9B98C] text-sm">✦</span>
          <span className="h-px w-10 bg-[#D9B98C]" />
        </div>

        <p
          className="
          mt-6
          text-lg
          text-[#6B5A7A]
          leading-8
          animate-fade-up
        "
        >
          Track your stories.
          <br />
          Cherish your journey.
          <br />
          Fulfill your prophecy.
        </p>

        <button
          className="
          mt-10
          relative
          px-10
          py-4
          rounded-full
          text-white
          font-semibold
          tracking-[0.2em]
          text-sm
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-[0_0_30px_rgba(246,182,209,0.6)]
          bg-linear-to-r
          from-[#D56A9B]
          to-[#C8567E]
          ring-1
          ring-inset
          ring-[#E7C66D]/70
          shadow-md
          cursor-pointer
        "
        onClick={() => navigate('/login')}
        >
          <span className="mr-2 text-[#F6DDA1]">✦</span>
          GET STARTED
          <span className="ml-2 text-[#F6DDA1]">✦</span>
        </button>

        {/* Hanging key divider */}
        <div className="mt-10 flex flex-col items-center animate-fade-up" aria-hidden="true">
          <div className="flex items-center gap-2">
            <span className="h-px w-16 bg-[#D9B98C]" />
            <svg viewBox="0 0 20 16" className="w-4 text-[#C98FA6]" fill="currentColor">
              <circle cx="10" cy="8" r="6" fill="#E9A6BE" />
              <circle cx="10" cy="8" r="3" fill="#D56A9B" />
            </svg>
            <span className="h-px w-16 bg-[#D9B98C]" />
          </div>
          <svg viewBox="0 0 24 50" className="w-5 mt-1 text-[#C9A063]" fill="none">
            <path d="M8 2 L16 2 L16 8 L8 8 Z" fill="#F0C8D8" stroke="#C98FA6" strokeWidth="0.8" />
            <path d="M12 8 L12 30" stroke="#C9A063" strokeWidth="2" />
            <circle cx="12" cy="40" r="7" fill="none" stroke="#C9A063" strokeWidth="2" />
            <path d="M12 47 L12 50 M17 36 L20 36 M17 41 L21 41" stroke="#C9A063" strokeWidth="2" />
          </svg>
        </div>

        {/* Feature row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8 animate-fade-up">
          {[
            {
              label: 'TRACK BOOKS',
              icon: (
                <path d="M6 4h4v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm6 0h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4V4Z" />
              ),
            },
            {
              label: 'READING GOALS',
              icon: (
                <>
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="12" cy="12" r="0.6" fill="currentColor" />
                </>
              ),
            },
            {
              label: 'DISCOVER STORIES',
              icon: (
                <>
                  <circle cx="12" cy="11" r="7" />
                  <path d="M7 19h10M9 21h6" />
                </>
              ),
            },
            {
              label: 'YOUR JOURNEY',
              icon: (
                <path d="M4 18 L8 8 L12 14 L16 6 L20 18 Z" />
              ),
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F6E3D8]/60">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#C8567E]" fill="none" stroke="currentColor" strokeWidth="1.4">
                  {item.icon}
                </svg>
              </span>
              <span className="text-xs tracking-[0.2em] text-[#A1527A]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default GetStarted