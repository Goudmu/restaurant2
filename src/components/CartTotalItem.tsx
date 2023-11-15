"use client";
import { CartType2 } from '@/types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect , useState } from 'react'

const CartTotalItem = () => {
    const [TI, setTI] = useState(0);
    const session = useSession()

    useEffect(()=> {
        console.log("asd")
        takeCartFromDB()
    },[])

    const takeCartFromDB = async () => {
        await fetch("http://localhost:3000/api/carts2", {cache: "no-store"})
        .then(res => res.json().
        then((sult:CartType2[]) => {
            let totalItem = 0;
            sult.map(e => {
            if(e.usernameUser == session.data?.user.email){
                e.products.map(f => {
                totalItem += f.quantity;
                })
            }
            })
            setTI(totalItem)
        }))
    }
    
  return (
    <div>{TI}</div>
  )
}

export default CartTotalItem

/*
const CartTotalItem = () => {
    const [TI, setTI] = useState(0);
    const session = useSession()
    let totalItem = 0;

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
            setTI(totalItem)
        }))
    }
    
  return (
    <div>{TI}</div>
  )
}

export default CartTotalItem
*/