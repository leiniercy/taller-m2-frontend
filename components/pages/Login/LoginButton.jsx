"use client";

import {useRef, useState} from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { deleteCookie } from 'cookies-next';

import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

import DialogChangePassword from "@components/pages/User/DialogChangePassword";



const LoginButton = () => {

    const { data: session } = useSession();
    const menu = useRef(null);
    const [visible, setVisible] = useState(false);
    const items = [
        {
            label: 'Cambiar contraseña',
            icon: 'pi pi-fw pi-user',
            command: () => {
                setVisible(true);
            }
        },{
            separator: true
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                deleteCookie('logged');
                signOut({
                    redirect: true,
                    callbackUrl: "/"
                });
            }
        }
    ];

    const hideDialog = () => {
        setVisible(false);
    }//Ocular el dialog de cambiar contrasena


    return (<>
        <div className="ml-auto flex align-items-center gap-2">
            {/*{session?.user ? (*/}
                <>
                    <Avatar className="h-10 sm:h-10" icon="pi pi-user"/>
                    {/*<SplitButton label={session.user.name} severity="secondary"  text model={items} />*/}
                    <Menu model={items} popup ref={menu} id="popup_menu_left" />
                    <Button label={session?.user.name}
                            severity="secondary" text
                            onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                </>
            {/*) : (*/}
            {/*    <button className="text-green-600" onClick={() => signIn()}>*/}
            {/*        Sign In*/}
            {/*    </button>*/}
            {/*)}*/}
        </div>
        <DialogChangePassword
            user={session?.user}
            visible={visible}
            hideDialog={hideDialog}
        />
    </>);
};

export default LoginButton;
