import { ProductType } from '@/types/types'
import Image from 'next/image'
import React from 'react'

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/products`, {
    cache: "no-store"
  })

  if(!res.ok){
    throw new Error("failed")
  }
  return res.json()
}


const Featured = async () => {

  const featuredProducts:ProductType[] = await getData();
  return (
    <div className='w-full overflow-x-scroll text-red-500' >
      {/* WRAPPER */}
      <div className='w-max flex' >
        {/* SINGLE ITEM */}
        {
          featuredProducts.map(item => (
            <div key={item.id} className='w-screen md:w-[50vw] xl:w-[33vw] h-[60vh] xl:h[90vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-150 ' >
            {/* IMAGE CONTAINER */}
            { item.img && (
              <div className='relative flex-1 w-full hover:rotate-[30deg] transition-all duration-500' >
                <Image src={item.img} alt='' fill className='object-contain' sizes="fill" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className='flex-1 flex flex-col gap-4 items-center text-center justify-center' >
              <h1 className='text-xl xl:text-2xl 2xl:text-3xl font-bold uppercase ' >{item.title}</h1>
              <p className='p-4 2xl:p-8 '>{item.desc}</p>
              <span className='text-xl font-bold' >${item.price}</span>
              <button className='bg-red-500 text-white p-2 rounded-md' >ADD TO CART</button>
            </div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Featured

// import { featuredProducts } from '@/data'
// import Image from 'next/image'
// import React from 'react'

// const Featured = () => {
//   return (
//     <div className='w-screen overflow-x-scroll text-red-500' >
//       {/* WRAPPER */}
//       <div className='w-max flex' >
//         {/* SINGLE ITEM */}
//         {
//           featuredProducts.map(item => (
//             <div className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 ' >
//             {/* IMAGE CONTAINER */}
//             <div className='relative flex-1 w-full'>
//               <Image src='/temporary/p1.png' alt='' fill className='object-contain' />
//             </div>
//             {/* TEXT CONTAINER */}
//             <div className='flex-1 flex flex-col gap-4' >
//               <h1 className='text-xl font-bold uppercase' >TITLE</h1>
//               <p>PRICE</p>
//               <span className='text-xl font-bold' >$123</span>
//               <button className='bg-red-500 text-white p-2 rounded-md' >ADD TO CART</button>
//             </div>
//           </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Featured