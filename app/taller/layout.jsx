"use client"

import '@styles/global.css';
import React, {useEffect, useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
//Components
import AppTopbarMovile from "@components/layout/AppTopBarMovile";
import AppSidebar from "@components/layout/AppSidebar";
import AppTopbarDesktop from "@components/layout/AppTopbarDesktop";
import {deleteCookie} from "cookies-next";

const HomeLayout = ({children}) => {

    const {data: session, status} = useSession();

    const [appSidebarVisible, setAppSidebarVisible] = useState(true);
    const [visible, setVisible] = useState(false);


    const handleSidebar = () => {
        setVisible(!visible);
    }

    const handleClick = () => {
        setAppSidebarVisible(!appSidebarVisible);
    }

    useEffect(() => {
        if (status === "authenticated" && session?.user !== undefined)
        //Funcion para cerrar  la sesion dado un tiempo de expiracion del token
        setInterval( () => {
            const currentDate = new Date((new Date()).getTime());
            if (currentDate > session?.user.exp) {
                deleteCookie('logged');
                deleteCookie('rol');
                deleteCookie('taller');
                signOut({
                    redirect: true,
                    callbackUrl: "/"
                });
            }
        },60000); // actualiza cada 1 min
    }, [session?.user]);

    return (
        <>
            <AppTopbarMovile visible={visible} handleSidebar={handleSidebar}/>
            <AppTopbarDesktop handleClick={handleClick}/>
            <div
                className="relative top-120px sm:top-120px md:top-120px lg:top-100px  flex flex-row flex-wrap  flex-grow-0 flex-shrink-0 w-full"
                style={{height: '100%', flexBasis: 'auto'}}>
                {appSidebarVisible && <AppSidebar/>}
                {children}
            </div>
        </>
    );
}

export default HomeLayout;
