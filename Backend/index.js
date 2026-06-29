const express = require('express')
const prisma = require('./src/config/db');
const app = express();
const authRoutes = require('./src/routes/authroutes')
const cookieParser = require('cookie-parser');
const bookRoutes = require('./src/routes/bookroutes')
const listRoute = require('./src/routes/listroutes')
const reviewRoute = require('./src/routes/reviewroutes')
const statsRoute = require('./src/routes/statsroute')



const PORT = process.env.PORT || 8000;

async function connectDB() {
    try {
        await prisma.$connect();
        console.log("Database Connected")
    } catch (error) {
        console.log(error);
    }
}

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/auth' , authRoutes);
app.use('/books' , bookRoutes);
app.use('/lists' , listRoute);
app.use('/reviews' , reviewRoute);
app.use('/stats' , statsRoute);


app.get('/' , (req, res) =>{
    res.send("Hello World");
})

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Prophecy API is running'
    });
});

app.listen(PORT , () => console.log("Server Started"));