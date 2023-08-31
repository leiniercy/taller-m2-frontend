"use client"

import {Component} from "react";
import Cliente from "@components/pages/Client/Cliente";
import MovileService from "@services/MovileServie";
import ChargerService from "@services/ChargerService";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";


export default class TallerMJProducts extends Component {
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
                moviles={this.movileService.getAllMJ()}
                movilPath={'/taller/informacion/tallerMJ/movil/?id='}
                chargers={this.chargerService.getAllMJ()}
                chargerPath={'/taller/informacion/tallerMJ/charger/?id='}
                relojes={this.relojService.getAllMJ()}
                relojPath={'/taller/informacion/tallerMJ/reloj/?id='}
                products={this.productService.getAllAccesoriosMJ()}
            />
        );
    }

}