
import React from "react";
import PropTypes from 'prop-types';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";


const CustomInputText = (props) => {


    return(<>
        <label htmlFor={props.name} className="font-bold">
            {props.label}
        </label>
        <InputText id="name" value={props.object} onChange={(e) => props.onInputTextChange(e, props.name)}
                   required autoFocus
                   className={classNames({'p-invalid': props.submitted && !props.object})}/>
        {props.submitted && !props.object && <small className="p-error">Campo obligatorio.</small>}
        {props.submitted && !props.valid && <small className="p-error"> {props.error}</small>}
    </>);
}
CustomInputText.propType = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    object: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    onInputTextChange: PropTypes.func.isRequired,
}
export default CustomInputText;