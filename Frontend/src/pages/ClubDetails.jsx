import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Lock } from "lucide-react";
import Loader from "../Components/Loader";
import ClubHero from "../Components/Clubs/ClubHero";
import ClubReadingProgress from "../Components/Clubs/ClubReadingProgress";
import ClubDiscussionRoom from "../Components/Clubs/ClubDiscussionRoom";
import MembersPreview from "../Components/Clubs/MembersPreview";
import { getClubDetails, joinClub, leaveClub, getDiscussions, createDiscussion } from '../services/clubs'
import { useAuth } from '../Context/AuthContext'

import socket from "../socket";

// Ornamental divider used between sections — a small serif kicker
// flanked by fading gradient lines and a pair of sparkles.
function SectionDivider({ label }) {
    return (
        <div className="flex items-center gap-4 my-10 sm:my-14">
            <span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #DCCEFF 50%, transparent)" }}
            />
            <div className="flex items-center gap-2.5 text-[#8B7BB5] shrink-0">
                <Sparkles size={13} strokeWidth={2} />
                <span className="text-xs sm:text-sm font-serif italic tracking-[0.2em] uppercase">
                    {label}
                </span>
                <Sparkles size={13} strokeWidth={2} />
            </div>
            <span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #DCCEFF 50%, transparent)" }}
            />
        </div>
    );
}

// Slow-drifting decorative orbs, fixed to the viewport so the whole
// page feels alive without ever competing with the content.
function AmbientBackdrop() {
    return (
        <>
            <motion.div
                className="pointer-events-none fixed -top-10 -right-32 w-120 h-120 rounded-full blur-3xl -z-10"
                style={{ background: "radial-gradient(circle, #C9B6E4 0%, transparent 70%)" }}
                animate={{ y: [0, 24, 0], x: [0, -16, 0], opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="pointer-events-none fixed bottom-0 -left-32 w-120 h-120 rounded-full blur-3xl -z-10"
                style={{ background: "radial-gradient(circle, #F6B6D1 0%, transparent 70%)" }}
                animate={{ y: [0, -20, 0], x: [0, 16, 0], opacity: [0.2, 0.32, 0.2] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
                className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-104
                 h-104
                 rounded-full blur-3xl -z-10"
                style={{ background: "radial-gradient(circle, #F5D9A6 0%, transparent 72%)" }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.2, 0.12] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </>
    );
}

function ClubDetails() {

    const { clubId } = useParams();
    const { user } = useAuth();
    const [club, setClub] = useState(null);
    const [discussions, setDiscussions] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const data = await getClubDetails(clubId);
                console.log(data)
                setClub(data);
                const discussionData = await getDiscussions(clubId);
                setDiscussions(discussionData)

            } catch (error) {
                console.error(error);
            }
        };

        fetchClub();
    }, [clubId]);

    useEffect(() => {
        socket.connect();
        socket.emit("joinClub", clubId);

        const handleNewDiscussion = (discussion) => {

            setDiscussions(prev => [
                ...prev,
                discussion
            ]);

        };

        const handleSocketError = (error) => {

            console.error(
                "Socket Error:",
                error
            );
        };


        socket.on(
            "newDiscussion",
            handleNewDiscussion
        );


        socket.on(
            "discussionError",
            handleSocketError
        );
        

        return () => {
            socket.off(
                "newDiscussion",
                handleNewDiscussion
            );

            socket.off(
                "discussionError",
                handleSocketError
            );

            socket.disconnect();
        }
    }, [clubId])


    if (!club) {
        return (
            <Loader />
        );
    }

    //On joining
    const handleJoin = async () => {
        try {
            await joinClub(club.id);
            setClub(prev => ({
                ...prev,
                joined: true,
                memberCount: prev.memberCount + 1
            }))
        } catch (error) {
            console.log(error.message)
        }
    }

    //On leaving
    const handleLeave = async () => {
        try {
            await leaveClub(club.id);
            setClub(prev => ({
                ...prev,
                joined: false,
                memberCount: prev.memberCount - 1
            }))
            navigate(-1)

        } catch (error) {

        }
    }

    const handlePostDiscussion = async (message) => {
        socket.emit("sendDiscussion",
            {
                clubId,
                message
            }
        )
    }

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

            <AmbientBackdrop />

            <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => navigate(-1)}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.97 }}
                className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    mb-6
                    px-4
                    py-2
                    rounded-full
                    border
                    border-white/60
                    backdrop-blur-xl
                    text-sm
                    font-medium
                    text-[#6B5A7A]
                    shadow-sm
                    hover:text-[#4C3D63]
                    transition-colors
                    cursor-pointer
                "
                style={{ background: "rgba(255,255,255,0.5)" }}
            >
                <ArrowLeft size={15} />
                Back to Clubs
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
            >
                <ClubHero
                    club={club}
                    onJoin={handleJoin}
                    onLeave={handleLeave}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            >
                <SectionDivider label="Now Reading" />
                <ClubReadingProgress
                    currentBook={club.currentBook}
                    readingProgress={club.readingProgress}
                />
            </motion.div>

            {/* Guarded with `user &&` — on a hard refresh, AuthContext can
                still be resolving the logged-in user for a brief moment.
                Without this guard, `user.id` below would throw on a null
                user and blank out the whole page. */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            >
                <SectionDivider label="The Circle Speaks" />

                <AnimatePresence mode="wait">
                    {club.joined && user ? (
                        <motion.div
                            key="discussion-room"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <ClubDiscussionRoom
                                discussions={discussions}
                                onPost={handlePostDiscussion}
                                currentUserId={user.id}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="discussion-locked"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative flex flex-col items-center justify-center text-center gap-4 py-16 px-6 rounded-3xl border border-white/60 backdrop-blur-xl shadow-sm overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.5)" }}
                        >
                            <div
                                className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl"
                                style={{ background: "radial-gradient(circle, #C9B6E4 0%, transparent 70%)" }}
                            />
                            <div
                                className="flex items-center justify-center w-12 h-12 rounded-full mb-1"
                                style={{ background: "linear-gradient(135deg, #C9B6E4, #8B7BB5)" }}
                            >
                                <Lock size={18} className="text-white" strokeWidth={2} />
                            </div>
                            <h3 className="font-serif italic text-lg sm:text-xl text-[#2D2438]">
                                The Circle is Members-Only
                            </h3>
                            <p className="text-sm text-[#6B5A7A] max-w-sm">
                                Join the club to read discussions and share your thoughts with fellow readers.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleJoin}
                                className="mt-2 px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-sm"
                                style={{ background: "linear-gradient(135deg, #8B7BB5, #C9B6E4)" }}
                            >
                                Join the Club
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            >
                <SectionDivider label="The Fellowship" />
                <MembersPreview
                    members={club.members}
                    totalMembers={club.memberCount}
                    clubId={clubId}
                />
            </motion.div>

        </div>
    );
}

export default ClubDetails;