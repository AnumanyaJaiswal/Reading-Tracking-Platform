import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import SearchBar from "../Components/SearchBar";
import BookGrid from "../components/Book/BookGrid";
import { searchBooks } from "../services/books";

function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {

    const fetchTrendingBooks = async () => {

      try {

        const books = await searchBooks("fiction");

        setBooks(books);

      } catch (error) {

        console.error(error);

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
      const books = await searchBooks(query);
      console.log("Books found:", books);
      setBooks(books);
    } catch (error) {
      console.error("Error searching books:", error);
    }

  };
  return (
    <div>
      <div className="flex flex-1 ml-0 md:ml-72">
        <Sidebar />
        <div className="min-h-screen w-full bg-linear-to-b from-[#FFFDF8] via-[#FBF7EF] to-[#F6EFE3] px-4 py-8 pt-20 sm:px-6 sm:py-10 md:px-12 md:py-14 md:pt-14">

          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-[#4C3D63] mb-2 md:mb-3 drop-shadow-sm">
                ✨ Search the Library ✨
              </h1>
              <p className="text-[#8A7B9E] text-sm sm:text-base md:text-lg font-medium">
                Discover your next favorite read
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#4C3D63]/5 border border-[#E8DFF2] p-4 sm:p-6 mb-8 md:mb-10">
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
              />
            </div>

            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#4C3D63]">
                {query ? "Search Results" : "✨ Trending Tomes"}
              </h2>
              <div className="flex-1 h-px bg-linear-to-r from-[#D8C9E8] to-transparent" />
            </div>

            <BookGrid books={books} />

          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Search