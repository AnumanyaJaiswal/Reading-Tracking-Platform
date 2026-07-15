import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Sidebar from "../../Components/Sidebar";
import Footer from "../../Components/Footer";
import { useAuth } from "../../Context/AuthContext";

const TABS = [
  { to: "/profile/stats", label: "Stats" },
  { to: "/profile/lists", label: "Lists" },
  { to: "/profile/reviews", label: "Reviews" },
  { to: "/profile/clubs", label: "Clubs" },
];

function ProfileLayout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const initial = user.username.charAt(0).toUpperCase();
  const [scrolled, setScrolled] = useState(false);

  const tabsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 220);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkTabsOverflow = () => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollTabs = (direction) => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "right" ? 120 : -120, behavior: "smooth" });
  };

  useEffect(() => {
    checkTabsOverflow();
    window.addEventListener("resize", checkTabsOverflow);

    // One-time "swipe me" nudge so a new user notices Clubs exists
    const el = tabsRef.current;
    let nudgeTimer;
    if (el) {
      nudgeTimer = setTimeout(() => {
        if (el.scrollWidth > el.clientWidth) {
          el.scrollTo({ left: 36, behavior: "smooth" });
          setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 500);
        }
      }, 600);
    }
    return () => {
      window.removeEventListener("resize", checkTabsOverflow);
      clearTimeout(nudgeTimer);
    };
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-[#FFF9F6] flex flex-col ml-0 md:ml-72 relative overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="hidden sm:block absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, #B08DFF 0%, transparent 70%)" }}
        />
        <div
          className="hidden sm:block absolute top-40 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #FFD9C7 0%, transparent 70%)" }}
        />

        {/* Condensed sticky header — mobile only */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                md:hidden fixed top-0 left-0 right-0 z-30
                flex items-center gap-3
                px-4 py-3
                bg-[#FFF9F6]/85 backdrop-blur-xl
                border-b border-[#E9DBFF]
              "
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #B08DFF 0%, #E9C7FF 50%, #FFD9C7 100%)" }}
              >
                <span className="w-6.5 h-6.5 rounded-full bg-white/90 flex items-center justify-center text-xs font-serif font-bold text-[#4C3D63]">
                  {initial}
                </span>
              </div>
              <span className="font-serif text-lg text-[#4C3D63] truncate">{user.username}</span>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-[#C9A36B] font-medium">
                {TABS.find((t) => pathname.startsWith(t.to))?.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 px-3 py-4 sm:p-6 md:p-12 max-w-5xl mx-auto w-full pt-18 sm:pt-20 md:pt-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="
                relative rounded-2xl sm:rounded-3xl
                p-5 sm:p-8 md:p-10 mb-5 sm:mb-8
                bg-white/60 backdrop-blur-xl
                border border-white/60
                shadow-[0_8px_40px_rgba(176,141,255,0.15)]
              "
            >
              <div className="flex flex-col items-center text-center">
                {/* Seal / illuminated initial */}
                <div
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-0.75 shadow-[0_0_35px_rgba(176,141,255,0.4)] sm:shadow-[0_0_45px_rgba(176,141,255,0.4)]"
                  style={{ background: "linear-gradient(135deg, #B08DFF 0%, #E9C7FF 50%, #FFD9C7 100%)" }}
                >
                  <div className="relative w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-1.5 rounded-full"
                      style={{ border: "1px solid rgba(140,122,168,0.35)" }}
                    />
                    <span className="text-3xl sm:text-5xl md:text-6xl font-serif italic font-bold text-[#4C3D63]">
                      {initial}
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif text-[#4C3D63] mt-3 sm:mt-6 tracking-tight wrap-break-words max-w-full px-2">
                  {user.username}
                </h1>

                <p className="text-[#8C7AA8] mt-1.5 sm:mt-2 text-[10px] sm:text-sm tracking-[0.2em] uppercase">
                  Reader &middot; Storykeeper
                </p>

                {/* Ornamental divider */}
                <div className="flex items-center gap-3 w-full max-w-55 mt-4 sm:mt-6">
                  <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #E9DBFF)" }} />
                  <span className="w-1.5 h-1.5 rotate-45" style={{ background: "#C9A36B" }} />
                  <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #E9DBFF)" }} />
                </div>

                {/* Tabs — left-aligned on mobile so Clubs visibly peeks, with clickable scroll arrows */}
                <div className="relative w-full mt-5 sm:mt-7">
                  <div
                    ref={tabsRef}
                    onScroll={checkTabsOverflow}
                    className="overflow-x-auto no-scrollbar"
                    style={{
                      maskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
                      WebkitMaskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
                    }}
                  >
                    <div className="flex justify-start sm:justify-center gap-1 w-max sm:mx-auto px-5 sm:px-0">
                      {TABS.map((tab) => {
                        const active = pathname.startsWith(tab.to);
                        return (
                          <NavLink
                            key={tab.to}
                            to={tab.to}
                            className="relative px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition-colors"
                            style={{ color: active ? "#4C3D63" : "#8C7AA8" }}
                          >
                            {tab.label}
                            {active && (
                              <motion.div
                                layoutId="tab-ribbon"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                className="absolute left-3 right-3 -bottom-0.5 h-0.75 rounded-full"
                                style={{ background: "linear-gradient(to right, #C9A36B, #E9C7A0)" }}
                              />
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scroll arrows — real buttons now, only shown when there's actually more to see */}
                  <AnimatePresence>
                    {canScrollRight && (
                      <motion.button
                        key="right-chevron"
                        type="button"
                        onClick={() => scrollTabs("right")}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full active:scale-90 transition-transform"
                        style={{ background: "rgba(255,249,246,0.9)" }}
                        aria-label="Scroll tabs right"
                      >
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                          className="flex"
                        >
                          <ChevronRight size={16} strokeWidth={2.5} color="#C9A36B" />
                        </motion.span>
                      </motion.button>
                    )}
                    {canScrollLeft && (
                      <motion.button
                        key="left-chevron"
                        type="button"
                        onClick={() => scrollTabs("left")}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full active:scale-90 transition-transform"
                        style={{ background: "rgba(255,249,246,0.9)" }}
                        aria-label="Scroll tabs left"
                      >
                        <motion.span
                          animate={{ x: [0, -3, 0] }}
                          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                          className="flex"
                        >
                          <ChevronLeft size={16} strokeWidth={2.5} color="#C9A36B" />
                        </motion.span>
                      </motion.button>
                    )}
                  </AnimatePresence>
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