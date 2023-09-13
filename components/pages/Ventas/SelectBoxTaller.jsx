
import PropTypes from "prop-types";
import { Dropdown } from 'primereact/dropdown';

const SelectBoxTaller = (props) => {


    const tallerNames = [
        { name: 'Taller 2M', code: '2M' },
        { name: 'Taller MJ', code: 'MJ' },
    ];

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={props.selectedTaller}
                      onChange={(e) => props.onChangeSelectedBoxTaller(e)}
                      options={tallerNames}
                      optionLabel="name"
                      placeholder="Seleccione el taller"
                      showClear
                      className="w-full" />
        </div>
    )
}

SelectBoxTaller.propTypes = {
    selectedTaller: PropTypes.object.isRequired,
    onChangeSelectedBoxTaller: PropTypes.func.isRequired,
}

export default SelectBoxTaller;
