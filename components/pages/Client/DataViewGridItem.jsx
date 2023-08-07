

import React from "react";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import {useRouter} from "next/navigation";


export default function DataViewGridItem(props) {

    const router = useRouter();
    const handleClick = (e, rowData) => {
        const product = rowData;
        router.push("/taller/cliente/movil/informacion/?id="+rowData.id);
    }


    return(<div className="lcol-12 lg:co-4">
        <div className="card m-3 border-1 surface-border p-3">
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                <div className="flex align-items-center">
                    <span className="text-2xl font-semibold">${props.data.price}</span>
                    {/*<i className="ml-2 pi pi-tag mr-2"></i>*/}
                    {/*<span className="font-semibold">{props.data.cant}</span>*/}
                </div>
                <Tag severity={props.getSeverity(props.data)} value={props.getValue(props.data)}></Tag>
            </div>
            <div className="flex flex-column align-items-center text-center mb-3">
                <img src={props.data.files[0].url} alt={props.data.name}
                     className="w-9 shadow-2 my-3 mx-0"/>
                <div className="text-2xl font-bold">{props.data.name}</div>
                {/*<div className="mb-3">{data.description}</div>*/}
                {/*<Rating value={data.rating} readOnly cancel={false} />*/}
            </div>
            <div className="flex align-items-center">
                {/*<span className="text-2xl font-semibold">${props.data.price}</span>*/}
                <Button className="w-full" label="Ver más" icon="pi pi-amazon" onClick={(e) => handleClick(e, props.data)}/>
                {/*<Button icon="pi pi-shopping-cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'} />*/}
            </div>
        </div>
    </div>);


}