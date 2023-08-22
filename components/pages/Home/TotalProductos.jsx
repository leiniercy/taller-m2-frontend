"use client"

import React, {useEffect, useState} from "react";


const TotalProductos = (props) => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        props.productService.then(accesorios => {
            props.chargerService.then(chargers => {
                props.movileService.then(moviles => {
                    props.relojService.then(relojes => {
                        setTotal(accesorios+chargers+moviles+relojes);
                    });
                });
            });
        });
    });


    return(<div className="bg-gray-items  card mb-0 p-3 border-round">
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Productos</span>
                <div className="text-900 font-medium text-xl">{total}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-orange-100 border-round"
                 style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-map-marker text-orange-500 text-xl"/>
            </div>
        </div>
    </div>)


}

export default TotalProductos;