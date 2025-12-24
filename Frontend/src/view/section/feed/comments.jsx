import React from 'react'
import { CommentModal } from '../../components/comment.modal.jsx'
import { X } from 'lucide-react'
import { CommentVm } from '../../../viewmodel/feeds-vm/comment.vm.js'
import { CommentList } from './comment.list.jsx'

const Comments = ({open, postId, GoToProfile}) => {

    const {
        setContent,
        content,
        SendComment,
        comment
    } = CommentVm()

    return (
        <CommentModal>


            <div className='flex justify-between items-center border-b border-slate-500/25 bg-neutral-50 p-3 md:p-4'>
                <div
                    className='font-bold text-lg md:text-2xl text-center flex-1'>Commentaires
                </div>
                <X
                    className='bg-slate-600/50 rounded-full p-1 hover:text-white w-6 h-6 md:w-7 md:h-7 flex-shrink-0 cursor-pointer'
                    onClick={() => { open(false) }} />
            </div>

            {/* The COMMENTS SECTION */}
            <div className='h-full flex flex-col my-2 overflow-y-scroll scrollbar-none px-2 md:px-0'>
                <CommentList postId={postId} GoToProfile={GoToProfile} refresh={comment} />
            </div>
            <div className='h-16 md:h-20 relative px-2 md:px-0'>


            <textarea
                onChange={(e) => { setContent(e.target.value) } }
                value={content}
                name="comment"
                id="comment"
                className='comment-input bg-white scrollbar-none text-sm md:text-base'
                placeholder="Votre commentaire ..." >
            </textarea>

                { (comment === "fetched") &&
                    <button
                        id={postId}
                        onClick={ async (e) => { await SendComment(e) } }
                        className='absolute icon_btn font-bold text-xl md:text-[24px] hover:text-green-500 cursor-pointer top-3 md:top-4 right-3 md:right-5'>
                        &#xe398;
                    </button>
                }

                { (comment === "fetching") &&
                    <button
                        id={postId}
                        className='absolute icon_btn font-bold text-xl md:text-[24px] hover:text-green-500 cursor-pointer top-3 md:top-5 right-3 md:right-5' disabled>
                        <div className='w-5 h-5 md:w-6 md:h-6 border-4 md:border-5 border-green-400/50 rounded-full animate-rotate border-t-green-600'>
                        </div>
                    </button>
                }

                { (comment === "error") &&
                    <button
                        id={postId}
                        className='absolute icon_btn font-bold text-xl md:text-[24px] text-red-500 cursor-pointer top-3 md:top-4 right-3 md:right-5' disabled>
                        &#xE4E0;
                    </button>
                }

            </div>
        </CommentModal>
    )
}

export default Comments