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
                p-6
            "
        >
            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    w-full
                    max-w-2xl
                    max-h-screen overflow-y-auto
                "
            >

                {/* Header */}

                <div className="flex justify-between items-center p-6 border-b border-[#EFE5FF]">

                    <h2 className="text-2xl font-bold text-[#4C3D63]">
                        ✨ Share Your Thoughts
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-[#8A7B9E] hover:text-[#4C3D63]"
                    >
                        <X size={24} />
                    </button>

                </div>

                {/* Body */}

                <div className="p-8">

                    <div className="flex gap-6">

                        <img
                            src={book.thumbnail}
                            alt={book.title}
                            className="w-36 rounded-2xl shadow-md"
                        />

                        <div>

                            <h3 className="text-2xl font-bold text-[#4C3D63]">
                                {book.title}
                            </h3>

                            <p className="text-[#7A688C] mt-2">
                                {book.authors.join(", ")}
                            </p>

                        </div>

                    </div>

                    <div className="mt-8">

                        <label className="font-semibold text-[#4C3D63]">
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

                    <div className="mt-8">

                        <label className="font-semibold text-[#4C3D63]">
                            Your Review
                        </label>

                        <textarea
                            rows={6}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Share your magical reading journey..."
                            className="
                                mt-3
                                w-full
                                rounded-2xl
                                border
                                border-[#E8DDF8]
                                p-4
                                resize-none
                                outline-none
                                focus:ring-2
                                focus:ring-[#B08DFF]
                            "
                        />

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 p-6 border-t border-[#EFE5FF]">

                    <button
                        onClick={onClose}
                        className="
                            px-6
                            py-3
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
                            py-3
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