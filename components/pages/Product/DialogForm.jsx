import React from "react";
import {Dialog} from "primereact/dialog";
import {FileUpload} from "primereact/fileupload";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {Galleria} from "primereact/galleria";


export default function DialogForm(props) {

    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        <Button label={props.editActive ? "Actualizar" : "Añadir"} icon="pi pi-check" onClick={props.save}/>
    </div>);/*Footer del dialog de anadir*/

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined w-full'
    };/*Drag and Drop options (image)*/

    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };/*Drag and Drop options (image)*/

    const tallerNames = [
        {name: 'Taller 2M', code: '2M'},
        {name: 'Taller MJ', code: 'MJ'},
    ];

    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
    const itemTemplate = (item) => {
       if(props.imageSelected){
          return <img className="h-20rem sm:h-20rem w-full  border-round"
                      alt={item.name} role="presentation" src={item.objectURL}/>;
       }
        return <img className="h-20rem sm:h-20rem w-full  border-round" src={item.url} alt={item.name}/>
    }


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
                        name="files"
                        accept="image/*"
                        multiple
                        customUpload={true}
                        className="p-mr-2"
                        maxFileSize={1000000}
                        mode="basic"
                        onSelect={props.onTemplateSelect}
                        chooseOptions={chooseOptions}
                    />
                    {(!props.imageSelected && !props.editActive) && <div className="mt-2 flex align-items-center flex-column">
                        <i className="pi pi-image mt-3 p-5" style={{
                            fontSize: '5em',
                            borderRadius: '50%',
                            backgroundColor: 'var(--surface-b)',
                            color: 'var(--surface-d)'
                        }}></i>
                    </div>}
                    {(props.imageSelected || props.editActive) && <Galleria
                        className="mt-2 bg-gray-items w-full h-25rem sm:h-25rem"
                        value={props.object.files}
                        responsiveOptions={responsiveOptions}
                        numVisible={3}
                        circular={true}
                        showItemNavigators
                        showItemNavigatorsOnHover
                        item={itemTemplate}
                        showThumbnails={false}
                        showIndicators
                    />}
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
                              className="w-full"/>
                </div>

                {props.otherfields}

            </form>
        </Dialog>
    );

}