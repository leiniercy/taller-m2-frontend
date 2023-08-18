"use client"

import RenderLayout from "@components/layout/RenderLayout";
import {Fieldset} from "primereact/fieldset";
import DataViewProduct from "@components/pages/Client/DataViewProduct";
import DataViewAccesorio from "@components/pages/Client/Product/DataViewAccesorio";


const Cliente = (props) => {

    return (
        <RenderLayout>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Dispositivos de carga" toggleable>
                        <DataViewProduct
                            service={props.chargers}
                             path={'/taller/cliente/charger/informacion/?id='}
                        />
                    </Fieldset>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Dispositivos móviles" toggleable>
                        <DataViewProduct
                            service={props.moviles}
                            path={'/taller/cliente/movil/informacion/?id='}
                        />
                    </Fieldset>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Relojes inteligentes" toggleable>
                        <DataViewProduct
                            service={props.relojes}
                            path={'/taller/cliente/reloj/informacion/?id='}
                        />
                    </Fieldset>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Otros productos" toggleable>
                        <DataViewAccesorio
                            service={props.products}
                        />
                    </Fieldset>
                </div>
            </div>
        </RenderLayout>);


}
export default Cliente;