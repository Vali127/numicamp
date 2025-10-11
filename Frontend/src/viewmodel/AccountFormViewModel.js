import {useState} from "react";
import {useSignInContext} from "../context/SignInContext.jsx";
import {accountFormValidation} from "../services/FormValidationServices.jsx";

export const AccountFormViewModel = () => {

    const { username, mail } = accountFormValidation()
    const  { accountForm, SetAccountForm } = useSignInContext()

    const [imageError, setImageError] = useState(null)
    const [usernameError, setUsernameError] = useState({ type: null, message: null })
    const [emailError, setEmailError] = useState({ type: null, message: null })

    const HandleImage = (e) => {

        const file = e.target.files[0]

        // Si aucun fichier sélectionné
        if (!file) {
            SetAccountForm({...accountForm, image: null})
            setImageError(null)
            return
        }
        // Validation du fichier
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        const maxSize = 5 * 1024 * 1024 // 5MB
        // Vérification du type de fichier
        if (!validTypes.includes(file.type)) {
            setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
            SetAccountForm({...accountForm, image: null})
            return
        }
        // Vérification de la taille du fichier
        if (file.size > maxSize) {
            setImageError('La taille du fichier dépasse 5MB. Veuillez choisir une image plus petite.')
            SetAccountForm({...accountForm, image: null})
            return
        }
        // Si tout est valide, enregistrer le fichier
        setImageError(null)
        SetAccountForm({...accountForm, image: file})
    }

    const resetImage = () => {
        SetAccountForm({...accountForm, image: null})
        setImageError(null)
    }


    const HandleInputUsernameChange = (e) => {
        SetAccountForm({...accountForm, username: e.target.value})
        setUsernameError(username.checkExpression(e.target.value))
        if ( username.checkLength().type != null ) { setUsernameError(name.checkLength()) }
    }

    const HandleInputEmailChange = (e) => {
        SetAccountForm({...accountForm, mail : e.target.value})
        setEmailError(mail.checkExpression(e.target.value))
    }

    return {
        HandleImage,
        resetImage,
        imageError,
        usernameError,
        emailError,
        HandleInputUsernameChange,
        HandleInputEmailChange
    }
}
