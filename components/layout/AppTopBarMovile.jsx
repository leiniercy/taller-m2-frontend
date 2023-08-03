"use client"

//PrimeReact
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {Image} from "primereact/image";

//Components
import LoginButton from "@components/pages/Login/LoginButton";


function AppTopbarMovile(props) {


    return (<div
        className="bg-primary flex sm:flex sm:flex-row md:hidden h-3rem align-items-center justify-content-between w-full fixed z-1">
        <div>
            Logo
        </div>
        <div className="">
            <Sidebar visible={props.visible} onHide={props.handleSidebar}>
                <a href="#">link</a>
                <a href="#">link</a>
                <a href="#">link</a>
            </Sidebar>
            <Button icon="pi pi pi-bars" onClick={props.handleSidebar}/>
        </div>
    </div>);
}