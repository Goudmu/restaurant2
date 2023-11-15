import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


export const GET =async (req:NextRequest) => {
    try{
        const carts = await prisma.cart.findMany()
        return new NextResponse(JSON.stringify(carts),{
            status:200
        })
    }catch(err){
        console.log(err);
        return new NextResponse(
            JSON.stringify({
                message: "Something went wrong!"
            }),
            {status:500}
        )
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const cart = await prisma.cart.upsert({
            where: {
                id: body.id,
            },
            update: {
                products: body.products
            },
            create: {
                usernameUser: body.usernameUser,
                products: body.products
            },
        })
        return new NextResponse(JSON.stringify(cart), { status: 201 });
      } catch (err) {
        console.log(err);
        return new NextResponse(
          JSON.stringify({ message: "Something went wrong!" }),
          { status: 500 }
        );
      }
};

export const DELETE =async (req:NextRequest) => {
    try{
        const body = await req.json()
        const cart = await prisma.cart.delete({
            where: {
                id: body.id
            }
        })
        return new NextResponse(JSON.stringify(cart), {status:201})
    } catch(err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({message : "Something went wrong!"}),
            {status:500}
        )
    }
}