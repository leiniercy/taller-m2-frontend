"use client"

import React, {useEffect, useState} from "react";
import {Galleria} from 'primereact/galleria';
import RelojService from "@services/RelojService";
import RenderLayout from "@components/layout/RenderLayout";
import {useSession} from "next-auth/react";


export default function InfoReloj(props) {

    const { data: session, status } = useSession();
    const [token, setToken] = useState('');

    let emptyReloj = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        specialFeature: '',
        connectorType: '',
        bateryLife: 0
    };

    const relojService = new RelojService();
    const [reloj, setReloj] = useState(emptyReloj);

    useEffect(() => {
        if(status === 'authenticated' && session?.user !== undefined){
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");
            relojService.getById(id, session?.user.token).then((data) => setReloj(data));
            setToken(session?.user.token);
        }
    },[session?.user])

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
                        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-rm_19-20">{reloj.name}</h1>
                    </div>
                    <div className="w-full sm:w-full md:w-full lg:flex-1 lg:w-5 lg:h-30rem">
                        <div className="card w-full h-full sm:w-full flex">
                            <Galleria
                                className="bg-gray-items w-full h-full"
                                value={reloj.files}
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
                    <div
                        className="w-full sm:w-full md:w-full lg:flex-1 lg:w-5 lg:h-30rem">
                        <div className="card m-2 grid">
                            <div className="col-12">
                                <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-rm_19-20">Propiedades</h1>
                            </div>
                            <div className="col-7 ">
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Cantidad disponible:</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Precio:</span>
                                    <span
                                        className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Funcionalidades:</span>
                                <span
                                    className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Dispositivos compatibles:</span>
                                <span
                                    className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">Batería:</span>
                            </div>
                            <div className="col-5">
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> {reloj.cant}</span>
                                <span className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> ${reloj.price}</span>
                                    <span
                                        className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> {reloj.specialFeature}</span>
                                <span
                                    className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> {reloj.compatibleDevice}</span>
                                <span
                                    className="block text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2"> {reloj.bateryLife} amp</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RenderLayout>
    );

}