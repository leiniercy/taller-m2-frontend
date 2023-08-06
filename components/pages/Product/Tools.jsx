import React from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";

import ExportInfo from "@components/pages/Product/ExportInfo";


export default function Tools(props) {

    const leftToolbarTemplate = () => {
        return (
            <div className="flex sm:flex flex-wrap sm:flex-wrap gap-2 sm:gap-2">
                <Button label="Añadir" icon="pi pi-plus" severity="success"
                        onClick={props.openNew}
                />
                <Button label="Eliminar" icon="pi pi-trash" severity="danger"
                        onClick={props.confirmDeleteSelected}
                        disabled={!props.selectedObjects || !props.selectedObjects.length}
                />
            </div>
        );
    };/*Barra de herramientas*/


    const rightToolbarTemplate = () => {
        return <ExportInfo
            objects={props.objects}
            columns={props.columns}
            dt={props.dt}
            fileName={props.fileName}/>
    }; /*Barra de herramientas*/


    return (
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    )


}