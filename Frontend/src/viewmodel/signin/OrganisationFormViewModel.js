import  { useSignInContext } from "../../context/SignInContext.jsx";
import {useState} from "react";
import {organisationFormValidation} from "../../services/FormValidationServices.js";

export const  OrganisationFormViewModel = () => {

    const  { organisationForm, SetOrganisationForm } = useSignInContext()
    const { name } = organisationFormValidation()

    const [ nameError, setNameError ] = useState({type : null, message : null})

    const HandleInputNameChange = (e) => {
        SetOrganisationForm({...organisationForm, name: e.target.value})
        setNameError(name.checkExpression(e.target.value))
        if ( name.checkLength().type != null ) { setNameError(name.checkLength()) }
    }

    return {
        organisationForm,
        nameError,
        SetOrganisationForm,
        HandleInputNameChange
    }
}