import { Router } from "express";

export const router = Router();

router.post("/metadata",(req,res)=>{
    res.json({message:"metadata"})
})
router.get("/metadata/bulk",(req,res)=>{
    res.json({message:"metadata"})
})