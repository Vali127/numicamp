
import React from 'react'
import { CommentModal } from '../../components/commentModal'
import { X, Send } from 'lucide-react'

const Comments = ({open, postId}) => {
  return (
    <CommentModal>
        <div className='flex justify-between border-b border-slate-500/25'>
            <div className='font-bold text-2xl' >Commentaires post : { postId } </div>
            <X className='bg-slate-600/50 rounded-full p-1 hover:text-white ' onClick={() => { open(false) }} />
        </div>
        <div className='h-full' >

        </div>
        <div className='h-20 relative'>
            <textarea name="" id="comment" className='comment-input scrollbar-none' placeholder="Votre commentaire ..." >
            </textarea>
            <div className='absolute icon_btn font-bold text-[24px] hover:text-green-500 cursor-pointer  top-4 right-5'>
                &#xe398;
            </div>
        </div>
    </CommentModal>
  )
}

export default Comments