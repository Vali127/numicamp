import React from 'react'
import { CommentModal } from '../../components/commentModal.jsx'
import { X } from 'lucide-react'
import { CommentVm } from '../../../viewmodel/feeds-vm/comment.vm.js'
import { CommentsList } from './CommentsList.jsx'

const Comments = ({open, postId}) => {

  const {
    setContent,
    content,
    SendComment,
    comment
  } = CommentVm()

  return (
    <CommentModal>

        
        <div className='flex justify-between border-b border-slate-500/25 bg-neutral-50'>
            <div 
              className='font-bold text-2xl text-center w-full' >Commentaires
            </div>
            <X 
              className='bg-slate-600/50 rounded-full p-1 hover:text-white ' 
              onClick={() => { open(false) }} />
        </div>
        
        {/* The COMMENTS SECTION */}
        <div className='h-full flex flex-col my-2 overflow-y-scroll scrollbar-none' >
            <CommentsList postId={postId} refresh={comment} />
        </div>
        <div className='h-20 relative'>
            
            
            <textarea
              onChange={(e) => { setContent(e.target.value) } }
              value={content} 
              name="comment" 
              id="comment" 
              className='comment-input bg-white scrollbar-none'
              placeholder="Votre commentaire ..." >
            </textarea>

            { (comment === "fetched") &&
              <button 
                id={postId}
                onClick={ async (e) => { await SendComment(e) } }
                className='absolute icon_btn font-bold text-[24px] hover:text-green-500 cursor-pointer  top-4 right-5'>
                  &#xe398;
              </button> 
            }

            { (comment === "fetching") &&
              <button 
                id={postId}
                className='absolute icon_btn font-bold text-[24px] hover:text-green-500 cursor-pointer  top-5 right-5' disabled>
                  <div className='w-6 h-6 border-5 border-green-400/50 rounded-full animate-rotate  border-t-green-600'>
                  </div>
              </button> 
            }

            { (comment === "error") &&
              <button 
                id={postId}
                className='absolute icon_btn font-bold text-[24px] text-red-500 cursor-pointer  top-4 right-5' disabled>
                  &#xE4E0;
              </button> 
            }

        </div>
    </CommentModal>
  )
}

export default Comments