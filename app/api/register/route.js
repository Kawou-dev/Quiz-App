//  app/api/register/route.js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


export async function POST(req){

    const {name , email , password} = await req.json() ; 

    console.log("Name : " , name ) ; 
    console.log("Email : " , email ) ; 
    console.log("Password : " , password ) ; 

   await connectMongoDB() ; 
   const hashPassword = await bcrypt.hash(password , 10) ; 
   await User.create({name , email , password : hashPassword})

    try {
          return NextResponse.json({message : "Succed"} , {status : 201})
    } catch (error) {
        return NextResponse.json({message : "Failed"} , {status : 500})
    }

}