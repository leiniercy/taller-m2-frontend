"use client"

import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {DataView} from "primereact/dataview";
import DataViewGridItem from "@components/pages/Client/DataViewGridItem";


const DataViewProduct = (props) => {

    const [dataViewValue, setDataViewValue] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

    useEffect(() => {
        setDataViewValue(props.products);
        setGlobalFilterValue('');
    }, [props.products]);

    /*Disponibilidad de los objetos*/
    const getValue = (data) => {
        if (data.cant > 0) {
            return 'DISPONIBLE';
        }
        return 'NO DISPONIBLE';
    }
    const getSeverity = (data) => {
        if (data.cant > 0) {
            // 'INSTOCK'
            return 'success';
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
    </div>);

    const dataviewGridItem = (data) => {
        return (
            <DataViewGridItem
              data={data}
              getSeverity={getSeverity}
              getValue={getValue}
              path={props.path}
              isMovile={props.isMovile}
            />
        );
    };


    return (<>
        <DataView value={filteredValue || dataViewValue}
                  paginator rows={9}
                  sortOrder={sortOrder}
                  sortField={sortField}
                  itemTemplate={dataviewGridItem}
                  header={dataViewHeader}></DataView>
    </>);


}

DataViewProduct.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    path: PropTypes.string.isRequired,
    isMovile: PropTypes.bool.isRequired,
}

export default DataViewProduct;