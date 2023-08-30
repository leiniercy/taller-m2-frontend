"use client"

import {Button} from "primereact/button";
import {Image} from "primereact/image";
import LoginButton from "@components/pages/Login/LoginButton";


function AppTopbarDesktop(props) {

    return (
        <div className="bg-gray-items hidden sm:hidden md:flex md:flex-row w-full flex-grow-0 flex-shrink-0 fixed z-1" style={{flexBasis: '0'}}>
            <div className="col-fixed flex flex-row justify-content-center   align-items-center"
                 style={{width: '240px'}}>
                <div className="bg-gray-items text-center border-round-sm font-bold">
                    <Button className="topbar-items" icon="pi pi-bars" onClick={props.handleClick}/>
                </div>
                <div className="" style={{height: '80px', width: '80px'}}>
                    <Image
                        src="/assets/images/tallerM2-logo.png" alt="Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="col flex flex-column justify-content-center align-items-end">
                <div className="text-center p-3 border-round-sm font-bold">
                    <LoginButton/>
                </div>
            </div>
        </div>
    );
}

export default AppTopbarDesktop

