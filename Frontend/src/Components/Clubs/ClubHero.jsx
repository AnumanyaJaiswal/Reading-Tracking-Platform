import { Crown, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

function ClubHero({ club, onJoin, onLeave }) {
    if (!club) return null;

    return (
        <div
            className="
                relative
                rounded-3xl
                p-5
                sm:p-8
                md:p-10
                border
                border-white/60
                shadow-xl
                backdrop-blur-xl
                overflow-hidden
            "
            style={{
                background: "linear-gradient(120deg, #F6F1FF 0%, #FFF8FC 50%, #FFF7EA 100%)",
            }}
        >

            {/* Decorative gradient orbs */}
            <div
                className="pointer-events-none absolute -top-20 -right-10 w-56 h-56 rounded-full blur-3xl opacity-40"
                style={{ background: "radial-gradient(circle, #C9B6E4 0%, transparent 70%)" }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -left-10 w-56 h-56 rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(circle, #F6B6D1 0%, transparent 70%)" }}
            />

            <div className="relative flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 sm:gap-8">

                {/* Left */}

                <div className="min-w-0">

                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">

                        <div
                            className="
                                w-10
                                h-10
                                sm:w-12
                                sm:h-12
                                md:w-14
                                md:h-14
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                shadow-md
                                shrink-0
                                mt-1
                                sm:mt-0
                            "
                            style={{
                                background: "linear-gradient(135deg, #B08DFF 0%, #8B7BB5 100%)",
                            }}
                        >
                            <Crown size={20} className="text-white sm:hidden" strokeWidth={2} />
                            <Crown size={24} className="text-white hidden sm:block" strokeWidth={2} />
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold text-[#2D2438] tracking-tight leading-tight wrap-break-words">
                            {club.name}
                        </h1>

                    </div>

                    <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#6B5A7A] max-w-3xl leading-relaxed">
                        {club.description}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                                sm:gap-2
                                px-3
                                sm:px-4
                                py-1.5
                                sm:py-2
                                rounded-full
                                bg-white/60
                                border
                                border-white/70
                                text-[#4C3D63]
                                text-xs
                                sm:text-sm
                                font-medium
                                shadow-sm
                            "
                        >
                            <Users size={14} className="text-[#8B7BB5] sm:hidden" />
                            <Users size={16} className="text-[#8B7BB5] hidden sm:block" />
                            <span>{club.memberCount} Members</span>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                                sm:gap-2
                                px-3
                                sm:px-4
                                py-1.5
                                sm:py-2
                                rounded-full
                                bg-white/60
                                border
                                border-white/70
                                text-[#4C3D63]
                                text-xs
                                sm:text-sm
                                font-medium
                                shadow-sm
                                max-w-full
                            "
                        >
                            <Crown size={14} className="text-[#8B7BB5] shrink-0 sm:hidden" />
                            <Crown size={16} className="text-[#8B7BB5] shrink-0 hidden sm:block" />
                            <span className="truncate">{club.owner.username}</span>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                                sm:gap-2
                                px-3
                                sm:px-4
                                py-1.5
                                sm:py-2
                                rounded-full
                                bg-white/60
                                border
                                border-white/70
                                text-[#4C3D63]
                                text-xs
                                sm:text-sm
                                font-medium
                                shadow-sm
                            "
                        >
                            <Calendar size={14} className="text-[#8B7BB5] shrink-0 sm:hidden" />
                            <Calendar size={16} className="text-[#8B7BB5] shrink-0 hidden sm:block" />
                            <span>
                                Created{" "}
                                {new Date(club.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-col gap-4 w-full lg:w-auto">

                    {club.joined ? (

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onLeave}
                            className="
                                w-full
                                lg:w-auto
                                px-6
                                sm:px-8
                                py-3.5
                                sm:py-4
                                rounded-2xl
                                bg-white/80
                                border
                                border-[#DCCEFF]
                                text-[#4C3D63]
                                font-semibold
                                text-sm
                                sm:text-base
                                shadow-sm
                                hover:bg-white
                                transition
                                cursor-pointer
                            "
                        >
                            Leave Club
                        </motion.button>

                    ) : (

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onJoin}
                            className="
                                w-full
                                lg:w-auto
                                px-6
                                sm:px-8
                                py-3.5
                                sm:py-4
                                rounded-2xl
                                text-white
                                font-semibold
                                text-sm
                                sm:text-base
                                shadow-md
                                transition
                                cursor-pointer
                            "
                            style={{
                                background: "linear-gradient(135deg, #B08DFF 0%, #8B7BB5 100%)",
                            }}
                        >
                            Join Club
                        </motion.button>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ClubHero;