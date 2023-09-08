"use client"

import {Component, useEffect, useMemo, useState} from "react";
import Cliente from "@components/pages/Client/Cliente";
import MovileService from "@services/MovileServie";
import ChargerService from "@services/ChargerService";
import RelojService from "@services/RelojService";
import ProductService from "@services/ProductService";
import {useSession} from "next-auth/react";


export default function TallerMJProducts(){

    const {data: session, status} = useSession();


    const movileService = new MovileService();
    const chargerService = new ChargerService();
    const relojService = new RelojService();
    const productService = new ProductService();

    const [moviles, setMoviles] = useState([]);
    const [relojs, setRelojs] = useState([]);
    const [chargers, setChargers] = useState([]);
    const [products, setProducts] = useState([]);

    const getAllMovileMJ = (token,taller) => {
        movileService.getAll(token,taller).then((data)=>setMoviles(data));
    }
    const getAllChargersMJ = (token,taller) => {
        chargerService.getAll(token,taller).then((data)=>setChargers(data));
    }
    const getAllRelojsMJ = (token,taller) => {
        relojService.getAll(token,taller).then((data)=>setRelojs(data));
    }
    const getAllProductsMJ = (token,taller) => {
        productService.getAllProducts(token,taller).then((data)=>setProducts(data));
    }

    useEffect(()=>{
        if (status === 'authenticated' && session?.user !== undefined) {
            getAllMovileMJ(session?.user.token, session?.user.taller);
            getAllChargersMJ(session?.user.token, session?.user.taller);
            getAllRelojsMJ(session?.user.token, session?.user.taller);
            getAllProductsMJ(session?.user.token, session?.user.taller);
        }
    },[session?.user]);

    const movilesMemo = useMemo(()=> moviles, [moviles]);
    const relojsMemo = useMemo(()=> relojs, [relojs]);
    const chargerMemo = useMemo(()=> chargers, [chargers]);
    const productsMemo = useMemo(()=> products, [products]);

    return (
        <Cliente
            moviles={movilesMemo}
            movilPath={'/taller/informacion/tallerMJ/movil/?id='}
            chargers={chargerMemo}
            chargerPath={'/taller/informacion/tallerMJ/charger/?id='}
            relojes={relojsMemo}
            relojPath={'/taller/informacion/tallerMJ/reloj/?id='}
            products={productsMemo}
        />
    );

}