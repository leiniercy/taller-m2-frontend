
import React from "react";
import {Checkbox} from "primereact/checkbox";

const CheckBoxGroup = (props) => {

    return(<>
        <div className="field col">
            <label htmlFor="red" className="font-bold">
                Redes disponibles
            </label>
            <div className="card flex flex-wrap justify-content-around gap-3 w-full">
                <div className="flex align-items-center">
                    <Checkbox inputId="banda2G" name="banda2G"
                              checked={props.object.banda2G}
                              onChange={(e) => props.onCheckBoxChange(e, 'banda2G')}/>
                    <label htmlFor="banda2G" className="ml-2">2G</label>
                </div>
                <div className="flex align-items-center">
                    <Checkbox inputId="banda3G" name="banda3G"
                              checked={props.object.banda3G}
                              onChange={(e) => props.onCheckBoxChange(e, 'banda3G')}/>
                    <label htmlFor="banda3G" className="ml-2">3G</label>
                </div>
                <div className="flex align-items-center">
                    <Checkbox inputId="banda4G" name="banda4G"
                              checked={props.object.banda4G}
                              onChange={(e) => props.onCheckBoxChange(e, 'banda4G')}/>
                    <label htmlFor="banda4G" className="ml-2">4G</label>
                </div>
                <div className="flex align-items-center">
                    <Checkbox inputId="banda5G" name="banda5G"
                              checked={props.object.banda5G}
                              onChange={(e) => props.onCheckBoxChange(e, 'banda5G')}/>
                    <label htmlFor="banda2G" className="ml-2">5G</label>
                </div>
            </div>
        </div>
    </>);

}

export default CheckBoxGroup;