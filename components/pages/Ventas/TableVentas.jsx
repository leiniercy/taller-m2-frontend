"use client"
import React, {useState} from "react";
import PropTypes from "prop-types";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

const TableVentas = (props) => {

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
                    {props.rol === 'ROLE_ADMIN' && <Column field="username" header="Usuario" sortable></Column>}
                    <Column field="description" header="Descripción" sortable></Column>
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
            value={props.objects}
            dataKey="id"
            removableSort
            filters={filters}
            globalFilterFields={props.globalFilterFields}
            globalFilter={globalFilter}
            scrollable
            scrollHeight="800px"
            tableStyle={{minWidth: '50rem'}}
            header={header}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
        >
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
        </DataTable>
    );
}

TableVentas.propTypes = {
    headerLabel: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    objects: PropTypes.object.isRequired,
    emptyFilters: PropTypes.object.isRequired,
    globalFilterFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSelectedObject: PropTypes.func.isRequired,
    confirmDeleteSell: PropTypes.func.isRequired,
}
export default TableVentas;