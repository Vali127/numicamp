import {createContext, useContext, useEffect, useState} from "react";

//CONTEXT
const SignInContext = createContext(null)

//PROVIDER
export const SignInContextProvider = ({children}) => {

    // données à remplir sur le composant Usage
    const [typeOfUsage, setTypeOfUsage] = useState('')

    //données à remplir sur le composant PersonalForm
    const [personalForm, setPersonalForm] = useState({
        name : '',
        first_name : '',
        birth_date : '',
        creation_date : '',
        place : '',
        sex : ''
    })

    //données à remplir sur AccountForm
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

export const OrderedListOfPlace = () => {
    const ListOfPlace = [ 'Diana', 'Sava', 'Sofia', 'Analanjirofo', 'Boeny', 'Melaky', 'Betsiboka', 'Alaotra Mangoro', 'Analamanga', 'Menabe', 'Bongolava', 'Itasy', 'Vakinankaratra', 'Antsinanana', 'Amoron \' i Mania', 'Haute-Matsiatra', 'Vatovavy-Fitovinanay', 'Atsimo-Andrefana', 'Ihorombe', 'Atsimo-Antsinanana', 'Anosy', 'Androy' ]
    return ListOfPlace.sort()
}