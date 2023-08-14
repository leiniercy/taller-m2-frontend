

import React from "react";
import {Tag} from "primereact/tag";
import {Galleria} from "primereact/galleria";

export default function DataViewGridItemAccesorio(props) {

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
                    src={item.url}
                    alt={item.name}
            // style={{ height: '640px', width: '640px' }}
        />
    }

    const thumbnailTemplate = (item) => {
        return <img className="" src={item.url} alt={item.name} style={{height: '100px', display: 'block'}}/>
    }

    return(<div className="col-12 sm:col-12 md:col-6 lg:col-4">
        <div className="card m-3 border-1 surface-border p-3">
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                <div className="flex align-items-center">
                    <span className="text-base sm:text-base  font-semibold">Precio: ${props.data.price}</span>
                </div>
                <Tag severity={props.getSeverity(props.data)} value={props.getValue(props.data)}></Tag>
            </div>
            <div className="flex flex-column align-items-center text-center mb-3 h-30rem sm:h-30rem w-full">
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
            </div>
        </div>
    </div>);


}