import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    //read JWT from the cookie whose name is jwt
    token = req.cookies.jwt
    

    if (token) {
        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decode.userID).select("-password")

            next();

        } catch (error) {
            res.status(401)
            throw new Error("Authentication failed due to unknown token");
            
        }
    } else {
        console.log("error");

        res.status(401)
        throw new Error("Authentication failed due to no token found");
    }
})

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized as an admin")
    }

}

export {authenticate, authorizeAdmin};