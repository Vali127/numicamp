import { useState } from "react"
import { useSignInContext } from "../../context/register.context.jsx"
import { organisationFormValidation } from "../../services/form.services.js"

export const OrgFormVm = () => {
    const { organisationForm, setOrganisationForm } = useSignInContext()
    const { name } = organisationFormValidation()
    const [nameError, setNameError] = useState({ type: null, message: null })

    const HandleInputNameChange = (e) => {
        setOrganisationForm({ ...organisationForm, name: e.target.value })
        const lengthError = name.checkLength()
        setNameError(lengthError.type ? lengthError : name.checkExpression(e.target.value))
    }

    return { organisationForm, setOrganisationForm, nameError, HandleInputNameChange }
}