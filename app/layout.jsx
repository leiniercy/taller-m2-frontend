"use client"

//Styles
import '@styles/global.css';
import '@styles/fuentesDeLetra.css';

//Styles primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {SessionProvider, useSession} from "next-auth/react";

import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {Sidebar} from "primereact/sidebar";

import AppSidebar from "@components/layout/AppSidebar";
import LoginButton from "@components/pages/Login/LoginButton";


import {signIn, signOut} from "next-auth/react";
import Home from "@components/pages/Home/Home";

export const metadata = {
    title: "Taller M2",
    description: "Taller M2"

}

const RootLayout = ({children}) => {

    return (
        <html lang='en'>
        <body className="bg-gray-body ">
        <SessionProvider>
            <Home children={children} />
        </SessionProvider>
        </body>
        </html>
    )
}

export default RootLayout