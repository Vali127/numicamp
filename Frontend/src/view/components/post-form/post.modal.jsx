import React from 'react'
import { LargeModal } from '../large.modal.jsx'
import ListOfInterest from './list.of.interest.jsx'
import PostModalHeader from './post.modal.header.jsx'
import PostForm from './post.form.jsx'
import { PostCreationVm } from '../../../viewmodel/feeds-vm/post.creation.vm.js'
import ListOfDomain from './list.of.domain.jsx'
import ImageInput from './image.input.jsx'
import { SendHorizonal } from 'lucide-react'
import {ThreeDots} from "react-loader-spinner";
import { X } from 'lucide-react'
import Lottie from 'lottie-react'
import successAnimation from "../../../assets/animations/system-solid-31-check-in-reveal.json"
import errorAnimation from "../../../assets/animations/system-regular-56-red-warning-in-warning.json"



const Loading = ({setModalVisibility}) => {
    return (
        <div className='relative h-full flex flex-col items-center justify-around p-4' >
            <div className='absolute top-2 sm:top-3 right-2 sm:right-3'>
                <button
                    className='rounded-full bg-black/20 hover:text-amber-50 p-1'
                    onClick={() => { setModalVisibility(false) }}
                >
                    <X className='scale-75 sm:scale-80'/>
                </button>
            </div>
            <div className='flex flex-col items-center text-center px-4' >
                <div>
                    <ThreeDots color="#1ACD2F"/>
                </div>
                <p className='text-sm sm:text-base'>Entrain de <span className="span" >soumettre votre publication</span></p>
                <b className='text-sm sm:text-base'>Veuillez patienter !!!</b>
            </div>
        </div>
    )
}



const Success = () => {
    return (
        <div className='relative h-full flex flex-col items-center justify-around p-4' >
            <div className='flex flex-col items-center text-center' >
                <div>
                    <Lottie className="h-16 sm:h-20 md:h-30 mb-4" animationData={successAnimation} loop={false} />
                </div>
                <p className='text-[10px] sm:text-[11px]'>Succes de l' operation</p>
                <b className='text-sm sm:text-base'>Publication<span className="span"> Postée</span></b>
            </div>
        </div>
    )
}

const Error = ({setModalVisibility}) => {
    return (
        <div className='relative h-full flex flex-col items-center justify-around p-4' >
            <div className='flex flex-col items-center text-center px-4' >
                <div>
                    <Lottie className="h-16 sm:h-20 md:h-30 mb-4" animationData={errorAnimation} loop={false} />
                </div>
                <b className='text-sm sm:text-base'>Publication <b className='text-red-500' >non Postée</b></b>
                <p className='text-[10px] sm:text-[11px]'>Une Erreur s' est produite.<br/>Veuillez réessayer plutard !</p>
                <button
                    onClick={() => {setModalVisibility(false)}}
                    className='bg-red-500 text-amber-50 px-4 sm:px-5 py-1.5 sm:py-2 rounded my-4 sm:my-5 text-sm sm:text-base'
                >
                    Quitter
                </button>
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
    } = PostCreationVm({setModalVisibility})

    return (
        <LargeModal>
            {
                ( uploadState === "" ) &&
                <div className='h-full flex flex-col'>
                    <div
                        className='w-full p-2 sm:p-3 bg-gradient-to-b from-gray-50 from-0%  to-blue-100/10%  to-100% h-16 sm:h-20 scrollbar-none flex-shrink-0' >

                        <PostModalHeader
                            profil={profil}
                            name={name}
                            firstname={firstname}
                            username={username}
                            setModalVisibility={setModalVisibility}/>
                    </div>

                    <div className='flex-1 overflow-y-auto scrollbar-thin p-2 sm:p-3'>
                        <div
                            className='grid gap-2 sm:gap-3'>

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

                            { imageError && <p className='error text-xs sm:text-sm' >{imageError}</p> }

                            <ListOfDomain
                                data={domains}
                                setPostData={setPostData}
                                postData={postData}  />

                        </div>
                    </div>

                    <button
                        onClick={HandleUpload}
                        className='absolute bottom-2 right-2 bg-slate-900 text-white px-3 py-2 rounded flex gap-1 items-center cursor-pointer shadow-lg hover:bg-slate-800 transition-colors' >
                        <SendHorizonal className='w-4 h-4 sm:scale-70'/>
                        <span>Poster</span>
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