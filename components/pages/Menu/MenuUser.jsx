


const MenuUser = (props) => {

    if (props.taller === "Taller 2M") {
        return (<ul className="menu">
            <li className="mt-2">
                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                   href="/taller/informacion/taller2M"><i
                    className="pi pi-home"></i> Inicio</a>
            </li>
            <li className="mt-2">
                <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                   href="/taller/informacion/tallerMJ"><i
                    className="pi pi-box"></i> Taller MJ</a>
            </li>
            <li className="">
                <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
                   href="/taller/ventas/taller2M"><i
                    className="pi pi-shopping-cart"></i> Ventas</a>
            </li>
        </ul>);
    }else{
        // Taller MJ
        return (<ul className="menu">
                <li className="mt-2">
                    <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                       href="/taller/informacion/tallerMJ"><i
                        className="pi pi-home"></i> Inicio</a>
                </li>
                <li className="mt-2">
                    <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                       href="/taller/informacion/taller2M"><i
                        className="pi pi-box"></i> Taller 2M</a>
                </li>
                <li className="">
                    <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
                       href="/taller/ventas/tallerMJ"><i
                        className="pi pi-shopping-cart"></i> Ventas</a>
                </li>
            </ul>
        );
    }

}
export default MenuUser;