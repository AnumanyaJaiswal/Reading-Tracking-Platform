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

    // Genre BreakDown
    const books = await prisma.userBook.findMany({
        where: {
            userId,
            status: "FINISHED"
        },
        select:{
            categories: true
        }
    })

    const genreBraeakdown = {}
    books.forEach((book) => {
        book.categories.forEach((genre) =>{
            genreBraeakDown[genre] = (genreBraeakDown[genre] || 0) + 1;
        })
    })

    const genreBraeakdownArray = Object.entries(genreBraeakdown)
            .map(([genre, count]) =>{
                genre, count
            })
            .sort((a, b) => b.count - a.count)

    return {
        totalBooks,
        wantToRead,
        currentlyReading,
        finished,
        avgRating: avgRating._avg.rating || 0,
        totalPagesRead: totalPagesRead._sum.pageCount || 0,
        booksFinishedThisYear,
        genreBraeakdown: genreBraeakdownArray
    };
}

module.exports = {
    getStats
}