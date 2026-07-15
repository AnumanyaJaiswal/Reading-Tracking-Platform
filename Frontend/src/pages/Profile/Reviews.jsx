import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import ReviewCard from "../../Components/Reviews/ReviewCard";
import EditReviewModal from "../../Components/Reviews/EditReviewModel";
import { getMyReview, updateReview } from "../../services/review";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const books = await getMyReview();
      setReviews(books);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 overflow-hidden">
      {/* Ambient orb — subtle, scoped to this page */}
      <div
        className="hidden sm:block absolute -top-10 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #B08DFF 0%, transparent 70%)" }}
      />

      <div className="mb-8 sm:mb-12 relative z-10">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C9A36B] font-medium mb-1.5 sm:mb-2">
          Your Shelf
        </p>

        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#4C3D63]">
            ✨Reviews
          </h1>
          <span className="w-1.5 h-1.5 rotate-45 shrink-0 mt-2" style={{ background: "#C9A36B" }} />
        </div>

        <p className="text-[#7B6B8F] mt-2 sm:mt-3 text-sm sm:text-lg">
          Every finished journey leaves behind a memory.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 relative z-10">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
              className="rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-xl border border-white/60 p-5 sm:p-6 h-56 sm:h-64"
            >
              <div className="w-full h-28 sm:h-32 rounded-xl mb-4" style={{ background: "#F4EDFF" }} />
              <div className="h-3 w-3/4 rounded-full mb-2" style={{ background: "#F4EDFF" }} />
              <div className="h-3 w-1/2 rounded-full" style={{ background: "#F4EDFF" }} />
            </motion.div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
            relative z-10
            rounded-2xl sm:rounded-3xl
            bg-white/60 backdrop-blur-xl
            border border-white/60
            shadow-[0_8px_40px_rgba(176,141,255,0.15)]
            p-10 sm:p-14
            text-center
          "
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #B08DFF 0%, #E9C7FF 50%, #FFD9C7 100%)" }}
          >
            <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full bg-white/90 flex items-center justify-center">
              <BookOpen size={26} strokeWidth={1.75} color="#4C3D63" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4C3D63]">
            No Reviews Yet
          </h2>

          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#6B5A7A] max-w-sm mx-auto">
            Finish a book to write your first magical review.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 relative z-10">
          {reviews.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05, ease: "easeOut" }}
            >
              <ReviewCard
                book={book}
                onEdit={(book) => {
                  setSelectedBook(book);
                  setModalOpen(true);
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      <EditReviewModal
        open={modalOpen}
        book={selectedBook}
        onClose={() => {
          setModalOpen(false);
          setSelectedBook(null);
        }}
        onSave={async (updatedBook) => {
          try {
            await updateReview(updatedBook.id, {
              rating: updatedBook.rating,
              review: updatedBook.review,
            });

            await fetchReviews();

            setModalOpen(false);
            setSelectedBook(null);
          } catch (error) {
            console.log(error.message);
          }
        }}
      />
    </div>
  );
}

export default Reviews;