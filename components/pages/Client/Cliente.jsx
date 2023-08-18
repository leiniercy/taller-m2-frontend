"use client"

import {Fieldset} from "primereact/fieldset";
import DataViewProduct from "@components/pages/Client/DataViewProduct";
import RenderLayout from "@components/layout/RenderLayout";

const Cliente = (props) => {

    return (
        <RenderLayout>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Dispositivos de carga" toggleable>
                        <DataViewProduct
                            service={props.chargers}
                             path={props.chargerPath}
                            isMovile={false}
                        />
                    </Fieldset>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Dispositivos móviles" toggleable>
                        <DataViewProduct
                            service={props.moviles}
                            path={props.movilPath}
                            isMovile={false}
                        />
                    </Fieldset>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Relojes inteligentes" toggleable>
                        <DataViewProduct
                            service={props.relojes}
                            path={props.relojPath}
                            isMovile={false}
                        />
                    </Fieldset>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Otros productos" toggleable>
                        <DataViewProduct
                            service={props.products}
                            isMovile={true}
                        />
                    </Fieldset>
                </div>
            </div>
        </RenderLayout>);


}
export default Cliente;