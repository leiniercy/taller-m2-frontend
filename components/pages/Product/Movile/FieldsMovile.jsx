
import React from "react";
import CheckBoxGroup from "@components/pages/Product/Movile/CheckBoxGroup";
import CustomInputNumber from "@components/pages/Product/CustomInputNumber";


export default function FieldsMovile(props) {

    return (<>
        <div className="formgrid grid">
            <div className="field col">
                <CustomInputNumber
                    label={'Almacenamiento'}
                    error={'Almacenamiento incorrecto'}
                    name={'sizeStorage'}
                    object={props.object.sizeStorage}
                    onInputNumberChange={props.onInputNumberChange}
                    valid={props.sizeStorageValid}
                    min={0}
                    max={100}
                    submitted={props.submitted}
                />
            </div>
            <div className="field col">
                <CustomInputNumber
                    label={'Ram'}
                    error={'Ram incorrecta'}
                    name={'ram'}
                    object={props.object.ram}
                    onInputNumberChange={props.onInputNumberChange}
                    valid={props.ramValid}
                    min={0}
                    max={100}
                    submitted={props.submitted}
                />
            </div>
        </div>

        <div className="formgrid grid">
            <CheckBoxGroup
            object={props.object}
            onCheckBoxChange={props.onCheckBoxChange}
            />
        </div>

        <div className="formgrid grid">
            <div className="field col">
                <CustomInputNumber
                    label={'Cámara Trasera'}
                    error={'Cámara trasera incorrecta'}
                    name={'camaraTrasera'}
                    object={props.object.camaraTrasera}
                    onInputNumberChange={props.onInputNumberChange}
                    valid={props.camaraTraseraValid}
                    min={0}
                    max={100}
                    submitted={props.submitted}
                />
            </div>
            <div className="field col">
                <CustomInputNumber
                    label={'Cámara Frontal'}
                    error={'Cámara frontal incorrecta'}
                    name={'camaraFrontal'}
                    object={props.object.camaraFrontal}
                    onInputNumberChange={props.onInputNumberChange}
                    valid={props.camaraFrontalValid}
                    min={0}
                    max={100}
                    submitted={props.submitted}
                />
            </div>
            <div className="field col">
                <CustomInputNumber
                    label={'Batería'}
                    error={'Batería incorrecta'}
                    name={'bateria'}
                    object={props.object.bateria}
                    onInputNumberChange={props.onInputNumberChange}
                    valid={props.bateriaValid}
                    min={0}
                    max={100}
                    submitted={props.submitted}
                />
            </div>
        </div>

    </>);

}