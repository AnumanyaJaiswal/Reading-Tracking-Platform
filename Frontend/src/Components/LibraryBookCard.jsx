import { BookOpen } from "lucide-react";

function LibraryBookCard({ book }) {
    return (
        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                overflow-hidden
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-300
                cursor-pointer
            "
        >
            <img
                src={
                    book.thumbnail ||
                    "https://via.placeholder.com/200x300?text=No+Cover"
                }
                alt={book.title}
                className="w-full h-72 object-cover"
            />

            <div className="p-5">

                <h3 className="font-bold text-[#4C3D63] line-clamp-2">
                    {book.title}
                </h3>

                <p className="text-sm text-[#6B5A7A] mt-2">
                    {book.authors.join(", ")}
                </p>

            </div>
        </div>
    );
}

export default LibraryBookCard;