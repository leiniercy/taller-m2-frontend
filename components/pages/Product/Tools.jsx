import React from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";

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

    return (
        <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
    )


}