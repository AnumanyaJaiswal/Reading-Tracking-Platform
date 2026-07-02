const jwt = require('jsonwebtoken')

const authmiddleware = (req, res , next) =>{
    try {
        // Take Token
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        //Verification of token through secret key
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
}

module.exports = authmiddleware;