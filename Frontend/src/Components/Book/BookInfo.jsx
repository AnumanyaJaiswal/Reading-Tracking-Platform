function BookInfo({ book }) {

    return (

        <div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#4C3D63]">
                {book.title}
            </h1>

            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600">
                {book.authors.join(", ")}
            </p>


        </div>

    );

}

export default BookInfo;