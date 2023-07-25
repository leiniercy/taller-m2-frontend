"use client"


const AppSidebar = (props) => {


    return (
        <div className="hidden sm:hidden md:flex col-fixed relative"  style={{width: '240px'}} >
            <div className="p-3 fixed z-1" style={{height: 'calc(100vh - 9rem)', width: '240px',left: '-5px' }}>
                <div
                    className="bg-gray-items p-3 border-round-sm h-full w-full font-bold flex flex-column overflow-y-auto">
                    <a className="block no-underline text-xl pl-3 py-1 pr-2  link-hover" href="#"><i
                        className="pi pi-home"></i> Home</a>
                    <a className="block no-underline text-xl pl-3 py-1 pr-2  link-hover" href="#"><i
                        className="pi pi-amazon"></i> Productos</a>
                    <a className="block no-underline text-xl pl-3 py-1 pr-2  link-hover" href="#"><i
                        className="pi pi-user"></i> Clientes</a>
                </div>
            </div>
        </div>
    );

}

export default AppSidebar;