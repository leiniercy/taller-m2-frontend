
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function StackedBarChart(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        props.service.then((sellRequest) => {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            const data = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', "Agosto","Septiembre", "Octubre", "Noviembre","Diciembre"],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Accesorios',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        data: sellRequest.accesorios
                    },
                    {
                        type: 'bar',
                        label: 'Cargadores',
                        backgroundColor: documentStyle.getPropertyValue('--green-500'),
                        data: sellRequest.chargers
                    },
                    {
                        type: 'bar',
                        label: 'Moviles',
                        backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                        data: sellRequest.moviles
                    },
                    {
                        type: 'bar',
                        label: 'Moviles',
                        backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                        data: sellRequest.relojes
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
        })
    }, []);

    return (
        <div className="card bg-gray-items mb-0 p-3 border-round">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
