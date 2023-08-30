"use client"

import '@styles/global.css';
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
            <div className="relative top-120px sm:top-120px md:top-120px lg:top-100px  flex flex-row flex-wrap  flex-grow-0 flex-shrink-0 w-full" style={{height: '100%', flexBasis: 'auto'}}>
                {appSidebarVisible && <AppSidebar/>}
                   {children}
            </div>
        </>
    );
}

export default HomeLayout;
