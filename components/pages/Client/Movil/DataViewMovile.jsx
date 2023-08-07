"use client"

import React, {useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import DataViewGridItem from "@components/pages/Client/DataViewGridItem";
import DataViewListItem from "@components/pages/Client/DataViewListItem";


export default function DataViewMovile(props) {

    const [dataViewValue, setDataViewValue] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

    useEffect(() => {
        props.service.then((data) => setDataViewValue(data));
        setGlobalFilterValue('');
    }, []);

    /*Disponibilidad de los objetos*/
    const getValue = (data) => {
        if (data.cant > 10) {
            return 'INSTOCK';
        } else if (data.cant <= 10 && data.cant > 0) {
            return 'LOWSTOCK';
        }
        return 'OUTOFSTOCK';
    }
    const getSeverity = (data) => {
        if (data.cant > 10) {
            // 'INSTOCK'
            return 'success';
        } else if (data.cant <= 10 && data.cant > 0) {
            // 'LOWSTOCK'
            return 'warning';
        }
        //OUTOFSTOCK
        return 'danger';
    }; /*Disponibilidad de los objetos*/

    const sortOptions = [
        {label: 'Precio más alto al más bajo', value: '!price'},
        {label: 'Precio más bajo al más alto', value: 'price'}
    ];

    const onFilter = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        if (value.length === 0) {
            setFilteredValue(null);
        } else {
            const filtered = dataViewValue.filter((data) => {
                return data.name.toLowerCase().includes(value);
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

    const dataViewHeader = (<div className="flex flex-column md:flex-row md:justify-content-between gap-2">
        <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Ordenar por precio"
                  onChange={onSortChange}/>
        <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText value={globalFilterValue} onChange={onFilter} placeholder="Buscar por nombre"/>
            </span>
        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)}/>
    </div>);

    const dataviewListItem = (data) => {
        return (
           <DataViewListItem
               data={data}
               getSeverity={getSeverity}
               getValue={getValue}
           />
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <DataViewGridItem
              data={data}
              getSeverity={getSeverity}
              getValue={getValue}
            />
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

    return (<>
        <DataView value={filteredValue || dataViewValue}
                  layout={layout} paginator rows={9}
                  sortOrder={sortOrder}
                  sortField={sortField}
                  itemTemplate={itemTemplate}
                  header={dataViewHeader}></DataView>
    </>);


}