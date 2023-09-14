import React from "react";
import {Password} from 'primereact/password';
import {Divider} from 'primereact/divider';
import PropTypes from "prop-types";


const PasswordUser = (props) => {

    const header = <div className="font-bold mb-3">Contraseña</div>;
    const footer = (
        <>
            <Divider/>
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Al menos una letra minúscula</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
                <li>Al menos un simbolo @,.;:$!%*¿?&</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </>
    );

    return (
        <>
            <label htmlFor="password" className="font-bold">
                {props.label}
            </label>
            <Password className={(props.submitted && !props.passwordValid) && 'p-invalid'}
                value={props.password}
                onChange={(e) => props.onChangePassword(e)}
                toggleMask
                footer={footer}
                promptLabel="Escriba una contraseña"
                weakLabel="Simple"
                mediumLabel="Media"
                strongLabel="Fuerte"
            />
            {props.submitted && !props.password && <small className="p-error">Campo obligatorio. </small>}
            {props.submitted && !props.passwordValid && <small className="p-error">Contraseña incorrecta.</small>}
        </>
    )
}

PasswordUser.propTypes = {
    password: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    passwordValid: PropTypes.bool.isRequired,
    onChangePassword: PropTypes.func.isRequired,
}

export default PasswordUser;