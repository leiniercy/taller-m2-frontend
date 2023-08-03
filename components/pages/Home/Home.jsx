import {signIn, signOut, useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {Sidebar} from "primereact/sidebar";
import Login from "@components/pages/Login/Login";
import LoginButton from "@components/pages/Login/LoginButton";
import AppSidebar from "@components/layout/AppSidebar";
import AppTopbarDesktop from "@components/layout/AppTopbarDesktop";
// import AppTopbarMovile from "@components/layout/AppTopbarMovile"
const Home = ({children}) => {

    const {data: session} = useSession();

    const [visible, setVisible] = useState(false);
    const [appSidebarVisible, setAppSidebarVisible] = useState(true);


    // useEffect(() => {
    //Decodicacion del token de autenticion para obtener el usuario
    // const token = localStorage.getItem("token");
    // const tokenDecode = jwt.decode(token);
    // //Utilizar tokenExpirationDate para cerrar la cession
    // const tokenExpirationDate = tokenDecode.exp;
    // const tokenUser = tokenDecode.user;
    // const newUser = {
    //     username: tokenUser.username,
    //     roles: tokenUser.roles
    // }
    // setUser(newUser);
    // }, []);

    const handleSidebar = () =>{
       setVisible(!visible);
    }

    const handleClick = () => {
        setAppSidebarVisible(!appSidebarVisible);
    }

    // top-3rem sm:top-3rem md:top-100px

    return (

        <div className="app flex flex-wrap h-full w-full relative">
            {session?.user ? (
                //SI ESTA LOGUEADO
                <div className='h-full w-full relative'>
                    {/*<AppTopbarMovile visible={visible} handleSidebar={handleSidebar} />*/}
                    <AppTopbarDesktop handleClick={handleClick}/>
                    <div className="relative top-3rem sm:top-3rem md:top-100px grid">
                    {appSidebarVisible && <AppSidebar/>}
                    {children}
                    </div>
                </div>
                // <AppFooter/>
            ) : (
                //SI NO ESTA LOGUEADO
                <Login/>
            )}
        </div>
    );
};

export default Home;