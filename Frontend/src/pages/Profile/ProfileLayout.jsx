import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../../Components/Sidebar";
import ProfileTab from "../../Components/Profile/ProfileTab";
import Footer from "../../Components/Footer";
import { useAuth } from "../../Context/AuthContext";

function ProfileLayout() {
  const { user } = useAuth();
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <div>
      <div className="min-h-screen bg-[#FFF9F6] flex flex-col ml-0 md:ml-72">
        <div className="flex flex-1">
            <Sidebar />

          <main className="flex-1 p-4 sm:p-6 md:p-12 max-w-5xl mx-auto w-full pt-20 md:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="
                relative
                rounded-2xl sm:rounded-3xl
                p-5 sm:p-8 md:p-10
                mb-6 sm:mb-8
                bg-white/60
                backdrop-blur-xl
                border border-white/60
                shadow-[0_8px_40px_rgba(176,141,255,0.15)]
              "
            >
              <div className="flex flex-col items-center text-center">
                {/* Avatar with gradient ring */}
                <div
                  className="
                    w-24 h-24
                    sm:w-28 sm:h-28
                    md:w-32 md:h-32
                    rounded-full
                    p-0.75
                    shadow-[0_0_45px_rgba(176,141,255,0.4)]
                  "
                  style={{
                    background:
                      "linear-gradient(135deg, #B08DFF 0%, #E9C7FF 50%, #FFD9C7 100%)",
                  }}
                >
                  <div
                    className="
                      w-full h-full
                      rounded-full
                      flex items-center justify-center
                      bg-white/90
                      backdrop-blur-sm
                    "
                  >
                    <span className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#4C3D63]">
                      {initial}
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-[#4C3D63] mt-4 sm:mt-6 tracking-tight">
                  {user.username}
                </h1>

                <p className="text-[#8C7AA8] mt-2 text-xs sm:text-sm tracking-wide uppercase">
                  Reader &middot; Storykeeper
                </p>

                {/* Tabs */}
                <div
                  className="
                    flex flex-wrap
                    justify-center
                    gap-1
                    p-1.5
                    mt-6 sm:mt-8
                    rounded-full
                    bg-[#F4EDFF]/80
                    backdrop-blur-sm
                    border border-[#E9DBFF]
                    shadow-inner
                    max-w-full
                  "
                >
                  <ProfileTab to="/profile/stats" label="Stats" />
                  <ProfileTab to="/profile/lists" label="Lists" />
                  <ProfileTab to="/profile/reviews" label="Reviews" />
                  <ProfileTab to="/profile/clubs" label="Clubs" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileLayout;