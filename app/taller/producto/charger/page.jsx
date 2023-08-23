"use client"

import React, {useState, useEffect, useRef} from 'react';

//Components
import ChargerService from "@services/ChargerService";
import Tools from "@components/pages/Product/Tools";
import Table from "@components/pages/Product/Table";
import DialogForm from "@components/pages/Product/DialogForm";
import DeleteProductDialog from "@components/pages/Product/DeleteProductDialog";
import DeleteProductsDialog from "@components/pages/Product/DeleteProductsDialog";
import FieldsCharjer from "@components/pages/Product/Charger/FieldsCharjer";
import RenderLayout from "@components/layout/RenderLayout";
import ProductFieldset from "@components/pages/Product/ProductFieldset";


//primereact
import {Button} from "primereact/button";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';
import {Tag} from "primereact/tag";


export default function Charger(props) {


    let emptyCharger = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        taller: '',
        connectorType: '',
        compatibleDevice: ''
    };

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        taller: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        connectorType: {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        compatibleDevice: {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant', 'taller', 'connectorType', 'compatibleDevice'
    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [chargerDialog, setChargerDialog] = useState(false);
    const [deleteChargerDialog, setDeleteChargerDialog] = useState(false);
    const [deleteChargersDialog, setDeleteChargersDialog] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);

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
        setImageSelected(false);
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

        if (editActive) {
            //Actualizar
            const formData = new FormData();
            formData.append('id', charger.id);
            formData.append('name', charger.name);
            formData.append('price', charger.price);
            formData.append('cant', charger.cant);
            formData.append('taller', charger.taller.name);
            formData.append('connectorType', charger.connectorType);
            formData.append('compatibleDevice', charger.compatibleDevice);

            if (!imageSelected) {
                charger.files.forEach((file, i) => {
                    let blob = new Blob([file.url], {type: 'image/png'});
                    let f = new File([blob], file.name, {type: 'image/png'});
                    formData.append('files', f);
                });
            } else {
                charger.files.forEach((file, i) => {
                    formData.append('files', file);
                });
            }

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
                setImageSelected(false);
                setSelectedChargers(null);
            }).catch((error) => {
                toast.current.show({
                    error: error,
                    severity: 'danger',
                    summary: 'Atención!',
                    detail: "Error: El producto no existe",
                    life: 2000
                });
            });

        } else {
            //Crear Producto
            const formData = new FormData();
            formData.append('name', charger.name);
            formData.append('price', charger.price);
            formData.append('cant', charger.cant);
            formData.append('taller', charger.taller.name);
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
                    severity: 'success', summary: 'Atención!', detail: "Se creó el producto correctamente", life: 2000
                });
                setChargerDialog(false);
                setEditActive(false);
                setSelectedChargers(null);
            }).catch((error) => {
                toast.current.show({
                    error: error,
                    severity: 'danger',
                    summary: 'Atención!',
                    detail: "Error el producto ya existe",
                    life: 2000
                });
            });
        }
    }; /*Crear o actualizar la informacion de un objeto*/

    const edit = (charger) => {
        setEditActive(true);
        setCharger(charger);
        setImageSelected(false);
        if(charger.taller === 'Taller 2M'){
            let _charger = {...charger};
            _charger[`${'taller'}`] = {name: 'Taller 2M', code: '2M'};
            setCharger(_charger);
        }else{
            let _charger = {...charger};
            _charger[`${'taller'}`] = {name: 'Taller MJ', code: 'MJ'};
            setCharger(_charger);
        }
        setChargerDialog(true);
    };/*Editar la informacion de un objeto existente*/
    const onTemplateSelect = (e) => {
        setImageSelected(true);
        const val = e.files;
        let _charger = {...charger};
        _charger[`${'files'}`] = val;
        setCharger(_charger);
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
    const onChangeSelectedBoxTaller = (e) => {
        const val = e.value || '';
        let _charger = {...charger};
        _charger[`${'taller'}`] = val;
        setCharger(_charger);
    } //Modifica el estado de seleccion del selectbox del taller
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


    return (
        <RenderLayout>
            <Toast ref={toast}/>
            <ProductFieldset label={'Dispositivos de carga'}>
                <div className="col-12">
                    <Tools
                        openNew={openNew}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedObjects={selectedChargers}
                        objects={chargers}
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
            </ProductFieldset>

            <DialogForm
                visible={chargerDialog}
                submitted={submitted}
                object={charger}
                editActive={editActive}
                hideDialog={hideDialog}
                save={save}
                onTemplateSelect={onTemplateSelect}
                onInputTextChange={onInputTextChange}
                onInputNumberChange={onInputNumberChange}
                onChangeSelectedBoxTaller={onChangeSelectedBoxTaller}
                otherfields={formFields}
                imageSelected={imageSelected}
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

        </RenderLayout>
    );

}
