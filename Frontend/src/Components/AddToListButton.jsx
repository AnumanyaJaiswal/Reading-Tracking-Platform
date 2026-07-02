import { useState } from "react";
import AddToListModel from "./AddToListModel";
import { addToList } from "../services/lists";

function AddToListButton({ book }) {

    const [open, setOpen] = useState(false);

    const handleAdd = async (status) => {

        try {

            await addToList({

                googleBookId: book.id,

                title: book.title,

                authors: book.authors,

                thumbnail: book.thumbnail,

                pageCount: book.pageCount,

                categories: book.categories,

                status,

            });

            setOpen(false);

            alert("Book added successfully!");

        } catch (error) {

            console.error(error);

        }

    };

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
                "
            >
                ✨ Add To My Library
            </button>

            <AddToListModel
                open={open}
                onClose={() => setOpen(false)}
                onSelect={handleAdd}
            />

        </>
    );
}

export default AddToListButton;