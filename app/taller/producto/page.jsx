"use client"

//Styles primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import AccesorioService from '@services/AccesorioService';
import axios from 'axios';

import React, {useState, useEffect, useRef} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {FileUpload} from 'primereact/fileupload';
import {Rating} from 'primereact/rating';
import {Toolbar} from 'primereact/toolbar';
import {InputTextarea} from 'primereact/inputtextarea';
import {RadioButton} from 'primereact/radiobutton';
import {InputNumber} from 'primereact/inputnumber';
import {Slider} from "primereact/slider";
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Tooltip} from 'primereact/tooltip';
import {ProgressBar} from 'primereact/progressbar';
import {Tag} from 'primereact/tag';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
//Components
import Exportlayout from "@components/pages/Accesorio/Exportlayout";


export default function Producto() {

    let emptyAccesorio = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
    };

    const [accesorios, setAccesorios] = useState(null);
    const accesorioService = new AccesorioService();

    const [accesorioDialog, setAccesorioDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [deleteAccesorioDialog, setDeleteAccesorioDialog] = useState(false);
    const [deleteAccesoriosDialog, setDeleteAccesoriosDialog] = useState(false);
    const [accesorio, setAccesorio] = useState(emptyAccesorio);
    const [selectedAccesorios, setSelectedAccesorios] = useState(null);
    const [filters, setFilters] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    /*Confirmacion de que imgaen mostrar*/
    const [editActive, setEditActive] = useState(false); // si esta activo ese se muesta la imagen que proviene del servidor
    /*Confirmacion de que imgaen mostrar*/

    const columns = [
        {field: 'name', header: 'Nombre', filterPlaceholder: "Buscar por nombre"},
        {field: 'image', header: 'Imagen'},
        {field: 'price', header: 'Precio', filterPlaceholder: "Buscar por precio"},
        {field: 'cant', header: 'Cantidad', filterPlaceholder: "Buscar por cantidad"}
    ];

    useEffect(() => {
        accesorioService.getAll().then((data) => {
            setAccesorios(data);
        });

    }, []);

    const openNew = () => {
        setAccesorio(emptyAccesorio);
        setSubmitted(false);
        setAccesorioDialog(true);
        setEditActive(false);
    }; /*Abrir nueva ventana para crear un accesorio*/

    const hideDialog = () => {
        setAccesorioDialog(false);
        setSubmitted(false);
    }; /*Ocultar dialog de anadir*/

    const hideDeleteAccesorioDialog = () => {
        setDeleteAccesorioDialog(false);
    };/*Ocultar dialog de eliminar un accesorio*/

    const hideDeleteAccesoriosDialog = () => {
        setDeleteAccesoriosDialog(false);
    };/*Ocultar dialog de eliminar varios accesorios*/

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    };/*Formato con que se muestra el precio del accesorio*/
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.files[0].url} alt={rowData.name}
                    className="shadow-2 border-round" style={{width: '64px'}}/>;
        //return <img src={"data:image/jpeg;base64," + urlBase} alt={rowData.name} className="shadow-2 border-round" style={{ width: '64px' }} />;
    }; /*Formato con que se muestra la imagen del accesorio en la tabla*/
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }; /*Mostrar clumnas de la tabla*/

    const leftToolbarTemplate = () => {
        return (
            <div className="flex sm:flex flex-wrap sm:flex-wrap gap-2 sm:gap-2">
                <Button label="Añadir" icon="pi pi-plus" severity="success"
                        onClick={openNew}
                />
                <Button label="Eliminar" icon="pi pi-trash" severity="danger"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedAccesorios || !selectedAccesorios.length}/>
            </div>
        );
    };/*Barra de herramientas*/

    const rightToolbarTemplate = () => {
        return <Exportlayout accesorios={accesorios} dt={dt}/>
    }; /*Barra de herramientas*/

    const save = () => {
        setSubmitted(true);

        if (accesorio.id !== null) {
            //Actualizar Producto
            const formData = new FormData();
            formData.append('id', accesorio.id);
            formData.append('name', accesorio.name);
            formData.append('price', accesorio.price);
            formData.append('cant', accesorio.cant);
            accesorio.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            accesorioService.update(formData, accesorio.id).then(data => {
                setAccesorio(emptyAccesorio);
                //Actualiza la lista de accesorios
                accesorioService.getAll().then(data => setAccesorios(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se actualizó el producto correctamente",
                    life: 2000
                });
                setAccesorioDialog(false);
                setEditActive(false);
                setSelectedAccesorios(null);
            }).catch((error) => {
                toast.current.show({
                    severity: 'danger',
                    summary: 'Atención!',
                    detail: "Error al actualizar el producto",
                    life: 2000
                });
            });

        } else {
            //Crear Producto
            const formData = new FormData();
            formData.append('name', accesorio.name);
            formData.append('price', accesorio.price);
            formData.append('cant', accesorio.cant);
            accesorio.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            accesorioService.save(formData).then(data => {
                setAccesorio(emptyAccesorio);
                //Actualiza la lista de accesorios
                accesorioService.getAll().then(data => setAccesorios(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el producto correctamente",
                    life: 2000
                });
                setAccesorioDialog(false);
                setEditActive(false);
                setSelectedAccesorios(null);
            }).catch((error) => {
                toast.current.show({
                    severity: 'danger',
                    summary: 'Atención!',
                    detail: "Error al guardar el producto",
                    life: 2000
                });
            });
        }
    }; /*Crear o actualizar la informacion de un porducto*/

    const edit = (accesorio) => {
        setEditActive(true);
        setAccesorio(accesorio);
        setAccesorioDialog(true);
    };/*Editar la informacion de un usuario existente*/

    const confirmDeleteAccesorio = (accesorio) => {
        setAccesorio(accesorio);
        setDeleteAccesorioDialog(true);
    };

    const deleteAccesorio = () => {
        let _accesorios = accesorios.filter((val) => val.id === accesorio.id);

        accesorioService.delete(_accesorios[0].id).then(data => {
            //Actualiza la lista de productos
            accesorioService.getAll().then(data => setAccesorios(data));
            setDeleteAccesorioDialog(false);
            setSelectedAccesorios(false);
            setAccesorio(emptyAccesorio);
            //Muestra sms de confirmacion
            toast.current.show({
                severity: 'success',
                summary: 'Atención!',
                detail: "Se eliminó el producto correctamente",
                life: 2000
            });
        }).catch(error => {
            toast.current.show({
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar el producto',
                life: 2000
            });
        });
    };/*Elimnar un accesorio*/

    const confirmDeleteSelected = () => {
        if (selectedAccesorios.length > 1) {
            setDeleteAccesoriosDialog(true);
        }
        if (selectedAccesorios.length === 1) {
            setAccesorio(selectedAccesorios[0]);
            setDeleteAccesorioDialog(true);
        }

    }; /*Abrir el dialog de confirmacion de eliminacion de los accesorios*/

    const deleteSelectedAccesorios = () => {

        accesorioService.deleteAll(selectedAccesorios).then((data) => {
            setAccesorios(data);
            setDeleteAccesoriosDialog(false);
            setSelectedAccesorios(false);
            toast.current.show({
                severity: 'success',
                summary: '!Atención',
                detail: 'Productos eliminados correctamente',
                life: 2000
            });
        }).catch(error => {
            toast.current.show({
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar los productos seleccionados',
                life: 2000
            });
        });
    };/*Eliminar varios porductos*/

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _accesorio = {...accesorio};
        _accesorio[`${name}`] = val;
        setAccesorio(_accesorio);
    };/*Modifica el valor del nombre del accesorio*/

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _accesorio = {...accesorio};
        _accesorio[`${name}`] = val;
        setAccesorio(_accesorio);
    }; /*Modifica el valor de un numero especificado del accesorio (cant y precio)*/

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edit(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteAccesorio(rowData)}/>
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Administrar Accesorios</h4>
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
        setFilters({
            global: {value: null, matchMode: FilterMatchMode.CONTAINS},
            name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
            cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        });
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

    const accesorioDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog}/>
            <Button label={editActive ? "Actualizar" : "Añadir"} icon="pi pi-check" onClick={save}/>
        </React.Fragment>
    );/*Footer del dialog de anadir*/


    const deleteAccesorioDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDeleteAccesorioDialog}/>
            <Button label="Aceptar" icon="pi pi-check" severity="danger" onClick={deleteAccesorio}/>
        </React.Fragment>
    );/*Footer del dialog de eliminacion de un Accesorio*/

    const deleteAccesoriosDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDeleteAccesoriosDialog}/>
            <Button label="Aceptar" icon="pi pi-check" severity="danger" onClick={deleteSelectedAccesorios}/>
        </React.Fragment>
    ); /*Footer del dialog de eliminacion de varios Accesorios*/


    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };/*Drag and Drop options (image)*/

    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };/*Drag and Drop options (image)*/

    const onTemplateSelect = (e) => {

        let _totalSize = totalSize;
        let files = e.files;
        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });
        setTotalSize(_totalSize);

        const val = e.files;
        let _accesorio = {...accesorio};
        _accesorio[`${'files'}`] = val;
        setAccesorio(_accesorio);
        setEditActive(false);
    };/*Drag and Drop options (image)*/
    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        //Eliminar de la lista el elemento
        let objetoElimnmar = accesorio.files.find(objeto => objeto === file); //Comprobamos que el objeto existe en la lista
        let indiceAEiminar = accesorio.files.indexOf(objetoElimnmar); //Buscamos su indice exacto
        accesorio.files.splice(indiceAEiminar, 1); //Eliminamos este objeto pasando su indice y la cant de elemntos a elimnar despues de el
        callback();
    };/*Drag and Drop options (image)*/

    const onTemplateClear = () => {
        setTotalSize(0);
        accesorio.files = [];
    };/*Drag and Drop options (image)*/
    const headerTemplate = (options) => {
        const {className, chooseButton, cancelButton} = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{width: '10rem', height: '12px'}}></ProgressBar>
                </div>
            </div>
        );
    };/*Drag and Drop options (image)*/

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{
                    fontSize: '5em',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-b)',
                    color: 'var(--surface-d)'
                }}></i>
                <span style={{fontSize: '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">
                    Arrastra y suelta las imágenes aquí
                </span>
            </div>
        );
    };/*Drag and Drop options (image)*/
    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100}/>
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" style={{width: '50%'}}/>
                    </span>
                </div>
                {/*<Tag value={props.formatSize} severity="warning" className="px-3 py-2"/>*/}
                <Button type="button" icon="pi pi-times"
                        className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                        onClick={() => onTemplateRemove(file, props.onRemove)}/>
            </div>
        );
    };/*Drag and Drop options (image)*/

    const header = renderHeader();/*Header de la tabla*/


    return (
        <div className="sm:relative md:relative col-12 sm:col-12 md:col lg:col p-2 ml-2 sm:ml-2">
            <Toast ref={toast}/>
            <div className="card grid mt-2">
                <div className="col-12">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                </div>
                <div className="col-12">
                    <DataTable
                        ref={dt}
                        value={accesorios}
                        selection={selectedAccesorios}
                        onSelectionChange={(e) => setSelectedAccesorios(e.value)}
                        dataKey="id"
                        removableSort
                        filters={filters}
                        globalFilterFields={['name', 'price', 'cant']}
                        paginator rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Muestra {first} de {last} del {totalRecords} accesorios"
                        scrollable
                        scrollHeight="400px"
                        virtualScrollerOptions={{itemSize: 46}} tableStyle={{minWidth: '50rem'}}
                        globalFilter={globalFilter}
                        header={header}
                    >
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="name" header="Nombre" sortable filter
                                filterPlaceholder="Bucar por nombre"
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                style={{minWidth: '16rem'}}></Column>
                        <Column field="image" header="Imagen" body={imageBodyTemplate}></Column>
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
                        <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}></Column>
                    </DataTable>
                </div>
            </div>

            <Tooltip target=".custom-choose-btn" content="Elegir" position="bottom"/>
            <Tooltip target=".custom-cancel-btn" content="Limpiar" position="bottom"/>

            <Dialog visible={accesorioDialog}
                    style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    modal
                    className="p-fluid"
                    footer={accesorioDialogFooter}
                    onHide={hideDialog}
            >

                <form id="accesorio-form" onSubmit={save}>
                    <div className="field">
                        <FileUpload
                            // ref={fileUploadRef}
                            name="files"
                            accept="image/*"
                            multiple
                            customUpload={true}
                            className="p-mr-2"
                            maxFileSize={1000000}
                            mode="advanced"
                            header={headerTemplate}
                            onSelect={onTemplateSelect}
                            onError={onTemplateClear}
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate}
                            itemTemplate={itemTemplate}
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions}
                            cancelOptions={cancelOptions}
                            onSelect={(e) => {

                                let _totalSize = totalSize;
                                let files = e.files;
                                Object.keys(files).forEach((key) => {
                                    _totalSize += files[key].size || 0;
                                });
                                setTotalSize(_totalSize);

                                const val = e.files;
                                let _accesorio = {...accesorio};
                                _accesorio[`${'files'}`] = val;
                                setAccesorio(_accesorio);
                            }}
                        />
                    </div>

                    <div className="field">

                        <label htmlFor="name" className="font-bold">
                            Name
                        </label>
                        <InputText id="name" value={accesorio.name} onChange={(e) => onInputChange(e, 'name')}
                                   required autoFocus
                                   className={classNames({'p-invalid': submitted && !accesorio.name})}/>
                        {submitted && !accesorio.name && <small className="p-error">Name is required.</small>}
                    </div>

                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="price" className="font-bold">
                                Price
                            </label>
                            <InputNumber id="price" value={accesorio.price}
                                         onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency"
                                         currency="USD" locale="en-US"/>
                            <Slider value={accesorio.price} onChange={(e) => onInputNumberChange(e, 'price')}
                                    className="w-full"/>
                        </div>
                        <div className="field col">
                            <label htmlFor="cant" className="font-bold">
                                Cantidad
                            </label>
                            <InputNumber id="cant" value={accesorio.cant}
                                         onValueChange={(e) => onInputNumberChange(e, 'cant')}/>
                            <Slider value={accesorio.cant} onChange={(e) => onInputNumberChange(e, 'cant')}
                                    className="w-full"/>
                        </div>
                    </div>
                </form>
            </Dialog>


            <Dialog visible={deleteAccesorioDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteAccesorioDialogFooter} onHide={hideDeleteAccesorioDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {accesorio && (
                        <span>
                            ¿ Esta seguro que desea eliminar  este producto ?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteAccesoriosDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteAccesoriosDialogFooter} onHide={hideDeleteAccesoriosDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {accesorio && <span>"¿Esta seguro que desea eliminar los productos seleccionados?</span>}
                </div>
            </Dialog>

        </div>

    );
}