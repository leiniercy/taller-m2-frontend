"use client"

import Link from 'next/link'
import {useState} from "react";


const AppSidebar = (props) => {

    // const items = [
    //     {
    //         label: 'Inicio',
    //         icon: 'pi pi-home',
    //         url: '/',
    //     },
    //     {
    //         label: 'Productos',
    //
    //         items: [
    //             {
    //                 label: 'Accesorios',
    //                 icon: 'pi pi-amazon',
    //                 url: '/producto',
    //
    //             },
    //             {
    //                 label: 'Celulares',
    //                 icon: 'pi pi-amazon',
    //                 url: '/',
    //             },
    //         ]
    //     },
    //     {
    //         label: 'Ventas',
    //         icon: 'pi pi-shopping-cart',
    //         url: '/ventas',
    //     },
    //     {
    //         label: 'Usuarios',
    //         icon: 'pi pi-user',
    //         url: '/',
    //     },
    // ]

    const [openMenus, setOpenMenus] = useState([]);

    const handleMenuClick = (index) => {
        if (openMenus.includes(index)) {
            setOpenMenus(openMenus.filter((i) => i !== index));
        } else {
            setOpenMenus([...openMenus, index]);
        }
    };


    return (
        <div className="hidden sm:hidden md:flex md:col-fixed md:relative" style={{width: '240px'}}>
            <div className="p-3 fixed z-1" style={{height: 'calc(100vh - 9rem)', width: '240px', left: '-5px'}}>
                <div
                    className="bg-gray-items p-3 border-round-sm h-full w-full font-bold flex flex-column overflow-y-auto">
                    {/*<PanelMenu model={items} className=""/>*/}

                    <ul className="menu">
                        <li className="mt-2">
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                               href="/"><i
                                className="pi pi-home"></i> Home</a>
                        </li>

                        <li className="dropdown">
                            <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClick(0)}>
                                <span className="text-xl pl-3 py-1" >Productos</span>
                                <i className="pi pi-angle-down py-2"></i>
                            </div>
                            {openMenus.includes(0) && (
                                <ul className="submenu">
                                    <li className="">
                                        <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                                           href="/producto"><i
                                            className="pi pi-amazon"></i> Accesorios</a>
                                    </li>
                                    <li className="">
                                        <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                                           href="/producto"><i
                                            className="pi pi-amazon"></i> Moviles</a>
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
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m" href="/ventas"><i
                            className="pi pi-shopping-cart"></i> Ventas</a>
                        </li>
                        <li>
                            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m" href="/cliente"><i
                                className="pi pi-user"></i> Clientes</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );

}

export default AppSidebar;