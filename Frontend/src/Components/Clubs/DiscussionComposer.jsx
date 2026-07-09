import { useState } from "react";

function DiscussionComposer({ onPost }) {

    const [message, setMessage] = useState("");

    const handleSubmit = () => {

        if (!message.trim()) return;

        onPost(message);

        setMessage("");
    };

    return (
        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
                border
                border-[#ECE3FA]
            "
        >
            <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="✨ Share your thoughts with the club..."
                className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-[#E8DDF8]
                    p-4
                    outline-none
                    focus:ring-2
                    focus:ring-[#B08DFF]
                "
            />

            <div className="flex justify-end mt-4">

                <button
                    onClick={handleSubmit}
                    className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-[#B08DFF]
                        text-white
                        font-semibold
                        hover:scale-105
                        transition
                    "
                >
                    Post Discussion
                </button>

            </div>

        </div>
    );
}

export default DiscussionComposer;