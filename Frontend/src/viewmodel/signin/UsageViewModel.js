import {useSignInContext} from "../../context/SignInContext.jsx"

export  const UsageViewModel = () => {

    // typeOfUsage designe le type d' utilisation du plateformes ("personnelle", "organisationelle")
    const { SetTypeOfUsage, typeOfUsage } = useSignInContext() //Contexte du Formulaire d' inscription
    const HandleTypeOfUsage = (e) => { SetTypeOfUsage(e.target.value) }

    return {
        typeOfUsage,
        HandleTypeOfUsage
    }
}