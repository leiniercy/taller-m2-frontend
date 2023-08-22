"use client"

import React, {useState, useEffect} from 'react';
import {Chart} from 'primereact/chart';

export default function DoughnutChart(props) {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
        props.productService.then(accesorios => {
            props.chargerService.then(chargers => {
                props.movileService.then(moviles => {
                    props.relojService.then(relojes => {
                        const documentStyle = getComputedStyle(document.documentElement);
                        const data = {
                            labels: ['Accesorios', 'Cargadores', 'Moviles', 'Relojes'],
                            datasets: [
                                {
                                    data: [accesorios, chargers, moviles, relojes],
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
                    });
                });
            });
        });

    }, []);

    return (
        <div className="card flex justify-content-center bg-gray-items mb-0 p-3 border-round">
            <Chart type="doughnut"
                   data={chartData}
                   options={chartOptions}
                   className="w-full md:w-30rem"/>
        </div>
    )
}
