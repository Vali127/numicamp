import  { useSignInContext } from "../context/SignInContext.jsx";

export const  PersonalFormViewModel = () => {

    const  { personForm, SetPersonForm } = useSignInContext()

    const SetName = (e) => { SetPersonForm({ ...personForm,name: e.target.value }) }
    const SetFirstname = (e) => { SetPersonForm({ ...personForm,first_name: e.target.value }) }
    const SetBirthDate = (e) => { SetPersonForm({...personForm,birth_date: e.target.value }) }
    const SetPlace = (e) => { SetPersonForm({ ...personForm,place: e.target.value }) }
    const SetSex = (e) => { SetPersonForm({...personForm, sex : e.target.value}) }

    return {
        personForm,
        SetName,
        SetFirstname,
        SetBirthDate,
        SetPlace,
        SetSex
    }
}