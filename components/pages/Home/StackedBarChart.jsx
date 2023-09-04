"use client"
import React, {useState, useEffect} from 'react';
import {Chart} from 'primereact/chart';

export default function StackedBarChart(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: [
                {
                    type: 'bar',
                    label: 'Accesorios',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: props.products.accesorios
                },
                {
                    type: 'bar',
                    label: 'Cargadores',
                    backgroundColor: documentStyle.getPropertyValue('--teal-500'),
                    data: props.products.chargers
                },
                {
                    type: 'bar',
                    label: 'Moviles',
                    backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                    data: props.products.moviles
                },
                {
                    type: 'bar',
                    label: 'Moviles',
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    data: props.products.relojes
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);

    }, [props.products]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions}/>
        </div>
    )
}
