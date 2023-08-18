"use client"

import {Component} from "react";
//Components
import Ventas from "@components/pages/Ventas/Ventas";

//Service
import ProductService from "@services/ProductService";
import CustomerService from "@services/CustomerService";
import SellService from "@services/SellService";


export default class TallerMJVentas extends Component {
    constructor() {
        super();
        this.productService = new ProductService();
        this.customerService = new CustomerService();
        this.sellService = new SellService();

    }
    componentDidMount() {
    }
    render() {
        return(<Ventas
            productService={this.productService}
            customerService={this.customerService}
            sellService={this.sellService}
            productsTable={this.productService.getAllProductsMJ()}
            productsForm={this.productService.getAllProductsCantThanCero("Taller MJ")}
            customers={this.customerService.getAll()}
            taller={"Taller MJ"}
        />)
    }

}