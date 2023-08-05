"use client"

//Styles
import '@styles/global.css';
import '@styles/fuentesDeLetra.css';

//Styles primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {SessionProvider, signIn, signOut} from "next-auth/react";

export const metadata = {
    title: "Taller M2",
    description: "Taller M2"

}

const RootLayout = ({children}) => {

    return (
        <html lang='en'>
        <body className="bg-gray-body ">
        <SessionProvider>
            <div className="app flex flex-wrap h-full w-full relative">
                {children}
            </div>
        </SessionProvider>
        </body>
        </html>
    )
}

export default RootLayout