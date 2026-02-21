import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSignInContext } from "../../context/register.context.jsx"
import { accountFormValidation } from "../../services/form.services.js"
import { ImageServices } from "../../services/image.services.js"
import { uploadTempProfilePicture } from '../../api/upload.api.js'

export const AccountFormVm = () => {
    const { username, mail } = accountFormValidation()
    const { setAccountForm } = useSignInContext()
    const [imageError, setImageError] = useState(null)
    const [usernameError, setUsernameError] = useState(null)
    const [emailError, setEmailError] = useState(null)

    const { mutate: uploadImage, isPending: isUploading } = useMutation({
        mutationFn: (file) => uploadTempProfilePicture(file),
        onSuccess: (res, file) => setAccountForm(prev => ({ ...prev, image: file, tempPhotoFilename: res.data.filename })),
        onError: (error) => {
            setImageError("Erreur lors de l'upload de l'image: " + error.message)
            setAccountForm(prev => ({ ...prev, image: null, tempPhotoFilename: null }))
        },
    })

    const HandleImage = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setAccountForm(prev => ({ ...prev, image: null, tempPhotoFilename: null }))
            setImageError(null)
            return
        }

        const service = ImageServices()
        if (!service.isImageTypeValid(file.type)) {
            setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
            setAccountForm(prev => ({ ...prev, image: null, tempPhotoFilename: null }))
            return
        }
        if (!service.isImageSizeValid(file.size)) {
            setImageError('La taille du fichier dépasse 10MB. Veuillez choisir une image plus petite.')
            setAccountForm(prev => ({ ...prev, image: null, tempPhotoFilename: null }))
            return
        }

        setImageError(null)
        uploadImage(file)
    }

    const resetImage = () => {
        setAccountForm(prev => ({ ...prev, image: null, tempPhotoFilename: null }))
        setImageError(null)
    }

    const HandleInputUsernameChange = (e) => {
        setAccountForm(prev => ({ ...prev, username: e.target.value }))
        if (username.checkLength().type != null) setUsernameError(username.checkLength())
    }

    const HandleInputEmailChange = (e) => {
        setAccountForm(prev => ({ ...prev, mail: e.target.value }))
        setEmailError(mail.checkExpression(e.target.value))
    }

    return {
        HandleImage, resetImage, imageError,
        usernameError, emailError,
        HandleInputUsernameChange, HandleInputEmailChange,
        isUploading
    }
}