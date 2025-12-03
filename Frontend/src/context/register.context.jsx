import {createContext, useContext, useState} from "react";

//CONTEXT
const RegisterContext = createContext(null)

//PROVIDER
export const SignInContextProvider = ({children}) => {

    const [typeOfUsage, setTypeOfUsage] = useState('')
    const [personForm, setPersonForm] = useState({
        name : '',
        firstname : '',
        birth_date : '',
        place : 'Alaotra Mangoro',
        sex : ''
    })
    const [organisationForm, setOrganisationForm] = useState({
        name : '',
        creation_date : '',
        place : 'Alaotra Mangoro',
    })
    const [accountForm, setAccountForm] = useState({
        username : '',
        image : null,
        bio : '',
        mail : '',
        password : '',
    })
    const  [ domain, setDomain ] = useState([])
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
        setShowSignInValidationModal,
        domain,
        setDomain,
    }

    return (
        <RegisterContext.Provider value={value}>
            {children}
        </RegisterContext.Provider>
    )
}



//hooks pour utiliser le context :

// eslint-disable-next-line react-refresh/only-export-components
export const useSignInContext = () => {
    return useContext(RegisterContext)
}



export const OrderedListOfPlace = () => {
    const ListOfPlace = [ 'Diana', 'Sava', 'Sofia', 'Analanjirofo', 'Boeny', 'Melaky', 'Betsiboka', 'Alaotra Mangoro', 'Analamanga', 'Menabe', 'Bongolava', 'Itasy', 'Vakinankaratra', 'Antsinanana', 'Amoron \' i Mania', 'Haute-Matsiatra', 'Vatovavy-Fitovinanay', 'Atsimo-Andrefana', 'Ihorombe', 'Atsimo-Antsinanana', 'Anosy', 'Androy' ]
    return ListOfPlace.sort()
}

export const ITDomain = () => {
    const ITDomains = [
        "Intelligence artificielle",
        "Machine Learning",
        "Cybersécurité",
        "Cloud computing",
        "Développement",
        "Data Science",
        "Big Data",
        "Blockchain & Web3",
        "DevOps",
        "Internet des objets",
        "Admin systemes & Reseaux",
        "Informatique quantique"
    ];

    return ITDomains.sort()
}