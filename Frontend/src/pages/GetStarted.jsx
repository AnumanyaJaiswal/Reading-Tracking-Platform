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

      <section className="flex flex-col items-center justify-center text-center px-6 py-28">

        <span className="text-5xl mb-4 animate-float">
          📖
        </span>

        <h1
          className="
          text-7xl md:text-8xl
          font-serif
          font-bold
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
          tracking-[0.35em]
          text-[#6B5A7A]
          animate-fade-up
        "
        >
          EVERY BOOK HOLDS A PROPHECY
        </p>

        <blockquote
          className="
          mt-12
          text-2xl
          md:text-3xl
          text-[#4C3D63]
          max-w-3xl
          leading-relaxed
          animate-fade-up
          font-serif
        "
        >
          “Books are the whispers of yesterday
          and the prophecies of tomorrow.”
        </blockquote>

        <p
          className="
          mt-8
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
          px-10
          py-4
          rounded-full
          text-white
          font-semibold
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-[0_0_30px_rgba(246,182,209,0.6)]
          bg-linear-to-r
          from-[#F6B6D1]
          to-[#E7C66D]
        "
        onClick={() => navigate('/login')}
        >
          ✦ Begin Your Journey
        </button>
      </section>
    </main>
  );
}

export default GetStarted
