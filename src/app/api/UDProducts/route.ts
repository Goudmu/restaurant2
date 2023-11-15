import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const product = await prisma.product.upsert({
      where: {
        id: body.id
      },
      update:{
        title: body.title,
        desc: body.desc,
        img: body.img,
        price: body.price,
        isFeatured: body.isFeatured,
        catSlug: body.catSlug
      }, 
      create: body
    });
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
export const DELETE =async (req:NextResponse) => {
  try {
    const body = await req.json();
    const product = await prisma.product.delete({
      where: {
        id : body.id
      }
    })
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
} 