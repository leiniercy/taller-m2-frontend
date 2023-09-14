
import React from "react";
import {Dropdown} from "primereact/dropdown";
import PropTypes from "prop-types";

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

SelectBoxRol.propTypes = {
    rol: PropTypes.object.isRequired,
    onChangeSelectBoxRol: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
}

export default SelectBoxRol;


