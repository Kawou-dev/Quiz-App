"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginForm = () => {

    const [email , setEmail] = useState('') ; 
    const [password , setPassword] = useState('') ; 
    const router = useRouter( )  ;

    const handleSubmit = async(e) => {
          e.preventDefault() ; 


          const res = await signIn('credentials' , {
            email , password , redirect : false 
          })

          if(res.ok){
            router.replace("dashboard")
          }




         
    }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
            <form onSubmit={handleSubmit} className='border-2 gap-2 shadow-md p-3 rounded-md w-[350px] '>
                <h1>Login</h1>

                <div className='flex flex-col gap-3 mt-3'>
                    <input onChange={e=> setEmail(e.target.value)} className='border-2 ' type="email" placeholder='Entrer votre email' />
                    <input onChange={e=> setPassword(e.target.value)} className='border-2 ' type="password" placeholder='Entrer votre password' />
                </div>

                <button className='flex mx-auto mt-4 bg-green-300 px-3  py-1 '>Login</button>
                <p>Don`t have an account  <span className='underline ml-4 '><Link href={'/register'}>Register</Link></span>   </p>

            </form>

    </div>
  )
}

export default LoginForm
