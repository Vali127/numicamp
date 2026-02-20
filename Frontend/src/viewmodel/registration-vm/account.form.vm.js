import {useState} from "react";
import {useSignInContext} from "../../context/register.context.jsx";
import {accountFormValidation} from "../../services/form.services.js";
import { uploadTempProfilePicture } from '../../api/upload.api.js';

export const AccountFormVm = () => {

    const { username, mail } = accountFormValidation()
    const  { accountForm, setAccountForm } = useSignInContext()

    const [imageError, setImageError] = useState(null)
    const [usernameError, setUsernameError] = useState({ type: null, message: null })
    const [emailError, setEmailError] = useState({ type: null, message: null })
    const [isUploading, setIsUploading] = useState(false)

    const HandleImage = async (e) => {
        const file = e.target.files[0];

        // Si aucun fichier sélectionné
        if (!file) {
            setAccountForm({...accountForm, image: null, tempPhotoFilename: null})
            setImageError(null)
            return
        }

        // Validation du fichier
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
        const maxSize = 10 * 1024 * 1024; // 5MB
        
        // Vérification du type de fichier
        if (!validTypes.includes(file.type)) {
            setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
            setAccountForm({...accountForm, image: null, tempPhotoFilename: null})
            return
        }
        
        // Vérification de la taille du fichier
        if (file.size > maxSize) {
            setImageError('La taille du fichier dépasse 10MB. Veuillez choisir une image plus petite.')
            setAccountForm({...accountForm, image: null, tempPhotoFilename: null})
            return
        }

        // Upload automatique du fichier vers le serveur
        setIsUploading(true)
        setImageError(null)
        
        try {
            const uploadResponse = await uploadTempProfilePicture(file)
            
            // Si l'upload réussit, stocker les informations
            setAccountForm({
                ...accountForm, 
                image: file, // Pour l'affichage local
                tempPhotoFilename: uploadResponse.data.filename // Pour l'enregistrement en DB
            })
        } catch (error) {
            setImageError('Erreur lors de l\'upload de l\'image: ' + error.message)
            setAccountForm({...accountForm, image: null, tempPhotoFilename: null})
        }
        setIsUploading(false)
    };

    const resetImage = () => {
        setAccountForm({...accountForm, image: null, tempPhotoFilename: null})
        setImageError(null)
    }


    const HandleInputUsernameChange = (e) => {
        setAccountForm({...accountForm, username: e.target.value})
        if ( username.checkLength().type != null ) { setUsernameError(name.checkLength()) }
    }

    const HandleInputEmailChange = (e) => {
        setAccountForm({...accountForm, mail : e.target.value})
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
