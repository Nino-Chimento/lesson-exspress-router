import { Request, Response } from "express";
import { db } from '../db.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const userLogin = async (req:Request,res:Response) => {
    const {username,password} = req.body;
    try {
        const user = await db.one('SELECT * FROM users WHERE username = $1',[username])
        if(user && user.password === password){
            const payload = {id:user.id,username:user.username}
            const token = jwt.sign(payload,process.env.SECRET as string)
            const userUpdate = await db.one(`UPDATE users SET token = $1 WHERE id = $2 RETURNING *`,[token,user.id])
            return   res.status(200).json(userUpdate)
        }
           return  res.status(403).json({message:"username or password incorrect"})
    } catch (error) {
        res.status(401).json({message:"User not found"})
    }
}

const userCreate = async (req:Request,res:Response) => {
    const {username,password} = req.body;
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1',[username])
    if(user){
        return res.status(409).json({message:"Error data"})
    }
   
    const userCreate:any = await  db.one(`INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`,[username,password])
    const payload = {id:userCreate.id,username:userCreate.username, role:"admin"}
    const token = jwt.sign(payload,process.env.SECRET as string)
    await db.one(`UPDATE users SET token = $1 WHERE id = $2 RETURNING *`,[token,userCreate.id])
    return res.status(201).json(token)
}

const userLogout = async (req:Request,res:Response) => {
    const user :any= req.user;
   try {
    await db.one(`UPDATE users SET token = null WHERE id = $1 RETURNING id`,[user?.id as string])
    res.status(200).json({message:"User logged out"})
} catch (error) {
    res.status(401).json({message:"User not found"})
   }
  
    
}

export  {
    userLogin,
    userCreate,
    userLogout
}