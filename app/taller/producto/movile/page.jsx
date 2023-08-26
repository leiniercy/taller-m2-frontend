"use client"

import React, {useState, useEffect, useRef} from 'react';
import {useSession} from "next-auth/react";

//Components
import MovileService from "@services/MovileServie";
import CustomFieldset from "@components/layout/CustomFieldSet";
import Tools from "@components/pages/Product/Tools";
import Table from "@components/pages/Product/Table";
import DialogForm from "@components/pages/Product/DialogForm";
import DeleteProductDialog from "@components/pages/Product/DeleteProductDialog";
import DeleteProductsDialog from "@components/pages/Product/DeleteProductsDialog";
import FieldsMovile from "@components/pages/Product/Movile/FieldsMovile";
import RenderLayout from "@components/layout/RenderLayout";


//primereact
import {Button} from "primereact/button";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';



export default function Movile(props) {

    const {data: session, status} = useSession();

    if (status === 'authenticated' && session?.user !== undefined && session?.user.rol !== "ROLE_ADMIN") {
        throw new Error('Access denied')
    }

    let emptyMovile = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        taller: '',
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
        'name', 'price', 'cant', 'taller',
        'sizeStorage', 'ram', 'camaraTrasera', 'camaraFrontal',
        'banda2G', 'banda3G', 'banda4G', 'banda5G', 'bateria'];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [movileDialog, setMovileDialog] = useState(false);
    const [deleteMovilDialog, setDeleteMovileDialog] = useState(false);
    const [deleteMovilesDialog, setDeleteMovilesDialog] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);

    const [nameValid, setNameValid] = useState(true);
    const [priceValid, setPriceValid] = useState(true);
    const [cantValid, setCantValid] = useState(true);
    const [sizeStorageValid, setSizeStorageValid] = useState(true);
    const [ramValid, setRamValid] = useState(true);
    const [camaraTraseraValid, setCamaraTraseraValid] = useState(true);
    const [camaraFrontalValid, setCamaraFrontalValid] = useState(true);
    const [bateriaValid, setBateriaValid] = useState(true);

    const [movile, setMovile] = useState(emptyMovile);
    const [moviles, setMoviles] = useState(null);
    const [selectedMoviles, setSelectedMoviles] = useState(null);

    const movileService = new MovileService();

    useEffect(() => {
        movileService.getAll().then((data) => setMoviles(data));
    }, []);

    const openNew = () => {
        setSubmitted(false);
        setMovile(emptyMovile);
        setMovileDialog(true);
        setEditActive(false);
        setImageSelected(false);
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
    const validForm = () => {
        //Si no se selecciono ninguna imagen
        if (movile.files === null || movile.files === undefined) {
            return false;
        }

        const nameRegex = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar nombres de producto
        if (!nameRegex.test(movile.name) || movile.name === '') {
            setNameValid(false);
            return false;
        } else {
            setNameValid(true);
        }

        if (movile.price < 0 || movile.price === undefined) {
            setPriceValid(false);
            return false;
        } else {
            setPriceValid(true);
        }

        if (movile.cant < 0 || movile.cant === undefined) {
            setCantValid(false);
            return false;
        } else {
            setCantValid(true);
        }

        //Si no se selecciono algun taller
        if (movile.taller === '') {
            return false;
        }

        if (movile.sizeStorage < 0 || movile.sizeStorage === undefined) {
            setSizeStorageValid(false);
            return false;
        } else {
            setSizeStorageValid(true);
        }

        if (movile.camaraFrontal < 0 || movile.camaraFrontal === undefined) {
            setCamaraFrontalValid(false);
            return false;
        } else {
            setCamaraFrontalValid(true);
        }

        if (movile.camaraTrasera < 0 || movile.camaraTrasera === undefined) {
            setCamaraTraseraValid(false);
            return false;
        } else {
            setCamaraTraseraValid(true);
        }

        if (movile.bateria < 0 || movile.bateria === undefined) {
            setBateriaValid(false);
            return false;
        } else {
            setBateriaValid(true);
        }

        return true;
    } //Validacion de los campos del formulario
    const save = () => {
        setSubmitted(true);

        if (validForm()) {
            const formData = new FormData();
            formData.append('id', movile.id);
            formData.append('name', movile.name);
            formData.append('price', movile.price);
            formData.append('cant', movile.cant)
            formData.append('taller', movile.taller.name);
            formData.append('sizeStorage', movile.sizeStorage);
            formData.append('ram', movile.ram);
            formData.append('camaraTrasera', movile.camaraTrasera);
            formData.append('camaraFrontal', movile.camaraFrontal);
            formData.append('banda2G', movile.banda2G);
            formData.append('banda3G', movile.banda3G);
            formData.append('banda4G', movile.banda4G);
            formData.append('banda5G', movile.banda5G);
            formData.append('bateria', movile.bateria);

            if (editActive) {
                //Actualizar
                if (!imageSelected) {
                    movile.files.forEach((file, i) => {
                        let blob = new Blob([file.url], {type: 'image/png'});
                        let f = new File([blob], file.name, {type: 'image/png'});
                        formData.append('files', f);
                    });
                } else {
                    movile.files.forEach((file, i) => {
                        formData.append('files', file);
                    });
                }

                //Guardar en la BD y actualiza el estado de la informacion
                movileService.update(formData, movile.id).then(data => {
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se actualizó el producto correctamente",
                        life: 2000
                    });
                    //Actualiza la lista
                    movileService.getAll().then(data => setMoviles(data));
                    setMovileDialog(false);
                    setEditActive(false);
                    setImageSelected(false);
                    setSelectedMoviles(null);
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
                movile.files.forEach((file, i) => {
                    formData.append('files', file);
                });
                //Guardar en la BD y actualiza el estado de la informacion
                movileService.save(formData).then(data => {
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se creó el producto correctamente",
                        life: 2000
                    });
                    //Actualiza la lista
                    movileService.getAll().then(data => setMoviles(data));
                    setMovileDialog(false);
                    setEditActive(false);
                    setSelectedMoviles(null);
                }).catch((error) => {
                    toast.current.show({
                        severity: 'danger',
                        summary: 'Atención!',
                        detail: "Error el producto ya existe",
                        life: 2000
                    });
                });
            }
        }
    }; /*Crear o actualizar la informacion de un objeto*/
    const edit = (movile) => {
        setEditActive(true);
        setImageSelected(false);
        setMovile(movile);
        if (movile.taller === 'Taller 2M') {
            let _movile = {...movile};
            _movile[`${'taller'}`] = {name: 'Taller 2M', code: '2M'};
            setMovile(_movile);
        } else {
            let _movile = {...movile};
            _movile[`${'taller'}`] = {name: 'Taller MJ', code: 'MJ'};
            setMovile(_movile);
        }
        setMovileDialog(true);

    };/*Editar la informacion de un objeto existente*/
    const onTemplateSelect = (e) => {
        setImageSelected(true);
        const val = e.files;
        let _movile = {...movile};
        _movile[`${'files'}`] = val;
        setMovile(_movile);
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
    const onChangeSelectedBoxTaller = (e) => {
        const val = e.value || '';
        let _movile = {...movile};
        _movile[`${'taller'}`] = val;
        setMovile(_movile);
    } //Modifica el estado de seleccion del selectbox del taller
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

    const formFields = (<FieldsMovile
        submitted={submitted}
        object={movile}
        onInputTextChange={onInputTextChange}
        onInputNumberChange={onInputNumberChange}
        onCheckBoxChange={onCheckBoxChange}
        sizeStorageValid={sizeStorageValid}
        ramValid={ramValid}
        camaraTraseraValid={camaraTraseraValid}
        camaraFrontalValid={camaraFrontalValid}
        bateriaValid={bateriaValid}
    />);//Campos especificos del formulario


    return (
        <RenderLayout>
            <Toast ref={toast}/>
            <CustomFieldset label={'Dispositivos moviles'} icon={'pi-amazon'}>
                <div className="col-12">
                    <Tools
                        openNew={openNew}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedObjects={selectedMoviles}
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
            </CustomFieldset>

            <DialogForm
                visible={movileDialog}
                submitted={submitted}
                object={movile}
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

        </RenderLayout>
    );

}
