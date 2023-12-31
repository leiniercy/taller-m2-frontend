
import PropTypes from "prop-types";
import React from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

//Components
import PickListSale from "@components/pages/Ventas/PickListSale";
import SelectBoxCustomer from "@components/pages/Ventas/SelectBoxCustomer";
import SaleInfo from "@components/pages/Ventas/SaleInfo";
import SaleCalendar from "@components/pages/Ventas/SaleCalendar";


const DialogFormSale = (props) => {

    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        {/*<Button label={props.editActive ? "Actualizar" : "Añadir"} icon="pi pi-check" onClick={props.save}/>*/}
        <Button label="Añadir" icon="pi pi-check" onClick={props.save}/>
    </div>);/*Footer del dialog de anadir*/


    return (
        <Dialog visible={props.visible}
                style={{width: '40rem'}}
                breakpoints={{'960px': '75vw', '641px': '90vw'}}
                modal
                className="p-fluid"
                footer={dialogFooter}
                onHide={props.hideDialog}
        >

            <form id="product-form" onSubmit={props.save}>
                <div className="field">
                    <label htmlFor="date" className="font-bold">
                        Fecha de venta
                    </label>
                    <SaleCalendar
                        date={props.date}
                        onChangeCalendar={props.onChangeCalendar}
                    />
                    {props.submitted && !props.date && <small className="p-error">Campo obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="customer" className="font-bold">
                        Cliente
                    </label>
                    <SelectBoxCustomer
                        customers={props.customers}
                        selectedCustomer={props.selectedCustomer}
                        onChangeSelectedBoxCustomer={props.onChangeSelectedBoxCustomer}
                    />
                    {props.submitted && !props.selectedCustomer &&
                        <small className="p-error">Campo obligatorio.</small>}
                </div>
                <div className="field">
                    <label htmlFor="products" className="font-bold">
                        Productos
                    </label>
                    <PickListSale
                        products={props.products}
                        selectedProducts={props.selectedProducts}
                        onChangeSelectedBoxProducts={props.onChangeSelectedBoxProducts}
                    />
                </div>
                {((props.selectedProducts !== null) && (props.selectedProducts.length > 0)) &&
                    <div className="field">
                        <SaleInfo
                            submitted={props.submitted}
                            selectedProducts={props.selectedProducts}
                            quantities={props.quantities}
                            prices={props.prices}
                            descriptions={props.descriptions}
                            handleQuantityChange={props.handleQuantityChange}
                            handlePriceChange={props.handlePriceChange}
                            handleDescriptionChange={props.handleDescriptionChange}
                            descriptionsValid={props.descriptionsValid}
                            pricesValid={props.pricesValid}
                            quantitiesValid={props.quantitiesValid}
                        />
                    </div>}
            </form>
        </Dialog>
    );
}

DialogFormSale.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.object).isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
    quantities: PropTypes.arrayOf(PropTypes.number).isRequired,
    prices: PropTypes.arrayOf(PropTypes.number).isRequired,
    descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedCustomer: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    editActive: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    descriptionsValid: PropTypes.bool.isRequired,
    pricesValid: PropTypes.bool.isRequired,
    quantitiesValid: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    hideDialog: PropTypes.func.isRequired,
    onChangeCalendar: PropTypes.func.isRequired,
    onChangeSelectedBoxCustomer: PropTypes.func.isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    handlePriceChange: PropTypes.func.isRequired,
    handleDescriptionChange: PropTypes.func.isRequired,
}

export default DialogFormSale;