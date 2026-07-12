import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BookCard({ book }) {
  const navigate = useNavigate();
  const hasCover = Boolean(book.thumbnail);
  const bookId = book.googleBookId || book.id;

  return (
    <div
      onClick={() => navigate(`/books/${bookId}`)}
      className="
        group
        relative
        bg-white
        rounded-xl sm:rounded-2xl
        shadow-md
        hover:shadow-xl
        hover:shadow-[#4C3D63]/15
        hover:-translate-y-1.5
        transition-all
        duration-300
        cursor-pointer
        overflow-hidden
        border border-[#F0E6FA]
        flex flex-col
      "
    >

      {/* Cover */}
      <div className="relative w-full aspect-2/3 overflow-hidden bg-linear-to-br from-[#EDE3F8] to-[#F8EFE0]">
        {hasCover ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            loading="lazy"
            className="
              w-full h-full object-cover
              group-hover:scale-110
              transition-transform duration-500 ease-out
            "
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center px-3 sm:px-4 text-center">
            <span className="text-2xl sm:text-3xl mb-2">📖</span>
            <span className="text-[10px] sm:text-xs font-medium text-[#8A7B9E] line-clamp-3">
              {book.title}
            </span>
          </div>
        )}

        {/* Hover tint */}
        <div
          className="
            absolute inset-0
            bg-linear-to-t from-[#2A1F3D]/50 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        />

        {/* Floating "View details" on hover, over the image */}
        <div
          className="
            absolute bottom-2 left-2 right-2
            sm:bottom-3 sm:left-3 sm:right-3
            hidden sm:flex items-center justify-between
            opacity-0 translate-y-1
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300
          "
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
            View details
          </span>
          <span
            className="
              w-6 h-6 rounded-full
              flex items-center justify-center
              bg-white/90 text-[#4C3D63]
            "
          >
            <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-1">
        <h2 className="font-bold text-[12px] sm:text-[13.5px] text-[#4C3D63] leading-snug line-clamp-2 min-h-8 sm:min-h-10">
          {book.title}
        </h2>

        <p className="text-[10px] sm:text-xs text-[#A597B8] mt-1 line-clamp-1">
          {book.authors?.length ? book.authors.join(", ") : "Unknown author"}
        </p>
      </div>

    </div>
  );
}

export default BookCard;