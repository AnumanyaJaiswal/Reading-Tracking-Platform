const prisma = require('../config/db')

const addReview = async ({
    id,
    userId,
    rating,
    review
}) => {

    const book = await prisma.userBook.findUnique({
        where: {
            id
        }
    })

    if (!book) {
        throw new Error("Book not Found");
    }

    if (userId !== book.userId) {
        throw new Error("Unauthorised");
    }

    if (book.status !== 'FINISHED') {
        throw new Error("Finish the book to add the review");
    }

    if (rating == null) {
        throw new Error("Rating is required.");
    }

    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }

    return prisma.userBook.update({
        where: {
            id,
        },
        data: {
            rating,
            review
        }
    })
}

const getMyReviews = async (userId) => {

    //Getting all reviews from database
    const reviews = await prisma.userBook.findMany({
        where: {
            userId,
            rating: {
                not: null
            }
        },
        select: {
            id: true,
            title: true,
            authors: true,
            thumbnail: true,
            rating: true,
            review: true,
            updatedAt: true,
        },
        orderBy: {
            updatedAt: "desc"
        }
    })

    return reviews;

}

const getAllReviews = async () => {
    const reviews = await prisma.userBook.findMany({
        where: {
            rating: {
                not: null
            },
        },
        select: {
            id: true,
            googleBookId: true,
            title: true,
            authors: true,
            thumbnail: true,
            rating: true,
            review: true,
            updatedAt: true,

            user: {
                select: {
                    username: true,
                },
            },
        },
        orderBy:{
            updatedAt: "desc"
        }
    })

    return reviews;
}

module.exports = {
    addReview,
    getMyReviews,
    getAllReviews
}