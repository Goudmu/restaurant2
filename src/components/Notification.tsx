"use client"
import React from 'react'
import {useSession} from 'next-auth/react';

const Notification = () => {
  const session = useSession()

  return (
    <div>
      {session.status === "authenticated" ?
        <div className='bg-red-500 text-white flex px-4 py-1' >
          <div className='flex-1 pl-2' >Hello {session.data.user.name}</div>
          <div className='flex-1 items-center justify-center text-center' >50% ON SUNDAY</div>
          <div className='flex-1'></div>
        </div>
      :
      <div className='h-12 bg-red-500 text-white px-4 py-1 flex 
      items-center justify-center text-center text-sm 
      md:text-base cursor-pointer'>
        50% ON SUNDAY
      </div>
      }
    </div>
  )
}

export default Notification