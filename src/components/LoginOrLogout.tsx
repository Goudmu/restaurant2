"use client"
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {signOut} from "next-auth/react";

const LoginOrLogout = () => {
    const session = useSession();
  return (
    <div>
        {session.status !== "authenticated" 
        ? 
            <Link href="/login" >Login</Link> 
        :
        session.data.user.isAdmin 
        ? 
            <div className='flex gap-4' >
                <Link href="/orders" >Orders</Link>
                <Link href="/add" >Add</Link>
                <button type='button' onClick={() => signOut()} >LOG OUT</button>
            </div>
        :
            <div className='flex gap-4' >
                <Link href="/orders" >Orders</Link>
                <button type='button' onClick={() => signOut()} >LOG OUT</button>
            </div>
        }
    </div>
  )
}

export default LoginOrLogout