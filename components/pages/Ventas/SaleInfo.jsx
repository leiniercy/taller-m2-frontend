
import { InputTextarea } from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";
import {InputNumber} from 'primereact/inputnumber';
import React from "react";
import {Slider} from "primereact/slider";

export default function SaleInfo(props) {


    return (<>
            {props.selectedProducts.map((product, index) => (
                <>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="product" className="font-bold">
                                Producto
                            </label>
                            <InputText disabled placeholder={product.name}/>
                        </div>
                        <div className="field col">
                            <label htmlFor="cant" className="font-bold">
                                Cantidad
                            </label>
                            <InputNumber id={'cant' - {index}}
                                         value={props.quantities[index]}
                                         min={1} max={product.cant}
                                         onValueChange={(e) => props.handleQuantityChange(index, e.value)}

                            />
                            <Slider
                                value={props.quantities[index]}
                                onChange={(e) => props.handleQuantityChange(index, e.value)}
                                min={1} max={product.cant}
                                className="w-full"/>
                            {props.submitted && !props.quantities[index] && <small className="p-error">Campo obligatorio.</small>}
                            {props.submitted && !props.quantitiesValid[index] && <small className="p-error"> Cantidad incorrecta.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="price" className="font-bold">
                                Precio de venta
                            </label>
                            <InputNumber id={'price' - {index}}
                                         value={props.prices[index]}
                                         max={1000}
                                         onValueChange={(e) => props.handlePriceChange(index, e.value)}
                                         mode="currency" currency="USD" locale="en-US"/>
                            <Slider
                                value={props.prices[index]}
                                max={1000}
                                onChange={(e) => props.handlePriceChange(index, e.value)}
                                className="w-full"/>
                            {props.submitted && !props.prices[index] && <small className="p-error">Campo obligatorio.</small>}
                            {props.submitted && !props.pricesValid[index] && <small className="p-error"> Precio incorrecto.</small>}
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="description" className="font-bold">
                            Descripción
                        </label>
                        <InputTextarea value={props.descriptions[index]}
                                       onChange={(e) => props.handleDescriptionChange(index, e.target.value)}
                                       rows={5} cols={30} />
                        {props.submitted && !props.descriptions[index] && <small className="p-error">Campo obligatorio.</small>}
                        {props.submitted && !props.descriptionsValid[index] && <small className="p-error"> Descripción incorrecta.</small>}
                    </div>
                </>
            ))}
        </>
    );

}