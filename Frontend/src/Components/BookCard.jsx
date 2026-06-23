import React from "react";
import { Star } from "lucide-react";

function BookCard({ image, title, author, rating }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border border-[#F0E5FF]
        overflow-hidden
        shadow-[0_10px_30px_rgba(176,141,255,0.08)]
        hover:-translate-y-2
        hover:shadow-[0_20px_40px_rgba(176,141,255,0.15)]
        transition-all
        duration-300
        cursor-pointer
        w-64
      "
    >
      {/* Book Cover */}
      <div className="h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full
            h-full
            object-cover
            hover:scale-105
            transition-transform
            duration-500
          "
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="
            text-lg
            font-semibold
            text-[#4C3D63]
            line-clamp-2
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-[#6B5A7A]
          "
        >
          {author}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Star
            size={16}
            fill="#E7C66D"
            color="#E7C66D"
          />

          <span
            className="
              text-sm
              font-medium
              text-[#4C3D63]
            "
          >
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookCard;