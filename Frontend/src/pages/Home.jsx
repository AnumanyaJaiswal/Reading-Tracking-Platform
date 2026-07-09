import React from 'react'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import ReviewFeed from "../Components/ReviewFeed";
import { getAllReviews } from "../services/review";

function Home() {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchReviews = async () => {

      try {

        const data = await getAllReviews();
        setReviews(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchReviews();

  }, []);

  return (
    <div>

      <div
        className="min-h-screen flex relative overflow-hidden"
        style={{ backgroundColor: "#FFF9F6" }}
      >

        {/* Decorative gradient orbs */}
        <div
          className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,182,228,0.4) 0%, rgba(201,182,228,0) 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -left-40 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(246,182,209,0.3) 0%, rgba(246,182,209,0) 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,182,228,0.25) 0%, rgba(201,182,228,0) 70%)",
          }}
        />

        {/* Floating sparkles */}
        <motion.div
          className="absolute top-20 right-1/3 pointer-events-none"
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={18} style={{ color: "#C9B6E4" }} />
        </motion.div>
        <motion.div
          className="absolute top-64 left-[28rem] pointer-events-none"
          animate={{ y: [0, -8, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Sparkles size={12} style={{ color: "#F6B6D1" }} />
        </motion.div>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-72 relative z-10">

          <main className="flex-1 max-w-3xl mx-auto w-full px-8 py-14">

            {loading ? (
              <div className="text-center py-24" style={{ color: "#8B7BB5" }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="w-9 h-9 mx-auto mb-4 relative"
                >
                  <Sparkles size={36} style={{ color: "#C9B6E4" }} strokeWidth={1.5} />
                </motion.div>
                Gathering stories from the shelves...
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12 relative"
                >

                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 15, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles size={26} style={{ color: "#F6B6D1" }} strokeWidth={1.75} />
                    </motion.div>

                    <h1
                      className="text-4xl font-serif italic font-semibold"
                      style={{
                        background: "linear-gradient(120deg, #2D2438 0%, #8B7BB5 60%, #C9B6E4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Community Feed
                    </h1>
                  </div>

                  <p className="mt-2 ml-9 text-base italic" style={{ color: "#8B7BB5" }}>
                    Discover what fellow readers are loving.
                  </p>

                </motion.div>

                <ReviewFeed reviews={reviews} />
              </>
            )}

          </main>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;