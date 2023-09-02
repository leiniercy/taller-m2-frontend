
import React from "react";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";


export default function DataViewListItem(props) {

    return(<div className="col-12">
        <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
            <img src={process.env.NEXT_PUBLIC_API_URL+'/product/image/'+props.data.files[0].name} alt={props.data.name}
                 className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"/>
            <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                <div className="font-bold text-2xl">{props.data.name}</div>
                <div className="flex align-items-center">
                    <span className="font-semibold">{props.data.cant}</span>
                    <i className="ml-2 pi pi-tag mr-2"></i>

                </div>
                <Tag severity={props.getSeverity(props.data)} value={props.getValue(props.data)}></Tag>
            </div>
            <div
                className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <span
                            className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${props.data.price}</span>
                <Button className="p-button-rounded" icon="pi pi-shopping-cart"
                        disabled={props.getValue(props.data) === 'OUTOFSTOCK'}/>
            </div>
        </div>
    </div>);
}