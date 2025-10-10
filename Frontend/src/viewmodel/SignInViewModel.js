import {useSignInContext} from "../context/SignInContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {FormValidationServices} from "../services/FormValidationServices.jsx";


export const SignInViewModel = () => {

    const navigate = useNavigate()
    const  { typeOfUsage } = useSignInContext()
    const { isAllUsageFormFulFilled, isAllPersonFormFulFilled, isAllOrganisationFormFulFilled } = FormValidationServices()

    const [ currentForm, setCurrentForm ] = useState('')
    
    // Détecter automatiquement le formulaire actuel depuis l'URL pour éviter les probleme de timing
    useEffect(() => {
        if (currentForm === '') {
            const path = window.location.pathname
            if (path.includes('personalForm')) { setCurrentForm('personalForm') }
            else if (path.includes('signIn')) { setCurrentForm('usageForm') }
        }
    }, [currentForm])



    const ManageButtonNext = () => {
        switch (currentForm) {

            case 'usageForm': {
                if ( isAllUsageFormFulFilled() ) {
                    if ( typeOfUsage === 'personal' && typeOfUsage !== '' ) { navigate('/signIn/personForm') }
                    else { navigate('/signIn/organisationForm/') }
                    break
                }
                else { return alert('Veuillez remplir tous les champs !!') }
            }

            case 'personForm': {
                if ( isAllPersonFormFulFilled() ) {
                        navigate("/signIn/accountForm")
                } else { alert("Veuillez remplir tous les champs !!") }
                break
            }

            case 'organisationForm': {
                if ( isAllOrganisationFormFulFilled() ) {
                    navigate('/signIn/accountForm')
                } else { alert("Veuillez remplir tous les champs !!") }
                break
            }

            default : {
                alert("En cours de developpement...")
                break
            }
        }
    }

    return {
        setCurrentForm,
        ManageButtonNext
    }
}