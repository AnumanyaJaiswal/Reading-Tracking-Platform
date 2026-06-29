const axios = require("axios");

const searchBooks = async (query) => {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/books/v1/volumes",
            {
                params: {
                    q: query,
                    maxResults: 20,
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                },
            }
        );

        const books = response.data.items || [];

        return books.map((book) => ({
            id: book.id,
            title: book.volumeInfo.title || "Unknown Title",
            subtitle: book.volumeInfo.subtitle || "",
            authors: book.volumeInfo.authors || [],
            description: book.volumeInfo.description || "",
            publisher: book.volumeInfo.publisher || "",
            publishedDate: book.volumeInfo.publishedDate || "",
            pageCount: book.volumeInfo.pageCount || 0,
            categories: book.volumeInfo.categories || [],
            averageRating: book.volumeInfo.averageRating || 0,
            ratingsCount: book.volumeInfo.ratingsCount || 0,
            language: book.volumeInfo.language || "",
            thumbnail:
                book.volumeInfo.imageLinks?.thumbnail || null,
            previewLink: book.volumeInfo.previewLink || "",
            infoLink: book.volumeInfo.infoLink || "",
        }));

    } catch (error) {
        console.error(error.response?.data);
        console.error(error.message);

        throw error;
    }
};

const getBookById = async(id)=>{
    try {
        
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`,{
            params:{
                key: process.env.GOOGLE_BOOKS_API_KEY,
            }
        });

        const book = response.data;

        return {
            id: book.id,
            title: book.volumeInfo.title || "Unknown Title",
            subtitle: book.volumeInfo.subtitle || "",
            authors: book.volumeInfo.authors || [],
            description: book.volumeInfo.description || "",
            publisher: book.volumeInfo.publisher || "",
            publishedDate: book.volumeInfo.publishedDate || "",
            pageCount: book.volumeInfo.pageCount || 0,
            categories: book.volumeInfo.categories || [],
            averageRating: book.volumeInfo.averageRating || 0,
            ratingsCount: book.volumeInfo.ratingsCount || 0,
            language: book.volumeInfo.language || "",
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
            previewLink: book.volumeInfo.previewLink || "",
            infoLink: book.volumeInfo.infoLink || "",
        };

    } catch (error) {
        console.error(error.response?.data);
        console.error(error.message);

        throw error;
    }
}

module.exports = {
    searchBooks,
    getBookById,
};