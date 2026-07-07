import { motion } from "framer-motion";
import { Trophy, BookOpen, Moon, Sparkles } from "lucide-react";

function ClubReadingProgress({ currentBook, readingProgress }) {

    // Empty state
    if (!currentBook || !readingProgress) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 p-10 text-center"
            >
                <div
                    className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(139,123,181,0.18) 0%, rgba(139,123,181,0) 70%)",
                    }}
                />

                <h2 className="relative font-serif italic text-2xl font-bold text-[#2D2438]">
                    Current Club Read
                </h2>

                <p className="relative mt-4 text-[#8B7BB5]">
                    The club hasn't chosen a book yet.
                </p>
            </motion.div>
        );
    }

    const stats = [
        { icon: Trophy, label: "Finished", value: readingProgress.finished },
        { icon: BookOpen, label: "Reading", value: readingProgress.reading },
        { icon: Moon, label: "Want To Read", value: readingProgress.wantToRead },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-white/50 backdrop-blur-xl rounded-[2rem] shadow-lg border border-white/60 p-8 md:p-10"
        >
            {/* Decorative orbs */}
            <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139,123,181,0.18) 0%, rgba(139,123,181,0) 70%)",
                }}
            />
            <div
                className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(246,182,209,0.16) 0%, rgba(246,182,209,0) 70%)",
                }}
            />

            {/* Eyebrow */}
            <div className="relative flex items-center gap-2 mb-2 justify-center md:justify-start">
                <Sparkles className="w-4 h-4 text-[#8B7BB5]" strokeWidth={2} />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B7BB5]">
                    Now Reading Together
                </span>
            </div>

            <h2 className="relative font-serif italic text-3xl font-bold text-[#2D2438] mb-8 text-center md:text-left">
                Current Club Read
            </h2>

            <div className="relative flex flex-col md:flex-row gap-10 md:gap-12 items-center md:items-start">

                {/* Cover — spotlighted */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                    whileHover={{ rotate: 0, scale: 1.03 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative shrink-0"
                >
                    {/* Glow halo behind the cover */}
                    <div
                        className="absolute inset-0 -m-6 rounded-full blur-2xl"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(139,123,181,0.35) 0%, rgba(246,182,209,0.15) 55%, rgba(139,123,181,0) 75%)",
                        }}
                    />

                    <img
                        src={currentBook.thumbnail}
                        alt={currentBook.title}
                        className="relative w-36 sm:w-40 md:w-44 aspect-[2/3] object-cover rounded-xl"
                        style={{
                            boxShadow:
                                "0 2px 6px rgba(45,36,56,0.12), 0 18px 32px -12px rgba(139,123,181,0.45)",
                        }}
                    />

                    {/* Spine highlight for a book-like edge */}
                    <div
                        className="absolute inset-y-0 left-0 w-2 rounded-l-xl pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0))",
                        }}
                    />
                </motion.div>

                <div className="flex-1 min-w-0 w-full text-center md:text-left">

                    <h3 className="text-2xl md:text-3xl font-bold text-[#2D2438] leading-snug">
                        {currentBook.title}
                    </h3>

                    <p className="text-[#8B7BB5] mt-1.5">
                        {currentBook.authors.join(", ")}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-8">

                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-xs tracking-[0.15em] uppercase text-[#2D2438]/60">
                                Club Progress
                            </span>

                            <span className="font-bold text-[#8B7BB5]">
                                {readingProgress.progress}%
                            </span>
                        </div>

                        <div className="h-3 rounded-full bg-[#EFE8FB] overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${readingProgress.progress}%` }}
                                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                                className="h-full rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #8B7BB5 0%, #C9A9E0 55%, #F6B6D1 100%)",
                                }}
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
                        {stats.map(({ icon: Icon, label, value }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                                whileHover={{ y: -3 }}
                                className="text-center rounded-2xl bg-white/60 backdrop-blur-sm border border-white/70 py-4 px-2 transition-shadow hover:shadow-md"
                            >
                                <div className="flex justify-center">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #8B7BB5 0%, #C9A9E0 100%)",
                                        }}
                                    >
                                        <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
                                    </div>
                                </div>

                                <p className="mt-2 font-bold text-[#2D2438]">
                                    {value}
                                </p>

                                <p className="text-xs text-[#8B7BB5]">
                                    {label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export default ClubReadingProgress;