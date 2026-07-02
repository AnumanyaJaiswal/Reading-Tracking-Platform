import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Feather, BookOpen } from "lucide-react";

// Same mystical palette as the rest of Prophecy — cycles for however many
// authors you have, so it stays consistent whether there are 3 or 12.
const PALETTE = [
    "#B08DFF", // lavender
    "#F6B6D1", // blush pink
    "#E7C66D", // gold
    "#7FD8C4", // soft teal (complements the existing trio)
    "#8DA6FF", // periwinkle
    "#E39BA8", // dusty rose
];

function AuthorsPieChart({ authors = [] }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const size = 260;
    const strokeWidth = 30;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    const total = useMemo(
        () => authors.reduce((sum, a) => sum + a.count, 0),
        [authors]
    );

    const segments = useMemo(() => {
        let cumulative = 0;
        return authors.map((author, i) => {
            const fraction = total ? author.count / total : 0;
            const segment = {
                ...author,
                color: PALETTE[i % PALETTE.length],
                fraction,
                dashArray: `${fraction * circumference} ${circumference}`,
                // Rotate each segment to start where the previous one ended.
                rotation: (cumulative / total) * 360,
            };
            cumulative += author.count;
            return segment;
        });
    }, [authors, total, circumference]);

    if (!authors.length) {
        return (
            <div className="bg-white rounded-3xl p-8 shadow-lg mt-10">
                <h2 className="text-2xl font-bold text-[#4C3D63] mb-4">
                    ✍️ Most Read Authors
                </h2>
                <p className="text-[#6B5A7A]">
                    Finish some books to discover your favorite authors.
                </p>
            </div>
        );
    }

    const active = activeIndex !== null ? segments[activeIndex] : null;

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">
            <h2 className="text-3xl font-bold text-[#4C3D63] mb-8">
                ✍️ Most Read Authors
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Chart */}
                <div
                    className="relative shrink-0"
                    style={{ width: size, height: size }}
                >
                    <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                        className="-rotate-90"
                    >
                        {/* Track */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            stroke="#F6F1FF"
                            strokeWidth={strokeWidth}
                        />

                        {segments.map((seg, i) => (
                            <motion.circle
                                key={seg.author}
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="none"
                                stroke={seg.color}
                                strokeWidth={
                                    activeIndex === null || activeIndex === i
                                        ? strokeWidth
                                        : strokeWidth - 6
                                }
                                strokeLinecap="butt"
                                strokeDasharray={seg.dashArray}
                                initial={{
                                    strokeDashoffset: circumference,
                                    opacity: 0,
                                }}
                                animate={{
                                    strokeDashoffset: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    strokeDashoffset: {
                                        duration: 1.1,
                                        delay: i * 0.15,
                                        ease: [0.22, 1, 0.36, 1],
                                    },
                                    opacity: { duration: 0.3, delay: i * 0.15 },
                                }}
                                style={{
                                    transform: `rotate(${seg.rotation}deg)`,
                                    transformOrigin: "50% 50%",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={() => setActiveIndex(i)}
                                onMouseLeave={() => setActiveIndex(null)}
                            />
                        ))}
                    </svg>

                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <motion.div
                            key={active ? active.author : "total"}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center"
                        >
                            {active ? (
                                <>
                                    <span className="text-3xl font-bold text-[#4C3D63]">
                                        {active.count}
                                    </span>
                                    <span className="text-xs text-[#6B5A7A] font-medium max-w-25 text-center leading-tight mt-1">
                                        {active.author}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <BookOpen
                                        size={20}
                                        className="text-[#B08DFF] mb-1"
                                    />
                                    <span className="text-3xl font-bold text-[#4C3D63]">
                                        {total}
                                    </span>
                                    <span className="text-xs text-[#6B5A7A] font-medium">
                                        books total
                                    </span>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 w-full space-y-3">
                    {segments.map((seg, i) => (
                        <motion.div
                            key={seg.author}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className={`
                                flex items-center justify-between gap-3 p-3 rounded-2xl
                                cursor-pointer transition-all duration-200
                                ${
                                    activeIndex === i
                                        ? "bg-[#F6F1FF]"
                                        : "bg-transparent"
                                }
                            `}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{
                                        backgroundColor: `${seg.color}26`,
                                    }}
                                >
                                    <Feather
                                        size={14}
                                        style={{ color: seg.color }}
                                    />
                                </div>
                                <span className="font-medium text-[#4C3D63] truncate">
                                    {seg.author}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-sm text-[#6B5A7A] font-medium">
                                    {seg.count}
                                </span>
                                <span
                                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: `${seg.color}26`,
                                        color: seg.color,
                                    }}
                                >
                                    {Math.round(seg.fraction * 100)}%
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AuthorsPieChart;