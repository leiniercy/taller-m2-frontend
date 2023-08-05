"use client"

//Styles primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

//Componentes
import React, {useState, useEffect} from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Rating} from 'primereact/rating';
import {InputText} from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

//Service
import ProductService from '@services/ProductService';


export default function Cliente() {

    const productService = new ProductService();
    const [dataViewValue, setDataViewValue] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

    /*Disponibilidad de los productos*/
    const getValue = (product) =>{
        if (product.cant > 10) {
            return 'INSTOCK';
        } else if (product.cant <= 10 && product.cant > 0) {
            return 'LOWSTOCK';
        }
        return 'OUTOFSTOCK';
    }
    const getSeverity = (product) => {
        if (product.cant > 10) {
            // 'INSTOCK'
            return 'success';
        } else if (product.cant <= 10 && product.cant > 0) {
            // 'LOWSTOCK'
            return 'warning';
        }
        //OUTOFSTOCK
        return 'danger';
    }; /*Disponibilidad de los productos*/


    const sortOptions = [
        {label: 'Precio más alto al más bajo', value: '!price'},
        {label: 'Precio más bajo al más alto', value: 'price'}
    ];

    useEffect(() => {
        productService.getAll().then((data) => setDataViewValue(data));
        setGlobalFilterValue('');
    }, []);

    const onFilter = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        if (value.length === 0) {
            setFilteredValue(null);
        } else {
            const filtered = dataViewValue.filter((product) => {
                return product.name.toLowerCase().includes(value);
            });
            setFilteredValue(filtered);
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const dataViewHeader = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Ordenar por precio"
                      onChange={onSortChange}/>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText value={globalFilterValue} onChange={onFilter} placeholder="Buscar por nombre"/>
            </span>
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)}/>
        </div>
    );

    const dataviewListItem = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img src={`http://localhost:8080/api/v1/product/image/` + data.image} alt={data.name}
                         className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"/>
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="font-bold text-2xl">{data.name}</div>
                        <div className="flex align-items-center">
                            <span className="font-semibold">{data.cant}</span>
                            <i className="ml-2 pi pi-tag mr-2"></i>

                        </div>
                        <Tag severity={getSeverity(data)} value={getValue(data)}></Tag>
                    </div>
                    <div
                        className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <span
                            className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${data.price}</span>
                        <Button className="p-button-rounded"  icon="pi pi-shopping-cart"  disabled={getValue(data) === 'OUTOFSTOCK'} />
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="lcol-12 lg:co-4">
                <div className="card m-3 border-1 surface-border p-3">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                            <i className="ml-2 pi pi-tag mr-2"></i>
                            <span className="font-semibold">{data.cant}</span>
                        </div>
                        <Tag severity={getSeverity(data)} value={getValue(data)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <img src={`http://localhost:8080/api/v1/product/image/` + data.image} alt={data.name}
                             className="w-9 shadow-2 my-3 mx-0"/>
                        <div className="text-2xl font-bold">{data.name}</div>
                        {/*<div className="mb-3">{data.description}</div>*/}
                        {/*<Rating value={data.rating} readOnly cancel={false} />*/}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${data.price}</span>
                        <Button icon="pi pi-shopping-cart"/>
                        {/*<Button icon="pi pi-shopping-cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'} />*/}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        } else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };
    return (
        <div className="sm:relative col p-4">
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <DataView value={filteredValue || dataViewValue} layout={layout} paginator rows={9}
                                  sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate}
                                  header={dataViewHeader}></DataView>
                    </div>
                </div>
            </div>
        </div>
    );
}