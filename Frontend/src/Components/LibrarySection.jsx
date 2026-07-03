import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";

function LibrarySection({ title, books = [], type, onReview }) {

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [books]);

  const scrollBy = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-serif font-bold text-[#4C3D63]">
          {title}
          {books.length > 0 && (
            <span className="text-[#B08DFF] ml-2 text-2xl font-sans font-medium">
              ({books.length})
            </span>
          )}
        </h2>

        {books.length > 0 && (
          <div className="h-px flex-1 ml-6 bg-linear-to-r from-[#E9D8FF] to-transparent" />
        )}
      </div>

      {books.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            flex flex-col items-center justify-center
            text-center
            py-16 px-6
            rounded-3xl
            bg-white/50
            backdrop-blur-xl
            border border-dashed border-[#E9D8FF]
          "
        >
          <div
            className="
              w-16 h-16
              rounded-2xl
              flex items-center justify-center
              mb-4
              bg-[#F4EDFF]
              shadow-inner
            "
          >
            <BookOpen size={28} className="text-[#B08DFF]" strokeWidth={1.8} />
          </div>

          <p className="text-[#4C3D63] font-serif text-lg">
            No books here yet
          </p>
          <p className="text-[#8C7AA8] text-sm mt-1">
            Books you add to this shelf will appear here
          </p>
        </motion.div>
      ) : (
        <div className="relative group/section">

          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scrollBy("left")}
              className="
                absolute left-0 top-[38%] -translate-y-1/2 z-10
                w-10 h-10 rounded-full
                flex items-center justify-center
                text-[#7A688C] bg-white/90 shadow-lg
                border border-[#EFE5FF]
                opacity-0 group-hover/section:opacity-100
                hover:scale-110 hover:text-[#B08DFF]
                transition-all duration-200
                -translate-x-3
              "
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scrollBy("right")}
              className="
                absolute right-0 top-[38%] -translate-y-1/2 z-10
                w-10 h-10 rounded-full
                flex items-center justify-center
                text-[#7A688C] bg-white/90 shadow-lg
                border border-[#EFE5FF]
                opacity-0 group-hover/section:opacity-100
                hover:scale-110 hover:text-[#B08DFF]
                transition-all duration-200
                translate-x-3
              "
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Edge fades */}
          {canScrollLeft && (
            <div
              className="absolute left-0 top-0 h-full w-12 z-5 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #FDFBFF, transparent)" }}
            />
          )}
          {canScrollRight && (
            <div
              className="absolute right-0 top-0 h-full w-12 z-5 pointer-events-none"
              style={{ background: "linear-gradient(270deg, #FDFBFF, transparent)" }}
            />
          )}

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="
              flex gap-6 md:gap-8
              overflow-x-auto scroll-smooth
              pb-3 px-1
              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              scrollbar
            "
          >
            {books.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="shrink-0 w-44 sm:w-48 lg:w-52"
              >
                <BookCard book={book} />

                {type === "FINISHED" && (
                  <button
                    onClick={() => onReview(book)}
                    className="
                      mt-3 w-full rounded-xl py-2
                      bg-[#F6F1FF] hover:bg-[#EAD9FF]
                      text-[#4C3D63] font-medium
                      transition
                    "
                  >
                    {book.rating ? "✏ Edit Review" : "✨ Write Review"}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      )}
    </section>
  );
}

export default LibrarySection;