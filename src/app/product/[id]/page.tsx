"use client"
import Price from '@/components/Price'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ProductType } from '@/types/types'
import { useSession } from 'next-auth/react'

let products:ProductType[]
let product:ProductType

const SingeProductPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(products);
  const session = useSession();
  const params = useParams();

  useEffect(()=> {
    fetch('http://localhost:3000/api/singleProduct')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        data.map((e: { id: string; title: string; desc?: string | undefined; img?: string | undefined; price: number; options?: { title: string; additionalPrice: number }[] | undefined }) => {
          if(e.id == params.id){
            product = e
          }
        })
      })
  },[])


  if(isLoading == true){
    return <p>Loading...</p>
  }
  if(data == undefined){
    return <p>No Data</p>
  }
  return (
    <div className='p-4 lg:px-20 xl:px-40 
    flex flex-col 
    justify-around text-red-500
    md:flex-row h-screen
    md:gap-8 md:items-center
    ' >
      {/* IMAGE CONTAINER */}
        {product.img == undefined?(
          <div></div>
        ) : (
          <div className='relative w-full h-1/2 md:h-[70%] ' >
            <Image src={product.img} alt='' 
            fill className='object-contain' priority={true} />
          </div>
        )}
      {/* TEXT CONTAINER */}
      <div className='h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 ' >
          {session.data?.user.isAdmin && (
            <div className='flex flex-row justify-between' >
              <div>Edit</div>
              <div>Delete</div>
            </div>
          )}
          <h1 className='text-3xl xl:text-5xl font-bold uppercase' >{product.title}</h1>
          <p>{product.desc}</p>
          <Price product={product} />
      </div>
    </div>
  )
}

export default SingeProductPage

// {product.img &&
//   (
//   <div className='relative w-full h-1/2 md:h-[70%] ' >
//     <Image src={product.img} alt='' 
//     fill className='object-contain' priority={true} />
//   </div>
// )}