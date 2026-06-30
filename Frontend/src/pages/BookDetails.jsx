import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

import BookCover from "../Components/BookCover";
import BookInfo from "../Components/BookInfo";
import BookSynopsis from "../Components/BookSynopsis";
import AddToListButton from "../Components/AddToListButton";

import { getBookById } from "../services/books";

function BookDetails() {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center">
                <h1 className="text-4xl text-[#4C3D63] animate-pulse">
                    ✨ Opening the magical book...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#FFFDF8] via-[#FFF8FC] to-[#F7F2FF]">
            <div className="flex">
                <Sidebar />

                <main className="flex-1 px-12 py-12">

                    {/* Page Heading */}

                    <div className="text-center mb-12">

                        <h1 className="text-5xl font-bold text-[#4C3D63]">
                            📖 Enchanted Tome
                        </h1>

                        <p className="mt-3 text-lg text-[#7C6A9A]">
                            Every story is a constellation waiting to be explored.
                        </p>

                    </div>

                    {/* Main Card */}

                    <div
                        className="
                        bg-white/70
                        backdrop-blur-lg
                        rounded-[40px]
                        shadow-2xl
                        border
                        border-purple-200
                        p-10
                        "
                    >

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                            {/* Left */}

                            <BookCover
                                thumbnail={book.thumbnail}
                                title={book.title}
                            />

                            {/* Right */}

                            <div className="flex flex-col justify-center">

                                <BookInfo book={book} />

                                <div className="mt-8">
                                    <AddToListButton book={book} />
                                </div>

                            </div>

                        </div>

                        {/* Divider */}

                        <div className="my-12 border-t border-purple-200"></div>

                        <BookSynopsis
                            description={book.description}
                        />

                    </div>

                </main>

            </div>

            <Footer />
        </div>
    );
}

export default BookDetails;