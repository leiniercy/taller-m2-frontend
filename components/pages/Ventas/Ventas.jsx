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
import RenderLayout from "@components/layout/RenderLayout";

//Service
import CustomerService from "@services/CustomerService";
import ProductService from "@services/ProductService";
import SellService from "@services/SellService";
import {useSession} from "next-auth/react";
import CustomFieldset from "@components/layout/CustomFieldSet";


export default function Ventas(props) {

    const {data: session, status} = useSession();
    const [token, setToken] = useState('');

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
    const [editCustomerActive, setEditCustomerActive] = useState(false);

    const [customerNameValid, setCustomerNameValid] = useState(true);
    const [customerPhoneValid, setCustomerPhoneValid] = useState(true);

    const [salePricesValid, setSalePricesValid] = useState(true);
    const [descriptionsValid, setDescriptionsValid] = useState(null);
    const [quantitiesValid, setQuantitiesValid] = useState(null);

    const productService = new ProductService();
    const customerService = new CustomerService();
    const sellService = new SellService();

    useEffect(() => {
        if (status === 'authenticated' && session?.user !== undefined) {
            productService.getAll(session?.user.token, session?.user.taller).then((data) => setProductsTable(data));
            productService.getAllProductsCantThanCero(session?.user.token,session?.user.taller ).then((data) => setProductsForm(data));
            customerService.getAll(session?.user.token).then((data) => setCustomers(data));
            sellService.getAll(session?.user.token).then((data) => setSales(data));
            setToken(session?.user.token);
        }
    }, [session?.user]);
    const openNewDialogSale = () => {
        setSubmittedSale(false);
        setDescriptions(null);
        setPrices(null);
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
    const hideDialogSale = () => {
        setSaleDialog(false);
        setSubmittedSale(false);
        setDate(null);
        setSelectedCustomer(null);
        setSelectedProducts(null);
    }; //Ocultar dialog de anadir venta
    const hideDialogCustomer = () => {
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
    const onChangeSelectedBoxCustomer = (e) => {
        setSelectedCustomer(e.value);
    }//Modifica el estado de seleccion del selectbox de cliente
    const onChangeSelectedBoxProducts = (e) => {
        setSelectedProducts(e.value);
        //informaciones de los productos vendidos
        setQuantities(new Array(e.value.length).fill(1));
        setPrices(e.value.map(product => product.price));
        setDescriptions(new Array(e.value.length).fill(""));
        //validaciones
        setQuantitiesValid(new Array(e.value.length).fill(true));
        setSalePricesValid(new Array(e.value.length).fill(true));
        setDescriptionsValid(new Array(e.value.length).fill(true));
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
    const validateCustomerForm = () => {

        const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar nombres
        if (!nameRegex.test(customer.customerName) || customer.customerName === '') {
            setCustomerNameValid(false);
            return false;
        } else {
            setCustomerNameValid(true);
        }

        const phoneRegex = /^[0-9]{8}$/; // Expresión regular para validar los numeros de telefono
        if (!phoneRegex.test(customer.customerMovile) || customer.customerMovile === '') {
            setCustomerPhoneValid(false);
            return false;
        } else {
            setCustomerPhoneValid(true);
        }


        return true;
    }//Validacion del formulario de crear cliente
    const saveCustomer = () => {
        setSubmittedCustomer(true);
        if (validateCustomerForm()) {
            customerService.save(customer,token).then((data) => {
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el cliente correctamente",
                    life: 2000
                });
                setCustomerDialog(false);
                //Actualiza la lista
                customerService.getAll(token).then(data => setCustomers(data));
            }).catch((error) => {
                toast.current.show({
                    severity: 'danger',
                    summary: 'Atención!',
                    detail: "Error al crear el cliente",
                    life: 2000
                });
            });
        }

    } //Guarda la informacion de un nuevo cliente en caso de que no exista
    const validSellForm = () => {

        if (date === null || date === undefined) {
            return false;
        }

        if (selectedCustomer === null || selectedCustomer === undefined) {
            return false;
        }

        if (selectedProducts === null || selectedProducts === undefined) {
            return false;
        }

        const descriptionRegex = /^[a-zA-Z0-9À-ÿ.,+_""=@#$*%^&¿?!:\u00f1\u00d1\s]+$/; // Expresión regular para validar las descripciones
        const newDescriptions = [...descriptionsValid];
        for (let i = 0; i < descriptions.length; i++) {
            if (!descriptionRegex.test(descriptions[i]) || descriptions[i] === '') {
                newDescriptions[i] = false;
                setDescriptionsValid(newDescriptions);
                return false;
            } else {
                newDescriptions[i] = true;
            }
        }
        setDescriptionsValid(newDescriptions);

        const newSalePrices = [...salePricesValid];
        for (let i = 0; i < prices.length; i++) {
            const minPrice = selectedProducts[i].price;
            if (prices[i] < minPrice || prices[i] === undefined) {
                newSalePrices[i] = false;
                setSalePricesValid(newSalePrices);
                return false;
            } else {
                newSalePrices[i] = true;
            }
        }
        setSalePricesValid(newSalePrices);

        const newQuantities = [...quantitiesValid];
        for (let i = 0; i < quantities.length; i++) {
            if (quantities[i] < 0 || quantities[i] === undefined) {
                newQuantities[i] = false;
                setQuantitiesValid(newQuantities);
                return false;
            } else {
                newQuantities[i] = true;
            }
        }
        setQuantitiesValid(newQuantities);


        return true;
    }
    const saveSale = () => {

        setSubmittedSale(true);

        if (validSellForm()) {
            let sellRequest = {
                descriptions: descriptions,
                prices: prices,
                customer: selectedCustomer,
                username: session?.user.name,
                tallerName: props.taller,
                date: date,
                products: selectedProducts,
                quantities: quantities
            };

            sellService.save(sellRequest, token).then(data => {
                setSaleDialog(false);
                setSubmittedSale(false);
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se registró la venta correctamente",
                    life: 2000
                });
                productService.getAll(session?.user.token, session?.user.taller).then((data) => setProductsTable(data));
                productService.getAllProductsCantThanCero(session?.user.token,session?.user.taller ).then((data) => setProductsForm(data));
                customerService.getAll(token).then((data) => setCustomers(data));
                sellService.getPDFVenta(props.taller, session?.user.name, data,token).then(d => {
                    // Descargar el archivo PDF generado
                    const url = window.URL.createObjectURL(new Blob([d]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'venta.pdf');
                    document.body.appendChild(link);
                    link.click();
                });

            }).catch((error) => {
                toast.current.show({
                    error: error,
                    severity: 'danger',
                    summary: 'Atención!',
                    detail: "Error al registrar la venta",
                    life: 2000
                });
            });
        }
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

        sellService.delete(_sales[0].id,token).then(data => {
                //Actualiza la lista de ventas
            productService.getAll(session?.user.token, session?.user.taller).then((data) => setProductsTable(data));
            productService.getAllProductsCantThanCero(session?.user.token,session?.user.taller ).then((data) => setProductsForm(data));
                customerService.getAll(token).then((data) => setCustomers(data));
                //Muestra sms de confirmacion
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se eliminó la venta correctamente",
                    life: 2000
                });
                setDeleteSellDialog(false);
                setSelectedSales(false);
                setSell(emtpySell);
            }
        ).catch(error => {
            toast.current.show({
                error: error,
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar la venta',
                life: 2000
            });
        });
    };/*Elimnar un Objeto*/
    const deleteSelectedSales = () => {

        sellService.deleteAll(selectedSales,token).then((data) => {
            productService.getAll(session?.user.token, session?.user.taller).then((data) => setProductsTable(data));
            productService.getAllProductsCantThanCero(session?.user.token,session?.user.taller ).then((data) => setProductsForm(data));
            customerService.getAll(token).then((data) => setCustomers(data));
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
        <RenderLayout>
            <CustomFieldset label={"Ventas " + props.taller} icon={'pi-shopping-cart'}>
                <div className="col-12">
                    <ToolsBarSales
                        toast={toast}
                        openNewDialogSale={openNewDialogSale}
                        openNewDialogCustomer={openNewDialogCustomer}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedObjects={selectedSales}
                        selectedReportDate={selectedReportDate}
                        onChangeReportCalendar={onChangeReportCalendar}
                        taller={props.taller}
                        token={token}
                    /> {/*barra de herramientas*/}
                </div>
                <div className="col-12">
                    <TableVentas
                        headerLabel={'ventas'}
                        objects={productsTable}
                        rol={session?.user.rol}
                        selectedObjects={selectedSales}
                        setSelectedObject={onSelectionChangeSelectedObjects}
                        emptyFilters={emptyFilters}
                        globalFilterFields={globalFilterFields}
                        confirmDeleteSell={confirmDeleteSell}
                    />
                </div>
            </CustomFieldset>
            <Toast ref={toast}/>

            <DialogFormSale
                visible={saleDialog}
                hideDialog={hideDialogSale}
                submitted={submittedSale}
                save={saveSale}
                date={date}
                onChangeCalendar={onChangeCalendar}
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
                descriptionsValid={descriptionsValid}
                pricesValid={salePricesValid}
                quantitiesValid={quantitiesValid}
            />

            <DialogFormCustomer
                visible={customerDialog}
                hideDialog={hideDialogCustomer}
                submitted={submittedCustomer}
                editActive={editCustomerActive}
                save={saveCustomer}
                object={customer}
                nameValid={customerNameValid}
                phoneValid={customerPhoneValid}
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
        </RenderLayout>
    );

}