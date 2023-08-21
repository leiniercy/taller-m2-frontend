"use client"

import AppLogin from "@components/layout/AppLogin";
import {InputText} from "primereact/inputtext";
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";
import {useRouter} from "next/navigation";
import {useState, useRef} from "react";
import LoginService from "@services/LoginService";
import UserService from "@services/UserService";


export default function (){

    const loginService = new LoginService();
    const userService = new UserService();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const toast = useRef(null);
    const handleClick = () => {
        loginService.findUser(email).then((user) => {
            setEmailValid(true);
            loginService.sendEmail(email).then((password) =>{
                userService.changePasword(user.id, password).then((data) => {
                    toast.current.show({ severity: 'success', summary: '!Atención', detail: 'Se cambio su contraseña', life: 2000});
                    router.push('/');
                    setEmail('');
                }).catch((error) => {
                    toast.current.show({error: error, severity: 'danger', summary: '!Atención', detail: 'Error al modificar la contraseña',life: 2000});
                })
            }).catch((error) => {
                toast.current.show({error: error, severity: 'danger', summary: '!Atención', detail: 'Error al enviar el correo',life: 2000});
            });
        }).catch((error) => {
            setEmailValid(false);
        });
    }

    const handleInputText = (e) => {
        (e.target.value === '') ? setDisabled(true) : setDisabled(false);
        setEmail(e.target.value);
    }

    return(
        <AppLogin>
            <div className="field flex flex-row align-items-center">
                <InputText id="email"
                           value={email}
                           onChange={(e) => handleInputText(e)}
                           type="text"
                           required
                           placeholder="Escriba su correo"
                           className="w-full mb-3"
                           //className={classNames({'p-invalid': submitted && !signInResponse.username}, "w-full mb-3")}

                />
                <Button disabled={disabled} onClick={handleClick} className='ml-2 mb-3 p-3' label="" icon="pi pi-envelope" severity="secondary" > </Button>
            </div>
            {!emailValid &&  <Message className='w-full' severity="error" text="El correo no es correcto" />}
            <Toast ref={toast} />
        </AppLogin>
    );


}