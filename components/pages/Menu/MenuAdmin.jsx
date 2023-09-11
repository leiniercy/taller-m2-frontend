

const MenuAdmin = () => {

    return(<ul className="menu">
        <li className="">
            <a className="block no-underline text-xl pl-3 py-3 pr-2  border-round link-hover text-color-blue-2m"
               href="/taller/user"><i
                className="pi pi-user"></i> Usuario</a>
        </li>
        <li className="">
            <a className="block no-underline text-xl pl-3 py-3 pr-2 border-round link-hover text-color-blue-2m"
               href="/taller/user/customer"><i
                className="pi pi-users"></i> Cliente</a>
        </li>
    </ul>);


}

export default MenuAdmin;
