import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ReviewPost({ review }) {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const initial = review.user.username.charAt(0).toUpperCase();

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl transition-all duration-500 group overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.5)",
                border: hovered ? "1px solid rgba(201,182,228,0.7)" : "1px solid rgba(201,182,228,0.3)",
                boxShadow: hovered
                    ? "0 12px 36px rgba(139,123,181,0.22)"
                    : "0 4px 20px rgba(139,123,181,0.08)",
            }}
        >
            {/* Glow sweep on hover */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: "radial-gradient(circle at 85% 0%, rgba(246,182,209,0.18) 0%, rgba(246,182,209,0) 55%)",
                }}
            />

            {/* User */}

            <div className="flex items-center gap-3 relative">

                <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0"
                    style={{
                        background: "linear-gradient(135deg, #C9B6E4 0%, #8B7BB5 100%)",
                        boxShadow: "0 0 0 3px rgba(201,182,228,0.2)",
                    }}
                >
                    {initial}
                </div>

                <div>

                    <h3 className="font-semibold text-xs sm:text-sm" style={{ color: "#2D2438" }}>
                        {review.user.username}
                    </h3>

                    <p className="text-[11px] sm:text-xs" style={{ color: "#8B7BB5" }}>
                        {new Date(review.updatedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>

                </div>

            </div>

            {/* Book */}

            <div
                onClick={() => navigate(`/books/${review.googleBookId}`)}
                className="flex gap-3 sm:gap-4 mt-4 sm:mt-5 cursor-pointer relative"
            >

                <div className="relative shrink-0">
                    <img
                        src={review.thumbnail}
                        alt={review.title}
                        className="w-14 sm:w-16 rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-[1.05] group-hover:-rotate-1"
                    />
                    <div
                        className="absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none"
                        style={{
                            opacity: hovered ? 1 : 0,
                            boxShadow: "0 0 16px rgba(201,182,228,0.6)",
                        }}
                    />
                </div>

                <div className="min-w-0">

                    <h2
                        className="text-sm sm:text-base font-serif italic font-semibold truncate"
                        style={{ color: "#2D2438" }}
                    >
                        {review.title}
                    </h2>

                    <p className="text-xs sm:text-sm mt-0.5 truncate" style={{ color: "#8B7BB5" }}>
                        {review.authors.join(", ")}
                    </p>

                    <div className="flex gap-0.5 mt-2">

                        {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                                key={n}
                                size={13}
                                className={`sm:hidden ${n <= review.rating ? "fill-current" : ""}`}
                                style={{
                                    color: n <= review.rating ? "#F6B6D1" : "#E5DCEF",
                                }}
                            />
                        ))}
                        {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                                key={`d-${n}`}
                                size={14}
                                className={`hidden sm:block ${n <= review.rating ? "fill-current" : ""}`}
                                style={{
                                    color: n <= review.rating ? "#F6B6D1" : "#E5DCEF",
                                    filter: n <= review.rating && hovered ? "drop-shadow(0 0 3px rgba(246,182,209,0.6))" : "none",
                                    transition: "filter 0.4s",
                                }}
                            />
                        ))}

                    </div>

                </div>

            </div>

            {/* Review */}

            <div className="mt-4 sm:mt-5 flex gap-2 relative">
                <Quote
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: "#C9B6E4" }}
                    strokeWidth={2}
                    fill="rgba(201,182,228,0.15)"
                />
                <p
                    className="text-xs sm:text-sm leading-5 sm:leading-6 line-clamp-3"
                    style={{ color: "#5B4C70" }}
                >
                    {review.review}
                </p>
            </div>

        </div>
    );
}

export default ReviewPost;