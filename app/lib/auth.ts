import { db } from '@/lib/db';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {compare} from 'bcrypt'

export const authOptions : NextAuthOptions = {
    adapter:PrismaAdapter(db),
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn:"/login"
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text", placeholder: "johnDoe@email.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
           if(!credentials?.email || !credentials?.password){
            return null
           }
           const userExist = await db.user.findUnique({
            where:{
                email:credentials?.email
            }
           })
           if(!userExist){
            return null
           }
           const passwordMatch = await compare(credentials.password,userExist.password)
           if(!passwordMatch){
            return null
           }
           return{
            id:userExist.id,
            email:userExist.email,
            name:userExist.name
           }
          }
        })
      ],
      callbacks:{
        async jwt({ token, user }) {          
          if(user){
            return{
              ...token,
              id:user.id,
              email:user.email,
              name:user.name
            }
          }
          return token
        },
        async session({ session, token }) {
          return{
            ...session,
            user:{
              ...session.user,
              id:token.id,
              email:token.email,
              name:token.name
            }
          }
          }          
      }
}