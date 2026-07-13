import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

function ClubHeader({ clubCount = 0 }) {
  const navigate = useNavigate();
  return (
    <div className="relative mb-8 sm:mb-12 overflow-hidden">
      {/* decorative blurred orbs, consistent with rest of app */}
      <div
        className="absolute -top-16 -left-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9C6F0 0%, transparent 70%)" }}
      />
      <div
        className="absolute -top-10 right-10 w-28 h-28 sm:w-40 sm:h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #E8D5A8 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p className="tracking-[0.3em] text-xs uppercase text-[#8B7BB5] font-medium mb-2">
            Gather · Read · Discuss
          </p>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={24} className="sm:hidden" style={{ color: "#F6B6D1" }} strokeWidth={1.75} />
              <Sparkles size={30} className="hidden sm:block" style={{ color: "#F6B6D1" }} strokeWidth={1.75} />
            </motion.div>

            <h1
              className="font-serif italic font-semibold text-3xl sm:text-4xl md:text-5xl"
              style={{
                background: "linear-gradient(120deg, #2D2438 0%, #8B7BB5 60%, #C9B6E4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Reading Circles
            </h1>
          </div>

          <p className="text-[#6B5F7A] mt-3 max-w-md text-sm leading-relaxed">
            Small circles of readers moving through the same stories, at the same time.
            Find one that matches your rhythm, or start your own.
          </p>
        </div>

        <div className="flex items-center gap-4 justify-between sm:justify-start">
          <div className="text-right hidden sm:block">
            <p className="text-2xl font-serif text-[#2D2438]">{clubCount}</p>
            <p className="text-xs text-[#8B7BB5] uppercase tracking-wide">
              {clubCount === 1 ? "Circle open" : "Circles open"}
            </p>
          </div>

          <button
            onClick={() => navigate("/clubs/new")}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-white shadow-lg shadow-[#B8A6D9]/30 hover:shadow-[#B8A6D9]/50 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #B8A6D9 0%, #8B7BB5 100%)",
            }}
          >
            + New Circle
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="h-px w-full mt-6 sm:mt-8 origin-left"
        style={{ background: "linear-gradient(90deg, #C9B6E4 0%, transparent 100%)" }}
      />
    </div>
  );
}

export default ClubHeader;