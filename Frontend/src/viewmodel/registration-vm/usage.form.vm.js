import {useSignInContext} from "../../context/register.context.jsx"

export  const UsageFormVm = () => {

    // typeOfUsage designe le type d' utilisation du plateformes ("personnelle", "organisationelle")
    const { SetTypeOfUsage, typeOfUsage } = useSignInContext() //Contexte du Formulaire d' inscription
    const HandleTypeOfUsage = (e) => { SetTypeOfUsage(e.target.value) }

    return {
        typeOfUsage,
        HandleTypeOfUsage
    }
}