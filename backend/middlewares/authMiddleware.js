const JWT = require("jsonwebtoken");

const authMiddleware = async(req,res,next) => {
    try {
        // get access to token from request
        const token = req.headers['authorization'].split(" ")[1];

        // const token = req.cookies.access_token;

        if(!token){
            return res.status(401).json({ message: "Unauthorized: No token found" })
        }

       try {
         const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
         req.user = { id: decodedToken.id, email: decodedToken.email };
         next();

       } catch (error) {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
       }

    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Authorization failed",
            success: false
        });
    }
};

module.exports = authMiddleware;