import BookCard from "./BookCard";

function BookGrid({ books }) {

    if (books.length === 0) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Search for your favourite books ✨
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">

            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                />
            ))}

        </div>
    );
}

export default BookGrid;