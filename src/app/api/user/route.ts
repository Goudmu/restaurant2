import { prisma } from "@/utils/connect"
import { NextResponse, NextRequest } from "next/server"

// LOGIN
export const GET = async () => {
    try{
        const user = await prisma.user.findMany()
        return new NextResponse(JSON.stringify(user), {status:200})
    } catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({
            message: "something went wrong"}), {status:500})
    }
}
export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json();
        const user = await prisma.user.create({
          data: body,
        });
        return new NextResponse(JSON.stringify(user), { status: 201 });
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({
            message: "something went wrong"}), {status:500})
    }
}

/*
export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const user = await prisma.user.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(user), { status: 201 });
}
*/