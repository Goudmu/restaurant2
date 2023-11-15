"use client"
import { CartType2 } from '@/types/types'
import { useCartStore } from '@/utils/store'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import CartTotalItem from './CartTotalItem'

const Carticon = () => {
  let totalItem= 0;
  // const {totalItems} = useCartStore()
  const session = useSession();

  // useEffect(() => {
  //   useCartStore.persist.rehydrate()
  // },[])

  useEffect(()=> {
    takeCartFromDB()
  },[totalItem])

  const takeCartFromDB = async () => {
    await fetch("http://localhost:3000/api/carts2", {cache: "no-store"})
    .then(res => res.json().
    then((sult:CartType2[]) => {
      sult.map(e => {
        if(e.usernameUser == session.data?.user.email){
          e.products.map(f => {
            totalItem += f.quantity
          })
        }
      })
    }))
  }

  return (
    <div>
      <Link href='/cart' className='flex items-center gap-4' >
          <div className='relative w-8 h-8 md:w-5 md:h-5' >
              <Image src="/cart.png" alt='' fill sizes="fill" />
          </div>
          <span>
              Cart 
              {/* <CartTotalItem/> */}
          </span>
      </Link>
    </div>
  )
}

export default Carticon