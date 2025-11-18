import {useSignInContext} from "../../context/register.context.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export const Sign_inFormVm = () => {

    const navigate = useNavigate()
    const  { typeOfUsage, setShowSignInValidationModal } = useSignInContext()
    const [ currentForm, setCurrentForm ] = useState('')
    const [ buttonDisabled, setButtonDisabled ] = useState(true)

    const ManageButtonNext = () => {
        switch (currentForm) {
            case 'usageForm': {
                ( typeOfUsage === 'personal' && typeOfUsage !== '' ) ? navigate('/signIn/personForm') : navigate('/signIn/organisationForm/')
                break
            }
            case 'personForm': { navigate("/signIn/accountForm") ; break }

            case 'organisationForm': { navigate('/signIn/accountForm'); break }

            case 'accountForm': { navigate('/signIn/domainForm'); break }

            case 'domainForm': { navigate('/signIn/passwordForm'); break }

            case 'passwordForm': { setShowSignInValidationModal(true); break }

            default : { alert("En cours de developpement..."); break }
        }
    }
    //action du boutton next
    const ManageButtonPrev = () => { return window.history.go(-1) }

    return {
        currentForm,
        setCurrentForm,
        buttonDisabled,
        setButtonDisabled,
        ManageButtonNext,
        ManageButtonPrev
    }
}