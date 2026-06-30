function BookSynopsis({ description }) {

    return (

        <div className="mt-10">

            <h2 className="text-3xl font-bold text-[#4C3D63] mb-4">

                Synopsis

            </h2>

            <div
                className="
             prose
             prose-lg
             max-w-none
             text-gray-700
             leading-8
         "
                dangerouslySetInnerHTML={{
                    __html: description || "No description available.",
                }}
            />

        </div>

    );

}

export default BookSynopsis;