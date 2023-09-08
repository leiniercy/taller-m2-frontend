"use client"
import {Suspense, useMemo, useState, useEffect} from "react";

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

    const [cantAccesorios, setCantAccesorios] = useState(0);
    const [cantMoviles, setCantMoviles] = useState(0);
    const [cantRelojes, setCantRelojes] = useState(0);
    const [cantCargadores, setCantCargadores] = useState(0);


    const [totalVentas, setTotalVentas] = useState(0);
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalClientes, setTotalClientes] = useState(0);

    const [salesWeek, setSalesWeek] = useState([]);
    const [salesMonth, setSalesMonth] = useState([]);
    const [salesProducts, setSalesProducts] = useState([]);

    const calcularTotalVentas = (token, taller) => {
        sellService.getAllByMonth(token, taller).then(data => {
            let _total = 0;
            for (let i = 0; i < 12; i++) {
                _total += data[i];
            }
            setTotalVentas(_total);
        });
    }//Calculando el total obtenido por ventas
    const calcularTotalProductos = (token, taller) => {
        productService.getCant(token, taller).then(accesorios => {
            setCantAccesorios(accesorios);
            chargerService.getCant(token, taller).then(chargers => {
                setCantCargadores(chargers);
                movileService.getCant(token, taller).then(moviles => {
                    setCantMoviles(moviles);
                    relojService.getCant(token, taller).then(relojes => {
                        setCantRelojes(relojes);
                        setTotalProductos(accesorios + chargers + moviles + relojes);
                    });
                });
            });
        });
    }//Calculando el total productos actual
    const calcularTotalUsuarios = (token) => {
        userService.getAll(token).then((data) => setTotalUsuarios(data.length));
    }//Calculando el total de usuarios
    const calcularTotalClientes = (token) => {
        customerService.getAll(token).then((data) => {
            setTotalClientes(data.length)
        });
    }//Calculando el total de clientes
    const getAllByWeek = (token, taller) => {
        sellService.getAllByWeek(token, taller).then((sales) => setSalesWeek(sales));
    }// obtener listado de ganancias diarias en la semana actual
    const getAllByMonth = (token, taller) => {
        sellService.getAllByMonth(token, taller).then((sales) => setSalesMonth(sales));
    }// obtener listado de ganancias diarias por mes
    const getAllProductsByMonth = (token, taller) => {
        sellService.getAllByMonthAndProduct(token, taller).then((products) => setSalesProducts(products));
    }// obtener listado productos vendidos por mes


    //ComponentdidMount
    useEffect(() => {
        if (status === 'authenticated' && session?.user !== undefined) {
            calcularTotalVentas(session?.user.token, session?.user.taller);
            calcularTotalProductos(session?.user.token, session?.user.taller);
            calcularTotalUsuarios(session?.user.token);
            calcularTotalClientes(session?.user.token);
            getAllByWeek(session?.user.token, session?.user.taller);
            getAllByMonth(session?.user.token, session?.user.taller);
            getAllProductsByMonth(session?.user.token, session?.user.taller)
        }
    }, [session?.user]);


    //Informacion en memoria
    const totalVentasMemo = useMemo(() => totalVentas, [totalVentas]);
    const totalProductsMemo = useMemo(() => totalProductos, [totalProductos]);
    const totalUsuariosMemo = useMemo(() => totalUsuarios, [totalUsuarios]);
    const totalClientesMemo = useMemo(() => totalClientes, [totalClientes]);

    const cantAccesoriosMemo = useMemo(() => cantAccesorios, [cantAccesorios]);
    const cantMovilesMemo = useMemo(() => cantMoviles, [cantMoviles]);
    const cantRelojesMemo = useMemo(() => cantRelojes, [cantRelojes]);
    const cantCargadoresMemo = useMemo(() => cantCargadores, [cantCargadores]);

    const salesWeekMemo = useMemo(() => salesWeek, [salesWeek]);
    const salesMonthMemo = useMemo(() => salesMonth, [salesMonth]);
    const productMonthMemo = useMemo(() => salesProducts, [salesProducts]);


    return (<RenderLayout>
        <div className="flex flex-row flex-wrap w-full gap-2">
            <div className="bg-gray-items lg:flex-1 col-12 lg:col-6 xl:col-3 p-3 border-round">
                <TotalVentas total={totalVentasMemo}/>
            </div>
            <div className="bg-gray-items lg:flex-1 col-12 lg:col-6 xl:col-3 p-3 border-round">
                <TotalProductos
                    total={totalProductsMemo}
                />
            </div>
            <div className="bg-gray-items p-3 border-round lg:flex-1 col-12 lg:col-6 xl:col-3 ">
                <TotalUsuarios total={totalUsuariosMemo}/>
            </div>
            <div className="bg-gray-items p-3 border-round lg:flex-1 col-12 lg:col-6 xl:col-3">
                <TotalClientes total={totalClientesMemo}/>
            </div>
        </div>
        <div className="flex flex-row flex-wrap w-full gap-2">
            <div className="bg-gray-items p-3 border-round flex-grow-1 w-full h-30rem sm:w-full lg:w-5 flex-shrink-0">
                <DoughnutChart
                    products={cantAccesoriosMemo}
                    chargers={cantCargadoresMemo}
                    moviles={cantMovilesMemo}
                    relojes={cantRelojesMemo}
                />
            </div>

            <div className="bg-gray-items p-3 border-round flex-grow-1 h-30rem w-full sm:w-full lg:w-5 flex-shrink-0">
                <BasicChart sales={salesWeekMemo}/>
            </div>
            <div className="bg-gray-items p-3 border-round flex-grow-1 h-30rem w-full sm:w-full lg:w-5 flex-shrink-0">
                <HorizontalBarChart
                    sales={salesMonthMemo}
                />
            </div>
            <div className="bg-gray-items p-3 border-round flex-grow-1 h-30rem w-full sm:w-full lg:w-5 flex-shrink-0">
                <StackedBarChart
                    products={productMonthMemo}
                />
            </div>
        </div>
    </RenderLayout>);

}