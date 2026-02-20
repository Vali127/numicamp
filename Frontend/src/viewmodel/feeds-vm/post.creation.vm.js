import { useState } from 'react'
import { PostModel } from '../../model/post.model.js'
import { ImageServices } from '../../services/image.services.js'

export const PostCreationVm = ({ setModalVisibility }) => {
    const [imageError, setImageError] = useState('')
    const [uploadState, setUploadState] = useState('')
    const [postData, setPostData] = useState({
        title: '', description: '', domains: [], keywords: [], photo_pub: null, photo: null,
    })

    const HandleImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            setImageError(null)
            setPostData({ ...postData, photo_pub: null })
            return
        }

        const service = ImageServices()
        if (!service.isImageTypeValid(file.type)) {
            setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
            setPostData({ ...postData, photo_pub: null })
            return
        }
        if (!service.isImageSizeValid(file.size)) {
            setImageError('La taille du fichier dépasse 5MB. Veuillez choisir une image plus petite.')
            return
        }

        setImageError(null)
        try {
            const res = await PostModel().UploadPostImage(file)
            setPostData({ ...postData, photo: res.data.data, photo_pub: file })
        } catch (error) {
            console.error("Erreur d'upload : ", error)
            setImageError("Erreur lors de l'upload de l'image. Veuillez réessayer plus tard.")
            setPostData({ ...postData, photo_pub: null })
        }
    }

    const resetImage = () => {
        setPostData({ ...postData, photo_pub: null })
        setImageError(null)
    }

    const HandleUpload = async () => {
        try {
            setUploadState("loading")
            await PostModel().UploadPostData(postData)
            setUploadState("success")
            setTimeout(() => setModalVisibility(false), 3000)
        } catch (error) {
            console.error("UNE ERREUR S'EST PRODUITE !! :", error)
            setUploadState("error")
        }
    }

    return { HandleImage, imageError, resetImage, postData, setPostData, HandleUpload, uploadState }
}