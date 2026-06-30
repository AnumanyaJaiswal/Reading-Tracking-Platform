import { useState } from "react";

export default function SearchBar({
    query,
    setQuery,
    onSearch,
}) {

    return (
        <div className="flex items-center gap-4 mt-8">

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
                placeholder="🔮 Search magical books..."
                className="
                    flex-1
                    px-6
                    py-4
                    rounded-2xl
                    border
                    border-[#B08DFF]
                    bg-white
                    shadow-md
                    text-[#4C3D63]
                    outline-none
                    focus:ring-2
                    focus:ring-[#B08DFF]
                "
            />

            <button
                onClick={onSearch}
                className="
                    px-8
                    py-4
                    rounded-2xl
                    bg-[#B08DFF]
                    text-white
                    hover:scale-105
                    transition
                "
            >
                Search
            </button>

        </div>
    );
}