import {createContext, useContext, useState} from "react";

//CONTEXT
const SignInContext = createContext(null)

//PROVIDER
export const SignInContextProvider = ({children}) => {
    const [typeOfUsage, setTypeOfUsage] = useState('')
    const [personalForm, setPersonalForm] = useState({
        name : '',
        first_name : '',
        birth_date : '',
        creation_date : '',
        place : '',
        sex : ''
    })
    const [accountForm, setAccountForm] = useState({
        username: '',
        bio: '',
        mail: '',
        password: ''
    })

    const SetTypeOfUsage = (newTypeOfUsage) => { setTypeOfUsage(newTypeOfUsage) }
    const SetPersonalForm = (newPersonalForm) => { setPersonalForm(newPersonalForm) }
    const SetAccountForm = (newAccountForm) => { setAccountForm(newAccountForm) }

    const value = {
        typeOfUsage,
        personalForm,
        accountForm,
        SetTypeOfUsage,
        SetPersonalForm,
        SetAccountForm
    }

    return (
        <SignInContext.Provider value={value}>
            {children}
        </SignInContext.Provider>
    )
}

//hooks pour utiliser le context :
// eslint-disable-next-line react-refresh/only-export-components
export const useSignInContext = () => {
    return useContext(SignInContext)
}