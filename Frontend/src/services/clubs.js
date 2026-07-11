import { api } from "./api";

// Get all public clubs
export const getAllClubs = async () => {
    const data = await api("/clubs");
    return data.clubs;
};

// Get clubs joined by current user
export const getMyClubs = async () => {
    const data = await api("/clubs/my-clubs");
    return data.clubs;
};

// Get a single club
export const getClubDetails = async (clubId) => {
    const data = await api(`/clubs/${clubId}`);
    return data.clubDetails;
};

// Create club
export const createClub = async (clubData) => {
    const data = await api("/clubs", {
        method: "POST",
        body: clubData,
    });

    return data.club;
};

// Join club
export const joinClub = async (clubId) => {
    return await api(`/clubs/${clubId}/join`, {
        method: "POST",
    });
};

// Leave club
export const leaveClub = async (clubId) => {
    return await api(`/clubs/${clubId}/leave`, {
        method: "DELETE",
    });
};

// Delete club
export const deleteClub = async (clubId) => {
    return await api(`/clubs/${clubId}`, {
        method: "DELETE",
    });
};

export const createDiscussion = async(clubId, message)=>{
    const data = await api(`/clubs/${clubId}/discussions`, {
        method: "POST",
        body: JSON.stringify({message})
    })
    return data.discussion;
}

export const getDiscussions = async(clubId)=>{
    const data = await api(`/clubs/${clubId}/discussions`);
    return data.discussions;
}