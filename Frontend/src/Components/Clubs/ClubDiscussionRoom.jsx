import { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, Sparkles, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { timeAgo } from "../../utils/timesAgo";

function ClubDiscussionRoom({ discussions, onPost, currentUserId }) {

    const [message, setMessage] = useState("")
    const [isSending, setIsSending] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const isFirstRender = useRef(true);

    const scrollToBottom = (behavior = "smooth") => {
        chatEndRef.current?.scrollIntoView({ behavior });
        setShowScrollButton(false);
    };

    const handleScroll = () => {
        const el = messagesContainerRef.current;
        if (!el) return;

        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        setShowScrollButton(distanceFromBottom > 120);
    };

    useEffect(() => {
        const el = messagesContainerRef.current;
        if (!el) return;

        // On first load, don't jump to the bottom — just surface the
        // scroll-to-latest arrow if there's more to see below the fold.
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setShowScrollButton(el.scrollHeight > el.clientHeight);
            return;
        }

        // On new messages, only auto-scroll if the user is already near
        // the bottom. Otherwise let them keep reading and show the arrow.
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        if (distanceFromBottom < 150) {
            scrollToBottom();
        } else {
            setShowScrollButton(true);
        }
    }, [discussions])
    
    const handleSend = async () => {
        if (!message.trim() || isSending) return;

        setIsSending(true);
        try {
            await onPost(message);
            setMessage("");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div
            className="
                relative
                mt-12
                rounded-3xl
                border
                border-white/60
                shadow-xl
                overflow-hidden
                backdrop-blur-xl
            "
            style={{
                background: "rgba(255,255,255,0.5)",
            }}
        >

            {/* Hide scrollbars for this component only */}
            <style>{`
                .pcy-chat-scroll::-webkit-scrollbar { display: none; }
                .pcy-chat-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            `}</style>

            {/* Decorative gradient orbs */}
            <div
                className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full blur-3xl opacity-40"
                style={{
                    background: "radial-gradient(circle, #C9B6E4 0%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -left-16 w-64 h-64 rounded-full blur-3xl opacity-30"
                style={{
                    background: "radial-gradient(circle, #F6B6D1 0%, transparent 70%)",
                }}
            />

            {/* Header */}

            <div
                className="
                    relative
                    px-8
                    py-6
                    border-b
                    border-white/60
                    flex
                    items-center
                    gap-4
                "
            >

                <div
                    className="
                        w-11
                        h-11
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        shadow-md
                        shrink-0
                    "
                    style={{
                        background: "linear-gradient(135deg, #B08DFF 0%, #8B7BB5 100%)",
                    }}
                >
                    <MessageCircle size={20} className="text-white" strokeWidth={2} />
                </div>

                <div>
                    <h2 className="text-2xl font-serif italic text-[#2D2438] tracking-tight">
                        Club Discussion Room
                    </h2>

                    <p className="text-sm text-[#8B7BB5] mt-0.5">
                        Share your thoughts about the current book
                    </p>
                </div>

            </div>


            {/* Messages */}

            <div className="relative">

            <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="
                    pcy-chat-scroll
                    relative
                    p-8
                    space-y-6
                    max-h-150
                    overflow-y-auto
                "
            >

                {discussions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div
                            className="
                                w-14
                                h-14
                                rounded-full
                                flex
                                items-center
                                justify-center
                                mb-4
                            "
                            style={{
                                background: "linear-gradient(135deg, #C9B6E4 0%, #F6B6D1 100%)",
                            }}
                        >
                            <Sparkles size={22} className="text-white" />
                        </div>
                        <p className="font-serif italic text-lg text-[#2D2438]">
                            No thoughts shared yet
                        </p>
                        <p className="text-sm text-[#9A8CA6] mt-1">
                            Be the first to start the conversation
                        </p>
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {discussions.map((discussion) => {
                        const isMine = discussion.user.id === currentUserId;

                        return (
                            <motion.div
                                key={discussion.id}
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className={`
                                    flex
                                    gap-3
                                    w-full
                                    ${isMine ? "justify-end" : "justify-start"}
                                `}
                            >

                                {!isMine && (
                                    <div
                                        className="
                                            w-9
                                            h-9
                                            rounded-full
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-semibold
                                            text-sm
                                            shrink-0
                                            shadow-sm
                                        "
                                        style={{
                                            background: "linear-gradient(135deg, #B08DFF 0%, #8B7BB5 100%)",
                                        }}
                                    >
                                        {discussion.user.username[0].toUpperCase()}
                                    </div>
                                )}

                                {/* Message */}

                                <div className={`max-w-lg flex flex-col ${isMine ? "items-end" : "items-start"}`}>

                                    <div className="flex items-center gap-2 mb-1 px-1">
                                        {!isMine && (
                                            <h3 className="text-sm font-semibold text-[#4C3D63]">
                                                {discussion.user?.username}
                                            </h3>
                                        )}

                                        <span className="text-xs text-[#B3A6C2]">
                                            {timeAgo(discussion.createdAt)}
                                        </span>
                                    </div>


                                    <p
                                        className={`
                                            px-5
                                            py-3
                                            rounded-3xl
                                            leading-relaxed
                                            text-[15px]
                                            shadow-sm
                                            ${isMine
                                                ? "text-white rounded-br-md"
                                                : "bg-white/70 text-[#2D2438] border border-white/60 rounded-bl-md"
                                            }
                                        `}
                                        style={
                                            isMine
                                                ? { background: "linear-gradient(135deg, #B08DFF 0%, #9B7FD4 100%)" }
                                                : undefined
                                        }
                                    >
                                        {discussion.message}
                                    </p>

                                </div>

                                {isMine && (
                                    <div
                                        className="
                                            w-9
                                            h-9
                                            rounded-full
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-semibold
                                            text-sm
                                            shrink-0
                                            shadow-sm
                                        "
                                        style={{
                                            background: "linear-gradient(135deg, #F6B6D1 0%, #B08DFF 100%)",
                                        }}
                                    >
                                        {discussion.user.username[0].toUpperCase()}
                                    </div>
                                )}

                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                <div ref={chatEndRef}></div>

            </div>

            <AnimatePresence>
                {showScrollButton && (
                    <motion.button
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => scrollToBottom()}
                        className="
                            absolute
                            bottom-4
                            left-1/2
                            -translate-x-1/2
                            w-10
                            h-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            text-white
                            shadow-lg
                        "
                        style={{
                            background: "linear-gradient(135deg, #B08DFF 0%, #8B7BB5 100%)",
                        }}
                        aria-label="Scroll to latest message"
                    >
                        <ChevronDown size={18} />
                    </motion.button>
                )}
            </AnimatePresence>

            </div>

            {/* Message Input */}

            <div
                className="
                    relative
                    border-t
                    border-white/60
                    p-5
                    flex
                    gap-3
                    items-center
                "
                style={{
                    background: "linear-gradient(180deg, rgba(255,249,246,0.6) 0%, rgba(255,249,246,0.9) 100%)",
                }}
            >

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                    placeholder="Share your thoughts about this book..."
                    className="
                        flex-1
                        px-5
                        py-3
                        rounded-2xl
                        bg-white/70
                        border
                        border-[#E8DDF8]
                        text-[#2D2438]
                        placeholder:text-[#B3A6C2]
                        outline-none
                        focus:ring-2
                        focus:ring-[#B08DFF]/50
                        transition
                    "
                />

                <motion.button
                    whileHover={{ scale: isSending ? 1 : 1.05 }}
                    whileTap={{ scale: isSending ? 1 : 0.95 }}
                    onClick={handleSend}
                    disabled={!message.trim() || isSending}
                    className="
                        px-6
                        py-3
                        rounded-2xl
                        text-white
                        flex
                        items-center
                        justify-center
                        gap-2
                        font-semibold
                        shadow-md
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        transition
                        w-26
                    "
                    style={{
                        background: "linear-gradient(135deg, #B08DFF 0%, #8B7BB5 100%)",
                    }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isSending ? (
                            <motion.span
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center justify-center"
                            >
                                <Loader2 size={18} className="animate-spin" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="send"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Send
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>

            </div>


        </div>
    )
}

export default ClubDiscussionRoom;