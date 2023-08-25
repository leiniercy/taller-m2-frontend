
import React from "react";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {classNames} from "primereact/utils";



const InputNumberFieldCant = (props) => {

    return(<>
        <label htmlFor="cant" className="font-bold">
            Cantidad
        </label>
        <InputNumber id="cant"
                     min={0} max={500}
                     value={props.object.cant}
                     onValueChange={(e) => props.onInputNumberChange(e, 'cant')}
                     className={classNames({'p-invalid': props.submitted && !props.cantValid})}
        />
        <Slider value={props.object.cant}
                onChange={(e) => props.onInputNumberChange(e, 'cant')}
                min={0} max={500}
                className="w-full"/>
        {props.submitted && !props.cantValid && <small className="p-error">Cantidad icorrecta.</small>}
    </>);
}

export default InputNumberFieldCant;