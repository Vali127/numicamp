import React from 'react'
import { LargeModal } from '../interface/LargeModal'
import ListOfInterest from '../interface/ListOfInterest'
import PostModalHeader from '../interface/PostModalHeader'
import PostForm from '../interface/PostForm'
import { PostCreationViewModel } from '../../../viewmodel/main/PostCreationViewModel'
import ListOfDomain from '../interface/ListOfDomain'
import ImageInput from '../interface/ImageInput'
import { SendHorizonal } from 'lucide-react'


const PostModal = ({profil, name, firstname, username, close}) => {
  const { listOfDomains, HandleImage, image, imageError, resetImage  } = PostCreationViewModel()
  return (
    <LargeModal>
        <div className='w-full p-3 bg-gradient-to-b from-blue-100 from-0%  to-blue-100/45%  to-80%  h-20' >
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