"use client"

import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

import AppTopbarMovile from "@components/layout/AppTopBarMovile";
import AppSidebar from "@components/layout/AppSidebar";
import AppTopbarDesktop from "@components/layout/AppTopbarDesktop";


const HomeLayout = ({children}) => {

    const { data: session } = useSession();

    const [appSidebarVisible, setAppSidebarVisible] = useState(true);
    const [visible, setVisible] = useState(false);


    const handleSidebar = () => {
        setVisible(!visible);
    }

    const handleClick = () => {
        setAppSidebarVisible(!appSidebarVisible);
    }

    return (
        <>
            <AppTopbarMovile visible={visible} handleSidebar={handleSidebar} />
            <AppTopbarDesktop handleClick={handleClick}/>
            <div className="relative top-8rem sm:top-8rem md:top-100px grid col-12" style={{height: '100%'}}>
                {appSidebarVisible && <AppSidebar/>}
                   {children}
            </div>
        </>
    );
}

export default HomeLayout;
