// import { authOptions } from "@/utils/auth";
// import NextAuth from "next-auth/next";

// const handler = NextAuth(authOptions)

// export {handler as GET, handler as POST}


import NextAuth, {User} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/utils/connect";

declare module "next-auth"{
    interface Session{
        user:User & {
            isAdmin: Boolean
        }
    }
}
declare module "next-auth/jwt"{
    interface JWT{
        isAdmin: Boolean
    }
}

const handler = NextAuth({
    session:{
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId: "52332884393-s99b4rrvnklkdq6fpm5b13cj7970np0a.apps.googleusercontent.com",
            clientSecret: "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"
        })
    ],
    callbacks:{
        async session({token, session}){
            if(token){
                session.user.isAdmin = token.isAdmin
            }
            return session
        },
        async jwt({token}){
            const userInDb = await prisma.user.findUnique({
                where:{
                    username:token.email!
                }
            })
            token.isAdmin = userInDb?.isAdmin!
            return token
        }
    }
})

export {handler as GET, handler as POST}

// import NextAuth, {User} from "next-auth"
// import GoogleProvider from "next-auth/providers/google";
// const handler = NextAuth({
    
//     providers:[
//         GoogleProvider({
//             clientId: "52332884393-s99b4rrvnklkdq6fpm5b13cj7970np0a.apps.googleusercontent.com",
//             clientSecret: "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"
//         })
//     ]
// })

// export {handler as GET, handler as POST}