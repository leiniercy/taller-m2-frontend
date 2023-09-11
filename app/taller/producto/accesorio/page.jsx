"use client"

import React, {useState, useEffect, useRef} from 'react';

//Components
import ProductService from "@services/ProductService";
import CustomFieldset from "@components/layout/CustomFieldSet";
import Tools from "@components/pages/Product/Tools";
import Table from "@components/pages/Product/Table";
import DialogForm from "@components/pages/Product/DialogForm";
import DeleteProductDialog from "@components/pages/Product/DeleteProductDialog";
import DeleteProductsDialog from "@components/pages/Product/DeleteProductsDialog";
import RenderLayout from "@components/layout/RenderLayout";


//primereact
import {Button} from "primereact/button";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';

import {useSession} from "next-auth/react";


export default function Accesorio(props) {

    const {data: session, status} = useSession();
    const [token, setToken] = useState('');

    if (status === 'authenticated' && session?.user !== undefined && session?.user.rol !== "ROLE_MODERATOR") {
        throw new Error('Access denied')
    }

    let emptyProduct = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
        taller: ''
    };

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        taller: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant', 'taller'
    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);

    const [nameValid, setNameValid] = useState(true);
    const [priceValid, setPriceValid] = useState(true);
    const [cantValid, setCantValid] = useState(true);

    const [product, setProduct] = useState(emptyProduct);
    const [products, setProducts] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);

    const productService = new ProductService();

    useEffect(() => {
        if(status === 'authenticated' && session?.user !== undefined ){
            productService.getAllProducts(session?.user.token, session?.user.taller).then((data) => setProducts(data));
            setToken(session?.user.token);
        }
    }, [session?.user]);
    const openNew = () => {
        setSubmitted(false);
        setProduct(emptyProduct);
        setProductDialog(true);
        setImageSelected(false);
        setEditActive(false);
    }; /*Abrir nueva ventana para crear un objeto*/
    const confirmDeleteSelected = () => {
        if (selectedProducts.length > 1) {
            setDeleteProductsDialog(true);
        }
        if (selectedProducts.length === 1) {
            setProduct(selectedProducts[0]);
            setDeleteProductDialog(true);
        }
    }; /*Abrir el dialog de confirmacion de eliminacion de los objetos*/
    const onSelectionChangeSelectedObjects = (e) => {
        setSelectedProducts(e.value);
    } /*Se encarga de obtener la informacion de los objetos seleccionados*/
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2"
                        onClick={() => edit(rowData)}
                />
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteProduct(rowData)}
                />
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/
    const hideDialog = (e) => {
        setProductDialog(false);
        setSubmitted(false);
    }; /*Ocultar dialog de anadir*/
    const validForm = () => {
        //Si no se selecciono ninguna imagen
        if (product.files === null || product.files === undefined) {
            return false;
        }

        const nameRegex = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar nombres de producto
        if (!nameRegex.test(product.name) || product.name === '') {
            setNameValid(false);
            return false;
        } else {
            setNameValid(true);
        }

        if (product.price < 0 || product.price === undefined) {
            setPriceValid(false);
            return false;
        } else {
            setPriceValid(true);
        }

        if (product.cant < 0 || product.cant === undefined) {
            setCantValid(false);
            return false;
        } else {
            setCantValid(true);
        }

        return true;
    } //Validacion de los campos del formulario
    const save = () => {
        setSubmitted(true);

        if (validForm()) {
            const formData = new FormData();
            formData.append('id', product.id);
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('cant', product.cant);
            formData.append('taller', session?.user.taller);

            if (editActive) {
                //Actualizar
                if (!imageSelected) {
                    product.files.forEach((file, i) => {
                        let blob = new Blob([file.url], {type: 'image/png'});
                        let f = new File([blob], file.name, {type: 'image/png'});
                        formData.append('files', f);
                    });
                } else {
                    product.files.forEach((file, i) => {
                        formData.append('files', file);
                    });
                }
                //Guardar en la BD y actualiza el estado de la informacion
                productService.update(formData, product.id, token).then(data => {
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se actualizó el producto correctamente",
                        life: 2000
                    });
                    setProductDialog(false);
                    productService.getAllProducts(token,session?.user.taller).then(data => setProducts(data));
                    //Actualiza la lista
                    setEditActive(false);
                    setImageSelected(false);
                    setSelectedProducts(null);
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
                product.files.forEach((file, i) => {
                    formData.append('files', file);
                });

                //Guardar en la BD y actualiza el estado de la informacion
                productService.save(formData, token).then(data => {
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se creó el producto correctamente",
                        life: 2000
                    });
                    //Actualiza la lista
                    productService.getAllProducts(token,session?.user.taller).then(data => setProducts(data));
                    setProductDialog(false);
                    setEditActive(false);
                    setSelectedProducts(null);
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
    const edit = (product) => {
        setEditActive(true);
        setImageSelected(false);
        setProduct(product);
        setProductDialog(true);
    };/*Editar la informacion de un objeto existente*/
    const onTemplateSelect = (e) => {
        setImageSelected(true);
        const val = e.files;
        let _product = {...product};
        _product[`${'files'}`] = val;
        setProduct(_product);
    };/*Drag and Drop options (image)*/
    const onInputTextChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;
        setProduct(_product);
    };/*Modifica el valor del nombre del objeto*/
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;
        setProduct(_product);
    }; /*Modifica el valor de un numero especificado del objeto*/
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };/*Ocultar dialog de eliminar un objeto*/
    const deleteProduct = () => {
        let _products = products.filter((val) => val.id === product.id);

        productService.delete(_products[0].id, token).then(data => {
            //Actualiza la lista de productos
            productService.getAllProducts(token,session?.user.taller).then(data => setProducts(data));
            setDeleteProductDialog(false);
            setSelectedProducts(false);
            setProduct(emptyProduct);
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
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };/*Ocultar dialog de eliminar varios objetos*/
    const deleteSelectedProducts = () => {

        productService.deleteAll(selectedProducts, token).then((data) => {
            setProducts(data);
            setDeleteProductsDialog(false);
            setSelectedProducts(false);
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

    return (
        <RenderLayout>
            <CustomFieldset label={'Accesorios'} icon={'pi-amazon'}>
                <div className="col-12">
                    <Tools
                        openNew={openNew}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedObjects={selectedProducts}
                    /> {/*barra de herramientas*/}
                </div>
                <div className="col-12">
                    <Table
                        headerLabel={'accesorios'}
                        dt={dt}
                        objects={products}
                        selectedObjects={selectedProducts}
                        setSelectedObject={onSelectionChangeSelectedObjects}
                        emptyFilters={emptyFilters}
                        globalFilterFields={globalFilterFields}
                        actionBodyTemplate={actionBodyTemplate}
                    />
                </div>
            </CustomFieldset>
            <Toast ref={toast}/>
            <DialogForm
                visible={productDialog}
                submitted={submitted}
                object={product}
                editActive={editActive}
                hideDialog={hideDialog}
                save={save}
                onTemplateSelect={onTemplateSelect}
                onInputTextChange={onInputTextChange}
                onInputNumberChange={onInputNumberChange}
                imageSelected={imageSelected}
                nameValid={nameValid}
                priceValid={priceValid}
                cantValid={cantValid}
            />

            <DeleteProductDialog
                visible={deleteProductDialog}
                hideDialog={hideDeleteProductDialog}
                object={product}
                delete={deleteProduct}
            />

            <DeleteProductsDialog
                visible={deleteProductsDialog}
                hideDialog={hideDeleteProductsDialog}
                delete={deleteSelectedProducts}
                object={product}
            />

        </RenderLayout>
    );

}
