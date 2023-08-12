import {Dropdown} from 'primereact/dropdown';

export default function SelectBoxCustomer(props) {
    const selectedCustomerTemplate = (option, props) => {
        if (option) {
            return (<div className="flex align-items-center">
                {/*<img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />*/}
                <div>{option.customerName}</div>
            </div>);
        }

        return <span>{props.placeholder}</span>;
    };

    const customerOptionTemplate = (option) => {
        return (<div className="flex align-items-center">
            {/*<img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />*/}
            <div>{option.customerName}</div>
        </div>);
    };

    return (
        <Dropdown
            value={props.selectedCustomer}
            onChange={(e) => props.onChangeSelectedBoxCustomer(e)}
            options={props.customers}
            optionLabel="name"
            placeholder="Seleccione un cliente"
            filter
            valueTemplate={selectedCustomerTemplate}
            itemTemplate={customerOptionTemplate}
            showClear
            className="w-full"/>
    );
}