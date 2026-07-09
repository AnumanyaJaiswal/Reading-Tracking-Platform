import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import ClubHero from "../Components/Clubs/ClubHero";
import ClubReadingProgress from "../Components/Clubs/ClubReadingProgress";
import DiscussionComposer from "../Components/Clubs/DiscussionComposer";
import DiscussionCard from "../Components/Clubs/DiscussionCard";
// import MembersPreview from "../../Components/MembersPreview";

import { getClubDetails, joinClub, leaveClub, getDiscussions, createDiscussion } from '../services/clubs'

function ClubDetails() {

    const { clubId } = useParams();

    const [club, setClub] = useState(null);
    const [discussions, setDiscussions] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const data = await getClubDetails(clubId);
                setClub(data);
                const discussionData = await getDiscussions(clubId);
                setDiscussions(discussionData)

            } catch (error) {
                console.error(error);
            }
        };

        fetchClub();
    }, [clubId]);

    if (!club) {
        return (
            <div className="text-center py-20 text-[#6B5A7A]">
                <Loader />
            </div>
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
        const discussion = await createDiscussion(clubId, message);
        setDiscussions((prev) => [
            discussion,
            ...prev
        ])
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-10">

            <ClubHero
                club={club}
                onJoin={handleJoin}
                onLeave={handleLeave}
            />

            <ClubReadingProgress
                currentBook={club.currentBook}
                readingProgress={club.readingProgress}
            />

            <div className="mt-12">
                <DiscussionComposer onPost={handlePostDiscussion} />
            </div>

            <div className="mt-8 space-y-6">
                {discussions.map((discussion) => (

                    <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                    />

                ))}
            </div>

            {/* <div className="mt-12">
                <MembersPreview />
            </div> */}

        </div>
    );
}

export default ClubDetails;