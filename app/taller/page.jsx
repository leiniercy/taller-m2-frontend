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
import {useSession} from "next-auth/react";


export default function Home() {

    const {data: session, status} = useSession({
        required: true
    });

    if (status === 'authenticated' && session?.user !== undefined && session?.user.rol !== "ROLE_ADMIN") {
        throw new Error('Access denied')
    }

    const productService = new ProductService();
    const chargerService = new ChargerService();
    const movileService = new MovileService();
    const relojService = new RelojService();
    const sellService = new SellService();
    const userService = new UserService();
    const customerService = new CustomerService();

    return (<RenderLayout>
        <div className="flex flex-row flex-wrap w-full gap-2">
            <div className="bg-gray-items lg:flex-1 col-12 lg:col-6 xl:col-3 p-3 border-round">
                <TotalVentas service={sellService.getAllByMonth()}/>
            </div>
            <div className="bg-gray-items lg:flex-1 col-12 lg:col-6 xl:col-3 p-3 border-round">
                <TotalProductos
                    productService={productService.getCant()}
                    chargerService={chargerService.getCant()}
                    movileService={movileService.getCant()}
                    relojService={relojService.getCant()}
                />
            </div>
            <div className="bg-gray-items p-3 border-round lg:flex-1 col-12 lg:col-6 xl:col-3 ">
                <TotalUsuarios service={userService.getAll()}/>
            </div>
            <div className="bg-gray-items p-3 border-round lg:flex-1 col-12 lg:col-6 xl:col-3">
                <TotalClientes service={customerService.getAll()}/>
            </div>
        </div>
        <div className="flex flex-row flex-wrap w-full gap-2">
            <div className="bg-gray-items p-3 border-round flex-grow-1 w-full h-30rem sm:w-full lg:w-5 flex-shrink-0">
                <DoughnutChart
                    productService={productService.getCant()}
                    chargerService={chargerService.getCant()}
                    movileService={movileService.getCant()}
                    relojService={relojService.getCant()}
                />
            </div>

            <div className="bg-gray-items p-3 border-round flex-grow-1 h-30rem w-full sm:w-full lg:w-5 flex-shrink-0">
                <BasicChart service={sellService.getAllByWeek()}/>
            </div>

            <div className="bg-gray-items p-3 border-round flex-grow-1 h-30rem w-full sm:w-full lg:w-5 flex-shrink-0">
                <HorizontalBarChart
                    service={sellService.getAllByMonth()}
                />
            </div>

            <div className="bg-gray-items p-3 border-round flex-grow-1 h-30rem w-full sm:w-full lg:w-5 flex-shrink-0">
                <StackedBarChart
                    service={sellService.getAllByMonthAndProduct()}
                />
            </div>
        </div>
    </RenderLayout>);

}