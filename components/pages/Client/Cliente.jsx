"use client"

import {Fieldset} from "primereact/fieldset";
import PropTypes from 'prop-types';
import DataViewProduct from "@components/pages/Client/DataViewProduct";
import RenderLayout from "@components/layout/RenderLayout";

const Cliente = (props) => {

    return (
        <RenderLayout>
            <div className="col-12">
                <div className="card">
                    <Fieldset legend="Dispositivos de carga" toggleable>
                        <DataViewProduct
                            products={props.chargers}
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
                            products={props.moviles}
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
                            products={props.relojes}
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
                            products={props.products}
                            isMovile={true}
                        />
                    </Fieldset>
                </div>
            </div>
        </RenderLayout>);


}

Cliente.propTypes = {
    chargers: PropTypes.arrayOf(PropTypes.object).isRequired,
    relojes: PropTypes.arrayOf(PropTypes.object).isRequired,
    moviles: PropTypes.arrayOf(PropTypes.object).isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    chargerPath: PropTypes.string.isRequired,
    movilPath: PropTypes.string.isRequired,
    relojPath: PropTypes.string.isRequired,
}


export default Cliente;