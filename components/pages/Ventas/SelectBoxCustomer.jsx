
import PropTypes from "prop-types";
import {Dropdown} from 'primereact/dropdown';

const SelectBoxCustomer = (props) => {
    const selectedCustomerTemplate = (option, props) => {
        if (option) {
            return (<div className="flex align-items-center">
                <div>{option.customerName}</div>
            </div>);
        }

        return <span>{props.placeholder}</span>;
    };

    const customerOptionTemplate = (option) => {
        return (<div className="flex align-items-center">
            <div>{option.customerName}</div>
        </div>);
    };

    return (
        <Dropdown
            value={props.selectedCustomer}
            onChange={(e) => props.onChangeSelectedBoxCustomer(e)}
            options={props.customers}
            optionLabel="customerName"
            placeholder="Seleccione un cliente"
            filter
            valueTemplate={selectedCustomerTemplate}
            itemTemplate={customerOptionTemplate}
            showClear
            className="w-full"/>
    );
}
SelectBoxCustomer.propTypes = {
    selectedCustomer: PropTypes.object.isRequired,
    onChangeSelectedBoxCustomer: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
}
export default SelectBoxCustomer;