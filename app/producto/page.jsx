"use client"


//Styles primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import ProductService from '@services/ProductService';
import axios from 'axios';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from "primereact/slider";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';

export default function Producto() {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        // description: '',
        price: 0,
        cant: 0,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    /*Confirmacion de que imgaen mostrar*/
    const [uploadActive, setUploadActive] = useState(false); // si esta activo ese se muesta la imagen cargada en el cliente
    const [editActive, setEditActive] = useState(false); // si esta activo ese se muesta la imagen que proviene del servidor
    /*Confirmacion de que imgaen mostrar*/

    const productService = new ProductService();

    useEffect(() => {
        productService.getAll().then((data) => setProducts(data));
    }, []);

    /*Formato con que se muestra el precio del producto*/
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    };/*Formato con que se muestra el precio del producto*/

    /*Exportar CSV*/
    const exportCSV = () => {
        dt.current.exportCSV();
    }; /*Exportar CSV*/

    /*Abrir nueva ventana para crear un producto*/
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
        setUploadActive(false);
        setEditActive(false);
    }; /*Abrir nueva ventana para crear un producto*/


    /*Ocultar dialog de anadir*/
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }; /*Ocultar dialog de anadir*/


    /*Ocultar dialog de eliminar un producto*/
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };/*Ocultar dialog de eliminar un producto*/


    /*Ocultar dialog de eliminar varios productos*/
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };/*Ocultar dialog de eliminar varios productos*/


    /*Crear o actualizar la informacion de un porducto*/
    const saveProduct = () => {
        setSubmitted(true);

        if (product.id !== null) {
            //Actualizar Producto

            if (!uploadActive) {
                // Si no se cargo ninguna nueva imagen
                axios.get("http://localhost:8080/api/v1/product/image/emptyFile.png", {responseType: 'image/png'}).then(res => {

                    const blob = new Blob([res.data], {type: 'image/png'});
                    const file = new File([blob], 'emptyFile.png', {type: 'image/png'});
                    let _product = product;
                    _product[`${'image'}`] = file;
                    setProduct(_product);
                    // console.log(product);
                    let formData = new FormData();
                    formData.append('id', product.id);
                    formData.append('name', product.name);
                    formData.append('price', product.price);
                    formData.append('cant', product.cant);
                    formData.append('image', product.image);
                    //Guardar en la BD y actualiza el estado de la informacion
                    productService.update(formData, product.id).then(data => {
                        setProduct(emptyProduct);
                        //Actualiza la lista de productos
                        productService.getAll().then(data => setProducts(data));
                        //Muestra sms de confirmacion
                        toast.current.show({
                            severity: 'success',
                            summary: 'Atención!',
                            detail: "Se actualizó el producto correctamente",
                            life: 2000
                        });
                        setProductDialog(false);
                        setUploadActive(false);
                        setEditActive(false);
                    }).catch(error => {
                        toast.current.show({
                            severity: 'danger',
                            summary: 'Atención!',
                            detail: "Error al actualizar el producto",
                            life: 2000
                        });
                    });

                }).catch(error => {
                    console.log(error);
                });


            } else {
                // Si  se cargo ninguna nueva imagen
                let formData = new FormData();
                formData.append('id', product.id);
                formData.append('name', product.name);
                formData.append('price', product.price);
                formData.append('cant', product.cant);
                formData.append('image', product.image);
                formData.append('image', product.image);
                //Guardar en la BD y actualiza el estado de la informacion
                productService.update(formData, product.id).then(data => {
                    setProduct(emptyProduct);
                    //Actualiza la lista de productos
                    productService.getAll().then(data => setProducts(data));
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se actualizó el producto correctamente",
                        life: 2000
                    });
                    setProductDialog(false);
                    setUploadActive(false);
                    setEditActive(false);
                }).catch(error => {
                    toast.current.show({
                        severity: 'danger',
                        summary: 'Atención!',
                        detail: "Error al actualizar el producto",
                        life: 2000
                    });
                });
            }

        } else {
            //Crear Producto
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('cant', product.cant);
            formData.append('image', product.image);

            //Guardar en la BD y actualiza el estado de la informacion
            productService.save(formData).then(data => {
                setProduct(emptyProduct);
                //Actualiza la lista de productos
                productService.getAll().then(data => setProducts(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el producto correctamente",
                    life: 2000
                });
                setProductDialog(false);
                setUploadActive(false);
                setEditActive(false);
            });
        }
    }; /*Crear o actualizar la informacion de un porducto*/

    /*Editar la informacion de un usuario existente*/
    const editProduct = (product) => {
        setUploadActive(false);
        setEditActive(true);
        setProduct(product);
        setProductDialog(true);
    };
    /*Editar la informacion de un usuario existente*/

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    /*Elimnar un producto*/
    const deleteProduct = () => {
        let _products = products.filter((val) => val.id === product.id);

        productService.delete(_products[0].id).then(data => {
            //Actualiza la lista de productos
            productService.getAll().then(data => setProducts(data));
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
    };/*Elimnar un producto*/

    /*Abrir el dialog de confirmacion de eliminacion de los productos*/
    const confirmDeleteSelected = () => {
        if (selectedProducts.length > 1) {
            setDeleteProductsDialog(true);
        }
        if (selectedProducts.length === 1) {
            setDeleteProductDialog(true);
        }

    }; /*Abrir el dialog de confirmacion de eliminacion de los productos*/

    /*Eliminar varios porductos*/
    const deleteSelectedProducts = () => {

        productService.deleteAll(selectedProducts).then((data) => {
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
    };/*Eliminar varios porductos*/

    /*Modifica el valor del nombre del producto*/
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};

        _product[`${name}`] = val;

        setProduct(_product);
    };/*Modifica el valor del nombre del producto*/

    /*Modifica el valor de un numero especificado del producto (cant y precio)*/
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};

        _product[`${name}`] = val;

        setProduct(_product);
    }; /*Modifica el valor de un numero especificado del producto (cant y precio)*/


    /*Barra de herramientas*/
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Añadir" icon="pi pi-plus" severity="success" onClick={openNew}/>
                <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
                        disabled={!selectedProducts || !selectedProducts.length}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>;
    }; /*Barra de herramientas*/


    /*Mostrar clumnas de la tabla*/
    const imageBodyTemplate = (rowData) => {
        return <img src={"http://localhost:8080/api/v1/product/image/" + rowData.image} alt={rowData.name}
                    className="shadow-2 border-round" style={{width: '64px'}}/>;
        //return <img src={"data:image/jpeg;base64," + urlBase} alt={rowData.name} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }; /*Mostrar clumnas de la tabla*/


    /*Acciones de cada columna de la tabla Update, Delete*/
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteProduct(rowData)}/>
            </React.Fragment>
        );
    }; /*Acciones de cada columna de la tabla Update, Delete*/


    /*Header de la tabla*/
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..."/>
            </span>
        </div>
    ); /*Header de la tabla*/


    /*Footer del dialog de anadir*/
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog}/>
            <Button label="Añadir" icon="pi pi-check" onClick={saveProduct}/>
        </React.Fragment>
    );    /*Footer del dialog de anadir*/


    /*Footer del dialog de eliminacion*/
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDeleteProductDialog}/>
            <Button label="Aceptar" icon="pi pi-check" severity="danger" onClick={deleteProduct}/>
        </React.Fragment>
    );

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog}/>
            <Button label="Aceptar" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts}/>
        </React.Fragment>
    ); /*Footer del dialog de eliminacion*/


    /*Drag and Drop options (image)*/
    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };

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
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };/*Drag and Drop options (image)*/


    return (
        <div className="sm:relative  col p-4">
            <div className="">
                <Toast ref={toast}/>
                <div className="card">

                    {/* Barra de herramientas (anadir, eliminar, exportar)  */}
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        // scrollable
                        // scrollHeight="400px"
                        // virtualScrollerOptions={{ itemSize: 46 }} tableStyle={{ minWidth: '50rem' }}
                        globalFilter={globalFilter}
                        header={header}>
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column field="name" header="Nombre" sortable style={{minWidth: '16rem'}}></Column>
                        <Column field="image" header="Imagen" body={imageBodyTemplate}></Column>
                        <Column field="price" header="Precio" body={priceBodyTemplate} sortable
                                style={{minWidth: '8rem'}}></Column>
                        <Column field="cant" header="Cantidad" sortable/>
                        <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{width: '32rem'}}
                        breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Product Details" modal
                        className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <form id="product-form" onSubmit={saveProduct}>
                        <div className="card flex flex-column justify-content-center align-items-center">
                            <label>Imagen:</label>
                            <FileUpload
                                name="file"
                                accept="image/*"
                                customUpload={true}
                                chooseLabel="Seleccionar"
                                chooseOptions={chooseOptions}
                                uploadLabel="Subir"
                                cancelLabel="Cancelar"
                                className="p-mr-2"
                                maxFileSize={1000000}
                                mode="basic"
                                emptyTemplate={emptyTemplate}
                                onSelect={(e) => {
                                    const val = e.files[0];
                                    let _product = {...product};
                                    _product[`${'image'}`] = val;
                                    setProduct(_product);
                                    setUploadActive(true);
                                    setEditActive(false);
                                }}
                            />
                            {uploadActive && <img src={URL.createObjectURL(product.image)} alt={product.name}
                                                  className="product-image block m-auto mt-2  h-10rem sm:h-10rem md:h-15rem lg:h-15rem xl:h-15rem { pb-3"
                                                  style={{width: '300px'}}/>}
                            {editActive && <img src={"http://localhost:8080/api/v1/product/image/" + product.image}
                                                alt={product.name}
                                                className="product-image block m-auto mt-2  h-10rem sm:h-10rem md:h-15rem lg:h-15rem xl:h-15rem { pb-3"
                                                style={{width: '300px'}}/>}
                            {/* {product.image && <img src={"data:image/jpeg;base64," + imagenBase64} alt={product.name} className="product-image block m-auto mt-2  h-10rem sm:h-10rem md:h-15rem lg:h-15rem xl:h-15rem { pb-3" style={{ width: '300px' }} />} */}
                        </div>

                        <div className="field">

                            <label htmlFor="name" className="font-bold">
                                Name
                            </label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')}
                                       required autoFocus
                                       className={classNames({'p-invalid': submitted && !product.name})}/>
                            {submitted && !product.name && <small className="p-error">Name is required.</small>}
                        </div>

                        {/*<div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>  */}

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price" className="font-bold">
                                    Price
                                </label>
                                <InputNumber id="price" value={product.price}
                                             onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency"
                                             currency="USD" locale="en-US"/>
                                <Slider value={product.price} onChange={(e) => onInputNumberChange(e, 'price')}
                                        className="w-full"/>
                            </div>
                            <div className="field col">
                                <label htmlFor="cant" className="font-bold">
                                    Cantidad
                                </label>
                                <InputNumber id="cant" value={product.cant}
                                             onValueChange={(e) => onInputNumberChange(e, 'cant')}/>
                                <Slider value={product.cant} onChange={(e) => onInputNumberChange(e, 'cant')}
                                        className="w-full"/>
                            </div>
                        </div>
                    </form>
                </Dialog>

                <Dialog visible={deleteProductDialog} style={{width: '32rem'}}
                        breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                        footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                        {product && (
                            <span>
                            ¿ Esta seguro que desea eliminar  este producto ?
                        </span>
                        )}
                    </div>
                </Dialog>

                <Dialog visible={deleteProductsDialog} style={{width: '32rem'}}
                        breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                        footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                        {product && <span>"¿Esta seguro que desea eliminar los productos seleccionados?</span>}
                    </div>
                </Dialog>
            </div>
        </div>

    )


}