
import React, { useEffect, useState } from 'react'
import { HomeModel } from '../../model/HomeModel'

export const PostCreationViewModel = () => {
  const { getUserDomains } = HomeModel()
  //image
  const [imageError, setImageError ] = useState('')
  const [image, setImage] = useState('')


  const [listOfDomains, setListOfDomains] = useState([])


  const HandleUserDomains = async() => {
    try {
        const res = await getUserDomains()
        setListOfDomains(res.data)
    }
    catch(error) {
        console.log(error)
    }
  }
  useEffect(
    () => { HandleUserDomains() }, []
  )

  const HandleImage = async (e) => {
      const file = e.target.files[0];
  
      // Si aucun fichier sélectionné
      if (!file) {
          setImageError(null)
          setImage(null)
          return
      }
  
      // Validation du fichier
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      const maxSize = 5 * 1024 * 1024; // 5MB
          
      // Vérification du type de fichier
      if (!validTypes.includes(file.type)) {
          setImageError('Format de fichier non supporté. Veuillez choisir une image (JPEG, PNG, GIF, WebP).')
          setImage(null)
          return
      }
          
      // Vérification de la taille du fichier
      if (file.size > maxSize) {
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
  
  return {
    listOfDomains,
    HandleImage,
    imageError,
    image,
    resetImage
  }

}