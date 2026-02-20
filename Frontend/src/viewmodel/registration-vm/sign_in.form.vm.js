import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignInContext } from "../../context/register.context.jsx"

const ROUTES = {
    usageForm: (typeOfUsage) => typeOfUsage === 'personal' ? '/signIn/personForm' : '/signIn/organisationForm',
    personForm: '/signIn/accountForm',
    organisationForm: '/signIn/accountForm',
    accountForm: '/signIn/domainForm',
    domainForm: '/signIn/passwordForm',
}

export const Sign_inFormVm = () => {
    const navigate = useNavigate()
    const { typeOfUsage, setShowSignInValidationModal } = useSignInContext()
    const [currentForm, setCurrentForm] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const ManageButtonNext = () => {
        if (currentForm === 'passwordForm') return setShowSignInValidationModal(true)
        const route = ROUTES[currentForm]
        if (route) navigate(typeof route === 'function' ? route(typeOfUsage) : route)
    }

    const ManageButtonPrev = () => window.history.go(-1)

    return { currentForm, setCurrentForm, buttonDisabled, setButtonDisabled, ManageButtonNext, ManageButtonPrev }
}