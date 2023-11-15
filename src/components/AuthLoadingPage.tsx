"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

type Props = {
    children: React.ReactNode;
  };

const AuthLoadingPage = ({children} : Props) => {
  const session = useSession();
  if(session.status === "loading"){
    return (
      <div className='w-screen h-screen grid place-items-center' >
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
      </div>
    )
  } else {
    return (
      <div>{children}</div>
    )
  }
}

export default AuthLoadingPage