"use client"

//Componentes
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import {setCookie} from 'cookies-next';
import {signIn, signOut, useSession} from "next-auth/react";

import LoginService from '@services/LoginService';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext"
import {Image} from "primereact/image";
import {Message} from 'primereact/message';
import {classNames} from 'primereact/utils';


export default function Login() {

    const router = useRouter();
    const {data: session, status} = useSession();

    const signInResponseEmpty = {
        username: '',
        password: ''
    }

    const [signInResponse, setSignInResponse] = useState(signInResponseEmpty);
    const [submitted, setSubmitted] = useState(false);
    const [loginFailed, setloginFailed] = useState(false);

    const loginService = new LoginService();


    const handleSubmit = async  () => {
        setSubmitted(true);

        const res = await  signIn("credentials", {
            username: signInResponse.username,
            password: signInResponse.password,
            redirect: false
            // redirect: true,
            // callbackUrl: "/taller",
        });

        if(res.ok){
            setCookie('logged', 'true');
            setSubmitted(false);
            setloginFailed(false);
            router.push('/taller');
        }else{
            setloginFailed(true);
            router.push('/?error=authentication')
        }

    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _signInResponse = {...signInResponse};
        _signInResponse[`${name}`] = val;
        setSignInResponse(_signInResponse);
    };/*Modifica el valor del nombre del signInResponse*/


    return (
        <div className="col-12">
            <div className="flex align-items-center justify-content-center h-screen">
                <div className="surface-card p-4 shadow-2 border-round w-full sm:w-full md:w-8 lg:w-6 xl:w-5">
                    <div className="text-center mb-5">
                        {/*<img src="/assets/images/tallerM2.png" alt="Taller 2M" height={50} className="mb-3"/>*/}
                        <Image
                            src="/assets/images/tallerM2.png" alt="Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                        <div className="font-rm_19-20 text-900 text-4xl font-medium mb-3">Taller 2M</div>
                    </div>

                    {/*<form id="login-form">*/}
                    <div className="field">
                        <label htmlFor="username" className="block text-900 font-medium mb-2">Usuario</label>
                        <InputText id="username"
                                   value={signInResponse.username}
                                   onChange={(e) => onInputChange(e, 'username')}
                                   type="text"
                                   required
                                   placeholder="Escriba su usuario"
                                   className={classNames({'p-invalid': submitted && !signInResponse.username}, "w-full mb-3")}

                        />
                        {submitted && !signInResponse.username && <small className="p-error">Campo requerido.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                        <InputText id="password"
                                   value={signInResponse.password}
                                   onChange={(e) => onInputChange(e, 'password')}
                                   type="password"
                                   placeholder="Escriba su contraseña"
                                   required
                                   className={classNames({'p-invalid': submitted && !signInResponse.password}, "w-full mb-3")}

                        />
                        {submitted && !signInResponse.password && <small className="p-error">Campo requerido.</small>}
                    </div>
                    {loginFailed && <div className="field"><Message severity="error" className="w-full"
                                                                    text="Usuario o contraseña incorrectos"/></div>}
                    <div className="field">
                        <Button label="Iniciar sesión"
                                icon="pi pi-user"
                                className="w-full"
                                onClick={handleSubmit}/>
                    </div>
                    {/*</form>*/}
                </div>
            </div>
        </div>
    )
}
