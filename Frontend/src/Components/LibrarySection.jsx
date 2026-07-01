import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import LibraryBookCard from "./LibraryBookCard";

function LibrarySection({ title, books = [] }) {
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <LibraryBookCard book={book} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LibrarySection;