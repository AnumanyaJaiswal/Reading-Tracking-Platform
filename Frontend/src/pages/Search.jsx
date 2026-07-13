import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import SearchBar from "../Components/SearchBar";
import BookGrid from "../components/Book/BookGrid";
import { searchBooks } from "../services/books";

function BookSkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(201,182,228,0.2)",
      }}
    >
      <div
        className="w-full aspect-2/3"
        style={{ background: "rgba(201,182,228,0.25)" }}
      />
      <div className="p-3 space-y-2">
        <div
          className="h-2.5 w-4/5 rounded-full"
          style={{ background: "rgba(201,182,228,0.25)" }}
        />
        <div
          className="h-2 w-1/2 rounded-full"
          style={{ background: "rgba(201,182,228,0.15)" }}
        />
      </div>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTrendingBooks = async () => {

      try {

        setLoading(true);
        const books = await searchBooks("fiction");
        setBooks(books);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchTrendingBooks();

  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      setLoading(true);
      const books = await searchBooks(query);
      console.log("Books found:", books);
      setBooks(books);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      <div
        className="min-h-screen flex relative overflow-hidden"
        style={{ backgroundColor: "#FFF9F6" }}
      >

        {/* Decorative gradient orbs */}
        <div
          className="absolute -top-32 -right-32 w-md h-112 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,182,228,0.4) 0%, rgba(201,182,228,0) 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -left-40 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(246,182,209,0.3) 0%, rgba(246,182,209,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,182,228,0.25) 0%, rgba(201,182,228,0) 70%)",
          }}
        />

        <Sidebar />

        <div className="flex-1 flex flex-col ml-0 md:ml-72 relative z-10">

          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 pt-20 sm:px-6 sm:py-10 md:px-8 md:py-14 md:pt-14">

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <motion.div
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles size={22} className="sm:hidden" style={{ color: "#F6B6D1" }} strokeWidth={1.75} />
                  <Sparkles size={28} className="hidden sm:block" style={{ color: "#F6B6D1" }} strokeWidth={1.75} />
                </motion.div>

                <h1
                  className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-semibold"
                  style={{
                    background: "linear-gradient(120deg, #2D2438 0%, #8B7BB5 60%, #C9B6E4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Search the Library
                </h1>

                <motion.div
                  animate={{ rotate: [0, -15, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Sparkles size={22} className="sm:hidden" style={{ color: "#C9B6E4" }} strokeWidth={1.75} />
                  <Sparkles size={28} className="hidden sm:block" style={{ color: "#C9B6E4" }} strokeWidth={1.75} />
                </motion.div>
              </div>

              <p className="text-sm sm:text-base italic" style={{ color: "#8B7BB5" }}>
                Discover your next favorite read
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl p-4 sm:p-6 mb-8 md:mb-10"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(201,182,228,0.2)",
              }}
            >
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
              />
            </motion.div>

            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-serif italic font-semibold"
                style={{ color: "#2D2438" }}
              >
                {query ? "Search Results" : "Trending Tomes"}
              </h2>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(90deg, rgba(201,182,228,0.5) 0%, rgba(201,182,228,0) 100%)",
                }}
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <BookSkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <BookGrid books={books} />
            )}

          </main>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Search