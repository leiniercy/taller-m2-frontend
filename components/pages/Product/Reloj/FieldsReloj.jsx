
import React from "react";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {InputNumber} from "@node_modules/primereact/inputnumber";
import {Slider} from "@node_modules/primereact/slider";

export default function FieldsReloj(props) {

    return(<>
        <div className="field">
            <label htmlFor="specialFeature" className="font-bold">
                Funcionalidades
            </label>
            <InputText id="name" value={props.object.specialFeature} onChange={(e) => props.onInputTextChange(e, 'specialFeature')}
                       required autoFocus
                       className={classNames({'p-invalid': props.submitted && !props.object.specialFeature})}/>
            {props.submitted && !props.object.specialFeature && <small className="p-error">Campo obligatorio.</small>}
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
        <div className="field">
            <label htmlFor="bateryLife" className="font-bold">
                Duración de la batería
            </label>
            <InputNumber id="bateryLife"
                         suffix=" días"
                         min={0} max={100}
                         value={props.object.bateryLife}
                         onValueChange={(e) => props.onInputNumberChange(e, 'bateryLife')}/>
            <Slider value={props.object.bateryLife}
                    onChange={(e) => props.onInputNumberChange(e, 'bateryLife')}
                    min={0} max={100}
                    className="w-full"/>
        </div>
    </>);
}