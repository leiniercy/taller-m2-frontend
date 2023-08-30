import React from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

import SelectBoxImages from "@components/pages/Product/SelectBoxImages";
import SelectBoxTaller from "@components/pages/Product/SelectBoxTaller";
import CustomInputNumber from "@components/pages/Product/CustomInputNumber";
import CustomInputText from "@components/pages/Product/CustomInputText";


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
                    <CustomInputText
                        label={'Nombre'}
                        error={'Nombre incorrecto.'}
                        object={props.object.name}
                        name={'name'}
                        onInputTextChange={props.onInputTextChange}
                        submitted={props.submitted}
                        valid={props.nameValid}
                    />
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <CustomInputNumber
                            label={'Precio'}
                            error={'Precio incorrecto'}
                            name={'price'}
                            prefix={"$ "}
                            object={props.object.price}
                            onInputNumberChange={props.onInputNumberChange}
                            valid={props.priceValid}
                            min={0}
                            max={1000}
                            submitted={props.submitted}
                        />
                    </div>
                    <div className="field col">
                        <CustomInputNumber
                            label={'Cantidad'}
                            error={'Cantidad incorrecta'}
                            name={'cant'}
                            object={props.object.cant}
                            onInputNumberChange={props.onInputNumberChange}
                            valid={props.cantValid}
                            min={0}
                            max={500}
                            submitted={props.submitted}
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