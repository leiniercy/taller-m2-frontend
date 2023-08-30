"use client"
import React from "react";
//PrimeReact
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {Image} from "primereact/image";
import {Toolbar} from "primereact/toolbar";

//Components
import LoginButton from "@components/pages/Login/LoginButton";
import AppMenu from "@components/layout/AppMenu";


export default function AppTopbarMovile(props) {

    const rightToolbarTemplate = () => {
        return (<div className="text-center border-round-sm font-bold">
                <LoginButton/>
            </div>);
    }
    const leftToolbarTemplate = () => {
        return (<>
            <div className="bg-gray-items text-center border-round-sm font-bold">
                <Button className="topbar-items" icon="pi pi pi-bars" onClick={props.handleSidebar}/>
            </div>
            <div className="" style={{height: '80px', width: '80px'}}>
                <Image
                    src="/assets/images/tallerM2-logo.png" alt="Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                />
            </div>
            <Sidebar visible={props.visible} onHide={props.handleSidebar} >
                <AppMenu/>
            </Sidebar>
        </>);
    }

    return (<Toolbar
        className="bg-gray-items md:hidden  w-full fixed z-1"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
    />);
}