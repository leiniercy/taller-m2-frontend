

import {Image} from "primereact/image";


const AppLogin = ({children}) => {

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
                    {children}
                </div>
            </div>
        </div>
    );


}

export default AppLogin;