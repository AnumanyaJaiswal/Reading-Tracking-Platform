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
    <section className="mb-10 md:mb-14">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#4C3D63]">
          {title}
          {books.length > 0 && (
            <span className="text-[#B08DFF] ml-2 text-base sm:text-xl md:text-2xl font-sans font-medium">
              ({books.length})
            </span>
          )}
        </h2>

        {books.length > 0 && (
          <div className="h-px flex-1 ml-4 md:ml-6 bg-linear-to-r from-[#E9D8FF] to-transparent" />
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
            py-10 px-4
            md:py-16 md:px-6
            rounded-2xl md:rounded-3xl
            bg-white/50
            backdrop-blur-xl
            border border-dashed border-[#E9D8FF]
          "
        >
          <div
            className="
              w-14 h-14 md:w-16 md:h-16
              rounded-2xl
              flex items-center justify-center
              mb-4
              bg-[#F4EDFF]
              shadow-inner
            "
          >
            <BookOpen size={24} className="text-[#B08DFF] md:hidden" strokeWidth={1.8} />
            <BookOpen size={28} className="text-[#B08DFF] hidden md:block" strokeWidth={1.8} />
          </div>

          <p className="text-[#4C3D63] font-serif text-base md:text-lg">
            No books here yet
          </p>
          <p className="text-[#8C7AA8] text-xs md:text-sm mt-1">
            Books you add to this shelf will appear here
          </p>
        </motion.div>
      ) : (
        <div className="relative group/section">

          {/* Left arrow — always visible on touch/mobile, hover-reveal on desktop */}
          {canScrollLeft && (
            <button
              onClick={() => scrollBy("left")}
              className="
                absolute left-0 top-[38%] -translate-y-1/2 z-10
                w-8 h-8 md:w-10 md:h-10 rounded-full
                flex items-center justify-center
                text-[#7A688C] bg-white/90 shadow-lg
                border border-[#EFE5FF]
                opacity-100 md:opacity-0 md:group-hover/section:opacity-100
                hover:scale-110 hover:text-[#B08DFF]
                transition-all duration-200
                -translate-x-2 md:-translate-x-3
              "
            >
              <ChevronLeft size={18} className="md:hidden" />
              <ChevronLeft size={20} className="hidden md:block" />
            </button>
          )}

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scrollBy("right")}
              className="
                absolute right-0 top-[38%] -translate-y-1/2 z-10
                w-8 h-8 md:w-10 md:h-10 rounded-full
                flex items-center justify-center
                text-[#7A688C] bg-white/90 shadow-lg
                border border-[#EFE5FF]
                opacity-100 md:opacity-0 md:group-hover/section:opacity-100
                hover:scale-110 hover:text-[#B08DFF]
                transition-all duration-200
                translate-x-2 md:translate-x-3
              "
            >
              <ChevronRight size={18} className="md:hidden" />
              <ChevronRight size={20} className="hidden md:block" />
            </button>
          )}

          {/* Edge fades */}
          {canScrollLeft && (
            <div
              className="absolute left-0 top-0 h-full w-8 md:w-12 z-5 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #FDFBFF, transparent)" }}
            />
          )}
          {canScrollRight && (
            <div
              className="absolute right-0 top-0 h-full w-8 md:w-12 z-5 pointer-events-none"
              style={{ background: "linear-gradient(270deg, #FDFBFF, transparent)" }}
            />
          )}

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="
              flex gap-4 sm:gap-6 md:gap-8
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
                className="shrink-0 w-32 sm:w-48 lg:w-52"
              >
                <BookCard book={book} />

                {type === "FINISHED" && (
                  <button
                    onClick={() => onReview(book)}
                    className="
                      mt-2 md:mt-3 w-full rounded-xl py-1.5 md:py-2
                      text-xs md:text-base
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