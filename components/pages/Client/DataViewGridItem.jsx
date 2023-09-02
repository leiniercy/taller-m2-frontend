

import React from "react";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import {useRouter} from "next/navigation";
import {Galleria} from "primereact/galleria";


export default function DataViewGridItem(props) {

    const router = useRouter();
    const handleClick = (e, rowData) => {
        const product = rowData;
        router.push(props.path+rowData.id);
    }

    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img className="h-20rem sm:h-20rem w-full  border-round "
                    src={process.env.NEXT_PUBLIC_API_URL+'/product/image/'+item.name}
                    alt={item.name}
            // style={{ height: '640px', width: '640px' }}
        />
    }

    return(<div className="col-12 sm:col-12 md:col-6 lg:col-4">
        <div className="card m-3 border-1 surface-border p-3">
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                <div className="flex align-items-center">
                    <span className="text-base sm:text-base  font-semibold">Cantidad: {props.data.cant}</span>
                </div>
                <Tag severity={props.getSeverity(props.data)} value={props.getValue(props.data)}></Tag>
            </div>
            <div className="flex flex-column align-items-center text-center mb-3 h-30rem sm:h-30rem">
                <Galleria
                    className="bg-gray-items w-full h-25rem sm:h-25rem"
                    value={props.data.files}
                    responsiveOptions={responsiveOptions}
                    numVisible={3}
                    circular={true}
                    showItemNavigators
                    showItemNavigatorsOnHover
                    item={itemTemplate}
                    // showIndicatorsOnItem={true}
                    showThumbnails={false}
                    showIndicators
                    // thumbnailsPosition={'left'}
                    //       thumbnail={thumbnailTemplate}
                />
                <div className="text-2xl font-bold">{props.data.name}</div>
                <div className="text-base sm:text-base  font-semibold">Precio: ${props.data.price}</div>
            </div>
            { !props.isMovile && <div className="flex align-items-center">
                <Button className="w-full" label="Ver más" icon="pi pi-amazon" onClick={(e) => handleClick(e, props.data)}/>
            </div> }
        </div>
    </div>);


}