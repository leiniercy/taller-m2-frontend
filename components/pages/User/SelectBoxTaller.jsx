
import React from "react";
import PropTypes from "prop-types";
import {Dropdown} from "primereact/dropdown";

const tallerNames = [
    { name: 'Taller 2M', code: '2M' },
    { name: 'Taller MJ', code: 'MJ' },
];
const SelectBoxTaller = (props) => {

    return(<>
        <label htmlFor="taller" className="font-bold">
            Taller
        </label>
        <Dropdown value={props.taller}
                  onChange={(e) => props.onChangeSelectedBoxTaller(e)}
                  options={tallerNames}
                  optionLabel="name"
                  placeholder="Seleccione el taller"
                  showClear
                  className="w-full" />
            {props.submitted && !props.c && <small className="p-error">Campo obligatorio. </small>}
        </>
    );

}
SelectBoxTaller.propTypes = {
    taller: PropTypes.object.isRequired,
    onChangeSelectedBoxTaller: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
}
export default SelectBoxTaller;