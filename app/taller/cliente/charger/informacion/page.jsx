"use client"

import React, {useEffect, useState} from "react";
import {Galleria} from 'primereact/galleria';
import ChargerService from "@services/ChargerService";


export default function InfoCharger(props) {

    let emptyCharger = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        connectorType: '',
        compatibleDevice: ''
    };

    const chargerService = new ChargerService();
    const [charger, setCharger] = useState(emptyCharger);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        chargerService.getById(id).then((data) => setCharger(data));
    })


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


    return (
        <div className="sm:relative md:relative col-12 sm:col-12 md:col lg:col p-2 ml-2 sm:ml-2">
            <div className="card grid mt-2">
                <div className="col-12">
                    <div className="bg-gray-items card grid h-full sm:h-full md:h-30rem">
                        <div className="col-12 sm:col-12 md:col-6 flex justify-content-center align-items-center">
                            <div className="card w-10 sm:w-10 md:w-12 lg:w-10 xl:w-6">
                                <Galleria
                                    className="bg-gray-items h-20rem sm:h-20rem"
                                    value={charger.files}
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
                            </div>
                        </div>
                        <div className="col-12 sm:col-12 md:col-6 md:flex md:justify-content-center md:align-items-center" >
                            <div className="card grid">
                                <div className="col-12">
                                    <h1 className="text-6x1 sm:text-6x1 font-rm_19-20">{charger.name}</h1>
                                </div>
                                <div className="col-7 ">
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold mb-2">Tipo de conector:</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold mb-2">Dispositivos compatibles:</span>
                                </div>
                                <div className="col-5">
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl mb-2"> {charger.connectorType}</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl mb-2"> {charger.compatibleDevice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}