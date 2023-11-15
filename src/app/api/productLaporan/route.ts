import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try{
        const product = await prisma.product.findMany()
        return new NextResponse(JSON.stringify(product), {status:200})
    } catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({
            message: "something went wrong"}), {status:500})
    }
}