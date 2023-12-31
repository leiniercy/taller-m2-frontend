import React from "react";
import PropTypes from "prop-types";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";



const InputTextEmail = (props) => {

    return (<>
        <label htmlFor="email" className="font-bold">
            Correo
        </label>
        <InputText id="email"
                   type="email"
                   value={props.email}
                   onChange={(e) => props.onChangeEmail(e)}
                   required autoFocus
                   className={classNames({'p-invalid': props.submitted && !props.email})}/>
        {props.submitted && !props.email && <small className="p-error">Campo obligatorio. </small>}
        {props.submitted && !props.emailValid && <small className="p-error">El correo es incorrecto.</small>}
    </>)

}

InputTextEmail.propTypes = {
    email: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    emailValid: PropTypes.bool.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
}


export default InputTextEmail;