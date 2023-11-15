"use client"

import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import {useSession} from 'next-auth/react';
import {signIn} from "next-auth/react";
import Image from 'next/image';
import { UserType } from '@/types/types';

let users:UserType[];

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    const session = useSession();

    useEffect(() => {
      const getData = async () => {
        const res = await fetch("http://localhost:3000/api/user", {
          cache: "no-store"
        })
      
        if(!res.ok){
          throw new Error("failed")
        }
        await res.json().then(res => {
          if(session.status === "authenticated"){
            let isExist = false; 
            if(res != undefined){
              res.map((e:UserType) => {
                if(session.data?.user?.email == e.username){
                  isExist = true
                  router.push('/')
                }
              })
              if(!isExist){
                addUser().then(() => router.push('/'))
              }
            }
          }
        })
      }
      getData()
    },[])

    const loginHandler = () => {
      let login = false; 
      if(users != undefined){
        users.map(data => {
          if(username == data.username){
            if(password == data.password){
              login = true
              router.push('/')
            }
          }
        })
      }
      if(!login){
        console.log("USERNAME ATAU PASSWORD SALAH")
      }
    }

    const addUser = async () => {
      const res = await fetch("http://localhost:3000/api/user",{
        method: "POST",
        body: JSON.stringify({
          username: session.data?.user?.email,
          password: "asd",
          isAdmin: false,
        })
      })
    }

    // useEffect(()=> {
    //   console.log("use effek")
    //   if(session.status === "authenticated"){
    //     let isExist = false; 
    //     if(users != undefined){
    //       users.map(data => {
    //         if(session.data?.user?.email == data.username){
    //           isExist = true
    //           router.push('/')
    //         }
    //       })
    //       if(!isExist){
    //         addUser().then(() => router.push('/'))
    //       }
    //     }
    //   }
    // },[])

    if(session.status === "authenticated"){
      let isExist = false; 
      if(users != undefined){
        users.map(data => {
          if(session.data?.user?.email == data.username){
            isExist = true
            router.push('/')
          }
        })
        if(!isExist){
          addUser()
        }
      }
    }

  return (
    <div>
      {/* <form action="" className="flex flex-col" >
          <label className="text-red-500" onClick={() => console.log(users)} >UserName</label>
          <input type="text" name="" id="1" className="bg-red-100 rounded-md" value={username} onChange={e => setUsername(e.target.value)} />
          <label className="text-red-500">Password</label>
          <input type="password" name="" id="2" className="bg-red-100 rounded-md" value={password} onChange={e => setPassword(e.target.value)} />
          <button type='button' onClick={loginHandler} >Login</button>
      </form> */}
      <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
    </div>

  )
}

export default Login