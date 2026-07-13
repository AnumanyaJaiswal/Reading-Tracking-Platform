import { motion } from "framer-motion";
import { BookHeart } from "lucide-react";
import ReviewPost from "./ReviewPost";

function ReviewFeed({ reviews }) {

    if (!reviews.length) {

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 px-4 sm:py-24 rounded-2xl sm:rounded-3xl backdrop-blur-xl"
                style={{
                    background: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(201,182,228,0.25)",
                }}
            >

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4"
                    style={{
                        background: "linear-gradient(135deg, rgba(201,182,228,0.35) 0%, rgba(246,182,209,0.35) 100%)",
                    }}
                >
                    <BookHeart size={24} className="sm:hidden" style={{ color: "#8B7BB5" }} strokeWidth={1.5} />
                    <BookHeart size={28} className="hidden sm:block" style={{ color: "#8B7BB5" }} strokeWidth={1.5} />
                </motion.div>

                <h2
                    className="text-xl sm:text-2xl font-serif italic font-semibold"
                    style={{ color: "#2D2438" }}
                >
                    No Reviews Yet
                </h2>

                <p className="mt-3 text-sm sm:text-base" style={{ color: "#8B7BB5" }}>
                    Be the first reader to share your thoughts.
                </p>

            </motion.div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (

        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4 sm:space-y-5"
        >

            {reviews.map(review => (

                <motion.div key={review.id} variants={item}>
                    <ReviewPost review={review} />
                </motion.div>

            ))}

        </motion.div>

    );
}

export default ReviewFeed;