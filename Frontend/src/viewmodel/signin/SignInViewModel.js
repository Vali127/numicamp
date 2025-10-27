import {useSignInContext} from "../../context/SignInContext.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export const SignInViewModel = () => {

    const navigate = useNavigate()
    const  { typeOfUsage, setShowSignInValidationModal } = useSignInContext()
    const [ currentForm, setCurrentForm ] = useState('')
    const [ buttonDisabled, setButtonDisabled ] = useState(true)


    //si des problèmes de timing se manifestent dans le code, il faut décommenter ce code en bas pour détécter directement le nom du formulaire actuelle.

    /*useEffect(() => {
        if (currentForm === '') {
            const path = window.location.pathname
            if (path.includes('personalForm')) { setCurrentForm('personalForm') }
            else if (path.includes('signIn')) { setCurrentForm('usageForm') }
        }
    }, [currentForm])*/



    /*
        Ce code en bas sert à la navigation de formulaire en formulaire.
        La gestion de vérification des formulaire sont directement gerer par chaque formulaire.
        Si les formulaires ne sont pas rempli, le boutton "SUIVANT" sera desactivé.
    */

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