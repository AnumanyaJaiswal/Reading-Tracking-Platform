import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

import BookCover from "../Components/BookCover";
import BookInfo from "../Components/BookInfo";
import BookSynopsis from "../Components/BookSynopsis";
import AddToListButton from "../Components/AddToListButton";

import { getBookById } from "../services/books";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

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
            <div className="flex">
                <Sidebar />
                <div className="min-h-screen w-full ml-72 flex flex-col items-center justify-center bg-[#FFFDF8] relative overflow-hidden">

                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#D8C9E8] rounded-full blur-[100px] opacity-40" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#F6D9E8] rounded-full blur-[100px] opacity-40" />

                    <span className="relative text-6xl animate-bounce inline-block" style={{ animationDuration: "1.6s" }}>
                        📖
                    </span>

                    <h1 className="relative mt-6 text-3xl font-bold text-[#4C3D63] animate-pulse">
                        Opening the magical book...
                    </h1>

                    <div className="relative flex gap-1.5 mt-4">
                        <span className="w-2 h-2 rounded-full bg-[#C9B8E0] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-[#B89FD6] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-[#A887D0] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div>


            <div className="flex">
                <Sidebar />

                <div className="min-h-screen w-full ml-72 bg-[#FFFDF8] relative overflow-hidden">

                    {/* Decorative blurred orbs for depth */}
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#E8DFF2] rounded-full blur-[120px] opacity-50 pointer-events-none" />
                    <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#FCE4F0] rounded-full blur-[120px] opacity-40 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E0EBFA] rounded-full blur-[120px] opacity-30 pointer-events-none" />

                    <main className="relative z-10 px-12 py-12">

                        <button
                            onClick={() => navigate(-1)}
                            className="
                                flex items-center gap-2
                                mb-8
                                px-4 py-2
                                rounded-2xl
                                bg-[#B08DFF]
                              text-white
                                font-semibold
                                hover:scale-105
                                transition
                            "
                        >
                            <ArrowLeft size={18} />
                            Return
                        </button>

                        {/* Page Heading */}

                        <div className="text-center mb-12">

                            <h1 className="text-5xl font-bold text-[#4C3D63] drop-shadow-sm">
                                📖 Enchanted Tome
                            </h1>

                            <p className="mt-3 text-lg text-[#7C6A9A]">
                                Every story is a constellation waiting to be explored.
                            </p>

                        </div>

                        {/* Main Card */}

                        <div
                            className="
                        max-w-6xl
                        mx-auto
                        bg-white/60
                        backdrop-blur-xl
                        rounded-[40px]
                        shadow-2xl
                        shadow-[#4C3D63]/10
                        border
                        border-white/80
                        p-10
                        "
                        >

                            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16">

                                {/* Left */}

                                <div className="w-full">
                                    <div className="aspect-2/3 w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-xl shadow-[#4C3D63]/15 border border-purple-100">
                                        <BookCover
                                            thumbnail={book.thumbnail}
                                            title={book.title}
                                        />
                                    </div>
                                </div>

                                {/* Right */}

                                <div className="flex flex-col justify-center">

                                    <BookInfo book={book} />

                                    <div className="mt-8">
                                        <AddToListButton book={book} />
                                    </div>

                                </div>

                            </div>

                            {/* Divider */}

                            <div className="my-12 border-t border-purple-200/60"></div>

                            <BookSynopsis
                                description={book.description}
                            />

                        </div>

                    </main>



                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookDetails;