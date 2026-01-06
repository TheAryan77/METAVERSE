import {z} from "zod"
export const SignupSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    type: z.enum(["admin", "user"])
})
export const SigninSchema = z.object({
    username: z.string().email(),
    password: z.string().min(8),

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
export const CreateAvatar = z.object({
    imageUrl: z.string(),
    name : z.string()
})