"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


const Dasborad = () => {

    const {data:session} =  useSession()

  return (
    <div className='flex justify-center items-center h-screen'>

        <div className='w-80 h-64 shadow-md border-2 rounded-md flex pl-4 p-3 flex-col  gap-3 '  >
                          <h1 className='text-xl'>Nom: {session?.user?.name}  </h1>

                          <h1 className='text-xl'>Email: {session?.user?.email}  </h1>

                              <p className='text-center mt-1 text-xl'>Wanna play a Game</p>
                              <Link className='bg-green-400 p-1 text-white text-center ' href={"dashboard/quizapp"}>
                              <button >
                                         Jouer
                              </button>
                              </Link>
                              

                        <button  onClick={() => signOut()}
                        className='bg-red-500 p-1 text-white'>Log Out</button>
        </div>
    
    </div>
  )
}

export default Dasborad
