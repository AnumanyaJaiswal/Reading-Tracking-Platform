import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import ClubHeader from "../Components/Clubs/ClubHeader";
import ClubCard from "../Components/Clubs/ClubCard";

import { getAllClubs } from "../services/clubs";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

function Clubs_Public() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const data = await getAllClubs();
        setClubs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  return (
    <div>
      <div className="flex">
        <Sidebar />

        <main className="ml-72 w-full min-h-screen bg-[#FFF9F6] px-12 py-12">
          <ClubHeader clubCount={clubs.length} />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-3xl animate-pulse"
                  style={{ background: "rgba(201,182,228,0.15)" }}
                />
              ))}
            </div>
          ) : clubs.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-24">
              <div
                className="w-16 h-16 rounded-full mb-5 opacity-70"
                style={{ background: "radial-gradient(circle, #D9C6F0 0%, transparent 70%)" }}
              />
              <h3 className="font-serif italic text-2xl text-[#2D2438] mb-2">
                No circles yet
              </h3>
              <p className="text-sm text-[#8B7BB5] max-w-sm">
                Be the first to start a reading circle and invite others to join you.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {clubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </motion.div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Clubs_Public;  