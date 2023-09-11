"use client"

//Components
import Ventas from "@components/pages/Ventas/Ventas";
import {useSession} from "next-auth/react";

export default function TallerMJVentas() {

    const {data: session, status} = useSession();
    if (status === 'authenticated' &&
        session?.user !== undefined &&
        (session?.user.rol === "ROLE_MODERATOR" || session?.user.rol === "ROLE_USER") &&
        session?.user.taller !== 'Taller MJ') {
        throw new Error('Access denied')
    }

    return (<Ventas
        taller={"Taller MJ"}
    />)

}