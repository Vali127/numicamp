import { useSignInContext } from "../context/SignInContext.jsx";


export  const FormValidationServices = () => {

    const { typeOfUsage, personForm, organisationForm } = useSignInContext()

    const  isAllUsageFormFulFilled = () => {
        return ( typeOfUsage !== '')
    }

    const isAllPersonFormFulFilled = () => {
        return !Object.values(personForm).includes("")
    }

    const  isAllOrganisationFormFulFilled = () => {
        return !Object.values(organisationForm).includes("")
    }


    return {
        isAllUsageFormFulFilled,
        isAllPersonFormFulFilled,
        isAllOrganisationFormFulFilled,
    }

}