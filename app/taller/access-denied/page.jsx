"use client"

import {useRouter} from 'next/navigation';
import React from 'react';
import {Button} from 'primereact/button';

const AccessDeniedPage = () => {

    const router = useRouter();

    return (
        <div className="col-12">
            <div className="flex align-items-center justify-content-center  overflow-hidden">
                <div className="flex flex-column align-items-center justify-content-center">
                    <div style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)'
                    }}>
                        <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                             style={{borderRadius: '53px'}}>
                            <div className="flex justify-content-center align-items-center bg-pink-500 border-circle"
                                 style={{height: '3.2rem', width: '3.2rem'}}>
                                <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                            </div>
                            <h1 className="text-900 font-bold text-2xl sm:text-2xl sm:text-3xl lg:text-5xl mb-2">Acceso Denegado</h1>
                            <div className="text-600 mb-5 text-base lg:text-xl text-center sm:text-center">Usted no tiene los permisos necesarios.</div>
                            <img src="/assets/images/error-403.png" alt="Error" className="mb-5 border-round" width="80%"/>
                            <Button icon="pi pi-arrow-left" label="Regresar a inicio" text
                                    onClick={() => router.push('/')}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessDeniedPage;