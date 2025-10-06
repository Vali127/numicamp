import  { useSignInContext } from "../context/SignInContext.jsx";
import {useEffect} from "react";

export const  PersonalFormViewModel = () => {

    const  { personalForm, SetPersonalForm } = useSignInContext()

    const SetName = (e) => { SetPersonalForm({ ...personalForm,name: e.target.value }) }
    const SetFirstname = (e) => { SetPersonalForm({ ...personalForm,first_name: e.target.value }) }
    const SetBirthDate = (e) => { SetPersonalForm({...personalForm,birth_date: e.target.value }) }
    const SetPlace = (e) => { SetPersonalForm({ ...personalForm,place: e.target.value }) }
    const SetSex = (e) => { SetPersonalForm({...personalForm, sex : e.target.value}) }

    useEffect( () => {
        const  nextButton = document.getElementById("nextButton")
        if(nextButton){
            const HandleNextButton = () => {

            }
        }
    })

    return {
        personalForm,
        SetName,
        SetFirstname,
        SetBirthDate,
        SetPlace,
        SetSex
    }
}