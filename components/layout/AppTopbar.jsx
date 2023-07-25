"use client"

import React,{useState}  from 'react';
import {Button} from "primereact/button";


function AppTopbar(props) {

    const [sidebarVisible, setSideBarVisible] = useState(props.visible);

    const handleClick = () =>{
        setSideBarVisible(!sidebarVisible);
    }


    return (
        <div className="grid w-full">
            <div className="col-fixed" style={{width: '100px' }}>
                <div className="text-center p-3 border-round-sm bg-primary font-bold">
                    <button icon="pi pi-bars" onClick={handleClick}>Boton</button>
                    {/*<Button icon="pi pi-bars" onClick={handleClick}/>*/}
                </div>
            </div>
            <div className="col">
                <div className="text-center p-3 border-round-sm bg-primary font-bold">auto</div>
            </div>
        </div>
    )
}

export default AppTopbar;

