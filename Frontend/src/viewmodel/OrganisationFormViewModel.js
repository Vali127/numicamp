import  { useSignInContext } from "../context/SignInContext.jsx";

export const  OrganisationFormViewModel = () => {

    const  { organisationForm , SetOrganisationForm   } = useSignInContext()

    const SetName = (e) => { SetOrganisationForm({ ...organisationForm, name : e.target.value }) }
    const SetCreationDate = (e) => { SetOrganisationForm({...organisationForm,creation_date: e.target.value }) }
    const SetPlace = (e) => { SetOrganisationForm({ ...organisationForm,place: e.target.value }) }

    return {
        organisationForm,
        SetName,
        SetPlace,
        SetCreationDate
    }
}