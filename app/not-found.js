

// import NotFoundPage from "@components/pages/Error/NotFoundPage";
import Link from "next/link";

export default function NotFound () {
    return(
        <div className="grid">
            <div className="col-12">
                <div
                    className=" card flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
                    <div style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}>
                        <div
                            className="w-full surface-card pb-8 pt-5 px-5 sm:px-8 flex flex-column align-items-center"
                            style={{borderRadius: '53px'}}>
                            <img src="/assets/images/tallerM2.png" alt="Taller 2M" className="mb-5 w-6rem flex-shrink-0" />
                            <span className="text-blue-500 font-bold text-3xl sm:text-3xl md:text-4xl">404</span>
                            <h1 className="text-900 font-bold text-5xl mb-2">Not Found</h1>
                            <div className="text-600 mb-5">Esta página no está disponible</div>
                            <Link href="/taller"
                                  className="w-full flex align-items-baseline py-5 border-300 border-bottom-1">
                            <span className="flex justify-content-center align-items-center bg-cyan-400 border-round"
                                  style={{height: '3.5rem', width: '3.5rem'}}>
                                <i className="text-50 pi pi-fw pi-home text-2xl"></i>
                            </span>
                                <span className="ml-4 flex flex-column">
                                <span className="text-900 lg:text-xl font-medium mb-1">Regrese a la página de inicio</span>
                            </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

