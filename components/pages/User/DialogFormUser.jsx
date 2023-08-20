
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import React from "react";
import SelectBoxTaller from "@components/pages/User/SelectBoxTaller";
import InputTextUserName from "@components/pages/User/InputTextUserName";
import PasswordUser from "@components/pages/User/PasswordUser";
import InputTextEmail from "@components/pages/User/InputTextEmail";
import SelectBoxRol from "@components/pages/User/SelectBoxRol";


const DialogFormUser = (props) => {

    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        <Button label="Añadir" icon="pi pi-check" onClick={props.save}/>
    </div>);/*Footer del dialog de anadir*/

    return (<Dialog visible={props.visible}
                    style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    modal
                    className="p-fluid"
                    footer={dialogFooter}
                    onHide={props.hideDialog}
    >
        <form id="user-form" onSubmit={props.save}>
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
                <PasswordUser
                    label={'Contraseña'}
                    submitted={props.submitted}
                    password={props.password}
                    passwordValid={props.passwordValid}
                    onChangePassword={props.onChangePassword}
                />
            </div>

            <div className="field">
                <PasswordUser
                    label={'Confimar contraseña'}
                    submitted={props.submitted}
                    password={props.confirmPassword}
                    passwordValid={props.confirmPasswordValid}
                    onChangePassword={props.onChangeConfirmPassword}
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

export default DialogFormUser;