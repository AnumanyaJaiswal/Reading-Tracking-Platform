import BookCard from "./BookCard";

function BookGrid({ books }) {

    if (books.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center mt-16 mb-10 py-16 px-6 rounded-2xl bg-white/50 border border-dashed border-[#E0D4ED]">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-xl font-semibold text-[#4C3D63] mb-2">
                    No books found yet
                </p>
                <p className="text-[#8A7B9E] text-sm max-w-xs">
                    Search for a title, author, or genre to start exploring ✨
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">

            {books.map((book, index) => (
                <div
                    key={book.id}
                    className="opacity-0 animate-[fadeUp_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
                >
                    <BookCard book={book} />
                </div>
            ))}

        </div>
    );
}

export default BookGrid;