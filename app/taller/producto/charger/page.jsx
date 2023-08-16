"use client"

import React, {useState, useEffect, useRef} from 'react';
import {useSession} from "next-auth/react";

//Components
import ChargerService from "@services/ChargerService";
import Tools from "@components/pages/Product/Tools";
import Table from "@components/pages/Product/Table";
import DialogForm from "@components/pages/Product/DialogForm";
import DeleteProductDialog from "@components/pages/Product/DeleteProductDialog";
import DeleteProductsDialog from "@components/pages/Product/DeleteProductsDialog";
import FieldsCharjer from "@components/pages/Product/Charger/FieldsCharjer";
import RenderLayout from "@components/layout/RenderLayout";
import AccessDeniedPage from "@components/pages/Error/AccessDeniedPage";


//primereact
import {Fieldset} from 'primereact/fieldset';
import {Button} from "primereact/button";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';
import {Tag} from "primereact/tag";


export default function Charger(props) {


    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    });

    if(session?.user.rol !=='ROLE_ADMIN'){
        return (
            <RenderLayout>
                <AccessDeniedPage/>
            </RenderLayout>
        );
    }

    let emptyCharger = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        connectorType:'',
        compatibleDevice:''
    };

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        connectorType: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        compatibleDevice: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant','connectorType','compatibleDevice'
        ];

    const columns = [
        {field: 'name', header: 'Nombre'},
        {field: 'price', header: 'Precio'},
        {field: 'cant', header: 'Cantidad'},
        {field: 'connectorType', header: 'connectorType'},
        {field: 'compatibleDevice', header: 'compatibleDevice'},
    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [chargerDialog, setChargerDialog] = useState(false);
    const [deleteChargerDialog, setDeleteChargerDialog] = useState(false);
    const [deleteChargersDialog, setDeleteChargersDialog] = useState(false);

    const [charger, setCharger] = useState(emptyCharger);
    const [chargers, setChargers] = useState(null);
    const [selectedChargers, setSelectedChargers] = useState(null);

    const chargerService = new ChargerService();

    useEffect(() => {
        chargerService.getAll().then((data) => setChargers(data));
    });

    const openNew = () => {
        setSubmitted(false);
        setCharger(emptyCharger);
        setChargerDialog(true);
        setEditActive(false);
    }; /*Abrir nueva ventana para crear un objeto*/

    const confirmDeleteSelected = () => {
        if (selectedChargers.length > 1) {
            setDeleteChargersDialog(true);
        }
        if (selectedChargers.length === 1) {
            setCharger(selectedChargers[0]);
            setDeleteChargerDialog(true);
        }
    }; /*Abrir el dialog de confirmacion de eliminacion de los objetos*/

    const onSelectionChangeSelectedObjects = (e) => {
        setSelectedChargers(e.value);
    } /*Se encarga de obtener la informacion de los objetos seleccionados*/

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"
                        onClick={() => edit(rowData)}
                />
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteCharger(rowData)}
                />
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/
    const hideDialog = (e) => {
        setChargerDialog(false);
        setSubmitted(false);
    }; /*Ocultar dialog de anadir*/

    const save = () => {
        setSubmitted(true);

        if (charger.id !== null) {
            //Actualizar
            const formData = new FormData();
            formData.append('id', charger.id);
            formData.append('name', charger.name);
            formData.append('price', charger.price);
            formData.append('cant', charger.cant);
            formData.append('connectorType', charger.connectorType);
            formData.append('compatibleDevice', charger.compatibleDevice);
            charger.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            chargerService.update(formData, charger.id).then(data => {
                setCharger(emptyCharger);
                //Actualiza la lista
                chargerService.getAll().then(data => setChargers(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se actualizó el producto correctamente",
                    life: 2000
                });
                setChargerDialog(false);
                setEditActive(false);
                setSelectedChargers(null);
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
            formData.append('name', charger.name);
            formData.append('price', charger.price);
            formData.append('cant', charger.cant);
            formData.append('connectorType', charger.connectorType);
            formData.append('compatibleDevice', charger.compatibleDevice);
            charger.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            chargerService.save(formData).then(data => {
                setCharger(emptyCharger);
                //Actualiza la lista
                chargerService.getAll().then(data => setChargers(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el producto correctamente",
                    life: 2000
                });
                setChargerDialog(false);
                setEditActive(false);
                setSelectedChargers(null);
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

    const edit = (charger) => {
        setEditActive(true);
        setCharger(charger);
        setChargerDialog(true);
    };/*Editar la informacion de un objeto existente*/

    const onTemplateSelect = (e) => {
        const val = e.files;
        let _charger = {...charger};
        _charger[`${'files'}`] = val;
        setCharger(_charger);
    };/*Drag and Drop options (image)*/
    const onTemplateRemove = (file, callback) => {
        //Eliminar de la lista el elemento
        let objetoElimnmar = charger.files.find(objeto => objeto === file); //Comprobamos que el objeto existe en la lista
        let indiceAEiminar = charger.files.indexOf(objetoElimnmar); //Buscamos su indice exacto
        charger.files.splice(indiceAEiminar, 1); //Eliminamos este objeto pasando su indice y la cant de elemntos a elimnar despues de el
        callback();
    };/*Drag and Drop options (image)*/
    const onTemplateClear = () => {
        charger.files = [];
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
        let _charger = {...charger};
        _charger[`${name}`] = val;
        setCharger(_charger);
    };/*Modifica el valor del nombre del objeto*/
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _charger = {...charger};
        _charger[`${name}`] = val;
        setCharger(_charger);
    }; /*Modifica el valor de un numero especificado del objeto*/
    const onCheckBoxChange = (e, name) => {
        const val = e.checked || false;
        let _charger = {...charger};
        _charger[`${name}`] = val;
        setCharger(_charger);
    }; /*Modifica el valor de un bool especificado del objeto*/

    const hideDeleteChargerDialog = () => {
        setDeleteChargerDialog(false);
    };/*Ocultar dialog de eliminar un objeto*/
    const deleteCharger = () => {
        let _chargers = chargers.filter((val) => val.id === charger.id);

        chargerService.delete(_chargers[0].id).then(data => {
            //Actualiza la lista de productos
            chargerService.getAll().then(data => setChargers(data));
            setDeleteChargerDialog(false);
            setSelectedChargers(false);
            setCharger(emptyCharger);
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
    const confirmDeleteCharger = (charger) => {
        setCharger(charger);
        setDeleteChargerDialog(true);
    };
    const hideDeleteChargersDialog = () => {
        setDeleteChargersDialog(false);
    };/*Ocultar dialog de eliminar varios objetos*/
    const deleteSelectedChargers = () => {

        chargerService.deleteAll(selectedChargers).then((data) => {
            setChargers(data);
            setDeleteChargersDialog(false);
            setSelectedChargers(false);
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
        <FieldsCharjer
            submitted={submitted}
            object={charger}
            onInputTextChange={onInputTextChange}
        />
    );//Campos especificos del formulario

    const legendTemplate = (<div className="flex align-items-center ">
        <span className="pi pi-user mr-2"></span>
        <span className="font-bold text-lg">Dispositivos de carga</span>
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
                            selectedObjects={selectedChargers}
                            objects={chargers}
                            columns={columns}
                            dt={dt}
                            fileName={'charger'}
                        /> {/*barra de herramientas*/}
                    </div>
                    <div className="col-12">

                        <Table
                            headerLabel={'cargadores'}
                            dt={dt}
                            objects={chargers}
                            selectedObjects={selectedChargers}
                            setSelectedObject={onSelectionChangeSelectedObjects}
                            emptyFilters={emptyFilters}
                            globalFilterFields={globalFilterFields}
                            actionBodyTemplate={actionBodyTemplate}
                        />

                    </div>
                </Fieldset>

                <DialogForm
                    visible={chargerDialog}
                    submitted={submitted}
                    object={charger}
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
                    visible={deleteChargerDialog}
                    hideDialog={hideDeleteChargerDialog}
                    object={charger}
                    delete={deleteCharger}
                />

                <DeleteProductsDialog
                    visible={deleteChargersDialog}
                    hideDialog={hideDeleteChargersDialog}
                    delete={deleteSelectedChargers}
                    object={charger}
                />

            </div>
        </div>
    );

}
