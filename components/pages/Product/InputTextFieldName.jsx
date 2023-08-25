

import React from "react";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";

const InputTextFieldName = (props) => {


return(<>
    <label htmlFor="name" className="font-bold">
        Nombre
    </label>
    <InputText id="name" value={props.object.name} onChange={(e) => props.onInputTextChange(e, 'name')}
               required autoFocus
               className={classNames({'p-invalid': props.submitted && !props.object.name})}/>
    {props.submitted && !props.object.name && <small className="p-error">Campo obligatorio.</small>}
    {props.submitted && !props.nameValid && <small className="p-error">El nombre es incorrecto.</small>}
</>);

}

export default InputTextFieldName;