
import { ProductType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'

const getData = async (category:string) => {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
    cache: "no-store"
  })

  if(!res.ok){
    throw new Error("failed")
  }
  return res.json()
}

type Props = {
  params:{category:string}
}

const CategoryPage = async ({params}:Props) => {
  const products:ProductType[] = await getData(params.category)

  return (
    <div className='flex flex-wrap text-red-500' >
      {products.map(item => (
        <Link 
        className='
        w-full h-[60vh] border-r-2 border-b-2 
        border-red-500 sm:w-1/2 lg:w-1/3 p-4
        flex flex-col justify-between group
        even:bg-fuchsia-50' 
        key={item.id} href={`/product/${item.id}`}>
          {/* IMAGE CONTAINER */}
            {
              item.img && (
                <div className='relative h-[80%]' >
                  <Image src={item.img} alt='' fill
                  className='object-contain' />
                </div>
              )
            }
          {/* TEXT CONTAINER */}
          <div className='flex items-center 
          justify-between font-bold
          ' >
            <h1 className='text-xl uppercase p-2' >{item.title}</h1>
            <h2 className='text-xl group-hover:hidden' >${item.price}</h2>
            <button className='hidden group-hover:block uppercase bg-red-500 
            text-white p-2 rounded-lg text-sm'>
              Add to Cart
              </button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPage