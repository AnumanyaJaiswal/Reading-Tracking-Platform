import { Heart, MessageCircle } from "lucide-react";
import { timeAgo } from "../../../utils/timesAgo";

function DiscussionCard({ discussion }) {

    return (
        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                border
                border-[#ECE3FA]
                p-6
            "
        >

            {/* Header */}

            <div className="flex justify-between items-center">



                <h3 className="font-semibold text-[#4C3D63]">
                    {discussion.user.username}
                </h3>

                <p className="text-sm text-[#8A7B9E]">
                    {timeAgo(discussion.createdAt)}
                </p>



            </div>

            {/* Message */}

            <p
                className="
                    mt-5
                    text-[#5F506F]
                    leading-relaxed
                    whitespace-pre-wrap
                "
            >
                {discussion.message}
            </p>

            {/* Footer */}

            <div className="flex gap-8 mt-6">

                <button
                    className="
                        flex
                        items-center
                        gap-2
                        text-[#8A7B9E]
                        hover:text-[#B08DFF]
                        transition
                    "
                >
                    <Heart size={18} />

                    {discussion.reactionCount}
                </button>

                <button
                    className="
                        flex
                        items-center
                        gap-2
                        text-[#8A7B9E]
                        hover:text-[#B08DFF]
                        transition
                    "
                >
                    <MessageCircle size={18} />

                    {discussion.commentCount}
                </button>

            </div>

        </div>
    );
}

export default DiscussionCard;