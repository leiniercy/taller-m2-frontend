

import React from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

import SelectBoxImages from "@components/pages/Product/SelectBoxImages";
import InputTextFieldName from "@components/pages/Product/InputTextFieldName";
import InputNumberFieldPrice from "@components/pages/Product/InputNumberFieldPrice";
import InputNumberFieldCant from "@components/pages/Product/InputNumberFieldCant";
import SelectBoxTaller from "@components/pages/Product/SelectBoxTaller";


export default function DialogForm(props) {

    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        <Button label={props.editActive ? "Actualizar" : "Añadir"} icon="pi pi-check" onClick={props.save}/>
    </div>);/*Footer del dialog de anadir*/


    return (
        <Dialog visible={props.visible}
                style={{width: '32rem'}}
                breakpoints={{'960px': '75vw', '641px': '90vw'}}
                modal
                className="p-fluid"
                footer={dialogFooter}
                onHide={props.hideDialog}
        >

            <form id="product-form" onSubmit={props.save}>
                <div className="field">
                    <SelectBoxImages
                        onTemplateSelect={props.onTemplateSelect}
                        imageSelected={props.imageSelected}
                        editActive={props.editActive}
                        object={props.object}
                        submitted={props.submitted}
                    />
                </div>

                <div className="field">
                    <InputTextFieldName
                        object={props.object}
                        onInputTextChange={props.onInputTextChange}
                        submitted={props.submitted}
                        nameValid={props.nameValid}
                    />
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <InputNumberFieldPrice
                            object={props.object}
                            onInputNumberChange={props.onInputNumberChange}
                            submitted={props.submitted}
                            priceValid={props.priceValid}
                        />
                    </div>
                    <div className="field col">
                        <InputNumberFieldCant
                            object={props.object}
                            onInputNumberChange={props.onInputNumberChange}
                            submitted={props.submitted}
                            cantValid={props.cantValid}
                        />
                    </div>
                </div>
                <div className="field">
                    <SelectBoxTaller
                        object={props.object}
                        onChangeSelectedBoxTaller={props.onChangeSelectedBoxTaller}
                        submitted={props.submitted}
                    />
                </div>

                {props.otherfields}

            </form>
        </Dialog>
    );

}