import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { PostModel } from '../../model/post.model.js'
import { ImageServices } from '../../services/image.services.js'

export const PostCreationVm = ({ setModalVisibility }) => {
    const MODEL = PostModel()
    const [imageError, setImageError] = useState('')
    const [postData, setPostData] = useState({
        title: '', description: '', domains: [], keywords: [], photo_pub: null, photo: null,
    })

    const { mutate: uploadImage } = useMutation({
        mutationFn: (file) => MODEL.UploadPostImage(file),
        onSuccess: (res, file) => setPostData({ ...postData, photo: res.data.data, photo_pub: file }),
        onError: (error) => {
            console.error("Erreur d'upload : ", error)
            setImageError("Erreur lors de l'upload de l'image. Veuillez réessayer plus tard.")
            setPostData({ ...postData, photo_pub: null })
        },
    })

    const { mutate: uploadPost, status: uploadState } = useMutation({
        mutationFn: () => MODEL.UploadPostData(postData),
        onSuccess: () => setTimeout(() => setModalVisibility(false), 3000),
        onError: (error) => console.error("UNE ERREUR S'EST PRODUITE !! :", error),
    })

    const HandleImage = (e) => {
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
        uploadImage(file)
    }

    const resetImage = () => {
        setPostData({ ...postData, photo_pub: null })
        setImageError(null)
    }

    return { HandleImage, imageError, resetImage, postData, setPostData, HandleUpload: uploadPost, uploadState }
}