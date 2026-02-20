import { useState } from "react"
import { useSignInContext } from "../../context/register.context.jsx"
import { personFormValidation } from "../../services/form.services.js"

export const PersonFormVm = () => {
    const { personForm, setPersonForm } = useSignInContext()
    const { name, firstname, birthDate } = personFormValidation()
    const [nameError, setNameError] = useState({ type: null, message: null })
    const [firstnameError, setFirstnameError] = useState({ type: null, message: null })
    const [dateError, setDateError] = useState({ type: null, message: null })

    const HandleInputNameChange = (e) => {
        setPersonForm({ ...personForm, name: e.target.value })
        const lengthError = name.checkLength()
        setNameError(lengthError.type ? lengthError : name.checkExpression(e.target.value))
    }

    const HandleInputFirstnameChange = (e) => {
        setPersonForm({ ...personForm, firstname: e.target.value })
        const lengthError = firstname.checkLength()
        setFirstnameError(lengthError.type ? lengthError : firstname.checkExpression(e.target.value))
    }

    const HandleInputDateChange = (e) => {
        setPersonForm({ ...personForm, birth_date: e.target.value })
        setDateError(birthDate.checkValidity(e.target.value))
    }

    return {
        nameError, firstnameError, dateError,
        personForm, setPersonForm,
        HandleInputNameChange, HandleInputFirstnameChange, HandleInputDateChange,
    }
}