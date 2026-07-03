const prisma = require('../config/db')

const getStats = async (userId) => {

    //Total Books
    const totalBooks = await prisma.userBook.findMany({
        where: {
            userId
        }
    })

    //Want To read
    const wantToRead = await prisma.userBook.findMany({
        where: {
            userId,
            status: "WANT_TO_READ"
        }
    })

    //Currently Reading
    const currentlyReading = await prisma.userBook.findMany({
        where: {
            userId,
            status: "CURRENTLY_READING"
        }
    })

    //Finished Reading
    const finished = await prisma.userBook.findMany({
        where: {
            userId,
            status: "FINISHED"
        }
    })

    //Average Rating
    const avgRating = await prisma.userBook.aggregate({
        where: {
            userId,
            rating: {
                not: null
            }
        },
        _avg: {
            rating: true
        }
    })

    //Total Pages Read
    const totalPagesRead = await prisma.userBook.aggregate({
        where: {
            userId,
            status: "FINISHED"
        },
        _sum: {
            pageCount: true
        }
    })

    //Books Finished this year
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const booksFinishedThisYear = await prisma.userBook.count({
        where: {
            userId,
            finishedAt: {
                gte: startOfYear,
            },
        },
    });

    // author BreakDown
    const books = await prisma.userBook.findMany({
        where: {
            userId,
            status: "FINISHED"
        },
        select:{
            authors: true
        }
    })

    const authorsBreakdown = {}
    books.forEach((book) => {
        book.authors.forEach((author) =>{
            authorsBreakdown[author] = (authorsBreakdown[author] || 0) + 1;
        })
    })

    const authorsBreakdownArray = Object.entries(authorsBreakdown)
            .map(([author, count]) =>({
                author, count
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0,6);

    return {
        totalBooks: totalBooks.length,
        wantToRead: wantToRead.length,
        currentlyReading: currentlyReading.length,
        finished: finished.length,
        avgRating: avgRating._avg.rating || 0,
        totalPagesRead: totalPagesRead._sum.pageCount || 0,
        booksFinishedThisYear,
        authorsBreakdown: authorsBreakdownArray
    };
}

module.exports = {
    getStats
}