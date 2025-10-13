import {createContext, useContext, useEffect, useState} from "react";

//CONTEXT
const SignInContext = createContext(null)

//PROVIDER
export const SignInContextProvider = ({children}) => {

    // données à remplir sur le composant Usage
    const [typeOfUsage, setTypeOfUsage] = useState('')

    //données à remplir sur le composant PersonForm
    const [personForm, setPersonForm] = useState({
        name : '',
        firstname : '',
        birth_date : '',
        place : 'Alaotra Mangoro',
        sex : ''
    })

    //données à remplir sur le composant OrganisationForm
    const [organisationForm, setOrganisationForm] = useState({
        name : '',
        creation_date : '',
        place : 'Alaotra Mangoro',
    })

    //données à remplir sur AccountForm
    const [accountForm, setAccountForm] = useState({
        username : '',
        image : null,
        bio : '',
        mail : '',
        password : ''
    })

    // État pour le modal de validation
    const [showSignInValidationModal, setShowSignInValidationModal] = useState(false)

    const SetTypeOfUsage = (newTypeOfUsage) => { setTypeOfUsage(newTypeOfUsage) }
    const SetPersonForm = (newPersonForm) => { setPersonForm(newPersonForm) }
    const SetOrganisationForm = (newOrganisationForm) => { setOrganisationForm(newOrganisationForm) }
    const SetAccountForm = (newAccountForm) => { setAccountForm(newAccountForm) }

    const value = {
        typeOfUsage,
        personForm,
        organisationForm,
        accountForm,
        showSignInValidationModal,
        SetTypeOfUsage,
        SetPersonForm,
        SetOrganisationForm,
        SetAccountForm,
        setShowSignInValidationModal
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