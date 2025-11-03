
import React, { useState } from 'react'
import { HomeModel } from '../../model/HomeModel'
import { PostModel } from '../../model/PostModel'
import { ImageServices } from '../../services/ImageServices'

export const PostCreationViewModel = ({setModalVisibility}) => {
  //image
  const [imageError, setImageError ] = useState('')
  const [image, setImage] = useState('')
  const [postData, setPostData] = useState({
    title : '',
    description : '',
    profil_name : '',
    keyWords : []
  })

  const HandleImage = async (e) => {
      const file = e.target.files[0];
  
      if (!file) {
          setImageError(null)
          setImage(null)
          return
      }      
      
      const service = ImageServices()
      
      if (!service.isImageTypeValid(file.type)) {
          setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
          setImage(null)
          return
      }

      if (!service.isImageSizeValid(file.size)) {
          setImageError('La taille du fichier dépasse 5MB. Veuillez choisir une image plus petite.')
          return
      }
  
      setImageError(null)
      setImage(file)
  }

  const resetImage = () => {
    setImage(null)
    setImageError(null)
  }


  const HandleUpload = () => {
    const model = PostModel()
    model.UploadPost(postData)
    return setModalVisibility(false)
  }
  
  return {
    HandleImage,
    imageError,
    image,
    resetImage,
    postData,
    setPostData,
    HandleUpload
  }

}