"use client"
import { POST } from '@/app/api/register/route';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterForm = () => {
    const [name , setName] = useState('') ; 
    const [email , setEmail] = useState('') ; 
    const [password , setPassword   ] = useState('') ; 
    const [error , setError] = useState('')
    const router = useRouter() ; 

   
            // envoie des données a api
        const handleSubmit = async(event) => {
            event.preventDefault() ; 

            const res = await fetch('/api/register' ,  {
                method : 'POST' , 
                headers : {
                    'Content-type' : 'application/json'
                } , 
                body : JSON.stringify({name , email , password})
            })
            if(res.ok){
                console.log("Registration succesfull")
                router.push('../dashboard')
            }else{
                console.log("Registration failed")
            }

          

            const form = event.target ; 
            form.reset() ; 


            
        }

    
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
            <form onSubmit={handleSubmit} className='border-2 gap-2 shadow-md p-3 rounded-md w-[350px] '>
                <h1 className='font-semibold  text-2xl'>Register</h1>

                <div className='flex flex-col gap-3 mt-3'>
                    <input  onChange={(e) => setName(e.target.value)}  className='border-2 ' type="text" placeholder='Entrer votre nom' />
                    <input  onChange={(e) => setEmail(e.target.value)}  className='border-2 ' type="email" placeholder='Entrer votre email' />
                    <input  onChange={(e) => setPassword(e.target.value)}  className='border-2 ' type="password" placeholder='Entrer votre password' />
                </div>
 
                {error && (
                    <div className='mt-3 bg-red-600 w-32 py-1 text-white text-center '>{error}</div>
                )}

                <button className='flex mx-auto mt-4 mb-3 bg-green-300 px-3  py-1 '>Register</button>
                <p>Dont have an account  <span className='underline ml-4 '><Link href={'/'}>Login</Link></span>   </p>

            </form>

    </div>
  )
}

export default RegisterForm
