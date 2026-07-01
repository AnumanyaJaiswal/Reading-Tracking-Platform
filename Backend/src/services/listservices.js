const prisma = require('../config/db')

const addToList = async ({
    userId,
    googleBookId,
    title,
    authors,
    thumbnail,
    pageCount,
    categories,
    status,
}) => {
    // Checking the book already exists for that user
    const existingBook = await prisma.userBook.findFirst({
        where: {
            userId,
            googleBookId
        }
    });
    // if book exists then just update its status
    if (existingBook) {
        return prisma.userBook.update({
            where: {
                id: existingBook.id
            },
            data: {
                status,
                pageCount,
                categories,
            }
        })
    }

    // IF book not exists then create a new book
    return prisma.userBook.create({
        data: {
            userId,
            googleBookId,
            title,
            authors,
            thumbnail,
            pageCount,
            categories,
            status,
        }
    })
}

const getUserLists = async (userId) => {
    const books = await prisma.userBook.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return {
        wantToRead: books.filter((book) => book.status === "WANT_TO_READ"),
        currentlyReading: books.filter((book) => book.status === "CURRENTLY_READING"),
        finished: books.filter((book) => book.status === "FINISHED")
    }
}

const updateListStatus = async ({
    id,
    userId,
    status
}) => {

    const book = await prisma.userBook.findUnique({
        where: {
            id
        }
    })

    // If book not found
    if (!book) {
        throw new Error("Book not Found");
    }

    // If logined User is not the owner of that book recorded in database then he cannot change the status of another user
    if (book.userId !== userId) {
        throw new Error("Unauthorized");
    }

    return prisma.userBook.update({
        where: {
            id
        },
        data: {
            status,
            finishedAt: status === "FINISHED" ? new Date() : null,
        }
    })

}

const deleteBook = async (id, userId) => {
    const book = await prisma.userBook.findUnique({
        where: {
            id
        }
    })

    if (!book) {
        throw new Error("Book not found");
    }

    if (book.userId !== userId) {
        throw new Error("Unauthorized");
    }

    return prisma.userBook.delete({
        where: {
            id
        }
    })

}

module.exports = {
    addToList,
    getUserLists,
    updateListStatus,
    deleteBook
}