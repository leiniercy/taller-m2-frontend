
import React from "react";
import PropTypes from 'prop-types';
import CheckBoxGroup from "@components/pages/Product/Movile/CheckBoxGroup";
import CustomInputNumber from "@components/pages/Product/CustomInputNumber";

 const FieldsMovile = (props) => {

    return (<>
        <div className="formgrid grid">
            <div className="field col">
                <CustomInputNumber
                    label={'Almacenamiento'}
                    error={'Almacenamiento incorrecto'}
                    name={'sizeStorage'}
                    suffix={' GB'}
                    object={props.object.sizeStorage}
                    onInputNumberChange={props.onInputNumberChange}
                    valid={props.sizeStorageValid}
                    min={0}
                    max={1024}
                    submitted={props.submitted}
                />
            </div>
            <div className="field col">
                <CustomInputNumber
                    label={'Ram'}
                    error={'Ram incorrecta'}
                    name={'ram'}
                    suffix={' GB'}
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
                    suffix={' px'}
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
                    suffix={' px'}
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
                    suffix={' amp'}
                    object={props.object.bateria}
                    onInputNumberChange={props.onInputNumberChange}
                    valid={props.bateriaValid}
                    min={0}
                    max={8000}
                    submitted={props.submitted}
                />
            </div>
        </div>

    </>);

}

FieldsMovile.propType = {
    object: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    sizeStorageValid: PropTypes.bool.isRequired,
    ramValid: PropTypes.bool.isRequired,
    camaraTraseraValid: PropTypes.bool.isRequired,
    camaraFrontalValid: PropTypes.bool.isRequired,
    bateriaValid: PropTypes.bool.isRequired,
    onCheckBoxChange: PropTypes.func.isRequired,
    onInputNumberChange: PropTypes.func.isRequired,
}
export  default FieldsMovile;