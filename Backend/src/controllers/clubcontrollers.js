const { createClub, getAllClubs, getMyClubs, joinClub, leaveClub, getClubDetails, deleteClub } = require("../services/clubservices");

const { uploadImage } = require("../services/cloudinaryservice");

const createClubController = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const {
            name,
            description,
            isPrivate,
            googleBookId,
            bookTitle,
            bookAuthors,
            bookThumbnail,
        } = req.body;

        // Validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required",
            });
        }


        let coverImage = null;
        if (req.file) {
            const result = await uploadImage(req.file.buffer, "club_covers");
            coverImage = result.secure_url;
        }

        const club = await createClub({
            name,
            description,
            coverImage,
            ownerId,
            isPrivate,
            googleBookId,
            bookTitle,
            bookAuthors: bookAuthors ? JSON.parse(bookAuthors) : [], // Convert stringified array back to array
            bookThumbnail,
        });

        return res.status(201).json({
            success: true,
            message: "Club created successfully",
            club,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllClubsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const clubs = await getAllClubs(userId);
        return res.status(200).json({
            success: true,
            clubs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getMyClubsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const clubs = await getMyClubs(userId);
        return res.status(200).json({
            success: true,
            clubs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const joinClubController = async (req, res) => {
    try {

        const userId = req.user.id;
        const { clubId } = req.params;
        await joinClub({ userId, clubId });
        res.status(200).json({
            success: true,
            message: "Successfully joined the club",
        });

    } catch (error) {
        if (error.message === "Club not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

const leaveClubController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { clubId } = req.params;
        await leaveClub({ userId, clubId });
        return res.status(200).json({
            success: true,
            message: "Successfully left the club",
        });
    } catch (error) {
        if (error.message === "Club not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (
            error.message === "You are not a member of this club" ||
            error.message.includes("Club owner cannot leave the club")
        ) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getClubDetailsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { clubId } = req.params;
        const clubDetails = await getClubDetails({ clubId, userId });
        return res.status(200).json({
            success: true,
            clubDetails,
        });
    } catch (error) {
        if (error.message === "Club not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const deleteClubController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { clubId } = req.params;
        await deleteClub({ clubId, userId });
        return res.status(200).json({
            success: true,
            message: "Club deleted successfully",
        });
    } catch (error) {
        if (error.message === "Club not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Only the club owner can delete the club") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    createClubController,
    getAllClubsController,
    getMyClubsController,
    joinClubController,
    leaveClubController,
    getClubDetailsController,
    deleteClubController,
};