import React from "react";
import {Dialog} from "primereact/dialog";
import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";


export default function DialogForm(props) {

    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        <Button label={props.editActive ? "Actualizar" : "Añadir"} icon="pi pi-check" onClick={props.save}/>
    </div>);/*Footer del dialog de anadir*/

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };/*Drag and Drop options (image)*/

    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };/*Drag and Drop options (image)*/

    const tallerNames = [
        { name: 'Taller 2M', code: '2M' },
        { name: 'Taller MJ', code: 'MJ' },
    ];

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
                    <FileUpload
                        // ref={fileUploadRef}
                        name="files"
                        accept="image/*"
                        multiple
                        customUpload={true}
                        className="p-mr-2"
                        maxFileSize={1000000}
                        mode="advanced"
                        header={props.headerTemplate}
                        onSelect={props.onTemplateSelect}
                        onError={props.onTemplateClear}
                        onClear={props.onTemplateClear}
                        headerTemplate={props.headerTemplate}
                        itemTemplate={props.itemTemplate}
                        emptyTemplate={props.emptyTemplate}
                        chooseOptions={chooseOptions}
                        cancelOptions={cancelOptions}
                    />
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="name" value={props.object.name} onChange={(e) => props.onInputTextChange(e, 'name')}
                               required autoFocus
                               className={classNames({'p-invalid': props.submitted && !props.object.name})}/>
                    {props.submitted && !props.object.name && <small className="p-error">Campo obligatorio.</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Precio
                        </label>
                        <InputNumber id="price" value={props.object.price}
                                     min={0} max={1000}
                                     onValueChange={(e) => props.onInputNumberChange(e, 'price')}
                                     mode="currency" currency="USD" locale="en-US"/>
                        <Slider value={props.object.price}
                                onChange={(e) => props.onInputNumberChange(e, 'price')}
                                min={0} max={1000}
                                className="w-full"/>
                    </div>
                    <div className="field col">
                        <label htmlFor="cant" className="font-bold">
                            Cantidad
                        </label>
                        <InputNumber id="cant"
                                     min={0} max={500}
                                     value={props.object.cant}
                                     onValueChange={(e) => props.onInputNumberChange(e, 'cant')}/>
                        <Slider value={props.object.cant}
                                onChange={(e) => props.onInputNumberChange(e, 'cant')}
                                min={0} max={500}
                                className="w-full"/>
                    </div>
                </div>
                <div className="field">
                    <Dropdown value={props.object.taller}
                              onChange={(e) => props.onChangeSelectedBoxTaller(e)}
                              options={tallerNames}
                              optionLabel="name"
                              placeholder="Seleccione el taller"
                              showClear
                              className="w-full" />
                </div>

                {props.otherfields}

            </form>
        </Dialog>
    );

}