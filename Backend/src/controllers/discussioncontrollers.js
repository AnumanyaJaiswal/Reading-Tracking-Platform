const {
    createDiscussion,
    getDiscussions
} = require('../services/discussionService')

const createDiscussionController = async (req, res) => {
    try {
        const clubId = req.params.clubId;
        const userId = req.user.id;
        const { message } = req.body;

        const discussion = await createDiscussion({ clubId, userId, message });

        return res.status(201).json({
            success: true,
            discussion,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

const getDiscussionsController = async (req, res) => {
    try {

        const { clubId } = req.params;

        const discussions = await getDiscussions(clubId);

        return res.status(200).json({
            success: true,
            discussions,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createDiscussionController,
    getDiscussionsController
}