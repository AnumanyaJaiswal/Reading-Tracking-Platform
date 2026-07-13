import React from 'react'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import ReviewFeed from "../Components/Reviews/ReviewFeed";
import { getAllReviews } from "../services/review";

function ReviewSkeletonCard() {
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 mb-5 sm:mb-6 animate-pulse"
      style={{
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(201,182,228,0.2)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full shrink-0"
          style={{ background: "rgba(201,182,228,0.25)" }}
        />
        <div className="flex-1 space-y-2">
          <div
            className="h-3 w-24 rounded-full"
            style={{ background: "rgba(201,182,228,0.25)" }}
          />
          <div
            className="h-2.5 w-16 rounded-full"
            style={{ background: "rgba(201,182,228,0.15)" }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div
          className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl shrink-0"
          style={{ background: "rgba(246,182,209,0.2)" }}
        />
        <div className="flex-1 space-y-2.5 py-1">
          <div
            className="h-3 w-3/4 rounded-full"
            style={{ background: "rgba(201,182,228,0.2)" }}
          />
          <div
            className="h-2.5 w-full rounded-full"
            style={{ background: "rgba(201,182,228,0.15)" }}
          />
          <div
            className="h-2.5 w-5/6 rounded-full"
            style={{ background: "rgba(201,182,228,0.15)" }}
          />
          <div
            className="h-2.5 w-2/3 rounded-full"
            style={{ background: "rgba(201,182,228,0.15)" }}
          />
        </div>
      </div>
    </div>
  );
}

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
          className="absolute -top-32 -right-32 w-md h-112 rounded-full pointer-events-none"
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

        {/* Floating sparkles — desktop only, decorative and positioned with fixed left offset that doesn't translate to mobile */}
        <motion.div
          className="hidden md:block absolute top-20 right-1/3 pointer-events-none"
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={18} style={{ color: "#C9B6E4" }} />
        </motion.div>
        <motion.div
          className="hidden md:block absolute top-64 left-112 pointer-events-none"
          animate={{ y: [0, -8, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Sparkles size={12} style={{ color: "#F6B6D1" }} />
        </motion.div>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-0 md:ml-72 relative z-10">

          <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 pt-20 sm:px-6 sm:py-10 md:px-8 md:py-14 md:pt-14">

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12 relative"
            >

              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles size={22} className="sm:hidden" style={{ color: "#F6B6D1" }} strokeWidth={1.75} />
                  <Sparkles size={26} className="hidden sm:block" style={{ color: "#F6B6D1" }} strokeWidth={1.75} />
                </motion.div>

                <h1
                  className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-semibold"
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

              <p className="mt-2 ml-7 sm:ml-9 text-sm sm:text-base italic" style={{ color: "#8B7BB5" }}>
                Discover what fellow readers are loving.
              </p>

            </motion.div>

            {loading ? (
              <div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <ReviewSkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <ReviewFeed reviews={reviews} />
            )}

          </main>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;