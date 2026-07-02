const { addToList, getUserLists, updateListStatus, deleteBook } = require('../services/listservices')

const addToListController = async (req, res) => {

    try {

        // taking all information from frontend
        const userId = req.user.id;
        const {
            googleBookId,
            title,
            authors,
            thumbnail,
            pageCount,
            categories,
            status,
        } = req.body;


        // Checking if status are only these three
        const allowedStatus = [
            "WANT_TO_READ",
            "CURRENTLY_READING",
            "FINISHED"
        ]

        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid reading status")
        }

        //Creating a new book in database using the addToList service
        const book = await addToList({
            userId,
            googleBookId,
            title,
            authors,
            thumbnail,
            pageCount,
            categories,
            status,
        })
        return res.status(200).json({
            success: true,
            message: "Book Added Successfully",
            book
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const getUserListsController = async (req, res) => {
    try {
        const userId = req.user.id;

        const lists = await getUserLists(userId)

        return res.status(200).json({
            success: true,
            lists,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateStatusListController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { status } = req.body

        const book = await updateListStatus({
            id,
            userId,
            status
        })

        return res.status(200).json({
            success: true,
            message: "Reading status updated successfully",
            book,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteBookController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const book = await deleteBook(id, userId);

        return res.status(200).json({
            success: true,
            message: "Book Deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = {
    addToListController,
    getUserListsController,
    updateStatusListController,
    deleteBookController
}