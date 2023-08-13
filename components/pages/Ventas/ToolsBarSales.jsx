import React from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";

import ReportCalendar from "@components/pages/Ventas/ReportCalendar";
import SellService from "@services/SellService";


export default function ToolsBarSales(props) {

    const sellService = new SellService();

    const leftToolbarTemplate = () => {
        return (
            <div className="flex sm:flex flex-wrap sm:flex-wrap gap-2 sm:gap-2">
                <Button label="" icon="pi pi-user" severity="secondary"
                        onClick={props.openNewDialogCustomer}
                />
                <Button label="Añadir" icon="pi pi-plus" severity="success"
                        onClick={props.openNewDialogSale}
                />
                <Button label="Eliminar" icon="pi pi-trash" severity="danger"
                        onClick={props.confirmDeleteSelected}
                        disabled={!props.selectedObjects || !props.selectedObjects.length}
                />
            </div>
        );
    };/*Barra de herramientas*/

    const handleClick = () => {
        sellService.getByDate(props.selectedReportDate.toISOString().slice(0, 10)).then((data) => {
            if (data === null || data.length === 0) {
                props.toast.current.show({
                    severity: 'info',
                    summary: 'Atención!',
                    detail: "No hay ninguna venta disponible",
                    life: 2000
                });
            } else {
                sellService.getPDF(data).then(d => {
                    // Descargar el archivo PDF generado
                    const url = window.URL.createObjectURL(new Blob([d]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'reporte.pdf');
                    document.body.appendChild(link);
                    link.click();
                });
            }
        }).catch(error => {
            props.toast.current.show({
                severity: 'danger',
                summary: 'Atención!',
                detail: "Error al exportar el reporte",
                life: 2000
            });
        });

    }

    const rightToolbarTemplate = () => {
        return <div className="card flex justify-content-end">
            <ReportCalendar
                date={props.selectedReportDate}
                onChangeCalendar={props.onChangeReportCalendar}
            />
            <Button icon="pi pi-download"
                    className="p-button p-button-raised no-underline ml-2"
                    onClick={handleClick}
                    disabled={!props.selectedReportDate}
            />
        </div>
    }; /*Barra de herramientas*/


    return (
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    )


}