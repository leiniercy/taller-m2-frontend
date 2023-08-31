"use client"

//Componentes
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import {setCookie} from 'cookies-next';
import {signIn, getSession} from "next-auth/react";

import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext"
import {Message} from 'primereact/message';
import {classNames} from 'primereact/utils';
import AppLogin from "@components/layout/AppLogin";


export default function Login() {

    const router = useRouter();

    const signInResponseEmpty = {
        username: '',
        password: ''
    }

    const [signInResponse, setSignInResponse] = useState(signInResponseEmpty);
    const [submitted, setSubmitted] = useState(false);
    const [loginFailed, setloginFailed] = useState(false);

    const handleSubmit = async () => {
        setSubmitted(true);

        const res = await signIn("credentials", {
            username: signInResponse.username,
            password: signInResponse.password,
            redirect: false
        })
        if (res.ok) {
            let session = await getSession();
            setCookie('logged', 'true');
            setSubmitted(false);
            setloginFailed(false);
            if (session.user !== undefined) {
                setCookie('rol', session.user.rol);
                setCookie('taller', session.user.taller);
                if(session.user.rol === 'ROLE_ADMIN'){
                    router.push('/taller');
                }else if (session.user.rol === 'ROLE_MODERATOR' && session.user.taller === 'Taller 2M') {
                    router.push('/taller/informacion/taller2M');
                } else if (session.user.rol === 'ROLE_MODERATOR' && session.user.taller === 'Taller 2M') {
                    router.push('/taller/informacion/tallerMJ');
                }
            }
        } else {
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
        <AppLogin>
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
            <div className='field flex justify-content-end'>
                <a  href='/forgot-password' className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                    ¿Olvidaste tu contraseña?
                </a>
            </div>
            {loginFailed && <div className="field"><Message severity="error" className="w-full"
                                                            text="Usuario o contraseña incorrectos"/></div>}
            <div className="field">
                <Button label="Iniciar sesión"
                        icon="pi pi-user"
                        className="w-full"
                        onClick={handleSubmit}/>
            </div>
        </AppLogin>
    )
}
