
import React from "react";
import PropTypes from 'prop-types';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";


const FieldsCharjer = (props) => {

    return(<>
        <div className="field">
            <label htmlFor="connectorType" className="font-bold">
                Tipo de conector
            </label>
            <InputText id="connectorType" value={props.object.connectorType} onChange={(e) => props.onInputTextChange(e, 'connectorType')}
                       required autoFocus
                       className={classNames({'p-invalid': props.submitted && !props.object.connectorType})}/>
            {props.submitted && !props.object.connectorType && <small className="p-error">Campo obligatorio.</small>}
            {props.submitted && !props.connectorTypeValid && <small className="p-error"> Tipo de conector incorrecto.</small>}
        </div>
        <div className="field">
            <label htmlFor="compatibleDevice" className="font-bold">
                Dispositivos compatibles
            </label>
            <InputText id="compatibleDevice" value={props.object.compatibleDevice} onChange={(e) => props.onInputTextChange(e, 'compatibleDevice')}
                       required autoFocus
                       className={classNames({'p-invalid': props.submitted && !props.object.compatibleDevice})}/>
            {props.submitted && !props.object.compatibleDevice && <small className="p-error">Campo obligatorio.</small>}
            {props.submitted && !props.compatibleDeviceValid && <small className="p-error"> Dispositivos compatibles incorrectos.</small>}
        </div>
    </>);
}

FieldsCharjer.propTypes = {
    object: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    connectorTypeValid: PropTypes.bool.isRequired,
    compatibleDeviceValid: PropTypes.bool.isRequired,
    onInputTextChange: PropTypes.func.isRequired,
}

export default FieldsCharjer;
