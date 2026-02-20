import { createContext, useContext, useState } from "react"

//CONTEXT
const RegisterContext = createContext(null)

//PROVIDER
export const SignInContextProvider = ({children}) => {

    const [typeOfUsage, setTypeOfUsage] = useState('')
    const [personForm, setPersonForm] = useState({
        name: '', firstname: '', birth_date: '', place: 'Alaotra Mangoro', sex: ''
    })
    const [organisationForm, setOrganisationForm] = useState({
        name: '', creation_date: '', place: 'Alaotra Mangoro',
    })
    const [accountForm, setAccountForm] = useState({
        username: '', image: null, bio: '', mail: '', password: '',
    })
    const [domain, setDomain] = useState([])
    const [showSignInValidationModal, setShowSignInValidationModal] = useState(false)

    return (
        <RegisterContext.Provider value={{
            typeOfUsage, setTypeOfUsage,
            personForm, setPersonForm,
            organisationForm, setOrganisationForm,
            accountForm, setAccountForm,
            domain, setDomain,
            showSignInValidationModal, setShowSignInValidationModal,
        }}>
            {children}
        </RegisterContext.Provider>
    )
}

//HOOKS
// eslint-disable-next-line react-refresh/only-export-components
export const useSignInContext = () => useContext(RegisterContext)

//CONSTANTS
export const OrderedListOfPlace = [
    'Diana', 'Sava', 'Sofia', 'Analanjirofo', 'Boeny', 'Melaky', 'Betsiboka',
    'Alaotra Mangoro', 'Analamanga', 'Menabe', 'Bongolava', 'Itasy', 'Vakinankaratra',
    'Antsinanana', "Amoron'i Mania", 'Haute-Matsiatra', 'Vatovavy-Fitovinanay',
    'Atsimo-Andrefana', 'Ihorombe', 'Atsimo-Antsinanana', 'Anosy', 'Androy'
].sort()

export const ITDomain = [
    "Intelligence artificielle", "Machine Learning", "Cybersécurité",
    "Cloud computing", "Développement", "Data Science", "Big Data",
    "Blockchain & Web3", "DevOps", "Internet des objets",
    "Admin systemes & Reseaux", "Informatique quantique"
].sort()