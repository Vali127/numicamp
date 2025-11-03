
import React, { useState } from 'react'
import { HomeModel } from '../../model/HomeModel'
import { PostModel } from '../../model/PostModel'
import { ImageServices } from '../../services/ImageServices'

export const PostCreationViewModel = ({setModalVisibility}) => {
  //image
  const [imageError, setImageError ] = useState('')
  const [postData, setPostData] = useState({
    title : '',
    description : '',
    domains : [],
    keywords : [],
    photo_pub : null
  })

  const HandleImage = async (e) => {
      const file = e.target.files[0];
  
      if (!file) {
          setImageError(null)
          setPostData({...postData, photo_pub: null})
          return
      }      
      
      const service = ImageServices()
      
      if (!service.isImageTypeValid(file.type)) {
          setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
          setPostData({...postData, photo_pub: null})
          return
      }

      if (!service.isImageSizeValid(file.size)) {
          setImageError('La taille du fichier dépasse 5MB. Veuillez choisir une image plus petite.')
          return
      }
  
      setImageError(null)
      setPostData({...postData, photo_pub: file})
  }

  const resetImage = () => {
    setPostData({...postData, photo_pub: null})
    setImageError(null)
  }


  const HandleUpload = async() => {
    const model = PostModel()
    try {
        const res = await model.UploadPost( postData )
        console.log("REPONSES : ", res)
    }
    catch (error) {
      console.error("Erreur lors de la création du post :", error)
    }
  }
  
  return {
    HandleImage,
    imageError,
    resetImage,
    postData,
    setPostData,
    HandleUpload
  }

}