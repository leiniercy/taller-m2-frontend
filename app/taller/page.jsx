"use client"

//Componentes
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button} from 'primereact/button';
import {Menu} from 'primereact/menu';

import DoughnutChart from "@components/pages/Home/DoughnutChart";
import HorizontalBar from "@components/pages/Home/HorizontalBarChart";
import StackedBarChart from "@components/pages/Home/StackedBarChart";
import Calendario from "@components/pages/Home/Calendario";
import BasicChart from "@components/pages/Home/BasicChart";

import ChargerService from "@services/ChargerService";
import MovileService from "@services/MovileServie";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";

export default function Home() {

    const menu1 = useRef(null);

    const [cantAccesorios, setCantAccesorios] = useState(0);
    const [cantChargers, setCantChargers] = useState(0);
    const [cantMoviles, setCantMoviles] = useState(0);
    const [cantRelojes, setCantRelojes] = useState(0);

    const productService = new ProductService();
    const chargerService = new ChargerService();
    const movileService = new MovileService();
    const relojService = new  RelojService();

    useEffect(() =>{
        productService.getCant().then(data => setCantAccesorios(data));
        chargerService.getCant().then(data => setCantChargers(data));
        movileService.getCant().then(data => setCantMoviles(data));
        relojService.getCant().then(data => setCantRelojes(data));
    });

    return (
        <div className="sm:relative sm:col-12 md:col p-4 sm:p-4">
            <div className="grid">
                <div className="col-12">
                    <div className="card bg-gray-items card mb-0 p-3 border-round">
                        <div className="card flex justify-content-end">

                            <Calendario/>
                            <a className="p-button p-button-raised no-underline ml-2"
                                href="http://localhost:8080/api/v1/home/pdf">
                                <i className="pi pi-download"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="bg-gray-items card mb-0 p-3 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Orders</span>
                                <div className="text-900 font-medium text-xl">152</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-shopping-cart text-blue-500 text-xl"/>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">24 new </span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="bg-gray-items  card mb-0 p-3 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Revenue</span>
                                <div className="text-900 font-medium text-xl">$2.100</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-map-marker text-orange-500 text-xl"/>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">%52+ </span>
                        <span className="text-500">since last week</span>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="bg-gray-items card mb-0 p-3 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Customers</span>
                                <div className="text-900 font-medium text-xl">28441</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-inbox text-cyan-500 text-xl"/>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">520 </span>
                        <span className="text-500">newly registered</span>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="bg-gray-items card mb-0 p-3 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Comments</span>
                                <div className="text-900 font-medium text-xl">152 Unread</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round"
                                 style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-comment text-purple-500 text-xl"/>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">85 </span>
                        <span className="text-500">responded</span>
                    </div>
                </div>

                <div className="col-12 xl:col-6">
                    <DoughnutChart
                        cantAccesorios={cantAccesorios}
                        cantChargers={cantChargers}
                        cantMoviles={cantMoviles}
                        cantRelojes={cantRelojes}
                    />
                </div>

                <div className="col-12 xl:col-6">
                    <BasicChart/>
                </div>

                <div className="col-12 xl:col-6">
                    <HorizontalBar/>
                </div>

                <div className="col-12 xl:col-6">
                    <StackedBarChart/>
                </div>

            </div>
        </div>

    )


}