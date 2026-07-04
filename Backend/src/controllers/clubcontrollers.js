const { createClub } = require("../services/clubservices");

const createClubController = async (req, res) => {
    try {
        console.log(req.user);
        const ownerId = req.user.id;

        const {
            name,
            description,
            coverImage,
            isPrivate,
        } = req.body;

        // Validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required",
            });
        }

        const club = await createClub({
            name,
            description,
            coverImage,
            ownerId,
            isPrivate,
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

module.exports = {
    createClubController,
};