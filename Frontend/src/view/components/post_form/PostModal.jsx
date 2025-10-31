import React from 'react'
import { LargeModal } from '../lower_components/LargeModal.jsx'
import ListOfInterest from './ListOfInterest.jsx'
import PostModalHeader from './PostModalHeader.jsx'
import PostForm from './PostForm.jsx'
import { PostCreationViewModel } from '../../../viewmodel/main/PostCreationViewModel.js'
import ListOfDomain from './ListOfDomain.jsx'
import ImageInput from './ImageInput.jsx'
import { SendHorizonal } from 'lucide-react'


const PostModal = ({profil, name, firstname, username, close}) => {
  const { listOfDomains, HandleImage, image, imageError, resetImage  } = PostCreationViewModel()
  return (
    <LargeModal>
        <div className='w-full p-3 bg-gradient-to-b from-blue-100 from-0%  to-blue-100/10%  to-100%  h-20' >
            <PostModalHeader
                profil={profil}
                name={name}
                firstname={firstname}
                username={username}
                close={close}
            />
            <div className='grid gap-2'>
                <ListOfInterest/>
                <PostForm/>
                <ImageInput image={image} HandleImage={HandleImage} resetImage={resetImage} />
                { imageError && <p className='error' >{imageError}</p> }
                <ListOfDomain data = {listOfDomains} />
            </div>
        </div>
        <button className='absolute bottom-3 right-3 bg-slate-900 text-white text-[14px] px-3 py-1 rounded flex gap-1 cursor-pointer' ><SendHorizonal className='scale-70'/> Poster</button>
    </LargeModal>
  )
}

export default PostModal