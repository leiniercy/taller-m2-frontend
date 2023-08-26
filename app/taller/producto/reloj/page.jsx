"use client"

import React, {useState, useEffect, useRef} from 'react';
import {useSession} from "next-auth/react";

//Components
import RelojService from "@services/RelojService";
import Tools from "@components/pages/Product/Tools";
import Table from "@components/pages/Product/Table";
import DialogForm from "@components/pages/Product/DialogForm";
import DeleteProductDialog from "@components/pages/Product/DeleteProductDialog";
import DeleteProductsDialog from "@components/pages/Product/DeleteProductsDialog";
import RenderLayout from "@components/layout/RenderLayout";
import CustomFieldset from "@components/layout/CustomFieldSet";
import FieldsReloj from "@components/pages/Product/Reloj/FieldsReloj";

//primereact
import {Button} from "primereact/button";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';


export default function Reloj(props) {

    const {data: session, status} = useSession();

    if (status === 'authenticated' && session?.user !== undefined && session?.user.rol !== "ROLE_ADMIN") {
        throw new Error('Access denied')
    }

    let emptyReloj = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        taller: '',
        specialFeature: '',
        compatibleDevice: '',
        bateryLife: 0
    };

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        taller: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        specialFeature: {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        compatibleDevice: {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        bateryLife: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant', 'taller', 'specialFeature', 'compatibleDevice', 'bateryLife'
    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [relojDialog, setRelojDialog] = useState(false);
    const [deleteRelojDialog, setDeleteRelojDialog] = useState(false);
    const [deleteRelojesDialog, setDeleteRelojesDialog] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);

    const [nameValid, setNameValid] = useState(true);
    const [priceValid, setPriceValid] = useState(true);
    const [cantValid, setCantValid] = useState(true);
    const [specialFeatureValid, setSpecialFeatureValid] = useState(true);
    const [compatibleDeviceValid, setCompatibleDeviceValid] = useState(true);
    const [bateryLifeValid, setBateryLifeValid] = useState(true);

    const [reloj, setReloj] = useState(emptyReloj);
    const [relojes, setRelojes] = useState(null);
    const [selectedRelojes, setSelectedRelojes] = useState(null);

    const relojService = new RelojService();

    useEffect(() => {
        relojService.getAll().then((data) => setRelojes(data));
    }, []);
    const openNew = () => {
        setSubmitted(false);
        setReloj(emptyReloj);
        setRelojDialog(true);
        setEditActive(false);
        setImageSelected(false);
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
    const validForm = () => {
        //Si no se selecciono ninguna imagen
        if (reloj.files === null || reloj.files === undefined) {
            return false;
        }

        const nameRegex = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar nombres de producto
        if (!nameRegex.test(reloj.name) || reloj.name === '') {
            setNameValid(false);
            return false;
        } else {
            setNameValid(true);
        }

        if (reloj.price < 0 || reloj.price === undefined) {
            setPriceValid(false);
            return false;
        } else {
            setPriceValid(true);
        }

        if (reloj.cant < 0 || reloj.cant === undefined) {
            setCantValid(false);
            return false;
        } else {
            setCantValid(true);
        }

        //Si no se selecciono algun taller
        if (reloj.taller === '') {
            return false;
        }

        const specialFeatureRegex = /^[,.a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar las funcionalidades del reloj
        if (!specialFeatureRegex.test(reloj.specialFeature) || reloj.specialFeature === '') {
            setSpecialFeatureValid(false);
            return false;
        } else {
            setSpecialFeatureValid(true);
        }

        const compatibleDeviceRegex = /^[,.a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar los dispositivos compatibles
        if (!compatibleDeviceRegex.test(reloj.compatibleDevice) || reloj.compatibleDevice === '') {
            setCompatibleDeviceValid(false);
            return false;
        } else {
            setCompatibleDeviceValid(true);
        }

        if (reloj.bateryLife < 0 || reloj.bateryLife === undefined) {
            setBateryLifeValid(false);
            return false;
        } else {
            setBateryLifeValid(true);
        }

        return true;
    } //Validacion de los campos del formulario
    const save = () => {
        setSubmitted(true);

        if (validForm()) {
            const formData = new FormData();
            formData.append('id', reloj.id);
            formData.append('name', reloj.name);
            formData.append('price', reloj.price);
            formData.append('cant', reloj.cant);
            formData.append('taller', reloj.taller.name);
            formData.append('specialFeature', reloj.specialFeature);
            formData.append('compatibleDevice', reloj.compatibleDevice);
            formData.append('bateryLife', reloj.bateryLife);
            if (editActive) {
                //Actualizar
                if (!imageSelected) {
                    reloj.files.forEach((file, i) => {
                        let blob = new Blob([file.url], {type: 'image/png'});
                        let f = new File([blob], file.name, {type: 'image/png'});
                        formData.append('files', f);
                    });
                } else {
                    reloj.files.forEach((file, i) => {
                        formData.append('files', file);
                    });
                }

                //Guardar en la BD y actualiza el estado de la informacion
                relojService.update(formData, reloj.id).then(data => {
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se actualizó el producto correctamente",
                        life: 2000
                    });
                    //Actualiza la lista
                    relojService.getAll().then(data => setRelojes(data));
                    setRelojDialog(false);
                    setImageSelected(false);
                    setEditActive(false);
                    setSelectedRelojes(null);
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
                reloj.files.forEach((file, i) => {
                    formData.append('files', file);
                });

                //Guardar en la BD y actualiza el estado de la informacion
                relojService.save(formData).then(data => {
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se creó el producto correctamente",
                        life: 2000
                    });
                    //Actualiza la lista
                    relojService.getAll().then(data => setRelojes(data));
                    setRelojDialog(false);
                    setEditActive(false);
                    setSelectedRelojes(null);
                }).catch((error) => {
                    toast.current.show({
                        error: error,
                        severity: 'danger',
                        summary: 'Atención!',
                        detail: "Error: El producto ya existe",
                        life: 2000
                    });
                });
            }
        }
    }; /*Crear o actualizar la informacion de un objeto*/
    const edit = (reloj) => {
        setEditActive(true);
        setImageSelected(false);
        setReloj(reloj);
        if (reloj.taller === 'Taller 2M') {
            let _reloj = {...reloj};
            _reloj[`${'taller'}`] = {name: 'Taller 2M', code: '2M'};
            setReloj(_reloj);
        } else {
            let _reloj = {...reloj};
            _reloj[`${'taller'}`] = {name: 'Taller MJ', code: 'MJ'};
            setReloj(_reloj);
        }
        setRelojDialog(true);
    };/*Editar la informacion de un objeto existente*/
    const onTemplateSelect = (e) => {
        setImageSelected(true);
        const val = e.files;
        let _reloj = {...reloj};
        _reloj[`${'files'}`] = val;
        setReloj(_reloj);
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
    const onChangeSelectedBoxTaller = (e) => {
        const val = e.value || '';
        let _reloj = {...reloj};
        _reloj[`${'taller'}`] = val;
        setReloj(_reloj);
    } //Modifica el estado de seleccion del selectbox del taller
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

    const formFields = (<FieldsReloj
        submitted={submitted}
        object={reloj}
        specialFeatureValid={specialFeatureValid}
        compatibleDeviceValid={compatibleDeviceValid}
        bateryLifeValid={bateryLifeValid}
        onInputTextChange={onInputTextChange}
        onInputNumberChange={onInputNumberChange}
    />);//Campos especificos del formulario

    return (
        <RenderLayout>

            <CustomFieldset label={'Relojes inteligentes'} icon={'pi-amazon'}>
                <div className="col-12">
                    <Tools
                        openNew={openNew}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedObjects={selectedRelojes}
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
            </CustomFieldset>
            <Toast ref={toast}/>
            <DialogForm
                visible={relojDialog}
                submitted={submitted}
                object={reloj}
                editActive={editActive}
                hideDialog={hideDialog}
                save={save}
                onTemplateSelect={onTemplateSelect}
                onInputTextChange={onInputTextChange}
                onInputNumberChange={onInputNumberChange}
                onChangeSelectedBoxTaller={onChangeSelectedBoxTaller}
                otherfields={formFields}
                imageSelected={imageSelected}
                nameValid={nameValid}
                priceValid={priceValid}
                cantValid={cantValid}
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

        </RenderLayout>
    );

}
