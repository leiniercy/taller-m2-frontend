import React from "react";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {classNames} from "primereact/utils";
import PropTypes from "prop-types";

const CustomInputNumber = (props) => {

    return (<>
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
CustomInputNumber.propType = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,
    object: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    submitted: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    onInputNumberChange: PropTypes.func.isRequired,
}
export default CustomInputNumber;