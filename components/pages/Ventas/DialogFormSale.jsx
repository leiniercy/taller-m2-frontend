import React from "react";
import {Dialog} from "primereact/dialog";
import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {Button} from "primereact/button";
import FieldsMovile from "@components/pages/Product/Movile/FieldsMovile";

//Components
import PickListSale from "@components/pages/Ventas/PickListSale";
import SelectBoxCustomer from "@components/pages/Ventas/SelectBoxCustomer";
import SaleInfo from "@components/pages/Ventas/SaleInfo";
import SelectBoxTaller from "@components/pages/Ventas/SelectBoxTaller";
import SaleCalendar from "@components/pages/Ventas/SaleCalendar";


export default function DialogFormSale(props) {

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
                    <label htmlFor="taller" className="font-bold">
                        Taller
                    </label>
                    <SelectBoxTaller
                        selectedTaller={props.selectedTaller}
                        onChangeSelectedBoxTaller={props.onChangeSelectedBoxTaller}
                    />
                </div>
                <div className="field">
                    <label htmlFor="date" className="font-bold">
                        Fecha de venta
                    </label>
                    <SaleCalendar
                        date={props.date}
                        onChangeCalendar={props.onChangeCalendar}
                    />

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
                            selectedProducts={props.selectedProducts}
                            quantities={props.quantities}
                            prices={props.prices}
                            descriptions={props.descriptions}
                            handleQuantityChange={props.handleQuantityChange}
                            handlePriceChange={props.handlePriceChange}
                            handleDescriptionChange={props.handleDescriptionChange}
                        />
                    </div>}
            </form>
        </Dialog>
    );

}