
import React from "react";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {classNames} from "primereact/utils";


const InputNumberFieldPrice = (props) => {

    return(<>
        <label htmlFor="price" className="font-bold">
            Precio
        </label>
        <InputNumber id="price" value={props.object.price}
                     min={0} max={1000}
                     onValueChange={(e) => props.onInputNumberChange(e, 'price')}
                     mode="currency" currency="USD" locale="en-US"
                     className={classNames({'p-invalid': props.submitted && !props.priceValid})}
        />
        <Slider value={props.object.price}
                onChange={(e) => props.onInputNumberChange(e, 'price')}
                min={0} max={1000}
                className="w-full"/>
        {props.submitted && !props.priceValid && <small className="p-error">Precio icorrecto.</small>}
    </>);

}

export default InputNumberFieldPrice;