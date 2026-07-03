function BookInfo({ book }) {

    return (

        <div>

            <h1 className="text-5xl font-bold text-[#4C3D63]">
                {book.title}
            </h1>

            <p className="mt-4 text-2xl text-gray-600">
                {book.authors.join(", ")}
            </p>


        </div>

    );

}

export default BookInfo;