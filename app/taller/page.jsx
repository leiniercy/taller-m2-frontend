"use client"
import {Suspense} from "react";

import ChargerService from "@services/ChargerService";
import MovileService from "@services/MovileServie";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";
import SellService from "@services/SellService";
import UserService from "@services/UserService";
import CustomerService from "@services/CustomerService";

//Componentes
import RenderLayout from "@components/layout/RenderLayout";
import DoughnutChart from "@components/pages/Home/DoughnutChart";
import StackedBarChart from "@components/pages/Home/StackedBarChart";
import BasicChart from "@components/pages/Home/BasicChart";
import HorizontalBarChart from "@components/pages/Home/HorizontalBarChart";
import TotalVentas from "@components/pages/Home/TotalVentas";
import TotalProductos from "@components/pages/Home/TotalProductos";
import TotalUsuarios from "@components/pages/Home/TotalUsuarios";
import TotalClientes from "@components/pages/Home/TotalClientes";



export default function Home() {

    const productService = new ProductService();
    const chargerService = new ChargerService();
    const movileService = new MovileService();
    const relojService = new RelojService();
    const sellService = new SellService();
    const userService = new UserService();
    const customerService = new CustomerService();

    return (<RenderLayout>
        <div className="col-12 lg:col-6 xl:col-3">
            <TotalVentas service={sellService.getAllByMonth()}/>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
            <TotalProductos
                productService={productService.getCant()}
                chargerService={chargerService.getCant()}
                movileService={movileService.getCant()}
                relojService={relojService.getCant()}
            />
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
            <TotalUsuarios service={userService.getAll()}/>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
            <TotalClientes service={customerService.getAll()}/>
        </div>

        <div className="col-12 xl:col-6">
                <DoughnutChart
                    productService={productService.getCant()}
                    chargerService={chargerService.getCant()}
                    movileService={movileService.getCant()}
                    relojService={relojService.getCant()}
                />
        </div>

        <div className="col-12 xl:col-6">
            <BasicChart service={sellService.getAllByWeek()}/>
        </div>

        <div className="col-12 xl:col-6">
            <HorizontalBarChart
                service={sellService.getAllByMonth()}
            />
        </div>

        <div className="col-12 xl:col-6">
            <StackedBarChart
                service={sellService.getAllByMonthAndProduct()}
            />
        </div>
    </RenderLayout>);

}