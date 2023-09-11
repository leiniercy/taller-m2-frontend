"use client"

import {useSession} from 'next-auth/react'
import MenuAdmin from "@components/pages/Menu/MenuAdmin";
import MenuUser from "@components/pages/Menu/MenuUser";
import MenuModerador from "@components/pages/Menu/MenuModerador";

const AppMenu = () => {

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    });

    if (status === "authenticated" && session?.user.rol === 'ROLE_USER') {
        return <MenuUser taller={session?.user.taller} />
    } else if (status === "authenticated" && session?.user.rol === 'ROLE_MODERATOR') {
            return <MenuModerador taller={session?.user.taller}/>

    } else if (status === "authenticated" && session?.user.rol === 'ROLE_ADMIN') {
        return <MenuAdmin/>;
    } else {
        return <span
            className='block no-underline text-xl pl-3 py-3 pr-2 border-round text-color-blue-2m'>Cargando</span>
    }


};

export default AppMenu;