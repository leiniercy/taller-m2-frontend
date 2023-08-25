
import React from "react";
import CustomInputNumber from "@components/pages/Product/CustomInputNumber";
import CustomInputText from "@components/pages/Product/CustomInputText";

export default function FieldsReloj(props) {

    return(<>
        <div className="field">
            <CustomInputText
                label={'Funcionalidades'}
                error={'Funcionalidades incorrectas.'}
                object={props.object.specialFeature}
                name={'specialFeature'}
                onInputTextChange={props.onInputTextChange}
                submitted={props.submitted}
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
                object={props.object.bateryLife}
                onInputNumberChange={props.onInputNumberChange}
                valid={props.bateryLifeValid}
                min={0}
                max={100}
                submitted={props.submitted}
            />
        </div>
    </>);
}