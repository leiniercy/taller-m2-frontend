"use client"


import Link from 'next/link'
import {useState} from "react";

const AppMenu = () => {

    const [openMenus, setOpenMenus] = useState([]);

    const handleMenuClick = (index) => {
        if (openMenus.includes(index)) {
            setOpenMenus(openMenus.filter((i) => i !== index));
        } else {
            setOpenMenus([...openMenus, index]);
        }
    };


    return (
        <ul className="menu">
            <li className="mt-2">
                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                   href="/taller"><i
                    className="pi pi-home"></i> Inicio</a>
            </li>

            <li className="dropdown">
                <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClick(0)}>
                    <span className="text-xl pl-3 py-1">Productos</span>
                    <i className="pi pi-angle-down py-2"></i>
                </div>
                {openMenus.includes(0) && (
                    <ul className="submenu">
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                               href="/taller/producto/accesorio"><i
                                className="pi pi-amazon"></i> Accesorios</a>
                        </li>
                        <li className="">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/taller/producto/charger"><i
                                className="pi pi-amazon"></i>Cargadores</a>
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
            <li>
                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                   href="/taller/cliente"><i
                    className="pi pi-user"></i> Clientes</a>
            </li>
        </ul>
    );
};

export default AppMenu;