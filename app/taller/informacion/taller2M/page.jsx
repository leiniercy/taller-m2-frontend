"use client"

import {Component, useEffect, useMemo, useState} from "react";
import Cliente from "@components/pages/Client/Cliente";
import MovileService from "@services/MovileServie";
import ChargerService from "@services/ChargerService";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";
import {useSession} from "next-auth/react";


export default function Taller2MProducts(){

        const {data: session, status} = useSession();


        const movileService = new MovileService();
        const chargerService = new ChargerService();
        const relojService = new RelojService();
        const productService = new ProductService();

        const [moviles, setMoviles] = useState([]);
        const [relojs, setRelojs] = useState([]);
        const [chargers, setChargers] = useState([]);
        const [products, setProducts] = useState([]);

        const getAllMovile2M = (token) => {
            movileService.getAll2M(token).then((data)=>setMoviles(data));
        }
        const getAllChargers2M = (token) => {
            chargerService.getAll2M(token).then((data)=>setChargers(data));
        }
        const getAllRelojs2M = (token) => {
            relojService.getAll2M(token).then((data)=>setRelojs(data));
        }
        const getAllProducts2M = (token) => {
            productService.getAllAccesorios2M(token).then((data)=>setProducts(data));
        }

        useEffect(()=>{
            if (status === 'authenticated' && session?.user !== undefined) {
                getAllMovile2M(session?.user.token);
                getAllChargers2M(session?.user.token);
                getAllRelojs2M(session?.user.token);
                getAllProducts2M(session?.user.token);
            }
        },[session?.user]);

        const movilesMemo = useMemo(()=> moviles, [moviles]);
        const relojsMemo = useMemo(()=> relojs, [relojs]);
        const chargerMemo = useMemo(()=> chargers, [chargers]);
        const productsMemo = useMemo(()=> products, [products]);

        return (
            <Cliente
                moviles={movilesMemo}
                movilPath={'/taller/informacion/taller2M/movil/?id='}
                chargers={chargerMemo}
                chargerPath={'/taller/informacion/taller2M/charger/?id='}
                relojes={relojsMemo}
                relojPath={'/taller/informacion/taller2M/reloj/?id='}
                products={productsMemo}
            />
        );

}