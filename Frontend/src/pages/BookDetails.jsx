import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookMarked } from "lucide-react";
import { motion } from "framer-motion";

import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

import BookCover from "../Components/Book/BookCover";
import BookInfo from "../Components/Book/BookInfo";
import BookSynopsis from "../Components/Book/BookSynopsis";
import AddToListButton from "../Components/Profile/AddToListButton";

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
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="min-h-screen w-full pt-16 md:pt-0 md:ml-72 flex flex-col items-center justify-center bg-[#FFFDF8] relative overflow-hidden px-4 text-center">

                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#D8C9E8] rounded-full blur-[100px] opacity-40" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#F6D9E8] rounded-full blur-[100px] opacity-40" />

                    <span className="relative text-5xl sm:text-6xl animate-bounce inline-block" style={{ animationDuration: "1.6s" }}>
                        📖
                    </span>

                    <h1 className="relative mt-6 text-2xl sm:text-3xl font-bold text-[#4C3D63] animate-pulse">
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

    // optional meta chips — only render the ones the book actually has
    const metaChips = [
        book.publishedDate && book.publishedDate.slice(0, 4),
        book.pageCount && `${book.pageCount} pages`,
        book.categories?.length && book.categories[0],
    ].filter(Boolean);

    return (
        <div>
            <div className="flex">
                <Sidebar />

                <div className="min-h-screen w-full md:ml-72 bg-[#FFFDF8] relative overflow-hidden">

                    {/* Decorative blurred orbs for depth */}
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#E8DFF2] rounded-full blur-[120px] opacity-50 pointer-events-none" />
                    <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#FCE4F0] rounded-full blur-[120px] opacity-40 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E0EBFA] rounded-full blur-[120px] opacity-30 pointer-events-none" />

                    <main className="relative z-10 px-4 pt-20 pb-10 sm:px-6 sm:pt-24 md:px-12 md:pt-10 md:pb-10">

                        {/* Top bar: back button + subtle breadcrumb */}
                        <div className="flex items-center justify-between gap-3 mb-8 md:mb-10">
                            <button
                                onClick={() => navigate(-1)}
                                className="
                                    group
                                    flex items-center gap-2
                                    px-3 py-2
                                    sm:px-4
                                    rounded-2xl
                                    bg-white/70
                                    backdrop-blur-md
                                    border border-[#EFE5FF]
                                    text-[#4C3D63]
                                    font-semibold
                                    text-sm
                                    shadow-sm
                                    hover:bg-white
                                    hover:shadow-md
                                    transition-all
                                    duration-200
                                    cursor-pointer
                                    shrink-0
                                "
                            >
                                <ArrowLeft
                                    size={16}
                                    className="group-hover:-translate-x-0.5 transition-transform duration-200"
                                />
                                Back
                            </button>

                            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-[#B08DFF] uppercase tracking-widest shrink-0">
                                <BookMarked size={13} />
                                <span className="hidden xs:inline">Book Details</span>
                            </div>
                        </div>

                        {/* Page Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-center mb-8 md:mb-12 px-2"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4C3D63] drop-shadow-sm">
                                📖 Enchanted Tome
                            </h1>

                            <p className="mt-3 text-base sm:text-lg text-[#7C6A9A]">
                                Every story is a constellation waiting to be explored.
                            </p>
                        </motion.div>

                        {/* Main Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="
                                max-w-6xl
                                mx-auto
                                bg-white/60
                                backdrop-blur-xl
                                rounded-[28px] sm:rounded-4xl md:rounded-[40px]
                                shadow-2xl
                                shadow-[#4C3D63]/10
                                border
                                border-white/80
                                p-5 sm:p-8 md:p-10
                            "
                        >

                            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 sm:gap-10 lg:gap-16">

                                {/* Left — sticky cover column */}
                                <div className="w-full">
                                    <div className="lg:sticky lg:top-10 flex flex-col items-center">

                                        <div
                                            className="
                                                aspect-2/3 w-full max-w-55 sm:max-w-65 lg:max-w-[320px]
                                                rounded-2xl overflow-hidden
                                                shadow-xl shadow-[#4C3D63]/15
                                                border border-purple-100
                                                relative
                                            "
                                        >
                                            <BookCover
                                                thumbnail={book.thumbnail}
                                                title={book.title}
                                            />
                                        </div>

                                        {/* Meta chips under the cover */}
                                        {metaChips.length > 0 && (
                                            <div className="flex flex-wrap justify-center gap-2 mt-5">
                                                {metaChips.map((chip, i) => (
                                                    <span
                                                        key={i}
                                                        className="
                                                            text-[11px] font-semibold
                                                            uppercase tracking-wide
                                                            text-[#8A6FB0]
                                                            bg-[#F5EEFC]
                                                            border border-[#EAD9FF]
                                                            px-3 py-1
                                                            rounded-full
                                                        "
                                                    >
                                                        {chip}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex flex-col justify-center min-w-0">

                                    <BookInfo book={book} />

                                    <div className="mt-8">
                                        <AddToListButton book={book} />
                                    </div>

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="my-8 md:my-12 flex items-center gap-3">
                                <div className="h-px flex-1 bg-linear-to-r from-transparent via-purple-200/70 to-transparent" />
                                <span className="text-[#D8C9E8] text-sm">✦</span>
                                <div className="h-px flex-1 bg-linear-to-r from-transparent via-purple-200/70 to-transparent" />
                            </div>

                            <BookSynopsis
                                description={book.description}
                            />

                        </motion.div>

                    </main>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookDetails;