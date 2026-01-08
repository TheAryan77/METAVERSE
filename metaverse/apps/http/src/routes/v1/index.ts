import { Router } from "express";
import {router as adminrouter} from "./admin.js";
import {router as spacerouter} from "./space.js";
import {router as userrouter} from "./user.js";
import { SigninSchema, SignupSchema } from "../../types/index.js";
import bcrypt from "bcrypt"
import {prisma} from "@repo/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";
export const router = Router();


router.post("/signup",async (req,res)=>{
    const parsedData = SignupSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(401).json({message:"Validation failed"})
    }
    const data = parsedData.data;
    const hashedpassword = await bcrypt.hash(data.password,10);
    try{
        const user = await prisma.user.create({
           data:{
               username: data.username,
               password: hashedpassword,
               role:data.role
           }
        })
        
        res.json({
            message:"User created successfully",
            userId: user.id
        })
    }
    catch(e){
        console.error("Signup error:", e);
        return res.status(404).json({
            message:"User could not be created", 
            error: e instanceof Error ? e.message : "Unknown error"
        })
    }
})

router.post("/signin",async (req,res)=>{
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(400).json({message:"Validation failed"})
    }
    const data = parsedData.data;
    try{
        const user = await prisma.user.findFirst({
            where:{
                username: data.username
            }
        })

        if(!user){
            return res.status(403).json({message:"User not found"})
        }
        const passwordMatch = await bcrypt.compare(data.password,user.password);
        if(!passwordMatch){
            return res.status(403).json({message:"Invalid password"});
        }

        const token = jwt.sign({
            userId: user.id,
            role:user.role
        },JWT_SECRET,{
            expiresIn:"1h"
        })

        res.json({
            message:"User signed in successfully",
            token: token,
        })
    }
    catch(e){
        console.error("Signin error:", e);
        return res.status(400).json({
            message:"User could not be signed in", 
            error: e instanceof Error ? e.message : "Unknown error"
        })
    }
})


router.get("/elements",(req,res)=>{
    
})

router.get("/avatars",(req,res)=>{
    res.json({message:"spaces"})
})



router.use("/user",userrouter);
router.use("/space",spacerouter);
router.use("/admin",adminrouter);