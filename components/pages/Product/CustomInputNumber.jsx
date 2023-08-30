
import React from "react";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {classNames} from "primereact/utils";

const CustomInputNumber = (props) => {

    return(<>
        <label htmlFor={props.name} className="font-bold">
            {props.label}
        </label>
        <InputNumber id={props.name}
                     suffix={props.suffix}
                     prefix={props.prefix}
                     min={props.min} max={props.max}
                     value={props.object}
                     onValueChange={(e) => props.onInputNumberChange(e, props.name)}
                     className={classNames({'p-invalid': props.submitted && !props.valid})}
        />
        <Slider value={props.object}
                onChange={(e) => props.onInputNumberChange(e, props.name)}
                min={props.min} max={props.max}
                className="w-full"/>
        {props.submitted && !props.valid && <small className="p-error">{props.error}</small>}
    </>)

}

export default CustomInputNumber;