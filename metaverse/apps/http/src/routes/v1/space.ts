import {Router} from "express";
export const router = Router()
import {userMiddleware} from "../../middlewares/user.js"
import {prisma} from "@repo/db"
import { CreateSpaceschema } from "../../types";
import { parse } from "zod";

router.post("/",userMiddleware, async (req,res)=>{
    const parsedData = CreateSpaceschema.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message:"Invalid inputs"
        })
    } 
    
    // const space = await prisma.space.create({
    //     data:{
    //         name:parsedData.data.name,
    //         // dimensions:parsedData.data.dimensions,
    //         width:parsedData.data.dimensions.split("x")[0] as any,
    //         height:parsedData.data.dimensions.split("x")[1] as any,
    //         creatorId: req.userId!,
    //     }
    // })

    // const map = await prisma.map.findFirst({
    //     where:{
    //         id:
    //     }
    // })

    if(!parsedData.data.mapId){
        const space = await prisma.space.create({
            data:{
                name:parsedData.data.name,
                width:parsedData.data.dimensions.split("x")[0] as any,
                height:parsedData.data.dimensions.split("x")[1] as any,
                creatorId: req.userId!,
            }
        })
        return res.json({message:"Space created successfully",spaceId:space.id})
    }
    const map = await prisma.map.findUnique({
        where:{
            id:parsedData.data.mapId
        }
        ,select:{
            maps:true,
            width:true,
            height:true
        }
    })
    
    if(!map){
        return res.status(400).json({message:"Map not found"})
    }   
    let space = await prisma.$transaction(async(tx)=>{
        const space = await tx.space.create({
            data:{
                name:parsedData.data.name,
                width:map.width, 
                height:map.height,
                creatorId: req.userId!,
            }
        })
        await prisma.spaceElements.createMany({
            data:map.maps.map((element)=>{
                return {
                    elementId:element.elementId,
                    spaceId:space.id,
                    x:element.x!,
                    y:element.y!
                }
            })
        })
        return space;
    })
    res.json({spaceId:space.id})

})

router.get("/:spaceId",(req,res)=>{

})

router.delete("/:spaceId",userMiddleware, async (req,res)=>{
    const spaceid = req.params.spaceId;
    if(!spaceid){
        return res.json({message:"Space not found"})
    }
    const space = await prisma.space.findUnique({
        where:{
            id:spaceid
        },select:{
            creatorId:true
        }
    })
    if(!space){
        return res.status(400).json({message:"Space not found"})
    }
    if (space.creatorId != req.userId){
        return res.status(400).json({message:"You're not the creator of this space"})
    }

    await prisma.space.delete({
        where:{
            id:spaceid
        }
    })
    res.status(200).json({message:"Space deleted successfully"})
})

router.get("/all",userMiddleware,(req,res)=>{
    const spaces = prisma.space.findMany({
        select:{
            id:true,
            name:true
        }
    })
    return res.json(spaces)
})

router.post("/element",(req,res)=>{

})

router.delete("/element",(req,res)=>{
    
})