import { Router } from "express";
import {router as adminrouter} from "./admin";
import {router as spacerouter} from "./space";
import {router as userrouter} from "./user"


export const router = Router();


router.post("/signin",(req,res)=>{
    res.json({message:"sisgnin"})
})

router.post("/signup",(req,res)=>{
    res.json({message:"signup"})
})

router.get("/elements",(req,res)=>{
    res.json({message:"elements"})
})

router.get("/avatars",(req,res)=>{
    res.json({message:"spaces"})
})



router.use("/user",userrouter);
router.use("/space",spacerouter);
router.use("/admin",adminrouter);