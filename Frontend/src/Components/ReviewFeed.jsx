import ReviewPost from "./ReviewPost";

function ReviewFeed({ reviews }) {

    if (!reviews.length) {

        return (
            <div className="text-center py-20">

                <h2 className="text-3xl font-bold text-[#4C3D63]">
                    No Reviews Yet 📚
                </h2>

                <p className="mt-3 text-[#8A7B9E]">
                    Be the first reader to share your thoughts.
                </p>

            </div>
        );
    }

    return (

        <div className="space-y-8">

            {reviews.map(review => (

                <ReviewPost
                    key={review.id}
                    review={review}
                />

            ))}

        </div>

    );
}

export default ReviewFeed;