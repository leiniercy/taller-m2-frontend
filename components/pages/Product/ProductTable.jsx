"use client"

//Styles primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  ProductService  from '@services/ProductService';

export default function Home() {
    const [products, setProducts] = useState([]);

    const productService = new ProductService();

    useEffect(() => {
        productService.getAll().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const imageBodyTemplate = (product) => {
        return <img src={"data:image/jpeg;base64," + product.image} alt="image" className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Name" />
                <Column header="Image" body={imageBodyTemplate} />
                <Column field="price" header="Price"  body={priceBodyTemplate}/>
                <Column field="cant" header="Cantidad" />
            </DataTable>
        </div>
    );
}