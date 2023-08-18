"use client"


import Link from 'next/link'
import {useState} from "react";
import { useSession } from 'next-auth/react'

const AppMenu = () => {

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    });

    const [openMenusProduct, setOpenMenusProduct] = useState([]);
    const [openMenusCliente, setOpenMenusCliente] = useState([]);

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



    if(session?.user.rol==='ROLE_MODERATOR'){
        return (
            <ul className="menu">
                <li className="mt-2">
                    <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                       href="/taller"><i
                        className="pi pi-home"></i> Inicio</a>
                </li>
                <li className="dropdown">
                    <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClickCliente(0)}>
                        <span className="text-xl pl-3 py-3">Clientes</span>
                        <i className={!openMenusCliente.includes(0) ? 'py-4 pi pi-angle-down': 'py-4 pi pi-angle-up'} ></i>
                    </div>
                    {openMenusCliente.includes(0) && (
                        <ul className="submenu">
                            <li className="">
                                <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                                   href="/taller/cliente/taller2M"><i
                                    className="pi pi-user"></i> Taller 2M</a>
                            </li>
                            <li className="">
                                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                                   href="/taller/cliente/tallerMJ"><i
                                    className="pi pi-user"></i> Taller MJ</a>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="">
                    <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                       href="/taller/ventas"><i
                        className="pi pi-shopping-cart"></i> Ventas</a>
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
                <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClickCliente(0)}>
                    <span className="text-xl pl-3 py-3">Clientes</span>
                    <i className={!openMenusCliente.includes(0) ? 'py-4 pi pi-angle-down': 'py-4 pi pi-angle-up'} ></i>
                </div>
                {openMenusCliente.includes(0) && (
                    <ul className="submenu">
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                               href="/taller/cliente/taller2M"><i
                                className="pi pi-user"></i> Taller 2M</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/cliente/tallerMJ"><i
                                className="pi pi-user"></i> Taller MJ</a>
                        </li>
                    </ul>
                )}
            </li>

            <li className="dropdown">
                <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClickProducts(0)}>
                    <span className="text-xl pl-3 py-3">Productos</span>
                    <i className={!openMenusProduct.includes(0) ? 'py-4 pi pi-angle-down': 'py-4 pi pi-angle-up'}></i>
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
            {/*<li className="dropdown">*/}
            {/*    <span onClick={() => handleMenuClick(1)}>Acerca de</span>*/}
            {/*    {openMenus.includes(1) && (*/}
            {/*        <ul className="submenu">*/}
            {/*            <li>Equipo</li>*/}
            {/*            <li>Misión y visión</li>*/}
            {/*        </ul>*/}
            {/*    )}*/}
            {/*</li>*/}
            <li className="">
                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                   href="/taller/ventas"><i
                    className="pi pi-shopping-cart"></i> Ventas</a>
            </li>
        </ul>
    );
};

export default AppMenu;