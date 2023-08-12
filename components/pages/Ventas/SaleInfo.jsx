
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
                        </div>
                        <div className="field col">
                            <label htmlFor="price" className="font-bold">
                                Precio de venta
                            </label>
                            <InputNumber id={'price' - {index}}
                                         value={props.prices[index]}
                                         min={product.price} max={1000}
                                         onValueChange={(e) => props.handlePriceChange(index, e.value)}
                                         mode="currency" currency="USD" locale="en-US"/>
                            <Slider
                                value={props.prices[index]}
                                onChange={(e) => props.handlePriceChange(index, e.value)}
                                min={product.price} max={1000}
                                className="w-full"/>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="description" className="font-bold">
                            Descripción
                        </label>
                        <InputTextarea value={props.descriptions}
                                       onChange={(e) => props.handleDescriptionChange(index, e.target.value)}
                                       rows={5} cols={30} />
                    </div>
                </>
            ))}
        </>
    );

}