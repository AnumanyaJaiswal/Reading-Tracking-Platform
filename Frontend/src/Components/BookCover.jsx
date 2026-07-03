import { useState } from "react";

function BookCover({ thumbnail, title }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-full group">

            {/* Skeleton shimmer while image loads */}
            {!loaded && (
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                        background:
                            "linear-gradient(135deg, #EDE3F8, #F8EFE0)",
                    }}
                />
            )}

            <img
                src={
                    thumbnail ||
                    "https://via.placeholder.com/300x450?text=No+Cover"
                }
                alt={title}
                onLoad={() => setLoaded(true)}
                className="
                    w-full h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-500
                    ease-out
                "
            />

            {/* Soft sheen overlay for a "glossy jacket" feel */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.15), transparent 40%)",
                }}
            />

        </div>
    );
}

export default BookCover;