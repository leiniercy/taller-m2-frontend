
import React from "react";
import PropTypes from 'prop-types';
import CustomInputNumber from "@components/pages/Product/CustomInputNumber";
import CustomInputText from "@components/pages/Product/CustomInputText";

const  FieldsReloj = (props) => {

    return(<>
        <div className="field">
            <CustomInputText
                label={'Funcionalidades'}
                error={'Funcionalidades incorrectas.'}
                object={props.object.specialFeature}
                name={'specialFeature'}
                onInputTextChange={props.onInputTextChange}
                submitted={props.submittedsubmitted}
                valid={props.specialFeatureValid}
            />
        </div>
        <div className="field">
            <CustomInputText
                label={'Dispositivos compatibles'}
                error={'Dispositivos compatibles incorrectos.'}
                object={props.object.compatibleDevice}
                name={'compatibleDevice'}
                onInputTextChange={props.onInputTextChange}
                submitted={props.submitted}
                valid={props.compatibleDeviceValid}
            />
        </div>
        <div className="field">
            <CustomInputNumber
                label={'Duración de la batería'}
                error={'Duración de la batería incorrecta'}
                name={'bateryLife'}
                suffix={' amp'}
                object={props.object.bateryLife}
                onInputNumberChange={props.onInputNumberChange}
                valid={props.bateryLifeValid}
                min={0}
                max={8000}
                submitted={props.submitted}
            />
        </div>
    </>);
}

FieldsReloj.propTypes = {
    object: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    specialFeatureValid: PropTypes.bool.isRequired,
    compatibleDeviceValid: PropTypes.bool.isRequired,
    bateryLifeValid: PropTypes.bool.isRequired,
    onInputTextChange: PropTypes.func.isRequired,
    onInputNumberChange: PropTypes.func.isRequired,
}
export default FieldsReloj;