"use client"

import {Fieldset} from 'primereact/fieldset';


const ProductFieldset = ({children, label}) => {

    const legendTemplate = (<div className="flex align-items-center ">
        <span className="pi pi-user mr-2"></span>
        <span className="font-bold text-lg">{label}</span>
    </div>);

    return(<Fieldset legend={legendTemplate} className="col-12">
        {children}
    </Fieldset>);
}

export default ProductFieldset;
