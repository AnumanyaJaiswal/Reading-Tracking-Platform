import { useEffect, useState } from "react";
import ReviewCard from "../../Components/Reviews/ReviewCard";
import EditReviewModal from "../../Components/Reviews/EditReviewModel";
import { getMyReview, updateReview } from '../../services/review'

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

  if (loading) {
    return (
      <div className="text-center py-20 text-[#6B5A7A]">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">

      <div className="mb-12">

        <h1 className="text-5xl font-serif font-bold text-[#4C3D63]">
          ✨ My Reviews
        </h1>

        <p className="text-[#7B6B8F] mt-3 text-lg">
          Every finished journey leaves behind a memory.
        </p>

      </div>

      {reviews.length === 0 ? (

        <div
          className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        p-14
                        text-center
                    "
        >
          <div className="text-6xl mb-4">
            📖
          </div>

          <h2 className="text-2xl font-bold text-[#4C3D63]">
            No Reviews Yet
          </h2>

          <p className="mt-3 text-[#6B5A7A]">
            Finish a book to write your first magical review.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {reviews.map((book) => (

            <ReviewCard
              key={book.id}
              book={book}
              onEdit={(book) => {
                setSelectedBook(book);
                setModalOpen(true);
              }}
            />
          ))}

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
                  review: updatedBook.review
                })

                await fetchReviews();

                setModalOpen(false);
                setSelectedBook(null);

              } catch (error) {
                console.log(error.message);
              }
            }}
          />

        </div>

      )}

    </div>
  );
}

export default Reviews;