import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import React from "react";

export default function DialogFormCustomer(props) {

    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        <Button label={props.editActive ? "Actualizar" : "Añadir"} icon="pi pi-check" onClick={props.save}/>
    </div>);/*Footer del dialog de anadir*/

    return (<Dialog visible={props.visible}
                    style={{width: '40rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    modal
                    className="p-fluid"
                    footer={dialogFooter}
                    onHide={props.hideDialog}
        >
            <form id="product-form" onSubmit={props.save}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="customerName" value={props.object.customerName}
                               onChange={(e) => props.onInputTextChange(e, 'customerName')}
                               required autoFocus
                               className={classNames({'p-invalid': props.submitted && !props.object.customerName})}
                    />
                    {props.submitted && !props.object.customerName && <small className="p-error">Campo obligatorio.</small>}
                    {props.submitted && !props.nameValid && <small className="p-error">El nombre es incorrecto.</small>}
                </div>
                <div className="field">
                    <label htmlFor="movile" className="font-bold">
                        Teléfono
                    </label>
                    <InputText id="name" value={props.object.customerMovile}
                               onChange={(e) => props.onInputTextChange(e, 'customerMovile')}
                               required autoFocus
                               className={classNames({'p-invalid': props.submitted && !props.object.customerMovile})}
                    />
                    {props.submitted && !props.object.customerMovile && <small className="p-error">Campo obligatorio.</small>}
                    {props.submitted && !props.phoneValid && <small className="p-error">El teléfono no es incorrecto.</small>}
                </div>
            </form>
        </Dialog>
    )

}