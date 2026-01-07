import { Router } from "express";
import { updatemetadata } from "../../types/index.js";
import {prisma} from "@repo/db";
import {adminMiddleware} from "../../middlewares/admin.js";
export const router = Router();

router.post("/metadata",adminMiddleware , async (req,res)=>{    
    const parsedData = updatemetadata.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({message:"missing avatar Id"})
    }
    await prisma.user.update({
        where:{
            id:req.userId!
        },
        data:{
            avatarId:parsedData.data.avatarId
        }
    })


    res.json({
        message:"metadata updated successfully"
    })


})
router.get("/metadata/bulk",async(req,res)=>{
    const userIdstrings = (req.query.ids ?? "[]") as string;
    const userIds = (userIdstrings).slice(1,userIdstrings?.length - 2).split(",");

    const metadata = await prisma.user.findMany({
        where: {
            id: {
                in: userIds
            }
        },
        select: {
            id:true,
            avatar: true
        }
    })

    res.json({
        avatars:metadata.map(x=>({
            userId:x.id,
            avatarId:x.avatar?.imageUrl
        }))
    })




})