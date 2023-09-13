
import PropTypes from "prop-types";
import {Dialog} from "primereact/dialog";
import PasswordUser from "@components/pages/User/PasswordUser";
import {useState, useRef, useEffect} from "react";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import UserService from "@services/UserService";
import bcrypt from 'bcryptjs';


const DialogChangePassword = (props) => {

    const emptyUser = {
        id: null,
        username: '',
        email: '',
        taller: '',
        password: '',
        roles: null
    }

    const toast = useRef(null);
    const [user, setUser] = useState(emptyUser);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [passwordValid, setPasswordValid] = useState(true);
    const [newPasswordValid, setNewPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true)
    const userService = new UserService();

    useEffect(() => {
        if(props.user !== undefined){
            userService.getByUsername(props.user.name , props.user.token).then((data) => {
                setUser(data);
            }).catch((error) => {
                console.log(error);
            });
        }
    },[props.user]);

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }//Modifica el estado de la actual contrasena
    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    } //Modifica el estado de la nueva contrasena
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }//Modifica el estado del confirmar nueva contrasena
    const validateForm = () => {
        // Comparar las contraseñas usando la función compareSync de bcrypt
        const isMatch = bcrypt.compareSync(password, user.password);
        if (isMatch) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
            return false;
        }


        const newPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,.;:$!%*?&])[A-Za-z\d@,.;:$!%*?&]{8,}$/; //Espresion regular para validar contrasenas
        if (!newPasswordRegex.test(newPassword) || newPassword === password || newPassword === '') {
            setNewPasswordValid(false);
            return false;
        } else {
            setNewPasswordValid(true);
        }

        const confirmPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,.;:$!%*?&])[A-Za-z\d@,.;:$!%*?&]{8,}$/; //Espresion regular para validar contrasenas
        if (!confirmPasswordRegex.test(confirmPassword) || newPassword !== confirmPassword || confirmPassword === '') {
            setConfirmPasswordValid(false);
            return false;
        } else {
            setConfirmPasswordValid(true);
        }

        return true;
    }
    const save = () => {
        setSubmitted(true);
        if (validateForm() === true) {
            userService.changePasword(user.id, newPassword).then((data) => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se cambio la contraseña correctamente",
                    life: 2000
                });
                setPassword('');
                setNewPassword('');
                setConfirmPassword('');
                props.hideDialog();
                setUser(data);
            }).catch((error) => {
                toast.current.show({
                    error: error, severity: 'danger', summary: 'Error!',
                    detail: "Al cambiar la contraseña", life: 3000
                });
            });
        }

    }

    const dialogFooter = (<div className="flex flex-row justify-content-between w-full p-3">
        <Button label="Cancelar" icon="pi pi-times" outlined onClick={props.hideDialog}/>
        <Button label="Actualizar" icon="pi pi-check" onClick={save}
        />
    </div>);/*Footer del dialog de anadir*/


    return (<>
        <Dialog
            visible={props.visible}
            style={{width: '32rem'}}
            breakpoints={{'960px': '75vw', '641px': '90vw'}}
            modal
            className="p-fluid"
            footer={dialogFooter}
            onHide={props.hideDialog}
        >
            <form id="user-form" onSubmit={save}>
                <div className="field">
                    <PasswordUser
                        label={'Contraseña'}
                        submitted={submitted}
                        password={password}
                        passwordValid={passwordValid}
                        onChangePassword={onChangePassword}
                    />
                </div>
                <div className="field">
                    <PasswordUser
                        label={'Nueva contraseña'}
                        submitted={submitted}
                        password={newPassword}
                        passwordValid={newPasswordValid}
                        onChangePassword={onChangeNewPassword}
                    />
                </div>
                <div className="field">
                    <PasswordUser
                        label={'Confimar contraseña'}
                        submitted={submitted}
                        password={confirmPassword}
                        passwordValid={confirmPasswordValid}
                        onChangePassword={onChangeConfirmPassword}
                    />
                </div>
            </form>
        </Dialog>
        <Toast ref={toast}/>
    </>)


}
DialogChangePassword.propTypes = {
    user: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    hideDialog: PropTypes.func.isRequired,
}
export default DialogChangePassword;