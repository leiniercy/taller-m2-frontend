"use client"

import React, {useEffect, useState} from "react";
import MovileService from "@services/MovileServie";
import {Galleria} from 'primereact/galleria';


export default function Info(props) {

    let emptyMovile = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        sizeStorage: 0,
        ram: 0,
        camaraTrasera: 0,
        camaraFrontal: 0,
        banda2G: false,
        banda3G: false,
        banda4G: false,
        banda5G: false,
        bateria: 0,
    };
    const movileService = new MovileService();
    const [movile, setMovile] = useState(emptyMovile);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        movileService.getById(id).then((data) => setMovile(data));
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
                                    value={movile.files}
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
                                    <h1 className="text-6x1 sm:text-6x1 font-rm_19-20">{movile.name}</h1>
                                </div>
                                <div className="col-7 ">
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold mb-2">Almacenamiento:</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold mb-2">Memoria Ram:</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold mb-2">Cámara Forntal:</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold mb-2">Cámara Trasera:</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold mb-2">Redes disponibles:</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl font-bold">Duración de la batería:</span>
                                </div>
                                <div className="col-5">
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl mb-2"> {movile.sizeStorage}GB</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl mb-2"> {movile.ram}GB</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl mb-2"> {movile.camaraFrontal}px</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl mb-2"> {movile.camaraTrasera}px</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl mb-2"> {movile.banda2G && 'GSM'}/{movile.banda3G && '3G'}/{movile.banda4G && 'LTE'}/{movile.banda5G && '5G'}</span>
                                    <span className="block text-base sm:text-base lg:text-lg xl:text-2xl"> {movile.bateria}días</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}