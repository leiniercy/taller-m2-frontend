"use client"

import React, {useEffect, useRef, useState} from "react";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';

//Components
import TableVentas from "@components/pages/Ventas/TableVentas";
import ToolsBarSales from "@components/pages/Ventas/ToolsBarSales";
import DialogFormSale from "@components/pages/Ventas/DialogFormSale";
import DialogFormCustomer from "@components/pages/Ventas/DialogFormCustomer";
import DeleteSellDialog from "@components/pages/Ventas/DeleteSellDialog";
import DeleteSalesDialog from "@components/pages/Ventas/DeleteSalesDialog";

//Service
import CustomerService from "@services/CustomerService";
import ProductService from "@services/ProductService";
import SellService from "@services/SellService";


export default function Ventas() {

    let emptyCustomer = {
        id: null,
        customerName: '',
        customerMovile: '',
    }

    let emtpySell = {
        id: null,
        description: '',
        salePrice: 0,
        tallerName: '',
        sellDate: null,
        customer: null,
        product: null,
        cantProduct: 0
    }

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        name: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        price: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        cant: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    };/*Mis filtros*/

    const globalFilterFields = [
        'name', 'price', 'cant'
    ];

    const toast = useRef(null);

    const [sell, setSell] = useState(emtpySell);
    const [sales, setSales] = useState(null);
    const [customer, setCustomer] = useState(emptyCustomer);
    const [productsForm, setProductsForm] = useState(null);
    const [productsTable, setProductsTable] = useState(null);
    const [customers, setCustomers] = useState(null);

    const [date, setDate] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedTaller, setSelectedTaller] = useState(null);
    const [quantities, setQuantities] = useState(null);
    const [descriptions, setDescriptions] = useState(null);
    const [prices, setPrices] = useState(null)
    const [selectedSales, setSelectedSales] = useState(null);
    const [selectedReportDate, setSelectedReportDate] = useState(null)

    const [submittedCustomer, setSubmittedCustomer] = useState(false);
    const [submittedSale, setSubmittedSale] = useState(false);
    const [saleDialog, setSaleDialog] = useState(false);
    const [customerDialog, setCustomerDialog] = useState(false)
    const [deleteSellDialog, setDeleteSellDialog] = useState(false);
    const [deleteSalesDialog, setDeleteSalesDialog] = useState(false);

    const productService = new ProductService();
    const customerService = new CustomerService();
    const sellService = new SellService();


    useEffect(() => {
        productService.getAll().then((data) => setProductsTable(data));
        productService.getAllProductsCantThanCero().then((data) => setProductsForm(data));
        customerService.getAll().then((data) => setCustomers(data));
        sellService.getAll().then(data => setSales(data));
    });
    const openNewDialogSale = () => {
        setSubmittedSale(false);
        setDescriptions(null);
        setPrices(null);
        setSelectedTaller(null);
        setDate(null);
        setSelectedCustomer(null);
        setSelectedProducts(null);
        setQuantities(null);
        setSaleDialog(true);
    }; //Abrir nueva ventana para crear un objeto
    const openNewDialogCustomer = () => {
        setSubmittedCustomer(false);
        setCustomerDialog(true);
        setCustomer(emptyCustomer);
    }  //Ocultar dialog de anadir cliente
    const hideDialogSale = (e) => {
        setSaleDialog(false);
        setSubmittedSale(false);
        setSelectedTaller(null);
        setDate(null);
        setSelectedCustomer(null);
        setSelectedProducts(null);
    }; //Ocultar dialog de anadir venta
    const hideDialogCustomer = (e) => {
        setCustomerDialog(false);
        setSubmittedCustomer(false);
    }//Ocultar dialog de anadir cliente
    const onSelectionChangeSelectedObjects = (e) => {
        setSelectedSales(e.value);
    } /*Se encarga de obtener la informacion de los objetos seleccionados*/
    const onChangeReportCalendar = (e) => {
        setSelectedReportDate(e.value);
    } //Modifica el estado de seleccion del selectbox del calendario de reporte

    const onChangeCalendar = (e) => {
        setDate(e.value);
    } //Modifica el estado de seleccion del selectbox del calendario

    const onChangeSelectedBoxTaller = (e) => {
        setSelectedTaller(e.value);
    } //Modifica el estado de seleccion del selectbox del taller
    const onChangeSelectedBoxCustomer = (e) => {
        setSelectedCustomer(e.value);
    }//Modifica el estado de seleccion del selectbox de cliente
    const onChangeSelectedBoxProducts = (e) => {
        setSelectedProducts(e.value);
        setQuantities(new Array(e.value.length).fill(1));
        setPrices(e.value.map(product => product.price));
        setDescriptions(new Array(e.value.length).fill(""));
    } //Modifica el estado de seleccion del selectbox de los productos
    const handleQuantityChange = (index, value) => {
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);
    }; //Modifica el estado de una cantidad, indicando el indice del producto correspondiente
    const handlePriceChange = (index, value) => {
        const minPrice = selectedProducts[index].price;
        const newPrice = Math.max(minPrice, value);
        const newPrices = [...prices];
        newPrices[index] = newPrice;
        setPrices(newPrices);
    };//Modifica el estado de una precio, indicando el indice del producto correspondiente
    const handleDescriptionChange = (index, value) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
    };//Modifica el estado de una precio, indicando el indice del producto correspondiente
    const onInputTextChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _customer = {...customer};
        _customer[`${name}`] = val;
        setCustomer(_customer);
    };//Modifica el valor del nombre del objeto
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _customer = {...customer};
        _customer[`${name}`] = val;
        setCustomer(_customer);
    }; //Modifica el valor de un numero especificado del objeto
    const saveCustomer = () => {
        setSubmittedCustomer(true);
        customerService.save(customer).then((data) => {
            //Muestra sms de confirmacion
            toast.current.show({
                severity: 'success',
                summary: 'Atención!',
                detail: "Se creó el cliente correctamente",
                life: 2000
            });
            setCustomerDialog(false);
            setCustomer(emptyCustomer);
            //Actualiza la lista
            customerService.getAll().then(data => setCustomers(data));
        }).catch((error) => {
            toast.current.show({
                severity: 'danger',
                summary: 'Atención!',
                detail: "Error al crear el cliente",
                life: 2000
            });
        });
    } //Guarda la informacion de un nuevo cliente en caso de que no exista
    const saveSale = () => {
        setSubmittedSale(true);

        let sellRequest = {
            descriptions: descriptions,
            prices: prices,
            customer: selectedCustomer,
            tallerName: selectedTaller.name,
            date: date,
            products: selectedProducts,
            quantities: quantities
        };

        console.log(sellRequest);

        sellService.save(sellRequest).then(data => {
            setSaleDialog(false);
            setSubmittedSale(false);
            setDescriptions(null);
            setPrices(null);
            setSelectedTaller(null);
            setDate(null);
            setSelectedCustomer(null);
            setSelectedProducts(null);
            setQuantities(null);
            toast.current.show({
                severity: 'success',
                summary: 'Atención!',
                detail: "Se registró la venta correctamente",
                life: 2000
            });
            productService.getAllProductsCantThanCero().then((data) => setProductsForm(data));


        }).catch((error) => {
            toast.current.show({
                severity: 'danger',
                summary: 'Atención!',
                detail: "Error al registrar la venta",
                life: 2000
            });
        });

    }//Guarda toda la informaciond de una venta
    const confirmDeleteSell = (sell) => {
        setSell(sell);
        setDeleteSellDialog(true);
    };
    const confirmDeleteSelected = () => {
        if (selectedSales.length > 1) {
            setDeleteSalesDialog(true);
        }
        if (selectedSales.length === 1) {
            setSell(selectedSales[0]);
            setDeleteSellDialog(true);
        }
    }; /*Abrir el dialog de confirmacion de eliminacion de los objetos*/
    const hideDeleteSellDialog = () => {
        setDeleteSellDialog(false);
    };/*Ocultar dialog de eliminar un objeto*/
    const hideDeleteSalesDialog = () => {
        setDeleteSalesDialog(false);
    };/*Ocultar dialog de eliminar varios objetos*/
    const deleteSell = () => {
        let _sales = sales.filter((val) => val.id === sell.id);

        sellService.delete(_sales[0].id).then(data => {
                //Actualiza la lista de ventas
                productService.getAllProductsCantThanCero().then((data) => setProductsForm(data));
                productService.getAll().then((data) => setProductsTable(data));
                setDeleteSellDialog(false);
                setSelectedSales(false);
                setSell(emtpySell);
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se eliminó la venta correctamente",
                    life: 2000
                });
            }
        ).catch(error => {
            toast.current.show({
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar la venta',
                life: 2000
            });
        });
    };/*Elimnar un Objeto*/
    const deleteSelectedSales = () => {

        sellService.deleteAll(selectedSales).then((data) => {
            productService.getAllProductsCantThanCero().then((data) => setProductsForm(data));
            productService.getAll().then((data) => setProductsTable(data));
            setSales(data);
            setDeleteSalesDialog(false);
            setSelectedSales(false);
            toast.current.show({
                severity: 'success',
                summary: '!Atención',
                detail: 'Ventas eliminadas correctamente',
                life: 2000
            });
        }).catch(error => {
            toast.current.show({
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar las ventas seleccionados',
                life: 2000
            });
        });
    };/*Eliminar varios objetos*/


    return (
        <div className="sm:relative md:relative col-12 sm:col-12 md:col lg:col p-2 ml-2 sm:ml-2">
            <div className="card grid mt-2">
                <div className="col-12">
                    <ToolsBarSales
                        toast={toast}
                        openNewDialogSale={openNewDialogSale}
                        openNewDialogCustomer={openNewDialogCustomer}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedObjects={selectedSales}
                        selectedReportDate={selectedReportDate}
                        onChangeReportCalendar={onChangeReportCalendar}
                    /> {/*barra de herramientas*/}
                </div>
                <div className="col-12">
                    <TableVentas
                        headerLabel={'ventas'}
                        objects={productsTable}
                        selectedObjects={selectedSales}
                        setSelectedObject={onSelectionChangeSelectedObjects}
                        emptyFilters={emptyFilters}
                        globalFilterFields={globalFilterFields}
                        confirmDeleteSell={confirmDeleteSell}
                    />
                </div>
                <Toast ref={toast}/>

                <DialogFormSale
                    visible={saleDialog}
                    hideDialog={hideDialogSale}
                    submitted={submittedSale}
                    save={saveSale}
                    date={date}
                    onChangeCalendar={onChangeCalendar}
                    selectedTaller={selectedTaller}
                    onChangeSelectedBoxTaller={onChangeSelectedBoxTaller}
                    customers={customers}
                    selectedCustomer={selectedCustomer}
                    onChangeSelectedBoxCustomer={onChangeSelectedBoxCustomer}
                    products={productsForm}
                    selectedProducts={selectedProducts}
                    quantities={quantities}
                    prices={prices}
                    descriptions={descriptions}
                    onChangeSelectedBoxProducts={onChangeSelectedBoxProducts}
                    handleQuantityChange={handleQuantityChange}
                    handlePriceChange={handlePriceChange}
                    handleDescriptionChange={handleDescriptionChange}

                />

                <DialogFormCustomer
                    visible={customerDialog}
                    hideDialog={hideDialogCustomer}
                    submitted={submittedCustomer}
                    save={saveCustomer}
                    object={customer}
                    onInputTextChange={onInputTextChange}
                    onInputNumberChange={onInputNumberChange}
                />

                <DeleteSellDialog
                    visible={deleteSellDialog}
                    hideDialog={hideDeleteSellDialog}
                    object={sell}
                    delete={deleteSell}
                />

                <DeleteSalesDialog
                    visible={deleteSalesDialog}
                    hideDialog={hideDeleteSalesDialog}
                    delete={deleteSelectedSales}
                    object={sell}
                />

            </div>
        </div>
    );

}