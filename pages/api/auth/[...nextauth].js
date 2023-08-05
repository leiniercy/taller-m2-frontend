import NextAuth from "next-auth"
import axios from 'axios';
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {

                const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };
                // console.log(credentials);
                // const res = await fetch("http://localhost:8080/api/v1/auth/signin", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //         username: credentials?.username,
                //         password: credentials?.password,
                //     }),
                // })
                // const user = await res.json();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: "/",
         // error: '/auth/error',
        signOut: '/'
    },
};
export default NextAuth(authOptions);