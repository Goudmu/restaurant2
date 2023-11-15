"use client"
import { CartItemType, CartType2 } from '@/types/types'
import { useCartStore } from '@/utils/store'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CartPage = () => {
  const [thisCart, setThisCart] = useState<CartItemType[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [idCart, setIdCart] = useState("")
  const session = useSession()
  const router = useRouter();
  // let thisCarts:CartType2 ;

  const {removeFromCart} = useCartStore()
  // useEffect(() => {
  //   useCartStore.persist.rehydrate()
  // },[])

  const takeCartFromDB = async () => {
    let TI = 0;
    let TP = 0;
    await fetch("http://localhost:3000/api/carts2", {cache: "no-store"})
    .then(res => res.json().
    then((sult:CartType2[]) => {
        sult.map(e => {
        if(e.usernameUser == session.data?.user.email){
            setIdCart(e.id)
            setThisCart(e.products)
            e.products.map(data => {
              TI += data.quantity
              TP += (data.quantity * data.price)
            })
        }
        })
        setTotalItems(TI)
        setTotalPrice(TP)
    }))
  }
  useEffect(() => {
    takeCartFromDB()
  },[])

  const handleCheckout = async () => {
    if(thisCart != undefined){
      try{
        await fetch("http://localhost:3000/api/order", {
          method: "POST",
          body: JSON.stringify({
            price: totalPrice,
            products: thisCart,
            status : "On Going...",
            usernameUser : session.data?.user.email
          })
        }).then(async () => {
          await fetch("http://localhost:3000/api/carts2", {
            method: "DELETE",
            body: JSON.stringify({
              id: idCart
            })
          }).then(() => {
            router.push('/orders')
          })
        })
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row ' >
      {/* PRODUCT CONTAINER */}
      <div className='flex-1 p-4 flex flex-col justify-center lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40 overflow-scroll ' >
        {/* SINGLE ITEM */}
        { thisCart.map(item => (
        <div className='flex items-center justify-between mb-4 ' key={item.id} >
          {item.img && <Image src={item.img} alt=''
          width={100} height={100} className='object-contain'
          />}
          <div>
            <h1 className='uppercase text-xl font-bold' >{item.title} x {item.quantity}</h1>
            <span>{item.optionTitle}</span>
          </div>
          <h2 className='font-bold' >${item.price}</h2>
          <span className='cursor-pointer' onClick={()=>removeFromCart(item)} >X</span>
        </div>
        )) 
        }
      </div >
      {/* PAYMENTCONTAINER */}
      <div className='flex-1 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6'>
        <div className='flex justify-between' >
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice}</span>
        </div>
        <div className='flex justify-between' >
          <span>Service Cost</span>
          <span className='text-green-500' >FREE!</span>
        </div>
        <div className='flex justify-between' >
          <span>Delivery Cost</span>
          <span className='text-green-500' >FREE!</span>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between' >
          <span>Total (Include Tax)</span>
          <span className='font-bold'>${totalPrice}</span>
        </div>
        <button className='bg-red-500 w-1/2 
        text-white p-3 rounded-md
        self-end' onClick={handleCheckout} >
          Check Out
        </button>
      </div>
    </div>
  )
}

export default CartPage