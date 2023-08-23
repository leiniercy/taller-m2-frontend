"use client"


import Link from 'next/link'
import {useState} from "react";
import {useSession} from 'next-auth/react'

const AppMenu = () => {

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    });

    const [openMenusProduct, setOpenMenusProduct] = useState([]);
    const [openMenusCliente, setOpenMenusCliente] = useState([]);
    const [openMenusVentas, setOpenMenusVentas] = useState([]);
    const [openMenusUsers, setOpenMenusUsers] = useState([]);

    const handleMenuClickProducts = (index) => {
        if (openMenusProduct.includes(index)) {
            setOpenMenusProduct(openMenusProduct.filter((i) => i !== index));
        } else {
            setOpenMenusProduct([...openMenusProduct, index]);
        }
    };

    const handleMenuClickCliente = (index) => {
        if (openMenusCliente.includes(index)) {
            setOpenMenusCliente(openMenusCliente.filter((i) => i !== index));
        } else {
            setOpenMenusCliente([...openMenusCliente, index]);
        }
    };
    const handleMenuClickVentas = (index) => {
        if (openMenusVentas.includes(index)) {
            setOpenMenusVentas(openMenusVentas.filter((i) => i !== index));
        } else {
            setOpenMenusVentas([...openMenusVentas, index]);
        }
    };

    const handleMenuClickUsers = (index) => {
        if (openMenusUsers.includes(index)) {
            setOpenMenusUsers(openMenusUsers.filter((i) => i !== index));
        } else {
            setOpenMenusUsers([...openMenusUsers, index]);
        }
    };


    if (session?.user.rol === 'ROLE_MODERATOR') {
        return (
            <ul className="menu">
                <li className="mt-2">
                    <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                       href="/taller"><i
                        className="pi pi-home"></i> Inicio</a>
                </li>
                <li className="dropdown">
                    <div className="w-full flex flex-row justify-content-between"
                         onClick={() => handleMenuClickCliente(0)}>
                        <span className="text-xl pl-3 py-3">Información</span>
                        <i className={!openMenusCliente.includes(0) ? 'py-4 pi pi-angle-down' : 'py-4 pi pi-angle-up'}></i>
                    </div>
                    {openMenusCliente.includes(0) && (
                        <ul className="submenu">
                            <li className="">
                                <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                                   href="/taller/informacion/taller2M"><i
                                    className="pi pi-user"></i> Taller 2M</a>
                            </li>
                            <li className="">
                                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                                   href="/taller/informacion/tallerMJ"><i
                                    className="pi pi-user"></i> Taller MJ</a>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="dropdown">
                    <div className="w-full flex flex-row justify-content-between"
                         onClick={() => handleMenuClickVentas(0)}>
                        <span className="text-xl pl-3 py-3">Ventas</span>
                        <i className={!openMenusVentas.includes(0) ? 'py-4 pi pi-angle-down' : 'py-4 pi pi-angle-up'}></i>
                    </div>
                    {openMenusVentas.includes(0) && (
                        <ul className="submenu">
                            <li className="">
                                <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                                   href="/taller/ventas/taller2M"><i
                                    className="pi pi-shopping-cart"></i> Taller 2M</a>
                            </li>
                            <li className="">
                                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                                   href="/taller/ventas/tallerMJ"><i
                                    className="pi pi-shopping-cart"></i> Taller MJ</a>
                            </li>
                        </ul>
                    )}
                </li>

            </ul>
        )
    }


    return (
        <ul className="menu">
            <li className="mt-2">
                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                   href="/taller"><i
                    className="pi pi-home"></i> Inicio</a>
            </li>


            <li className="dropdown">
                <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClickUsers(0)}>
                    <span className="text-xl pl-3 py-3">Usuarios</span>
                    <i className={!openMenusUsers.includes(0) ? 'py-4 pi pi-angle-down' : 'py-4 pi pi-angle-up'}></i>
                </div>
                {openMenusUsers.includes(0) && (
                    <ul className="submenu">
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                               href="/taller/user"><i
                                className="pi pi-user"></i> Usuario</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/user/customer"><i
                                className="pi pi-user"></i> Cliente</a>
                        </li>
                    </ul>
                )}
            </li>


            <li className="dropdown">
                <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClickCliente(0)}>
                    <span className="text-xl pl-3 py-3">Información</span>
                    <i className={!openMenusCliente.includes(0) ? 'py-4 pi pi-angle-down' : 'py-4 pi pi-angle-up'}></i>
                </div>
                {openMenusCliente.includes(0) && (
                    <ul className="submenu">
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                               href="/taller/informacion/taller2M"><i
                                className="pi pi-user"></i> Taller 2M</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/informacion/tallerMJ"><i
                                className="pi pi-user"></i> Taller MJ</a>
                        </li>
                    </ul>
                )}
            </li>

            <li className="dropdown">
                <div className="w-full flex flex-row justify-content-between"
                     onClick={() => handleMenuClickProducts(0)}>
                    <span className="text-xl pl-3 py-3">Productos</span>
                    <i className={!openMenusProduct.includes(0) ? 'py-4 pi pi-angle-down' : 'py-4 pi pi-angle-up'}></i>
                </div>
                {openMenusProduct.includes(0) && (
                    <ul className="submenu">
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                               href="/taller/producto/accesorio"><i
                                className="pi pi-amazon"></i> Accesorios</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/producto/charger"><i
                                className="pi pi-amazon"></i> Cargadores</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/producto/movile"><i
                                className="pi pi-amazon"></i> Moviles</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/producto/reloj"><i
                                className="pi pi-amazon"></i> Relojes</a>
                        </li>
                    </ul>
                )}
            </li>
            <li className="dropdown">
                <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClickVentas(0)}>
                    <span className="text-xl pl-3 py-3">Ventas</span>
                    <i className={!openMenusVentas.includes(0) ? 'py-4 pi pi-angle-down' : 'py-4 pi pi-angle-up'}></i>
                </div>
                {openMenusVentas.includes(0) && (
                    <ul className="submenu">
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                               href="/taller/ventas/taller2M"><i
                                className="pi pi-shopping-cart"></i> Taller 2M</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/ventas/tallerMJ"><i
                                className="pi pi-shopping-cart"></i> Taller MJ</a>
                        </li>
                    </ul>
                )}
            </li>
        </ul>
    );
};

export default AppMenu;