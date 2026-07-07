import { Crown, Users, Calendar } from "lucide-react";

function ClubHero({ club }) {
    if (!club) return null;

    return (
        <div
            className="
                rounded-3xl
                p-10
                bg-linear-to-r
                from-[#F6F1FF]
                via-[#FFF8FC]
                to-[#FFF7EA]
                shadow-xl
                border
                border-[#ECE3FA]
            "
        >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

                {/* Left */}

                <div>

                    <h1 className="text-5xl font-serif font-bold text-[#4C3D63]">
                        🏰 {club.name}
                    </h1>

                    <p className="mt-4 text-lg text-[#6B5A7A] max-w-3xl leading-relaxed">
                        {club.description}
                    </p>

                    <div className="flex flex-wrap gap-8 mt-8">

                        <div className="flex items-center gap-2 text-[#6B5A7A]">
                            <Users size={20} />
                            <span>{club.memberCount} Members</span>
                        </div>

                        <div className="flex items-center gap-2 text-[#6B5A7A]">
                            <Crown size={20} />
                            <span>{club.owner.username}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[#6B5A7A]">
                            <Calendar size={20} />
                            <span>
                                Created{" "}
                                {new Date(club.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-col gap-4">

                    <button
                        className="
                            px-8
                            py-4
                            rounded-2xl
                            bg-[#B08DFF]
                            text-white
                            font-semibold
                            hover:scale-105
                            transition
                        "
                    >
                        Leave Club
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ClubHero;