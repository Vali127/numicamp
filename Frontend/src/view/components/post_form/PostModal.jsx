import React from 'react'
import { LargeModal } from '../lower_components/LargeModal.jsx'
import ListOfInterest from './ListOfInterest.jsx'
import PostModalHeader from './PostModalHeader.jsx'
import PostForm from './PostForm.jsx'
import { PostCreationViewModel } from '../../../viewmodel/main/PostCreationViewModel.js'
import ListOfDomain from './ListOfDomain.jsx'
import ImageInput from './ImageInput.jsx'
import { SendHorizonal } from 'lucide-react'
import {ThreeDots} from "react-loader-spinner";
import { X } from 'lucide-react'
import Lottie from 'lottie-react'
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json"
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json"



const Loading = ({setModalVisibility}) => {
  return (
    <div className='relative h-full flex flex-col items-center justify-around' >
      <div className='absolute top-3 right-3'>
          <button className='rounded-full bg-black/20 hover:text-amber-50 ' onClick={() => { setModalVisibility(false) }}  > <X className='scale-80'/></button>
      </div>
      <div className='flex flex-col items-center text-center' >
        <div>
          <ThreeDots color="#1ACD2F"/>
        </div>
        <p>Entrain de <span>soumettre votre publication</span></p>
        <b>Veuillez patienter !!!</b>
      </div>
    </div>
  )
}



const Success = () => {
  return (
    <div className='relative h-full flex flex-col items-center justify-around' >
      <div className='flex flex-col items-center text-center' >
        <div>
            <Lottie className={" h-20 md:h-30 mb-4"} animationData={successAnimation} loop={false} />
        </div>
        <p className='text-[11px]'>Succes de l' operation</p>
        <b>Publication<span> Postée</span></b>
      </div>
    </div>
  )
}

const Error = ({setModalVisibility}) => {
  return (
    <div className='relative h-full flex flex-col items-center justify-around' >
      <div className='flex flex-col items-center text-center' >
        <div>
            <Lottie className={" h-20 md:h-30 mb-4"} animationData={errorAnimation} loop={false} />
        </div>
        <b>Publication <b className='text-red-500' >non Postée</b></b>
        <p className='text-[11px]'>Une Erreur s' est produite.<br/>Veuillez réessayer plutard !</p>
        <button onClick={() => {setModalVisibility(false)}} className='bg-red-500 text-amber-50 px-5 py-1 rounded my-5' >Quitter</button>
      </div>
    </div>
  )
}






const PostModal = ({profil, name, firstname, username, setModalVisibility, domains}) => {
  
  const { 
    HandleImage,  
    imageError, 
    resetImage, 
    setPostData, 
    postData,
    HandleUpload,
    uploadState
  } = PostCreationViewModel({setModalVisibility})
  
  return (
    <LargeModal>
        {
          ( uploadState === "" ) &&
          <div>
            <div 
              className='w-full p-3 bg-gradient-to-b from-blue-100 from-0%  to-blue-100/10%  to-100%  h-20' >
            
              <PostModalHeader
                  profil={profil}
                  name={name}
                  firstname={firstname}
                  username={username}
                  setModalVisibility={setModalVisibility}/>

              <div 
                className='grid gap-2'>
                
                <ListOfInterest
                  setPostData={setPostData}
                  postData={postData}/>
                
                <PostForm
                  setPostData={setPostData}
                  postData={postData}/>

                <ImageInput 
                  image={postData.photo_pub}
                  HandleImage={HandleImage} 
                  resetImage={resetImage} 
                  setPostData={setPostData} 
                  postData={postData}  />
                  
                  { imageError && <p className='error' >{imageError}</p> }
                
                <ListOfDomain 
                  data={domains} 
                  setPostData={setPostData} 
                  postData={postData}  />

              </div>
            </div>
        
            <button 
              onClick={HandleUpload} 
              className='absolute bottom-3 right-3 bg-slate-900 text-white text-[14px] px-3 py-1 rounded flex gap-1 cursor-pointer' >
                <SendHorizonal className='scale-70'/> 
                Poster
            </button>
          </div>
        }
        {
          ( uploadState === "loading" ) && <Loading setModalVisibility={setModalVisibility} />
        }
        {
          ( uploadState === "success" )  && <Success/>
        }
        {
          ( uploadState === "error" )  && <Error setModalVisibility={setModalVisibility}/>
        }

    </LargeModal>
  )
}

export default PostModal