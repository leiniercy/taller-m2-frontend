"use client"

import React, {useEffect, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import RenderLayout from "@components/layout/RenderLayout";
import CustomFieldset from "@components/layout/CustomFieldSet";
import ToolsUser from "@components/pages/User/ToolsUser";
import DialogFormCustomer from "@components/pages/Ventas/DialogFormCustomer";
import DeleteCustomerDialog from "@components/pages/User/Customer/DeleteCustomerDialog";
import DeleteCustomersDialog from "@components/pages/User/Customer/DeleteCustomersDialog";
import TableCustomer from "@components/pages/User/Customer/TableCustomer";

import {FilterMatchMode} from "primereact/api";
import {FilterOperator} from "primereact/api";
import {Toast} from 'primereact/toast';

import CustomerService from "@services/CustomerService";



export default function Customers() {

    const {data: session, status} = useSession();
    const [token, setToken] = useState('');
    if (status === 'authenticated' && session?.user !== undefined && session?.user.rol !== "ROLE_ADMIN") {
        throw new Error('Access denied')
    }

    let emptyCustomer = {
        id: null,
        customerName: '',
        customerMovile: '',
    }

    const globalFilterFields = [
            'customerName', 'customerMovile'
        ]
    ;
    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        customerName: {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
        customerMovile: {
            operator: FilterOperator.AND,
            constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]
        },
    }

    const toast = useRef(null);

    const [customer, setCustomer] = useState(emptyCustomer);
    const [customers, setCustomers] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);


    const [editActive, setEditActive] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [customerDialog, setCustomerDialog] = useState(false);
    const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);
    const [deleteCustomersDialog, setDeleteCustomersDialog] = useState(false);
    const [nameValid, setNameValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);

    const customerService = new CustomerService();

    useEffect(() => {
        if(status === 'authenticated' && session?.user !== undefined ) {
        customerService.getAll(session?.user.token).then((data) => setCustomers(data));
            setToken(session?.user.token);
        }
    }, [session?.user]);

    const openNew = () => {
        setSubmitted(false);
        setCustomer(emptyCustomer);
        setCustomerDialog(true);
        setEditActive(false);
    }/*Abrir nueva ventana para crear un objeto*/
    const hideDialog = () => {
        setCustomerDialog(false);
        setSubmitted(false);
        setEditActive(false);
    }; /*Ocultar dialog de anadir*/
    const confirmDeleteSelected = () => {
        if (selectedCustomers.length > 1) {
            setDeleteCustomersDialog(true);
        }
        if (selectedCustomers.length === 1) {
            setCustomer(selectedCustomers[0]);
            setDeleteCustomerDialog(true);
        }
    }
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
    const onSelectionChangeSelectedObjects = (e) => {
        setSelectedCustomers(e.value);
    }
    const validateForm = () => {

        const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar nombres
        if (!nameRegex.test(customer.customerName) || customer.customerName === '') {
            setNameValid(false);
            return false;
        } else {
            setNameValid(true);
        }

        const phoneRegex = /^[0-9]{8}$/; // Expresión regular para validar los numeros de telefono
        if (!phoneRegex.test(customer.customerMovile) || customer.customerMovile === '') {
            setPhoneValid(false);
            return false;
        } else {
            setPhoneValid(true);
        }


        return true;
    }//Validacion del formulario
    const save = () => {
        setSubmitted(true);

        if (validateForm()) {
            if (editActive) {
                customerService.update(customer,token).then((data) => {
                    //Muestra sms de confirmacion
                    toast.current.show({
                        severity: 'success',
                        summary: 'Atención!',
                        detail: "Se actualizó la infromación del cliente correctamente",
                        life: 2000
                    });
                    setCustomerDialog(false);
                    //Actualiza la lista
                    customerService.getAll(token).then(data => setCustomers(data));
                    setEditActive(false);
                }).catch((error) => {
                    toast.current.show({
                        error: error,
                        severity: 'danger',
                        summary: 'Atención!',
                        detail: "El cliente no existe",
                        life: 2000
                    });

                });
            } else {
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
                        error: error,
                        severity: 'danger',
                        summary: 'Atención!',
                        detail: "El cliente ya existe",
                        life: 2000
                    });
                });
            }
        }


    } //Guarda la informacion de un nuevo cliente en caso de que no exista
    const edit = (customer) => {
        setEditActive(true);
        setCustomer(customer);
        setCustomerDialog(true);
    };/*Editar la informacion de un objeto existente*/
    const hideDeleteCustomerDialog = () => {
        setCustomerDialog(false);
    }//Ocultar el dialog de eliminar cliente
    const deleteCustomer = () => {
        let _customers = customers.filter((val) => val.id === customer.id);
        customerService.delete(_customers[0].id,token).then(data => {
            customerService.getAll(token).then((data) => setCustomers(data));
            toast.current.show({
                severity: 'success',
                summary: 'Atención!',
                detail: "Se eliminó el cliente correctamente",
                life: 2000
            });
            setDeleteCustomerDialog(false);
            setCustomer(emptyCustomer);
            setSelectedCustomers(false);
        }).catch((error) => {
            toast.current.show({
                error: error,
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar el cliente',
                life: 2000
            });
        });

    }//Elimina un cliente selecciondao
    const hideDeleteCustomersDialog = () => {
        setDeleteCustomersDialog(false);
    } //Ocultar el dialog de elimnar clientes
    const deleteSelectedCustomers = () => {
        customerService.deleteAll(selectedCustomers,token).then((data) => {
            customerService.getAll(token).then((data) => setCustomers(data));
            toast.current.show({
                severity: 'success',
                summary: '!Atención',
                detail: 'Clientes eliminadas correctamente',
                life: 2000
            });
            setDeleteCustomersDialog(false);
            setSelectedCustomers(false);
        }).catch((error) => {
            toast.current.show({
                error: error,
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar los clientes',
                life: 2000
            });
        });
    }//Elimina varios clientes seleccionados
    const confirmDeleteUser = (customer) => {
        setCustomer(customer);
        setDeleteCustomerDialog(true);
    }


    return (
        <RenderLayout>
            <CustomFieldset label={'Clientes'} icon={'pi-user'}>
                <div className="col-12">
                    <ToolsUser
                        openNew={openNew}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedObjects={selectedCustomers}
                    />
                </div>
                <div className="col-12">
                    <TableCustomer
                        headerLabel={'clientes'}
                        objects={customers}
                        selectedObjects={selectedCustomers}
                        setSelectedObject={onSelectionChangeSelectedObjects}
                        emptyFilters={emptyFilters}
                        globalFilterFields={globalFilterFields}
                        edit={edit}
                        confirmDeleteUser={confirmDeleteUser}
                    />
                </div>
            </CustomFieldset>
            <Toast ref={toast}/>
            <DialogFormCustomer
                visible={customerDialog}
                hideDialog={hideDialog}
                submitted={submitted}
                save={save}
                editActive={editActive}
                object={customer}
                nameValid={nameValid}
                phoneValid={phoneValid}
                onInputTextChange={onInputTextChange}
                onInputNumberChange={onInputNumberChange}
            />
            <DeleteCustomerDialog
                visible={deleteCustomerDialog}
                hideDialog={hideDeleteCustomerDialog}
                object={customer}
                delete={deleteCustomer}
            />
            <DeleteCustomersDialog
                visible={deleteCustomersDialog}
                hideDialog={hideDeleteCustomersDialog}
                object={customer}
                delete={deleteSelectedCustomers}
            />
        </RenderLayout>);

}