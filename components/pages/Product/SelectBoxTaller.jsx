
import React from "react";
import PropTypes from 'prop-types';
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
            <Dropdown value={props.object.taller}
                      onChange={(e) => props.onChangeSelectedBoxTaller(e)}
                      options={tallerNames}
                      optionLabel="name"
                      placeholder="Seleccione el taller"
                      showClear
                      className="w-full"/>
            {props.submitted && !props.object.taller && <small className="p-error">Campo obligatorio. </small>}
        </>
    );

}

SelectBoxTaller.propTypes = {
    object: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    onChangeSelectedBoxTaller: PropTypes.func.isRequired,
}

export default SelectBoxTaller;