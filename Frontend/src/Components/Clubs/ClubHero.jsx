import { Crown, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

function ClubHero({ club, onJoin, onLeave }) {
    if (!club) return null;

    return (
        <div
            className="
                relative
                rounded-3xl
                p-6
                sm:p-10
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

            <div className="relative flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

                {/* Left */}

                <div>

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                w-12
                                h-12
                                sm:w-14
                                sm:h-14
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
                            <Crown size={24} className="text-white" strokeWidth={2} />
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-bold text-[#2D2438] tracking-tight">
                            {club.name}
                        </h1>

                    </div>

                    <p className="mt-5 text-base sm:text-lg text-[#6B5A7A] max-w-3xl leading-relaxed">
                        {club.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-white/60
                                border
                                border-white/70
                                text-[#4C3D63]
                                text-sm
                                font-medium
                                shadow-sm
                            "
                        >
                            <Users size={16} className="text-[#8B7BB5]" />
                            <span>{club.memberCount} Members</span>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-white/60
                                border
                                border-white/70
                                text-[#4C3D63]
                                text-sm
                                font-medium
                                shadow-sm
                            "
                        >
                            <Crown size={16} className="text-[#8B7BB5]" />
                            <span>{club.owner.username}</span>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-white/60
                                border
                                border-white/70
                                text-[#4C3D63]
                                text-sm
                                font-medium
                                shadow-sm
                            "
                        >
                            <Calendar size={16} className="text-[#8B7BB5]" />
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
                                px-8
                                py-4
                                rounded-2xl
                                bg-white/80
                                border
                                border-[#DCCEFF]
                                text-[#4C3D63]
                                font-semibold
                                shadow-sm
                                hover:bg-white
                                transition
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
                                px-8
                                py-4
                                rounded-2xl
                                text-white
                                font-semibold
                                shadow-md
                                transition
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