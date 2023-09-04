
const TotalVentas = (props) => {

    return(<div className="card ">
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Ventas</span>
                <div className="text-900 font-medium text-xl">${props.total}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-blue-100 border-round"
                 style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-shopping-cart text-blue-500 text-xl"/>
            </div>
        </div>
    </div>)

}

export default TotalVentas;