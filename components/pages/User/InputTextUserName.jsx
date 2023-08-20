

import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import React from "react";


const InputTextUserName = (props) => {

    return (
        <>
            <label htmlFor="name" className="font-bold">
                Usuario
            </label>
            <InputText id="name" value={props.name} onChange={(e) => props.onChangeName(e)}
                       required autoFocus
                       className={classNames({'p-invalid': props.submitted && !props.name})}/>
            {props.submitted && !props.name && <small className="p-error">Campo obligatorio. </small>}
            {props.submitted && !props.nameValid && <small className="p-error">El nombre es incorrecto.</small>}

        </>
    );

}

export default InputTextUserName;