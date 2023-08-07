"use client"

import React, {useState, useEffect, useRef} from 'react';

//Components
import MovileService from "@services/MovileServie";
import Tools from "@components/pages/Product/Tools";
import Table from "@components/pages/Product/Table";
import DialogForm from "@components/pages/Product/DialogForm";
import DeleteProductDialog from "@components/pages/Product/DeleteProductDialog";
import DeleteProductsDialog from "@components/pages/Product/DeleteProductsDialog";

//primereact
import {Fieldset} from 'primereact/fieldset';
import {Button} from "primereact/button";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';
import {Tag} from "primereact/tag";
import FieldsMovile from "@components/pages/Product/Movile/FieldsMovile";


export default function Movile(props) {

    let emptyMovile = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        sizeStorage: 0,
        ram: 0,
        camaraTrasera: 0,
        camaraFrontal: 0,
        banda2G: false,
        banda3G: false,
        banda4G: false,
        banda5G: false,
        bateria: 0,
    };

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        sizeStorage: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        ram: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        camaraTrasera: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        camaraFrontal: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        banda2G: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        banda3G: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        banda4G: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        banda5G: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        bateria: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant',
        'sizeStorage', 'ram', 'camaraTrasera', 'camaraFrontal',
        'banda2G', 'banda3G', 'banda4G', 'banda5G', 'bateria'];

    const columns = [
        {field: 'name', header: 'Nombre'},
        {field: 'price', header: 'Precio'},
        {field: 'cant', header: 'Cantidad'},
        {field: 'sizeStorage', header: 'Almacenamiento'},
        {field: 'ram', header: 'Ram'},
        {field: 'camaraTrasera', header: 'Camara trasera'},
        {field: 'camaraFrontal', header: 'Camara frontal'},
        {field: 'banda2G', header: 'Banda 2G'},
        {field: 'banda3G', header: 'Banda 3G'},
        {field: 'banda4G', header: 'Banda 4G'},
        {field: 'banda5G', header: 'Banda 5G'},
        {field: 'bateria', header: 'Duración bateria'},
    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [movileDialog, setMovileDialog] = useState(false);
    const [deleteMovilDialog, setDeleteMovileDialog] = useState(false);
    const [deleteMovilesDialog, setDeleteMovilesDialog] = useState(false);

    const [movile, setMovile] = useState(emptyMovile);
    const [moviles, setMoviles] = useState(null);
    const [selectedMoviles, setSelectedMoviles] = useState(null);

    const movileService = new MovileService();

    useEffect(() => {
        movileService.getAll().then((data) => setMoviles(data));
    });

    const openNew = () => {
        setSubmitted(false);
        setMovile(emptyMovile);
        setMovileDialog(true);
        setEditActive(false);
    }; /*Abrir nueva ventana para crear un objeto*/

    const confirmDeleteSelected = () => {
        if (selectedMoviles.length > 1) {
            setDeleteMovilesDialog(true);
        }
        if (selectedMoviles.length === 1) {
            setMovile(selectedMoviles[0]);
            setDeleteMovileDialog(true);
        }
    }; /*Abrir el dialog de confirmacion de eliminacion de los objetos*/

    const onSelectionChangeSelectedObjects = (e) => {
        setSelectedMoviles(e.value);
    } /*Se encarga de obtener la informacion de los objetos seleccionados*/

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"
                        onClick={() => edit(rowData)}
                />
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteMovile(rowData)}
                />
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/
    const hideDialog = (e) => {
        setMovileDialog(false);
        setSubmitted(false);
    }; /*Ocultar dialog de anadir*/

    const save = () => {
        setSubmitted(true);

        if (movile.id !== null) {
            //Actualizar
            const formData = new FormData();
            formData.append('id', movile.id);
            formData.append('name', movile.name);
            formData.append('price', movile.price);
            formData.append('cant', movile.cant);
            formData.append('sizeStorage', movile.sizeStorage);
            formData.append('ram', movile.ram);
            formData.append('camaraTrasera', movile.camaraTrasera);
            formData.append('camaraFrontal', movile.camaraFrontal);
            formData.append('banda2G', movile.banda2G);
            formData.append('banda3G', movile.banda3G);
            formData.append('banda4G', movile.banda4G);
            formData.append('banda5G', movile.banda5G);
            formData.append('bateria', movile.bateria);

            movile.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            movileService.update(formData, movile.id).then(data => {
                setMovile(emptyMovile);
                //Actualiza la lista
                movileService.getAll().then(data => setMoviles(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se actualizó el producto correctamente",
                    life: 2000
                });
                setMovileDialog(false);
                setEditActive(false);
                setSelectedMoviles(null);
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
            formData.append('name', movile.name);
            formData.append('price', movile.price);
            formData.append('cant', movile.cant);
            formData.append('sizeStorage', movile.sizeStorage);
            formData.append('ram', movile.ram);
            formData.append('camaraTrasera', movile.camaraTrasera);
            formData.append('camaraFrontal', movile.camaraFrontal);
            formData.append('banda2G', movile.banda2G);
            formData.append('banda3G', movile.banda3G);
            formData.append('banda4G', movile.banda4G);
            formData.append('banda5G', movile.banda5G);
            formData.append('bateria', movile.bateria);
            movile.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            movileService.save(formData).then(data => {
                setMovile(emptyMovile);
                //Actualiza la lista
                movileService.getAll().then(data => setMoviles(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el producto correctamente",
                    life: 2000
                });
                setMovileDialog(false);
                setEditActive(false);
                setSelectedMoviles(null);
            }).catch((error) => {
                toast.current.show({
                    severity: 'danger',
                    summary: 'Atención!',
                    detail: "Error al guardar el producto",
                    life: 2000
                });
            });
        }
    }; /*Crear o actualizar la informacion de un objeto*/

    const edit = (movile) => {
        setEditActive(true);
        setMovile(movile);
        setMovileDialog(true);
    };/*Editar la informacion de un objeto existente*/

    const onTemplateSelect = (e) => {
        const val = e.files;
        let _movile = {...movile};
        _movile[`${'files'}`] = val;
        setMovile(_movile);
    };/*Drag and Drop options (image)*/
    const onTemplateRemove = (file, callback) => {
        //Eliminar de la lista el elemento
        let objetoElimnmar = movile.files.find(objeto => objeto === file); //Comprobamos que el objeto existe en la lista
        let indiceAEiminar = movile.files.indexOf(objetoElimnmar); //Buscamos su indice exacto
        movile.files.splice(indiceAEiminar, 1); //Eliminamos este objeto pasando su indice y la cant de elemntos a elimnar despues de el
        callback();
    };/*Drag and Drop options (image)*/
    const onTemplateClear = () => {
        movile.files = [];
    };/*Drag and Drop options (image)*/
    const headerTemplate = (options) => {
        const {className, chooseButton, cancelButton} = options;

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {cancelButton}
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
    const onInputTextChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _movile = {...movile};
        _movile[`${name}`] = val;
        setMovile(_movile);
    };/*Modifica el valor del nombre del objeto*/
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _movile = {...movile};
        _movile[`${name}`] = val;
        setMovile(_movile);
    }; /*Modifica el valor de un numero especificado del objeto*/
    const onCheckBoxChange = (e, name) => {
        const val = e.checked || false;
        let _movile = {...movile};
        _movile[`${name}`] = val;
        setMovile(_movile);
    }; /*Modifica el valor de un bool especificado del objeto*/

    const hideDeleteMovileDialog = () => {
        setDeleteMovileDialog(false);
    };/*Ocultar dialog de eliminar un objeto*/
    const deleteMovile = () => {
        let _moviles = moviles.filter((val) => val.id === movile.id);

        movileService.delete(_moviles[0].id).then(data => {
            //Actualiza la lista de productos
            movileService.getAll().then(data => setMoviles(data));
            setDeleteMovileDialog(false);
            setSelectedMoviles(false);
            setMovile(emptyMovile);
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
    };/*Elimnar un Objeto*/
    const confirmDeleteMovile = (movile) => {
        setMovile(movile);
        setDeleteMovileDialog(true);
    };
    const hideDeleteMovilesDialog = () => {
        setDeleteMovilesDialog(false);
    };/*Ocultar dialog de eliminar varios objetos*/
    const deleteSelectedMoviles = () => {

        movileService.deleteAll(selectedMoviles).then((data) => {
            setMoviles(data);
            setDeleteMovilesDialog(false);
            setSelectedMoviles(false);
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
    };/*Eliminar varios objetos*/

    const formFields = (
        <FieldsMovile
            submitted={submitted}
            object={movile}
            onInputTextChange={onInputTextChange}
            onInputNumberChange={onInputNumberChange}
            onCheckBoxChange={onCheckBoxChange}
        />
    );//Campos especificos del formulario

    const legendTemplate = (<div className="flex align-items-center ">
        <span className="pi pi-user mr-2"></span>
        <span className="font-bold text-lg">Dispositivos moviles</span>
    </div>);

    return (
        <div className="sm:relative md:relative col-12 sm:col-12 md:col lg:col p-2 ml-2 sm:ml-2">
            <Toast ref={toast}/>
            <div className="card grid mt-2">
                <Fieldset legend={legendTemplate} className="col-12">
                    <div className="col-12">
                        <Tools
                            openNew={openNew}
                            confirmDeleteSelected={confirmDeleteSelected}
                            selectedObjects={selectedMoviles}
                            objects={moviles}
                            columns={columns}
                            dt={dt}
                            fileName={'movile'}
                        /> {/*barra de herramientas*/}
                    </div>
                    <div className="col-12">

                        <Table
                            headerLabel={'moviles'}
                            dt={dt}
                            objects={moviles}
                            selectedObjects={selectedMoviles}
                            setSelectedObject={onSelectionChangeSelectedObjects}
                            emptyFilters={emptyFilters}
                            globalFilterFields={globalFilterFields}
                            actionBodyTemplate={actionBodyTemplate}
                        />

                    </div>
                </Fieldset>

                <DialogForm
                    visible={movileDialog}
                    submitted={submitted}
                    object={movile}
                    editActive={editActive}
                    hideDialog={hideDialog}
                    save={save}
                    headerTemplate={headerTemplate}
                    onTemplateSelect={onTemplateSelect}
                    onTemplateRemove={onTemplateRemove}
                    onTemplateClear={onTemplateClear}
                    emptyTemplate={emptyTemplate}
                    itemTemplate={itemTemplate}
                    onInputTextChange={onInputTextChange}
                    onInputNumberChange={onInputNumberChange}
                    otherfields={formFields}
                />

                <DeleteProductDialog
                    visible={deleteMovilDialog}
                    hideDialog={hideDeleteMovileDialog}
                    object={movile}
                    delete={deleteMovile}
                />

                <DeleteProductsDialog
                    visible={deleteMovilesDialog}
                    hideDialog={hideDeleteMovilesDialog}
                    delete={deleteSelectedMoviles}
                    object={movile}
                />

            </div>
        </div>
    );

}
