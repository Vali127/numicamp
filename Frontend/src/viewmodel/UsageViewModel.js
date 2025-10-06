import {useEffect} from "react"
import {useSignInContext} from "../context/SignInContext.jsx"
import {useNavigate} from "react-router-dom"
import {FormValidationServices} from "../services/FormValidationServices.js";


export  const UsageViewModel = () => {

    const  navigate = useNavigate()
    // typeOfUsage designe le type d' utilisation du plateformes ("personnelle", "organisationelle")
    const { SetTypeOfUsage, typeOfUsage } = useSignInContext() //Contexte du Formulaire d' inscription

    //assurer que le boutton suivant soit pas masqué(voir PresentationFormViewModel)
    useEffect(() => {
        const nextButton = document.getElementById("nextFormular")
        if (nextButton) {
            nextButton.style.display = 'block'
        }
    }, [])

    const HandleTypeOfUsage = (e) => { SetTypeOfUsage(e.target.value) }

    // Gerer l action du boutton suivant dans le composant actuel
    useEffect(() => {
        const nextButton = document.getElementById("nextFormular")
        if (nextButton) {
            const HandleNextButton = () => {
                if (FormValidationServices.usageForm.isAllUsageFormFulFilled(typeOfUsage)) // retourne true si le formulaire est rempli
                    return (typeOfUsage === "personal") ? navigate("/personalForm") : navigate("/organisational")
                return alert("Veuillez remplir tous les champs !!")
            }
            nextButton.addEventListener("click", HandleNextButton)
            return () => { nextButton.removeEventListener("click", HandleNextButton) }
        }
    }, [navigate, typeOfUsage])

    return {
        typeOfUsage,
        HandleTypeOfUsage
    }
}