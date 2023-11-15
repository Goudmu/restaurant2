"use client"
import Price from '@/components/Price'
import { singleProduct } from '@/data'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ProductType } from '@/types/types'

let products:ProductType[]
let product:ProductType

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/singleProduct", {
  cache: "no-store"
  })

  if(!res.ok){
  throw new Error("failed")
  }
  products =  await res.json()
  console.log(products)
}

const SingeProductPage = () => {
  getData();
  const params = useParams();
  console.log(products)

  if(products == undefined){
    return <p>Page is Loading</p>
  } else {
    products.map(e => {
      if(e.id == params.id){
        product = e
      }
    })
    console.log(product)
    return (
      <div className='p-4 lg:px-20 xl:px-40 
      flex flex-col 
      justify-around text-red-500
      md:flex-row h-screen
      md:gap-8 md:items-center
      ' >
        {/* IMAGE CONTAINER */}
          {product.img &&
            (
            <div className='relative w-full h-1/2 md:h-[70%] ' >
              <Image src={product.img} alt='' 
              fill className='object-contain' />
            </div>
          )}
        {/* TEXT CONTAINER */}
        <div className='h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 ' >
            <h1 className='text-3xl xl:text-5xl font-bold uppercase' >{product.title}</h1>
            <p>{product.desc}</p>
            <Price product={product} />
        </div>
      </div>
    )
  }
}

export default SingeProductPage