

import React from "react";
import {useRouter} from "next/navigation";
import {Button} from "primereact/button";


const AccessDenied = (props) => {

    const router = useRouter();

    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <img src="/assets/images/tallerM2-logo.png" alt="Sakai logo" className="mb-5 w-10rem flex-shrink-0 h-10rem" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                        <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                            <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                        </div>
                        <h1 className="text-900 font-bold text-2xl sm:text-2xl sm:text-3xl lg:text-5xl mb-2">Acceso Denegado</h1>
                        <div className="text-600 mb-5 text-base lg:text-xl text-center sm:text-center">{props.error.message || 'Algo va mal'}</div>
                        <img src="/assets/images/error-403.png" alt="Error" className="mb-5 h-16rem w-full" width="80%" />
                        <Button icon="pi pi-arrow-left" label="Regresar a inicio" text
                                onClick={() => router.push('/')}/>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AccessDenied;