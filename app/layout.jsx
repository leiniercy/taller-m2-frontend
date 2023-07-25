"use client"

//Styles
import '@styles/global.css';

import React, {useState} from "react";
import AppTopbar from "@components/layout/AppTopbar";
import AppSidebar from "@components/layout/AppSidebar";
import AppFooter from "@components/layout/AppFooter";
// import Logo from "@public/assets/images/tallerM2.png"
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {Image} from 'primereact/image';

export const metadata = {
    title: "Taller M2",
    description: "Taller M2"

}

const RootLayout = ({children}) => {

    const [visible, setVisible] = useState(false);
    const [appSidebarVisible, setAppSidebarVisible] = useState(true);
    const handleClick = () => {
        setAppSidebarVisible(!appSidebarVisible);
    }
    const isDesktop = () => {
        return window.innerWidth > 991;
    };
    const isMovile = () => {
        return window.innerWidth < 426;
    }

    const topBarDesktop = (
        <div className="bg-gray-items hidden sm:hidden md:flex md:flex-row w-full fixed z-1">
            <div className="col-fixed flex flex-row justify-content-center   align-items-center"
                 style={{width: '240px'}}>
                <div className="bg-gray-items text-center border-round-sm font-bold">
                    <Button className="topbar-items" icon="pi pi-bars" onClick={handleClick}/>
                </div>
                <div className="" style={{height: '80px', width: '80px'}}>
                    <Image
                        src="/assets/images/tallerM2.png" alt="Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="col flex flex-column justify-content-center">
                <div className="text-center p-3 border-round-sm font-bold">

                </div>
            </div>
        </div>
    );

    const topBarMovile = (
        <div
            className="bg-primary flex sm:flex sm:flex-row md:hidden h-3rem align-items-center justify-content-between w-full fixed z-1">
            <div>
                Logo
            </div>
            <div className="">
                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <a href="#">link</a>
                    <a href="#">link</a>
                    <a href="#">link</a>
                </Sidebar>
                <Button icon="pi pi pi-bars" onClick={() => setVisible(true)}/>
            </div>
        </div>
    );

    return (
        <html lang='en'>
        <body className="bg-gray-body ">
        {topBarDesktop}
        {topBarMovile}
        <div className='app grid h-full w-full relative sm:relative md:relative top-3rem sm:top-3rem md:top-100px'>
            {appSidebarVisible && <AppSidebar/>}
            {children}
        </div>
        {/*<AppFooter/>*/}
        </body>
        </html>
    )
}

export default RootLayout