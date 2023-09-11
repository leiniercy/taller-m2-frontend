"use client"

import {useState} from "react";


const MenuModerador = (props) => {

    const [openMenusProduct, setOpenMenusProduct] = useState([]);
    const [openMenusInfo, setOpenMenusInfo] = useState([]);
    const handleMenuClickProducts = (index) => {
        if (openMenusProduct.includes(index)) {
            setOpenMenusProduct(openMenusProduct.filter((i) => i !== index));
        } else {
            setOpenMenusProduct([...openMenusProduct, index]);
        }
    };
    const handleMenuClickInfo = (index) => {
        if (openMenusInfo.includes(index)) {
            setOpenMenusInfo(openMenusInfo.filter((i) => i !== index));
        } else {
            setOpenMenusInfo([...openMenusInfo, index]);
        }
    };


    return(<ul className="menu">
        <li className="mt-2">
            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
               href="/taller"><i
                className="pi pi-home"></i> Inicio</a>
        </li>
        <li className="dropdown">
            <div className="w-full flex flex-row justify-content-between" onClick={() => handleMenuClickInfo(0)}>
                <span className="text-xl pl-3 py-3">Información</span>
                <i className={!openMenusInfo.includes(0) ? 'py-4 pi pi-angle-down' : 'py-4 pi pi-angle-up'}></i>
            </div>
            {openMenusInfo.includes(0) && (
                <ul className="submenu">
                    <li className="">
                        <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                           href="/taller/informacion/taller2M"><i
                            className="pi pi-box"></i> Taller 2M</a>
                    </li>
                    <li className="">
                        <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                           href="/taller/informacion/tallerMJ"><i
                            className="pi pi-box"></i> Taller MJ</a>
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

        {props.taller === 'Taller 2M' ?
            //Ventas 2M
            <li className="">
                <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                   href="/taller/ventas/taller2M"><i
                    className="pi pi-shopping-cart"></i> Ventas</a>
            </li>
            :
            //Ventas MJ
            <li className="">
                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                   href="/taller/ventas/tallerMJ"><i
                    className="pi pi-shopping-cart"></i> Taller MJ</a>
            </li>            }
    </ul>)
}

export default MenuModerador;