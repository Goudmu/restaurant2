"use client"
import { CartItemType, CartType2, ProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';

let productsThis:CartItemType[]
let thisCart:CartType2;

const Price = ({ product }: { product: ProductType }) => {
    const [total, setTotal] = useState(product.price);
    const [qty, setqty] = useState(1);
    const [selected, setselected] = useState(0);
    const session = useSession()

    const {addToCart, products, removeAllFromCart} = useCartStore();

    useEffect(() => {
        useCartStore.persist.rehydrate()
    },[])

    useEffect(() => {
        setTotal(qty * product.price)
    }, [qty, selected, product.price])

    useEffect(() => {
        // console.log(products)
    },[products])

    const handleCartToDB = async (e:CartItemType[], id:string) => {
        let exist = false;
        if(e.length != 0){
            e.map((data, index) => {
                if(data.id == product.id){
                    e[index].quantity += qty
                    e[index].price += total
                    exist = true
                    // console.log("exist true")
                }
            })
        } 
        if(exist == false) {
            // console.log("exist false")
            e.push({
                id: product.id,
                title: product.title,
                img: product.img,
                price: total,
                ...(product.options?.length && {
                    optionTitle: product.options[selected].title,
                }),
                quantity: qty,
            })
        } 
        // console.log(e)
        try{
            await fetch("http://localhost:3000/api/carts2", {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    usernameUser: session.data?.user.email,
                    products: e
                })
            })
        } catch(err){
            console.log(err)
        }
    }

    const takeCartFromDB = async () => {
        let id = "";
        let isi:CartType2[] = [];
        let isi2:CartItemType[] = [];
        await fetch("http://localhost:3000/api/carts2", {cache: "no-store"})
        .then(res => res.json().
        then(sult => {
            isi=sult
            isi.map(e => {
                if(e.usernameUser == session.data?.user.email){
                    id = e.id
                    isi2 = e.products
                }
            })
            handleCartToDB(isi2, id)
        }))
    }

    const handleCart = ()=>{
        addToCart({
          id: product.id,
          title: product.title,
          img: product.img,
          price: total,
          ...(product.options?.length && {
            optionTitle: product.options[selected].title,
          }),
          quantity: qty,
        })
        takeCartFromDB()
        toast.success("The product added to the cart!")
      }
      
    
  return (
    <div className='flex flex-col gap-4' >
        <h2 className='text-2xl font-semibold' >${total}</h2>
        {/* OPTION CONTAINER */}
        <div className='flex gap-4' >
            {product.options?.map((option, index) => (
                <button className=' min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md' 
                style={{
                    background: selected === index ? 
                    "rgb(248 113 113)" : 
                    "white",
                    color: selected === index ? "white" : "red"
                }}
                onClick={() => setselected(index)} key={index}
                >{option.title}</button>
            ))}
        </div>
        {/* QTY AND ADD BUTTON CONTAINER */}
        <div className='flex justify-between items-center' >
            {/* QTY */}
            <div className='flex justify-between w-full p-3 ring-1 ring-red-400' >
                <span>Qty</span>
                <div className='flex flex-row gap-5 items-center' >
                    <button onClick={() => setqty(prev => prev > 1 ? prev - 1: prev )}>{'<'}</button>
                    <span>{qty}</span>
                    <button onClick={() => setqty(prev => prev + 1)}>{'>'}</button>
                </div>
            </div>
            {/* CART BUTTON */}
            <button className='uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-400'
            onClick={handleCart}>
                Add To Cart
            </button>
        </div>
        <div onClick={()=>console.log(products)}>
            console log
        </div>
        <div onClick={()=>removeAllFromCart()}>
            remove
        </div>
    </div>
  )
}

export default Price