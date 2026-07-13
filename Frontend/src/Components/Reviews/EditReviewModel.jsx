import { useEffect, useState } from "react";
import { X } from "lucide-react";
import StarRating from "./StarRating";

function EditReviewModel({
    book,
    open,
    onClose,
    onSave,
}) {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    useEffect(() => {
        if (book) {
            setRating(book.rating || 0);
            setReview(book.review || "");
        }
    }, [book]);

    if (!open || !book) return null;

    const handleSave = () => {
        onSave({
            ...book,
            rating,
            review,
        });
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/40
                backdrop-blur-sm
                flex
                items-center
                justify-center
                p-0 sm:p-6
            "
        >
            <div
                className="
                    bg-white
                    rounded-t-3xl sm:rounded-3xl
                    shadow-2xl
                    w-full
                    max-w-2xl
                    h-full sm:h-auto
                    max-h-screen overflow-y-auto
                "
            >

                {/* Header */}

                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#EFE5FF]">

                    <h2 className="text-lg sm:text-2xl font-bold text-[#4C3D63]">
                        ✨ Share Your Thoughts
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-[#8A7B9E] hover:text-[#4C3D63]"
                    >
                        <X size={22} className="sm:hidden" />
                        <X size={24} className="hidden sm:block" />
                    </button>

                </div>

                {/* Body */}

                <div className="p-5 sm:p-8">

                    <div className="flex gap-4 sm:gap-6">

                        <img
                            src={book.thumbnail}
                            alt={book.title}
                            className="w-20 sm:w-36 rounded-xl sm:rounded-2xl shadow-md shrink-0"
                        />

                        <div>

                            <h3 className="text-base sm:text-2xl font-bold text-[#4C3D63]">
                                {book.title}
                            </h3>

                            <p className="text-sm sm:text-base text-[#7A688C] mt-1 sm:mt-2">
                                {book.authors.join(", ")}
                            </p>

                        </div>

                    </div>

                    <div className="mt-6 sm:mt-8">

                        <label className="font-semibold text-sm sm:text-base text-[#4C3D63]">
                            Rating
                        </label>

                        <div className="mt-3">
                            <StarRating
                                rating={rating}
                                editable
                                onChange={setRating}
                            />
                        </div>

                    </div>

                    <div className="mt-6 sm:mt-8">

                        <label className="font-semibold text-sm sm:text-base text-[#4C3D63]">
                            Your Review
                        </label>

                        <textarea
                            rows={5}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Share your magical reading journey..."
                            className="
                                mt-3
                                w-full
                                rounded-xl sm:rounded-2xl
                                border
                                border-[#E8DDF8]
                                p-3 sm:p-4
                                text-sm sm:text-base
                                resize-none
                                outline-none
                                focus:ring-2
                                focus:ring-[#B08DFF]
                            "
                        />

                    </div>

                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 p-4 sm:p-6 border-t border-[#EFE5FF]">

                    <button
                        onClick={onClose}
                        className="
                            px-6
                            py-2.5 sm:py-3
                            rounded-2xl
                            bg-[#F3EDF9]
                            text-[#4C3D63]
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="
                            px-6
                            py-2.5 sm:py-3
                            rounded-2xl
                            bg-linear-to-r
                            from-[#B08DFF]
                            via-[#D6A8FF]
                            to-[#F6B6D1]
                            text-white
                            font-semibold
                        "
                    >
                        Save Review
                    </button>

                </div>

            </div>
        </div>
    );
}

export default EditReviewModel;