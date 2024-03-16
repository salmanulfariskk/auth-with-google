import { errorHandler } from "./utils/error.js"
import  jwt  from "jsonwebtoken"

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token
    if(!token) return next(errorHandler(401,'you are not authenticated'))

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403, 'Token is not valid!'))
        req.user = user
        next()
    })
}