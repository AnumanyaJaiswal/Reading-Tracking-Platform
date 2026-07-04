import React from 'react'
import { useEffect, useState } from "react";
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


      <div className="min-h-screen bg-[#FCFAFF] flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-72">

          <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-10">

            {loading ? (
              <div className="text-center py-20 text-[#6B5A7A]">
                Loading...
              </div>
            ) : (
              <>
                <div className="mb-12">

                  <h1 className="text-5xl font-serif font-bold text-[#4C3D63]">
                    ✨ Community Feed
                  </h1>

                  <p className="mt-3 text-lg text-[#8A7B9E]">
                    Discover what fellow readers are loving.
                  </p>

                </div>

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