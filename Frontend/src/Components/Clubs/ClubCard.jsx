import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Fallback aura per club, derived from name, used only when there's no coverImage
const AURAS = [
  ["#EAD9FF", "#C9B6E4"],
  ["#F3E4C8", "#E0C08F"],
  ["#F0D9E0", "#D9A9BB"],
  ["#D9E4F0", "#A9C0D9"],
  ["#E0D9F0", "#B6A0D6"],
];

function auraFor(name = "") {
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AURAS[hash % AURAS.length];
}

function ClubCard({ club, onJoin }) {
  const navigate = useNavigate();
  const [auraStart, auraEnd] = auraFor(club?.name);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl overflow-hidden border border-white/60 backdrop-blur-xl shadow-sm hover:shadow-xl transition-shadow duration-300"
      style={{ background: "rgba(255,255,255,0.45)" }}
    >
      {/* cover banner — falls back to a soft aura if no coverImage */}
      <div
        className="relative h-28 sm:h-32 w-full overflow-hidden"
        style={
          club?.coverImage
            ? undefined
            : { background: `linear-gradient(135deg, ${auraStart} 0%, ${auraEnd} 100%)` }
        }
      >
        {club?.coverImage ? (
          <img
            src={club.coverImage}
            alt={club.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div
              className="absolute -bottom-8 -right-6 w-24 h-24 rounded-full blur-2xl opacity-60"
              style={{ background: auraEnd }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif italic text-4xl text-white/80">
                {club?.name?.[0]?.toUpperCase() ?? "?"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* body */}
      <div className="px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6">
        <h3 className="font-serif italic text-lg sm:text-xl text-[#2D2438] leading-snug">
          {club?.name ?? "Untitled Circle"}
        </h3>

        <p className="text-sm text-[#6B5F7A] mt-2 line-clamp-2 min-h-10">
          {club?.description ?? "No description yet — the founders are still writing it."}
        </p>

        <div className="flex items-center gap-2 mt-3 text-xs text-[#8B7BB5]">
          <span className="truncate">By {club?.owner?.username ?? "unknown"}</span>
          <span className="w-1 h-1 rounded-full bg-[#C9B6E4] shrink-0" />
          <span className="shrink-0">
            {club?.memberCount ?? 0} {club?.memberCount === 1 ? "member" : "members"}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(`/clubs/${club.id}`)}
            className="text-xs font-medium px-4 py-2 rounded-full text-white shadow-md cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${auraEnd}, #6B5F9A)` }}
          >
            Enter Circle →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ClubCard;