"use client"

import React, {useState, useEffect, useMemo} from 'react';
import {Chart} from 'primereact/chart';

export default function DoughnutChart(props) {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(()=>{
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Accesorios', 'Cargadores', 'Moviles', 'Relojes'],
            datasets: [
                {
                    data: [props.products, props.chargers, props.moviles, props.relojes],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--cyan-500'),
                        documentStyle.getPropertyValue('--purple-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--cyan-400'),
                        documentStyle.getPropertyValue('--purple-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };
        setChartData(data);
        setChartOptions(options);
    },[props.products, props.moviles,props.relojes,props.chargers]);

    return (
        <div className="card relative h-full w-full flex justify-content-center">
            <Chart type="doughnut"
                   data={chartData}
                   options={chartOptions}
                   className="relative h-full w-full flex justify-content-center flex-grow-1"/>
        </div>
    )
}
