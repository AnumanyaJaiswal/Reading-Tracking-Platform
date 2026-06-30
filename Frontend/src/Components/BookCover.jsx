function BookCover({ thumbnail, title }) {
    return (
        <div className="flex justify-center">

            <img
                src={
                    thumbnail ||
                    "https://via.placeholder.com/300x450?text=No+Cover"
                }
                alt={title}
                className="
                    rounded-3xl
                    shadow-2xl
                    w-72
                    hover:scale-105
                    transition
                    duration-300
                "
            />

        </div>
    );
}

export default BookCover;