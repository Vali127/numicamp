import  { useSignInContext } from "../../context/register.context.jsx";
import { useState } from "react";
import {personFormValidation} from "../../services/form.services.js";

export const  PersonFormVm = () => {

    const { personForm, setPersonForm } = useSignInContext()

    const { name, firstname, birthDate } = personFormValidation()
    const [ nameError, setNameError ] = useState({type : null, message : null })
    const [ firstnameError, setFirstnameError ] = useState({type : null, message : null})
    const [ dateError, setDateError ] = useState({type : null, message : null})

    const HandleInputNameChange = (e) => {
        setPersonForm({...personForm, name: e.target.value})
        setNameError(name.checkExpression(e.target.value))
        if ( name.checkLength().type != null ) { setNameError(name.checkLength()) }
    }

    const HandleInputFirstnameChange = (e) => {
        setPersonForm({...personForm, firstname : e.target.value})
        setFirstnameError(firstname.checkExpression(e.target.value))
        if ( firstname.checkLength().type != null ) { setFirstnameError(firstname.checkLength()) }
    }

    const HandleInputDateChange = (e) => {
        setPersonForm({...personForm, birth_date : e.target.value})
        setDateError(birthDate.checkValidity(e.target.value))
        if ( birthDate.checkValidity().type != null ) { setDateError(birthDate.checkValidity(e.target.value)) }
    }

    return {
        nameError,
        firstnameError,
        dateError,
        personForm,
        setPersonForm,
        HandleInputNameChange,
        HandleInputFirstnameChange,
        HandleInputDateChange,
    }
}