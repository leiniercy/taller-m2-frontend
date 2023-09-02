"use client"

import React, {useState} from "react";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export default function TableVentas(props) {

    const [expandedRows, setExpandedRows] = useState(null);
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
        return <img src={process.env.NEXT_PUBLIC_API_URL+'/product/image/'+rowData.files[0].name} alt={rowData.name}
                    className="shadow-2 border-round" style={{width: '64px'}}/>;
        //return <img src={"data:image/jpeg;base64," + urlBase} alt={rowData.name} className="shadow-2 border-round" style={{ width: '64px' }} />;
    }; /*Formato con que se muestra la imagen del accesorio en la tabla*/
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }; /*Mostrar clumnas de la tabla*/

    const salePriceBodyTemplate = (rowData) => {
        return <div className="flex flex-row align-items-center justify-content-around"> <span className="">{formatCurrency(rowData.salePrice)}</span> <span className="ml-1 bg-cyan-500 p-2 border-round font-rm_19-20" style={{color: '#fff'}}> +{rowData.cantProduct}</span> </div>;
    }; /*Mostrar clumnas de la tabla*/
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    };/*Formato con que se muestra el precio del accesorio*/

    const allowExpansion = (rowData) => {
        return rowData.sales.length > 0;
        // return true;
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => props.confirmDeleteSell(rowData)}
                />
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/

    const rowExpansionTemplate = (rowData) => {
        return (
            <div className="p-3">
                <h5>Ventas de {rowData.name}</h5>
                <DataTable
                    dataKey="id"
                    value={rowData.sales}
                    selection={props.selectedObjects}
                    onSelectionChange={props.setSelectedObject}
                    removableSort
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="customer.customerName" header="Nombre del cliente" sortable></Column>
                    <Column field="customer.customerMovile" header="Teléfono del cliente" sortable></Column>
                    <Column field="description" header="Descripción" sortable></Column>
                    <Column field="tallerName" header="Taller" sortable></Column>
                    <Column field="sellDate" header="Fecha de venta" sortable></Column>
                    <Column field="salePrice" header="Precio de venta" sortable body={salePriceBodyTemplate}></Column>
                    <Column
                        body={actionBodyTemplate}  exportable={false} style={{minWidth: '8rem'}}></Column>
                    {/*    /!*<Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column>*!/*/}
                </DataTable>
            </div>
        );
    };


    return (
        <DataTable
            // ref={props.dt}
            value={props.objects}
            // selection={props.selectedObjects}
            // onSelectionChange={props.setSelectedObject}
            dataKey="id"
            removableSort
            filters={filters}
            globalFilterFields={props.globalFilterFields}
            globalFilter={globalFilter}
            // paginator rows={5}
            // rowsPerPageOptions={[5, 10, 25]}
            // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            // currentPageReportTemplate="Muestra {first} de {last} de {totalRecords}"
            scrollable
            scrollHeight="800px"
            // virtualScrollerOptions={{itemSize: 46}}
            tableStyle={{minWidth: '50rem'}}
            header={header}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            // onRowExpand={onRowExpand}
            // onRowCollapse={onRowCollapse}
            rowExpansionTemplate={rowExpansionTemplate}
        >
            {/*<Column selectionMode="multiple" exportable={false}></Column>*/}
            <Column expander={allowExpansion} style={{width: '5rem'}}/>
            <Column field="image" header="Imagen" body={imageBodyTemplate}></Column>
            <Column field="name" header="Nombre" sortable filter
                filterPlaceholder="Bucar por nombre"
                filterClear={filterClearTemplate}
                filterApply={filterApplyTemplate}
                    style={{minWidth: '16rem'}}></Column>
            <Column field="price" header="Precio" sortable filter
                filterPlaceholder="Bucar por precio"
                filterClear={filterClearTemplate}
                filterApply={filterApplyTemplate}
                    body={priceBodyTemplate}
                    style={{minWidth: '8rem'}}></Column>
            <Column field="cant" header="Cantidad" sortable filter
                filterPlaceholder="Bucar por cantidad"
                filterClear={filterClearTemplate}
                filterApply={filterApplyTemplate}
            />
            {/*<Column body={props.actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}></Column>*/}
        </DataTable>

    );

}