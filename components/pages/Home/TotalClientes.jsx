
import PropTypes from 'prop-types';
const TotalClientes = (props) => {

    return(<div className="">
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">Clientes</span>
                <div className="text-900 font-medium text-xl">{props.total}</div>
            </div>
            <div className="flex align-items-center justify-content-center bg-purple-100 border-round"
                 style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-users text-purple-500 text-xl"/>
            </div>
        </div>
    </div>);

}

TotalClientes.propTypes = {
    total: PropTypes.number.isRequired
}

export default TotalClientes;