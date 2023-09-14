

import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import React from "react";
import SelectBoxTaller from "@components/pages/User/SelectBoxTaller";
import InputTextUserName from "@components/pages/User/InputTextUserName";
import InputTextEmail from "@components/pages/User/InputTextEmail";
import SelectBoxRol from "@components/pages/User/SelectBoxRol";
import PropTypes from "prop-types";


const DialogEditUser = (props) => {


    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        <Button label="Actualizar" icon="pi pi-check" onClick={props.edit}/>
    </div>);/*Footer del dialog de anadir*/

    return (<Dialog visible={props.visible}
                    style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    modal
                    className="p-fluid"
                    footer={dialogFooter}
                    onHide={props.hideDialog}
    >
        <form id="user-form" onSubmit={props.edit}>
            <div className="field">
                <InputTextUserName
                    submitted={props.submitted}
                    name={props.name}
                    nameValid={props.nameValid}
                    onChangeName={props.onChangeName}
                />
            </div>
            <div className="field">
                <InputTextEmail
                    submitted={props.submitted}
                    email={props.email}
                    emailValid={props.emailValid}
                    onChangeEmail={props.onChangeEmail}
                />
            </div>

            <div className="field">
                <SelectBoxTaller
                    submitted={props.submitted}
                    taller={props.taller}
                    onChangeSelectedBoxTaller={props.onChangeSelectedBoxTaller}
                />
            </div>
            <div className="field">
                <SelectBoxRol
                    submitted={props.submitted}
                    rol={props.rol}
                    onChangeSelectBoxRol={props.onChangeSelectedBoxRol}
                />
            </div>
        </form>
    </Dialog>);

}
DialogEditUser.propTypes = {
    hideDialog: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangeSelectedBoxTaller: PropTypes.func.isRequired,
    onChangeSelectedBoxRol: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    submitted: PropTypes.bool.isRequired,
    nameValid: PropTypes.bool.isRequired,
    emailValid: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    taller: PropTypes.object.isRequired,
    rol: PropTypes.object.isRequired,
}
export default DialogEditUser;