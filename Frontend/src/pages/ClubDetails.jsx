import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ClubHero from "../Components/Clubs/ClubHero";
import ClubReadingProgress from "../Components/Clubs/ClubReadingProgress";
// import DiscussionComposer from "../../Components/DiscussionComposer";
// import DiscussionCard from "../../Components/DiscussionCard";
// import MembersPreview from "../../Components/MembersPreview";

import { getClubDetails } from '../services/clubs'

function ClubDetails() {

    const { clubId } = useParams();

    const [club, setClub] = useState(null);

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const data = await getClubDetails(clubId);
                setClub(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClub();
    }, [clubId]);

    if (!club) {
        return (
            <div className="text-center py-20 text-[#6B5A7A]">
                Loading club...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-10">

            <ClubHero club={club} />
            
            <ClubReadingProgress
                currentBook={club.currentBook}
                readingProgress={club.readingProgress}
            />

            {/* <div className="mt-12">
                <DiscussionComposer />
            </div>

            <div className="mt-8 space-y-6">
                <DiscussionCard />
                <DiscussionCard />
            </div>

            <div className="mt-12">
                <MembersPreview />
            </div> */}

        </div>
    );
}

export default ClubDetails;