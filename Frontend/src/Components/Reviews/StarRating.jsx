import { Star } from "lucide-react";

function StarRating({
    rating = 0,
    editable = false,
    onChange,
}) {

    return (
        <div className="flex items-center gap-1">

            {[1, 2, 3, 4, 5].map((star) => (

                <button
                    key={star}
                    type="button"
                    disabled={!editable}
                    onClick={() => editable && onChange(star)}
                    className={`
                        transition-transform duration-200
                        ${editable ? "hover:scale-125 cursor-pointer" : "cursor-default"}
                    `}
                >
                    <Star
                        size={24}
                        strokeWidth={2}
                        className={
                            star <= rating
                                ? "fill-[#F6C945] text-[#F6C945]"
                                : "text-[#D8CCE9]"
                        }
                    />
                </button>

            ))}

        </div>
    );
}

export default StarRating;