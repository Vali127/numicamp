import {useSignInContext} from "../context/SignInContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {FormValidationServices} from "../services/FormValidationServices.js";


export const SignInViewModel = () => {
    const navigate = useNavigate()
    const  { typeOfUsage } = useSignInContext()
    const [ currentForm, setCurrentForm ] = useState('')
    
    // Détecter automatiquement le formulaire actuel depuis l'URL pour éviter les probleme de timing
    useEffect(() => {
        if (currentForm === '') {
            // Si currentForm n'est pas encore défini, détecter depuis l'URL
            const path = window.location.pathname
            if (path.includes('personalForm')) { setCurrentForm('personalForm') }
            else if (path.includes('signIn')) { setCurrentForm('usageForm') }
        }
    }, [currentForm])

    const ManageButtonNext = () => {
        switch (currentForm) {
            case 'usageForm': {
                if (FormValidationServices.usageForm.isAllUsageFormFulFilled(typeOfUsage)) {
                    if ( typeOfUsage == 'personal') { navigate('/signIn/personalForm') }
                    else { navigate('/organizationForm') }
                    break;
                }
                else { return alert('Veuillez remplir tous les champs !!') }
            }
            default: {
                alert("En cours de developpement...")
                break; }
        }
    }

    return {
        setCurrentForm,
        ManageButtonNext
    }
}