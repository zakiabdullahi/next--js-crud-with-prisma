import { z } from 'zod'


const postSchema = z.object({
    title: z.string().min(3).max(20),
    content: z.string().min(3).max(60),
    imageUrl: z.string()
})

export default postSchema