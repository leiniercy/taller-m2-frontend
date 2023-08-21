"use client"

import React, {useState, useEffect, useRef} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";


const TableCustomer = (props) => {

    const [filters, setFilters] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"
                        onClick={() => props.edit(rowData)}
                />
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => props.confirmDeleteUser(rowData)}
                />
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0"> {'Administrar ' + props.headerLabel} </h4>
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

    return (<DataTable
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
        <Column field="customerName" header="Nombre y apellidos" sortable filter
                filterPlaceholder="Bucar por nombre"
                filterClear={filterClearTemplate}
                filterApply={filterApplyTemplate}
        ></Column>
        <Column field="customerMovile" header="Teléfono" sortable filter
                filterPlaceholder="Bucar por nombre"
                filterClear={filterClearTemplate}
                filterApply={filterApplyTemplate}
        ></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}></Column>
    </DataTable>);

}

export default TableCustomer;