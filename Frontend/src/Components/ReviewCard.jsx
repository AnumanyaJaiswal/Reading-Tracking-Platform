import { Pencil, Quote } from "lucide-react";
import StarRating from "./StarRating";
import { motion } from "framer-motion";

function ReviewCard({ book, onEdit }) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="
                group
                relative
                bg-white
                rounded-2xl
                border
                border-[#EFE5FF]
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                overflow-hidden
                flex
                flex-col
            "
        >

            {/* Cover */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={
                        book.thumbnail ||
                        "https://via.placeholder.com/300x450?text=No+Cover"
                    }
                    alt={book.title}
                    className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                    "
                />

                {/* bottom fade so title area feels intentional */}
                <div
                    className="absolute inset-x-0 bottom-0 h-16"
                    style={{
                        background:
                            "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))",
                    }}
                />

                {/* Edit button, floating */}
                <button
                    onClick={() => onEdit(book)}
                    className="
                        absolute
                        top-3
                        right-3
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        rounded-full
                        text-white
                        opacity-0
                        group-hover:opacity-100
                        hover:scale-110
                        transition-all
                        duration-200
                        shadow-md
                        cursor-pointer
                    "
                    style={{
                        background:
                            "linear-gradient(135deg, #B08DFF, #F6B6D1)",
                    }}
                >
                    <Pencil size={13} />
                </button>

                {/* Rating badge, floating on image */}
                <div
                    className="
                        absolute
                        bottom-2
                        left-3
                        px-2
                        py-1
                        rounded-full
                        flex
                        items-center
                        gap-1
                    "
                    style={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <StarRating rating={book.rating} size={11} />
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pt-3 pb-4 flex flex-col flex-1">

                <h2 className="text-[15px] font-bold text-[#4C3D63] leading-snug line-clamp-1">
                    {book.title}
                </h2>

                <p className="text-xs text-[#9484A8] mt-0.5 line-clamp-1">
                    {book.authors.join(", ")}
                </p>

                <div className="mt-3 flex items-start gap-1.5 flex-1">
                    <Quote
                        size={13}
                        className="text-[#D4B2FF] shrink-0 mt-0.5"
                        fill="#D4B2FF"
                    />
                    <p className="text-[13px] text-[#5C4B70] leading-5 italic line-clamp-2">
                        {book.review || "No written review."}
                    </p>
                </div>

            </div>

        </motion.div>
    );
}

export default ReviewCard;