import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        console.log(book.id);
        navigate(`/books/${book.id}`);
      }}
      className="
                bg-white
                rounded-3xl
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                cursor-pointer
                overflow-hidden
                border border-purple-100
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

        <h2 className="font-bold text-lg text-[#4C3D63] line-clamp-2">
          {book.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {book.authors?.join(", ")}
        </p>

      </div>

    </div>
  );
}

export default BookCard;