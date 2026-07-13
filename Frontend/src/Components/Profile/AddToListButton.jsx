import { useState } from "react";
import AddToListModel from "./AddToListModel";
import { addToList } from "../../services/lists";
import EditReviewModel from "../Reviews/EditReviewModel";
import { updateReview } from '../../services/review'

function AddToListButton({ book }) {

    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [reviewOpen, setReviewOpen] = useState(false);

    const handleAdd = async (status) => {

        try {

            const savebook = await addToList({

                googleBookId: book.id,

                title: book.title,

                authors: book.authors,

                thumbnail: book.thumbnail,

                pageCount: book.pageCount,

                categories: book.categories,

                status,

            });

            setOpen(false);

            if (status === 'FINISHED') {
                setSelectedBook(savebook);
                setReviewOpen(true)
            }
            else {
                alert("Book Added Successfuully");
            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleReview = async (updatedBook) => {
        try {
            await updateReview(updatedBook.id, {
                rating: updatedBook.rating,
                review: updatedBook.review
            })

            setReviewOpen(false);
            setSelectedBook(null);

            alert("Review saved successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>

            <button
                onClick={() => setOpen(true)}
                className="
                    mt-10
                    px-8
                    py-4
                    rounded-2xl
                    bg-[#B08DFF]
                    text-white
                    font-semibold
                    hover:scale-105
                    transition
                    cursor-pointer
                "
            >
                ✨ Add To My Library
            </button>

            <AddToListModel
                open={open}
                onClose={() => setOpen(false)}
                onSelect={handleAdd}
            />

            <EditReviewModel
                open={reviewOpen}
                book={selectedBook}
                onClose={() => {
                    setReviewOpen(false);
                    setSelectedBook(null);
                }}
                onSave={ handleReview }
            />

        </>
    );
}

export default AddToListButton;