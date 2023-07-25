"use client"

//Styles primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

//Componentes
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

export default function Home() {

    const menu1 = useRef(null);


    return (
        <div className="sm:relative sm:col-12 md:col p-4 sm:p-4 ">
            <div className="grid">
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
                    {/*<div className="card">*/}
                    {/*    <h5>Recent Sales</h5>*/}
                    {/*    <DataTable value={products} rows={5} paginator responsiveLayout="scroll">*/}
                    {/*        <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />*/}
                    {/*        <Column field="name" header="Name" sortable style={{ width: '35%' }} />*/}
                    {/*        <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />*/}
                    {/*        <Column*/}
                    {/*            header="View"*/}
                    {/*            style={{ width: '15%' }}*/}
                    {/*            body={() => (*/}
                    {/*                <>*/}
                    {/*                    <Button icon="pi pi-search" type="button" text />*/}
                    {/*                </>*/}
                    {/*            )}*/}
                    {/*        />*/}
                    {/*    </DataTable>*/}
                    {/*</div>*/}
                    <div className="bg-gray-items card p-3 border-round">
                        <div className="flex justify-content-between align-items-center mb-5">
                            <h5>Best Selling Products</h5>
                            <div>
                                <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu1.current.toggle(event)} />
                                <Menu
                                    ref={menu1}
                                    popup
                                    model={[
                                        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                                        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                                    ]}
                                />
                            </div>
                        </div>
                        <ul className="list-none p-0 m-0">
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
                                    <div className="mt-1 text-600">Clothing</div>
                                </div>
                                <div className="mt-2 md:mt-0 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-orange-500 h-full" style={{ width: '50%' }} />
                                    </div>
                                    <span className="text-orange-500 ml-3 font-medium">%50</span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
                                    <div className="mt-1 text-600">Accessories</div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-cyan-500 h-full" style={{ width: '16%' }} />
                                    </div>
                                    <span className="text-cyan-500 ml-3 font-medium">%16</span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
                                    <div className="mt-1 text-600">Accessories</div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-pink-500 h-full" style={{ width: '67%' }} />
                                    </div>
                                    <span className="text-pink-500 ml-3 font-medium">%67</span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
                                    <div className="mt-1 text-600">Office</div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-green-500 h-full" style={{ width: '35%' }} />
                                    </div>
                                    <span className="text-green-500 ml-3 font-medium">%35</span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
                                    <div className="mt-1 text-600">Accessories</div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-purple-500 h-full" style={{ width: '75%' }} />
                                    </div>
                                    <span className="text-purple-500 ml-3 font-medium">%75</span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
                                    <div className="mt-1 text-600">Clothing</div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-teal-500 h-full" style={{ width: '40%' }} />
                                    </div>
                                    <span className="text-teal-500 ml-3 font-medium">%40</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )


}