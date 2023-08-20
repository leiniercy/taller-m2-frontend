"use client"

import {Fieldset} from 'primereact/fieldset';


const CustomFieldset = ({children, label, icon}) => {

    const legendTemplate = (<div className="flex align-items-center ">
        <span className={"mr-2 pi"+icon}></span>
        <span className="font-bold text-lg">{label}</span>
    </div>);

    return(<Fieldset legend={legendTemplate} className="col-12">
        {children}
    </Fieldset>);
}

export default CustomFieldset;