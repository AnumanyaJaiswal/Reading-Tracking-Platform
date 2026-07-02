import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();
  const hasCover = Boolean(book.thumbnail);
  const bookId = book.googleBookId || book.id;

  return (
    <div
      onClick={() => navigate(`/books/${bookId}`)}
      className="
        group
        bg-white
        rounded-2xl
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
      <div className="relative w-full aspect-2/3 bg-linear-to-br from-[#EDE3F8] to-[#F8EFE0] overflow-hidden">
        {hasCover ? (
          <img
            src={book.thumbnail || "https://via.placeholder.com/200x300?text=No+Cover"} 
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center px-4 text-center">
            <span className="text-3xl mb-2">📖</span>
            <span className="text-xs font-medium text-[#8A7B9E] line-clamp-3">
              {book.title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-bold text-base text-[#4C3D63] leading-snug line-clamp-2 min-h-10">
          {book.title}
        </h2>

        <p className="text-sm text-[#A597B8] mt-1.5 line-clamp-1">
          {book.authors?.length ? book.authors.join(", ") : "Unknown author"}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B89FD6] bg-[#F5EEFC] px-2.5 py-1 rounded-full">
            View details
          </span>
          <span className="text-[#C9B8E0] group-hover:text-[#4C3D63] group-hover:translate-x-0.5 transition-all duration-300">
            →
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookCard;