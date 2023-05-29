import dotenv from "dotenv"
dotenv.config();
import passport from "passport"
import passportJWT from "passport-jwt"
import { db } from "./db.js";


passport.use(
    new passportJWT.Strategy({
        secretOrKey: process.env.SECRET,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },async(payload:any,done:any)=>{
        const user = await db.one(`SELECT * FROM users WHERE id=$1`,payload.id)
        console.log(user);
        
        try {
            return user? done(null,user):done(null,new Error("User not found"))
        } catch (error) {
            done(error)
        }
        
    })
)