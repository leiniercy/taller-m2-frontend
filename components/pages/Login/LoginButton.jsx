"use client";

import { useRef } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from 'primereact/avatar';
import { SplitButton } from 'primereact/splitbutton';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

const LoginButton = () => {

    const { data: session } = useSession();


    const menu = useRef(null);

    const items = [
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-user',
        },{
            separator: true
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                signOut();
            }
        }
    ];


    return (
        <div className="ml-auto flex gap-2">
            {session?.user ? (
                <>
                    <Avatar icon="pi pi-user" size="large" />
                    {/*<SplitButton label={session.user.name} severity="secondary"  text model={items} />*/}
                    <Menu model={items} popup ref={menu} id="popup_menu_left" />
                    <Button label={session.user.name}
                            severity="secondary" text
                            onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
                </>
            ) : (
                <button className="text-green-600" onClick={() => signIn()}>
                    Sign In
                </button>
            )}
        </div>
    );
};

export default LoginButton;
