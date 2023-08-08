"use client"

import React, {useState, useEffect, useRef} from 'react';

//Components
import ProductService from "@services/ProductService";
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



export default function Accesorio(props) {

    let emptyProduct = {
        id: null,
        name: '',
        files: null,
        price: 0,
        cant: 0,
    };

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant'
    ];

    const columns = [
        {field: 'name', header: 'Nombre'},
        {field: 'price', header: 'Precio'},
        {field: 'cant', header: 'Cantidad'},
    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [submitted, setSubmitted] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

    const [product, setProduct] = useState(emptyProduct);
    const [products, setProducts] = useState(null);
    const [selecteProducts, setSelecteProducts] = useState(null);

    const productService = new ProductService();

    useEffect(() => {
        productService.getAllProducts().then((data) => setProducts(data));
    });

    const openNew = () => {
        setSubmitted(false);
        setProduct(emptyProduct);
        setProductDialog(true);
        setEditActive(false);
    }; /*Abrir nueva ventana para crear un objeto*/

    const confirmDeleteSelected = () => {
        if (selecteProducts.length > 1) {
            setDeleteProductsDialog(true);
        }
        if (selecteProducts.length === 1) {
            setProduct(selecteProducts[0]);
            setDeleteProductDialog(true);
        }
    }; /*Abrir el dialog de confirmacion de eliminacion de los objetos*/

    const onSelectionChangeSelectedObjects = (e) => {
        setSelecteProducts(e.value);
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

    const save = () => {
        setSubmitted(true);

        if (product.id !== null) {
            //Actualizar
            const formData = new FormData();
            formData.append('id', product.id);
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('cant', product.cant);
            product.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            productService.update(formData, product.id).then(data => {
                setProduct(emptyProduct);
                //Actualiza la lista
                productService.getAllProducts().then(data => setProducts(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se actualizó el producto correctamente",
                    life: 2000
                });
                setProductDialog(false);
                setEditActive(false);
                setSelecteProducts(null);
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
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('cant', product.cant);
            product.files.forEach((file, i) => {
                formData.append('files', file);
            });

            //Guardar en la BD y actualiza el estado de la informacion
            productService.save(formData).then(data => {
                setProduct(emptyProduct);
                //Actualiza la lista
                productService.getAllProducts().then(data => setProducts(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el producto correctamente",
                    life: 2000
                });
                setProductDialog(false);
                setEditActive(false);
                setSelecteProducts(null);
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

    const edit = (product) => {
        setEditActive(true);
        setProduct(product);
        setProductDialog(true);
    };/*Editar la informacion de un objeto existente*/

    const onTemplateSelect = (e) => {
        const val = e.files;
        let _product = {...product};
        _product[`${'files'}`] = val;
        setProduct(_product);
    };/*Drag and Drop options (image)*/
    const onTemplateRemove = (file, callback) => {
        //Eliminar de la lista el elemento
        let objetoElimnmar = product.files.find(objeto => objeto === file); //Comprobamos que el objeto existe en la lista
        let indiceAEiminar = product.files.indexOf(objetoElimnmar); //Buscamos su indice exacto
        product.files.splice(indiceAEiminar, 1); //Eliminamos este objeto pasando su indice y la cant de elemntos a elimnar despues de el
        callback();
    };/*Drag and Drop options (image)*/
    const onTemplateClear = () => {
        product.files = [];
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
    const onCheckBoxChange = (e, name) => {
        const val = e.checked || false;
        let _product = {...product};
        _product[`${name}`] = val;
        setProduct(_product);
    }; /*Modifica el valor de un bool especificado del objeto*/

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };/*Ocultar dialog de eliminar un objeto*/
    const deleteProduct = () => {
        let _products = products.filter((val) => val.id === product.id);

        productService.delete(_products[0].id).then(data => {
            //Actualiza la lista de productos
            productService.getAllProducts().then(data => setProducts(data));
            setDeleteProductDialog(false);
            setSelecteProducts(false);
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

        productService.deleteAll(selecteProducts).then((data) => {
            setProducts(data);
            setDeleteProductsDialog(false);
            setSelecteProducts(false);
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


    const legendTemplate = (<div className="flex align-items-center ">
        <span className="pi pi-user mr-2"></span>
        <span className="font-bold text-lg">Accesorios</span>
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
                            selectedObjects={selecteProducts}
                            objects={products}
                            columns={columns}
                            dt={dt}
                            fileName={'products'}
                        /> {/*barra de herramientas*/}
                    </div>
                    <div className="col-12">

                        <Table
                            headerLabel={'accesorios'}
                            dt={dt}
                            objects={products}
                            selectedObjects={selecteProducts}
                            setSelectedObject={onSelectionChangeSelectedObjects}
                            emptyFilters={emptyFilters}
                            globalFilterFields={globalFilterFields}
                            actionBodyTemplate={actionBodyTemplate}
                        />

                    </div>
                </Fieldset>

                <DialogForm
                    visible={productDialog}
                    submitted={submitted}
                    object={product}
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

            </div>
        </div>
    );

}
