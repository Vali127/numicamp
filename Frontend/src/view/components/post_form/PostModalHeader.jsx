import React from 'react'
import {X} from 'lucide-react'

const PostModalHeader = ({name, firstname, profil, username, close}) => {
  return (
    <header className='h-20 flex justify-between' >
        <div className='flex gap-2' >
            <div className='w-10 h-10 rounded-full overflow-hidden ' >
                <img src={profil} className='w-10 h-10'   />
            </div>
            <div>
                <b>{name} {firstname}</b>
                <div className={"text-[12px] font-light text-gray-500"} >@{username}</div>
            </div>
        </div>
        <div>
            <button className='rounded-full bg-black/20 hover:text-amber-50 ' onClick={() => { close(false) }}  > <X className='scale-80'/></button>
        </div>
    </header>
  )
}

export default PostModalHeader