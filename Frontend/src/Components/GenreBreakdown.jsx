const getGenreIcon = (genre) => {
    switch (genre.toLowerCase()) {
        case "fantasy":
            return "🧙";
        case "adventure":
            return "🗺️";
        case "mystery":
            return "🕵️";
        case "romance":
            return "💖";
        case "science fiction":
            return "🚀";
        case "horror":
            return "👻";
        case "history":
            return "🏛️";
        case "biography":
            return "👤";
        case "self help":
            return "🌱";
        default:
            return "📚";
    }
};


function GenreBreakdown({ genres = [] }) {

    if (!genres.length) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-lg mt-10">
                <h2 className="text-2xl font-bold text-[#4C3D63] mb-4">
                    📚 Genre Breakdown
                </h2>

                <p className="text-[#6B5A7A]">
                    Finish some books to see your reading habits.
                </p>
            </div>
        );
    }

    const maxCount = Math.max(...genres.map(g => g.count));

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <h2 className="text-3xl font-bold text-[#4C3D63] mb-8">
                📚 Genre Breakdown
            </h2>

            <div className="space-y-6">

                {genres.map((genre) => (

                    <div key={genre.genre}>

                        <div className="flex justify-between mb-2">

                            <span className="font-medium text-[#4C3D63]">
                                <span className="flex items-center gap-2">
                                    <span>{getGenreIcon(genre.genre)}</span>
                                    <span>{genre.genre}</span>
                                </span>
                            </span>

                            <span className="text-[#6B5A7A]">
                                {genre.count}
                            </span>

                        </div>

                        <div className="h-4 rounded-full bg-[#F6F1FF] overflow-hidden">

                            <div
                                className="
                                    h-full
                                    rounded-full
                                    bg-linear-to-r
                                    from-[#B08DFF]
                                    via-[#F6B6D1]
                                    to-[#E7C66D]
                                    transition-all
                                    duration-700
                                "
                                style={{
                                    width: `${(genre.count / maxCount) * 100}%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default GenreBreakdown;