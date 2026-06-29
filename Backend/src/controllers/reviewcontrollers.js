const { addReview, getMyReviews, getAllReviews } = require('../services/reviewservice')

const addReviewContoller = async(req, res) =>{
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { rating, review } = req.body;

        const updateBook = await addReview({
            id,
            userId,
            rating,
            review
        })

        return res.status(200).json({
            success: true,
            message: "Review added Successfully",
            book: updateBook
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getMyReviewsController = async(req, res)=>{
    try {

        const userId = req.user.id;
        const reviews = await getMyReviews(userId);

        return res.status(200).json({
            success: true,
            reviews,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getAllReviewsController = async(req, res)=>{
    try {
        
        const reviews = await getAllReviews();

        return res.status(200).json({
            success: true,
            reviews,
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addReviewContoller,
    getMyReviewsController,
    getAllReviewsController
}