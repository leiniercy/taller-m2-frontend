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
        console.log(this.productService.getAll2M());
    }

    render() {
        return (
            <Cliente
                moviles={this.movileService.getAll2M()}
                chargers={this.chargerService.getAll2M()}
                relojes={this.relojService.getAll2M()}
                products={this.productService.getAll2M()}
            />
        );
    }

}