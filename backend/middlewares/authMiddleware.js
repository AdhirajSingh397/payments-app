const { jwtSecret } = require("../config");
const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next){

    const header = req.headers.authorization

    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    const token = header.split(" ")[1]

    try{
        const payload = jwt.verify(token, jwtSecret)
        req.userId = payload.userId
        next()
    }
    catch(error) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }



}

module.exports = authMiddleware;