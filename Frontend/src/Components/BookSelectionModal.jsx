import React from "react";
import { useState } from "react";
import { searchBooks } from "../services/books";

function BookSelectionModal({
    isOpen,
    onClose,
    onSelectBook,
}) {

    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {

        if (!query.trim()) return;

        try {

            setLoading(true);

            const results = await searchBooks(query);

            setBooks(results);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (!isOpen) return null;

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/40
                backdrop-blur-sm
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                    bg-[#FFFDF8]
                    rounded-3xl
                    w-\[900px\]
                    max-h-[85vh]
                    overflow-y-auto
                    p-8
                    shadow-2xl
                "
            >

                <div className="flex justify-between items-center">

                    <h2 className="text-3xl font-bold text-[#4C3D63]">
                        📖 Choose Current Book
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl"
                    >
                        ✕
                    </button>

                </div>

                <p className="mt-2 text-[#7C6A9A]">
                    Search for the magical book your circle will read together.
                </p>

                <div className="mt-8 flex gap-3">

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search books..."
                        className="
                        flex-1
                        rounded-2xl
                        border
                        border-[#E7D9FF]
                        px-5
                        py-4
                        outline-none
                        focus:ring-2
                     focus:ring-[#B08DFF]
                    "
                    />

                    <button
                        onClick={handleSearch}
                        className="
                        px-8
                        rounded-2xl
                     bg-[#B08DFF]
                     text-white
                        font-semibold
                    "
                    >
                        Search
                    </button>
                </div>
                {
                    loading && (
                        <div className="mt-6 text-center text-[#7C6A9A]">
                            Searching magical books...
                        </div>
                    )
                }

                <div className="mt-8 space-y-4">

                    {books.map((book) => (

                        <div
                            key={book.id}
                            className="
                                    flex
                                    justify-between
                                    items-center
                                    p-4
                                    rounded-2xl
                                 bg-white
                                    border
                                "
                        >

                            <div className="flex gap-4">

                                <img
                                    src={book.thumbnail}
                                    alt={book.title}
                                    className="w-16 rounded-lg"
                                />

                                <div>

                                    <h3 className="font-semibold">
                                        {book.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {book.authors?.join(", ")}
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => {
                                    onSelectBook(book);
                                    onClose();
                                }}
                                className="
                                        px-5
                                        py-2
                                        rounded-xl
                                        bg-[#B08DFF]
                                        text-white
                                    "
                            >
                                Select
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
}

export default BookSelectionModal;