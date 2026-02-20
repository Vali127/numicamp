import  { useSignInContext } from "../../context/register.context.jsx";
import {useState} from "react";
import {organisationFormValidation} from "../../services/form.services.js";

export const  OrgFormVm = () => {

    const  { organisationForm, setOrganisationForm } = useSignInContext()
    const { name } = organisationFormValidation()

    const [ nameError, setNameError ] = useState({type : null, message : null})

    const HandleInputNameChange = (e) => {
        setOrganisationForm({...organisationForm, name: e.target.value})
        setNameError(name.checkExpression(e.target.value))
        if ( name.checkLength().type != null ) { setNameError(name.checkLength()) }
    }

    return {
        organisationForm,
        nameError,
        setOrganisationForm,
        HandleInputNameChange
    }
}