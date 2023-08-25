
import React from "react";
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

export default CustomInputText;