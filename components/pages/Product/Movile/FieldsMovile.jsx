import React from "react";
import {InputNumber} from "primereact/inputnumber";
import {Slider} from "primereact/slider";
import {Checkbox} from "primereact/checkbox";


export default function FieldsMovile(props) {

    return (<>
        <div className="formgrid grid">
            <div className="field col">
                <label htmlFor="sizeStorage" className="font-bold">
                    Almacenamiento
                </label>
                <InputNumber id="sizeStorage"
                             suffix=" GB"
                             min={0} max={100}
                             value={props.object.sizeStorage}
                             onValueChange={(e) => props.onInputNumberChange(e, 'sizeStorage')}
                />
                <Slider value={props.object.sizeStorage}
                        onChange={(e) => props.onInputNumberChange(e, 'sizeStorage')}
                        min={0} max={100}
                        className="w-full"/>
            </div>
            <div className="field col">
                <label htmlFor="ram" className="font-bold">
                    Ram
                </label>
                <InputNumber id="ram"
                             suffix=" GB"
                             min={0} max={100}
                             value={props.object.ram}
                             onValueChange={(e) => props.onInputNumberChange(e, 'ram')}/>
                <Slider value={props.object.ram} onChange={(e) => props.onInputNumberChange(e, 'ram')}
                        min={0} max={100}
                        className="w-full"/>
            </div>
        </div>

        <div className="formgrid grid">
            <div className="field col">
                <label htmlFor="red" className="font-bold">
                    Redes disponibles
                </label>
                <div className="card flex flex-wrap justify-content-around gap-3 w-full">
                    <div className="flex align-items-center">
                        <Checkbox inputId="banda2G" name="banda2G"
                                  checked={props.object.banda2G}
                                  onChange={(e) => props.onCheckBoxChange(e, 'banda2G')}/>
                        <label htmlFor="banda2G" className="ml-2">2G</label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox inputId="banda3G" name="banda3G"
                                  checked={props.object.banda3G}
                                  onChange={(e) => props.onCheckBoxChange(e, 'banda3G')}/>
                        <label htmlFor="banda3G" className="ml-2">3G</label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox inputId="banda4G" name="banda4G"
                                  checked={props.object.banda4G}
                                  onChange={(e) => props.onCheckBoxChange(e, 'banda4G')}/>
                        <label htmlFor="banda4G" className="ml-2">4G</label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox inputId="banda5G" name="banda5G"
                                  checked={props.object.banda5G}
                                  onChange={(e) => props.onCheckBoxChange(e, 'banda5G')}/>
                        <label htmlFor="banda2G" className="ml-2">5G</label>
                    </div>
                </div>
            </div>
        </div>

        <div className="formgrid grid">
            <div className="field col">
                <label htmlFor="camaraTrasera" className="font-bold">
                    Cámara Trasera
                </label>
                <InputNumber id="camaraTrasera"
                             suffix=" px"
                             min={0} max={100}
                             value={props.object.camaraTrasera}
                             onValueChange={(e) => props.onInputNumberChange(e, 'camaraTrasera')}
                />
                <Slider value={props.object.camaraTrasera}
                        onChange={(e) => props.onInputNumberChange(e, 'camaraTrasera')}
                        min={0} max={100}
                        className="w-full"/>
            </div>
            <div className="field col">
                <label htmlFor="camaraFrontal" className="font-bold">
                    Cámara Frontal
                </label>
                <InputNumber id="ram"
                             suffix=" px"
                             min={0} max={100}
                             value={props.object.camaraFrontal}
                             onValueChange={(e) => props.onInputNumberChange(e, 'camaraFrontal')}/>
                <Slider value={props.object.camaraFrontal}
                        onChange={(e) => props.onInputNumberChange(e, 'camaraFrontal')}
                        min={0} max={100}
                        className="w-full"/>
            </div>
            <div className="field col">
                <label htmlFor="bateria" className="font-bold">
                    Batería
                </label>
                <InputNumber id="bateria"
                             suffix=" días"
                             min={0} max={100}
                             value={props.object.bateria}
                             onValueChange={(e) => props.onInputNumberChange(e, 'bateria')}/>
                <Slider value={props.object.bateria}
                        onChange={(e) => props.onInputNumberChange(e, 'bateria')}
                        min={0} max={100}
                        className="w-full"/>
            </div>
        </div>

    </>);

}