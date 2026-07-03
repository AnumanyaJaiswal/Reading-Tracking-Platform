import { useEffect, useState } from "react";
import { getLists } from "../../services/lists";
import LibrarySection from "../../Components/LibrarySection";
import EditReviewModel from "../../Components/EditReviewModel";
import { updateReview } from "../../services/review";

function Lists() {

  const [lists, setLists] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleReview = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };


  const fetchLists = async () => {
    try {
      const data = await getLists();
      setLists(data)
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  useEffect(() => {
    fetchLists()
  }, [])


  return (
    <>

      <LibrarySection
        title="✨ Want to Read"
        type="WANT_TO_READ"
        books={lists.wantToRead}
        onReview={handleReview}
      />

      <LibrarySection
        title="📖 Currently Reading"
        type="CURRENTLY_READING"
        books={lists.currentlyReading}
        onReview={handleReview}
      />

      <LibrarySection
        title="🏆 Finished"
        type="FINISHED"
        books={lists.finished}
        onReview={handleReview}
      />

      <EditReviewModel
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

            await fetchLists();

            setModalOpen(false);
            setSelectedBook(null);

          } catch (error) {
            console.error(error);
          }

        }}
      />
    </>
  );
}

export default Lists;