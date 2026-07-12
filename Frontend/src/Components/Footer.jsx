import React from "react";

function Footer() {
  return (
    <footer
      className="
        bg-[#FDF2F8]
        border-t border-[#F0E5FF]
        ml-0 md:ml-72
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6
          py-8 sm:py-10
          text-center
        "
      >
        {/* Logo */}

        <div className="flex justify-center items-center gap-2">
          <span className="text-xl sm:text-2xl">🌙</span>

          <h2
            className="
              text-2xl sm:text-3xl
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

        {/* Quote */}

        <p
          className="
            mt-4
            text-sm sm:text-base
            text-[#6B5A7A]
            italic
          "
        >
          Every book holds a prophecy.
        </p>

        {/* Links */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            justify-center
            gap-x-4 gap-y-2 sm:gap-8
            text-[#6B5A7A]
            text-sm
          "
        >
          <a href="#">About</a>
          <a href="#">Clubs</a>
          <a href="#">Discover</a>
          <a href="#">Privacy</a>
        </div>

        {/* Divider */}

        <div
          className="
            my-6
            h-px
            bg-[#F0E5FF]
          "
        />

        {/* Copyright */}

        <p
          className="
            text-xs sm:text-sm
            text-[#9A8CA6]
          "
        >
          ✦ Crafted for readers, dreamers, and storytellers.
        </p>

        <p
          className="
            mt-2
            text-xs
            text-[#9A8CA6]
          "
        >
          © {new Date().getFullYear()} Prophecy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;