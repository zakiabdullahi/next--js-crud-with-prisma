
import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'
import postSchema from '../schema'

export async function GET(req, { params }) {


    try {


        const post = await prisma.post.findUnique({ where: { id: params.id } });

        if (!post) {
            return new NextResponse.json({ status: 404, message: "Couldn't find id" })
        }

        return NextResponse.json(post);


    } catch (error) {
        console.log("[ERROR_GET]", error)
        return new NextResponse("Internal error", { status: 500 });

    }



}
export async function DELETE(req, { params }) {


    try {

        const deletedPost = await prisma.post.delete({
            where: {
                id: params.id
            }
        })


        return NextResponse.json(deletedPost)


    } catch (error) {
        console.log("[ERROR_DELETE]", error)
        return new NextResponse("Internal error", { status: 500 });

    }




}

export async function PUT(req, { params }) {


    try {
        const body = await req.json()

        const validation = postSchema.safeParse(body)


        if (validation.success) {


            // const { title, content } = body
            const { title, content, imageUrl } = validation.data


            const updatedPost = await prisma.post.update({
                where: {
                    id: params.id
                },
                data: {
                    title: title,
                    content: content,
                    imageUrl: imageUrl
                },
            })

            return NextResponse.json({ message: updatedPost }, { status: 200 })
        } else {
            return NextResponse.json({ message: validation.error.errors }, { status: 400 })
        }

    } catch (error) {
        console.log("[UPDATE_POST]", error)

    }





}