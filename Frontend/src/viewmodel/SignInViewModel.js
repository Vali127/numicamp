import {useSignInContext} from "../context/SignInContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";


export const SignInViewModel = () => {

    const navigate = useNavigate()
    const  { typeOfUsage, setShowSignInValidationModal } = useSignInContext()

    const [ currentForm, setCurrentForm ] = useState('')
    const [ buttonDisabled, setButtonDisabled ] = useState(true)


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
                ( typeOfUsage === 'personal' && typeOfUsage !== '' ) ? navigate('/signIn/personForm') : navigate('/signIn/organisationForm/')
                break
            }

            case 'personForm': {
                navigate("/signIn/accountForm")
                break
            }

            case 'organisationForm': {
                navigate('/signIn/accountForm')
                break
            }

            case 'accountForm': {
                navigate('/signIn/passwordForm')
                break
            }

            case 'passwordForm': {
                setShowSignInValidationModal(true)
                break
            }
            default : {
                alert("En cours de developpement...")
                break
            }
        }
    }

    const ManageButtonPrev = () => {
        return window.history.go(-1)
    }

    return {
        currentForm,
        setCurrentForm,
        buttonDisabled,
        setButtonDisabled,
        ManageButtonNext,
        ManageButtonPrev
    }
}