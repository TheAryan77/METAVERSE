

import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import type { NextFunction,Request,Response } from "express";
export const userMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;
    const token = header?.split(" ")[1]
    if(!token){
        return res.json({message:"Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token,JWT_SECRET) as {role:String , userId:string};
        req.userId = decoded.userId;
        next();
    }catch(e){
        return res.json({message:"Unthorized!"});
    }
}