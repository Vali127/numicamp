import {useState} from "react";
import {useSignInContext} from "../context/SignInContext.jsx";
import {accountFormValidation} from "../services/FormValidationServices.js";
import { uploadTempProfilePicture } from '../api/UploadApi.js';

export const AccountFormViewModel = () => {

    const { username, mail } = accountFormValidation()
    const  { accountForm, SetAccountForm } = useSignInContext()

    const [imageError, setImageError] = useState(null)
    const [usernameError, setUsernameError] = useState({ type: null, message: null })
    const [emailError, setEmailError] = useState({ type: null, message: null })
    const [isUploading, setIsUploading] = useState(false)

    const HandleImage = async (e) => {
        const file = e.target.files[0];

        // Si aucun fichier sélectionné
        if (!file) {
            SetAccountForm({...accountForm, image: null, tempPhotoFilename: null})
            setImageError(null)
            return
        }

        // Validation du fichier
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        // Vérification du type de fichier
        if (!validTypes.includes(file.type)) {
            setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
            SetAccountForm({...accountForm, image: null, tempPhotoFilename: null})
            return
        }
        
        // Vérification de la taille du fichier
        if (file.size > maxSize) {
            setImageError('La taille du fichier dépasse 5MB. Veuillez choisir une image plus petite.')
            SetAccountForm({...accountForm, image: null, tempPhotoFilename: null})
            return
        }

        // Upload automatique du fichier vers le serveur
        setIsUploading(true)
        setImageError(null)
        
        try {
            const uploadResponse = await uploadTempProfilePicture(file)
            
            // Si l'upload réussit, stocker les informations
            SetAccountForm({
                ...accountForm, 
                image: file, // Pour l'affichage local
                tempPhotoFilename: uploadResponse.data.filename // Pour l'enregistrement en DB
            })
        } catch (error) {
            setImageError('Erreur lors de l\'upload de l\'image: ' + error.message)
            SetAccountForm({...accountForm, image: null, tempPhotoFilename: null})
        }
        setIsUploading(false)
    };

    const resetImage = () => {
        SetAccountForm({...accountForm, image: null, tempPhotoFilename: null})
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
        HandleInputEmailChange,
        isUploading
    }
}
