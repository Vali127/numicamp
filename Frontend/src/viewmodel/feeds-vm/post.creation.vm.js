
import React, { useState } from 'react'
import { HomeModel } from '../../model/home.model.js'
import { PostModel } from '../../model/post.model.js'
import { ImageServices } from '../../services/image.services.js'

export const PostCreationVm = ({setModalVisibility}) => {
  //image
  const [imageError, setImageError ] = useState('')
  const [postData, setPostData] = useState({
    title : '',
    description : '',
    domains : [],
    keywords : [],
    photo_pub : null,
    photo : null,
  })

  //Etat du composants :
  const [uploadState, setUploadState] = useState('')


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

      try {
        const model = PostModel()
        const res = await model.UploadPostImage( file )
        setPostData({...postData, photo : res.data.data , photo_pub: file })
      }
      catch(error) {
        console.log("Erreur d' upload : ", error)
        setImageError("Erreur lors de l'upload de l'image. Veuillez réessayer plus tard.")
        setPostData({...postData, photo_pub: null })
      }
  }



  const resetImage = () => {
    setPostData({...postData, photo_pub: null})
    setImageError(null)
  }



  const HandleUpload = async() => {
    try {
      setUploadState("loading")
      const model = PostModel()
      await  model.UploadPostData( postData )
      setUploadState("success")
      setTimeout(
        () => { setModalVisibility(false) }, 3000
      )
    }
    catch(error) {
      setUploadState("error")
      console.log("UNE ERREUR S' EST PRODUITE !! :", error)
    }
  }
  
  return {
    HandleImage,
    imageError,
    resetImage,
    postData,
    setPostData,
    HandleUpload,
    uploadState
  }

}