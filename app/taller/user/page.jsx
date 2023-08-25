"use client"

import React, {useEffect, useRef, useState} from "react";

import {FilterMatchMode} from "primereact/api";
import {FilterOperator} from "primereact/api";
import {Toast} from "primereact/toast";

import UserService from "@services/UserService";

import ToolsUser from "@components/pages/User/ToolsUser";
import RenderLayout from "@components/layout/RenderLayout";
import CustomFieldset from "@components/layout/CustomFieldSet";
import DialogFormUser from "@components/pages/User/DialogFormUser";
import TableUser from "@components/pages/User/TableUser";
import DeleteUserDialog from "@components/pages/User/DeleteUserDialog";
import DeleteUsersDialog from "@components/pages/User/DeleteUsersDialog";
import DialogEditUser from "@components/pages/User/DialogEditUser";


export default function Usuarios() {

    let emptyUser = {
        username: '',
        email: '',
        taller: '',
        password: '',
        rol: ''
    }

    const emptyFilters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        username: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        email: {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    }

    const globalFilterFields = [
        'username', 'email'
    ];

    const toast = useRef(null);
    const dt = useRef(null);

    const [id, setId] = useState(null);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [taller, setTaller] = useState('');
    const [rol, setRol] = useState('');

    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const [submitted, setSubmitted] = useState(false);
    const [userSaveDialog, setUserSaveDialog] = useState(false);
    const [userEditDialog, setUserEditDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [users, setUsers] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);

    const userService = new UserService();

    useEffect(() => {
        userService.getAll().then((data) => setUsers(data));
    });

    const openNew = () => {
        setSubmitted(false);
        setUser(emptyUser);
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTaller('');
        setRol('');
        setUserSaveDialog(true);
    }; /*Abrir nueva ventana para crear un objeto*/
    const hideSaveDialog = () => {
        setUserSaveDialog(false);
        setSubmitted(false);
    }; /*Ocultar dialog de anadir*/
    const hideEditDialog = () => {
        setUserEditDialog(false);
    } /*Ocultar dialog de editar*/
    const confirmDeleteSelected = () => {
        if (selectedUsers.length > 1) {
            setDeleteUsersDialog(true);
        }
        if (selectedUsers.length === 1) {
            setUser(selectedUsers[0]);
            setDeleteUserDialog(true);
        }
    }; /*Abrir el dialog de confirmacion de eliminacion de los objetos*/
    const validateSaveForm = () => {
        const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar nombres
        if (!nameRegex.test(username) || username === '') {
            setUsernameValid(false);
            return false;
        } else {
            setUsernameValid(true);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos
        if (!emailRegex.test(email) || email === '') {
            setEmailValid(false);
            return false;
        } else {
            setEmailValid(true);
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,.;:$!%*?&])[A-Za-z\d@,.;:$!%*?&]{8,}$/; //Espresion regular para validar contrasenas
        if (!passwordRegex.test(password) || password === '') {
            setPasswordValid(false);
            return false;
        } else {
            setPasswordValid(true);
        }

        const confirmPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,.;:$!%*?&])[A-Za-z\d@,.;:$!%*?&]{8,}$/; //Espresion regular para validar contrasenas
        if (!confirmPasswordRegex.test(confirmPassword) || password !== confirmPassword || confirmPassword === '') {
            setConfirmPasswordValid(false);
            return false;
        } else {
            setConfirmPasswordValid(true);
        }

        //Si no se selecciono algun taller
        if (taller === '') {
            return false;
        }

        //Si se no se selecciono algun rol
        if (rol === '') {
            return false;
        }

        return true;
    };// Metodo para validar la informacion del formulario
    const save = () => {
        setSubmitted(true);

        if (validateSaveForm()) {
            let user = {
                username: username,
                email: email,
                taller: taller.name,
                password: password,
                rol: rol.code
            }
            userService.save(user).then((data) => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se creó el usuario correctamente",
                    life: 2000
                });
                hideSaveDialog();
            }).catch((error) => {
                toast.current.show({ error: error, severity: 'danger',summary: 'Error!',
                    detail: "El usuario ya existe", life: 3000});
            })
        }
    }
    const edit = (user) => {
        setUserEditDialog(true);
        setId(user.id);
        setUserName(user.username);
        setEmail(user.email);
        setTaller(user.taller === 'Taller 2M' ? { name: 'Taller 2M', code: '2M' } : { name: 'Taller MJ', code: 'MJ' });
        setRol(user.roles[0].name === 'ROLE_ADMIN' ? { name: 'Administrador', code: 'ROLE_ADMIN' } : { name: 'Moderador', code: 'ROLE_MODERATOR' });
    }
    const validateEditForm = () => {
        const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/; // Expresión regular para validar nombres
        if (!nameRegex.test(username) || username === '') {
            setUsernameValid(false);
            return false;
        } else {
            setUsernameValid(true);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos
        if (!emailRegex.test(email) || email === '') {
            setEmailValid(false);
            return false;
        } else {
            setEmailValid(true);
        }

        //Si no se selecciono algun taller
        if (taller === '') {
            return false;
        }

        //Si se no se selecciono algun rol
        if (rol === '') {
            return false;
        }

        return true;
    };// Metodo para validar la informacion del formulario
    const editUser = () => {
        setSubmitted(true);
        if (validateEditForm()) {
            let user = {
                username: username,
                email: email,
                taller: taller.name,
                rol: rol.code
            }
            userService.update(user,id).then((data) => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Atención!',
                    detail: "Se actualizó el usuario correctamente",
                    life: 2000
                });
                hideEditDialog();
            }).catch((error) => {
                toast.current.show({ error: error, severity: 'danger',summary: 'Error!',
                    detail: "El usuario no existe", life: 3000});
            });
        }
    }
    const onChangeUserName = (e) => {
        setUserName(e.target.value);
    } //Modifica el estado de nombre del usuario
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    } //Modifica el estado de la contrasena del usuario
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    } //Modifica el estado de la contrasena del usuario
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    } //Modifica el estado del email del usuario
    const onChangeSelectedBoxTaller = (e) => {
        setTaller(e.value);
    } //Modifica el estado de seleccion del selectbox del taller
    const onChangeSelectedBoxRol = (e) => {
        setRol(e.value);
    } //Modifica el estado de seleccion del selectbox del taller
    const onSelectionChangeSelectedObjects = (e) => {
        setSelectedUsers(e.value);
    }
    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }
    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }
    const deleteUser = () => {
        let _users = users.filter((val) => val.id === user.id);

        userService.delete(_users[0].id).then(data => {
            //Actualiza la lista de usuarios
            userService.getAll().then(data => setUsers(data));
            setDeleteUserDialog(false);
            setSelectedUsers(false);
            setUser(emptyUser);
            //Muestra sms de confirmacion
            toast.current.show({
                severity: 'success',
                summary: 'Atención!',
                detail: "Se eliminó el usuario correctamente",
                life: 2000
            });
        }).catch(error => {
            toast.current.show({
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar el producto',
                life: 2000
            });
        });
    }
    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    }
    const deleteSelectedUsers = () => {
        userService.deleteAll(selectedUsers).then((data) => {
            setUsers(data);
            setDeleteUsersDialog(false);
            setSelectedUsers(false);
            toast.current.show({
                severity: 'success',
                summary: '!Atención',
                detail: 'Usuarios eliminados correctamente',
                life: 2000
            });
        }).catch(error => {
            toast.current.show({
                severity: 'danger',
                summary: '!Atención',
                detail: 'Error al eliminar los usuarios seleccionados',
                life: 2000
            });
        });
    };/*Eliminar varios objetos*/


    return (<RenderLayout>
        <CustomFieldset label={'Usuarios'} icon={'pi-user'}>
            <div className="col-12">
                <ToolsUser
                    openNew={openNew}
                    confirmDeleteSelected={confirmDeleteSelected}
                    selectedObjects={selectedUsers}
                />
            </div>
            <div className="col-12">
                <TableUser
                    headerLabel={'usuarios'}
                    dt={dt}
                    objects={users}
                    selectedObjects={selectedUsers}
                    setSelectedObject={onSelectionChangeSelectedObjects}
                    emptyFilters={emptyFilters}
                    globalFilterFields={globalFilterFields}
                    edit={edit}
                    confirmDeleteUser={confirmDeleteUser}
                />
            </div>
        </CustomFieldset>
        <Toast ref={toast}/>

        <DialogFormUser
            visible={userSaveDialog}
            submitted={submitted}
            object={user}
            hideDialog={hideSaveDialog}
            save={save}
            name={username} nameValid={usernameValid}
            password={password} passwordValid={passwordValid}
            confirmPassword={confirmPassword} confirmPasswordValid={confirmPasswordValid}
            email={email} emailValid={emailValid}
            taller={taller}
            rol={rol}
            onChangeName={onChangeUserName}
            onChangePassword={onChangePassword}
            onChangeConfirmPassword={onChangeConfirmPassword}
            onChangeEmail={onChangeEmail}
            onChangeSelectedBoxTaller={onChangeSelectedBoxTaller}
            onChangeSelectedBoxRol={onChangeSelectedBoxRol}
        />

        <DialogEditUser
            visible={userEditDialog}
            submitted={submitted}
            hideDialog={hideEditDialog}
            edit={editUser}
            name={username} nameValid={usernameValid}
            email={email} emailValid={emailValid}
            taller={taller}
            rol={rol}
            onChangeName={onChangeUserName}
            onChangeEmail={onChangeEmail}
            onChangeSelectedBoxTaller={onChangeSelectedBoxTaller}
            onChangeSelectedBoxRol={onChangeSelectedBoxRol}
        />

        <DeleteUserDialog
            visible={deleteUserDialog}
            hideDialog={hideDeleteUserDialog}
            object={user}
            delete={deleteUser}
        />
        <DeleteUsersDialog
            visible={deleteUsersDialog}
            hideDialog={hideDeleteUsersDialog}
            object={user}
            delete={deleteSelectedUsers}
        />

    </RenderLayout>);
}