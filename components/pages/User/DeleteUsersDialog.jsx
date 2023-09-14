"use client"
import PropTypes from "prop-types";
import React from 'react';
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";


const DeleteUsersDialog = (props) => {

    const footer = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
            <Button label="Aceptar" icon="pi pi-check" severity="danger" onClick={props.delete}/>
        </React.Fragment>
    ); /*Footer del dialog de eliminacion de varios Accesorios*/


    return (<Dialog visible={props.visible} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={footer} onHide={props.hideDialog}>
        <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
            {props.object && <span>"¿Esta seguro que desea eliminar los usuarios seleccionados?</span>}
        </div>
    </Dialog>);
}

DeleteUsersDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    object: PropTypes.object.isRequired,
    hideDialog: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
}
export default DeleteUsersDialog;
