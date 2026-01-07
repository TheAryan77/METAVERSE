

import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import type { NextFunction,Request,Response } from "express";
export const adminMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;
    const token = header?.split(" ")[1]
    if(!token){
        return res.json({message:"Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token,JWT_SECRET) as {role:String , userId:string};
        if(decoded.role != "Admin"){
            return res.json({message:"You're not an admin"});
        }
        req.userId = decoded.userId;
        next();
    }catch(e){
        return res.json({message:"Unauthorized"});
    }
}