import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

// Configuration de NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
           
        const {email , password} = credentials ; 

         try {
            await connectMongoDB() ; 

            const user = await User.findOne({email})
    
            if(!user){
                console.log("Email incorrect")
                return null ; 
            }
    
            const passwordMatch = await bcrypt.compare(password ,user.password)
            if(!passwordMatch){
                console.log("Mot de pass incorect")
                return null ; 
            }
    
            return user ; 

         } catch (error) {
            console.log("Error" , error)
         }
        
           

      }
    })
  ],
  session: {
    strategy: 'jwt', // Utilise JWT pour la gestion de la session
  },
  secret: process.env.NEXTAUTH_SECRET, // Clé secrète pour la signature des tokens JWT
  pages: {
    signIn: '/' // Définir la page de connexion
  }
};

// Gestionnaire d'authentification
const handler = NextAuth(authOptions);

// Exporte les méthodes HTTP pour Next.js
export { handler as GET, handler as POST };
