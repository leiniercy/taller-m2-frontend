import NextAuth from "next-auth"
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

                const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/auth/signin', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                })

                const user = await res.json();

                //If no error and we have user data, return it
                if (res.ok && user) {
                    const tokenDecode = jwt.decode(user.token);
                    //Utilizar tokenExpirationDate para cerrar la cession
                    const tokenExpirationDate = tokenDecode.exp;
                    const tokenUser = tokenDecode.user;
                    return {
                        id: tokenUser.id,
                        name: tokenUser.name,
                        email: tokenUser.email,
                        taller: tokenUser.taller,
                        rol: tokenUser.roles[0]
                    }

                } else {
                    //Return null if user data could not be retrieved
                    throw new Error("Incorrect_credentials");
                    return null;
                }

            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({token, user}) {
            return ({...token, ...user});
        },
        async session({session, token, user}) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: "/",
        error: '/',
        signOut: '/'
    },

};
export default NextAuth(authOptions)