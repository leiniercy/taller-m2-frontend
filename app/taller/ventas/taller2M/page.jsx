"use client"

import {Component} from "react";

//Components
import Ventas from "@components/pages/Ventas/Ventas";

//Service
import SellService from "@services/SellService";
import CustomerService from "@services/CustomerService";
import ProductService from "@services/ProductService";


export default class TallerMJVentas extends Component {
    constructor() {
        super();
        this.sellService = new SellService();
        this.customerService = new CustomerService();
        this.productService = new ProductService();
    }
    componentDidMount() {
    }
    render() {
        return(<Ventas
            productService={this.productService}
            customerService={this.customerService}
            sellService={this.sellService}
            productsTable={this.productService.getAllProducts2M()}
            productsForm={this.productService.getAllProductsCantThanCero("Taller 2M")}
            customers={this.customerService.getAll()}
            taller={"Taller 2M"}
        />)
    }

}