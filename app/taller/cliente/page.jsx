"use client"

import {Fieldset} from 'primereact/fieldset';
import DataViewProduct from "@components/pages/Client/DataViewProduct";
//Service
import MovileService from "@services/MovileServie";
import ChargerService from "@services/ChargerService";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";
import DataViewAccesorio from "@components/pages/Client/Product/DataViewAccesorio";
import RenderLayout from "@components/layout/RenderLayout";

export default function Cliente(props) {

    const movileService = new MovileService();
    const chargerService = new ChargerService();
    const relojService = new RelojService();
    const productService = new ProductService();

    return (
        <RenderLayout>
                <div className="col-12">
                    <div className="card">
                        <Fieldset legend="Dispositivos de carga" toggleable>
                            <DataViewProduct
                                service={chargerService.getAll()}
                                path={'/taller/cliente/charger/informacion/?id='}
                            />
                        </Fieldset>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <Fieldset legend="Dispositivos móviles" toggleable>
                            <DataViewProduct
                                service={movileService.getAll()}
                                path={'/taller/cliente/movil/informacion/?id='}
                            />
                        </Fieldset>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <Fieldset legend="Relojes inteligentes" toggleable>
                            <DataViewProduct
                                service={relojService.getAll()}
                                path={'/taller/cliente/reloj/informacion/?id='}
                            />
                        </Fieldset>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <Fieldset legend="Otros productos" toggleable>
                            <DataViewAccesorio
                                service={productService.getAllProducts()}
                            />
                        </Fieldset>
                    </div>
                </div>
        </RenderLayout>);
}