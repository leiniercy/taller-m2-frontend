"use client"

import React, {useEffect, useState} from "react";
import {Galleria} from 'primereact/galleria';
import ChargerService from "@services/ChargerService";
import RenderLayout from "@components/layout/RenderLayout";
import {useSession} from "next-auth/react";


export default function InfoCharger() {

    const { data: session, status } = useSession();

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
        if(status === 'authenticated' && session?.user !== undefined) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");
            chargerService.getById(id, session?.user.token).then((data) => setCharger(data));
        }
    },[session?.user]);


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
        return <img className="h-full sm:h-30rem lg:h-25rem  w-full  border-round "
                    src={item.url}
                    alt={item.name}
        />
    }


    return (
        <RenderLayout>
            <div className="bg-gray-items border-round card flex flex-row flex-wrap w-full h-full sm:h-full">
                <div className="flex flex-row flex-wrap w-full gap-2 sm:gap-2 lg:gap-0 p-3">
                    <div className="w-full h-6rem flex align-items-center justify-content-center ">
                        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-rm_19-20">{charger.name}</h1>
                    </div>
                    <div className="w-full sm:w-full md:w-full lg:flex-1 lg:w-5 lg:h-30rem">
                        <div className="card w-full h-full sm:w-full flex">
                            <Galleria
                                className="bg-gray-items w-full h-full"
                                value={charger.files}
                                responsiveOptions={responsiveOptions}
                                numVisible={3}
                                circular={true}
                                showItemNavigators
                                showItemNavigatorsOnHover
                                item={itemTemplate}
                                showThumbnails={false}
                                showIndicators
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-full md:w-full lg:flex-1 lg:w-5 lg:h-30rem">
                        <div className="card m-2 grid">
                            <div className="col-12">
                                <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-rm_19-20">Propiedades</h1>
                            </div>
                            <div className="col-7 ">
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Cantidad disponible:</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Precio:</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Tipo de conector:</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Dispositivos compatibles:</span>
                            </div>
                            <div className="col-5">
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> {charger.cant}</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> ${charger.price}</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> {charger.connectorType}</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> {charger.compatibleDevice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RenderLayout>
    );

}