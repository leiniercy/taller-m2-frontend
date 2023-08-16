"use client"

import React, {useEffect, useState} from "react";
import AppSidebar from "@components/layout/AppSidebar";
import AppTopbarDesktop from "@components/layout/AppTopbarDesktop";
import {useSession} from "next-auth/react";
import {setCookie} from "cookies-next";


const HomeLayout = ({children}) => {

    const { data: session } = useSession();
    setCookie('rol', session?.user.rol);

    const [appSidebarVisible, setAppSidebarVisible] = useState(true);

    const handleClick = () => {
        setAppSidebarVisible(!appSidebarVisible);
    }

    return (
        <>
            {/*<AppTopbarMovile visible={visible} handleSidebar={handleSidebar} />*/}
            <AppTopbarDesktop handleClick={handleClick}/>
            <div className="relative top-3rem sm:top-3rem md:top-100px grid col-12" style={{height: '100%'}}>
                {appSidebarVisible && <AppSidebar/>}
                   {children}
            </div>
        </>
    );
}

export default HomeLayout;
