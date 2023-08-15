"use client"

import React, {useEffect, useState} from "react";

import AppSidebar from "@components/layout/AppSidebar";
import AppTopbarDesktop from "@components/layout/AppTopbarDesktop";
import {useSession} from "next-auth/react";


const HomeLayout = ({children}) => {

    const [appSidebarVisible, setAppSidebarVisible] = useState(true);
    const { data: session } = useSession();

    const handleClick = () => {
        setAppSidebarVisible(!appSidebarVisible);
    }

    useEffect(()=>{
        console.log(session?.user.name)
    });

    return (
        <div className='h-full w-full relative'>
            {/*<AppTopbarMovile visible={visible} handleSidebar={handleSidebar} />*/}
            <AppTopbarDesktop handleClick={handleClick}/>
            <div className="relative top-3rem sm:top-3rem md:top-100px grid">
                {appSidebarVisible && <AppSidebar/>}
                {children}
            </div>
        </div>
    );
}

export default HomeLayout
