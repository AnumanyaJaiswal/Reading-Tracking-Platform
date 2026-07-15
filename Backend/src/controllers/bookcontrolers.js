const { searchBooks , getBookById } = require('../services/googleBooksServices')

const SearchBookController = async(req, res) =>{
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            })
        }
        // get all books by its name...every part
        const books = await searchBooks(q);

        return res.status(200).json({
            success: true,
            books,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const GetBookController = async(req, res) =>{
    try {
        const id = req.params.id;

        // get a particular book by its id
        const book = await getBookById(id);
        return res.status(200).json({
            success: true,
            book,
        })

    } catch (error) {
        if (error.response?.status === 404) {
        throw new Error("Book not found");
    }
        throw error;
        
    }

}

module.exports = {
    SearchBookController,
    GetBookController
}