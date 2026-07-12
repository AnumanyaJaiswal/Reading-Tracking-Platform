import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function BookSynopsis({ description }) {

    const [expanded, setExpanded] = useState(false);
    const [needsToggle, setNeedsToggle] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            setNeedsToggle(contentRef.current.scrollHeight > 260);
        }
    }, [description]);

    return (
        <div className="mt-2">

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4C3D63] mb-4 sm:mb-5 flex items-center gap-2">
                <span className="text-[#D8C9E8]">✦</span>
                Synopsis
            </h2>

            <div className="relative">

                <div
                    ref={contentRef}
                    className="
                        prose prose-sm sm:prose-base lg:prose-lg max-w-none
                        text-[#5C4B70]
                        leading-7 sm:leading-8
                        overflow-hidden
                        transition-all duration-500 ease-in-out
                    "
                    style={{
                        maxHeight:
                            !needsToggle || expanded ? "none" : "260px",
                    }}
                    dangerouslySetInnerHTML={{
                        __html: description || "No description available.",
                    }}
                />

                {needsToggle && !expanded && (
                    <div
                        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(180deg, transparent, rgba(255,253,248,0.95))",
                        }}
                    />
                )}

            </div>

            {needsToggle && (
                <button
                    onClick={() => setExpanded((v) => !v)}
                    className="
                        mt-3
                        flex items-center gap-1.5
                        text-sm font-semibold
                        text-[#B08DFF]
                        hover:text-[#4C3D63]
                        transition-colors
                        duration-200
                    "
                >
                    {expanded ? "Show less" : "Read more"}
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                        }`}
                    />
                </button>
            )}

        </div>
    );
}

export default BookSynopsis;