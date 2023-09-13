"use client"

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";


const Table = (props) =>  {

    const [filters, setFilters] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0"> {'Administrar ' + props.headerLabel } </h4>
                <div>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."/>
            </span>
                    <Button type="button" icon="pi pi-filter-slash" /*label="Clear"*/ outlined onClick={clearFilter}/>
                </div>
            </div>
        );
    };/*Header de la tabla*/

    const initFilters = () => {
        setFilters(props.emptyFilters);
    };/*Filtros*/
    const clearFilter = () => {
        initFilters();
    };/*Filtros*/
    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback}
                       severity="secondary"></Button>;
    };/*Filtros*/
    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback}
                       severity="success"></Button>;
    };/*Filtros*/

    const header = renderHeader();/*Header de la tabla*/

    const imageBodyTemplate = (rowData) => {
        if(rowData.files[0] === undefined){
            return <span> Sin imagenes </span>;
        }
        return <img src={ process.env.NEXT_PUBLIC_API_URL+'/product/image/'+rowData.files[0].name} alt={rowData.name}
                    className="shadow-2 border-round" style={{width: '64px'}}/>;
    }; /*Formato con que se muestra la imagen del accesorio en la tabla*/
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }; /*Mostrar clumnas de la tabla*/
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    };/*Formato con que se muestra el precio del accesorio*/

    return(
        <DataTable
            value={props.objects}
            selection={props.selectedObjects}
            onSelectionChange={props.setSelectedObject}
            dataKey="id"
            removableSort
            filters={filters}
            globalFilterFields={props.globalFilterFields}
            paginator rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Muestra {first} de {last} de {totalRecords}"
            scrollable
            scrollHeight="400px"
            virtualScrollerOptions={{itemSize: 46}} tableStyle={{minWidth: '50rem'}}
            globalFilter={globalFilter}
            header={header}
        >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column field="image" header="Imagen" body={imageBodyTemplate}></Column>
            <Column field="name" header="Nombre" sortable filter
                    filterPlaceholder="Bucar por nombre"
                    filterClear={filterClearTemplate}
                    filterApply={filterApplyTemplate}
                    style={{minWidth: '16rem'}}></Column>
            <Column field="taller" header="Taller" sortable filter
                    filterPlaceholder="Bucar por taller"
                    filterClear={filterClearTemplate}
                    filterApply={filterApplyTemplate}
                    style={{minWidth: '8rem'}}></Column>
            <Column field="price" header="Precio" sortable filter
                    filterPlaceholder="Bucar por precio"
                    filterClear={filterClearTemplate}
                    filterApply={filterApplyTemplate}
                    body={priceBodyTemplate}
                    style={{minWidth: '6rem'}}></Column>
            <Column field="cant" header="Cantidad" sortable filter
                    filterPlaceholder="Bucar por cantidad"
                    filterClear={filterClearTemplate}
                    filterApply={filterApplyTemplate}
            />
            <Column body={props.actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}></Column>
        </DataTable>
    )

}

Table.propTypes = {
    headerLabel: PropTypes.string.isRequired,
    emptyFilters: PropTypes.object.isRequired,
    globalFilterFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    objects: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionBodyTemplate: PropTypes.func.isRequired
}

export default Table;