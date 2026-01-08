import {z} from "zod"
export const SignupSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
    role: z.enum(["Admin", "User"])
})
export const SigninSchema = z.object({
    username: z.string(),
    password: z.string(),

})
export const updatemetadata = z.object({
    avatarId : z.string()
})
export const CreateSpaceschema = z.object({
    name: z.string(),
    dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    mapId: z.string()
})
export const addElement = z.object({
    elementId : z.string(),
    spaceId : z.string(),
    x : z.number(),
    y : z.number()
})
export const CreateElement = z.object({
    imageUrl : z.string(),
    width : z.number(),
    height : z.number(),
    static : z.boolean()
})
export const UpdateElement = z.object({
    imageUrl:z.string() 
})
export const CreateAvatar = z.object({
    imageUrl: z.string(),
    name : z.string()
})
export const CreateMapSchema = z.object({
    thumbnail : z.string(),
    dimensions : z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
    name : z.string(),
    defaultElements: z.array(z.object({
        elementId : z.string(),
        x : z.number(),
        y : z.number()
    }))
})

export const DeleteElement = z.object({
    id:z.string()
})


declare global{
    namespace Express{
        interface Request{
            role?:"Admin" | "User";
            userId?:string;
        }
    }
}