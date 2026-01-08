import {Router} from "express";
export const router = Router()
import {userMiddleware} from "../../middlewares/user.js"
import {prisma} from "@repo/db"
import { CreateSpaceschema ,addElement} from "../../types";
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

router.get("/all",userMiddleware, async (req,res)=>{
    const sp = await prisma.space.findMany({
        where:{
            creatorId:req.userId!
        }
    })
    res.json({
        spaces:sp.map((space)=>{
            return {
                id:space.id,
                name:space.name,
                thumbnail:space.thumbnail,
                dimensions:`${space.width}x${space.height}`
            }
        })
    })

})

router.get("/:spaceId",(req,res)=>{
    
})


router.post("/element",userMiddleware,async(req,res)=>{
    const parsedData = addElement.safeParse(req.body);  
    if(!parsedData.data){
        return res.status(400).json({message:"Invalid inputs"});
    }   

    const space = await prisma.space.findUnique({
        where:{
            id:req.body.spaceId,
            creatorId:req.userId!
        },
        select:{
            width:true,
            height:true
        }
    })
    if(!space){
        return res.json({message:"Space not found"})
    }

    await prisma.spaceElements.create({
        data:{
            elementId:parsedData.data.elementId,
            spaceId:parsedData.data.spaceId,
            x:parsedData.data.x,
            y:parsedData.data.y
        }
    })
    res.json({message:"Element added successfully"})

})


router.delete("/element",(req,res)=>{
    
})