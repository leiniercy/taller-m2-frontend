


import React from "react";
import {Dropdown} from "primereact/dropdown";

const tallerNames = [
    { name: 'Administrador', code: 'ROLE_ADMIN' },
    { name: 'Moderador', code: 'ROLE_MODERATOR' },
    { name: 'Usuario', code: 'ROLE_USER' },
];
const SelectBoxRol = (props) => {

    return(<>
            <label htmlFor="rol" className="font-bold">
                Rol
            </label>
            <Dropdown value={props.rol}
                      onChange={(e) => props.onChangeSelectBoxRol(e)}
                      options={tallerNames}
                      optionLabel="name"
                      placeholder="Seleccione el rol"
                      showClear
                      className="w-full" />
            {props.submitted && !props.rol && <small className="p-error">Campo obligatorio. </small>}
        </>
    );

}

export default SelectBoxRol;


