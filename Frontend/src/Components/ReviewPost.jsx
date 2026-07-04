import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ReviewPost({ review }) {
    const navigate = useNavigate();

    const initial = review.user.username.charAt(0).toUpperCase();

    return (
        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                hover:shadow-2xl
                transition-all
                duration-300
            "
        >
            {/* User */}

            <div className="flex items-center gap-4">

                <div
                    className="
                        w-12
                        h-12
                        rounded-full
                        bg-[#B08DFF]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                    "
                >
                    {initial}
                </div>

                <div>

                    <h3 className="font-bold text-[#4C3D63]">
                        {review.user.username}
                    </h3>

                    <p className="text-sm text-[#8A7B9E]">
                        {new Date(review.updatedAt).toLocaleDateString()}
                    </p>

                </div>

            </div>

            {/* Book */}

            <div
                onClick={() => navigate(`/books/${review.googleBookId}`)}
                className="flex gap-5 mt-6 cursor-pointer"
            >

                <img
                    src={review.thumbnail}
                    alt={review.title}
                    className="w-24 rounded-2xl shadow"
                />

                <div>

                    <h2 className="text-xl font-bold text-[#4C3D63]">
                        {review.title}
                    </h2>

                    <p className="text-[#8A7B9E] mt-1">
                        {review.authors.join(", ")}
                    </p>

                    <div className="flex gap-1 mt-3">

                        {[1,2,3,4,5].map((n)=>(
                            <Star
                                key={n}
                                size={18}
                                className={
                                    n <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                            />
                        ))}

                    </div>

                </div>

            </div>

            {/* Review */}

            <p className="mt-6 text-[#5B4C70] leading-7">
                {review.review}
            </p>

        </div>
    );
}

export default ReviewPost;