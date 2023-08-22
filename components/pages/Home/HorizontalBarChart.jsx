"use client"
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

import SellService from "@services/SellService";

export default function HorizontalBarChart(props) {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        props.service.then((sales) => {

            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            const data = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', "Agosto","Septiembre", "Octubre", "Noviembre","Diciembre"],
                datasets: [
                    {
                        label: 'Cantidad de ventas por mes',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        // data: [sales[0], sales[1], sales[2], sales[3], sales[4], sales[5], sales[6], sales[7], sales[8], sales[9], sales[10], sales[11]]
                        data: sales
                    }
                ]
            };
            const options = {
                indexAxis: 'y',
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            setChartData(data)
            setChartOptions(options);
        });

    }, []);

    return (
        <div className="card bg-gray-items mb-0 p-3 border-round">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
