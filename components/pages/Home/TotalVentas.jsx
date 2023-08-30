"use client"

import React, {useEffect, useState} from "react";


const TotalVentas = (props) => {

    const [total, setTotal] = useState(null);

    useEffect(() => {
        props.service.then(data => {
            let _total=0;
            for(let i=0; i< 12; i++){
                _total+=data[i];
            }
            setTotal(_total);
        });
    });


    return(<div className="card ">
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Ventas</span>
                <div className="text-900 font-medium text-xl">${total}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                 style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-shopping-cart text-blue-500 text-xl"/>
            </div>
        </div>
    </div>)

}

export default TotalVentas;