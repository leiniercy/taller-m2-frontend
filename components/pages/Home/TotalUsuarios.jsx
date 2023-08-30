"use client"

import {useEffect, useState} from "react";

const TotalUsuarios = (props) => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
       props.service.then((data) => setTotal(data.length))
    });

    return(<div className="">
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Usuarios</span>
                <div className="text-900 font-medium text-xl">{total}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                 style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-user text-cyan-500 text-xl"/>
            </div>
        </div>
    </div>);

}

export default TotalUsuarios;