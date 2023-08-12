
import { Dropdown } from 'primereact/dropdown';

export default function SelectBoxTaller(props) {


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
