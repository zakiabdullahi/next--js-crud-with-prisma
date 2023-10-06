import { NextResponse } from 'next/server'
import prisma from '../../../prisma/client'
import postSchema from './schema'

export async function POST(req) {


    try {
        const body = await req.json()

        const validation = postSchema.safeParse(body)


        if (validation.success) {


            // const { title, content } = body
            const { title, content, imageUrl } = validation.data


            const newPost = await prisma.post.create({
                data: {
                    title: title,
                    content: content,
                    imageUrl: imageUrl
                }
            })

            return NextResponse.json({ message: newPost }, { status: 200 })
        } else {
            return NextResponse.json({ message: validation.error.errors }, { status: 400 })
        }

    } catch (error) {
        console.log("[REGISTER_POST]", error)

    }





}
export async function GET(req) {


    try {

        const posts = await prisma.post.findMany()

        return NextResponse.json(posts)


    } catch (error) {
        console.log("[ERROR_GET]", error)

    }





}