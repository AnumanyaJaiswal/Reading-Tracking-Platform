import React from 'react'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import SearchBar from "../Components/SearchBar";
import BookGrid from "../components/BookGrid";
import { useState } from "react";
import { searchBooks } from "../services/books";
import { useEffect } from "react";

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
      <div className="flex flex-1">
        <Sidebar />
        <div className="min-h-screen bg-[#FFFDF8] px-10 py-10">

          <h1 className="text-5xl text-center font-bold text-[#4C3D63] mb-10">
            ✨ Search the Library ✨
          </h1>

          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />

          <h2 className="mt-12 text-3xl text-[#4C3D63]">
            {query ? "Search Results" : "✨ Trending Tomes"}
          </h2>

          <BookGrid books={books} />

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Search
