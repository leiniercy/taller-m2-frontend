"use client"

//Componentes
import React, {useContext, useEffect, useRef, useState} from 'react';

import RenderLayout from "@components/layout/RenderLayout";
import DoughnutChart from "@components/pages/Home/DoughnutChart";
import StackedBarChart from "@components/pages/Home/StackedBarChart";
import BasicChart from "@components/pages/Home/BasicChart";
import HorizontalBarChart from "@components/pages/Home/HorizontalBarChart";

import ChargerService from "@services/ChargerService";
import MovileService from "@services/MovileServie";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";
import SellService from "@services/SellService";


export default function Home() {

    const menu1 = useRef(null);

    const productService = new ProductService();
    const chargerService = new ChargerService();
    const movileService = new MovileService();
    const relojService = new  RelojService();
    const sellService = new SellService();


    return (
        <RenderLayout>
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
                        productService={productService.getCant()}
                        chargerService={chargerService.getCant()}
                        movileService={movileService.getCant()}
                        relojService={relojService.getCant()}
                    />
                </div>

                <div className="col-12 xl:col-6">
                    <BasicChart/>
                </div>

                <div className="col-12 xl:col-6">
                    <HorizontalBarChart
                    service={sellService.getAllByMonth()}
                    />
                </div>

                <div className="col-12 xl:col-6">
                    <StackedBarChart
                        service={sellService.getAllByMonthAndProduct()}
                    />
                </div>

        </RenderLayout>
    )


}