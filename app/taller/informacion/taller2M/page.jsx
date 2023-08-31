"use client"

import {Component} from "react";
import Cliente from "@components/pages/Client/Cliente";
import MovileService from "@services/MovileServie";
import ChargerService from "@services/ChargerService";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";


export default class Taller2MProducts extends Component {
    constructor() {
        super();
        this.movileService = new MovileService();
        this.chargerService = new ChargerService();
        this.relojService = new RelojService();
        this.productService = new ProductService();
    }

    componentDidMount() {

    }

    render() {
        return (
            <Cliente
                moviles={this.movileService.getAll2M()}
                movilPath={'/taller/informacion/taller2M/movil/?id='}
                chargers={this.chargerService.getAll2M()}
                chargerPath={'/taller/informacion/taller2M/charger/?id='}
                relojes={this.relojService.getAll2M()}
                relojPath={'/taller/informacion/taller2M/reloj/?id='}
                products={this.productService.getAllAccesorios2M()}
            />
        );
    }

}