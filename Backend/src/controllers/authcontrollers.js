const prisma = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //Password Hasing
        const hashedPassword = await bcrypt.hash(password, 10);

        //Check Existing User Query
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // Creating New User
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        //Success Status
        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });

        // Error Catching
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        // Checking user is there in database or not
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        //Comapre Password
        const isMatch = await bcrypt.compare(
            password, user.password
        )

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        // Generate JWT Tokens
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

const getCurrentUser = async (req, res) => {
    try {

        // Find Current User
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });

    return res.status(200).json({
        success: true,
        message: "Logged Out Succesfully"
    })

}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
};