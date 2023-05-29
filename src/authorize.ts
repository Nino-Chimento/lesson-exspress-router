import { NextFunction, Request, Response } from "express";
import passport from "passport";


const authorize = async (req:Request,res:Response,next:NextFunction) => {
passport.authenticate("jwt",{session:false},(err:any,user:any)=>{
    console.log(user);
    
    if(!user || err) {
    return res.status(401).json({message:"Unauthorized"})
    }
    req.user = user;
    next()
 })(req,res,next)
}

export default  authorize ;