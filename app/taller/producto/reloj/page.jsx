"use client"

import React, {useState, useEffect, useRef} from 'react';

//Components
import RelojService from "@services/RelojService";
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
import FieldsReloj from "@components/pages/Product/Reloj/FieldsReloj";


export default function Reloj(props) {

    let emptyReloj = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        specialFeature:'',
        compatibleDevice:'',
        bateryLife: 0
    };

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        specialFeature: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        compatibleDevice: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        bateryLife: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant','specialFeature','compatibleDevice','bateryLife'
    ];

    const columns = [
        {field: 'name', header: 'Nombre'},
        {field: 'price', header: 'Precio'},
        {field: 'cant', header: 'Cantidad'},
        {field: 'specialFeature', header: 'specialFeature'},
        {field: 'compatibleDevice', header: 'compatibleDevice'},
        {field: 'bateryLife', header: 'bateryLife'},

    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [relojDialog, setRelojDialog] = useState(false);
    const [deleteRelojDialog, setDeleteRelojDialog] = useState(false);
    const [deleteRelojesDialog, setDeleteRelojesDialog] = useState(false);

    const [reloj, setReloj] = useState(emptyReloj);
    const [relojes, setRelojes] = useState(null);
    const [selectedRelojes, setSelectedRelojes] = useState(null);

    const relojService = new RelojService();

    useEffect(() => {
        relojService.getAll().then((data) => setRelojes(data));
    });

    const openNew = () => {
        setSubmitted(false);
        setReloj(emptyReloj);
        setRelojDialog(true);
        setEditActive(false);
    }; /*Abrir nueva ventana para crear un objeto*/

    const confirmDeleteSelected = () => {
        if (selectedRelojes.length > 1) {
            setDeleteRelojesDialog(true);
        }
        if (selectedRelojes.length === 1) {
            setReloj(selectedRelojes[0]);
            setDeleteRelojDialog(true);
        }
    }; /*Abrir el dialog de confirmacion de eliminacion de los objetos*/

    const onSelectionChangeSelectedObjects = (e) => {
        setSelectedRelojes(e.value);
    } /*Se encarga de obtener la informacion de los objetos seleccionados*/

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"
                        onClick={() => edit(rowData)}
                />
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteReloj(rowData)}
                />
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/
    const hideDialog = (e) => {
        setRelojDialog(false);
        setSubmitted(false);
    }; /*Ocultar dialog de anadir*/

    const save = () => {
        setSubmitted(true);

        if (reloj.id !== null) {
            //Actualizar
            const formData = new FormData();
            formData.append('id', reloj.id);
            formData.append('name', reloj.name);
            formData.append('price', reloj.price);
            formData.append('cant', reloj.cant);
            formData.append('specialFeature', reloj.specialFeature);
            formData.append('compatibleDevice', reloj.compatibleDevice);
            formData.append('bateryLife', reloj.bateryLife);
            reloj.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            relojService.update(formData, reloj.id).then(data => {
                setReloj(emptyReloj);
                //Actualiza la lista
                relojService.getAll().then(data => setRelojes(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se actualizó el producto correctamente",
                    life: 2000
                });
                setRelojDialog(false);
                setEditActive(false);
                setSelectedRelojes(null);
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
            formData.append('name', reloj.name);
            formData.append('price', reloj.price);
            formData.append('cant', reloj.cant);
            formData.append('specialFeature', reloj.specialFeature);
            formData.append('compatibleDevice', reloj.compatibleDevice);
            formData.append('bateryLife', reloj.bateryLife);
            reloj.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            relojService.save(formData).then(data => {
                setReloj(emptyReloj);
                //Actualiza la lista
                relojService.getAll().then(data => setRelojes(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el producto correctamente",
                    life: 2000
                });
                setRelojDialog(false);
                setEditActive(false);
                setSelectedRelojes(null);
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

    const edit = (reloj) => {
        setEditActive(true);
        setReloj(reloj);
        setRelojDialog(true);
    };/*Editar la informacion de un objeto existente*/

    const onTemplateSelect = (e) => {
        const val = e.files;
        let _reloj = {...reloj};
        _reloj[`${'files'}`] = val;
        setReloj(_reloj);
    };/*Drag and Drop options (image)*/
    const onTemplateRemove = (file, callback) => {
        //Eliminar de la lista el elemento
        let objetoElimnmar = reloj.files.find(objeto => objeto === file); //Comprobamos que el objeto existe en la lista
        let indiceAEiminar = reloj.files.indexOf(objetoElimnmar); //Buscamos su indice exacto
        reloj.files.splice(indiceAEiminar, 1); //Eliminamos este objeto pasando su indice y la cant de elemntos a elimnar despues de el
        callback();
    };/*Drag and Drop options (image)*/
    const onTemplateClear = () => {
        reloj.files = [];
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
        let _reloj = {...reloj};
        _reloj[`${name}`] = val;
        setReloj(_reloj);
    };/*Modifica el valor del nombre del objeto*/
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _reloj = {...reloj};
        _reloj[`${name}`] = val;
        setReloj(_reloj);
    }; /*Modifica el valor de un numero especificado del objeto*/
    const onCheckBoxChange = (e, name) => {
        const val = e.checked || false;
        let _reloj = {...reloj};
        _reloj[`${name}`] = val;
        setReloj(_reloj);
    }; /*Modifica el valor de un bool especificado del objeto*/

    const hideDeleteRelojDialog = () => {
        setDeleteRelojDialog(false);
    };/*Ocultar dialog de eliminar un objeto*/
    const deleteReloj = () => {
        let _relojes = relojes.filter((val) => val.id === reloj.id);

        relojService.delete(_relojes[0].id).then(data => {
            //Actualiza la lista de productos
            relojService.getAll().then(data => setRelojes(data));
            setDeleteRelojDialog(false);
            setSelectedRelojes(false);
            setReloj(emptyReloj);
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
    const confirmDeleteReloj = (reloj) => {
        setReloj(reloj);
        setDeleteRelojDialog(true);
    };
    const hideDeleteRelojesDialog = () => {
        setDeleteRelojesDialog(false);
    };/*Ocultar dialog de eliminar varios objetos*/
    const deleteSelectedRelojes = () => {

        relojService.deleteAll(selectedRelojes).then((data) => {
            setRelojes(data);
            setDeleteRelojesDialog(false);
            setSelectedRelojes(false);
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
        <FieldsReloj
            submitted={submitted}
            object={reloj}
            onInputTextChange={onInputTextChange}
            onInputNumberChange={onInputNumberChange}
        />
    );//Campos especificos del formulario

    const legendTemplate = (<div className="flex align-items-center ">
        <span className="pi pi-user mr-2"></span>
        <span className="font-bold text-lg">Relojes inteligentes</span>
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
                            selectedObjects={selectedRelojes}
                            objects={relojes}
                            columns={columns}
                            dt={dt}
                            fileName={'reloj'}
                        /> {/*barra de herramientas*/}
                    </div>
                    <div className="col-12">

                        <Table
                            headerLabel={'cargadores'}
                            dt={dt}
                            objects={relojes}
                            selectedObjects={selectedRelojes}
                            setSelectedObject={onSelectionChangeSelectedObjects}
                            emptyFilters={emptyFilters}
                            globalFilterFields={globalFilterFields}
                            actionBodyTemplate={actionBodyTemplate}
                        />

                    </div>
                </Fieldset>

                <DialogForm
                    visible={relojDialog}
                    submitted={submitted}
                    object={reloj}
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
                    visible={deleteRelojDialog}
                    hideDialog={hideDeleteRelojDialog}
                    object={reloj}
                    delete={deleteReloj}
                />

                <DeleteProductsDialog
                    visible={deleteRelojesDialog}
                    hideDialog={hideDeleteRelojesDialog}
                    delete={deleteSelectedRelojes}
                    object={reloj}
                />

            </div>
        </div>
    );

}
