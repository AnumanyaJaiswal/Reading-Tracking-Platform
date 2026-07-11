const jwt = require("jsonwebtoken");


const socketAuth = (socket,next)=>{

    try{

        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find(row=>row.startsWith("token="))
            ?.split("=")[1];


        if(!token){
            return next(
                new Error("Authentication required")
            );
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        socket.userId = decoded.id;


        next();


    }catch(error){

        next(
            new Error("Invalid token")
        );

    }

}


module.exports = socketAuth;