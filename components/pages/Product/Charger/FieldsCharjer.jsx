
import React from "react";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";


export default function FieldsCharjer(props) {

    return(<>
        <div className="field">
            <label htmlFor="connectorType" className="font-bold">
                Tipo de conector
            </label>
            <InputText id="connectorType" value={props.object.connectorType} onChange={(e) => props.onInputTextChange(e, 'connectorType')}
                       required autoFocus
                       className={classNames({'p-invalid': props.submitted && !props.object.connectorType})}/>
            {props.submitted && !props.object.connectorType && <small className="p-error">Campo obligatorio.</small>}
        </div>
        <div className="field">
            <label htmlFor="compatibleDevice" className="font-bold">
                Dispositivos compatibles
            </label>
            <InputText id="compatibleDevice" value={props.object.compatibleDevice} onChange={(e) => props.onInputTextChange(e, 'compatibleDevice')}
                       required autoFocus
                       className={classNames({'p-invalid': props.submitted && !props.object.compatibleDevice})}/>
            {props.submitted && !props.object.compatibleDevice && <small className="p-error">Campo obligatorio.</small>}
        </div>
    </>);
}