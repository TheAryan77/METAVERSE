import { Router } from "express";
import { adminMiddleware } from "../../middlewares/admin";
import { CreateElement,CreateMapSchema,CreateAvatar, UpdateElement } from "../../types";
import {prisma} from "@repo/db"
export const router = Router();


router.post("/element",adminMiddleware,async (req,res)=>{
    const parsedData = CreateElement.safeParse(req.body);
    if(!parsedData.data){
        return res.status(400).json({message:"Invalid inputs"});
    }
    const element = await prisma.element.create({
        data:{
            width:parsedData.data.width,
            height:parsedData.data.height,
            static:parsedData.data.static,
            imageUrl:parsedData.data.imageUrl
        }
    })
    if(!element){
        return res.json({message:"Element not created"})
    }
    return res.json({message:"Element created successfully",id:element.id})

})

router.put("/element/:elementId",adminMiddleware,async(req,res)=>{
    const elementId = req.params.elementId;
    if(!elementId){
        return res.json({message:"ElementId not found"})
    }
    const parsedData = UpdateElement.safeParse(req.body);
    if(!parsedData.data){
        return res.status(400).json({message:"Invalid inputs"});
    }
    await prisma.element.update({
        where:{
            id:elementId
        },
        data:{
            imageUrl:parsedData.data.imageUrl
        }
    })
    return res.json({message:"Element updated successfully"})
})

router.post("/avatar",adminMiddleware ,async (req,res)=>{
    const parsedData = CreateAvatar.safeParse(req.body);
    if(!parsedData.success){
        return res.json({message:"Invalid inputs"})
    }
    const avatar = await prisma.avatar.create({
        data:{
            imageUrl:parsedData.data.imageUrl,
            name:parsedData.data.name
        }
    })
    return res.json({
        message:"Avatar created successfully",
        id:avatar.id
    })
})
router.post("/map",adminMiddleware,async (req,res)=>{
    const parsedData = CreateMapSchema.safeParse(req.body);
    if(!parsedData.data){
        return res.json({message:"Invalid inputs"})
    }
    const map = await prisma.map.create({
        data:{
            thumbnail:parsedData.data.thumbnail,
            name:parsedData.data.name,
            width:parsedData.data.dimensions!.split("x")[0] as any,
            height:parsedData.data.dimensions!.split("x")[1] as any,
            maps:{
                create:parsedData.data.defaultElements.map((e)=>({
                    x:e.x,
                    y:e.y,
                    elementId:e.elementId
                }))
            }
        }
    })
    if(!map){
        return res.json({message:"Map not created"})
    }
    return res.json({
        message:"Map created successfully",
        id:map.id
    })
})