"use client"
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Chart} from 'primereact/chart';

 const BasicChart = (props) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
            const data = {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
                datasets: [
                    {
                        label: 'Ganacia diaria por ventas',
                        data: props.sales,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)', //Lunes
                            'rgba(75, 192, 192, 0.2)', //Martes
                            'rgba(54, 162, 235, 0.2)', //Miercoles
                            'rgba(153, 102, 255, 0.2)', //Jueves
                            'rgba(102,255,158,0.2)' //Viernes
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)', //Lunes
                            'rgb(75, 192, 192)', //Martes
                            'rgb(54, 162, 235)',//Miercoles
                            'rgb(153, 102, 255)', //Jueves
                            'rgb(102,255,158)' //Viernes
                        ],
                        borderWidth: 1
                    }
                ],
            };
            const options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
            setChartData(data);
            setChartOptions(options);
    }, [props.sales]);

    return (
        <div className="card relative h-full w-full flex">
            <Chart className="h-full w-full flex flex-grow-1" type="bar" data={chartData} options={chartOptions}/>
        </div>
    )
}

BasicChart.propTypes = {
    sales: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default BasicChart;